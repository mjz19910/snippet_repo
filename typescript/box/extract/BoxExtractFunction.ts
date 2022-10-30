import {BoxExtractType} from "../helper/BoxExtractType"

export type BoxExtractFunction=(this: BoxExtractType,...args: BoxExtractType[]) => BoxExtractType
