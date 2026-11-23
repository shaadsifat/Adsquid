@echo off
rem Builds the GitHub Pages copy (served from /Adsquid/) and publishes it to the gh-pages branch.
rem Live at https://shaadsifat.github.io/Adsquid/ once Settings > Pages uses branch "gh-pages", folder "/ (root)".
cd /d "%~dp0"
node src\publish-pages.mjs
pause
