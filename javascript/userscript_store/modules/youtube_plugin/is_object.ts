export function is_object<X>(value: X): value is X&object {
	if(typeof value==='object')
		return true
	return false
}
