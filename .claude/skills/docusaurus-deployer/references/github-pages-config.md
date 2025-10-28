# GitHub Pages Configuration Reference

## Configuration Overview

This guide provides detailed information for configuring Docusaurus with GitHub Pages deployment.

## Docusaurus Configuration (docusaurus.config.ts)

### URL Configuration

**For User/Organization Pages:**
```typescript
const config: Config = {
  url: 'https://username.github.io',
  baseUrl: '/',
  organizationName: 'username',
  projectName: 'username.github.io',
  deploymentBranch: 'main', // or 'master'
  // ... rest of config
};
```

**For Project Pages (separate repository):**
```typescript
const config: Config = {
  url: 'https://username.github.io/my-project',
  baseUrl: '/my-project/',
  organizationName: 'username',
  projectName: 'my-project',
  deploymentBranch: 'gh-pages',
  // ... rest of config
};
```

### Key Configuration Properties

| Property | Description | Example |
|----------|-------------|---------|
| `url` | Production URL of your site | `https://myorg.github.io/docs` |
| `baseUrl` | Base path where your site is served | `/docs/` (must end with `/`) |
| `organizationName` | GitHub username or organization | `myorganization` |
| `projectName` | Repository name | `my-docs` |
| `deploymentBranch` | Branch where built files are pushed | `gh-pages` (for project repos) |
| `trailingSlash` | Whether URLs end with slash | `false` |

### TypeScript Config Example

```typescript
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'My Documentation',
  tagline: 'Great documentation site',
  favicon: 'img/favicon.ico',

  // GitHub Pages configuration
  url: 'https://myorg.github.io',
  baseUrl: '/my-docs/',
  organizationName: 'myorg',
  projectName: 'my-docs',
  deploymentBranch: 'gh-pages',

  // ... rest of configuration
};

export default config;
```

## GitHub Repository Setup

### 1. Ensure Git Configuration

```bash
# Set up git user (if not already configured)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. Initialize/Update Remote

```bash
# Add remote if not exists
git remote add origin https://github.com/username/repository-name.git

# Or update existing remote
git remote set-url origin https://github.com/username/repository-name.git

# Verify remote
git remote -v
```

### 3. Create gh-pages Branch (if needed)

```bash
# Create and push an empty gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
touch .nojekyll
git add .nojekyll
git commit -m "Initial gh-pages setup"
git push origin gh-pages

# Switch back to main
git checkout main
```

## GitHub Actions Workflow Configuration

### Workflow File Location
```
repository-root/
  .github/
    workflows/
      deploy.yml  ← Create here (not in website subdirectory)
```

### Workflow Build Matrix

For TypeScript Docusaurus projects, the workflow should:

1. **Checkout** - Clone the repository
2. **Setup Node.js** - Install Node.js v20 (matches package.json engines)
3. **Cache Dependencies** - Use npm cache for faster builds
4. **Install** - Run `npm ci` in the website directory
5. **Type Check** - Run TypeScript validation with `npm run typecheck`
6. **Build** - Execute `npm run build` to generate static files
7. **Upload** - Upload the build artifacts
8. **Deploy** - Use GitHub's deploy-pages action

### Required GitHub Repository Settings

Navigate to **Settings → Pages**:

1. **Build and deployment section:**
   - Select "GitHub Actions" as the source
   - OR "Deploy from a branch" → select `gh-pages` branch

2. **Branch protection rules** (recommended):
   - Protect main branch
   - Require status checks to pass before merging
   - Allow deployments

## Node.js and TypeScript Compatibility

### Node.js Version
- Project requires: Node.js >=20.0 (from package.json)
- Recommended for Actions: `node-version: '20'`
- LTS versions are more stable for CI/CD

### TypeScript Support
- Ensure `typescript` is in devDependencies
- Run `npm run typecheck` before build to catch type errors early
- Use `tsconfig.json` for TypeScript configuration

## Common Issues and Solutions

### Build Fails: "Cannot find module"
**Solution:** Ensure npm ci (clean install) is used instead of npm install in CI environments

### Build Fails: "Docusaurus not found"
**Solution:** Verify working-directory is set to website in workflow steps

### Type Errors During Build
**Solution:** Run typecheck step before build to identify issues early

### Site 404 After Deployment
**Solution:** Verify baseUrl matches the deployment URL structure

### Links Broken on Deployed Site
**Solution:** Check that all internal links are relative and don't hardcode the old baseUrl

## Deployment Verification

### Check Deployment Status
1. Go to repository → **Actions** tab
2. View latest workflow run
3. Check "Deploy to GitHub Pages" job logs
4. Look for successful deployment message

### Verify Site Accessibility
1. Visit the configured URL (e.g., `https://username.github.io/repo`)
2. Check that assets load correctly
3. Verify internal navigation works
4. Test links in different browsers

### Debug Deployment Issues
- Check Actions workflow logs for error messages
- Review deployment job output for specific failures
- Verify Docusaurus config matches actual deployment URL
- Test build locally with `npm run build`
