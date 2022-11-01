import {DebugHiddenVarBox} from "./DebugHiddenVarBox.js"
import {DebugNullBox} from "./DebugNullBox.js"
import {DebugVarBox} from "./DebugVarBox.js"

export type DebugInfoBox=DebugHiddenVarBox|DebugVarBox|DebugNullBox
