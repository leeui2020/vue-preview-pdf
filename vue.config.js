module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://youpubucket-30187.sz.gfp.tencent-cloud.com',
        pathRewrite: {
          '^/api': ''
        },
      },
    },
  },
};
