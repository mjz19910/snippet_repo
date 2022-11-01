import {Primitives} from "typescript/box/helper/Primitives.js";

export type Range<T extends object,I>=T extends 0? [0,I]:Range<T,I>;
type t2=Primitives;