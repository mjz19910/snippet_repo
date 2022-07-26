import {PropertyHandler} from "./PropertyHandler"

export function override_prop(object: {},property: PropertyKey,property_handler: PropertyHandler) {
	Object.defineProperty(object,property,{
		get() {
			return property_handler.get()
		},
		set(value) {
			return property_handler.set(value)
		}
	})
}
