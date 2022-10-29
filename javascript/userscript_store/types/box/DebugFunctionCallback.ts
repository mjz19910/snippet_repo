import {DebugFunctionType} from "./DebugFunctionType"

export type DebugFunctionCallback=(tag: "function",function_: DebugFunctionType,obj: {},args: any[]) => {}
