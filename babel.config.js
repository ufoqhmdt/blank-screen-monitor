const path = require('path')

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-object-assign',
  ],
  include: [path.resolve(__dirname, 'src/'), path.resolve(__dirname, 'demo/')],
}
