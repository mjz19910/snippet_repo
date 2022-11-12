import {DebugVarBox} from "./box/DebugVarBox.js"
import {DebugNullBox} from "./box/DebugNullBox.js"
import {DebugHiddenVarBox} from "./box/DebugHiddenVarBox.js"

export class DebugInfoValue {
	valid=false;
	get(__v: string): DebugHiddenVarBox|DebugVarBox|DebugNullBox|null {
		return null
	}
}
