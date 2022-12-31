import arr from "../dynamic/enc_arr.js";
import {first_run_code} from "./first_run_code.js";
import {get_enc_4_a, get_enc_4_b, get_enc_4_c} from "./get_enc_4.js";

function start_process() {
	process_00(arr);
	first_run_code(arr);
}
/** @arg {(string|undefined)[]} arr */
export function process_00(arr) {
	let target=0xd357d;
	while(!![]) {
		try {
			var cur=
				-parseInt(get_enc_4_a(0x15a,-0x1a,0x11b,-0x5,0xa6))+
				-parseInt(get_enc_4_a(-0xf5,-0x36,-0x82,0x4f,-0x67))+
				-parseInt(get_enc_4_b(0x18f,0x133,0xa5,0xfc,0xf6))+
				-parseInt(get_enc_4_c(0x24,-0x83,0xa0,-0x3d,-0xb))+
				-parseInt(get_enc_4_a(-0xb3,-0xf2,0x6,-0x36,-0x1d))+
				-parseInt(get_enc_4_c(0x87,0x10e,0x16a,0x78,0xb0))+
				parseInt(get_enc_4_a(0x17c,0x8c,0xb0,0x3e,0xb8))*
				parseInt(get_enc_4_a(0x37,-0x68,-0xc2,-0x67,-0x45));
			if(cur===target) break;
			else arr.push(arr.shift());
		} catch(_) {
			arr.push(arr.shift());
		}
	}
}

start_process();