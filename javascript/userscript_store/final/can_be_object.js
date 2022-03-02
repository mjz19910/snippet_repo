/**@type {<T extends {}>(o:T)=>o is T} */
export function can_be_object(v) {
	if(v === null) {
		return false;
	}
	if(typeof v === 'object') {
		return true;
	}
	return false;
}
