type TP_ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {
	[V in U]: C;
}:T;
type TP_ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`?
	TP_ParseUrlValue<U>&TP_ParseUrlItems<Z>:T extends `${infer U}`? TP_ParseUrlValue<U>:never;
type TP_ParseUrlSearchParams<T extends string>=T extends `?${infer V}`?TP_ParseUrlItems<V>:T extends `${infer V}`? TP_ParseUrlItems<V>:never;
function do_parse_url_search_params<T extends string>(t: T) {
	let sp=new URLSearchParams(t);
	return Object.fromEntries(sp.entries()) as TP_ParseUrlSearchParams<T>;
}
function split_string<X extends string,S extends string>(x: X,s: S=cast_objects.as(",")): T_Split<X,string extends S? ",":S> {
	let r=x.split(s);
	const {as}=cast_objects;
	return as(r);
}