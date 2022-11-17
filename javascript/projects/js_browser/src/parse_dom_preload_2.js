import path,{relative} from "path";
import {default as process} from "process";
import {fake,handle_onPageLoadStarted} from "../../browser_fake_dom/index.js";
import {fetch_url} from "../../ipc_api/index.js";
import {import_ipc_plugin} from "../../ipc_api/index.js";
import {ipc_loader_state} from "../../ipc_api/index.js";
import {new_FetchRequestState} from "../../ipc_api/index.js";
import {PageLoaderState} from "../../page_loader/index.js";
const saved_console=console;
process.on('unhandledRejection',error => {
	saved_console.log('unhandled promise rejection',error);
});
/**
 * @arg {boolean} long_help
 * @param {string} node_path
 * @param {string} script_path
 */
function usage(long_help,node_path,script_path) {
	if(long_help) {
		console.log(`Usage: ${node_path} ${script_path} [options] [URL]

Options:
  --follow-redirects                follow redirects from the server
  --no-repl                         don't start the repl
  --help                            show this text
`);
	} else {
		console.log(`Usage: ${path.basename(node_path)} ${script_path} [options] [URL]
       ${path.basename(node_path)} ${script_path} --help`);
	}
}
function main() {
	let follow_redirects=false;
	let no_repl=false;
	let node_path=process.argv[0];
	// Drop the node program from the argv array, the user can
	// figure out the expected way to execute the script
	if(path.basename(node_path)=='node') {
		process.argv.shift();
	}
	const script_arg=relative(process.cwd(),process.argv[0]);
	if(process.argv.length<=1) {
		usage(false,path.basename(node_path),script_arg);
		return;
	}
	const cmd_argv=process.argv.slice(1);
	if(cmd_argv[0]==='--follow-redirects') {
		follow_redirects=true;
		cmd_argv.shift();
	}
	if(cmd_argv[0]==='--no-repl') {
		no_repl=true;
		cmd_argv.shift();
	}
	if(cmd_argv[0]==='--help') {
		usage(true,path.basename(node_path),script_arg);
		return;
	}
	let url=cmd_argv[0];
	let state=new PageLoaderState(url,{no_repl,follow_redirects});
	handle_onPageLoadStarted(fake.window,state);
	async_main(url);
}
main();
const debug=false;
/**
 * @param {string} url
 */
async function async_main(url) {
	let res=await new_FetchRequestState(url);
	let lexer=await import_ipc_plugin(ipc_loader_state,"html_lexer");
	if(!lexer) throw new Error("Can't import lexer plugin");
	let repl_plugin=await import_ipc_plugin(ipc_loader_state,"repl_plugin_manager/mod.js");
	if(debug) console.log('repl plug',repl_plugin);
	await Promise.resolve();
	await fetch_url(res);
}
