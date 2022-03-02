import BoxTemplate from "./BoxTemplate";

export default class ObjectBox extends BoxTemplate<"object_box", {}> {
	type: "object_box" = "object_box";
	extension=null;
	inner_type: 'unit' = 'unit';
}
