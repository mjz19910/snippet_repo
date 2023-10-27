const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {get_keys_of}=require('../group2/item_14/item_14');

/** @arg {ModuleDesc} template */
function devtool_module_template(template) {
	// deno-lint-ignore no-debugger
	debugger;
	if(template.identifier.includes("webpack/")) {
		return "";
	}
	console.log(get_keys_of(template).map(e => [e,typeof template[e]]));
	console.log(template.shortIdentifier);
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
		devtoolModuleFilenameTemplate: devtool_module_template,
	},
	devtool: "nosources-source-map",
};
