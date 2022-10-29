import {DebugVarBox} from "types/box/DebugVarBox"
import {DebugNullBox} from "types/box/DebugNullBox"
import {DebugHiddenVarBox} from "types/box/DebugHiddenVarBox"

export class DebugInfoValue {
	valid=false;
	get(__v: string): DebugHiddenVarBox|DebugVarBox|DebugNullBox|null {
		return null
	}
}
