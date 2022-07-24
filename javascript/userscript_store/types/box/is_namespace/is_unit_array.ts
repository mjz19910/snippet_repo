export function is_unit_array<T extends any[]>(value: []|T): value is [] {
	if(value.length===0) return true
	return false
}
