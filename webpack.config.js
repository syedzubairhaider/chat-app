
var webpack = require('webpack');
var {resolve} = require('path');

var BUILD_DIR = resolve(__dirname, 'dist/');
var APP_DIR = resolve(__dirname, 'src/');

var config = {
  devtools: 'eval-source-map',
  entry: ['babel-polyfill','webpack-hot-middleware/client', 'react-hot-loader/patch','webpack/hot/only-dev-server',APP_DIR + '/index.js'],
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  module: {
    loaders: [

{ test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        },
        devtool: 'inline-source-map',
    devServer: {
        hot:true,
        port: 3001,
        contentBase: './dist',
        inline: true
    },
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;