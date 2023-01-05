type ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {
	[V in U]: C;
}:T;
type ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`?
	ParseUrlValue<U>&ParseUrlItems<Z>:T extends `${infer U}`? ParseUrlValue<U>:never;
type ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? ParseUrlItems<V>:never;
function make_search_params<T extends string>(t: T) {
	let sp=new URLSearchParams(t);
	return Object.fromEntries(sp.entries()) as ParseUrlSearchParams<T>;
}
const {A}=AssertUrlParse;
//cspell:disable-next-line
const url_pathname_parts_value: url_pathname_parts=vv.pathname.split("/") as url_pathname_parts;
let res_a=make_search_params(vv.search);
let res_b: url2_long_vars_obj=res_a;
A.assert_equal(res_b,res_a);
