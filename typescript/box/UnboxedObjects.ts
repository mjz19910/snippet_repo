import {Box} from "./Box.js"
import {Primitives} from "./Primitives.js"

export type UnboxedObjects=Exclude<Box,Primitives|null>['value']
