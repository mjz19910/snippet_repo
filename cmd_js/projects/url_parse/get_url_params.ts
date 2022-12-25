import {ParseUrlParams} from "../search_params/ParseUrlParams.js";

export function get_url_params<T extends string,U extends Extract<keyof ParseUrlParams<T>,string>>(t: T,u: U): ParseUrlParams<T>[U]|null {
	let res=new URLSearchParams(t).get(u) as ParseUrlParams<T>[U]|null;
	return res;
}
