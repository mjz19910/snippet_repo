/** @template {Element} R @returns {R} @template {ParentNode} T @arg {T} root @template {string} U @arg {U} selector */
export function query_element(root,selector) {
	/** @type {R|null} */
	let element=root.querySelector(selector);
	if(!element) {
		debugger;
		throw new Error("Missing element");
	}
	return element;
}
/** @param {Element} node */
export function as_svg_element(node) {
	if(!(node instanceof SVGElement)) {
		throw new Error("Wrong type");
	}
	return node;
}
/** @param {Element} node */
export function as_html_element(node) {
	if(!(node instanceof HTMLElement)) {
		throw new Error("Wrong type");
	}
	return node;
}
/** @param {Element} node */
export function as_div_element(node) {
	if(!(node instanceof HTMLDivElement)) {
		debugger;
		throw new Error("Wrong type");
	}
	return node;
}
/** @template {Element} T @arg {T} node */
export function query_parent_element(node) {
	let element=node.parentElement;
	if(!element) {
		debugger;
		throw new Error("Missing element");
	}
	return element;
}
