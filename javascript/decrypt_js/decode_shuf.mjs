import arr from "./dynamic/enc_arr.mjs";
import first_run_code from "../api/first_run_code.js";

function start_process() {
	process_00(arr);
	first_run_code(arr);
}
/**
 * @param {number} i
 * @define _0x16d8
 * @new_name get_enc
 */
function get_enc(i) {
	i-=0x1e9;
	return arr[i];
}

/**
 * @param {number[]} arg0
 * #define _0x4aec3f get_enc_4
 */
function get_enc_4(...[,,,,v]) {
	let expected=v- -0x298;
	let my_ver=v+0x298;
	console.assert(expected===my_ver, "simplify correct");
	return get_enc(v+0x298);
}

/**
 * @param {number[]} arg0
 * #define _0x3d969b get_enc_5
 */
function get_enc_5(...[,,,,_5]) {
	return get_enc(_5- -0x298);
}

/**
 * @param {number[]} arg0
 * @enc _0x314769 -> get_enc_4_x_1
 */
function get_enc_4_x_1(...[,,,,v]) {
	return get_enc(v- -0x298);
}

/**
 * @param {(string|undefined)[]} _0x36ea8
 */
export function process_00(_0x36ea8) {
	let xx=0x85ea*-0x1+-0x77782+0x35*0x6665;
	let _0x206ef7=xx;
	while(!![]) {
		try {
			//cspell:words _0x3bbefc
			var _0x3bbefc=
				-parseInt(get_enc_4(0x15a,-0x1a,0x11b,-0x5,0xa6))+
				-parseInt(get_enc_4(-0xf5,-0x36,-0x82,0x4f,-0x67))+
				-parseInt(get_enc_5(0x18f,0x133,0xa5,0xfc,0xf6))+
				-parseInt(get_enc_4_x_1(0x24,-0x83,0xa0,-0x3d,-0xb))+
				-parseInt(get_enc_4(-0xb3,-0xf2,0x6,-0x36,-0x1d))+
				-parseInt(get_enc_4_x_1(0x87,0x10e,0x16a,0x78,0xb0))+
				parseInt(get_enc_4(0x17c,0x8c,0xb0,0x3e,0xb8))*
				parseInt(get_enc_4(0x37,-0x68,-0xc2,-0x67,-0x45));
			if(_0x3bbefc===_0x206ef7) break;
			else _0x36ea8['push'](_0x36ea8['shift']());
		} catch(_0x75b472) {
			_0x36ea8['push'](_0x36ea8['shift']());
		}
	}
}

start_process();