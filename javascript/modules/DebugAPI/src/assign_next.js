/**
 * @param {IValue} value
 * @param {IValue} next
 */
 export function assign_next(value,next) {
	value.next=next;
	return next;
}
