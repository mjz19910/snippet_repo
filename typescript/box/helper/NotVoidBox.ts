import {VoidBox} from "../VoidBox.js"
import {Primitives} from "./Primitives.js"

export type NotVoidBox<T>=Exclude<T,VoidBox|Primitives>
