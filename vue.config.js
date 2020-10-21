const path = require('path');

const src = './src';

module.exports = {
  lintOnSave: true,
  devServer: {
    port: process.env.PORT || 3002,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, src),
      },
    },
  },
};
