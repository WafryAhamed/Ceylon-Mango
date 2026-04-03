# Ceylon Mango - Full QA Test Suite Runner
# This script runs all tests and validates the entire system
# Usage: .\run-full-test.ps1

$ErrorActionPreference = "Continue"

# Colors for output
function Write-Success { Write-Host "✅ $args" -ForegroundColor Green }
function Write-Error-Custom { Write-Host "❌ $args" -ForegroundColor Red }
function Write-Info { Write-Host "ℹ️  $args" -ForegroundColor Blue }
function Write-Warning-Custom { Write-Host "⚠️  $args" -ForegroundColor Yellow }
function Write-Section { Write-Host "`n$('=' * 60)`n$args`n$('=' * 60)`n" -ForegroundColor Cyan }

# Summary tracking
$testSummary = @{
    Total = 0
    Passed = 0
    Failed = 0
    Skipped = 0
}

Write-Section "🥭 CEYLON MANGO - FULL QA TEST SUITE"

# ===== 1. SYSTEM CHECK =====
Write-Section "1️⃣  SYSTEM PREREQUISITES CHECK"

# Check Node.js
Write-Host "Checking Node.js..." -NoNewline
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Success "Node.js installed: $nodeVersion"
    $testSummary.Passed++
} else {
    Write-Error-Custom "Node.js not found. Please install Node.js"
    $testSummary.Failed++
}
$testSummary.Total++

# Check Java
Write-Host "Checking Java..." -NoNewline
$javaVersion = java -version 2>&1
if ($javaVersion -match "version") {
    Write-Success "Java is installed"
    $testSummary.Passed++
} else {
    Write-Error-Custom "Java not found. Please install JDK 21+"
    $testSummary.Failed++
}
$testSummary.Total++

# Check PostgreSQL
Write-Host "Checking PostgreSQL connection..." -NoNewline
$pgCheck = psql --version 2>$null
if ($pgCheck) {
    Write-Success "PostgreSQL client found"
    $testSummary.Passed++
} else {
    Write-Warning-Custom "PostgreSQL client not found (non-critical)"
    $testSummary.Skipped++
}
$testSummary.Total++

# ===== 2. BACKEND BUILD =====
Write-Section "2️⃣  BACKEND BUILD VALIDATION"

Write-Host "Building backend with Maven..." -NoNewline
$buildOutput = (cd "$PSScriptRoot\backend" && .\mvnw.cmd clean compile 2>&1)
if ($LASTEXITCODE -eq 0) {
    Write-Success "Backend compilation successful"
    $testSummary.Passed++
    # Extract file count from output
    if ($buildOutput -match "(\d+) source files") {
        Write-Info "Compiled $($matches[1]) source files"
    }
} else {
    Write-Error-Custom "Backend compilation failed"
    Write-Host $buildOutput
    $testSummary.Failed++
}
$testSummary.Total++

# ===== 3. FRONTEND DEPENDENCY CHECK =====
Write-Section "3️⃣  FRONTEND DEPENDENCY CHECK"

Write-Host "Checking frontend dependencies..." -NoNewline
if (Test-Path "$PSScriptRoot\frontend\node_modules") {
    Write-Success "node_modules already installed"
    $testSummary.Passed++
} else {
    Write-Host "Installing dependencies..." -NoNewline
    $npmInstall = (cd "$PSScriptRoot\frontend" && npm install 2>&1)
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Frontend dependencies installed"
        $testSummary.Passed++
    } else {
        Write-Error-Custom "Failed to install frontend dependencies"
        $testSummary.Failed++
    }
}
$testSummary.Total++

# ===== 4. PROJECT STRUCTURE =====
Write-Section "4️⃣  PROJECT STRUCTURE VALIDATION"

$requiredDirs = @(
    "backend\src\main\java",
    "backend\src\main\resources",
    "frontend\src",
    "frontend\src\pages",
    "frontend\src\components",
    "frontend\src\api"
)

foreach ($dir in $requiredDirs) {
    $fullPath = Join-Path $PSScriptRoot $dir
    if (Test-Path $fullPath) {
        Write-Success "Directory exists: $dir"
        $testSummary.Passed++
    } else {
        Write-Error-Custom "Missing directory: $dir"
        $testSummary.Failed++
    }
    $testSummary.Total++
}

# ===== 5. CONFIGURATION FILES =====
Write-Section "5️⃣  CONFIGURATION FILES VALIDATION"

