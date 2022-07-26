import {Box} from "./Box"
import {FunctionInstance} from "./FunctionInstance"

export type NewableFunctionConstructor=new (...a: Box[]) => FunctionInstance
