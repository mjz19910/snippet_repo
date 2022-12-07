/**
 * @param {{ children: any[]; }} current
 * @param {any} add_element
 */
export function add_element(current,add_element) {
	current.children.push(add_element)
}
