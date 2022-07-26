import {assert_type} from "../helper/assert_type"

export function eat_never(value: never) {
	assert_type<never>(value)
	return false
}
