import BoxTemplate from "./BoxTemplate";

export default class ObjectBox extends BoxTemplate<{}> {
	type: "object_box" = "object_box";
	extension=null;
	inner_type: 'unit' = 'unit';
}
