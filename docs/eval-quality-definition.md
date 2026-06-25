# Eval Quality Definition

## What makes a good review output

Before production usage, Shokunin Review must demonstrate quality across these dimensions.

## Dimensions

### 1. Critical blocker recall

**Definition:** Percentage of critical blockers detected.

**Why it matters:** Missing critical blockers wastes human review time and can lead to bad decisions.

**Target:** ≥95% recall on critical blockers in eval cases.

### 2. Expected finding recall

**Definition:** Percentage of expected findings detected for the artifact type.

**Why it matters:** Ensures comprehensive coverage across all validation dimensions.

**Target:** ≥80% recall on expected findings in eval cases.

### 3. False positive rate

**Definition:** Percentage of findings that should not have been flagged.

**Why it matters:** False positives erode trust and waste reviewer time.

**Target:** ≤5% false positive rate in eval cases.

### 4. Severity calibration

**Definition:** Severity levels match expected business/product risk.

**Why it matters:** Helps reviewers prioritize what to fix first.

**Target:** ≥90% severity alignment with expected severity in eval cases.

### 5. Score calibration

**Definition:** Final readiness score matches expected score band.

**Why it matters:** Score bands drive go/no-go decisions. Miscalibration leads to wrong decisions.

**Target:** ≥90% score band accuracy in eval cases.

### 6. Evidence grounding

**Definition:** Findings include artifact-grounded evidence (quotes, references).

**Why it matters:** Ungrounded findings are hard to verify and can be hallucinated.

**Target:** ≥90% of findings include evidence quotes in eval cases.

### 7. Recommendation specificity

**Definition:** Recommendations are specific enough for a PM or team lead to act on.

**Why it matters:** Vague recommendations ("add better metrics") are not actionable.

**Target:** ≥80% of recommendations pass specificity rubric in eval cases.

### 8. Must-not-flag violations

**Definition:** No findings are explicitly listed under must_not_flag rules.

**Why it matters:** Prevents false positives on known-good patterns.

**Target:** 0% must-not-flag violations in eval cases.

### 9. Regression drift

**Definition:** Quality does not decrease after validator changes.

**Why it matters:** Improvements in one area should not regress another.

**Target:** No more than 5% regression in existing eval cases after changes.

### 10. Human agreement rate

**Definition:** Percentage of findings human reviewers agree with.

**Why it matters:** Ultimate measure of usefulness in real workflows.

**Target:** ≥85% agreement rate in human review studies.

## What makes a good finding

A good finding should include:

- **Finding type:** Clear category (e.g., evidence-gap, missing-decision)
- **Severity:** Appropriate severity level (critical, high, medium, low)
- **Artifact-grounded evidence:** Quote or reference from the reviewed artifact
- **Why it matters:** Explanation of the risk or impact
- **Suggested fix:** Specific recommendation for improvement
- **Expected owner:** Who should act (PM, tech lead, data scientist)
- **Readiness score impact:** How this affects the overall score

### Weak finding examples

❌ "The document needs better metrics." — Vague, no evidence, no specific fix

❌ "Missing requirements." — What requirements? Where? Why?

❌ "This will fail because users won't like it." — No evidence, invented claim

❌ "Consider adding A/B testing." — Generic recommendation, no context

### Strong finding examples

✅ "**[evidence-gap]** Problem is not quantified. Page 2 claims 'significant user pain' but does not provide baseline metrics or evidence. **Severity: High. Impact: Cannot validate problem size. Suggested fix: Add baseline churn rate, support tickets per user, or survey data. Owner: PM.**"

✅ "**[missing-decision]** MVP scope is not defined. The document describes multiple possible directions (AI ordering, personalized recommendations, dynamic pricing) but does not state which is in MVP. **Severity: Critical. Impact: Cannot evaluate feasibility or scope. Suggested fix: Define MVP scope explicitly with what's included/excluded. Owner: PM.**"

## What makes a good review

A good review should:

1. **Detect critical blockers** that should prevent readiness
2. **Detect expected findings** for the artifact type
3. **Avoid false positives** that should not be flagged
4. **Calibrate severity** appropriately to business/product risk
5. **Ground all findings** in artifact content
6. **Provide specific recommendations** for improvement
7. **Produce accurate readiness scores** that match expected bands
8. **Explain score caps** and why they were applied
9. **Suggest clear next actions** for the author
10. **Maintain helpful tone** without being dismissive or toxic

## How we measure this

Each dimension is measured through:

1. **Eval cases:** Expected findings, must_not_flag rules, expected score bands
2. **Rubrics:** Finding quality rubric, review quality rubric
3. **Error analysis:** Classify and understand failures
4. **Regression testing:** Detect drift after changes
5. **Human studies:** Measure agreement with expert reviewers

## Documentation

- [Eval Operating System](./eval-operating-system.md) — Overall system
- [Error Analysis Loop](./error-analysis-loop.md) — How to analyze failures
- [Finding Quality Rubric](../harness/rubrics/finding-quality-rubric.yaml) — Finding criteria
- [Review Quality Rubric](../harness/rubrics/review-quality-rubric.yaml) — Review criteria
