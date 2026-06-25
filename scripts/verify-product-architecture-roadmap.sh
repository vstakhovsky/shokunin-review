#!/usr/bin/env bash

# Verification script for Product Architecture Roadmap documentation
# This script checks that product architecture documentation is properly structured
# and does not overclaim implemented features.

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly NC='\033[0m'

# Track failures
TOTAL_CHECKS=0
FAILED_CHECKS=0

# Print section header
print_section() {
    echo ""
    echo "=== $1 ==="
}

# Print check result
print_result() {
    local result=$1
    local message=$2

    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}PASS${NC} - $message"
    else
        echo -e "${RED}FAIL${NC} - $message"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
    fi
}

# Check if file exists
check_file_exists() {
    local file=$1
    local description=$2

    if [ -f "$file" ]; then
        print_result "PASS" "$description"
    else
        print_result "FAIL" "$description (file not found: $file)"
    fi
}

# Check if file contains text
check_contains() {
    local file=$1
    local text=$2
    local description=$3

    if [ ! -f "$file" ]; then
        print_result "FAIL" "$description (file not found: $file)"
        return
    fi

    if grep -qF -- "$text" "$file" 2>/dev/null; then
        print_result "PASS" "$description"
    else
        print_result "FAIL" "$description (text not found: $text)"
    fi
}

# Check that file does NOT contain specific overclaiming text
check_not_contains() {
    local file=$1
    local text=$2
    local description=$3

    if [ ! -f "$file" ]; then
        print_result "FAIL" "$description (file not found: $file)"
        return
    fi

    if grep -qF -- "$text" "$file" 2>/dev/null; then
        print_result "FAIL" "$description (found overclaim: $text)"
    else
        print_result "PASS" "$description"
    fi
}

# Check that roadmap items are clearly marked as such
check_marked_as_roadmap() {
    local file=$1
    local description=$2

    if [ ! -f "$file" ]; then
        print_result "FAIL" "$description (file not found: $file)"
        return
    fi

    # Check if file mentions roadmap/unimplemented/planned/wip
    if grep -qiE "roadmap|not implemented|not yet implemented|planned|wip|partially implemented|documented in concept" "$file" 2>/dev/null; then
        print_result "PASS" "$description"
    else
        print_result "FAIL" "$description (no roadmap/not implemented markers found)"
    fi
}

echo "=========================================="
echo "Product Architecture Roadmap Verification"
echo "=========================================="

print_section "Section 1: Core Documentation Files"
check_file_exists "docs/product-architecture-roadmap.md" "Product Architecture Roadmap exists"
check_file_exists "docs/decision-log.md" "Decision Log exists"
check_file_exists "docs/trace-review.md" "Trace Review exists"
check_file_exists "docs/human-gate.md" "Human Gate exists"
check_file_exists "docs/integrations-roadmap.md" "Integrations Roadmap exists"

print_section "Section 2: README mentions Product Architecture Direction"
check_contains "README.md" "Product Architecture Direction" "README mentions Product Architecture Direction"

print_section "Section 3: ROADMAP mentions key concepts"
check_contains "ROADMAP.md" "Skills" "ROADMAP mentions Skills"
check_contains "ROADMAP.md" "Evals" "ROADMAP mentions Evals"
check_contains "ROADMAP.md" "Loops" "ROADMAP mentions Loops"
check_contains "ROADMAP.md" "MCP" "ROADMAP mentions MCP"
check_contains "ROADMAP.md" "Decision Log" "ROADMAP mentions Decision Log"
check_contains "ROADMAP.md" "Trace Review" "ROADMAP mentions Trace Review"
check_contains "ROADMAP.md" "Human Gate" "ROADMAP mentions Human Gate"

print_section "Section 4: CHANGELOG mentions Product Architecture Roadmap"
check_contains "CHANGELOG.md" "Product Architecture Roadmap" "CHANGELOG mentions Product Architecture Roadmap"

print_section "Section 5: Integrations clearly marked as roadmap"
check_marked_as_roadmap "docs/integrations-roadmap.md" "Integrations doc has roadmap markers"

print_section "Section 6: Decision Log marked as not implemented"
check_marked_as_roadmap "docs/decision-log.md" "Decision Log has roadmap/not implemented markers"

print_section "Section 7: Trace Review marked as partially implemented or roadmap"
check_marked_as_roadmap "docs/trace-review.md" "Trace Review has roadmap/wip markers"

print_section "Section 8: Human Gate marked as concept or roadmap"
check_marked_as_roadmap "docs/human-gate.md" "Human Gate has roadmap/concept markers"

print_section "Section 9: No false claims about MCP integrations being implemented"
# Check for declarative implementation claims, not checklist items
if grep -qiE "GitHub.*integration.*is implemented|MCP.*integration.*is implemented|Notion.*is implemented|Obsidian.*is implemented|Linear.*is implemented|Jira.*is implemented" "docs/integrations-roadmap.md" 2>/dev/null; then
    print_result "FAIL" "Integrations doc falsely claims integrations are implemented"
else
    print_result "PASS" "Integrations doc does not claim integrations are implemented"
fi

check_not_contains "docs/decision-log.md" "Decision Log is implemented" "Decision Log does not claim it is implemented"
check_not_contains "docs/trace-review.md" "Trace Review is fully implemented" "Trace Review does not claim it is fully implemented"
check_not_contains "docs/human-gate.md" "Human Gate is implemented" "Human Gate does not claim workflow is implemented"

print_section "Section 10: No false claims about persistence being implemented"
check_not_contains "docs/decision-log.md" "persistence is implemented" "Decision Log does not claim persistence is implemented"
check_not_contains "docs/human-gate.md" "persistence is implemented" "Human Gate does not claim persistence is implemented"

print_section "Section 11: No false claims about production-ready MCP"
check_not_contains "docs/integrations-roadmap.md" "production-ready" "Integrations doc does not claim production-ready"
check_not_contains "docs/product-architecture-roadmap.md" "MCP.*production-ready" "Product Architecture doc does not claim MCP is production-ready"

print_section "Section 12: Product Architecture doc has current status section"
check_contains "docs/product-architecture-roadmap.md" "Current status" "Product Architecture doc has current status section"

print_section "Section 13: Verification script exists and is executable"
check_file_exists "scripts/verify-product-architecture-roadmap.sh" "Verification script exists"
if [ -x "scripts/verify-product-architecture-roadmap.sh" ]; then
    print_result "PASS" "Verification script is executable"
else
    print_result "FAIL" "Verification script is not executable"
fi

echo ""
echo "=========================================="
echo "Verification Summary"
echo "=========================================="
echo "Total checks: $TOTAL_CHECKS"
if [ $FAILED_CHECKS -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
else
    echo -e "${RED}$FAILED_CHECKS checks failed${NC}"
    exit 1
fi
