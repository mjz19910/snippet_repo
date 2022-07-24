export function extract_unit_arr<T extends any[]>(value: [] | T): value is [] {
	if (value.length === 0) {
		return true;
	}
	return false;
}
