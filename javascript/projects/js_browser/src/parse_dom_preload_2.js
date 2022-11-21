import * as path from "path";
import * as process from "process";
import {PageLoaderState} from "./page_loader.js";

class UndefinedParseResult {
	/**
	 * @param {boolean} fallback
	 */
	bool(fallback) {
		return fallback;
	}
}

class JSONParseResult {
	/**
	 * @param {any} value
	 */
	constructor(value) {
		this.value=value;
	}
	/**
	 * @param {boolean} fallback
	 */
	bool(fallback) {
		if(typeof this.value==='boolean') {
			return this.value;
		}
		return fallback;
	}
}

/**
 * @param {string | undefined} env_value
 */
function try_parse_env(env_value) {
	if(env_value===undefined) {
		return new UndefinedParseResult;
	}
	return new JSONParseResult(JSON.parse(env_value));
}

const debug=try_parse_env(process.env.DEBUG).bool(false);

process.on('unhandledRejection',(/** @type {unknown} */ error) => {
	console.log('unhandled promise rejection',error);
});
/** @param {string} url */
async function new_FetchRequestState(url) {
	return new PageLoaderState(url);
}

/**
 * @param {{}} state
 */
async function do_browse(state) {
	let res=await new_FetchRequestState(url);
	let lexer=await import_ipc_plugin(ipc_loader_state,"html_lexer");
	if(!lexer) throw new Error("Can't import lexer plugin");
	let repl_plugin=await import_ipc_plugin(ipc_loader_state,"repl_plugin_manager/mod.js");
	if(debug) console.log('repl plug',repl_plugin);
	await Promise.resolve();
	await fetch_url(res);
}

async function async_main() {
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
		cmd_argv.shift();
	}
	if(cmd_argv[0]==='--no-repl') {
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
	let state={};
	await do_browse(state);
}

try {
	await async_main();
	console.log("app promise done");
} catch(err) {
	console.log(err);
	throw err;
}

