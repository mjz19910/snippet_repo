import {Box} from "typescript/box/Box"
import {Primitives} from "typescript/box/helper/Primitives"

export type BoxTypeKeys=Exclude<Box,Primitives|null>['type']
