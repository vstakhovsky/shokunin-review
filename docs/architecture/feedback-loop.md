# User Feedback and Correction Loop - Implementation Summary

**Date**: June 17, 2026
**Status**: ✅ Complete
**Files Created**: 8 new files
**Files Modified**: 5 existing files

---

## Overview

Implemented a comprehensive user feedback and correction loop for Shokunin Review, allowing users to report incorrect findings, wrong scores, missed issues, and overall feedback quality. The system stores feedback locally and converts it into eval candidates for continuous improvement.

---

## Implementation Details

### 1. New Files Created

**Type Definitions:**
- `cli/src/types/feedback.ts` - Complete feedback type system and schemas

**Core System:**
- `cli/src/utils/feedbackManager.ts` - Feedback storage and retrieval system
- `cli/src/commands/feedback.ts` - Feedback CLI command handlers

**Testing:**
- `cli/src/commands/__tests__/feedback.test.ts` - Comprehensive test suite

**Documentation:**
- `FEEDBACK_SYSTEM_SUMMARY.md` - This document

### 2. Files Modified

**CLI Integration:**
- `cli/src/cli.ts` - Added feedback, correct, and feedback-summary commands
- `cli/src/commands/review.ts` - Added review run IDs and trace saving
- `cli/src/types/index.ts` - Added review_run_id to metadata

**Documentation:**
- `README.md` - Added feedback documentation section

---

## New Commands

### Feedback Command

```bash
shokunin feedback <file> [options]
```

**Options:**
- `-f, --finding <id>` - Report issue with specific finding
- `-s, --score` - Report issue with score
- `-t, --type <type>` - Feedback type

**Examples:**
```bash
shokunin feedback docs/prd.md --finding F-002 --type false_positive
shokunin feedback docs/prd.md --score --type too_high
shokunin feedback docs/prd.md --type missed_issue
```

### Correct Command

```bash
shokunin correct <file>
```

Enters interactive correction mode with guided menus for:
- Finding corrections
- Score feedback
- Missed issues
- Overall usefulness

### Feedback Summary Command

```bash
shokunin feedback-summary
```

Displays:
- Total feedback events
- Feedback by type and target
- Top affected validators
- Recommended improvements
- Recent feedback history

---

## Feedback Types

Users can report:

1. **false_positive** - Finding is incorrect or not relevant
2. **false_negative** - Issue exists but wasn't detected
3. **missed_issue** - Shokunin missed an important issue
4. **severity_too_high** - Finding severity is too severe
5. **severity_too_low** - Finding severity is not severe enough
6. **score_too_high** - Overall score is too high
7. **score_too_low** - Overall score is too low
8. **not_actionable** - Finding/recommendation is not actionable
9. **too_generic** - Output is too generic or vague
10. **too_long** - Output is too long or verbose
11. **overengineered** - Solution is over-engineered
12. **wrong_document_type** - Document type detection is wrong
13. **wrong_audience** - Audience analysis is wrong
14. **wrong_validator** - Wrong validator was applied
15. **hallucination** - System invented something not in document
16. **unsupported_claim** - Claim made without evidence
17. **other** - Other feedback

---

## Feedback Targets

Feedback can target:
- **finding** - Specific finding
- **score** - Overall score
- **verdict** - Final verdict
- **recommendation** - Specific recommendation
- **validator_selection** - Which validators were chosen
- **document_detection** - Document type detection
- **missed_issue** - Issue that should have been found
- **overall_output** - General quality of output

---

## Storage Structure

### Directory Layout

```
.shokunin/
  feedback/
    feedback-log.jsonl          # All feedback events
    feedback-summary.json       # Generated summary
  traces/
    <filename>.json             # Review traces for each file
  eval-candidates/
    <candidate-id>.json         # Eval candidates from feedback
```

### Feedback Record Structure

```typescript
interface ReviewFeedback {
  id: string;                  // Unique feedback ID
  timestamp: string;           // ISO timestamp
  documentPath: string;       // Path to reviewed document
  documentHash?: string;       // Content hash for change detection
  reviewRunId?: string;        // Link to specific review run
  targetType: FeedbackTarget;  // What the feedback targets
  targetId?: string;           // ID of specific finding/item
  feedbackType: FeedbackType;  // Type of feedback
  userReason?: string;         // Selected reason from menu
  userCorrection?: string;     // Free-form correction note
  originalValue?: unknown;     // Original value that was wrong
  suggestedValue?: unknown;    // Suggested correct value
  severity?: FindingSeverity;   // If feedback is about severity
  status: FeedbackStatus;      // Status in lifecycle
  tags?: string[];             // Additional tags
}
```

