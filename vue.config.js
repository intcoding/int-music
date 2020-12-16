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
  devServer: {},
}
