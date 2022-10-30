import {DebugVarBox} from "typescript/box/DebugVarBox"
import {DebugNullBox} from "typescript/box/DebugNullBox"
import {DebugHiddenVarBox} from "typescript/box/DebugHiddenVarBox"

export class DebugInfoValue {
	valid=false;
	get(__v: string): DebugHiddenVarBox|DebugVarBox|DebugNullBox|null {
		return null
	}
}
