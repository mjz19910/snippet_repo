import {DebugFunctionCallback} from "./DebugFunctionCallback"
import {DebugFunctionType} from "./DebugFunctionType"

export type DebugFunctionBox=[type:'function',callback:DebugFunctionCallback,function_:DebugFunctionType,obj:{},args:any[]]
