import {StringDecoder} from "string_decoder";
export const g_ascii_text_decoder = new StringDecoder("ascii");
/**
 * @param {Uint8Array} arr
 * @param {number} len
 */
export function decode_text_ascii(arr, len) {
	return g_ascii_text_decoder.end(Buffer.from(arr.subarray(0, len)));
}
