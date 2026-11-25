<?php
/*
 * Adsquid website form handler (contact, free audit, home audit).
 *
 * The website forms POST here. This file checks the message (spam traps, rate limit, required
 * fields), then emails it to the team. It works on any normal PHP hosting (cPanel, hPanel, DirectAdmin):
 *  - with no setup it uses the server's built-in mail(),
 *  - for reliable delivery, add your email account's SMTP login in api/mail-config.php
 *    (copy mail-config.example.php). See README.md > "Hosting on adsquidbd.com".
 *
 * Replies: JSON for the website's own JavaScript, or a redirect to /thank-you/ when JavaScript is off.
 * Needs PHP 7.4 or newer.
 */

declare(strict_types=1);

ini_set('display_errors', '0'); // never print PHP notices into the JSON reply

$config = [
    'to'           => 'info@adsquidbd.com',      // where messages go; separate several with commas
    'from'         => 'no-reply@adsquidbd.com',  // must be an address on your own domain
    'fromName'     => 'Adsquid Website',
    'allowedHosts' => ['adsquidbd.com', 'www.adsquidbd.com'],
    'smtp'         => null,                       // set in mail-config.php
    'leadsDir'     => dirname(__DIR__, 2) . '/adsquid-leads', // backup copy, outside public_html; false = off
    'rateLimit'    => 6,                          // messages per visitor (IP) per 10 minutes
    'thankYou'     => '/thank-you/',
];
if (is_file(__DIR__ . '/mail-config.php')) {
    $local = require __DIR__ . '/mail-config.php';
    if (is_array($local)) {
        $config = array_replace($config, $local);
    }
}

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false
    || strtolower($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'xmlhttprequest';

function reply(bool $ok, string $message, int $status, bool $json, string $thankYou): void
{
    http_response_code($status);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message]);
        exit;
    }
    if ($ok) {
        header('Location: ' . $thankYou, true, 303);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    $safe = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    echo '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<title>Message not sent | Adsquid</title>'
        . '<body style="font-family:system-ui,sans-serif;background:#07050D;color:#ECE8F3;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px">'
        . '<div style="max-width:520px"><h1 style="font-size:1.6rem">Your message was not sent</h1><p>' . $safe . '</p>'
        . '<p><a style="color:#C084FC" href="javascript:history.back()">Go back to the form</a> or '
        . '<a style="color:#C084FC" href="https://wa.me/8801888055999">message us on WhatsApp</a>.</p></div></body>';
    exit;
}

// 1. Only form posts
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Allow: POST');
    reply(false, 'Please use the form on the website.', 405, $wantsJson, $config['thankYou']);
}

// 2. Only from our own pages (blocks forms copied onto other sites)
$source = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($source !== '' && $source !== 'null') {
    $sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));
    $ownHost = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
    if ($sourceHost !== $ownHost && !in_array($sourceHost, $config['allowedHosts'], true)) {
        reply(false, 'This form only works on adsquidbd.com.', 403, $wantsJson, $config['thankYou']);
    }
}

// 3. Spam traps: a hidden field people never fill, and a form sent faster than a person can type.
//    Bots get a normal "thank you" so they do not learn anything.
$elapsed = isset($_POST['_e']) ? (float) $_POST['_e'] : -1.0;
if (trim((string) ($_POST['fax'] ?? '')) !== '' || ($elapsed >= 0 && $elapsed < 2.5)) {
    reply(true, 'Thank you!', 200, $wantsJson, $config['thankYou']);
}

// 4. Rate limit per visitor
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = rtrim(sys_get_temp_dir(), '/\\') . '/adsquid-form-' . sha1($ip . __FILE__) . '.json';
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = json_decode((string) @file_get_contents($rateFile), true) ?: [];
}
$hits = array_values(array_filter($hits, static function ($t) use ($now) { return is_int($t) && $now - $t < 600; }));
if (count($hits) >= (int) $config['rateLimit']) {
    reply(false, 'You have sent several messages in a few minutes. Please wait a little, or message us on WhatsApp.', 429, $wantsJson, $config['thankYou']);
}

