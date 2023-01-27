function get_url_params<T extends string,U extends keyof TP_ParseUrlSearchParams<T>>(t: T,u: U): TP_ParseUrlSearchParams<T>[U]|null {
	function make_search_params<T extends string>(t: T): TP_ParseUrlSearchParams<T> {
		let sp=new URLSearchParams(t);
		return Object.fromEntries(sp.entries()) as TP_ParseUrlSearchParams<T>;
	}
	let rq=make_search_params(t);
	if(rq[u]!==void 0) {
		let v=rq[u];
		return v;
	};
	if(typeof u==='string') {
		let res=new URLSearchParams(t).get(u) as TP_ParseUrlSearchParams<T>[U]|null;
		return res;
	}
	return null;
}