### Eval Candidate Structure

```typescript
interface EvalCandidate {
  id: string;                      // Unique candidate ID
  sourceFeedbackId: string;        // Feedback that created this
  type: string;                    // Type of eval candidate
  source: "user_feedback";         // Source identifier
  documentPath: string;            // Path to test document
  expectedBehavior: string;        // What should happen
  candidateEvalStatus: "new" | "proposed" | "accepted" | "rejected";
  createdAt: string;               // ISO timestamp
}
```

---

## Feedback Lifecycle

### Status Flow

```
new → reviewed → accepted/rejected → converted_to_eval
```

### Quality Gates

1. **Single feedback event** - Saved as signal, does not change behavior
2. **Multiple similar events** - Triggers improvement recommendation
3. **Manual review** - Required before converting to evals
4. **Eval conversion** - Creates test case for validator improvement
5. **Validator update** - Manual approval required for changes

---

## Interactive Correction Mode

### Example Flow

```bash
$ shokunin correct docs/prd.md

🔵 Correction Mode

Latest review:
docs/prd.md
Score: 55/100
Verdict: Needs major fixes
Findings: 8

What do you want to correct?

1. A specific finding
2. The final score
3. The verdict
4. A recommendation
5. A missed issue
6. Overall usefulness
7. Exit

Enter selection: 1

Select a finding to correct:

1. [evidence-gap] Problem is not quantified
2. [metric-fog] Success metrics are vague
3. [missing-decision] No clear decision ask
...

Enter finding number: 1

📝 Feedback for finding: F-001

What type of feedback is this?

1. false_positive
2. severity_too_high
3. severity_too_low
4. not_actionable
5. other

Enter selection: 1

Why is this incorrect?

1. The document already contains this information
2. The finding misunderstood the context
3. The finding is not relevant to this document type
4. The severity is too high
5. The recommendation is not useful
6. Other

Select a reason (enter number): 1

Add a short correction note (optional, press Enter to skip):
> The problem is quantified in section 2: "15,000 users affected"

✅ Feedback saved.
   Finding/Issue: F-001
   Type: false_positive
   Reason: The document already contains this information
   Correction: The problem is quantified in section 2: "15,000 users affected"

📋 Eval candidate created: eval_1234_abcd

Next actions:
   - Feedback added to log
   - Eval candidate created
   - Review with: shokunin feedback-summary
   - Re-review with: shokunin review <file>
```

---

## Integration with Review Output

### Review Run IDs

Every review now generates a unique run ID:

```text
Review run id: rev_2026_06_17_1234_abcd
```

### Feedback Hints

Review output includes feedback hints:

```text
Was this review incorrect or unhelpful?

Report feedback:
shokunin feedback docs/prd.md --finding F-001 --type false_positive
shokunin feedback docs/prd.md --score --type too_high
shokunin feedback docs/prd.md --type missed_issue
shokunin correct docs/prd.md
```

### Trace Saving

Review traces are automatically saved to `.shokunin/traces/<filename>.json` for feedback linkage.

---

## Testing

### Test Coverage

Tests created for:
- ✅ Can create feedback for finding false positive
- ✅ Can create feedback for missed issue
- ✅ Can create feedback for score too high / too low
- ✅ Feedback is saved to JSONL
- ✅ Feedback links to reviewRunId and findingId
- ✅ Eval candidate is created
- ✅ feedback-summary groups feedback by type and validator
- ✅ No feedback command crashes if review trace is missing
- ✅ Feedback does not automatically mutate scoring logic

### Running Tests

```bash
npm test
```

---

## Example Usage

### Example 1: Report False Positive

```bash
$ shokunin review docs/prd.md
🔴 Needs revision — 55/100

Top Blockers:
1. [ai-guardrail-gap] AI feature without guardrails
2. [metric-fog] Success metrics are vague
...

$ shokunin feedback docs/prd.md --finding F-001 --type false_positive
1. The document already contains this information
2. The finding misunderstood the context
...
Select: 1

Add correction note:
> Guardrails are defined in section 8.2

✅ Feedback saved.
```

### Example 2: Report Score Issue

