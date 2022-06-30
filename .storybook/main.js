module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5",
    "disableTelemetry": true,
    "enableCrashReports": false
  },
  "webpackFinal": function webpackFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias|| {}),
      'csv-parse/sync': 'csv-parse/browser/esm/sync'
    };

    return config;
  }
}
