function get_url_params<T extends string,U extends keyof ParseUrlSearchParams<T>>(t: T,u: U): ParseUrlSearchParams<T>[U]|null {
	function make_search_params<T extends string>(t: T): ParseUrlSearchParams<T> {
		let sp=new URLSearchParams(t);
		return Object.fromEntries(sp.entries()) as ParseUrlSearchParams<T>;
	}
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
