import {SavedInstancePrototype} from "./SavedInstancePrototype";

declare global {
	type MetaTagForPrototypeOf={
		type: "meta_for_prototype_of";
		name: string;
		prototype_meta: SavedInstancePrototype;
	};
}

export {type MetaTagForPrototypeOf};