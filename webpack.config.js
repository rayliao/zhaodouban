var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: [
  	'webpack/hot/dev-server',
  	'webpack-dev-server/client?http://localhost:8080',
  	'./js/index.jsx'
  ],
  output: {
    filename: 'bundle.js'
  },
  plugins: [
  	new webpack.HotModuleReplacementPlugin(),
  	new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jQuery'
    }),
    new OpenBrowserPlugin({
      	url: 'http://localhost:8080'
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
