import {NonNull} from "types/api";
import Primitives from "../Primitives";
import Box from "./Box";

export {Box};
export type ExtractKey<T extends NonNull<Box>, U>=
T extends Primitives ? never :
T extends string ? never :
U extends keyof T ? T[U] : never;
