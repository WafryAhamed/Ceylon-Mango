#!/usr/bin/env pwsh
# Ceylon Mango E-commerce Platform - Quick Start Script
# This script sets up and runs both backend and frontend

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "🥭 Ceylon Mango E-commerce Platform" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# Color constants
$successColor = "Green"
$errorColor = "Red"
$warningColor = "Yellow"
$infoColor = "Cyan"

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor $infoColor

# Check if backend directory exists
if (-not (Test-Path "backend")) {
    Write-Host "❌ Backend directory not found!" -ForegroundColor $errorColor
    exit 1
}

# Check if frontend directory exists
if (-not (Test-Path "frontend")) {
    Write-Host "❌ Frontend directory not found!" -ForegroundColor $errorColor
    exit 1
}

Write-Host "✅ Directory structure OK" -ForegroundColor $successColor
Write-Host ""

# Check PostgreSQL
Write-Host "🔍 Checking PostgreSQL connection..." -ForegroundColor $infoColor
$pgTest = $null
try {
    # Try to connect to PostgreSQL
    $pgTest = psql -U postgres -h localhost -c "SELECT 1" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ PostgreSQL is running and accessible" -ForegroundColor $successColor
    } else {
        Write-Host "⚠️  Could not connect to PostgreSQL" -ForegroundColor $warningColor
        Write-Host "   Make sure PostgreSQL is running on localhost:5432" -ForegroundColor $warningColor
        Write-Host "   This is NOT required - backend will handle it" -ForegroundColor $warningColor
    }
} catch {
    Write-Host "⚠️  PostgreSQL check skipped (psql not in PATH)" -ForegroundColor $warningColor
}
Write-Host ""

# Check Node.js
Write-Host "🔍 Checking Node.js..." -ForegroundColor $infoColor
$nodeVersion = node -v
Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor $successColor
Write-Host ""

# Check Java
Write-Host "🔍 Checking Java..." -ForegroundColor $infoColor
$javaVersion = java -version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Java is available" -ForegroundColor $successColor
} else {
    Write-Host "⚠️  Java not found in PATH (Maven wrapper will handle it)" -ForegroundColor $warningColor
}
Write-Host ""

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "🚀 Starting Ceylon Mango Application" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📌 INSTRUCTIONS:" -ForegroundColor $infoColor
Write-Host "1. This script will open TWO terminal windows" -ForegroundColor $infoColor
Write-Host "2. Terminal 1: Backend (Spring Boot on :8080)" -ForegroundColor $infoColor
Write-Host "3. Terminal 2: Frontend (React/Vite on :5173)" -ForegroundColor $infoColor
Write-Host "4. WAIT for 'Started CeylonMangoApplication' message in backend" -ForegroundColor $infoColor
Write-Host "5. Then WAIT for 'Local: http://localhost:5173' in frontend" -ForegroundColor $infoColor
Write-Host "6. After both are ready, open http://localhost:5173 in your browser" -ForegroundColor $infoColor
Write-Host ""

$response = Read-Host "Ready to start? (Y/N)"
if ($response -ne 'Y' -and $response -ne 'y') {
    Write-Host "❌ Startup cancelled" -ForegroundColor $errorColor
    exit 0
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "✅ Starting Backend..." -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green

# Start backend in new window
$backendScriptBlock = {
    cd backend
    Write-Host "🔄 Installing/updating dependencies..." -ForegroundColor Cyan
    ./mvnw.cmd spring-boot:run 2>&1
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$((Get-Location).Path)'; $backendScriptBlock"

# Wait a bit for backend to start
Write-Host "⏳ Waiting 5 seconds for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "✅ Starting Frontend..." -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green

# Start frontend in new window
$frontendScriptBlock = {
    cd frontend
    
    Write-Host "📦 Checking dependencies..." -ForegroundColor Cyan
    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing npm dependencies (first time)..." -ForegroundColor Cyan
        npm install
    }
    
    Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
    npm run dev 2>&1
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$((Get-Location).Path)'; $frontendScriptBlock"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "✅ STARTUP PROCESS INITIATED" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""

Write-Host "📌 NEXT STEPS:" -ForegroundColor $infoColor
Write-Host "1. Check Backend Terminal for 'Started CeylonMangoApplication'" -ForegroundColor $infoColor
Write-Host "2. Check Frontend Terminal for 'Local: http://localhost:5173'" -ForegroundColor $infoColor
Write-Host "3. Open http://localhost:5173 in your browser" -ForegroundColor $infoColor
Write-Host ""

Write-Host "🔗 URLs:" -ForegroundColor $infoColor
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend:  http://localhost:8080" -ForegroundColor White
Write-Host "   API:      http://localhost:8080/api" -ForegroundColor White
Write-Host ""

Write-Host "👤 DEFAULT ACCOUNTS:" -ForegroundColor $infoColor
Write-Host "   Admin Email:    admin@ceylonmango.lk" -ForegroundColor White
Write-Host "   Admin Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "   User Email:     john@example.com" -ForegroundColor White
Write-Host "   User Password:  password123" -ForegroundColor White
Write-Host ""

Write-Host "✨ Happy coding with Ceylon Mango! 🥭" -ForegroundColor Green

# Keep this window open
Read-Host "Press ENTER to close this window (other windows will stay open)"