// 5. Read and clean the fields (only the ones our forms have)
$labels = [
    'name'     => 'Name',
    'business' => 'Business',
    'email'    => 'Email',
    'phone'    => 'Phone',
    'whatsapp' => 'WhatsApp',
    'link'     => 'Website or page link',
    'service'  => 'Service',
    'budget'   => 'Monthly ad budget',
    'goal'     => 'Main goal',
    'message'  => 'Message',
];
$clean = static function (string $value, int $max, bool $multiline = false): string {
    $value = strip_tags($value);
    $value = $multiline
        ? preg_replace('/[^\P{Cc}\n\t]/u', '', str_replace("\r\n", "\n", $value))
        : preg_replace('/\p{Cc}+/u', ' ', $value);
    $value = trim((string) $value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
};
$fields = [];
foreach ($labels as $key => $label) {
    if (!isset($_POST[$key]) || !is_string($_POST[$key])) {
        continue;
    }
    $v = $clean($_POST[$key], $key === 'message' || $key === 'goal' ? 5000 : 300, $key === 'message' || $key === 'goal');
    if ($v !== '') {
        $fields[$key] = $v;
    }
}
$len = static function (string $s): int { return function_exists('mb_strlen') ? mb_strlen($s) : strlen($s); };
$formId = preg_replace('/[^a-z0-9-]/', '', strtolower((string) ($_POST['form'] ?? ($_POST['_form'] ?? 'website'))));
$page = $clean((string) ($_POST['page'] ?? (string) parse_url((string) ($_SERVER['HTTP_REFERER'] ?? ''), PHP_URL_PATH)), 200);

// 6. Required: a name, and a way to reply
if ($len($fields['name'] ?? '') < 2) {
    reply(false, 'Please add your name.', 422, $wantsJson, $config['thankYou']);
}
if (isset($fields['email']) && !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    reply(false, 'That email address does not look right. Please check it.', 422, $wantsJson, $config['thankYou']);
}
$phone = $fields['whatsapp'] ?? ($fields['phone'] ?? '');
if (!isset($fields['email']) && strlen(preg_replace('/\D/', '', $phone)) < 7) {
    reply(false, 'Please add a phone, WhatsApp number or email so we can reply.', 422, $wantsJson, $config['thankYou']);
}

// 7. Build the email
$titles = ['free-audit' => 'Free audit request', 'home-audit' => 'Free audit request', 'contact' => 'New message'];
$title = $titles[$formId] ?? 'Website enquiry';
$oneLine = static function (string $s): string { return trim(preg_replace('/[\r\n]+/', ' ', $s)); };
$subject = $oneLine('[Adsquid] ' . $title . ' from ' . $fields['name']);
$when = (new DateTime('now', new DateTimeZone('Asia/Dhaka')))->format('D j M Y, g:i a') . ' (Dhaka time)';
$host = preg_replace('/[^a-z0-9.-]/i', '', $_SERVER['HTTP_HOST'] ?? 'adsquidbd.com');

$text = $title . "\n" . str_repeat('=', strlen($title)) . "\n\n";
$rows = '';
foreach ($fields as $key => $value) {
    $text .= $labels[$key] . ': ' . $value . "\n";
    $shown = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    if ($key === 'email') {
        $shown = '<a href="mailto:' . $shown . '">' . $shown . '</a>';
    } elseif ($key === 'whatsapp' || $key === 'phone') {
        $digits = preg_replace('/\D/', '', $value);
        if (strlen($digits) === 11 && $digits[0] === '0') {
            $digits = '88' . $digits; // Bangladeshi local number
        }
        if (strlen($digits) >= 7) {
            $shown .= ' &nbsp;<a href="https://wa.me/' . $digits . '">WhatsApp</a> &middot; <a href="tel:+' . $digits . '">Call</a>';
        }
    } elseif ($key === 'link' && preg_match('~^(https?://|www\.)~i', $value)) {
        $href = stripos($value, 'http') === 0 ? $value : 'https://' . $value;
        $shown = '<a href="' . htmlspecialchars($href, ENT_QUOTES, 'UTF-8') . '">' . $shown . '</a>';
    } else {
        $shown = nl2br($shown);
    }
    $rows .= '<tr><td style="padding:10px 14px;border-bottom:1px solid #eee;color:#666;white-space:nowrap;vertical-align:top">'
        . htmlspecialchars($labels[$key], ENT_QUOTES, 'UTF-8') . '</td><td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111">'
        . $shown . '</td></tr>';
}
$text .= "\nSent from: https://" . $host . $page . "\nTime: " . $when . "\n";
$html = '<!doctype html><html><body style="margin:0;padding:24px;background:#f6f4fa;font-family:Arial,sans-serif">'
    . '<table role="presentation" width="100%" style="max-width:620px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border-collapse:collapse">'
    . '<tr><td colspan="2" style="background:#8800D4;color:#fff;padding:18px 22px;font-size:18px;font-weight:bold">' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</td></tr>'
    . $rows
    . '<tr><td colspan="2" style="padding:14px 22px;color:#888;font-size:12px">Sent from https://' . htmlspecialchars($host . $page, ENT_QUOTES, 'UTF-8') . '<br>' . $when . '</td></tr>'
    . '</table></body></html>';

$from = $oneLine((string) $config['from']);
$fromName = $oneLine((string) $config['fromName']);
$recipients = array_values(array_filter(array_map('trim', explode(',', (string) $config['to'])), static function ($a) {
    return (bool) filter_var($a, FILTER_VALIDATE_EMAIL);
}));
$replyTo = isset($fields['email']) ? $oneLine($fields['email']) : '';
$encode = static function (string $s): string { return '=?UTF-8?B?' . base64_encode($s) . '?='; };
$boundary = 'adsq_' . bin2hex(random_bytes(12));

$headers = [
    'Date: ' . date('r'),
    'From: ' . $encode($fromName) . ' <' . $from . '>',
    'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . (substr(strrchr($from, '@') ?: '@adsquidbd.com', 1)) . '>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'X-Mailer: Adsquid website',
];
if ($replyTo !== '') {
    $headers[] = 'Reply-To: ' . $encode($fields['name']) . ' <' . $replyTo . '>';
}
$body = '--' . $boundary . "\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($text)) . "\r\n"
    . '--' . $boundary . "\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($html)) . "\r\n"
    . '--' . $boundary . "--\r\n";

// 8. Send (SMTP when configured, otherwise PHP mail())
function smtp_send(array $s, string $from, array $to, string $data, string &$error): bool
{
    $secure = strtolower((string) ($s['secure'] ?? 'ssl'));
    $port = (int) ($s['port'] ?? ($secure === 'ssl' ? 465 : 587));
    $verify = !isset($s['verify']) || (bool) $s['verify'];
    $ctx = stream_context_create(['ssl' => ['verify_peer' => $verify, 'verify_peer_name' => $verify, 'allow_self_signed' => !$verify]]);
    $fp = @stream_socket_client(($secure === 'ssl' ? 'ssl://' : 'tcp://') . $s['host'] . ':' . $port, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        $error = "connect failed: $errstr ($errno)";
        return false;
    }
    stream_set_timeout($fp, 20);
    $read = static function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return $out;
    };
    // $secret: never copy this line (login details, message text) into the error message
    $cmd = static function (?string $line, array $expect, bool $secret = false) use ($fp, $read, &$error): bool {
        if ($line !== null) {
            fwrite($fp, $line . "\r\n");
        }
        $res = $read();
        if (!in_array((int) substr($res, 0, 3), $expect, true)) {
            $shown = $line === null ? 'connect' : ($secret ? '(hidden)' : substr($line, 0, 60));
            $error = trim($shown . ' -> ' . $res);
            return false;
        }
        return true;
    };
    $helo = preg_replace('/[^a-z0-9.-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost');
    $ok = $cmd(null, [220]) && $cmd('EHLO ' . $helo, [250]);
    if ($ok && $secure === 'tls') {
        $ok = $cmd('STARTTLS', [220])
            && stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
            && $cmd('EHLO ' . $helo, [250]);
    }
    if ($ok && !empty($s['user'])) {
        $ok = $cmd('AUTH LOGIN', [334])
            && $cmd(base64_encode((string) $s['user']), [334], true)
            && $cmd(base64_encode((string) ($s['pass'] ?? '')), [235], true);
    }
    $ok = $ok && $cmd('MAIL FROM:<' . $from . '>', [250]);
    foreach ($to as $rcpt) {
        $ok = $ok && $cmd('RCPT TO:<' . $rcpt . '>', [250, 251]);
    }
    if ($ok) {
        $payload = preg_replace('/^\./m', '..', str_replace(["\r\n", "\n"], ["\n", "\r\n"], $data));
        $ok = $cmd('DATA', [354]) && $cmd($payload . "\r\n.", [250], true);
    }
    fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok;
}

