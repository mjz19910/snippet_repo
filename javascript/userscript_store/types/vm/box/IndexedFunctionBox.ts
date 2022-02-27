import {IndexedFnRaw as IndexedFnRaw} from "../index_access/IndexedFnRaw";
import {Box} from "./mod";

export class IndexedFnBox extends Box<IndexedFnRaw> {
	type: "object_box" = "object_box";
	extension: 'function' = 'function';
}
