var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/client.js',
	output: {
		path: path.join(__dirname, 'src', 'static', 'js'), 
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
};