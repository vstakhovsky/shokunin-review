# Finding Quality Hook

Customizes finding quality thresholds and filters.

## Purpose

Allows projects to customize what findings are acceptable.

## When It Runs

During finding audit, before findings are finalized.

## Customization

Projects can customize:

### Finding Quality Thresholds
- Minimum specificity level
- Required evidence strength
- Acceptable fix detail level

### Filtering Rules
- Tags to always filter out
- Categories to deprioritize
- Severity adjustments

### Project-Specific Rules
- Domain-specific requirements
- Team-specific conventions
- Organizational standards

## Example Configuration

```yaml
finding_quality:
  min_specificity: medium
  require_examples: true
  require_acceptance_test: true
  
filter_rules:
  always_filter:
    - style_nits
    - formatting_issues
    
  deprioritize:
    - nice_to_have
    - polish_items
```

## Default Behavior

If not configured, uses standard finding quality checks:
- Grounding required
- Actionability required
- Specificity required
- No duplicates
- No generic advice
