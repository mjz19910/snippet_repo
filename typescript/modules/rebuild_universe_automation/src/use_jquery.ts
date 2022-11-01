export function use_jquery() {
	let jq:typeof $=window.$
	if(!jq)
		return
	if(typeof jq!='function')
		return
	let res=jq('head')
	let r_proto=Object.getPrototypeOf(res)
	r_proto.lazyload=function() {}
	return jq
}
