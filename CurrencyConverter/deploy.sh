#!/bin/bash

# Currency Converter Deployment Script
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📊 Build statistics:"
    ls -la dist/
    echo ""
    echo "🌐 Your app is ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Push your changes to GitHub: git add . && git commit -m 'Deploy to production' && git push"
    echo "2. Enable GitHub Pages in your repository settings"
    echo "3. Your app will be available at: https://yourusername.github.io/CurrencyConverter/"
    echo ""
    echo "🐳 Alternative: Deploy with Docker:"
    echo "   docker build -t currency-converter ."
    echo "   docker run -p 80:80 currency-converter"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
