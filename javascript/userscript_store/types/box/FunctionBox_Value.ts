import {Box} from "./Box"
import {assert_type} from "./helper/assert_type"
import {Primitives} from "./helper/Primitives"
import {NewableInstancePack} from "./NewableInstancePack"

export type FunctionBox_Value_never=Exclude<Extract<Exclude<Box,Primitives|null>['value'],Function>,FunctionBox_Value2>
const ok=assert_type<FunctionBox_Value_never&never>(null as never);
export type FunctionBox_Value=
	typeof CSSStyleSheet|
	((...a: Box[]) => Box)|
	((...a: Box[]) => Promise<Box>)|
	NewableInstancePack<{}>|
	FunctionConstructor|
	Function
