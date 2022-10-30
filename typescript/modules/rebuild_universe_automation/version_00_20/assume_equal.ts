export function assume_equal<T,U extends T>(_v: T,_q?: U): _v is U {
	return true
}
