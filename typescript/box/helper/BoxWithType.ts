import {Primitives} from "./Primitives.js"
import {Box} from "../Box.js"
export type BoxWithType=Exclude<Box,Primitives|null>
