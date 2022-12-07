import {Box} from "./Box.js"
import {FunctionBox_Value} from "./FunctionBox_Value.js"

type not_prim_or_null=Exclude<Box,{value:any}>;

export type FunctionBox_Value_never=Exclude<Box['value'],FunctionBox_Value>
