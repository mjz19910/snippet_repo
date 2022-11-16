import process from "process";
import {DomBadge} from "../browser_fake_dom/src/implementation/DomBadge.js";
import {PageLoaderState} from "../page_loader/index.js";
import {fetch_url} from "../page_loader/index.js";
import {init_wget} from "./mod.js"
import {PageLoadStateType} from "../browser_fake_dom/index.js";
export function main() {
	process.on('unhandledRejection',error => {
		if(error instanceof Error) {
			console.log('unhandledRejection',error.message)
		} else {
			console.log('unhandledRejection',error)
		}
	})
	const req_url="https://www.youtube.com/watch?v=8h-fqAnIn0A"
	let state=new PageLoadStateType();
	state.url=req_url;
	let ok=init_wget({
		url:req_url,
		dom_impl_badge: new DomBadge,
		no_repl: false,
	})
	if(!ok) {
		console.log('init failed')
		process.exit(1);
	}
	let state=new PageLoaderState(req_url)
	fetch_url(state)
}
main()
