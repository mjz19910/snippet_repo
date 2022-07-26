import {VoidBox} from "../VoidBox"
import {Primitives} from "./Primitives"

export type NotVoidBox<T>=Exclude<T,VoidBox|Primitives>
