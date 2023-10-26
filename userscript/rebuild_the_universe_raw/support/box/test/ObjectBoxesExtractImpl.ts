import {Box} from "../mod/Box.ts";
export type ObjectBoxesExtractImpl<T extends Box>=T extends infer I? Extract<I,{value: Record<never, never>|null;}>:never;