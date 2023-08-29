/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: path.resolve('./chrome/background.ts'),
    contentScript: path.resolve('./chrome/contentScript.ts')
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
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './build/index.html', 
      filename: 'index.html' 
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'manifest.json'
        },
        {
          from: './assets', to: './assets'
        },
        {
          from: './build',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    })
  ],
};