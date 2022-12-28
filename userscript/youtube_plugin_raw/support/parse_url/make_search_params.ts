import {ParseUrlSearchParams} from "../search_params_parse/SearchParamsParse.js";
import {URLSearchParams} from "./URLSearchParams";

export function make_search_params<T extends string>(t: T) {
	let sp=new URLSearchParams(t);
	return Object.fromEntries(sp.entries()) as ParseUrlSearchParams<T>;
}
