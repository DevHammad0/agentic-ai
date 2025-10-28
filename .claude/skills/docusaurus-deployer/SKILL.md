---
name: docusaurus-deployer
description: This skill should be used when deploying a Docusaurus site to GitHub Pages. It automates the configuration, building, and deployment process, handling GitHub Pages setup, environment configuration, and CI/CD automation. Includes local validation before GitHub Actions triggering.
---

# Docusaurus GitHub Pages Deployer

This skill automates the process of setting up, building, and deploying Docusaurus documentation sites to GitHub Pages with minimal manual intervention. It ensures local validation of the site before pushing changes to trigger GitHub Actions deployment.

## What This Skill Does

1. **Project Analysis** - Examines Docusaurus structure, configuration files, and dependencies
2. **Local Configuration Validation** - Verifies Docusaurus config (docusaurus.config.ts), sidebars.js, and plugin configuration
3. **Local Build & Testing** - Builds the site locally and validates output before deployment
4. **Content Verification** - Checks for broken links, missing frontmatter, and MDX syntax errors
5. **GitHub Pages Configuration** - Sets up repository settings, branch protection, and deployment settings
6. **CI/CD Automation** - Creates or updates GitHub Actions workflows for automated deployment on code changes
7. **Deployment Verification** - Validates successful deployment and provides access URL

## When to Use This Skill

Use this skill when:
- Deploying a Docusaurus documentation site to GitHub Pages for the first time
- Making updates to documentation and validating changes before publishing
- Updating deployment configuration (URL, baseUrl, organization/project names)
- Troubleshooting deployment issues (build failures, configuration mismatches, broken links)
- Managing multiple documentation sites with different deployment targets
- Ensuring documentation quality before pushing to production

## How to Use This Skill

The deployment workflow follows a **validate-locally-then-publish** pattern to ensure quality documentation before triggering GitHub Actions.

### Step 1: Prepare Repository Configuration

To deploy to GitHub Pages, gather the following information:
- **GitHub Organization/Username**: The organization or user owning the repository
- **Repository Name**: The name of the GitHub repository
- **Deployment Target**: Either `user` (for username.github.io) or `project` (for separate project repo)
- **Custom Domain** (optional): If using a custom domain instead of GitHub Pages subdomain

### Step 2: Analyze Project Structure

Examine the Docusaurus project:

```bash
# Check project structure
ls -la path_to_docusaurus_project/
cat path_to_docusaurus_project/docusaurus.config.ts
cat path_to_docusaurus_project/sidebars.js
```

Verify:
- Docusaurus configuration file exists (docusaurus.config.ts or docusaurus.config.js)
- Sidebar configuration is present (sidebars.js or sidebars.ts)
- Package.json specifies correct Node.js version (verify `engines` field)
- All required dependencies are listed

### Step 3: Update Docusaurus Configuration

Update the Docusaurus config file (`docusaurus.config.ts`) with GitHub Pages-specific settings:

```typescript
const config: Config = {
  title: 'Your Documentation Title',
  tagline: 'Documentation description',
  favicon: 'img/favicon.ico',

  // GitHub Pages configuration
  url: 'https://username.github.io', // or 'https://username.github.io/repo-name' for project repos
  baseUrl: '/', // or '/<repository-name>/' for project repos
  organizationName: 'your-github-org-or-username',
  projectName: 'your-repository-name',
  deploymentBranch: 'gh-pages', // The branch GitHub Pages will serve from
  trailingSlash: false,

  // ... rest of configuration
};
```

**Configuration Guidelines:**
- **User/Organization Pages**: `url` = `https://username.github.io`, `baseUrl` = `/`, `projectName` = `username.github.io`
- **Project Pages**: `url` = `https://username.github.io/repo-name`, `baseUrl` = `/repo-name/`, `projectName` = `repo-name`
- Always use `gh-pages` as the deployment branch for project repositories
- Ensure TypeScript configuration includes `typescript` in devDependencies

### Step 4: Build and Validate Locally

**Install Dependencies:**
```bash
cd path_to_docusaurus_directory
npm ci  # Use clean install for consistency
```

**Run Type Checking:**
```bash
npm run typecheck
```

Verify all TypeScript types are correct. Fix any errors before proceeding.

**Build the Site:**
```bash
npm run build
```

