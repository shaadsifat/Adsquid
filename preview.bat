@echo off
rem Double-click to build the site and open it in your browser.
cd /d "%~dp0"
node src\build.mjs
rem ?motion forces animations on, even if Windows animations are turned off
start "" "http://localhost:8080/?motion"
node serve.mjs
