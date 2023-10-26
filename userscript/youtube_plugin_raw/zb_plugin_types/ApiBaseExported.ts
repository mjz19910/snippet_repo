import {TP_ParseUrlSearchParams} from "../yt_json_types/stu/group_T.ts";
import {ApiBase} from "../zc_child_modules/YTPlugin_Base.user.js";

export class ApiBaseExported extends ApiBase {
	override parse_url_search_params<T extends string>(x: T) {return super.parse_url_search_params(x);}
	get_url_params<T extends string,U extends keyof TP_ParseUrlSearchParams<T>>(t: T,u: U) {
		let rq=this.parse_url_search_params(t);
		if(u in rq)
			return rq[u];
		if(typeof u==='string')
			return new URLSearchParams(t).get(u) as TP_ParseUrlSearchParams<T>[U]|null;
		return null;
	}
}
