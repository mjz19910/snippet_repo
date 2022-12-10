const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @param {{ identifier: string; }} template */
function devtool_module_template(template) {
	if(template.identifier.includes("webpack/")) return "webpack:///"+template.identifier;
	return "file:///"+path.resolve(path.dirname(__dirname),template.identifier);
}

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
		filename: '[name].js',
		path: path.resolve(__dirname,'dist'),
		devtoolModuleFilenameTemplate:devtool_module_template,
	},
	devtool: "nosources-source-map",
};
