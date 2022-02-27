import {IndexedObjectValue as IndexedObjectValue} from "./IndexedObjectValue";
import {IBoxImpl} from "./box/mod";

export class IndexedObject extends IBoxImpl<IndexedObjectValue> {
	type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "value" = "value";
}
