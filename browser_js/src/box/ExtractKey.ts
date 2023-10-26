import {Box} from "./Box.ts"
import {VoidBox} from "./VoidBox.ts"
import {Primitives} from "./Primitives.ts"

export type ExtractKey<T extends Box,U>=
	T extends Exclude<Box,Primitives|null>?
	U extends keyof Exclude<T,VoidBox>?
	Exclude<T,VoidBox>[U]:
	never:
	never
