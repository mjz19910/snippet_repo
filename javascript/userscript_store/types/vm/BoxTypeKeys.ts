import {Box} from "types/box/Box"
import {Primitives} from "types/box/helper/Primitives"

export type BoxTypeKeys=Exclude<Box,Primitives|null>['type']
