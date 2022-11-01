export function define_property_value(obj: any,name: PropertyKey,value: any,...props: any[]) {
	let [
		writable=true,
		enumerable=true,
		configurable=true
	]=props
	Object.defineProperty(obj,name,{
		value,
		writable,
		enumerable,
		configurable
	})
}
