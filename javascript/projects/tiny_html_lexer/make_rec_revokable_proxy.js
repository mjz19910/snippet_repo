import {any} from "./any";
/**
 * @param {{proxy:ObjectConstructor;revoke:()=>void}[]} proxy_list
 * @param {ObjectConstructor} value
 * @return {ObjectConstructor}
 */
export function make_rec_revokable_proxy(proxy_list,value) {
	let proxy=Proxy.revocable(value,new Proxy({
		get(a,b,c) {
			let ret=Reflect.apply(a,b,c)
			return make_rec_revokable_proxy(proxy_list,ret)
		}
	},{
		get(a,b) {
			if(any(a)[b])
				return any(a)[b]; console.log('handle',b)
		}
	}))
	proxy_list.push(proxy)
	return proxy.proxy
}
