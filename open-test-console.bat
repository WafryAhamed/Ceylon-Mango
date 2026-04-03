@echo off
REM Ceylon Mango - API Test Console Launcher
REM This script opens the interactive API testing interface in your default browser

echo.
echo === Ceylon Mango - API Test Console ===
echo.
echo Opening interactive testing interface...
echo.

REM Get the directory of this script
setlocal enabledelayedexpansion
set "scriptDir=%~dp0"
set "consoleFile=!scriptDir!api-test-console.html"

REM Convert to absolute path
cd /d "%scriptDir%"
set "fullPath=%CD%\api-test-console.html"

REM Check if file exists
if not exist "%fullPath%" (
    echo ERROR: api-test-console.html not found at:
    echo %fullPath%
    pause
    exit /b 1
)

REM Open in default browser
start "" "%fullPath%"

echo.
echo The test console should open in your default browser...
echo.
echo TIPS:
echo - Make sure backend is running on port 8080
echo - Make sure frontend is running on port 5173
echo - Use the login buttons to test authentication
echo - Click "Run All Tests" for automated testing
echo.
echo Press any key to close this window...
pause >nul