$sent = false;
$error = '';
if ($recipients) {
    if (!empty($config['smtp']['host'])) {
        $data = 'To: ' . implode(', ', $recipients) . "\r\n" . 'Subject: ' . $encode($subject) . "\r\n" . implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $sent = smtp_send($config['smtp'], $from, $recipients, $data, $error);
    } else {
        $sent = @mail(implode(', ', $recipients), $encode($subject), $body, implode("\r\n", $headers), '-f' . $from);
        if (!$sent) {
            $error = 'mail() returned false';
        }
    }
} else {
    $error = 'no valid "to" address in the config';
}

// 9. Keep a private backup copy (outside the public website folder) so a lead is never lost
if (!empty($config['leadsDir'])) {
    $dir = (string) $config['leadsDir'];
    if (is_dir($dir) || @mkdir($dir, 0700, true)) {
        $file = $dir . '/leads-' . date('Y-m') . '.csv';
        $isNew = !is_file($file);
        if ($fh = @fopen($file, 'ab')) {
            if ($isNew) {
                fputcsv($fh, ['time', 'form', 'page', 'emailed', 'fields'], ',', '"', '\\');
            }
            fputcsv($fh, [date('c'), $formId, $page, $sent ? 'yes' : 'NO: ' . $error, json_encode($fields, JSON_UNESCAPED_UNICODE)], ',', '"', '\\');
            fclose($fh);
        }
    }
}

if (!$sent) {
    error_log('[adsquid form] email not sent: ' . $error);
    reply(false, 'Sorry, our mail server did not accept the message. Please message us on WhatsApp instead.', 502, $wantsJson, $config['thankYou']);
}

$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);
reply(true, 'Thank you! We will reply within one working day.', 200, $wantsJson, $config['thankYou']);
