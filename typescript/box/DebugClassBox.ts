import {ClassCallbackFunction} from "./ClassCallbackFunction"

export type DebugClassBox=[type:'class',callback:ClassCallbackFunction,constructor:new (...a: any[]) => {},args:any[]]
