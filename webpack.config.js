const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './scripts/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {test: /\.ts/, use: 'ts-loader'},
      {
        test: /\.less/, use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "postcss-loader"},
          {loader: "less-loader"}
        ]
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
    new HtmlWebpackPlugin({template: './index.html'})
  ]
};
