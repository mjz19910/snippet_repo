import {ParseUrlParams} from "./ParseUrlParams.js";

export function make_search_params<T extends string>(t: T) {
	let sp=new URLSearchParams(t);
	return Object.fromEntries(sp.entries()) as ParseUrlParams<T>;
}
