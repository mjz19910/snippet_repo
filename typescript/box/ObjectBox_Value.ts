import {BoxExtractType} from "./helper/BoxExtractType"
import {Primitives} from "./helper/Primitives"

export type ObjectBox_Value=Exclude<BoxExtractType,Primitives|Function|undefined>
