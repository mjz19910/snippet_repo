import {Box} from "./Box"
import {Primitives} from "./helper/Primitives"

export type UnboxedObjects = Exclude<Box, Primitives|null>['value']
