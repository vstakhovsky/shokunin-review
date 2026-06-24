# GitHub Actions Workflow with Excessive Permissions

## Production Deploy Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write-all
      issues: write
      pull-requests: write
      actions: write
      checks: write
      deployments: write
      packages: write
      security-events: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log deployment info
        run: |
          echo "Deploying with token: ${{ secrets.GITHUB_TOKEN }}"
          echo "Repository: ${{ github.repository }}"
          echo "Actor: ${{ github.actor }}"

      - name: Build and deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          DB_PASSWORD: ${{ secrets.PROD_DB_PASSWORD }}
          API_KEY: ${{ secrets.PROD_API_KEY }}
        run: |
          ./deploy.sh

      - name: Update deployment status
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.GITHUB_TOKEN }}" \
            -d '{"status":"deployed"}' \
            https://api.github.com/repos/${{ github.repository }}/deployments

      - name: Create deployment tag
        run: |
          git tag -a v$(date +%s) -m "Deployment ${{ github.sha }}"
          git push origin --tags

      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Deployed to production!'
            })
```

## Review Question

Is this workflow secure for production deployments?
