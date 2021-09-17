const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const paths = require('./paths')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/main.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.static,
          to: 'static',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack5 vue2',
      favicon: paths.public + '/favicon.ico',
      template: paths.public + '/index.html', // template file
      filename: 'index.html', // output file
    }),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
    new PrettierPlugin(),

    // vue-loader configuration
    new VueLoaderPlugin(),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // vue: Use Babel to transpile JavaScript files
      { test: /\.vue$/, use: ['vue-loader'] },

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, exclude: /(node_modules)/, use: ['babel-loader'] },

      // JavaScript: Use Babel to transpile tsx files
      { test: /\.(tsx?|jsx)$/, exclude: /(node_modules)/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource', generator: {
          filename: 'img/[name].[hash:6][ext]',
        }
      },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },

      // scss css 
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // svg
      // {
      //   test: /\.(svg)$/, exclude: [
      //     paths.icons
      //   ]
      // },
       // svg
       {
        test: /\.svg$/, include: [
          paths.icons
        ],
        use: [{
          loader: 'svg-sprite-loader', options: {
            symbolId: 'icon-[name]'
          }
        }]
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.vue', '.css', '.scss', '.jsx'],
    alias: {
      '@': paths.src,
    },
  },
}
