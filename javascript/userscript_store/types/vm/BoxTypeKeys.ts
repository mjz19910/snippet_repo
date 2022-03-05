import {Box} from "types/box/mod";
import {Primitives} from "types/box/Primitives";
export type BoxTypeKeys = Exclude<Box, Primitives|null>['type'];
