/** @type { import('@storybook/web-components-vite').StorybookConfig } */

export default {
  stories: [
    "../src/components/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
};
