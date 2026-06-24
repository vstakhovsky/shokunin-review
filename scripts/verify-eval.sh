#!/usr/bin/env bash
set -u

echo "🔍 Shokunin Verification"
echo "======================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "📦 Building..."
cd cli
npm run build
BUILD_STATUS=$?
cd "$ROOT_DIR"

if [ "$BUILD_STATUS" -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ Build passed"

echo "🧪 Running eval unit tests..."
cd cli
npm test -- --testPathPattern="eval"
TEST_STATUS=$?
if [ "$TEST_STATUS" -ne 0 ]; then
  npm test -- --testPathPatterns="eval"
  TEST_STATUS=$?
fi
cd "$ROOT_DIR"

if [ "$TEST_STATUS" -ne 0 ]; then
  echo "❌ Eval unit tests failed"
  exit 1
fi

echo "✅ Eval unit tests passed"

echo "🎯 Running real eval harness..."
EVAL_OUTPUT="$(node cli/dist/cli.js eval --report 2>&1)"
EVAL_STATUS=$?

echo "$EVAL_OUTPUT"

if [ "$EVAL_STATUS" -ne 0 ]; then
  echo "❌ Eval harness command failed"
  exit 1
fi

if echo "$EVAL_OUTPUT" | grep -q "0/.*passed"; then
  echo "❌ Eval harness returned 0 passed cases"
  exit 1
fi

if echo "$EVAL_OUTPUT" | grep -E "prd|rfc|experiment|strategy" | grep -q "Unsupported"; then
  echo "❌ Supported artifact type was marked as Unsupported"
  exit 1
fi

if [ ! -f "harness/reports/latest_eval_report.md" ] && [ ! -f "harness/reports/latest.md" ]; then
  echo "❌ Eval report file missing"
  exit 1
fi

echo "✅ Verification passed"
echo "Commit allowed"
