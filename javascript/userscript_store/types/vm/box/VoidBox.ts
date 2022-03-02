import BoxInterface from "./BoxInterface";

export default class VoidBox implements BoxInterface {
	type: "void" = "void";
	value: null = null;
	as_type(_x:'function'|'object') {
		return null;
	}
}
