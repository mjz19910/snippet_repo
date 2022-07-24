import {Box} from "./Box"
import {Primitives} from "./helper/Primitives"

export type FunctionBox_Value=Extract<Exclude<Box,Primitives|null>['value'],Function>
