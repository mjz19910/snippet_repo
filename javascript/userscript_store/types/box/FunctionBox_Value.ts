import {Box} from "./Box"
import {Primitives} from "./helper/Primitives"
import {type_assert_never} from "./is_namespace/type_assert_never"
import {NewableInstancePack} from "./NewableInstancePack"

export type FunctionBox_Value_never=Exclude<Extract<Exclude<Box,Primitives|null>['value'],Function>,FunctionBox_Value>
const ok=type_assert_never<FunctionBox_Value_never>();
export type FunctionBox_Value=
	typeof CSSStyleSheet|
	((...a: Box[]) => Box)|
	((...a: Box[]) => Promise<Box>)|
	NewableInstancePack<{}>|
	FunctionConstructor|
	Function
