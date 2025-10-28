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
  tutorialSidebar: [
    {
      type: "doc",
      id: "README",
      label: "Welcome",
    },
    {
      type: "category",
      label: "Step 00: The Agentic Web",
      items: [
        {
          type: "doc",
          id: "agentic_web/README",
          label: "Overview",
        },
        {
          type: "doc",
          id: "agentic_web/panaversity-openai-vision-guide",
          label: "OpenAI's Vision Guide",
        },
        {
          type: "doc",
          id: "agentic_web/implications_for_stakeholders",
          label: "Implications for Stakeholders",
        },
        {
          type: "doc",
          id: "agentic_web/quiz",
          label: "Self-Assessment Quiz",
        },
      ],
    },
    {
      type: "category",
      label: "Step 01: Agentic Organizations",
      items: [
        {
          type: "doc",
          id: "agentic_org/readme",
          label: "Overview",
        },
        {
          type: "doc",
          id: "agentic_org/agentic_org_guide",
          label: "Agentic Organization Guide",
        },
        {
          type: "doc",
          id: "agentic_org/quiz",
          label: "Self-Assessment Quiz",
        },
        {
          type: "doc",
          id: "agentic_org/graduate_level_quiz",
          label: "Graduate Level Quiz",
        },
      ],
    },
  ],
};

export default sidebars;
