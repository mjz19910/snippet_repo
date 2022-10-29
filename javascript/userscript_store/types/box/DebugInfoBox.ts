import {DebugEvalLostBox as DebugEvalLostBox} from "./DebugEvalLostBox"
import {DebugNullBox as DebugNullBox} from "./DebugNullBox"
import {DebugVarBox as DebugVarBox} from "./DebugVarBox"

export type DebugInfoBox=DebugEvalLostBox|DebugVarBox|DebugNullBox
