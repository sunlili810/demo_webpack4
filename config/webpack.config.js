const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const theme = require('./antd.theme');

const webpackConfig = {
  // entry: {
  //  app: path.join(__dirname, '../src/index.js')
  // },
  entry: [
    path.join(__dirname, '../src/index.js')
  ].filter(Boolean),
  cache: true,
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(__dirname, '../src/components'),
      images: path.join(__dirname, '../res/images'),
      media: path.join(__dirname, '../res/media'),
      pages: path.join(__dirname, '../src/pages'),
      localData: path.join(__dirname, '../src/testdata/localdata'),
      mockData: path.join(__dirname, '../src/testdata/mockdata'),
      util: path.join(__dirname, '../src/utils'),
      store: path.join(__dirname, '../src/store'),
      jquery: path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          'react-hot-loader/webpack',
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(sc|c|le)ss$/,
        // use: [
        //  'style-loader',
        //  'css-loader'
        // ]
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          // 'sass-loader',
          'less-loader'
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: ['url-loader?limit=1&name=static/images/[name].[hash:8].[ext]']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=1&name=static/iconfont/[name].[hash:8].[ext]']
      },
      {
        test: /\.mp3$/,
        use: ['file-loader?name=static/media/[name].[hash:8].[ext]']
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        options: {
          sourceMap: true,
          modifyVars: theme
        }
      }
      // {
      //  test(file) {
      //    return /\.less$/.test(file) && !/\.module\.less$/.test(file);
      //  },
      //  use: [
      //    MiniCssExtractPlugin.loader,
      //    'less-loader'
      //  ]
      //  // use: ExtractTextPlugin.extract('css-loader?sourceMap&-autoprefixer!' +
      //  //            `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`)
      // }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ExtractTextPlugin({
    //  filename: 'styles.[contenthash].css',
    //  disable: false,
    //  allChunks: false
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.[contenthash].css',
      chunkFilename: '[id].css'
    }),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: 'res/images/favicon.ico',
      to: 'static/images/favicon.ico'
    }])
  ]
};

module.exports = webpackConfig;
