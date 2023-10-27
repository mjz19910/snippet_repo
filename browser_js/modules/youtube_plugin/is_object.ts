// deno-lint-ignore ban-types
export function is_object<X>(value: X): value is (X&object)|(X&null) {
	if(typeof value==='object') return true
	return false
}
