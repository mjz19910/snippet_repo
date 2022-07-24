import { BoxExtractType } from "./extract/create_box/BoxExtractType";
import { Primitives } from "./Primitives";

export type ObjectBox_Value = Exclude<BoxExtractType, Primitives | Function | undefined>;
