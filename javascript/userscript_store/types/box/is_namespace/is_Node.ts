export function is_Node<T>(v: T|Node): v is Node {
	return v instanceof Node
}
