/** @template {Element} R @returns {R} @template {Element} T @arg {T} root @template {string} U @arg {U} selector */
export function query_element(root,selector) {
	/** @type {R|null} */
	let element=root.querySelector(selector);
	if(!element) {
		debugger;
		throw new Error("Missing element");
	}
	return element;
}
