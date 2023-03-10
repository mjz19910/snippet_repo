import {Box} from "./Box.js";

export type ObjectBoxesExcludeImpl2<T extends Box,V_Exclude>=T extends infer I? Exclude<I,{value: V_Exclude;}>:never;
