# CI Workflows

This directory contains the GitHub Actions workflows for linting and deployment.

## Overview

| Workflow          | File                   | Trigger                                               | Purpose                                                                                            |
| ----------------- | ---------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Lint              | `lint.yaml`            | `push` to `main`, `pull_request`, `workflow_dispatch` | Runs changed-file linting through `prek`.                                                          |
| Production deploy | `deploy.yaml`          | `push` to `main`, `workflow_dispatch`                 | Builds the site and deploys `_site/` to the production Cloudflare Pages project.                   |
| Preview deploy    | `preview-deploy.yaml`  | `issue_comment`                                       | Builds and deploys a PR-scoped Cloudflare Pages preview after a maintainer explicitly requests it. |
| Preview cleanup   | `preview-cleanup.yaml` | `pull_request` on `closed`                            | Deletes Cloudflare Pages preview deployments associated with a closed PR's `pr-<number>` alias.    |

## Lint

File: `lint.yaml`

Behavior:

1. Checks out the repository with full history.
2. Installs Node.js 20 dependencies with `npm ci`.
3. Runs `j178/prek-action@v1` on changed files only.

Trigger details:

1. On pull requests, it compares `origin/<base branch>` to `HEAD`.
2. On pushes and manual runs, it compares `HEAD~1` to `HEAD`.

## Preview Deploy

File: `preview-deploy.yaml`

Behavior:

1. Listens for newly created issue comments.
2. Continues only when the comment is on a pull request and starts with `/deploy-preview`.
3. Verifies that the commenter has `write`, `maintain`, or `admin` permission on the repository.
4. Resolves the PR head SHA and source repository.
5. Checks out the PR head commit with persisted credentials disabled.
6. Installs dependencies, builds `_site/`, and deploys a preview branch named `pr-<number>` to Cloudflare Pages.
7. Creates or updates a single PR comment containing the preview URL.

Required repository secrets:

1. `CLOUDFLARE_API_TOKEN`
2. `CLOUDFLARE_ACCOUNT_ID`

Usage:

1. Open or update a pull request.
2. Have a maintainer comment `/deploy-preview` on that pull request.
3. Wait for the `Deploy Cloudflare Preview` workflow to complete.
4. Open the preview URL from the PR comment that contains `<!-- cloudflare-preview -->`.

Security model:

1. Fork pull requests do not get automatic preview deploys.
2. Privileged deployment only happens after an explicit maintainer comment.
3. The workflow checks the commenter permission level before it uses Cloudflare secrets.
4. The checked-out PR code never receives persisted GitHub credentials.

## Preview Cleanup

File: `preview-cleanup.yaml`

Behavior:

1. Runs when a pull request closes.
2. Lists preview deployments for the `stopsloppypasta` Cloudflare Pages project.
3. Matches deployments associated with the PR-specific `pr-<number>` alias.
4. Deletes each matching deployment through the Cloudflare Pages API.
5. Logs a notice when Cloudflare refuses to delete a deployment, which can happen for the latest deployment on a branch alias.

Required repository secrets:

1. `CLOUDFLARE_API_TOKEN`
2. `CLOUDFLARE_ACCOUNT_ID`

Notes:

1. This is best-effort cleanup because Cloudflare documents that the latest deployment for a branch cannot always be deleted.
2. The workflow targets the stable `pr-<number>` alias used by `preview-deploy.yaml`, so it will not affect other open previews.

## Production Deploy

File: `deploy.yaml`

Behavior:

1. Runs only when the workflow ref is `main`.
2. Checks out the repository with persisted credentials disabled.
3. Installs dependencies and runs `npm run build`.
4. Deploys `_site/` to the `stopsloppypasta` Cloudflare Pages project.

Required repository secrets:

1. `CLOUDFLARE_API_TOKEN`
2. `CLOUDFLARE_ACCOUNT_ID`

Notes:

1. `workflow_dispatch` is available, but the job is still gated to `refs/heads/main`.
2. This workflow is the only path that deploys production content.
