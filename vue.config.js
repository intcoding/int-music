/* eslint-disable */
const px2rem = require('postcss-pxtorem')

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            rootValue: 16,
            selectorBlackList: [],
            propList: ['*'],
          }),
        ],
      },
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://111.231.86.149:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
}
