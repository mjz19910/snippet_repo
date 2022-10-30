import {Box} from "./Box"
import {Primitives} from "./helper/Primitives"
import {FunctionBox_Value} from "./FunctionBox_Value"

export type FunctionBox_Value_never=Exclude<Extract<Exclude<Box,Primitives|null>['value'],Function>,FunctionBox_Value>
