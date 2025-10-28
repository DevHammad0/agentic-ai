import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Agentic Web',
      items: [
        '00_agentic_web/README',
        '00_agentic_web/implications_for_stakeholders',
        '00_agentic_web/panaversity-openai-vision-guide',
        '00_agentic_web/quiz',
      ],
    },
    {
      type: 'category',
      label: 'Agentic Organization',
      items: [
        '01_agentic_org/readme',
        '01_agentic_org/agentic_org_guide',
        '01_agentic_org/quiz',
        '01_agentic_org/graduate_level_quiz',
      ],
    },
  ],
};

export default sidebars;
