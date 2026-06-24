# Expected Findings

This directory contains the finding taxonomy and aggregated expected findings for eval cases.

## Files

- `taxonomy.yaml` - Comprehensive taxonomy of all finding types with default severity levels
- `expected_findings.yaml` - Aggregated expected findings per eval case

## Finding Taxonomy

The taxonomy (`taxonomy.yaml`) defines all possible finding types that can be detected during review. Each finding includes:

- `description` - What the finding means
- `default_severity` - Default severity level (critical, high, medium, low)
- `category` - Category for grouping (e.g., evidence, metrics, risk, tradeoffs)

## Severity Levels

- **critical** - Security vulnerabilities, PII leakage, toxic language
- **high** - Missing essential elements, evidence gaps, major risks
- **medium** - Missing important context, incomplete plans
- **low** - Quality issues, minor improvements

## Categories

- **evidence** - Claims without supporting data or evidence
- **decision_quality** - Missing decision logs or traceability
- **metrics** - Missing or vague success metrics
- **risk** - Missing risk analysis
- **tradeoffs** - Missing alternative analysis
- **experiment_design** - Experiment planning gaps
- **technical_feasibility** - Architecture and failure mode issues
- **rollout** - Missing or incomplete rollout plans
- **security** - Security and privacy issues
- **tone** - Language and tone issues
- **actionability** - Generic vs specific recommendations

## Expected Findings per Case

The `expected_findings.yaml` file aggregates expected findings by eval case ID. This provides:

- **must_detect** - Findings that must be detected for the case to pass
- **should_not_detect** - Findings that should NOT be detected (false positive check)
- **critical_misses** - Critical findings that, if missed, cause the eval to fail

## Usage

When adding new eval cases:

1. Define expected findings in the eval YAML file
2. Add the case to `expected_findings.yaml` for cross-reference
3. Use finding IDs from `taxonomy.yaml` for consistency

## Calibration

The taxonomy supports score calibration by:

1. Providing consistent finding IDs across all cases
2. Defining default severity for score calculation
3. Grouping findings by category for dimensional scoring

Changes to the taxonomy should be reviewed for impact on:
- Score bands and ranges
- Regression thresholds
- Existing eval case expectations
