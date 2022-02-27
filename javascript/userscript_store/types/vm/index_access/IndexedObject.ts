import {Box} from "../box/mod";
import {IndexedObjectValue} from "./IndexedObjectValue";

export class IndexedObject extends Box<IndexedObjectValue> {
	type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "value" = "value";
}
