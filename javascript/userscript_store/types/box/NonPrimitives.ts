import {Primitives} from "./Primitives"
import {Box} from "./Box"
export type NonPrimitives<T extends Box>=Exclude<T,Primitives>
