import {SavedInstancePrototype} from "./SavedInstancePrototype";

export type MetaTagForPrototypeOf={
	_tag: "meta_for_prototype_of";
	name: string;
	prototype_meta: SavedInstancePrototype;
};
declare global {
	type MetaTagForPrototypeOf={
		_tag: "meta_for_prototype_of";
		name: string;
		prototype_meta: SavedInstancePrototype;
	};
}
