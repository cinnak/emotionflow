# Simple HTTP Server for EmotionFlow Testing
Write-Host "Starting EmotionFlow Test Server..." -ForegroundColor Green
Write-Host "Navigate to http://localhost:8080/test-exact.html to test particles" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Python HTTP server
try {
    python -m http.server 8080
}
catch {
    Write-Host "Python not found, trying python3..." -ForegroundColor Yellow
    python3 -m http.server 8080
}
