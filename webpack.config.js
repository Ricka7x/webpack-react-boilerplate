const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');
const isProd = process.env.NODE_ENV === 'production';

const CSS = isProd ?
  ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader','sass-loader']}):
  ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']

const ENTRY = isProd ?
{
  vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom'],
  app: ['./src/index.js']
} :
{app: [ 'react-hot-loader/patch', './src/index.js']}


const OUTPUT = isProd ? 'assets/js/[name].[chunkhash:6].js' : 'bundle.js'
const SOURCEMAPS = isProd ? 'source-map' : 'eval'


const PLUGINS = isProd ?
[
  new webpack.optimize.CommonsChunkPlugin({name: "vendor"}),
  new HtmlWebpackPlugin({ template: 'src/index.html'}),
  new FaviconsWebpackPlugin('./src/static/images/favicon.png'),
  new ExtractTextPlugin('assets/css/[name].[contenthash:6].css')
] :
[
  new HtmlWebpackPlugin({ template: 'src/index.html', title: 'react-boilerplate'})
]




module.exports =  {
  entry: ENTRY,
  output: {
    path: resolve(__dirname, 'dist'),
    filename: OUTPUT
  },
  module:{
    rules: [
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader', options: {fix: true} },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.s?css$/, use: CSS},
      { test: /\.(png|svg|jpe?g|gif)$/, use: [ 'file-loader?name=assets/images/[name].[hash:5].[ext]', 'image-webpack-loader']},
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use:  'file-loader?name=assets/fonts/[name].[hash:5].[ext]'}
    ]
  },
  devtool: SOURCEMAPS,
  plugins: PLUGINS
}
