import {ParseUrlParams} from "../search_params/ParseUrlParams.js";

export function get_url_params<T extends string,K extends Extract<keyof ParseUrlParams<T>,string>>(v: T,k: K): ParseUrlParams<T>[K]|null {
	let res=new URLSearchParams(v).get(k) as ParseUrlParams<T>[K]|null;
	return res;
}
