import {Box} from "../Box"
import {Primitives} from "../helper/Primitives"
export function assume_is_box<T>(value: T | Exclude<Box, Primitives | null>): value is Exclude<Box, Primitives | null> {
	return 'type' in value;
}
