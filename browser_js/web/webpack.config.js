const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	mode: "production",
	entry: {
		index: __dirname+'/src/index.js',
		print: __dirname+'/src/print.js',
	},
	plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname,'dist'),
	},
	devtool: "source-map",
};
