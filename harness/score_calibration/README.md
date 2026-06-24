# Score Calibration

This directory contains scoring rubrics and calibration guidance for consistent document review scoring.

## Purpose

Score calibration ensures that:
- Scores reflect true readiness for the next stage
- Similar documents receive similar scores
- Score drift is detected over time
- Reviewers understand scoring rationales

## Files

- `rubric.yaml` - Score bands, dimensions, and calibration guidance

## Score Bands

### Blocked (0-39)
Not ready for stakeholder review. Critical gaps present, major revisions required.

### Needs Major Revision (40-69)
Has serious gaps but can be recovered. Important missing elements, needs substantial work.

### Nearly Ready (70-84)
Mostly solid, needs minor improvements. Good foundation with minor gaps or refinements needed.

### Ready (85-100)
Ready for leadership or implementation review. Comprehensive, well-evidenced, ready for next stage.

## Scoring Dimensions

Six dimensions contribute to the overall score, each weighted appropriately:

1. **Clarity (15%)** - Problem statement, goals, and scope are clear
2. **Evidence (20%)** - Claims are supported by data, research, or examples
3. **Decisions (15%)** - Decisions are documented and traceable
4. **Metrics (20%)** - Success metrics are well-defined
5. **Risks and Tradeoffs (15%)** - Risks and trade-offs are addressed
6. **Implementation Readiness (15%)** - Implementation path is feasible

## Score Caps

Score caps prevent documents from receiving high scores when critical elements are missing:

- **No problem evidence** → Max 60
- **No primary metric** → Max 55
- **No MVP scope** → Max 55
- **Critical placeholders present** → Max 68
- **Overclaim without evidence** → Max 50
- **No decision log** → Max 70
- **No risk analysis** → Max 65
- **No rollback plan** → Max 75

## Expected Score Bands in Eval Cases

Each eval case includes an `expected_score_range` field:

```yaml
expected_score_range:
  min: 25
  max: 45
```

This range reflects the reasonable score variation for that artifact quality level.

## Blocker Recall Measurement

Blocker recall measures whether critical findings are detected:

```
blocker_recall = detected_critical_findings / total_critical_findings
```

Good eval harnesses maintain ≥ 90% blocker recall.

## False Positive Detection

False positives occur when Shokunin flags findings that shouldn't exist:

```yaml
should_not_detect:
  - id: legal-risk
    reason: "This document does not involve legal or regulatory issues"
```

The eval harness tracks false positive rate, which should be ≤ 10%.

## Severity Calibration

Each finding type has a default severity in the taxonomy:

- **Critical** - Security, PII, toxic language
- **High** - Missing essential elements, major gaps
- **Medium** - Missing important context
- **Low** - Quality issues

Severity affects scoring impact and review prioritization.

## Regression Testing

The eval harness detects score drift by comparing against baseline:

```bash
# Compare with baseline
shokunin eval --report

# Update baseline after intentional changes
shokunin eval --update-baseline
```

Average score calibration error should remain ≤ 8 points.

## Trustworthiness

Score calibration supports trustworthy AI-assisted review by:

1. Making scoring criteria explicit and transparent
2. Detecting when scores drift from expectations
3. Ensuring similar documents receive similar scores
4. Providing evidence for scoring decisions
5. Enabling human calibration and feedback

## Best Practices

1. **Focus on gaps, not style** - Penalize missing critical elements, not stylistic preferences
2. **Evidence is essential** - Claims without evidence should score poorly
3. **Concise beats verbose** - Length without substance should not be rewarded
4. **Scope appropriateness** - Small features don't need extensive analysis
5. **Consistency over precision** - Similar documents should score within 5-10 points

## Troubleshooting

### Score drift detected
- Check if prompt or rubric changed
- Review recent traces for new behavior
- Consider if drift is intentional (better calibration) or regression
- Update baseline if drift is intentional improvement

### Low blocker recall
- Review which critical findings are being missed
- Check if finding IDs match taxonomy
- Adjust validator prompts or scoring logic
- Add more cases for missed patterns

### High false positive rate
- Review which findings are incorrectly flagged
- Check if `should_not_detect` expectations are accurate
- Adjust validator sensitivity
- Consider if finding should be removed from taxonomy
