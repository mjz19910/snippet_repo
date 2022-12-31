/**
 * @arg {{ children: any[]; }} current
 * @arg {any} add_element
 */
export function add_element(current,add_element) {
	current.children.push(add_element)
}
