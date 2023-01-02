import {GlobalAttachWindow} from "./support/make/make_Window.js";
import {GlobalAttach_yt} from "./yt_json_types/make_yt.js";
import {GlobalAttach_ytcfg} from "./yt_json_types/make_ytcfg.js";

export type Attachments=[
	GlobalAttach_yt,
	GlobalAttachWindow,
	GlobalAttach_ytcfg,
];

declare global {
	interface Window {
		Polymer: {
			Class?: <T>(x: {}) => T;
		};
	}
}
declare global {
	interface URLSearchParams {
		[Symbol.iterator](): IterableIterator<[string,string]>;
		append(name: string,value: string): void;
		delete(name: string): void;
		entries(): IterableIterator<[string,string]>;
	}
}
declare global {
	interface IArguments extends Array<any> {}
}