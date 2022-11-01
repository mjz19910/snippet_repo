import {Box} from "./Box.js"
import {FunctionInstance} from "./FunctionInstance"

export type NewableFunctionConstructor=new (...a: Box[]) => FunctionInstance
