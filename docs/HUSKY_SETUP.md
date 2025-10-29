# Husky Pre-commit Rules Documentation

## Overview

This project uses Husky to enforce code quality and consistency through Git hooks. All hooks run production-level checks to ensure code quality before commits and pushes.

## Git Hooks Configuration

### Pre-commit Hook (`.husky/pre-commit`)

- **Purpose**: Runs on every commit to ensure code quality
- **Performance**: Uses `lint-staged` to only check staged files
- **Checks**:
  - Frontend: Linting + Build for staged `.ts`, `.tsx`, `.js`, `.jsx` files
  - Backend: Linting + Build for staged `.ts`, `.js` files
  - Formatting: Prettier formatting for `.json`, `.md`, `.yml`, `.yaml` files

### Commit Message Hook (`.husky/commit-msg`)

- **Purpose**: Enforces conventional commit message format
- **Format**: `<type>[optional scope]: <description>`
- **Valid Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`
- **Example**: `feat(auth): add login functionality`

### Pre-push Hook (`.husky/pre-push`)

- **Purpose**: Runs comprehensive production checks before pushing
- **Environment**: Production configuration (`NODE_ENV=production`)
- **Checks**:
  - Backend: Lint + Production Build + Tests
  - Frontend: Lint + Production Build + Tests
  - TypeScript: Full type checking across the project

## Configuration Files

### Package.json Scripts

```json
{
  "scripts": {
    "prepare": "husky",
    "precommit": "npm run lint && npm run build && npm run test"
  }
}
```

### Lint-staged Configuration

```json
{
  "lint-staged": {
    "frontend/**/*.{ts,tsx,js,jsx}": [
      "npm run lint:frontend",
      "npm run build:frontend"
    ],
    "backend/**/*.{ts,js}": ["npm run lint:backend", "npm run build:backend"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

## Production Checks

All hooks run production-level checks including:

1. **Linting**: ESLint with TypeScript and React rules
2. **Building**: Production builds for both frontend and backend
3. **Testing**: Unit tests for both workspaces
4. **Type Checking**: Full TypeScript type validation
5. **Formatting**: Prettier code formatting

## Usage

### Normal Development

```bash
# Pre-commit hook runs automatically on git commit
git add .
git commit -m "feat: add new feature"
```

### Production Deployment

```bash
# Pre-push hook runs automatically on git push
git push origin main
```

### Manual Hook Execution

```bash
# Run pre-commit checks manually
npm run precommit

# Run specific workspace checks
npm run lint:frontend
npm run build:backend
npm run test
```

## Troubleshooting

### Hook Failures

If hooks fail, fix the issues and try again:

```bash
# Fix linting issues
npm run lint

# Fix build issues
npm run build

# Fix test failures
npm run test
```

### Bypassing Hooks (Not Recommended)

```bash
# Skip pre-commit hook (not recommended)
git commit --no-verify -m "fix: emergency fix"

# Skip pre-push hook (not recommended)
git push --no-verify origin main
```

### Reinstalling Hooks

```bash
# Reinstall Husky hooks
npm run prepare
```

## Benefits

1. **Code Quality**: Ensures consistent code quality across the team
2. **Production Safety**: Prevents broken code from reaching production
3. **Performance**: Only checks staged files for faster commits
4. **Consistency**: Enforces conventional commit messages
5. **Automation**: No manual intervention required

## Dependencies

- `husky`: Git hooks management
- `lint-staged`: Run linters on staged files only
- `prettier`: Code formatting
- `eslint`: Code linting
- `typescript`: Type checking

## Environment Requirements

- Node.js >= 24.0.0
- npm >= 10.0.0
- Git (for hooks to work)

All hooks are configured to run in production mode to ensure the same quality standards as production deployments.
