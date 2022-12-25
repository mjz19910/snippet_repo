import {UrlParse} from "./UrlParse";
import {UrlParseErr} from "./UrlParseErr.js";


export function clone_url_parse<T extends string extends (infer U extends string) ? UrlParse<U> extends UrlParseErr<any>?never:T:never>(v: UrlParse<T>|UrlParseErr<T>) {
	if('_tag' in v) {
		if(v._tag==="ERROR")
			throw new Error("Failed");
		throw new Error("Unreachable");
	}
	let {
		hash,host,hostname,href,origin,password,path,pathname,port,protocol,search,searchParams,
	}=v;
	return {
		hash,host,hostname,href,origin,password,path,pathname,port,protocol,search,searchParams,
	};
}
