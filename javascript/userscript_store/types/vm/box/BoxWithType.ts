import {Box} from "./Box";
export type BoxWithType = Exclude<Box, Primitives | null>;
export default BoxWithType;
