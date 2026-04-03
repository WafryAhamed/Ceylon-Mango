@echo off
REM ============================================
REM Ceylon Mango - Start Backend Server
REM ============================================

echo.
echo   ========================================
echo   Starting Ceylon Mango Backend...
echo   ========================================
echo.

cd /d "%~dp0backend"

echo Checking Maven and Java installation...
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Using Maven Wrapper...
    call mvnw.cmd spring-boot:run
) else (
    echo Using System Maven...
    mvn spring-boot:run
)

pause
