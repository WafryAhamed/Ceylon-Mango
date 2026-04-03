@echo off
REM ============================================
REM Ceylon Mango - Start Frontend Server
REM ============================================

echo.
echo   ========================================
echo   Starting Ceylon Mango Frontend...
echo   ========================================
echo.

cd /d "%~dp0frontend"

echo Installing dependencies...
call npm install

echo.
echo   ========================================
echo   Running development server...
echo   ========================================
echo   Access at: http://localhost:5173/
echo   ========================================
echo.

call npm run dev

pause
