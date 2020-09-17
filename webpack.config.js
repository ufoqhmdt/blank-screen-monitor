const path = require('path')
const webpack = require('webpack')
const argv = require('yargs').argv
const pkg = require('./package.json')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// const CopyPlugin = require('copy-webpack-plugin')

const mode = argv.mode || 'production'
const qappenv = argv.qappenv || 'prod'
const isDist = argv.dist
const isDemo = argv.demo
const iscocos = argv.cocos
// const filename = mode === 'production' ? 'index.js' : 'index.dev.js';

const ip = require('ip').address()

// 处理 entyr，在 package.json 里面所有的 demo 都覆盖了 qa 参数，以区分是否 demo
const entry = {
  index: './src/index.js',
}

if (qappenv === 'qa') {
  entry.demo = './demo/index.js'
}
if (iscocos) {
  entry.index = './cocosDemo/index.js'
}

// plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(mode),
      QAPP_ENV: JSON.stringify(qappenv),
    },

    BRIDGE_VERSION: JSON.stringify(pkg.version),
  }),
  new VueLoaderPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
]

if (!isDist) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new BundleAnalyzerPlugin())
}

function getPublicPath () {
  // webpack dev server
  let result = '/docs/demo/qa/'

  if (isDist) {
    // http://qapp-bridge-testing.qttfe.com/
    if (mode !== 'prodution') {
      return ''
    }

    // http://static-oss.qutoutiao.net
    result = `static-oss.qutoutiao.net/${pkg.location}/${pkg.version}/`
  }
  return result
}

function getPathByEnv () {
  let subPath = ''
  let finalPath = ''
  switch (qappenv) {
  case 'qa':
    subPath = 'qa'
    break
  case 'pre':
    subPath = 'pre'
    break
  }
  finalPath = path.resolve(__dirname, `dist/${subPath}`)
  if (isDemo) {
    finalPath = path.resolve(__dirname, 'docs/demo/qa')
  }
  if (iscocos) {
    finalPath = path.resolve(__dirname, 'dist/cocosDemo')
  }
  return finalPath
}

const config = {
  devtool: mode === 'production' ? 'none' : 'source-map',
  mode,
  entry: entry,
  output: {
    library: 'qruntimeBridgeCore',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: getPathByEnv(),
    filename: '[name].js',
    globalObject: 'this',
    publicPath: getPublicPath(),
    chunkFilename: '[name].chunk.js',
    crossOriginLoading: 'anonymous',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              ['import', { libraryName: 'antd-mobile', style: 'css' }], // `style: true` 会加载 less 文件
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins,
}

if (mode !== 'production') {
  config.devServer = {
    contentBase: __dirname, // boolean | string | array, static file location
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
    host: ip || '0.0.0.0',
    port: 4000,
    open: true,
    openPage: 'docs/demo/index.html',
  }
}

module.exports = config
