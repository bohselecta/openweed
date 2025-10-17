#!/bin/bash

# OpenWeed MVP - Deployment Script
# This script helps prepare and deploy the OpenWeed MVP to Vercel

set -e

echo "🌿 OpenWeed MVP Deployment Script"
echo "================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "🔧 Installing dependencies..."
pnpm install

echo "🏗️ Building project..."
pnpm build

echo "✅ Build successful!"

echo ""
echo "🚀 Ready to deploy to Vercel!"
echo ""
echo "Next steps:"
echo "1. Run 'vercel' to deploy to preview"
echo "2. Run 'vercel --prod' to deploy to production"
echo ""
echo "Make sure you have:"
echo "- Environment variables configured in Vercel dashboard"
echo "- Database set up and migrated"
echo "- Required services connected (Email, UploadThing, etc.)"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
