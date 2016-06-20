module.exports = {
  entry: [ './src/index.js' ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js', // 还不知道这个配置是做什么用的
    path: 'dist'
  },
  module: {
  	loaders: [
  		{ 
  			test: /\.js$/, 
  			exclude: /node_modules/, 
  			loader: 'babel-loader'
  		}
  	]
  }
};
