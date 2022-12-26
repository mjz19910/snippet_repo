import {UrlParseOpt} from "./UrlParse.js";
import {UrlParseErr} from "./UrlParseErr.js";


export function clone_url_parse<T extends string extends (infer U extends string)? UrlParseOpt<U> extends {}? U:never:never>(v: UrlParseOpt<T>) {
	let c: UrlParseOpt<T>|UrlParseErr<T>=v;
	if('_tag' in c) {
		let {_tag,err_path,parse}=c;
		return {_tag,err_path,parse};
	}
	let {
		hash,host,hostname,href,origin,password,pathname,port,protocol,search,/*grep-skip*/searchParams,
	}=c;
	let path;
	if('path' in c) {
		path=c.path;
		return {
			hash,host,hostname,href,origin,password,path,pathname,port,protocol,search,/*grep-skip*/searchParams,
		};
	}
	return {
		hash,host,hostname,href,origin,password,pathname,port,protocol,search,/*grep-skip*/searchParams,
	};
}
