import process from "process";
import {PageLoaderState} from "../../page_loader/index.js";
import {fetch_url} from "../../page_loader/index.js";
import {fake, FakeWindow, handle_onPageLoadStarted, PageLoadStateType} from "../../browser_fake_dom/index.js";
import {DomBadge} from "../../browser_fake_dom/src/implementation/DomBadge.js";
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
	if(!fake.window) fake.window=new FakeWindow(new DomBadge);
	handle_onPageLoadStarted(fake.window,state);
	fetch_url(state)
}
main()
