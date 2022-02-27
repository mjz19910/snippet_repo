import {IndexedObjectValue as IndexedObjectValue} from "./IndexedObjectValue";
import {Box} from "./Box";

export class IndexedObject extends Box<IndexedObjectValue> {
	type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "value" = "value";
}
