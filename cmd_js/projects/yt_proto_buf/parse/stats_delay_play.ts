export class UrlParseErr<T> {
	readonly _tag="ERROR";
	readonly parse="failed to parse url";
	constructor(public err_path: T) {}
}

type UrlParseImpl<T extends string>=T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer PathName}?${infer Search}`? UrlParseRes<T,Host,Protocol,Search,PathName>:never;

type UrlParse<T extends string>=UrlParseImpl<T> extends never? UrlParseErr<T>:UrlParseImpl<T>;
/** @template {string} T @arg {T} str @returns {UrlParse<T>} */
function create_from_parse<T extends string>(str:T): UrlParse<T> {
	let s=new URL(str);
	return s as UrlParse<T>;
}
async function job() {
	const url=import("./secret.json");
	type url_t=typeof url;
	const url_o=create_from_parse(url);
}
