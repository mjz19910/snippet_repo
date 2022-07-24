import {FnArgsObj} from "./FnArgsObj"

export type FunctionCallbackArgs=['function',(this: FnArgsObj[1],...a: FnArgsObj[2]) => any,FnArgsObj]
