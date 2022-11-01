/** @type {<T extends {[K in keyof T]:T[K]}>(q:T)=>q is {[K in keyof T]:T[K]}} */
export function can_cast_indexed(q) {
	if(q)
		return true;
	return true;
}
