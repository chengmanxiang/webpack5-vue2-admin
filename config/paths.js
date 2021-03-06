const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  // Static files that get copied to build folder big photo
  static: path.resolve(__dirname, '../static'),

  // icons files
  icons: path.resolve(__dirname, '../src/icons'),

  // components files
  components: path.resolve(__dirname, '../src/components'),

}