Expected output:
- `/build` directory created with static files
- No errors or critical warnings
- Build completes in < 30 seconds (typical performance)

**Validate Build Output:**
```bash
# Check that build directory exists and contains files
ls -la build/
ls -la build/index.html  # Main page should exist
```

**Test Locally:**
```bash
npm run serve
```

- Visit `http://localhost:3000` (or configured port)
- Verify page loads correctly
- Check navigation and internal links work
- Verify all assets load (images, CSS, JS)
- Test responsive design on different screen sizes
- Verify search functionality (if applicable)

**Validate Content Quality:**
- Verify frontmatter in all documentation files (title, sidebar_position, description)
- Check for broken internal links
- Ensure consistent naming conventions (kebab-case for files)
- Verify proper MDX syntax in documentation files
- Check sidebar navigation organization

### Step 5: Commit and Push to Main

Only after successful local validation:

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update documentation: [description of changes]"

# Push to main branch
git push origin main
```

This triggers the GitHub Actions workflow configured in `.github/workflows/deploy.yml`.

### Step 6: Set Up GitHub Actions for Automated Deployment

Create a GitHub Actions workflow file at `.github/workflows/deploy.yml` in your repository root.

**Workflow Configuration** (reference: `references/deploy-workflow.yml`):
- **Trigger**: Push to main branch only
- **Node.js Setup**: Version matching package.json engines field (e.g., Node 20)
- **Installation**: Use `npm ci` for clean, reproducible installs
- **Type Checking**: Run `npm run typecheck` before build
- **Build**: Execute `npm run build`
- **Deployment**: Use `actions/deploy-pages@v2` for GitHub Pages deployment
- **Permissions**: Set proper read/write permissions for pages and id-token

The workflow ensures:
- Consistent Node.js versions across local and CI environments
- Type safety before deployment
- Automated deployment on every push to main
- Proper artifact handling and GitHub Pages integration

### Step 7: Configure GitHub Pages in Repository Settings

In the GitHub repository settings:

1. Navigate to **Settings → Pages**
2. Under "Build and deployment":
   - Select **GitHub Actions** as the source (modern approach)
   - OR select **Deploy from a branch** and choose `gh-pages` branch with `/ (root)` folder
3. Configure custom domain if needed
4. Enable branch protection rules:
   - Protect main branch
   - Require status checks to pass before merging

### Step 8: Verify Deployment

After pushing to main:

1. **Check GitHub Actions Workflow**:
   - Go to repository → **Actions** tab
   - View the latest "Deploy to GitHub Pages" workflow run
   - Verify all steps complete successfully
   - Check logs for any warnings

2. **Verify Site Accessibility**:
   - Visit configured URL (e.g., `https://username.github.io/repo-name`)
   - Verify page loads correctly
   - Check that assets load properly
   - Test internal navigation
   - Verify search functionality works

3. **Monitor Deployment Status**:
   - Check deployment environment status in repository settings
   - Review deployment history for rollback capability

## Troubleshooting Common Issues

### Build Fails Locally

**Problem: `npm run build` fails with errors**

**Solution Steps:**
1. Verify Node.js version: `node --version` should match `engines.node` in package.json
2. Run type checking: `npm run typecheck` to identify TypeScript errors
3. Check dependencies: `npm ls` to verify all packages are installed correctly
4. Clear cache: `rm -rf node_modules package-lock.json && npm ci`
5. Review error messages for specific issues (missing imports, syntax errors, plugin conflicts)

**Common Causes:**
- Missing dependencies in package.json
- TypeScript configuration errors
- Plugin compatibility issues
- Markdown/MDX syntax errors in documentation files
- Broken import paths in configuration files

### Type Checking Errors

**Problem: `npm run typecheck` reports type errors**

**Solution:**
1. Review error messages carefully - they indicate exact file and line numbers
2. Fix TypeScript errors before attempting build
3. Verify all imported types are properly declared
4. Check docusaurus.config.ts for proper Config type definition
5. Ensure plugin types match installed plugin versions

### Site Not Found (404) After Deployment

**Problem: Site shows 404 or doesn't load after GitHub Actions deployment**

**Solution:**
1. **Verify baseUrl configuration**:
   - For `https://username.github.io/repo-name`: baseUrl should be `/repo-name/`
   - For `https://username.github.io`: baseUrl should be `/`
