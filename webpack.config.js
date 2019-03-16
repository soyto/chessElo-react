/* global require */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


let config = function(env, argv) {
  return {
    mode: argv.mode,
    entry: path.resolve('src', 'app.js'),
    output: {
      filename: '[name].[hash].js',
      path: path.resolve('www')
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve('www'),
      open: false
    },
    plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
          template: path.resolve('src', 'www', 'index.html'),
          minify: true,
          inject: true,
          filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
          filename: argv.mode !== 'production' ? '[name].css' : '[name].[hash].css',
          chunkFilename: argv.mode !== 'production' ? '[id].css' : '[id].[hash].css'
        })
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            {loader: argv.mode !== 'production' ? 'style-loader': MiniCssExtractPlugin.loader},
            {loader: 'css-loader', options: {sourceMap: true}},
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function() { return [require('precss'), require('autoprefixer')]}
              }
            },
            {loader: 'resolve-url-loader'},
            {loader: 'sass-loader'}
          ]
        }
      ]
    }
  }
};


module.exports = [config];