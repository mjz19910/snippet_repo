import process,{exit} from "process"
import {fetch_url} from "../page_loader/fetch_url.js"
import {FetchRequestState} from "../page_loader/mod.js"
import {init_wget} from "./mod.js"
export function main() {
	process.on('unhandledRejection',error => {
		if(error instanceof Error) {
			console.log('unhandledRejection',error.message)
		} else {
			console.log('unhandledRejection',error)
		}
	})
	const req_url="https://www.youtube.com/watch?v=8h-fqAnIn0A"
	let ok=init_wget({
		no_repl: false,
	},req_url)
	if(!ok) {
		console.log('init failed')
		exit(1)
	}
	let state=new FetchRequestState(req_url)
	fetch_url(state)
}
main()
