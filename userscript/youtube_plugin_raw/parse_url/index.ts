import {Split} from "../support/make/Split.js";
import {ParseUrlSearchParams} from "../support/search_params_parse/SearchParamsParse.js";
import {Decay} from "../support/yt_api/exact_data/Decay.js";
import {RemoveFirst} from "./RemoveFirst";
import {URLSearchParams} from "./URLSearchParams";

type UrlParseResFor2<
	T extends string,
	Search extends string,
	Pathname extends string>={
		whole_url:T;
		pathname: Pathname;
		search: `?${Search}`;
	};
type UrlParseRes_2<T extends string,Search extends string,Pathname extends string>=UrlParseResFor2<T,Search,Pathname>;
export type UrlParse_ext<T extends string>=T extends `${infer Pathname}?${infer Search}`? UrlParseRes_2<T,Search,Pathname>:never;
function create_from_parse_partial<T extends string>(x: T): UrlParse_ext<T> {
	type St=Split<T,"?">;
	const fs: St=x.split("?") as St;
	return {
		whole_url: x,
		pathname: fs[0],
		search: `?${fs[1]}`,
	} as UrlParse_ext<T>;
}
//cspell:disable-next-line
const url2="/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false";
export const vv=create_from_parse_partial(url2);
vv.pathname.split("/");
type Pt=RemoveFirst<Split<typeof vv.pathname,"/">>;
export const pt: Pt=vv.pathname.split("/") as Pt;
export function make_search_params<T extends string>(t: T) {
	let sp=new URLSearchParams(t);
	return Object.fromEntries(sp.entries()) as ParseUrlSearchParams<T>;
}
export type upx=Decay<ParseUrlSearchParams<typeof vv['search']>>
export let res_a=make_search_params(vv.search);
type VV={
	key: typeof res_a.key;
	prettyPrint: typeof res_a.prettyPrint;
}
export let res_b:VV=res_a;
res_a=res_b;
res_b=res_a;
