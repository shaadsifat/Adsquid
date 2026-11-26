<?php
/*
 * Live opening hours of the Adsquid head office (Dhaka), read from its Google Maps listing.
 *
 * Change the hours in Google Maps (Google Business Profile) and the website follows within a few hours:
 * the office hours on the Offices and Contact pages, the hotline card, the footer and the "Open now" badge.
 *
 * Needs a Google Maps Platform API key with "Places API (New)" in api/hours-config.php
 * (copy hours-config.example.php; see README > Live office hours). Without it, this file answers
 * {"ok":false} and the website keeps the hours written in the site.
 * The answer is cached for a few hours, so Google is asked only a few times a day.
 * Needs PHP 7.4 or newer.
 */

declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');

$cfg = [
    'apiKey'     => '',
    'placeId'    => '',                                                   // empty = found automatically from 'query'
    'query'      => 'Adsquid, Section-15, Mirpur, Dhaka 1216, Bangladesh',
    'near'       => [23.8103594, 90.3623558],                             // the Adsquid pin on Google Maps
    'cacheHours' => 6,
];
if (is_file(__DIR__ . '/hours-config.php')) {
    $local = require __DIR__ . '/hours-config.php';
    if (is_array($local)) {
        $cfg = array_replace($cfg, $local);
    }
}

function send_json(array $data, int $maxAge): void
{
    header('Cache-Control: public, max-age=' . $maxAge);
    echo json_encode($data);
    exit;
}

if (trim((string) $cfg['apiKey']) === '') {
    send_json(['ok' => false, 'reason' => 'not configured'], 3600);
}

// Cache: a small JSON file in the server's temp folder (falls back to this folder)
$tmp = is_writable(sys_get_temp_dir()) ? sys_get_temp_dir() : __DIR__;
$cacheFile = rtrim($tmp, '/\\') . '/adsquid-hours-' . sha1(__FILE__ . (string) $cfg['apiKey']) . '.json';
$cache = is_file($cacheFile) ? (json_decode((string) @file_get_contents($cacheFile), true) ?: []) : [];
$fresh = isset($cache['fetched'], $cache['data']) && time() - (int) $cache['fetched'] < (float) $cfg['cacheHours'] * 3600;
if ($fresh) {
    send_json($cache['data'], 1800);
}

function places_call(string $method, string $url, string $key, string $fieldMask, ?array $body = null): ?array
{
    $headers = ['X-Goog-Api-Key: ' . $key, 'X-Goog-FieldMask: ' . $fieldMask, 'Content-Type: application/json'];
    $payload = $body === null ? null : json_encode($body);
    $code = 0;
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 8,
            CURLOPT_CUSTOMREQUEST  => $method,
            CURLOPT_HTTPHEADER     => $headers,
        ]);
        if ($payload !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        }
        $res = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    } else {
        $ctx = stream_context_create(['http' => [
            'method' => $method, 'header' => implode("\r\n", $headers), 'content' => (string) $payload,
            'timeout' => 8, 'ignore_errors' => true,
        ]]);
        $res = @file_get_contents($url, false, $ctx);
        if (isset($http_response_header[0]) && preg_match('~\s(\d{3})\s~', $http_response_header[0], $m)) {
            $code = (int) $m[1];
        }
    }
    if (!is_string($res) || $res === '' || $code >= 400) {
        error_log('[adsquid hours] Places API HTTP ' . $code . ': ' . substr((string) $res, 0, 300));
        return null;
    }
    $json = json_decode($res, true);
    return is_array($json) ? $json : null;
}

// Short, readable summary in the site's style, week starting Saturday: "Sat-Thu, 10am-7pm"
function hours_summary(array $periods): string
{
    $names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $fmt = static function (int $min): string {
        $min %= 1440;
        $h = intdiv($min, 60);
        $m = $min % 60;
        $suffix = $h < 12 ? 'am' : 'pm';
        $h12 = $h % 12 === 0 ? 12 : $h % 12;
        return $h12 . ($m ? ':' . str_pad((string) $m, 2, '0', STR_PAD_LEFT) : '') . $suffix;
    };
    $byDay = array_fill(0, 7, []);
    foreach ($periods as [$od, $om, $cd, $cm]) {
        if ($cd === null) {
            return 'Open 24 hours';
        }
        $byDay[$od][] = $fmt($om) . '-' . $fmt($cm);
    }
    $groups = [];
    foreach ([6, 0, 1, 2, 3, 4, 5] as $d) {
        $sig = implode(', ', $byDay[$d]);
        $last = count($groups) - 1;
        if ($sig !== '' && $last >= 0 && $groups[$last]['sig'] === $sig && $groups[$last]['end'] === ($d + 6) % 7) {
            $groups[$last]['end'] = $d;
        } elseif ($sig !== '') {
            $groups[] = ['start' => $d, 'end' => $d, 'sig' => $sig];
        }
    }
    return implode('; ', array_map(static function ($g) use ($names) {
        $days = $names[$g['start']] . ($g['end'] !== $g['start'] ? '-' . $names[$g['end']] : '');
        return $days . ', ' . $g['sig'];
    }, $groups));
}

$key = trim((string) $cfg['apiKey']);
$placeId = trim((string) $cfg['placeId']) ?: (string) ($cache['placeId'] ?? '');

// 1. Find the listing once (ID-only search), then remember its Place ID
if ($placeId === '') {
    $found = places_call('POST', 'https://places.googleapis.com/v1/places:searchText', $key, 'places.id', [
        'textQuery'    => (string) $cfg['query'],
        'locationBias' => ['circle' => ['center' => ['latitude' => $cfg['near'][0], 'longitude' => $cfg['near'][1]], 'radius' => 3000.0]],
    ]);
    $placeId = (string) ($found['places'][0]['id'] ?? '');
}

// 2. Read the opening hours
$details = $placeId !== '' ? places_call('GET', 'https://places.googleapis.com/v1/places/' . rawurlencode($placeId), $key, 'regularOpeningHours') : null;
$raw = $details['regularOpeningHours']['periods'] ?? null;

if (!is_array($raw) || !$raw) {
    // Google did not answer: keep using the last good answer if there is one
    if (isset($cache['data']['ok']) && $cache['data']['ok']) {
        send_json($cache['data'], 900);
    }
    send_json(['ok' => false, 'reason' => 'no hours from Google'], 900);
}

$periods = [];
foreach ($raw as $p) {
    $o = $p['open'] ?? null;
    $c = $p['close'] ?? null;
    if (!is_array($o)) {
        continue;
    }
    $periods[] = [
        (int) ($o['day'] ?? 0), (int) ($o['hour'] ?? 0) * 60 + (int) ($o['minute'] ?? 0),
        is_array($c) ? (int) ($c['day'] ?? 0) : null, is_array($c) ? (int) ($c['hour'] ?? 0) * 60 + (int) ($c['minute'] ?? 0) : null,
    ];
}

$data = [
    'ok'      => true,
    'text'    => hours_summary($periods),
    'periods' => $periods,                       // [openDay, openMinute, closeDay, closeMinute], 0 = Sunday, Dhaka time
    'days'    => $details['regularOpeningHours']['weekdayDescriptions'] ?? [],
    'updated' => date('c'),
];
@file_put_contents($cacheFile, json_encode(['fetched' => time(), 'placeId' => $placeId, 'data' => $data]), LOCK_EX);
send_json($data, 1800);
