import {BoxExtractType} from "../helper/BoxExtractType.js"

export type BoxExtractFunction=(this: BoxExtractType,...args: BoxExtractType[]) => BoxExtractType
