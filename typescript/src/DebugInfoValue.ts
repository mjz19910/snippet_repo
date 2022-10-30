import {DebugVarBox} from "../box/DebugVarBox"
import {DebugNullBox} from "../box/DebugNullBox"
import {DebugHiddenVarBox} from "../box/DebugHiddenVarBox"

export class DebugInfoValue {
	valid=false;
	get(__v: string): DebugHiddenVarBox|DebugVarBox|DebugNullBox|null {
		return null
	}
}
