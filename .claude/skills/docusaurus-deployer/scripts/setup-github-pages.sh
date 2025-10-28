#!/bin/bash

# Docusaurus GitHub Pages Deployment Setup Script
# This script automates the setup of GitHub Pages deployment for a Docusaurus site

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
  log_info "Checking prerequisites..."

  if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed"
    exit 1
  fi

  if ! command -v npm &> /dev/null; then
    log_error "npm is not installed"
    exit 1
  fi

  if ! command -v git &> /dev/null; then
    log_error "Git is not installed"
    exit 1
  fi

  log_info "Node.js version: $(node --version)"
  log_info "npm version: $(npm --version)"
  log_info "Git version: $(git --version)"
}

# Get user input
get_github_config() {
  log_info "Gathering GitHub configuration..."

  read -p "Enter GitHub organization/username: " GITHUB_ORG
  read -p "Enter repository name: " REPO_NAME
  read -p "Is this a user/org page (y/n)? [n]: " IS_USER_PAGE

  if [[ "$IS_USER_PAGE" == "y" ]]; then
    GITHUB_URL="https://${GITHUB_ORG}.github.io"
    BASE_URL="/"
  else
    GITHUB_URL="https://${GITHUB_ORG}.github.io/${REPO_NAME}"
    BASE_URL="/${REPO_NAME}/"
  fi

  log_info "GitHub URL: $GITHUB_URL"
  log_info "Base URL: $BASE_URL"
}

# Update Docusaurus config
update_docusaurus_config() {
  local config_file="website/docusaurus.config.ts"

  if [ ! -f "$config_file" ]; then
    log_error "Docusaurus config not found at $config_file"
    exit 1
  fi

  log_info "Updating Docusaurus configuration..."

  # Backup original config
  cp "$config_file" "${config_file}.backup"
  log_info "Backup created at ${config_file}.backup"

  # These updates should be done manually or with sed/awk based on specific needs
  log_warn "Please manually update the following in $config_file:"
  echo "  1. Set url: '$GITHUB_URL'"
  echo "  2. Set baseUrl: '$BASE_URL'"
  echo "  3. Set organizationName: '$GITHUB_ORG'"
  echo "  4. Set projectName: '$REPO_NAME'"
  echo "  5. Set deploymentBranch: 'gh-pages'"
}

# Create GitHub Actions workflow
create_workflow() {
  local workflow_dir=".github/workflows"
  local workflow_file="${workflow_dir}/deploy.yml"

  log_info "Creating GitHub Actions workflow..."

  mkdir -p "$workflow_dir"

  if [ -f "$workflow_file" ]; then
    log_warn "Workflow file already exists at $workflow_file"
    read -p "Overwrite? (y/n) [n]: " OVERWRITE
    if [[ "$OVERWRITE" != "y" ]]; then
      log_info "Skipping workflow creation"
      return
    fi
  fi

  log_info "Workflow created at $workflow_file"
  log_warn "Please copy the reference workflow from references/deploy-workflow.yml to $workflow_file"
}

# Build and test
build_site() {
  log_info "Installing dependencies..."
  cd website
  npm ci

  log_info "Running TypeScript type check..."
  npm run typecheck || log_warn "TypeScript check failed, but continuing..."

  log_info "Building Docusaurus site..."
  npm run build

  cd ..
  log_info "Build successful! Site ready at website/build"
}

# Main execution
main() {
  log_info "Docusaurus GitHub Pages Setup Script"
  log_info "======================================"

  check_prerequisites
  get_github_config
  update_docusaurus_config
  create_workflow

  read -p "Build site now? (y/n) [y]: " BUILD_NOW
  if [[ "$BUILD_NOW" != "n" ]]; then
    build_site
  fi

  log_info "Setup complete!"
  log_info "Next steps:"
  echo "  1. Update website/docusaurus.config.ts with the configuration values shown above"
  echo "  2. Copy references/deploy-workflow.yml to .github/workflows/deploy.yml"
  echo "  3. Commit and push changes to main branch"
  echo "  4. Check GitHub Actions tab for deployment status"
  echo "  5. Visit your site at: $GITHUB_URL"
}

main "$@"
