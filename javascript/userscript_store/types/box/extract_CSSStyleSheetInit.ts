export function extract_CSSStyleSheetInit(value: {} | CSSStyleSheetInit): value is CSSStyleSheetInit {
	let rr = Object.getOwnPropertyDescriptors(value);
	if(rr.baseURL)
		return true;
	if(rr.disabled)
		return true;
	if(rr.media)
		return true;
	return false;
}
