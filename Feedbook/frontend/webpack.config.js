const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: {
            loader: 'svg-url-loader',
            options: {
                encoding: 'base64'
            }
        }
      },
      {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
    ]
  }
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
        REACT_APP_MAP_TOKEN: JSON.stringify("pk.eyJ1IjoiamVubnlteXpoYW5nIiwiYSI6ImNsdHhobXVoNTA2NzYyaXBiZW0zdHZkaWwifQ.l_R7dTb_-mc7mEc_WzGQpQ"),
      },
    }),
  ],
};