const path = require('path');
const webpack = require('webpack');
/**
 * Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Env. vars
 */
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const host = 'http://' + hostname + ':' + port;
const assetHost = process.env.ASSET_HOST || host + '/';
const paths = {
  source: 'src',
  dist: 'public'
};

module.exports = {
  entry: {
    app: [
      path.resolve('src/main.js'),
      'webpack-dev-server/client?' + host,
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    path: path.join(process.cwd(), 'public'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].[name].js'
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  resolve: {
    modules: [
      'devtools',
      'src',
      'node_modules'
    ],
    extensions: ['.ts', '.js', '.json', '.scss', '.css', '.html', '.jpg', '.png']
  },
  node: {
    global: true,
    process: true,
    console: true,
    fs: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.ejs'),
      inject: 'head'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    port: port,
    publicPath: assetHost, // Make sure publicPath always starts and ends with a forward slash.
    contentBase: [
      path.join(process.cwd(), paths.source),
      path.join(process.cwd(), paths.dist)
    ],
    clientLogLevel: 'none',
    noInfo: true,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                // path.resolve('node_modules/xbem/src/'),
                // path.resolve('src/themes/' + config.theme)
              ]
            }
          }
        ]
      }
    ]
  }
}
