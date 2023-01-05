import {protobuf} from "./protobuf.js";
declare global {
	interface URLSearchParams {
		[Symbol.iterator](): IterableIterator<[string,string]>;
		append(name: string,value: string): void;
		delete(name: string): void;
		entries(): IterableIterator<[string,string]>;
	}
}
async function delay_play_job() {
	let root=await protobuf.load("../protobuf/params.proto");
	let DelayPlayVm=root.lookupType("DelayPlayVm");
	DelayPlayVm;
}
await delay_play_job();
