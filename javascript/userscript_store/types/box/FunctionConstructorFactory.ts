import {Box} from "./Box"
import {FunctionBox} from "./FunctionBox"
import {FunctionInstance} from "./FunctionInstance"

export type NewableFunctionConstructor=new (...a: Box[]) => FunctionInstance

export type FunctionConstructorFactory=(box_value: NewableFunctionConstructor) => FunctionBox
