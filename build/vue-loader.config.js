module.exports = {
  loaders: {
    js: "async-vue-component-loader"
  },
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
