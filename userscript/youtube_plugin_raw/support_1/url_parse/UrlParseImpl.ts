import {UrlParseRes} from "./UrlParseRes.ts";
import {UrlParseRes_noSearch} from "./UrlParseRes_noSearch.ts";

export type UrlParseImpl<T extends string>=
	T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer PathName}?${infer Search}`?
	UrlParseRes<T,Host,Protocol,Search,PathName>:
	T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer PathName}`?
	UrlParseRes_noSearch<T,Host,Protocol,PathName>:
	T extends `${infer Protocol extends `${string}:`}//${infer Host}?${infer Search}`?
	UrlParseRes<T,Host,Protocol,Search,"">:
	T extends `${infer Protocol extends `${string}:`}//${infer Host}`?
	UrlParseRes_noSearch<T,Host,Protocol,"">:never;
;
