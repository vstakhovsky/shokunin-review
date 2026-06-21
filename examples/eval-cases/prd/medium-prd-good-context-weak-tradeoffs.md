# SMS Login Authentication

## Overview
Replace push notification-based login with SMS verification to improve delivery rates and user experience.

## Customer Problem
Users frequently miss push notifications, leading to login failures and account lockouts. This is particularly problematic for users with poor push notification settings or devices in do-not-disturb mode.

## Business Impact
- Current push notification delivery rate: 65%
- Login failure rate due to missed notifications: 15%
- Support tickets related to login issues: 200+ per week
- Cost of SMS: $0.0075 per message

## Target Users
- All users currently using push notification login
- Particularly affects users with notification issues

## Success Metrics
- Login success rate: Increase from 85% to 95%
- Support ticket reduction: Decrease login-related tickets by 60%
- User satisfaction: Maintain or improve current CSAT score of 4.2/5
- Cost: Track SMS usage and keep within budget

## Guardrail Metrics
- SMS delivery rate must be ≥ 95%
- Latency for SMS delivery must be < 30 seconds (p95)
- Support tickets related to SMS login must not increase
- User opt-out rate must be < 2%

## Proposed Solution
Use SMS verification codes instead of push notifications for login.

## Technical Approach
- Integrate with SMS provider (Twilio or similar)
- Update authentication flow to send SMS codes
- Maintain push as fallback during transition

## Requirements
- SMS must be delivered within 30 seconds
- Codes must be valid for 5 minutes
- Must support international phone numbers
- Must comply with SMS regulations in all markets

## Owner
Product: Sarah Johnson
Engineering: Mike Williams
Data: Lisa Chen

## Rollout Plan
Will phase out push notifications gradually.
