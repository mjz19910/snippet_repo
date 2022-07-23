export function is_array<T, Y>(v: T | Array<Y>, target_mode: number, cur_mode: number): v is Array<Y> {
	if (target_mode != cur_mode)
		return false;
	return v instanceof Array;
}
