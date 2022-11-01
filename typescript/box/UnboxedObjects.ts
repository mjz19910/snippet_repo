import {Box} from "./Box.js"
import {Primitives} from "./helper/Primitives"

export type UnboxedObjects=Exclude<Box,Primitives|null>['value']
