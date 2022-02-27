import {BoxTemplate} from "../box/mod";
import {IndexRaw} from "./IndexRaw";

export class IndexBox extends BoxTemplate<IndexRaw> {
	type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "value" = "value";
}
