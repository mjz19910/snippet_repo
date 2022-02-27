export function define_property_value(obj: Window & typeof globalThis, name: PropertyKey, value: any, ...props: undefined[]) {
	let [
		writable = true, enumerable = true, configurable = true
	] = props;
	Object.defineProperty(obj, name, {
		value,
		writable,
		enumerable,
		configurable
	});
}
