const path = require('path');

const MODE = 'development';
// const MODE = 'production';

const config = {
  mode: MODE,
  devtool: 'source-map',

  entry: {
    index: ['./index.js']
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
    publicPath: 'dist/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    host: '0.0.0.0',
    inline: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // eslint-disable-next-line global-require
              plugins: [require('autoprefixer')({ grid: true })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env'
              // {'useBuiltIns': 'usage'}
            ]
          ]
        }
      }
    ]
  }
};

module.exports = config;
