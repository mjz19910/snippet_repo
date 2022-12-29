import {UrlParseRes} from "../../url_parse/UrlParseRes.js";
import {protobuf} from "./protobuf.js";

export class UrlParseErr<T> {
	readonly _tag="ERROR";
	readonly parse="failed to parse url";
	constructor(public err_path: T) {}
}

type UrlParseImpl<T extends string>=T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer PathName}?${infer Search}`? UrlParseRes<T,Host,Protocol,Search,PathName>:never;

type UrlParse<T extends string>=UrlParseImpl<T> extends never? UrlParseErr<T>:UrlParseImpl<T>;
/** @template {string} T @arg {T} str @returns {UrlParse<T>} */
function create_from_parse<T extends string>(str: T): UrlParse<T> {
	let s=new URL(str);
	return s as UrlParse<T>;
}

type ParseParam<T extends string>=T extends `${infer U}=${infer C}`? {
	[V in U]: C;
}:T;
type ParseParamItem<T extends string>=T extends `${infer U}&${infer Z}`? ParseParam<U>&ParseParamItem<Z>:T extends `${infer U}`? ParseParam<U>:never;
type ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? ParseParamItem<V>:T extends `${infer X}`? ParseParamItem<X>:never;
function make_search_params<T extends string>(t: T): ParseUrlSearchParams<T> {
	let sp=new URLSearchParams(t);
	return Object.fromEntries(sp.entries()) as ParseUrlSearchParams<T>;
}
export async function delay_play_job() {
	const url=(await import("./secret.json",{assert: {type: "json"}})).default.secret_delay_play;
	const url_o=create_from_parse(url);
	let sp=make_search_params(url_o.search);
	const text=atob(sp.vm);
	let token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
	let root=await protobuf.load("../protobuf/params.proto");
	let DelayPlayVm=root.lookupType("DelayPlayVm");
	let message=DelayPlayVm.decode(token_binary);
	let obj=DelayPlayVm.toObject(message);
	for(let ent of Object.entries(sp)) {
		console.log(ent);
	}
	console.log(obj);
}
await delay_play_job();
