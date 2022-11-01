import {ClassCallbackFunction} from "./ClassCallbackFunction.js"

export type DebugClassBox=[type:'class',callback:ClassCallbackFunction,constructor:new (...a: any[]) => {},args:any[]]
