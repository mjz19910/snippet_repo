import {ParseUrlParams} from "./ParseUrlParams.js";
import {make_search_params} from "./make_search_params.js";

export function get_url_params<T extends string,U extends keyof ParseUrlParams<T>>(t: T,u: U): ParseUrlParams<T>[U]|null {
	let rq=make_search_params(t);
	if(rq[u]!==void 0) {
		let v=rq[u];
		return v;
	};
	if(typeof u==='string') {
		let res=new URLSearchParams(t).get(u) as ParseUrlParams<T>[U]|null;
		return res;
	}
	return null;
}
