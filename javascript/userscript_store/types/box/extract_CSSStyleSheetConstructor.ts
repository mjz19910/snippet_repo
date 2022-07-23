export function extract_CSSStyleSheetConstructor(value: typeof CSSStyleSheet | Function): value is typeof CSSStyleSheet {
	return false;
}
