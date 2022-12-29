import {GlobalAttachWindow} from "./support/make/make_Window.js";
import {GlobalAttach_yt} from "./support/make/make_yt.js";
import {GlobalAttach_ytcfg} from "./support/make/make_ytcfg.js";
import {__ia_excludeKeysS} from "./support/make/__ia_excludeKeysS";

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
		/**
		 * Append a new name-value pair to the query string.
		 */
		append(name: string,value: string): void;
		/**
		 * Remove all name-value pairs whose name is `name`.
		 */
		delete(name: string): void;
		/**
		 * Returns an ES6 `Iterator` over each of the name-value pairs in the query.
		 * Each item of the iterator is a JavaScript `Array`. The first item of the `Array`is the `name`, the second item of the `Array` is the `value`.
		 *
		 * Alias for `urlSearchParams[@@iterator]()`.
		 */
		entries(): IterableIterator<[string,string]>;
	}
}