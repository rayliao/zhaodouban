var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [ 
    'webpack-dev-server/client?https://' + process.env.IP + ':' + process.env.PORT,
    'webpack/hot/only-dev-server',
    './src/index.js' 
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    // 热替换，自动刷新
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
  	loaders: [
  		{ 
  			test: /\.js$/, 
  			loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
  		}
  	]
  }
};
