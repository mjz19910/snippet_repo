import {Box} from "typescript/box/Box.js"
import {Primitives} from "typescript/box/helper/Primitives.js"

export type BoxTypeKeys=Exclude<Box,Primitives|null>['type']
