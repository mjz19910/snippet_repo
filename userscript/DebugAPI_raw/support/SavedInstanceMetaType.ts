import {SavedInstancePrototype} from "./SavedInstancePrototype";
import {SavedInstanceObject} from "./SavedInstanceObject";

export type SavedInstanceMetaType={
	_tag: "any_from_prototype_of";
	name: string;
	prototype_meta: SavedInstancePrototype;
}|{
	_tag: "constructor";
	name: string;
	constructor_meta: new () => SavedInstanceObject;
};
