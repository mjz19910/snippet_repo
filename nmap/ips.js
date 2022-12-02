/** @arg {string} a @arg {number} b */
function make_1e100(a, b) {
	let c = b.toString();
	return `${a}-in-f${c}.1e100.net`;
}

/** @param {number} a */
function x(a) {
	let b = a.toString();
	if (b.length == 1) {
		b = "0" + b;
	}
	return b;
}

/** @param {number} a @param {number} b */
function _dfw_s(a, b) {
	let c = x(a);
	let d = x(b);
	return `dfw${c}s${d}`;
}

let a = _dfw_s;
let f = make_1e100;

/** @param {any} x */
function c(x) {
	console.log(x);
}

function my() {
	/** @param {(arg0: any, arg1: any) => string} x * @param {any} a * @param {any} b @param {number} c */
	function zy(x, a, b, c) {
		let z = make_1e100(x(a, b), c);
		console.log(z);
		return z;
	};
	let y = zy;

	y(a, 28, 25, 0);
}
my();
function ma() {
	/** @param {string} b @param {number} c */
	function y(b, c) {
		let z = make_1e100(b, c);
		console.log(z);
		return z;
	};
	y("dfw25s40", 0);
	y("dfw28s25", 0);
	y("dfw28s26", 0);
	y("dfw28s26", 0);
	y("dfw28s37", 0);
	y("dfw25s54", 0);
	y("qro02s21", 0);
}
ma();
