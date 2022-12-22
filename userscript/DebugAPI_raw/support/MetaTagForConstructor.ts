import {SavedInstanceObject} from "./SavedInstanceObject";

export type MetaTagForConstructor={
	_tag: "for_constructor";
	name: string;
	constructor_meta: new () => SavedInstanceObject;
};
declare global {
	type MetaTagForConstructor={
		_tag: "for_constructor";
		name: string;
		constructor_meta: new () => SavedInstanceObject;
	};
}