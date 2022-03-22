import path, {relative} from "path";
import {default as process, argv, exit} from "process";
import {fetch_url, import_ipc_plugin, new_FetchRequestState} from "./ipc_api/src/mod.js";
import {
	init_wget,
} from "./mod.js";
const saved_console = console;
process.on('unhandledRejection', error => {
	saved_console.log('unhandled promise rejection', error);
});
/**
 * @arg {boolean} long_help
 * @param {string} node_path
 * @param {string} script_path
 */
function usage(long_help, node_path, script_path) {
	if(long_help) {
		console.log(`Usage: ${node_path} ${script_path} [options] [URL]

Options:
  --follow-redirects                follow redirects from the server
  --no-repl                         dont start the repl
  --help                            show this text
`);
	} else {
		console.log(`Usage: ${path.basename(node_path)} ${script_path} [options] [URL]
       ${path.basename(node_path)} ${script_path} --help`);
	}
}
function main() {
	let follow_redirects = false;
	let no_repl = false;
	let node_path = argv[0];
	// Drop the node program from the argv array, the user can
	// figure out the expected way to execute the script
	if(path.basename(node_path) == 'node') {
		argv.shift();
	}
	const script_arg = relative(process.cwd(), argv[0]);
	if(argv.length <= 1) {
		usage(false, path.basename(node_path), script_arg);
		return;
	}
	const cmd_argv = argv.slice(1);
	if(cmd_argv[0] === '--follow-redirects') {
		follow_redirects = true;
		cmd_argv.shift();
	}
	if(cmd_argv[0] === '--no-repl') {
		no_repl = true;
		cmd_argv.shift();
	}
	if(cmd_argv[0] === '--help') {
		usage(true, path.basename(node_path), script_arg);
		return;
	}
	let url = cmd_argv[0];
	let ok = init_wget({}, url);
	if(!ok) {
		console.log('init failed');
		exit(1);
	}
	async_main(url);
}
main();
/**
 * @param {string} url
 */
async function async_main(url) {
	let res=await new_FetchRequestState(url);
	debugger;
	let lexer=await import_ipc_plugin("tiny_html_lexer");
	if(!lexer)throw new Error("Can't import lexer plugin");
	let parser=await import_ipc_plugin("tiny_html_parser");
	parser.ipc_call("set_lexer", ipc_wrap('[tiny_html_lexer.lexer]', [lexer]));
	fetch_url(res);
}
/**
 * @param {string} _a
 * @param {any[]} b
 */
function ipc_wrap(_a, b){
	return b;
}