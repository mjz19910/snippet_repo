// cspell:disable-next
const u="/youtubei/v1/att/get?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false";
if(u[0]==="/") {
	/** @type {any} */
	const b=u;
	/** @type {`/${string}?${string}`} */
	const x=b;
	/** @template {string} T @returns {import("../../../parse_url/UrlParse_ext.js").UrlParse_ext<T>} @arg {T} x */
	function create_from_parse_partial(x) {
		/** @type {any} */
		const a=x.split("?");
		/** @type {import("../../../make/Split.js").Split<T,"?">} */
		const fs=a;
		/** @template U @template {U} T @arg {U} e @returns {T} */
		function as_cast(e) {
			/** @type {any} */
			let x=e;
			return x;
		}
		return as_cast({
			whole_url: x,
			pathname: fs[0],
			search: `?${fs[1]}`,
		});
	}
	let pp=create_from_parse_partial(x);
	console.log(pp);
}
