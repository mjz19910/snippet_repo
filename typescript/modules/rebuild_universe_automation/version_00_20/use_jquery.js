export function use_jquery() {
	/**@type {typeof $} */
	let jq = window.$;
	if(!jq)
		return;
	if(typeof jq != 'function')
		return;
	let res = jq('head');
	let r_proto = Object.getPrototypeOf(res);
	r_proto.lazyload = function(/** @type {any} */ ..._a) {};
	return jq;
}
