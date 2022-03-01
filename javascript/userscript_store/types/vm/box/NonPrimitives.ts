import Primitives from "../Primitives";
import {Box} from "./Box";

type NonPrimitives<T extends Box> = T extends null ? never : T extends Primitives ? never : T;

export default NonPrimitives;
