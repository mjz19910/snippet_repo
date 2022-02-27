import {RegIdFunction} from "../RegIdFunction";
import {AnyFunction} from "./AnyFunction";

export function has_reg_id(v: AnyFunction): v is RegIdFunction {
	if(v.hasOwnProperty('reg_id')) {
		return true;
	}
	return false;
}
