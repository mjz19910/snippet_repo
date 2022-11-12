export function is_dom_peek(val: any[]): val is ['dom_peek',any,any] {
	return val[0]==='dom_peek'
}
