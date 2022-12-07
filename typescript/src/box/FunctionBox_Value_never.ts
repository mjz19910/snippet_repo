import {Box} from "./Box.js"
import {FunctionBox_Value} from "./FunctionBox_Value.js"
import {NewableFunctionBox} from "./NewableFunctionBox.js";

type not_prim_or_null=Exclude<Box,{value:{}|{}|null|void}>;
type xx=NewableFunctionBox;

export type FunctionBox_Value_never=Exclude<Box['value'],FunctionBox_Value>
