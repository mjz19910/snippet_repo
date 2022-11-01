import {Box} from "./Box.js"
import {NewableInstancePack} from "./NewableInstancePack"

export type FunctionBox_Value=
	typeof CSSStyleSheet|
	((...a: Box[]) => Box)|
	((...a: Box[]) => Promise<Box>)|
	NewableInstancePack<{}>|
	FunctionConstructor|
	Function
