import {UrlParse} from "./UrlParse";


export function clone_url_parse<T extends string>(v: UrlParse<T>) {
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
