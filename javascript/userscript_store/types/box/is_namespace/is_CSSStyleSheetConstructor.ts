export function is_CSSStyleSheetConstructor<T extends Function>(value: T | typeof CSSStyleSheet): value is typeof CSSStyleSheet {
	return value === CSSStyleSheet;
}
