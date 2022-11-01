/** @type {<T extends U,U>(o:U, t:T)=>o is T} */
export function can_be_object(v,_t) {
	if(v===null) {
		return false;
	}
	if(typeof v==='object') {
		return true;
	}
	return false;
}
