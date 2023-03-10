import {Box} from "./box/mod/Box.js";
import {VoidBox_ForUndefined} from "./box/mod/VoidBox_ForUndefined.js";
import {Primitives} from "./Primitives.js";

export type ExtractKey<T extends Box,U>=
	T extends Exclude<Box,Primitives|null>?
	U extends keyof Exclude<T,VoidBox_ForUndefined>?
	Exclude<T,VoidBox_ForUndefined>[U]:
	never:
	never
	;
;
