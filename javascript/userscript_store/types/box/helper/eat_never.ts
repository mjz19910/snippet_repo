import {assert_type} from "./assert_type"

export function eat_never(value: never) {
	assert_type<never>(value)
	return false
}
