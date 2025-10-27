# Vercel Deployment Script for Windows
# Run this script to deploy to Vercel

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Vercel CLI is not installed. Installing now..." -ForegroundColor Yellow
    npm install -g vercel
}

# Login to Vercel (if not already logged in)
vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please log in to Vercel..."
    vercel login
}

# Set environment to production
$env:NODE_ENV = "production"

# Build the project
Write-Host "Building the project..." -ForegroundColor Cyan
npm run build

# Deploy to production
Write-Host "Deploying to Vercel..." -ForegroundColor Cyan
vercel --prod

# Show deployment URL
Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Make sure to set up all required environment variables in the Vercel dashboard." -ForegroundColor Yellow
