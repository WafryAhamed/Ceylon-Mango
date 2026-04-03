@echo off
REM Ceylon Mango - Quick Test Launcher
REM This script runs the PowerShell QA test suite

echo.
echo === Ceylon Mango - Full QA Test Suite ===
echo.
echo This will perform comprehensive system validation...
echo.

REM Check if PowerShell is available
where powershell >nul 2>&1
if errorlevel 1 (
    echo ERROR: PowerShell is not available on this system
    pause
    exit /b 1
)

REM Run the PowerShell test script
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run-full-test.ps1"

REM Keep window open if test completed
echo.
echo Press any key to close this window...
pause >nul
