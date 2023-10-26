import {Box} from "../mod/Box.ts";

export type ObjectBoxesExcludeImpl<T extends Box>=
	T extends infer I
	? Exclude<I,{value: Record<never,never>|null;}>:never;
