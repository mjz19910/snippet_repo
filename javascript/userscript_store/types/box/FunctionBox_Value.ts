import {Box} from "./Box"
import {Primitives} from "./helper/Primitives"
import {NewableInstancePack} from "./NewableInstancePack"

export type FunctionBox_Value_never=Exclude<Extract<Exclude<Box,Primitives|null>['value'],Function>,FunctionBox_Value>
export type FunctionBox_Value=
	typeof CSSStyleSheet|
	((...a: Box[]) => Box)|
	((...a: Box[]) => Promise<Box>)|
	NewableInstancePack<{}>|
	FunctionConstructor|
	Function
