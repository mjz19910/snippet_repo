declare global {
	interface Window {
		$?: JQueryStatic;
	}
}

export function use_jquery() {
	let jq=window.$;
	if(!jq)
		return;
	let res=jq('head');
	let r_proto=Object.getPrototypeOf(res);
	r_proto.lazyload=function() {};
	return jq;
}
interface JQueryStatic {
	(x: string): JQueryRes;
}
interface JQueryRes {}
