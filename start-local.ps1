$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$pgBin = "C:\Program Files\PostgreSQL\17\bin"
$pgData = "C:\Users\USER\Documents\university-serverside\.pgdata"

& "$pgBin\pg_isready.exe" -h 127.0.0.1 -p 54329 | Out-Null
if ($LASTEXITCODE -ne 0) {
    & "$pgBin\pg_ctl.exe" -D $pgData -o "-p 54329 -c listen_addresses=127.0.0.1" -l "$pgData\server.log" start | Out-Null
    Start-Sleep -Seconds 4
}

$exists = & "$pgBin\psql.exe" -h 127.0.0.1 -p 54329 -U postgres -d postgres -Atc "SELECT 1 FROM pg_database WHERE datname='mededge'"
if ($exists -ne "1") {
    & "$pgBin\psql.exe" -h 127.0.0.1 -p 54329 -U postgres -d postgres -c "CREATE DATABASE mededge" | Out-Null
}

Set-Location "$root\Back_End"
if (-not (Test-Path "$root\Front_End\dist\index.html")) {
    Set-Location "$root\Front_End"
    npm run build
    Set-Location "$root\Back_End"
}

bun src/drizzle/migrate.ts
bun src/drizzle/seed.ts
Write-Host ""
Write-Host "MedEdge: http://localhost:3000   demo login: demo@mededge.app / MedEdge2026"
bun src/server.ts
