import {DebugVarValue} from "./DebugVarBox.js";
import {DebugNullBox} from "./DebugNullBox.js";
import {DebugHiddenVarBox} from "./DebugHiddenVarBox.js";

export class DebugInfoValue {
	valid=false;
	get(__v: string): DebugHiddenVarBox|DebugVarValue|DebugNullBox|null {
		return null;
	}
}
