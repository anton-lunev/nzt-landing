const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const extractLess = new ExtractTextPlugin({
  filename: "styles.[contenthash].css",
  allChunks: true
});

module.exports = {
  entry: './scripts/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js'
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
            attrs: [':src', ':data-src', ':data-bg']
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
    new HtmlWebpackPlugin({template: './index.html'}),
    extractLess
  ]
};
