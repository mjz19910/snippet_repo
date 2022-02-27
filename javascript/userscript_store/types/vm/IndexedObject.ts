import {IndexedObjectValue as IndexedObjectValue} from "./IndexedObjectValue";
import {Box} from "./box/mod";

export class IndexedObject extends Box<IndexedObjectValue> {
	type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "value" = "value";
}
