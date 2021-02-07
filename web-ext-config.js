const path = require('path');
const process = require('process');
module.exports = {
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
