export function force_type_upgrade<T extends U, U>(v: U, opt_t?: T): v is T & U {
	return true;
}
