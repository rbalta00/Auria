<#
Publica cambios de este repo: git commit + push a GitHub, en un solo paso.
Vercel (auria1) está conectado a GitHub, así que el deploy se dispara solo
después del push — no hace falta correr "vercel --prod" a mano.

Uso:
  .\deploy.ps1 "mensaje del cambio"
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$Mensaje
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

git add -A
$hayCambios = git status --porcelain
if ($hayCambios) {
    git commit -m $Mensaje
    git push
    Write-Host "`n✓ Subido a GitHub. Vercel desplegará solo en unos segundos (auria1.vercel.app)." -ForegroundColor Green
} else {
    Write-Host "No hay cambios nuevos para comitear." -ForegroundColor Yellow
}
