/**@type {<T, X extends keyof T>(obj:{[V in keyof T]:T[V]}, key:X)=>{v:T[X]} | null} */
export function safe_get(obj, key) {
	let cur_proto = obj;
	let prop = null;
	while(cur_proto !== null && !prop) {
		prop = Object.getOwnPropertyDescriptor(cur_proto, key);
		cur_proto = Object.getPrototypeOf(cur_proto);
	}
	if(!prop)
		return null;
	if(!prop.value) {
		if(prop.get) {
			let res = prop.get.call(obj);
			return {
				v: res
			};
		} else if(prop.set) {
			console.log('ignored set only ownProperty');
			return null;
		} else {
			return null;
		}
	}
	return {
		v: prop.value
	};
}
