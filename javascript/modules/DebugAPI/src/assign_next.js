/**
 * @param {IDValueG} value
 * @param {IDValueG} next
 */
export function assign_next(value,next) {
	value.next=next;
	return next;
}
