import {Box} from "box/Box.js"
import {Primitives} from "box/helper/Primitives.js"

export type BoxTypeKeys=Exclude<Box,Primitives|null>['type']
