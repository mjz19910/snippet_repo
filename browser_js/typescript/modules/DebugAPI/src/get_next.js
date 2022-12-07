/**@arg {IDValue_0} next */
export function get_next({next}) {
	if(next===null)
		throw new Error("Unexpected type");
	return next;
}
