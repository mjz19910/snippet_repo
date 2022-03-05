import {Box} from "types/box/mod";
import {Primitives} from "types/box/Primitives";
export type UnboxedObjects = Exclude<Box, Primitives|null>['value'];
