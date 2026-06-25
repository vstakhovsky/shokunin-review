#!/bin/bash

# Verification script for Eval Operating System
# Checks that all components exist and are properly configured

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
total_checks=0
passed_checks=0
failed_checks=0

# Function to check file exists
check_file() {
    local file="$1"
    local description="$2"
    total_checks=$((total_checks + 1))

    if [ -f "$file" ]; then
        echo -e "${GREEN}PASS${NC} - $description ($file)"
        passed_checks=$((passed_checks + 1))
        return 0
    else
        echo -e "${RED}FAIL${NC} - $description ($file)"
        failed_checks=$((failed_checks + 1))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    local dir="$1"
    local description="$2"
    total_checks=$((total_checks + 1))

    if [ -d "$dir" ]; then
        echo -e "${GREEN}PASS${NC} - $description ($dir)"
        passed_checks=$((passed_checks + 1))
        return 0
    else
        echo -e "${RED}FAIL${NC} - $description ($dir)"
        failed_checks=$((failed_checks + 1))
        return 1
    fi
}

# Function to check content exists in file
check_content() {
    local file="$1"
    local search_term="$2"
    local description="$3"
    total_checks=$((total_checks + 1))

    if [ -f "$file" ] && grep -q "$search_term" "$file"; then
        echo -e "${GREEN}PASS${NC} - $description"
        passed_checks=$((passed_checks + 1))
        return 0
    else
        echo -e "${RED}FAIL${NC} - $description"
        failed_checks=$((failed_checks + 1))
        return 1
    fi
}

echo "Shokunin Eval Operating System Verification"
echo "=========================================="
echo ""

# Check documentation files
echo "Checking documentation files..."
check_file "docs/eval-operating-system.md" "Eval Operating System documentation"
check_file "docs/eval-quality-definition.md" "Eval quality definition documentation"
check_file "docs/error-analysis-loop.md" "Error analysis loop documentation"
echo ""

# Check rubrics
echo "Checking rubrics..."
check_file "harness/rubrics/finding-quality-rubric.yaml" "Finding quality rubric"
check_file "harness/rubrics/review-quality-rubric.yaml" "Review quality rubric"
echo ""

# Check error analysis
echo "Checking error analysis..."
check_file "harness/error_analysis/error_taxonomy.yaml" "Error taxonomy"
echo ""

# Check scripts
echo "Checking scripts..."
check_file "scripts/analyze-eval-errors.sh" "Error analysis script"
echo ""

# Check roadmap directories
echo "Checking roadmap directories..."
check_dir "harness/synthetic" "Synthetic eval directory"
check_dir "harness/few_shot" "Few-shot directory"
check_file "harness/synthetic/README.md" "Synthetic README"
check_file "harness/few_shot/README.md" "Few-shot README"
echo ""

# Check README, ROADMAP, CHANGELOG updates
echo "Checking main documentation updates..."
check_content "README.md" "Eval Operating System" "README mentions Eval Operating System"
check_content "ROADMAP.md" "Eval Operating System Roadmap" "ROADMAP mentions Eval Operating System Roadmap"
check_content "CHANGELOG.md" "Eval Operating System Foundation" "CHANGELOG mentions Eval Operating System Foundation"
echo ""

# Check that docs don't overclaim roadmap features
echo "Checking documentation doesn't overclaim implementation..."
check_content "docs/eval-operating-system.md" "Roadmap" "Eval OS doc marks some features as roadmap (not fully implemented)"
echo ""

# Summary
echo "=========================================="
echo "Summary:"
echo "Total checks: $total_checks"
echo -e "${GREEN}Passed: $passed_checks${NC}"
echo -e "${RED}Failed: $failed_checks${NC}"
echo ""

if [ $failed_checks -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
else
    echo -e "${RED}$failed_checks checks failed${NC}"
    exit 1
fi
