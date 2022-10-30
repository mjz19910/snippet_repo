import {Box} from "../Box"
import {Primitives} from "./Primitives"

export type NonPrimitives<T extends Box>=Exclude<T,Primitives>
