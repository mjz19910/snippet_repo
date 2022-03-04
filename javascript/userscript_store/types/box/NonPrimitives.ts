import Primitives from "./Primitives";
import {Box} from "./Box";
type NonPrimitives<T extends Box> = Exclude<T, Primitives>;
export default NonPrimitives;
