#!/usr/bin/env bash

# Verification script for Shokunin meta agents
# This script checks that meta agents and supporting documentation exist and contain expected content

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

echo "=== Shokunin Meta Agents Verification ==="
echo ""

FAIL_COUNT=0

# Check meta agents
check_file ".claude/agents/shokunin-docs-curator.md" "Documentation Curator agent" || ((FAIL_COUNT++))
check_file ".claude/agents/shokunin-release-manager.md" "Release Manager agent" || ((FAIL_COUNT++))
check_file ".claude/agents/shokunin-competitive-analyst.md" "Competitive Analyst agent" || ((FAIL_COUNT++))

# Check agent directory
check_file "docs/agent-directory.md" "Agent directory" || ((FAIL_COUNT++))

# Check agent directory mentions all three agents
if [ -f "docs/agent-directory.md" ]; then
    check_content "docs/agent-directory.md" "shokunin-docs-curator" "Agent directory includes Documentation Curator" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "shokunin-release-manager" "Agent directory includes Release Manager" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "shokunin-competitive-analyst" "Agent directory includes Competitive Analyst" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "Documentation Curator" "Agent directory mentions Documentation Curator" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "Release Manager" "Agent directory mentions Release Manager" || ((FAIL_COUNT++))
    check_content "docs/agent-directory.md" "Competitive Analyst" "Agent directory mentions Competitive Analyst" || ((FAIL_COUNT++))
fi

# Check Documentation Curator content
if [ -f ".claude/agents/shokunin-docs-curator.md" ]; then
    check_content ".claude/agents/shokunin-docs-curator.md" "documentation drift" "Documentation Curator mentions documentation drift" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-docs-curator.md" "Do not invent" "Documentation Curator has guardrails against inventing facts" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-docs-curator.md" "README.md" "Documentation Curator references README.md" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-docs-curator.md" "CHANGELOG.md" "Documentation Curator references CHANGELOG.md" || ((FAIL_COUNT++))
fi

# Check Release Manager content
if [ -f ".claude/agents/shokunin-release-manager.md" ]; then
    check_content ".claude/agents/shokunin-release-manager.md" "release notes" "Release Manager mentions release notes" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-release-manager.md" "changelog" "Release Manager mentions changelog" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-release-manager.md" "version bump" "Release Manager mentions version bump" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-release-manager.md" "git status" "Release Manager references git commands" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-release-manager.md" "Do not say release is ready" "Release Manager has guardrails against false readiness claims" || ((FAIL_COUNT++))
fi

# Check Competitive Analyst content - must include exact caution phrase
if [ -f ".claude/agents/shokunin-competitive-analyst.md" ]; then
    check_content ".claude/agents/shokunin-competitive-analyst.md" "Current competitor data is not available" "Competitive Analyst includes required caution phrase" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-competitive-analyst.md" "Add sources before making strong claims" "Competitive Analyst includes source warning" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-competitive-analyst.md" "Do not invent competitor" "Competitive Analyst has guardrails against inventing competitor capabilities" || ((FAIL_COUNT++))
    check_content ".claude/agents/shokunin-competitive-analyst.md" "README.md" "Competitive Analyst references README.md" || ((FAIL_COUNT++))
fi

# Check for unsupported "best tool" claims
echo ""
echo "Checking for unsupported 'best tool' claims..."
if grep -rE "best tool|best in class|market leader|unmatched|superior" .claude/agents/shokunin-docs-curator.md .claude/agents/shokunin-release-manager.md .claude/agents/shokunin-competitive-analyst.md 2>/dev/null | grep -v "best tool for the job\|not the best\|Avoid.*best tool.*claims\|best tool claims.*without evidence"; then
    echo -e "${RED}✗${NC} Found unsupported 'best tool' claims"
    ((FAIL_COUNT++))
else
    echo -e "${GREEN}✓${NC} No unsupported 'best tool' claims found"
fi

# Check README or docs mention repository-aware agents
check_file "README.md" "README documentation" || ((FAIL_COUNT++))
if [ -f "README.md" ]; then
    # Check for meta agents section or mention
    if grep -qE "Meta Agents|repository-aware|Documentation Curator|Release Manager|Competitive Analyst" README.md; then
        echo -e "${GREEN}✓${NC} README mentions repository-aware or meta agents"
    else
        echo -e "${YELLOW}⚠${NC} README may not mention meta agents (this is expected if not yet added)"
    fi
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
