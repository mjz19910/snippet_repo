import {Primitives} from "./Primitives"
import {VoidBox} from "./VoidBox"
export type NotVoidBox<T>=Exclude<T,Primitives|VoidBox>
