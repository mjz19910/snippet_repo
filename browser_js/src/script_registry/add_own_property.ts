export function add_own_property<T>(obj: T,key: PropertyKey) {
	Object.defineProperty(obj,key,{
		value: void 0,
		configurable: true,
		enumerable: false,
		writable: true,
	});
	return true;
}
