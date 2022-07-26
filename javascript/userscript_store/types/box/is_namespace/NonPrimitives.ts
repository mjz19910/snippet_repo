import {Box} from "../Box"
import {Primitives} from "../helper/Primitives"

export type NonPrimitives<T extends Box>=Exclude<T,Primitives>