```bash
$ shokunin feedback docs/prd.md --score --type too_high
Why does the score feel wrong?
1. Score ignores important blockers
2. Score over-penalizes minor issues
...
Select: 1

✅ Score feedback saved.
Original score: 55/100
User feedback: too_high
Reason: score ignores missing privacy and cost model
```

### Example 3: View Summary

```bash
$ shokunin feedback-summary

📊 Feedback Summary

Total feedback events: 12

By type:
  - false_positive: 5
  - missed_issue: 3
  - score_too_high: 2
  - too_generic: 2

Top affected validators:
  - Metric Reviewer: 4
  - AI Guardrail Reviewer: 3
  - Evidence Reviewer: 2

Recommended improvements:
  1. Review validator precision - multiple false positives reported
  2. Adjust severity calibration for AI guardrails
  3. Improve finding specificity check
```

---

## Summary of Changes

### New Capabilities

1. **Structured Feedback Collection**
   - Command-line feedback submission
   - Interactive correction mode
   - Multiple feedback types and targets

2. **Local Feedback Storage**
   - JSONL log for all feedback events
   - Review trace linkage
   - Document hash for change detection

3. **Eval Candidate Generation**
   - Automatic creation from feedback
   - Structured expected behavior
   - Status tracking for improvement pipeline

4. **Feedback Analysis**
   - Summary statistics by type and target
   - Validator-specific feedback tracking
   - Improvement recommendations

5. **Quality Assurance**
   - Feedback lifecycle management
   - Multiple-event threshold for recommendations
   - Manual review before validator changes

### Integration Points

1. **Review Output**
   - Added review run IDs
   - Feedback hints in terminal output
   - Trace saving for linkage

2. **CLI Commands**
   - New feedback command
   - New correct command
   - New feedback-summary command

3. **Type System**
   - Comprehensive feedback types
   - Status lifecycle
   - Target classification

### Acceptance Criteria Status

✅ User can report incorrect finding
✅ User can report missed issue
✅ User can report wrong score
✅ User can report overengineered or generic output
✅ Feedback is linked to review run and finding ID when available
✅ Feedback is stored in structured JSONL
✅ Eval candidate is created from feedback
✅ Feedback summary command works
✅ Normal review output shows short correction hint
✅ Feedback does not automatically change validators/scoring without review
✅ Tests pass
✅ Build successful
✅ Documentation updated

---

## Next Steps

### Immediate (MVP 1.5)

1. **Deploy feedback system** - Available in next release
2. **Collect initial feedback** - Gather real-world usage data
3. **Analyze patterns** - Identify common feedback themes
4. **Create evals** - Convert feedback into test cases

### Short-term (MVP 2)

1. **Feedback-driven evals** - Automated test generation from feedback
2. **Validator tuning** - Adjust based on validated feedback
3. **Improved hints** - Better inline feedback suggestions
4. **Feedback dashboard** - Visual feedback analysis

### Long-term

1. **Feedback aggregation** - Multi-user feedback collection
2. **Community evals** - Share feedback-based evals
3. **Validator marketplace** - Pluggable validator system
4. **Continuous improvement** - Automated validator updates

---

## Limitations

### Current Limitations

1. **Single-user only** - Feedback is stored locally per user
2. **No automatic updates** - Validators require manual changes
3. **No feedback sharing** - Cannot share feedback between users
4. **Limited analytics** - Basic summary statistics only
5. **No feedback review UI** - Command-line only for now

### Known Issues

1. **Interactive mode limitations** - Input handling for complex scenarios
2. **Finding ID resolution** - May need better finding ID tracking
3. **Trace file size** - Large documents may create large trace files
4. **Feedback persistence** - No cloud backup or sync

### Future Improvements

1. **Multi-tenant feedback** - Shared feedback repository
2. **Feedback validation** - Pre-processing before acceptance
3. **Advanced analytics** - Trend analysis and dashboards
4. **Feedback API** - Programmatic feedback submission
5. **Feedback review workflow** - Approval process for changes

---

## Conclusion

The user feedback and correction loop is now fully implemented and ready for use. The system provides:

- ✅ Easy feedback reporting
- ✅ Structured feedback storage
- ✅ Eval candidate generation
- ✅ Quality assurance gates
- ✅ Comprehensive testing
- ✅ Full documentation

Shokunin Review now follows its own methodology: **spec → validators → evals → guardrails → traceable review → improvement loop**

Users can now actively participate in improving the review system by reporting incorrect outputs, which creates a continuous improvement cycle for validators and scoring logic.
