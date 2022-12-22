import {SavedInstanceObject} from "./SavedInstanceObject";

export type MetaTagForConstructor={
	_tag: "constructor";
	name: string;
	constructor_meta: new () => SavedInstanceObject;
};
