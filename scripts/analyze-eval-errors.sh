#!/bin/bash

# Shokunin Eval Error Analysis
# MVP: Checks error analysis infrastructure and shows status
# Roadmap: Runtime trace analysis, error classification, clustering

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Paths
HARNESS_DIR="harness"
ERROR_TAXONOMY="$HARNESS_DIR/error_analysis/error_taxonomy.yaml"
FINDING_RUBRIC="$HARNESS_DIR/rubrics/finding-quality-rubric.yaml"
REVIEW_RUBRIC="$HARNESS_DIR/rubrics/review-quality-rubric.yaml"
REPORTS_DIR="$HARNESS_DIR/reports"
TRACES_DIR="$HARNESS_DIR/traces"

echo "Shokunin Eval Error Analysis"
echo ""
echo "Inputs:"
echo "- $ERROR_TAXONOMY"
echo "- $FINDING_RUBRIC"
echo "- $REVIEW_RUBRIC"
echo ""

# Check files exist
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 missing"
        return 1
    fi
}

# Check directories exist
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 missing"
        return 1
    fi
}

echo "Current status:"
echo ""

all_passed=true

# Check error taxonomy
if check_file "$ERROR_TAXONOMY"; then
    echo -e "  ${GREEN}Error taxonomy available${NC}"
else
    echo -e "  ${RED}Error taxonomy missing${NC}"
    all_passed=false
fi

# Check finding rubric
if check_file "$FINDING_RUBRIC"; then
    echo -e "  ${GREEN}Finding quality rubric available${NC}"
else
    echo -e "  ${RED}Finding quality rubric missing${NC}"
    all_passed=false
fi

# Check review rubric
if check_file "$REVIEW_RUBRIC"; then
    echo -e "  ${GREEN}Review quality rubric available${NC}"
else
    echo -e "  ${RED}Review quality rubric missing${NC}"
    all_passed=false
fi

echo ""

# Check for eval reports (optional, may not exist in fresh setup)
if check_dir "$REPORTS_DIR"; then
    report_count=$(find "$REPORTS_DIR" -name "*.md" -o -name "*.json" 2>/dev/null | wc -l)
    if [ "$report_count" -gt 0 ]; then
        echo -e "${GREEN}Eval reports available: $report_count files${NC}"
    else
        echo -e "${YELLOW}No eval reports yet (run 'shokunin eval' first)${NC}"
    fi
else
    echo -e "${YELLOW}Reports directory not created yet${NC}"
fi

echo ""

# Check for traces (optional, may not exist in fresh setup)
if check_dir "$TRACES_DIR"; then
    trace_count=$(find "$TRACES_DIR" -type f 2>/dev/null | wc -l)
    if [ "$trace_count" -gt 0 ]; then
        echo -e "${GREEN}Eval traces available: $trace_count files${NC}"
    else
        echo -e "${YELLOW}No eval traces yet (run 'shokunin eval' first)${NC}"
    fi
else
    echo -e "${YELLOW}Traces directory not created yet${NC}"
fi

echo ""
echo "Infrastructure status:"
echo ""

if [ "$all_passed" = true ]; then
    echo -e "${GREEN}✓ Core error analysis infrastructure is ready${NC}"
else
    echo -e "${RED}✗ Core error analysis infrastructure is incomplete${NC}"
fi

echo ""
echo "Runtime capabilities:"
echo ""
echo -e "${GREEN}Implemented:${NC}"
echo "- Error taxonomy for classification"
echo "- Finding quality rubric"
echo "- Review quality rubric"
echo "- Error analysis loop documentation"
echo ""

echo -e "${YELLOW}Roadmap / WIP:${NC}"
echo "- Runtime trace analysis (needs eval reports)"
echo "- Automated error classification"
echo "- Failure pattern clustering"
echo "- Few-shot mining from failures"
echo "- Synthetic eval generation"
echo "- Trust report generation"
echo ""

echo "Next steps:"
echo ""
echo "1. Run real eval harness: shokunin eval"
echo "2. Collect failed cases from reports"
echo "3. Classify failures using error taxonomy"
echo "4. Cluster repeated patterns"
echo "5. Update validators / rubrics / eval cases"
echo "6. Rerun regression: shokunin eval --regression"
echo ""

# Exit with appropriate code
if [ "$all_passed" = true ]; then
    exit 0
else
    exit 1
fi
