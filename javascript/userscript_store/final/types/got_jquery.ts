import {define_property_value} from "./define_property_value";

export function got_jquery(jquery_func: (arg0: string) => any) {
	define_property_value(window, '$', jquery_func);
	let res = jquery_func('head');
	let r_proto = Object.getPrototypeOf(res);
	//cspell:words lazyload
	r_proto.lazyload = function(...a: any) {
		console.log('lazyload', ...a);
	};
	return jquery_func;
}
