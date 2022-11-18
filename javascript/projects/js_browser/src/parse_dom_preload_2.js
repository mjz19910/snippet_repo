import * as path from "path";
import * as process from "process";

process.on('unhandledRejection',(/** @type {unknown} */ error) => {
	console.log('unhandled promise rejection',error);
});

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
}

try {
	await async_main();
	console.log("app promise done");
} catch(err) {
	console.log(err);
	throw err;
}
