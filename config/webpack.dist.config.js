const webpack = require('webpack');
const path = require('path');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const theme = require('./antd.theme');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = {
  // entry: {
  //  app: path.join(__dirname, '../src/index.js')
  //  // vendor: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'jquery', 'echarts', 'mockjs', 'antd']
  // },
  entry: [
    path.join(__dirname, '../src/index.js')
  ].filter(Boolean),
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
    publicPath: '/'
  },
  cache: false,
  devtool: false,
  mode: 'production',
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
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(sc|c|le)ss$/,
        use: [

          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          // 'sass-loader',
          'less-loader'
        ]
        // use: [
        //  'style-loader',
        //  'css-loader'
        // ]
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
      //  //  `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`)
      // }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    // new webpack.DefinePlugin({
    //  'process.env': {
    //    NODE_ENV: JSON.stringify('production')
    //  }
    // }),
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  filename: '[name].[chunkhash].js',
    //  minChunks(module, count) {
    //    return (
    //      module.resource &&
    //      /\.js$/.test(module.resource) &&
    //      module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
    //    );
    //  }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //  name: 'runtime',
    //  filename: '[name].[chunkhash].js',
    //  chunks: ['vendor']
    // }),
    // new ExtractTextPlugin({
    //  filename: 'styles.[contenthash].css',
    //  disable: false,
    //  allChunks: false
    // }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].chunk.css'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  },
    //  mangle: {
    //    except: ['$super', '$', 'exports', 'require'] // 以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
    //  },
    //  output: {
    //    comments: false
    //  }
    // }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        mangle: true,
        output: {
          comments: false,
          beautify: false
        },
        compress: true,
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({
      format: '  build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      inject: true,
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([{
      from: 'res/images/favicon.ico',
      to: 'static/images/favicon.ico'
    }])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
      // cacheGroups: {
      //  styles: {
      //    name: 'styles',
      //    test: /\.css$/,
      //    chunks: 'all',
      //    enforce: true
      //  }
      // }
      // cacheGroups: {
      //  commons: {
      //    name: "commons",
      //    chunks: "initial",
      //    minChunks: 2
      //  }
      // }
      // cacheGroups: {
      //  // commons: {
      //  //  test: /[\\/]node_modules[\\/]/,
      //  //  name: 'vendors',
      //  //  chunks: 'all'
      //  // }
      //  styles: {
      //    name: 'style',
      //    test: /\.(css)$/,
      //    chunks: 'all',
      //    enforce: true
      //  }
      // }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ],
    runtimeChunk: true
  }
};

module.exports = webpackConfig;
