import {Primitives} from "./Primitives";
import {Box} from "./Box";
export type BoxWithType = Exclude<Box, Primitives | null>;
