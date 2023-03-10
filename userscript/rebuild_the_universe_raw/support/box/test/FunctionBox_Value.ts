import {Box} from "../mod/Box.js"
import {NewableInstancePack} from "../interface/NewableInstancePack.js"

export type FunctionBox_Value=
	typeof CSSStyleSheet|
	((...a: Box[]) => Box)|
	((...a: Box[]) => Promise<Box>)|
	NewableInstancePack<{}>|
	FunctionConstructor|
	Function
