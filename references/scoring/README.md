# Scoring

Scoring should be traceable and strict.

## Core Pipeline

```text
dimension_scores
→ weighted_base_score  
→ penalties
→ score_caps
→ confidence_adjustment
→ final_score
```

## Principles

- Score caps should prevent inflated scores on incomplete documents
- All scoring should be traceable and explainable
- Confidence adjustments should reflect uncertainty
- Penalties should be applied for missing critical elements
