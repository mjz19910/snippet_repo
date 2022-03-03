import {UnboxType} from "./AsyncFunctionBox";


export type UnboxTypeFunction = (this: UnboxType, ...args: UnboxType[]) => UnboxType;
