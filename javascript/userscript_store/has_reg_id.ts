import {AnyFunction, RegIdFunction} from "./rebuild_the_universe_auto_typed_v0.2";

export function has_reg_id(v: AnyFunction): v is RegIdFunction {
	if(v.hasOwnProperty('reg_id')) {
		return true;
	}
	return false;
}
