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
      icons: [
        {
          src: "images/icons/icon-72x72.png",
          sizes: "72x72",
        },
        {
          src: "images/icons/icon-96x96.png",
          sizes: "96x96",
        },
        {
          src: "images/icons/icon-128x128.png",
          sizes: "128x128",
        },
        {
          src: "images/icons/icon-144x144.png",
          sizes: "144x144",
        },
        {
          src: "images/icons/icon-152x152.png",
          sizes: "152x152",
        },
        {
          src: "images/icons/icon-192x192.png",
          sizes: "192x192",
        },
        {
          src: "images/icons/icon-384x384.png",
          sizes: "384x384",
        },
        {
          src: "images/icons/icon-512x512.png",
          sizes: "512x512",
        }
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
