import * as process from "process";
import {PageLoaderState} from "../../page_loader/index.js";
import {fetch_url} from "../../page_loader/index.js";
import {fake, FakeWindow, handle_onPageLoadStarted} from "../../browser_fake_dom/index.js";
import {BaseBadge} from "./BaseBadge.js";
export function main() {
	process.on('unhandledRejection',error => {
		if(error instanceof Error) {
			console.log('unhandledRejection',error.message)
		} else {
			console.log('unhandledRejection',error)
		}
	})
	const req_url="https://www.youtube.com/watch?v=8h-fqAnIn0A"
	let state=new PageLoaderState(req_url);
	if(!fake.window) fake.window=new FakeWindow(new BaseBadge);
	state.page_load_state.dom_impl_badge=new BaseBadge;
	handle_onPageLoadStarted(fake.window,state);
	fetch_url(state)
}
main()
