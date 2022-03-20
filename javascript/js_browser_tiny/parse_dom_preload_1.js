import process, {exit} from "process";
import {init_wget, fetch_url, FetchRequestState} from "./mod.js";
export function main() {
	process.on('unhandledRejection', error => {
		if(error instanceof Error) {
			console.log('unhandledRejection', error.message);
		} else {
			console.log('unhandledRejection', error);
		}
	});
	const req_url = "https://www.youtube.com/watch?v=8h-fqAnIn0A";
	let ok=init_wget(req_url);
	if(!ok) {
		console.log('init failed');
		exit(1);
	}
	let state=new FetchRequestState(req_url);
	fetch_url(state);
}
main();
