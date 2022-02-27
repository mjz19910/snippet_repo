import {IndexedFnRaw as IndexedFnRaw} from "./IndexedFnRaw";
import {Box} from "./box/mod";

export class IndexedFnBox extends Box<IndexedFnRaw> {
	type: "object_box" = "object_box";
	extension: 'function' = 'function';
}
