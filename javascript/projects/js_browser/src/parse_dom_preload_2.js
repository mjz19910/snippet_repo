import * as path from "path";
import * as process from "process";
import {fake,handle_onPageLoadStarted} from "../../browser_fake_dom/index.js";
import {fetch_url,import_ipc_plugin,ipc_loader_state,new_FetchRequestState} from "../../ipc_api/index.js";
import {PageLoaderState} from "../../page_loader/index.js";

process.on('unhandledRejection',(/** @type {any} */ error) => {
	console.log('unhandled promise rejection',error);
});

const debug=false;

async function async_main() {
	let follow_redirects=false;
	let no_repl=false;
	let node_path=process.argv[0];
	// Drop the node program from the argv array, the user can
	// figure out the expected way to execute the script
	if(path.basename(node_path)=='node') {
		process.argv.shift();
	}
	const script_path=path.relative(process.cwd(),process.argv[0]);
	if(process.argv.length<=1) {
		node_path=path.basename(node_path);
		console.log(`Usage: ${path.basename(node_path)} ${script_path} [options] [URL]
       ${path.basename(node_path)} ${script_path} --help`);
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
		console.log(`Usage: ${path.basename(node_path)} ${script_path} [options] [URL]

Options:
  --follow-redirects                follow redirects from the server
  --no-repl                         don't start the repl
  --help                            show this text
`);
		return;
	}
	let url=cmd_argv[0];
	let state=new PageLoaderState(url,{no_repl,follow_redirects});
	handle_onPageLoadStarted(fake.window,state);
	let res=await new_FetchRequestState(url);
	let lexer=await import_ipc_plugin(ipc_loader_state,"html_lexer");
	if(!lexer) throw new Error("Can't import lexer plugin");
	let repl_plugin=await import_ipc_plugin(ipc_loader_state,"repl_plugin_manager/mod.js");
	if(debug) console.log('repl plug',repl_plugin);
	await fetch_url(res);
}

try {
	await async_main();
	console.log("app promise done");
} catch(err) {
	console.log(err);
	throw err;
}