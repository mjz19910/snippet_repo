import {use_jquery} from "./use_jquery"

export function got_jquery(value: any) {
	Object.defineProperty(window, '$', {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	})
	use_jquery()
}
