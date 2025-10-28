---
name: docusaurus-deployer
description: This skill should be used when deploying a Docusaurus site to GitHub Pages. It automates the configuration, building, and deployment process, handling GitHub Pages setup, environment configuration, and CI/CD automation.
---

# Docusaurus GitHub Pages Deployer

This skill automates the process of setting up, building, and deploying Docusaurus documentation sites to GitHub Pages with minimal manual intervention.

## What This Skill Does

1. **Configuration Management** - Validates and updates Docusaurus config files for GitHub Pages deployment
2. **Build Automation** - Builds the Docusaurus site with proper output handling
3. **GitHub Pages Setup** - Configures repository settings, branch protection, and deployment settings
4. **CI/CD Automation** - Creates or updates GitHub Actions workflows for automated deployment on code changes
5. **Deployment Verification** - Validates deployment success and provides feedback

## When to Use This Skill

Use this skill when:
- Deploying a Docusaurus documentation site to GitHub Pages for the first time
- Automating documentation deployments via GitHub Actions
- Updating deployment configuration (URL, baseUrl, organization/project names)
- Troubleshooting deployment issues (build failures, configuration mismatches)
- Managing multiple documentation sites with different deployment targets

## How to Use This Skill

### Step 1: Prepare Repository Configuration

To deploy to GitHub Pages, the following information is required:
- **GitHub Organization/Username**: The organization or user owning the repository
- **Repository Name**: The name of the GitHub repository
- **Deployment Target**: Either `user` (for username.github.io) or `project` (for separate project repo)
- **Custom Domain** (optional): If using a custom domain instead of GitHub Pages subdomain

### Step 2: Update Docusaurus Configuration

The Docusaurus config file (`docusaurus.config.ts`) requires these GitHub Pages-specific settings:

```typescript
const config: Config = {
  url: 'https://username.github.io', // or 'https://username.github.io/repo-name' for project repos
  baseUrl: '/', // or '/<repository-name>/' for project repos
  organizationName: 'your-github-org-or-username',
  projectName: 'your-repository-name',
  deploymentBranch: 'gh-pages', // The branch GitHub Pages will serve from
  trailingSlash: false,
  // ... rest of config
};
```

**Key Points:**
- For **user/organization pages**: `url` = `https://username.github.io`, `baseUrl` = `/`
- For **project pages**: `url` = `https://username.github.io/repo-name`, `baseUrl` = `/repo-name/`
- The `deploymentBranch` should be `gh-pages` (GitHub's default for Pages)

### Step 3: Build the Docusaurus Site

To build the site locally before deployment:

```bash
cd website  # or your docusaurus directory
npm install  # ensure dependencies are installed
npm run build  # generates the /build directory
```

The build process creates a `/build` directory containing static HTML/CSS/JS files ready for deployment.

### Step 4: Set Up GitHub Actions for Automated Deployment

Create a GitHub Actions workflow file at `.github/workflows/deploy.yml` in your repository root (not in the website subdirectory if your site is in a subdirectory).

**Workflow Steps:**
1. Trigger on push to main/master branch
2. Set up Node.js environment
3. Install dependencies in the docusaurus directory
4. Build the site
5. Deploy to GitHub Pages branch using GitHub's official deployment action

**Example Workflow Structure** (reference: `references/deploy-workflow.yml`):
- Trigger on push to **main** branch only
- Checkout repository
- Set up Node.js (version matching package.json requirements, TypeScript support)
- Install dependencies with npm ci
- Build with npm run build
- Deploy using actions/deploy-pages or peaceiris/actions-gh-pages
- Set deployment environment to 'github-pages'

### Step 5: Configure GitHub Pages in Repository Settings

In the GitHub repository settings:

1. Navigate to **Settings → Pages**
2. Under "Build and deployment":
   - Select **Deploy from a branch** (if using traditional approach)
   - Choose branch: `gh-pages`
   - Choose folder: `/ (root)`
3. Or select **GitHub Actions** (if using modern workflow)
4. Ensure branch protection rules allow automatic deployment

### Step 6: Deploy

After the workflow is set up and configured:
- Push changes to the main branch
- GitHub Actions automatically triggers the workflow
- Site builds and deploys to the `gh-pages` branch
- Visit `https://username.github.io/repo-name` (or configured domain) to view the deployed site

## Troubleshooting Common Issues

**Build Fails:**
- Verify Node.js version matches `package.json` engines field
- Check for TypeScript errors: run `npm run typecheck` locally
- Ensure all dependencies are properly listed in `package.json`

**Site Not Found (404):**
- Verify `baseUrl` matches your deployment URL structure
- Check that `gh-pages` branch exists and has the built content
- Confirm GitHub Pages is set to deploy from the correct branch

**Links Broken:**
- Verify all internal links use relative paths or correct baseUrl format
- Check that `url` and `baseUrl` configuration matches actual deployment URL
- Test build locally with `npm run serve`

**GitHub Actions Workflow Issues:**
- Verify workflow file is at `.github/workflows/deploy.yml` (repository root)
- Check that deployment token/permissions are correct (GITHUB_TOKEN usually auto-granted)
- Review workflow logs in GitHub Actions tab for specific error messages

## Tools and Resources Used

- **Node.js/npm** - Package management and build tooling
- **Docusaurus CLI** - Build and deployment commands
- **GitHub Actions** - CI/CD automation
- **GitHub Pages** - Static site hosting
