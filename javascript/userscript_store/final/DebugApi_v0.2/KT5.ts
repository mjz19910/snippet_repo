import {IntInc} from "types/Tools";
import {MapAllKeys} from "./MapAllKeys";

export type KT5<T> = T extends number ? MapAllKeys[T] extends void ? [] : T extends 0 ? [[T, MapAllKeys[T]], ...KT5<IntInc<T>>] : [[T, MapAllKeys[T]], ...KT5<IntInc<T>>] : [];
