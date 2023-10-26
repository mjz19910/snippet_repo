import {Box} from "../mod/Box.ts";

export type ObjectBoxesExcludeImpl2<T extends Box,V_Exclude>=T extends infer I? Exclude<I,{value: V_Exclude;}>:never;
