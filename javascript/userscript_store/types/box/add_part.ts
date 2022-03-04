export function add_part<Z, Q>(_q: Q): _q is Q & Z {
	return true;
}
