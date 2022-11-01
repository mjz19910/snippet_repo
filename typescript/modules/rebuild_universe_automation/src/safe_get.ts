export function safe_get<T,X extends keyof T>(obj: {[V in keyof T]: T[V]},key: X): T[X]|null {
	let cur_proto=obj
	let prop=Object.getOwnPropertyDescriptor(cur_proto,key)
	while(!prop) {
		cur_proto=Object.getPrototypeOf(cur_proto)
		if(cur_proto===null) {
			break
		}
		prop=Object.getOwnPropertyDescriptor(cur_proto,key)
	}
	if(!prop)
		throw new Error("no property")
	if('value' in prop) {
		return prop.value
	} else {
		if(prop.get) {
			let res=prop.get.call(obj)
			return res
		} else if(prop.set) {
			console.log('ignored set only ownProperty')
			throw new Error("property with only a setter")
		} else {
			prop
			return null
		}
	}
}
