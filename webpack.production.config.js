var webpack = require('webpack');

module.exports = {
  entry: [
    './js/index.jsx'
  ],
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jQuery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader?modules'
      },
      { 
        test: /\.js[x]?$/, 
        exclude: /node_modules/, 
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
