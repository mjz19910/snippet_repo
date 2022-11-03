import {Box} from "./Box.js"
import {Primitives} from "./Primitives.js"
import {FunctionBox_Value} from "./FunctionBox_Value.js"

type not_prim_or_null=Exclude<Box,Primitives|null>;

export type FunctionBox_Value_never=Exclude<not_prim_or_null['value'],FunctionBox_Value>
