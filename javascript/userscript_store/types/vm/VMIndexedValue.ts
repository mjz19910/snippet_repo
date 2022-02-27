import {VMIndexedValueRaw} from "./VMIndexedValueRaw";
import {Box} from "./Box";

export class VMIndexedValue extends Box<VMIndexedValueRaw> {
	type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "value" = "value";
}
