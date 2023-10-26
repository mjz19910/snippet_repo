import {DebugVarValue} from "./DebugVarValue.ts";
import {DebugNullValue} from "./DebugNullValue.ts";
import {DebugHiddenVarValue} from "./DebugHiddenVarValue.ts";

export class DebugInfoValue {
	valid=false;
	get(__v: string): DebugHiddenVarValue|DebugVarValue|DebugNullValue|null {
		return null;
	}
}
