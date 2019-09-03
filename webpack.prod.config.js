var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commitHash = require('child_process')
  .execSync('git rev-parse --abbrev-ref HEAD; git rev-parse --short HEAD;')
  .toString();
var dotenv = require('dotenv').config();

module.exports = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle-[chunkhash].js',
    publicPath: '/ftb/',
    css: 'styles.css'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    extensions:[".js", ".ts", ".tsx","", ".webpack.js", ".web.js"],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'server/views/index.ejs',
        inject: 'body',
        gitInfo: commitHash,
        elasticHost: dotenv.parsed.ELASTIC_HOST + dotenv.parsed.ELASTIC_API,
        photobankBackendHost: dotenv.parsed.PHOTOBANK_BACKEND_HOST,
        photobankBackendHostApi: dotenv.parsed.PHOTOBANK_BACKEND_HOST_API,
        photobankBackendUser: dotenv.parsed.PHOTOBANK_BACKEND_ADMIN_USER,
        photobankBackendUserApiKey: dotenv.parsed.PHOTOBANK_BACKEND_ADMIN_KEY,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("styles-[contenthash].css", {allChunks:true}),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['require', 'export', '$super']
      },
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['react-hot', 'ts'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader!sass-loader")
      },
      {
        test: /\.(jpg|png|svg)$/,
        loaders: [
            'file-loader?name=[name].[ext]'
        ]
      }
    ]
  }
};
