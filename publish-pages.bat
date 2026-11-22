@echo off
rem Builds the GitHub Pages copy (served from /Adsquid/) and publishes it to the gh-pages branch.
rem Live at https://shaadsifat.github.io/Adsquid/ once Settings > Pages uses branch "gh-pages", folder "/ (root)".
cd /d "%~dp0"
node src\build.mjs --base=/Adsquid --out=build-pages --noindex || exit /b 1
cd build-pages
git init -q -b gh-pages
git add -A
git commit -q -m "Publish site"
git push -f https://github.com/shaadsifat/Adsquid.git gh-pages
rmdir /s /q .git
cd ..
echo.
echo Published. Site: https://shaadsifat.github.io/Adsquid/
