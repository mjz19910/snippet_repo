import {Box} from "../Box"
import {Primitives} from "../helper/Primitives"
export function is_boxlike<T>(value: T|Exclude<Box,Primitives|null>): value is Exclude<Box,Primitives|null> {
	return 'type' in value
}
