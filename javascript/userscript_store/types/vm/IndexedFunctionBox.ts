import {IndexedFnRaw as IndexedFnRaw} from "./index_access/IndexedFnRaw";
import {IBoxImpl} from "./box/mod";

export class IndexedFnBox extends IBoxImpl<IndexedFnRaw> {
	type: "object_box" = "object_box";
	extension: 'function' = 'function';
}
