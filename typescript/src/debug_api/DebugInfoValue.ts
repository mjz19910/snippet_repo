import {DebugVarValue} from "./DebugVarValue.js";
import {DebugNullValue} from "./DebugNullValue.js";
import {DebugHiddenVarValue} from "./DebugHiddenVarValue.js";

export class DebugInfoValue {
	valid=false;
	get(__v: string): DebugHiddenVarValue|DebugVarValue|DebugNullValue|null {
		return null;
	}
}
