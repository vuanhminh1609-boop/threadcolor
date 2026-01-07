param(
  [ValidateSet("snapshot", "bundle", "both")]
  [string]$Mode = "both"
)

$ErrorActionPreference = "Stop"
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
try { chcp 65001 | Out-Null } catch {}

function Get-RepoRoot {
  try {
    return (git rev-parse --show-toplevel).Trim()
  } catch {
    return $null
  }
}

function Redact-Remote([string]$text) {
  if (-not $text) { return $text }
  return ($text -replace '(https?://)[^/@]+@', '$1***@')
}

function Test-ExcludedPath([string]$relativePath) {
  $excludedDirs = @(
    ".git",
    "node_modules",
    "functions/node_modules",
    "functions/lib",
    "dist",
    "build",
    ".next",
    "coverage",
    ".cache",
    ".firebase",
    "functions/.firebase"
  )
  foreach ($dir in $excludedDirs) {
    if ($relativePath -like "$dir/*" -or $relativePath -eq $dir) { return $true }
  }
  if ($relativePath -like "*.log") { return $true }
  return $false
}

function Get-RelativePath([string]$root, [string]$fullPath) {
  return ($fullPath.Substring($root.Length)).TrimStart("\", "/").Replace("\", "/")
}

function Find-SensitiveFiles([string]$root) {
  $patterns = @(".env", "*.pem", "*key*", "serviceAccount*.json", "*token*", "*credential*", "*credentials*")
  $results = @()
  Get-ChildItem -Force -Recurse -File -Path $root | ForEach-Object {
    $rel = Get-RelativePath $root $_.FullName
    if ($rel -like ".git/*") { return }
    if (Test-ExcludedPath $rel) { return }
    foreach ($pattern in $patterns) {
      if ($rel -like $pattern) {
        if ($rel -ieq ".env.example") { return }
        if ($rel -ieq ".env") { $results += $rel; break }
        if ($rel -like "*/.env") { $results += $rel; break }
        $results += $rel
        break
      }
    }
  }
  return ($results | Sort-Object -Unique)
}

function Write-Manifest([string]$root) {
  $manifest = Join-Path $root "repo_manifest.txt"
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("==== REPO MANIFEST ====")
  $lines.Add(("Thời điểm: {0}" -f (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")))
  try { $lines.Add(("Commit: {0}" -f (git rev-parse HEAD).Trim())) } catch { $lines.Add("Commit: (không lấy được)") }
  $lines.Add("")
  $lines.Add("=== Branches ===")
  try { $lines.AddRange((git branch -a) -split "`n") } catch { $lines.Add("Không lấy được branch.") }
  $lines.Add("")
  $lines.Add("=== Remotes ===")
  try { $lines.AddRange((Redact-Remote (git remote -v)) -split "`n") } catch { $lines.Add("Không lấy được remote.") }
  $lines.Add("")
  $lines.Add("=== Status ===")
  try { $lines.AddRange((git status --porcelain) -split "`n") } catch { $lines.Add("Không lấy được status.") }
  $lines.Add("")
  $lines.Add("=== Tracked files ===")
  try { $lines.AddRange((git ls-files) -split "`n") } catch { $lines.Add("Không lấy được file list.") }
  $lines.Add("")
  $lines.Add("=== Tree ===")
  if (Get-Command tree -ErrorAction SilentlyContinue) {
    $lines.AddRange((tree /f /a) -split "`n")
  } else {
    Get-ChildItem -Force -Recurse -Path $root | ForEach-Object {
      $lines.Add((Get-RelativePath $root $_.FullName))
    }
  }
  Set-Content -Path $manifest -Value $lines -Encoding UTF8
}

function New-SnapshotZip([string]$root) {
  $zipPath = Join-Path $root "repo_snapshot.zip"
  if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

  Add-Type -AssemblyName System.IO.Compression
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    Get-ChildItem -Force -Recurse -File -Path $root | ForEach-Object {
      $rel = Get-RelativePath $root $_.FullName
      if (Test-ExcludedPath $rel) { return }
      if ($rel -eq "repo_snapshot.zip" -or $rel -eq "repo.bundle") { return }
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel) | Out-Null
    }
  } finally {
    $zip.Dispose()
  }
}

function New-GitBundle([string]$root) {
  $bundlePath = Join-Path $root "repo.bundle"
  if (Test-Path $bundlePath) { Remove-Item $bundlePath -Force }
  git bundle create $bundlePath --all | Out-Null
}

$root = Get-RepoRoot
if (-not $root) {
  Write-Error "Không tìm thấy repo Git. Hãy chạy script trong repo."
  exit 1
}

Set-Location $root

Write-Host "Quét file nhạy cảm..."
$sensitive = Find-SensitiveFiles $root
if ($sensitive.Count -gt 0) {
  Write-Warning "Phát hiện file có thể nhạy cảm. Hãy xử lý trước khi xuất:"
  $sensitive | ForEach-Object { Write-Host (" - {0}" -f $_) }
  exit 2
}

Write-Manifest $root

if ($Mode -eq "snapshot" -or $Mode -eq "both") {
  Write-Host "Tạo snapshot zip..."
  New-SnapshotZip $root
}

if ($Mode -eq "bundle" -or $Mode -eq "both") {
  Write-Host "Tạo git bundle..."
  New-GitBundle $root
}

Write-Host "Hoàn tất:"
$completed = @()
if ($Mode -eq "snapshot" -or $Mode -eq "both") { $completed += "repo_snapshot.zip" }
if ($Mode -eq "bundle" -or $Mode -eq "both") { $completed += "repo.bundle" }
$completed += "repo_manifest.txt"
$completed | ForEach-Object { Write-Host (" - {0}" -f $_) }
