import {Box} from "../Box.js"
import {Primitives} from "./Primitives.js"

export type NonPrimitives<T extends Box>=Exclude<T,Primitives>
