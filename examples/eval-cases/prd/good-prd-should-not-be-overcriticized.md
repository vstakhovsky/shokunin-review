# Internal Dashboard Update

## Problem
The current operations dashboard doesn't show the new "orders in transit" metric that the ops team needs to monitor delivery performance.

## Users
Operations team members who monitor delivery metrics daily.

## Decision
Update the dashboard to add the "orders in transit" metric widget.

## Requirements
- Display count of orders currently in transit
- Show updated count every 30 seconds
- Match existing dashboard styling
- No login required (internal dashboard)

## Success Metric
Widget displays correct count matching the orders database.

## Implementation
Add query to orders table, add widget component to dashboard, deploy to production.

## Owner
Jane Smith (Operations)
Mike Johnson (Engineering)

## Timeline
Deploy to production on Friday, Jan 26.
