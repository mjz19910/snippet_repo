import {DebugHiddenVarBox as DebugHiddenVarBox} from "./DebugHiddenVarBox"
import {DebugNullBox as DebugNullBox} from "./DebugNullBox"
import {DebugVarBox as DebugVarBox} from "./DebugVarBox"

export type DebugInfoBox=DebugHiddenVarBox|DebugVarBox|DebugNullBox
