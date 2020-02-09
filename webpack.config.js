const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV != 'production';

module.exports = {
  entry: {
    scripts: './js/index.js'
  },
  output: {
    publicPath: '/dist',
    path: path.join(__dirname, '/dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/[path][name].[ext]',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              }
            }
          },
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                !isDevelopment ? require('cssnano') : () => { },
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
    ]
  },
  plugins: [
    !isDevelopment ? new CleanWebpackPlugin() : () => { },
    new HtmlWebpackPlugin({ template: './index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false
          }
        }
      })
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
  }
}