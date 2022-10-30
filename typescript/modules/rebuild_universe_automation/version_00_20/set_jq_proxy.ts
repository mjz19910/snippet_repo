import {got_jquery} from "./got_jquery"

export function set_jq_proxy(value: typeof $|undefined) {
	let s_value=value
	Object.defineProperty(window,'$',{
		get() {
			return s_value
		},
		set(value) {
			s_value=value
			got_jquery(value)
			return true
		},
		enumerable: true,
		configurable: true
	})
}
