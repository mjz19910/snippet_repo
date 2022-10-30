/**
 * @param {any} obj
 * @param {PropertyKey} name
 * @param {any} value
 * @param {any[]} props
 */
export function define_property_value(obj, name, value, ...props) {
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
