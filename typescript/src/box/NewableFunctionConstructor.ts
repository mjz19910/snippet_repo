import {Box} from "./Box.js"
import {FunctionInstance} from "./FunctionInstance.js"

export type NewableFunctionConstructor=new (...a: Box[]) => FunctionInstance
