import {CanUnpack} from "./CanUnpack";

export function has_property<Z, Q extends string>(_v: {}, _q: Q): _v is CanUnpack<Z, Q> {
	return true;
}
