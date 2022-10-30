import {use_jquery} from "./use_jquery";

/**
 * @param {typeof $} value
 */
export function got_jquery(value) {
	Object.defineProperty(window, '$', {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
	use_jquery();
}
