import { BoxExtractType } from "./extract/BoxExtractType";
import { Primitives } from "./Primitives";

export type ObjectBox_Value = Exclude<BoxExtractType, Primitives | Function | undefined>;
