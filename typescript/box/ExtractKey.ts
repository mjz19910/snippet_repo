import {Box} from "./Box.js"
import {VoidBox} from "./VoidBox.js"
import {Primitives} from "./helper/Primitives.js"

export type ExtractKey<T extends Box,U>=
	T extends Exclude<Box,Primitives|null>?
	U extends keyof Exclude<T,VoidBox>?
	Exclude<T,VoidBox>[U]:
	never:
	never
