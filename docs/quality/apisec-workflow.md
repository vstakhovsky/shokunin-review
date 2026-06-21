# APISec workflow configuration

## Summary

This repository includes an APISec workflow configuration, but the automatic APISec scan has been disabled.

The APISec scan was failing because the workflow was running without configured credentials/secrets. The failed check was unrelated to the Shokunin Review eval harness and was blocking a clean CI status.

## What changed

- Removed automatic APISec triggers from `.github/workflows/apisec-scan.yml`
- Disabled APISec execution on:
  - push
  - pull request
  - scheduled cron runs
- Kept the workflow file in the repository for future configuration if APISec is needed again

## Reason

The APISec workflow was running with empty credentials:

- missing username
- missing password
- missing email report value
- invalid generated token
- invalid run ID

Because of this, the workflow failed with:

generated token is: null
runId = null
Invalid runid

This failure was not related to the product code, eval harness, or TypeScript build.

## Impact

- The repository is no longer blocked by a failing external APISec check
- The Shokunin Review eval harness remains unchanged
- CI status should become cleaner after this workflow change
- APISec can be re-enabled later after proper secrets are configured

## How to re-enable APISec later

If APISec should be used in the future, configure the required GitHub Actions secrets first:

- apisec_username
- apisec_password
- project/profile settings required by the APISec workflow

After secrets are configured, the workflow can be safely re-enabled by restoring automatic triggers in `.github/workflows/apisec-scan.yml`.
