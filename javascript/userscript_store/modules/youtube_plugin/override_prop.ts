import {PropertyHandler} from "./PropertyHandler"

/**
 * @arg {{}} object
 * @param {PropertyKey} property
 * @param {PropertyHandler} property_handler
 */
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
