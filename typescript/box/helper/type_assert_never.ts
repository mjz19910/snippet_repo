import {assert_type} from "./assert_type.js"
import {never_value} from "./never_value.js"

export function type_assert_never<T>() {
	return assert_type<T&never>(never_value())
}
