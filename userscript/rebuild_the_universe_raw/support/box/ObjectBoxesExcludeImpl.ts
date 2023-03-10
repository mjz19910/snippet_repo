import {Box} from "./Box.js";

export type ObjectBoxesExcludeImpl<T extends Box>=T extends infer I? Exclude<I,{value: {}|null;}>:never;
