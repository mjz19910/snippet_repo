import { BoxExtractType } from "./extract/BoxExtractType";
import { Primitives } from "./Primitives";

export type BoxWithObjectValue = Exclude<BoxExtractType, Primitives | Function | undefined>;
