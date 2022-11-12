import {DebugFunctionCallback} from "./DebugFunctionCallback.js"
import {DebugFunctionType} from "./DebugFunctionType.js"

export type DebugFunctionBox=[type:'function',callback:DebugFunctionCallback,function_:DebugFunctionType,obj:{},args:any[]]
