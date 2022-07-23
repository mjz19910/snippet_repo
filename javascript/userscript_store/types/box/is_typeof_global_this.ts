export function is_typeof_global_this<T>(v: T | typeof globalThis): v is typeof globalThis {
	if ('globalThis' in v)
		return true;
	return false;
}
