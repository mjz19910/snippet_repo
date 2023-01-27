namespace cast_objects {
	export function as<T extends U,U>(e: U,x: any=e): T {
		return x;
	}
}