export function is_globalThis<T>(value: T|typeof globalThis): value is typeof globalThis {
	let dsc=Object.getOwnPropertyDescriptors(value)
	if(dsc.AbortController)
		return true
	if(dsc.Error)
		return true
	return false
}
