import {IndexedFnRaw as IndexedFnRaw} from "../index_access/IndexedFnRaw";
import {BoxTemplate} from "./mod";

export class IndexedFnBox extends BoxTemplate<IndexedFnRaw> {
	type: "object_box" = "object_box";
	extension: 'function' = 'function';
}