2. **Check deployment branch**:
   - Verify `gh-pages` branch exists in repository
   - Confirm GitHub Pages is set to deploy from correct branch in Settings → Pages
3. **Review GitHub Actions logs**:
   - Check Actions tab for workflow failures
   - Look for errors in build or deployment steps
4. **Verify build output**:
   - Confirm `/build` directory was created with content
   - Check that index.html exists in build directory

### Broken Links on Deployed Site

**Problem: Internal links don't work or links are broken**

**Solution:**
1. **Verify relative paths**: Ensure all internal links use relative paths or respect baseUrl
2. **Test locally first**: Run `npm run serve` and test all links before pushing
3. **Check frontmatter**: Verify all documents have proper sidebar_position and IDs
4. **Validate sidebar configuration**: Ensure sidebar references match actual file paths
5. **Check MDX syntax**: Verify link syntax is correct: `[text](./path)` not hardcoded URLs

### GitHub Actions Workflow Issues

**Problem: GitHub Actions workflow fails or doesn't trigger**

**Solution:**
1. **Verify workflow file location**: Must be at `.github/workflows/deploy.yml` (repository root, not subdirectory)
2. **Check workflow permissions**:
   - Ensure workflow has pages:write and id-token:write permissions
   - GITHUB_TOKEN should be auto-granted by GitHub
3. **Review workflow logs**:
   - Go to Actions tab and view step-by-step logs
   - Look for specific error messages in failed steps
4. **Verify trigger conditions**:
   - Workflow should trigger on push to main branch
   - Check branch protection rules don't prevent workflow completion
5. **Validate working directories**:
   - If Docusaurus is in subdirectory, set `working-directory` in workflow steps

### Build Performance Issues

**Problem: Build takes too long (> 30 seconds)**

**Solution:**
1. **Analyze build output**: Check if specific plugins or operations are slow
2. **Optimize dependencies**: Remove unused plugins and dependencies
3. **Check file count**: Excessive documentation files can slow builds
4. **Verify system resources**: Ensure sufficient RAM and disk space available
5. **Use npm cache**: GitHub Actions automatically caches npm dependencies

### Content Quality Issues

**Problem: Documentation has missing frontmatter, broken links, or syntax errors**

**Checklist before deployment:**
- [ ] All .md/.mdx files have frontmatter (title, sidebar_position, description)
- [ ] No hardcoded URLs in documentation (use relative links)
- [ ] MDX syntax is valid (no unclosed tags, proper component usage)
- [ ] Sidebar references match actual file names and IDs
- [ ] Images and assets exist at referenced paths
- [ ] No console errors when running `npm run serve`

## Standards and Best Practices

### Pre-Deployment Validation Checklist

Before committing and pushing to main:

**Configuration:**
- [ ] docusaurus.config.ts is valid TypeScript
- [ ] url and baseUrl match GitHub Pages deployment target
- [ ] organizationName and projectName are correct
- [ ] deploymentBranch is set to 'gh-pages'

**Build:**
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run build` completes successfully
- [ ] `/build` directory contains complete site files
- [ ] Build completes in acceptable time (< 30 seconds)

**Content:**
- [ ] All documentation files follow naming conventions (kebab-case)
- [ ] Frontmatter is complete in all files (title, sidebar_position, description)
- [ ] No broken internal links
- [ ] MDX syntax is valid
- [ ] Images and assets load correctly

**Local Testing:**
- [ ] `npm run serve` starts without errors
- [ ] Site loads on `http://localhost:3000`
- [ ] All navigation works correctly
- [ ] Internal links resolve properly
- [ ] Responsive design works on different screen sizes
- [ ] Search functionality works (if enabled)

### Performance Targets

- **Build time**: < 30 seconds for typical documentation sites
- **Page load**: < 3 seconds for documentation pages
- **Bundle size**: Optimized for documentation content
- **Accessibility**: WCAG 2.1 AA compliance

## Tools and Resources Used

- **Node.js/npm** - Package management and build tooling (v20+)
- **Docusaurus CLI** - Build and deployment commands
- **TypeScript** - Type safety and development experience
- **GitHub Actions** - CI/CD automation and workflow scheduling
- **GitHub Pages** - Static site hosting infrastructure
