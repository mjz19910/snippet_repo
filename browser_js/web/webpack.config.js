const path=require('path');

module.exports={
	mode: "production",
	entry: {
		index: __dirname+'/src/index.js',
		print: __dirname+'/src/print.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname,'dist'),
	},
	devtool: "source-map",
};
