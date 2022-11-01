/** @type {<T extends {[K in keyof T]:T[K]}>(a:T)=>a is {[K in keyof T]:T[K]}} */
export function can_cast_indexed(_v) {
	return true;
}
