import {SavedInstanceObject} from "./SavedInstanceObject";

declare global {
	type MetaTagForConstructor={
		type: "for_constructor";
		name: string;
		constructor_meta: new () => SavedInstanceObject;
	};
}
export {type MetaTagForConstructor}
