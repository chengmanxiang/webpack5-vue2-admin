// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  'plugins': {
    // "postcss-import": {
      // vue-loader版本高 需要处理
    //   resolve(id) {
    //     if (id.charAt(0) == '~') {
    //       return id.substr(1)
    //     } else {
    //       return id
    //     }
    //   }
    // },
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {}
  }
}
