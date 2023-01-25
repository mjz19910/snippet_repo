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
function split_string<X extends string,S extends string>(x: X,s: S=cast_objects.as(",")): T_Split<X,string extends S? ",":S> {
	let r=x.split(s);
	const {as}=cast_objects;
	return as(r);
}