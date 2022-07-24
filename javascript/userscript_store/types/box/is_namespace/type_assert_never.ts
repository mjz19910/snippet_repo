import {assert_type} from "../helper/assert_type"

export function type_assert_never<T>() {
	return assert_type<T&never>(null as never)
}
