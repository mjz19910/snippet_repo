import {IntInc} from "types/Tools";
import {KT5} from "./KT5";

export type AsSeqImpl<U, T> = T extends number ?
	U extends {[X in T]: any} ?
	U[T] extends void ?
	[] :
	T extends 0 ?
	[[T, U[T]], ...KT5<IntInc<T>>] :
	[[T, U[T]], ...KT5<IntInc<T>>] :
	[] :
	[];