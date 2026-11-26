<?php
/*
 * Live office hours from Google Maps (optional).
 *
 * 1. Make a copy of this file named "hours-config.php" in the same folder (api/ in the website's folder).
 * 2. Paste your Google Maps Platform API key below (Places API (New) must be enabled for it).
 * 3. Save. Open https://adsquidbd.com/api/hours.php: it should show "ok":true and your hours.
 *
 * hours-config.php holds a key, so it is listed in .gitignore and api/.htaccess blocks it from the web.
 */
return [
    'apiKey'  => 'PASTE-YOUR-API-KEY-HERE',

    // Optional: the Google Place ID of the Adsquid listing. Leave empty and it is found automatically.
    'placeId' => '',

    // How long to keep the hours before asking Google again (hours).
    'cacheHours' => 6,
];
