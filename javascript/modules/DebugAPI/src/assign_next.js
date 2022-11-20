/**
 * @param {IDValue} value
 * @param {IDValue} next
 */
export function assign_next(value,next) {
	value.next=next;
	return next;
}
