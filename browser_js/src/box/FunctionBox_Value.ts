import {Box} from "./Box.ts"
import {NewableInstancePack} from "./NewableInstancePack.ts"

export type FunctionBox_Value=
	typeof CSSStyleSheet|
	((...a: Box[]) => Box)|
	((...a: Box[]) => Promise<Box>)|
	NewableInstancePack<{}>|
	FunctionConstructor|
	Function
