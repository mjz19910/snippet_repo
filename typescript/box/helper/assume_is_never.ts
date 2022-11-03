import {assert_type} from "./assert_type.js"

export function assume_is_never(value: never) {
	assert_type<never>(value)
	return false
}
