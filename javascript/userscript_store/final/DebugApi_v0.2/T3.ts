import {KT6} from "./KT6";
import {MapAllKeys} from "./MapAllKeys";
import {MapAllValues} from "./MapAllValues";

export type T3<T extends number> = [MapAllKeys[KT6[T][0]], MapAllValues[KT6[T][0]] | null];
