/** @arg {string} a @arg {number} b */
function make_1e100(a, b) {
	const c = b.toString();
	return `${a}-in-f${c}.1e100.net`;
}

/** @arg {number} a */
function x(a) {
	const b = a.toString();
	if (b.length == 1) {
		return "0" + b;
	}
	return b;
}

/** @arg {number} a @arg {number} b */
function _dfw_s(a, b) {
	const c = x(a);
	const d = x(b);
	return `dfw${c}s${d}`;
}

const a = _dfw_s;

function my() {
	/** @arg {(arg0: any, arg1: any) => string} x * @arg {any} a * @arg {any} b @arg {number} c */
	function zy(x, a, b, c) {
		const z = make_1e100(x(a, b), c);
		console.log(z);
		return z;
	}
	const y = zy;

	y(a, 28, 25, 0);
}
my();
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
