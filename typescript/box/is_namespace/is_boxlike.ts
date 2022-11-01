import {Box} from "../Box.js"
import {Primitives} from "../helper/Primitives.js"

export function is_boxlike<T>(value: T|Exclude<Box,Primitives|null>): value is Exclude<Box,Primitives|null> {
	return 'type' in value
}
