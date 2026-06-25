#!/usr/bin/env bash

# Verification script for Shokunin onboarding agents
# This script checks that onboarding agents and supporting documentation exist and contain expected content

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

echo "=== Shokunin Onboarding Agents Verification ==="
echo ""

FAIL_COUNT=0

# Check onboarding agents
check_file ".claude/agents/shokunin-product-manager.md" "Product Manager agent" || ((FAIL_COUNT++))
check_file ".claude/agents/shokunin-architect.md" "Architect agent" || ((FAIL_COUNT++))

# Check supporting documentation
check_file "docs/product-overview.md" "Product overview documentation" || ((FAIL_COUNT++))
check_file "docs/architecture-overview.md" "Architecture overview documentation" || ((FAIL_COUNT++))
check_file "docs/agent-directory.md" "Agent directory" || ((FAIL_COUNT++))

# Check README mentions onboarding agents
check_file "README.md" "README documentation" || ((FAIL_COUNT++))
if [ -f "README.md" ]; then
    check_content "README.md" "Onboarding Agents" "README mentions Onboarding Agents section" || ((FAIL_COUNT++))
    check_content "README.md" "Product Manager" "README mentions Product Manager agent" || ((FAIL_COUNT++))
    check_content "README.md" "Architect" "README mentions Architect agent" || ((FAIL_COUNT++))
fi

# Check Product Manager agent content
if [ -f ".claude/agents/shokunin-product-manager.md" ]; then
    check_content ".claude/agents/shokunin-product-manager.md" "README.md" "Product Manager references README.md" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-product-manager.md" "ROADMAP.md" "Product Manager references ROADMAP.md" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-product-manager.md" "docs/" "Product Manager references docs/" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-product-manager.md" "Do not invent" "Product Manager has guardrails against inventing facts" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-product-manager.md" "[Ss]ource-grounded" "Product Manager emphasizes source-grounded answers" || ((FAIL_COUNT++))
fi

# Check Architect agent content
if [ -f ".claude/agents/shokunin-architect.md" ]; then
    check_content ".claude/agents/shokunin-architect.md" "cli/src/" "Architect references CLI implementation" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-architect.md" "harness/" "Architect references harness" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-architect.md" "docs/" "Architect references docs/" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-architect.md" "Do not invent" "Architect has guardrails against inventing facts" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-architect.md" "production readiness" "Architect does not claim production readiness" || ((FAIL_COUNT++))
fi

# Check product overview content
if [ -f "docs/product-overview.md" ]; then
    check_content "docs/product-overview.md" "problem" "Product overview explains the problem" || ((FAIL_COUNT++))
    check_content "docs/product-overview.md" "features" "Product overview describes features" || ((FAIL_COUNT++))
    check_content "docs/product-overview.md" "roadmap" "Product overview mentions roadmap" || ((FAIL_COUNT++))
    check_content "docs/product-overview.md" "limitations" "Product overview includes limitations" || ((FAIL_COUNT++))
fi

# Check architecture overview content
if [ -f "docs/architecture-overview.md" ]; then
    check_content "docs/architecture-overview.md" "architecture" "Architecture overview describes architecture" || ((FAIL_COUNT++))
    check_content "docs/architecture-overview.md" "cli/src/" "Architecture overview references CLI implementation" || ((FAIL_COUNT++))
    check_content "docs/architecture-overview.md" "limitations" "Architecture overview includes limitations" || ((FAIL_COUNT++))
    check_content "docs/architecture-overview.md" "[Dd]ata flow" "Architecture overview explains data flow" || ((FAIL_COUNT++))
fi

# Check agent directory content
if [ -f "docs/agent-directory.md" ]; then
    check_content "docs/agent-directory.md" "Product Manager" "Agent directory includes Product Manager" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "Architect" "Agent directory includes Architect" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "Test Guardian" "Agent directory includes Test Guardian" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "shokunin-product-manager.md" "Agent directory references Product Manager file" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "shokunin-architect.md" "Agent directory references Architect file" || ((FAIL_COUNT++))
fi

# Check CHANGELOG mentions onboarding agents
check_file "CHANGELOG.md" "CHANGELOG documentation" || ((FAIL_COUNT++))
if [ -f "CHANGELOG.md" ]; then
    check_content "CHANGELOG.md" "Onboarding" "CHANGELOG mentions onboarding agents" || ((FAIL_COUNT++))
    check_content "CHANGELOG.md" "Product Manager" "CHANGELOG mentions Product Manager" || ((FAIL_COUNT++))
    check_content "CHANGELOG.md" "Architect" "CHANGELOG mentions Architect" || ((FAIL_COUNT++))
fi

# Check for unsupported claims
echo ""
echo "Checking for unsupported production readiness claims..."

if grep -r "production ready\|production-grade\|enterprise-ready" .claude/agents/shokunin-product-manager.md .claude/agents/shokunin-architect.md 2>/dev/null | grep -v "not production ready\|not claim production"; then
    echo -e "${RED}✗${NC} Found unsupported production readiness claims"
    ((FAIL_COUNT++))
else
    echo -e "${GREEN}✓${NC} No unsupported production readiness claims found"
fi

echo ""
echo "=== Verification Summary ==="
if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
else
    echo -e "${RED}$FAIL_COUNT check(s) failed${NC}"
    exit 1
fi
