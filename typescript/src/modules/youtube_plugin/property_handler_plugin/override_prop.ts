import {PropertyHandler} from "./PropertyHandler.js";

export function override_prop<X extends string,T extends {[U in X]: any}>(object: T,property: X,property_handler: PropertyHandler) {
	object[property];
	Object.defineProperty(object,property,property_handler);
}
