export function has_reg_id<T extends {}>(v: T): v is T&{reg_id: number} {
	if(v.hasOwnProperty('reg_id')) {
		return true
	}
	return false
}
