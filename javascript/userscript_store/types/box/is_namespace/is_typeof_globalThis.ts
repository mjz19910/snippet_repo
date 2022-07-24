export function is_typeof_globalThis<T>(v: T | typeof globalThis): v is typeof globalThis {
	if ('globalThis' in v)
		return true;
	return false;
}
