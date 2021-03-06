const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

let plugins = [
  new CleanWebpackPlugin([ 'public' ]),
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new BundleAnalyzerPlugin()
]

if (process.env.NODE_ENV === 'production') {
  plugins = [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
}

module.exports = {
  entry: [
    './node_modules/reset-css/reset.css',
    './src/main.css',
    './src/main.js'
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './public')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  },
  plugins,
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    disableHostCheck: true,
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    https: !!process.env.HTTPS,
    historyApiFallback: true
  }
}
