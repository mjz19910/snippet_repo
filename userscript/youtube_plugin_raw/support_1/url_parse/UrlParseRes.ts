import {UrlParseResImpl} from "./UrlParseResImpl.js";

export type UrlParseRes<
	T extends string,
	Host extends string,
	Protocol extends string,
	Search extends string,
	PathName extends string>=UrlParseResImpl<T,Host,Protocol,Search,PathName>;
export type UrlParseResAny=UrlParseRes<string,string,string,string,string>;