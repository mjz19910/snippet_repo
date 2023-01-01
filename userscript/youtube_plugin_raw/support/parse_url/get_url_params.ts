function get_url_params<T extends string,U extends keyof ParseUrlSearchParams<T>>(t: T,u: U): ParseUrlSearchParams<T>[U]|null {
	let rq=make_search_params(t);
	if(rq[u]!==void 0) {
		let v=rq[u];
		return v;
	};
	if(typeof u==='string') {
		let res=new URLSearchParams(t).get(u) as ParseUrlSearchParams<T>[U]|null;
		return res;
	}
	return null;
}
