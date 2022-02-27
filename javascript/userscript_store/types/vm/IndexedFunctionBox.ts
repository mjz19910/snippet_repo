import {VMIndexedCallableRaw} from "./VMIndexedCallableRaw";
import {Box} from "./Box";

export class IndexedFunctionBox extends Box<VMIndexedCallableRaw> {
	type: "object_box" = "object_box";
	extension: 'function' = 'function';
}
