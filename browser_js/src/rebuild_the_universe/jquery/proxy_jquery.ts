import {got_jquery} from "./got_jquery.ts"
import {use_jquery} from "./use_jquery.ts"

export function proxy_jquery() {
	let val=use_jquery()
	Object.defineProperty(window,'$',{
		get() {
			return val
		},
		set(value) {
			val=value
			got_jquery(value)
			return true
		},
		enumerable: true,
		configurable: true
	})
}
