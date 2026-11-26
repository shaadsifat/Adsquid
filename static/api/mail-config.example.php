<?php
/*
 * Form email settings.
 *
 * 1. Make a copy of this file named "mail-config.php" in the same folder (api/ in the website's folder).
 * 2. Fill in the SMTP login of an email account you created in cPanel > Email Accounts.
 * 3. Save. That's it: the website forms now send through your own mail server.
 *
 * mail-config.php holds a password, so it is listed in .gitignore and never goes to GitHub,
 * and api/.htaccess blocks anyone from opening it in a browser.
 * Without mail-config.php the forms still work, using the server's built-in PHP mail().
 */
return [
    // Who receives the form messages. Several: 'info@adsquidbd.com, sales@adsquidbd.com'
    'to'   => 'info@adsquidbd.com',

    // The sender. Must be a real mailbox on adsquidbd.com (the same one you log in with below).
    'from' => 'no-reply@adsquidbd.com',

    // Your mail server login (cPanel > Email Accounts > Connect Devices shows these values).
    'smtp' => [
        'host'   => 'mail.adsquidbd.com',
        'port'   => 465,           // 465 with 'ssl', or 587 with 'tls'
        'secure' => 'ssl',
        'user'   => 'no-reply@adsquidbd.com',
        'pass'   => 'PUT-THE-MAILBOX-PASSWORD-HERE',
        // 'verify' => false,      // only if the host's mail certificate is not valid yet
    ],

    // A private backup of every message (CSV) is kept one folder above public_html.
    // Set to false to turn it off.
    // 'leadsDir' => false,
];
