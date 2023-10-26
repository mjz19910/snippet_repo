import {Box} from "../mod/Box.ts";

export type ObjectBoxesExtractImpl2<T extends Box,V_Extract>=T extends infer I? Extract<I,{value: V_Extract;}>:never;
