module.exports = {
  stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true,
    previewMdx2: true
  },
  async viteFinal(config, options) {
    config.base = "./";
    return config;
  },
  env: (config) => ({
    ...config,
    STORYBOOK_BASE_URL: process.env.NODE_ENV === 'production' ? 'https://helmuthdu.github.io/automated-frontend-workflow/storybook/' : '',
  }),
};
