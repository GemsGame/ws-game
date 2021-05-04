const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './src/bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf|TTF)$/,
        use: [
          {
            loader: 'file-loader?name=../assets/[name].[ext]'
          }

        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './src/index.html' // relative to root of the application
    }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: './src/style.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/', to: './src/assets/' }
      ]
    })
  ]
};
