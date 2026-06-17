#!/bin/bash

# Test script for Shokunin Review CLI

set -e

echo "Testing Shokunin Review CLI..."

# Run tests
echo "Running tests..."
npm test

# Run eval harness
echo "Running eval harness..."
npm run build
node dist/cli.js eval

echo "✓ Tests complete!"