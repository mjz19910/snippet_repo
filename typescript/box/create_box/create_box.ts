import {Box} from "../Box.js";
import {BoxExtractType} from "../helper/BoxExtractType.js";
import {create_box_from_object} from "./create_box_from_object.js";
import {create_box_from_function} from "./create_box_from_function.js";

export function create_box(value: BoxExtractType): Box {
	switch(typeof value) {
		case 'bigint': return value;
		case 'boolean': return value;
		case 'function': return create_box_from_function(value);
		case 'number': return value;
		case 'object': return create_box_from_object(value);
		case 'string': return value;
		case 'symbol': return value;
		case 'undefined': return value;
	}
}
