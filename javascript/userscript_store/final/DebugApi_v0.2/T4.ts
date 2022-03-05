import {IntInc} from "types/Tools";
import {T3} from "./T3";

export type T4<T extends number> = T3<T> extends [string, any] ? [T3<T>, ...T4<IntInc<T>>] : [];
