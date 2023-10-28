/** @arg {string} a @arg {number} b */
function make_1e100(a, b) {
	const c = b.toString();
	return `${a}-in-f${c}.1e100.net`;
}
function ma() {
	/** @arg {string} b @arg {number} c */
	function y(b, c) {
		const z = make_1e100(b, c);
		console.log(z);
		return z;
	}
	y("dfw25s40", 0);
	y("dfw28s25", 0);
	y("dfw28s26", 0);
	y("dfw28s26", 0);
	y("dfw28s37", 0);
	y("dfw25s54", 0);
	y("qro02s21", 0);
}
ma();