$configFiles = @(
    "backend\src\main\resources\application.properties",
    "backend\pom.xml",
    "frontend\package.json",
    "frontend\vite.config.js",
    "frontend\tailwind.config.js"
)

foreach ($file in $configFiles) {
    $fullPath = Join-Path $PSScriptRoot $file
    if (Test-Path $fullPath) {
        Write-Success "Config found: $file"
        $testSummary.Passed++
    } else {
        Write-Error-Custom "Missing config: $file"
        $testSummary.Failed++
    }
    $testSummary.Total++
}

# ===== 6. DOCUMENTATION CHECK =====
Write-Section "6️⃣  DOCUMENTATION FILES"

$docFiles = @(
    "SETUP_GUIDE.md",
    "CONFIGURATION_SUMMARY.md",
    "QA_TEST_PLAN.md",
    "README.md"
)

foreach ($doc in $docFiles) {
    $fullPath = Join-Path $PSScriptRoot $doc
    if (Test-Path $fullPath) {
        Write-Success "Documentation found: $doc"
        $testSummary.Passed++
    } else {
        Write-Warning-Custom "Missing documentation: $doc"
        $testSummary.Skipped++
    }
    $testSummary.Total++
}

# ===== 7. PORT AVAILABILITY =====
Write-Section "7️⃣  PORT AVAILABILITY CHECK"

$portsToCheck = @(
    @{Port = 8080; Service = "Backend (Spring Boot)"},
    @{Port = 5173; Service = "Frontend (Vite)"},
    @{Port = 5432; Service = "PostgreSQL"}
)

foreach ($portCheck in $portsToCheck) {
    $socketTest = Test-NetConnection -ComputerName localhost -Port $portCheck.Port -ErrorAction SilentlyContinue
    if (-not $socketTest.TcpTestSucceeded) {
        Write-Success "Port $($portCheck.Port) is available - $($portCheck.Service)"
        $testSummary.Passed++
    } else {
        Write-Warning-Custom "Port $($portCheck.Port) is already in use - $($portCheck.Service)"
        $testSummary.Skipped++
    }
    $testSummary.Total++
}

# ===== 8. API TEST AVAILABILITY =====
Write-Section "8️⃣  API TEST SCRIPT"

$apiTestPath = Join-Path $PSScriptRoot "api-test.js"
if (Test-Path $apiTestPath) {
    Write-Success "API test script available: api-test.js"
    $testSummary.Passed++
} else {
    Write-Warning-Custom "API test script not found"
    $testSummary.Skipped++
}
$testSummary.Total++

# ===== FINAL SUMMARY =====
Write-Section "📊 TEST SUMMARY"

$totalTests = $testSummary.Total
$passedTests = $testSummary.Passed
$failedTests = $testSummary.Failed
$skippedTests = $testSummary.Skipped

if ($totalTests -gt 0) {
    $percentage = [Math]::Round(($passedTests / $totalTests) * 100, 1)
} else {
    $percentage = 0
}

Write-Host "Total Tests: $totalTests"
Write-Host "✅ Passed: $passedTests"
Write-Host "❌ Failed: $failedTests"
Write-Host "⏭️  Skipped: $skippedTests"
Write-Host "Success Rate: $percentage%"

if ($percentage -eq 100 -and $failedTests -eq 0) {
    Write-Success "ALL CHECKS PASSED! 🎉 System is ready for testing."
} elseif ($percentage -ge 90) {
    Write-Warning-Custom "Most checks passed ($percentage%). Some warnings above."
} else {
    Write-Error-Custom "Multiple issues detected. Please review above."
}

# ===== NEXT STEPS =====
Write-Section "📋 NEXT STEPS"

Write-Host "1. Start Backend:"
Write-Host "   cd backend"
Write-Host "   .\mvnw.cmd spring-boot:run"
Write-Host ""
Write-Host "2. Start Frontend (in new terminal):"
Write-Host "   cd frontend"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "3. Run API Tests (once both are running):"
Write-Host "   node api-test.js"
Write-Host ""
Write-Host "4. Open browser:"
Write-Host "   Frontend: http://localhost:5173"
Write-Host "   Backend:  http://localhost:8080/swagger-ui.html (if available)"
Write-Host ""

Write-Info "For detailed test documentation, see: QA_TEST_PLAN.md"
Write-Info "For setup instructions, see: SETUP_GUIDE.md"
