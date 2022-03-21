import path, {relative} from "path";
import {default as process, argv, exit} from "process";
import {init_wget, resolve_http_url, FetchRequestState, fetch_url} from "./mod.js";
const saved_console=console;
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
	let req_url = resolve_http_url(cmd_argv[0]);
	let ok = init_wget(req_url);
	if(!ok) {
		console.log('init failed');
		exit(1);
	}
	let state = new FetchRequestState(req_url, {
		follow_redirects,
		no_repl,
	});
	fetch_url(state);
}
main();
