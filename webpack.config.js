const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const extractLess = new ExtractTextPlugin({
  filename: "styles.[contenthash].css",
  allChunks: true
});

module.exports = {
  entry: './scripts/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {test: /\.ts/, include: path.join(__dirname, "scripts"), use: 'ts-loader'},
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
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: 'favicon.ico',
    }),
    extractLess,
    new WebpackPwaManifest({
      name: 'NztCoin',
      short_name: 'NztCoin',
      description: 'Новая волна в мире международного интернет-бизнеса',
      background_color: '#29bae3',
      theme_color: '#29bae3',
      lang: "ru-RU",
      start_url: 'https://nztcoin.com/',
      orientation: "portrait",
      display: "standalone",
      ios: true,
      icons: [
        {
          src: "images/icons/icon.png",
          sizes: [72, 96, 128, 192, 256, 384, 512],
        },
        {
          src: "images/icons/icon.jpg",
          sizes: [72, 96, 128, 192, 256, 384, 512],
          ios: true
        },
        {
          src: "images/icons/icon.png",
          size: 512,
          ios: 'startup'
        },

      ]
    }),
    new WorkboxPlugin.GenerateSW({
      exclude: [/\.(?:png|jpg|jpeg|svg|css|js)$/],
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|css|js)$/,
          handler: 'cacheFirst',
        },
        {
          urlPattern: new RegExp('https://fonts.(googleapis|gstatic).com'),
          handler: 'staleWhileRevalidate'
        }
      ]
    }),
  ]
};
