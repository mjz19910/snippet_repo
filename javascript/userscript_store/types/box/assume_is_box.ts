import {Box} from "./Box";
import {Primitives} from "./Primitives";
export function assume_is_box<T>(_v: T | Exclude<Box, Primitives | null>): _v is Exclude<Box, Primitives | null> {
	return true;
}
