/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve('./src/popup.tsx'),
    background: path.resolve('./src/chrome/background.ts'),
    contentScript: path.resolve('./src/chrome/contentScript.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.d.ts', '.jsx', '.js', '.d.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './src/popup.html', 
      filename: 'popup.html' 
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'manifest.json'
        },
        {
          from: './assets', to: './assets'
        }
      ]
    })
  ],
};