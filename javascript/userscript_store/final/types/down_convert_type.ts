export function down_convert_type<T, U extends T>(v: T): v is U {
	return true;
}
