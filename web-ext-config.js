const path = require('path');
const process = require('process');
module.exports = {
  ignoreFiles: [
    "**/__tests__",
    "**/*.xcf",
    "static/screenshots",
    "*.md",
    ".*",
    "web-ext-config.js",
    "jest.config.js",
    "package*.json",
  ],
  run: {
    watchIgnored: [
      '.git',
      '.idea',
      'node_modules',
      'web_artifacts',
    ].map(p => path.join(process.cwd(), p)),
  },
  // verbose: true,
};
