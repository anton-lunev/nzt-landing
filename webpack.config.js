const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {

  return {
    entry: './scripts/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    module: {
      rules: [
        {test: /\.ts/, use: 'ts-loader'},
        {
          test: /\.less/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {loader: "postcss-loader"},
            {loader: "less-loader"}
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':src', ':data-src', ':data-bg', ':srcset']
            }
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg|webp)$/i,
          use: ['file-loader', 'image-webpack-loader']
        }
      ]
    },
    optimization: {
      usedExports: true,
      minimizer: [new TerserJSPlugin({parallel: true}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: 'favicon.ico',
      }),
      new MiniCssExtractPlugin({
        filename: "styles.[hash].css",
      }),
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
      })
      //   new WorkboxPlugin.GenerateSW({
      //     exclude: [/\.(?:png|jpg|jpeg|svg|css|js|html)$/],
      //     swDest: 'sw.js',
      //     clientsClaim: true,
      //     skipWaiting: true,
      //     runtimeCaching: [
      //       {
      //         urlPattern: /\.(?:png|jpg|jpeg|svg|css|js|html)$/,
      //         handler: 'networkFirst',//TODO change after implementation is done
      //       },
      //       {
      //         urlPattern: new RegExp('https://fonts.(googleapis|gstatic).com'),
      //         handler: 'cacheFirst'
      //       }
      //     ]
      //   }),
    ]
  }
};
