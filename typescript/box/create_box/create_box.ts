import { Box } from "../Box"
import { BoxExtractType } from "../helper/BoxExtractType"
import { create_box_from_object } from "./create_box_from_object"
import { create_box_from_function } from "./create_box_from_function"

export function create_box(value: BoxExtractType): Box {
	switch (typeof value) {
		case 'bigint': return value
		case 'boolean': return value
		case 'function': return create_box_from_function(value)
		case 'number': return value
		case 'object': return create_box_from_object(value)
		case 'string': return value
		case 'symbol': return value
		case 'undefined': return value
	}
}
