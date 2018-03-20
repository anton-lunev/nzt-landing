const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const extractLess = new ExtractTextPlugin({
  filename: "styles.[contenthash].css",
  allChunks: true
  // disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './scripts/index.ts',
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js'
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {test: /\.ts/, use: 'ts-loader'},
      {
        test: /\.less/,
        use: extractLess.extract({
          use: [
            {loader: "css-loader"},
            {loader: "postcss-loader"},
            {loader: "less-loader"}
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src', ':data-bg']
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ['file-loader', 'image-webpack-loader']
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
    extractLess
  ]
};