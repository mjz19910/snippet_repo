import { Box } from "../Box"
import { is_array_of } from "./is_array_of"
import { is_box } from "./is_box"

export function is_array_of_box<T>(value: Box[] | T[]): value is Box[] {
	return is_array_of(value, function (inner_value): inner_value is Box {
		return is_box(inner_value)
	})
}
