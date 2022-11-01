import {BoxExtractType} from "./helper/BoxExtractType.js";
import {Primitives} from "./helper/Primitives.js";

export type ObjectBox_Value=Exclude<BoxExtractType,Primitives|Function|undefined>;
