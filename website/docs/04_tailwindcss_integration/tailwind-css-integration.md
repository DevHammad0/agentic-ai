---
sidebar_position: 99
title: Tailwind CSS Integration Guide
description: Step-by-step guide to integrate Tailwind CSS with Docusaurus
---

# Tailwind CSS Integration with Docusaurus

This guide provides a complete step-by-step approach to integrate Tailwind CSS with your Docusaurus site. Follow these steps to replicate the same setup on your own projects.

## Prerequisites

- Docusaurus 3.x installed
- pnpm, npm, or yarn as your package manager
- Node.js 18+ (recommended)

## Step 1: Install Tailwind CSS v3

First, install Tailwind CSS v3 and its dependencies. We use v3 because it's stable and well-tested with Docusaurus.

```bash
npm install -D tailwindcss postcss autoprefixer
# or with pnpm
pnpm add -D tailwindcss postcss autoprefixer
```

**Why v3 and not v4?**
- Tailwind v3 is proven to work seamlessly with Docusaurus
- v4 requires different CSS syntax and has less documentation for Docusaurus integration
- v3 provides stability for production sites

**Check your package.json** should now have:
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.x",
    "postcss": "^8.x.x",
    "autoprefixer": "^10.x.x"
  }
}
```

## Step 2: Create Tailwind Configuration File

Create a `tailwind.config.js` file in your **website root directory** (same level as `docusaurus.config.ts`):

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx}",
  ],

  // Configure dark mode to work with Docusaurus's [data-theme="dark"] selector
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    extend: {},
  },

  // Disable Tailwind's default base styles to prevent conflicts with Infima
  corePlugins: {
    preflight: false,
  },

  // Make Tailwind utilities important by default
  important: true,

  plugins: [],
}
```

**Important settings explained:**

| Setting | Purpose |
|---------|---------|
| `content` | Tells Tailwind where to find class names. Must include your React components and MDX docs |
| `darkMode: ['selector', '[data-theme="dark"]']` | Makes dark mode work with Docusaurus's theme system |
| `preflight: false` | Prevents Tailwind from resetting base styles (Docusaurus uses Infima for base styles) |
| `important: true` | Ensures Tailwind utilities override Infima styles when needed |

## Step 3: Create PostCSS Configuration File

Create a `postcss.config.js` file in your **website root directory**:

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

This tells PostCSS to process Tailwind and autoprefixer when building CSS files.

## Step 4: Update Custom CSS File

Update or create `src/css/custom.css` with Tailwind directives:

```css
/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */

/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom Docusaurus variables remain here */
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  /* ... rest of your Infima variables ... */
}

/* Dark mode overrides */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  /* ... rest of your dark mode variables ... */
}
```

**Key points:**
- Tailwind directives must be at the top
- Keep your Docusaurus/Infima variables below
- Dark mode uses `[data-theme='dark']` selector to match Docusaurus

## Step 5: Update Docusaurus Config (Optional)

If you had a custom PostCSS plugin in `docusaurus.config.ts`, **remove it**. The `postcss.config.js` file we created will handle everything:

```javascript
// docusaurus.config.ts
const config: Config = {
  // ... other config ...

  plugins: [
    [
      "docusaurus-lunr-search",
      {
        indexBaseUrl: true,
      },
    ],
    // Remove any custom tailwindcss plugin - postcss.config.js handles it now
  ],

  // ... rest of config ...
};
```

## Step 6: Test the Setup

### Build Test
```bash
npm run build
# or
pnpm build
```

Check the output for success message:
```
[SUCCESS] Generated static files in "build".
```

### Verify Tailwind Classes in CSS
Check if Tailwind classes are in the compiled CSS:

```bash
# Look for Tailwind utilities in the CSS file
grep "bg-purple-600\|text-white\|rounded-lg" build/assets/css/styles*.css
```

If you see Tailwind classes, the integration is working!

### Dev Server Test
```bash
npm start
# or
pnpm start
```

Your site should start on `http://localhost:3000`

## Step 7: Create a Test Component (Optional)

Create a component to verify Tailwind is working:

```tsx
// src/components/TailwindTest.tsx
import React from 'react';

export const TailwindTest: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-blue-600 rounded-lg shadow-2xl p-8 max-w-md w-full text-white">
        <h1 className="text-4xl font-bold mb-4">Tailwind Works!</h1>
        <p className="text-lg text-blue-100 mb-6">
          If you see this blue card, Tailwind CSS is properly configured.
        </p>
        <button className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
          Click Me
        </button>
      </div>
    </div>
  );
};
```

## Step 8: Using Tailwind in Your Project

### In React Components
```tsx
<div className="bg-purple-600 text-white rounded-lg p-4 shadow-md">
  Styled with Tailwind!
</div>
```

### In MDX/Markdown
```mdx
<div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
  **Note:** You can use Tailwind classes in MDX content!
</div>
```

### Dark Mode Support
```tsx
<p className="text-black dark:text-white">
  Black in light mode, white in dark mode
</p>
```

## Troubleshooting

### Issue: Tailwind classes not applying

**Solution 1: Check content paths**
Verify `tailwind.config.js` includes all directories with components:
```javascript
content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./docs/**/*.{md,mdx}",
  // Add any other directories with Tailwind classes
],
```

**Solution 2: Rebuild the project**
```bash
pnpm build
```

**Solution 3: Clear cache**
```bash
rm -rf node_modules .docusaurus build
pnpm install
pnpm build
```

### Issue: Dark mode not working

**Solution:** Make sure your `tailwind.config.js` has:
```javascript
darkMode: ['selector', '[data-theme="dark"]'],
```

This tells Tailwind to look for Docusaurus's dark mode selector.

### Issue: Conflicts with Docusaurus styles

**Solution:** Ensure these are in your `tailwind.config.js`:
```javascript
corePlugins: {
  preflight: false,  // Don't reset base styles
},
important: true,    // Make utilities important
```

This prevents Tailwind from overriding Docusaurus's Infima CSS framework.

## File Structure Summary

After following all steps, your directory should look like:

```
website/
├── docs/
│   └── ... (markdown files)
├── src/
│   ├── components/
│   │   └── ... (React components)
│   ├── css/
│   │   └── custom.css (with Tailwind directives)
│   └── pages/
│       └── ... (page components)
├── docusaurus.config.ts
├── tailwind.config.js          ← Step 2
├── postcss.config.js           ← Step 3
├── package.json                ← Step 1 (updated)
└── ... (other config files)
```

## Complete Configuration Files Reference

### tailwind.config.js (Full)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  important: true,
  plugins: [],
}
```

### postcss.config.js (Full)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### src/css/custom.css (Full)
```css
/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* You can override the default Infima variables here. */
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

/* For readability concerns, you should choose a lighter palette in dark mode. */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
```

## Next Steps

1. **Create components** - Start building reusable components with Tailwind
2. **Customize theme** - Extend Tailwind's theme in `tailwind.config.js`
3. **Install plugins** - Add Tailwind plugins for additional features
4. **Learn more** - Visit [Tailwind CSS docs](https://tailwindcss.com/docs)

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docusaurus Official Docs](https://docusaurus.io/docs)
- [Infima CSS Framework](https://infima.dev/)
- [PostCSS Documentation](https://postcss.org/)

---

**Last Updated:** November 2024
**Tailwind Version:** 3.4.x
**Docusaurus Version:** 3.9.2
