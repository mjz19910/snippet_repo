import * as path from "path";
import process from "process";
import {fetch_url} from "./fetch_url.js";
import {import_ipc_plugin} from "./ipc_plugin.js";
import {IpcLoader} from "./nice_loader.js";
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

import {IPCPlugin as HtmlLexer} from "../../html_lexer/ipc_index.js";
import {IPCPlugin as repl_plugin} from "../../repl_plugin/ipc_index.js";

/**
 * @param {{url:string}} state
 */
async function do_browse(state) {
	let res=await new_FetchRequestState(state.url);
	res.set_html_lexer(new HtmlLexer);
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
	let url=cmd_argv[0];
	let state={
		url
	};
	await do_browse(state);
}

try {
	await async_main();
	console.log("app promise done");
} catch(err) {
	throw err;
}

