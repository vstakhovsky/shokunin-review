#!/usr/bin/env bash

# Verification script for Shokunin security routing implementation
# This script checks that all required files exist and contain expected content

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
    local file="$1"
    local description="$2"

    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description exists: $file"
        return 0
    else
        echo -e "${RED}✗${NC} $description missing: $file"
        return 1
    fi
}

check_dir() {
    local dir="$1"
    local description="$2"

    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $description exists: $dir"
        return 0
    else
        echo -e "${RED}✗${NC} $description missing: $dir"
        return 1
    fi
}

check_content() {
    local file="$1"
    local pattern="$2"
    local description="$3"

    if grep -q "$pattern" "$file" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $description"
        return 0
    else
        echo -e "${RED}✗${NC} $description - pattern not found: $pattern"
        return 1
    fi
}

echo "=== Shokunin Security Routing Verification ==="
echo ""

FAIL_COUNT=0

# Check routing file
check_file "skills/security-routing.md" "Security routing file" || ((FAIL_COUNT++))
if [ -f "skills/security-routing.md" ]; then
    check_content "skills/security-routing.md" "unsafe-security-request" "Contains unsafe-security-request route" || ((FAIL_COUNT++))
    check_content "skills/security-routing.md" "secret-leak-review" "Contains secret-leak-review route" || ((FAIL_COUNT++))
fi

# Check boundaries
check_file "skills/security/BOUNDARIES.md" "Security boundaries file" || ((FAIL_COUNT++))
if [ -f "skills/security/BOUNDARIES.md" ]; then
    check_content "skills/security/BOUNDARIES.md" "defensive" "Mentions defensive scope" || ((FAIL_COUNT++))
    check_content "skills/security/BOUNDARIES.md" "offensive" "Mentions offensive boundaries" || ((FAIL_COUNT++))
fi

# Check agents
check_file ".claude/agents/shokunin-security-router.md" "Security router agent" || ((FAIL_COUNT++))
check_file ".claude/agents/shokunin-security-reviewer.md" "Security reviewer agent" || ((FAIL_COUNT++))
check_file ".claude/agents/shokunin-safety-judge.md" "Safety judge agent" || ((FAIL_COUNT++))

# Check taxonomy
check_file "harness/expected_findings/security-taxonomy.yaml" "Security taxonomy" || ((FAIL_COUNT++))
if [ -f "harness/expected_findings/security-taxonomy.yaml" ]; then
    check_content "harness/expected_findings/security-taxonomy.yaml" "secret-leak" "Contains secret-leak finding" || ((FAIL_COUNT++))
    check_content "harness/expected_findings/security-taxonomy.yaml" "command-injection-risk" "Contains command-injection-risk finding" || ((FAIL_COUNT++))
fi

# Check eval cases
check_dir "harness/evals/security" "Security evals directory" || ((FAIL_COUNT++))

EVAL_CASES=(
    "weak-cli-command-injection.yaml"
    "weak-report-data-leak.yaml"
    "weak-prompt-injection-policy.yaml"
    "weak-github-actions-permissions.yaml"
    "weak-untrusted-file-parsing.yaml"
    "strong-security-reviewed-cli.yaml"
)

for case in "${EVAL_CASES[@]}"; do
    check_file "harness/evals/security/$case" "Eval case: $case" || ((FAIL_COUNT++))
done

# Check examples
check_dir "examples/security" "Security examples directory" || ((FAIL_COUNT++))

EXAMPLES=(
    "weak-cli-command-injection.before.md"
    "weak-report-data-leak.before.md"
    "weak-prompt-injection-policy.before.md"
    "weak-github-actions-permissions.before.md"
    "weak-untrusted-file-parsing.before.md"
    "strong-security-reviewed-cli.before.md"
)

for example in "${EXAMPLES[@]}"; do
    check_file "examples/security/$example" "Example: $example" || ((FAIL_COUNT++))
done

# Check .gitignore for generated reports
if [ -f ".gitignore" ]; then
    if grep -q "harness/evals/security/\*.json" .gitignore || grep -q "harness/evals/security/\*.trace" .gitignore || grep -q "eval-reports/" .gitignore || grep -q "eval-traces/" .gitignore; then
        echo -e "${GREEN}✓${NC} .gitignore contains eval report patterns"
    else
        echo -e "${YELLOW}⚠${NC} .gitignore may not exclude eval reports (this is expected if not yet added)"
    fi
else
    echo -e "${YELLOW}⚠${NC} .gitignore not found"
fi

# Check verification script exists
check_file "scripts/verify-security-routing.sh" "Verification script" || ((FAIL_COUNT++))

# Check docs
check_file "docs/security-routing.md" "Security routing documentation" || ((FAIL_COUNT++))

echo ""
echo "=== Verification Summary ==="
if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
else
    echo -e "${RED}$FAIL_COUNT check(s) failed${NC}"
    exit 1
fi
