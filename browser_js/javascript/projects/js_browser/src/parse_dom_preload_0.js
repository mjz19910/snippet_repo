import * as fs from 'fs';
import * as path from "path";
import * as process from "process";

function main() {
	process.on('unhandledRejection',error => {
		console.log('unhandledRejection',error);
	});
	const req_file_path="./artifacts/google_mail_html.html";
	const abs_file_path=path.resolve(req_file_path);
	fs.readFile(abs_file_path,(err,data) => {
		if(err) {
			console.log(err,data);
			process.exit(1);
		}
	});
}

main();
