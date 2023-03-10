import {Box} from "./Box.js";

export type ObjectBoxesExtractImpl<T extends Box>=T extends infer I? Extract<I,{value: {}|null;}>:never;
