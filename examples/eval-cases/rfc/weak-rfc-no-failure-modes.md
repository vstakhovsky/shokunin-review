# RFC: Payment Gateway Migration

## Status
Proposed

## Context
Our current payment processor is raising fees. We need to migrate to a new provider.

## Proposed Changes
Switch from Stripe to Braintree for payment processing.

## Motivation
Braintree offers lower transaction fees, saving us approximately $50K annually.

## Implementation Plan
1. Update payment integration code
2. Migrate customer payment methods
3. Update subscription billing logic
4. Deploy to production

## Timeline
Target completion: End of Q2 2024

## Backward Compatibility
Will maintain Stripe integration during transition period.
