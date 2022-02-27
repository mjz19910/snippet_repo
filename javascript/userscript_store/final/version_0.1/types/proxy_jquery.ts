import {got_jquery} from "./got_jquery";

export function proxy_jquery() {
	let val: any;
	if(window.$) {
		let res = window.$('head');
		let r_proto = Object.getPrototypeOf(res);
		r_proto.lazyload = function(...a: any) {
			console.log('lazyload', ...a);
		};
		return;
	}
	Object.defineProperty(window, '$', {
		get() {
			if(val) {
				debugger;
			}
			return val;
		},
		set(value) {
			val = value;
			got_jquery(value);
			return true;
		},
		enumerable: true,
		configurable: true
	});
}
