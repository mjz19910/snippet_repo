export function is_CSSStyleSheetConstructor<T extends Function>(value: T|typeof CSSStyleSheet): value is typeof CSSStyleSheet {
	value=value as typeof CSSStyleSheet
	const dsc=Object.getOwnPropertyDescriptors(value.prototype)
	return !!(dsc.replace&&dsc.rules)
}
