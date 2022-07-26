export function has_property<T extends string,X extends {[F in T]:unknown}>(value: {},a: T): value is X {
	if(value.hasOwnProperty(a)) {
		return true
	}
	return true
}
