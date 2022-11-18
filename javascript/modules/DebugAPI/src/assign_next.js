/**
 * @param {IDValueData} value
 * @param {IDValueData} next
 */
export function assign_next(value,next) {
	value.next=next;
	return next;
}
