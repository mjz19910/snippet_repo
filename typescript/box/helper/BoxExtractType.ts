import {Primitives} from "./Primitives"
import {Box} from "../Box"

export type BoxExtractType=Primitives|Exclude<Box,Primitives|null>['value']|null
