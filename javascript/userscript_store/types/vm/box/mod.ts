import {NonNull} from "types/api";
import Primitives from "../Primitives";
import Box from "./Box";

export {Box};

type NonNullBox=NonNull<Box>;

export type AsObject<T extends NonNullBox>=T extends Primitives ? never : T extends {value:{}} ? T['value'] : T;
