import {Box} from "../mod/Box.ts";
import {FunctionBox_Value} from "./FunctionBox_Value.ts";

export type not_prim_or_null=Exclude<Box,{value: Record<never,never>|null|void;}>;
export type Equal<T,U extends T>=T&U;
export type R=Equal<never,not_prim_or_null>;
export const empty_const_for_test_0: Record<never,never>|R={};
export type FunctionBox_Value_never=Exclude<Box["value"],FunctionBox_Value>;
