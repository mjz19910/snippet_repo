import {Primitives} from "./Primitives.js"
import {Box} from "../Box.js"

export type BoxExtractType=Primitives|Exclude<Box,Primitives|null>['value']|null
