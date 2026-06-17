#!/bin/bash

# Build script for Shokunin Review CLI

set -e

echo "Building Shokunin Review CLI..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build TypeScript
echo "Building TypeScript..."
npm run build

# Make CLI executable
echo "Setting permissions..."
chmod +x dist/cli.js

echo "✓ Build complete!"
echo ""
echo "To use locally:"
echo "  node dist/cli.js --help"
echo ""
echo "To install globally:"
echo "  npm install -g ."
echo ""
echo "To run in development mode:"
echo "  npm run dev -- review <file>"