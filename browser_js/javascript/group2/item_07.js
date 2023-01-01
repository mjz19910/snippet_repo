/** @type {import("./item_types")['inject_api']} */
var inject_api;
x: {
	/** @template U @template {U} T @arg {U} e @returns {T} */
	function as_cast(e) {
		/** @type {any} */
		let x=e;
		return x;
	}
	if(typeof exports!=='object') {
		if(!("inject_api" in window)) throw new Error("Missing");
		inject_api=as_cast(window.inject_api);
		break x;
	};
	inject_api=require("./item_types").inject_api;
}
let element=inject_api.addEventListenerExt.object_ids[0].deref();
if(typeof exports==='object') {
	exports.element=element;
}