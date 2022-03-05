export function extract_sub_type<T, GeneralType>(v: T | GeneralType): v is T {
	return false;
}
