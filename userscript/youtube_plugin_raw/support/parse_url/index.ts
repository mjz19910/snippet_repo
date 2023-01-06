type ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {
	[V in U]: C;
}:T;
type ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`?
	ParseUrlValue<U>&ParseUrlItems<Z>:T extends `${infer U}`? ParseUrlValue<U>:never;
type ParseUrlSearchParams<T extends string>=T extends `?${infer V}`?ParseUrlItems<V>:T extends `${infer V}`? ParseUrlItems<V>:never;
function make_search_params<T extends string>(t: T) {
	let sp=new URLSearchParams(t);
	return Object.fromEntries(sp.entries()) as ParseUrlSearchParams<T>;
}
function split_string<X extends string,S extends string>(x: X,s: S=cast_as(",")): Split<X,string extends S? ",":S> {
	let r=x.split(s);
	return cast_as(r);
}
const url_pathname_parts_value: url_pathname_parts=vv.pathname.split("/") as url_pathname_parts;
let res_a=make_search_params(split_string(vv.search,"?")[1]);
res_a;