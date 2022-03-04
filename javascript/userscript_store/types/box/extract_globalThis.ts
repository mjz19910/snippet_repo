export function async_box_extract_globalThis(value: typeof globalThis | CSSStyleSheetInit): value is typeof globalThis {
	let dsc = Object.getOwnPropertyDescriptors(value);
	if(dsc.AbortController)
		return true;
	if(dsc.Error)
		return true;
	return false;
}
