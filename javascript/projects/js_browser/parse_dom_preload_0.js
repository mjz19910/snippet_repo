import fs from 'fs'
import path from "path"
import process from "process"
import {
	init_wget,
	wget_on_static_page_load
} from "./mod.js"
function main() {
	process.on('unhandledRejection',error => {
		console.log('unhandledRejection',error)
	})
	const req_file_path="./artifacts/google_mail_html.html"
	const abs_file_path=path.resolve(req_file_path)
	const req_url="file://"+abs_file_path
	let state=init_wget({
		url: req_url,
		no_repl: false,
	},req_url)
	fs.readFile(abs_file_path,(err,data) => {
		if(err) {
			console.log(err,data)
			process.exit(1)
		}
		wget_on_static_page_load(state,Uint8Array.from(data),req_url)
	})
}
main()
