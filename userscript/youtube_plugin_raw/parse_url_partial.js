// cspell:disable-next
const u="/youtubei/v1/att/get?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false";
/** @template T @arg {any} e @returns {T} */
function any(e) {
	return e;
}
if(u[0]==="/") {
	/** @type {any} */
	const b=u;
	/** @type {`/${string}?${string}`} */
	const x=b;
	/** @template {string} T @returns {import("./parse_url/UrlParse_ext.js").UrlParse_ext<T>} @arg {T} x */
	function create_from_parse_partial(x) {
		/** @type {any} */
		const a=x.split("?");
		/** @type {import("./support/make/Split.js").Split<T,"?">} */
		const fs=a;
		return any({
			whole_url: x,
			pathname: fs[0],
			search: `?${fs[1]}`,
		});
	}
	let pp=create_from_parse_partial(x);
	console.log(pp);
}
