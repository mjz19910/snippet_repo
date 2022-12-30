import {Box} from "./Box.js"
import {FunctionBox_Value} from "./FunctionBox_Value.js"

type not_prim_or_null=Exclude<Box,{value:{}|null|void}>;
type Equal<T,U extends T>=T&U;
type R=Equal<never,not_prim_or_null>;
export const empty_const_for_test_0:{}|R={};

export type FunctionBox_Value_never=Exclude<Box["value"],FunctionBox_Value>
