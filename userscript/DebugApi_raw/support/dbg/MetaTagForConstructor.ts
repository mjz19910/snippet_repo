import {SavedInstanceObject} from "./SavedInstanceObject.ts";
export type MetaTagForConstructor={
	type: "for_constructor";
	name: string;
	constructor_meta: new () => SavedInstanceObject;
};