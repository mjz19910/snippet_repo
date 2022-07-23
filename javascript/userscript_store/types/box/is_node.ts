export function is_node<T>(v: T | Node): v is Node {
	return v instanceof Node;
}
