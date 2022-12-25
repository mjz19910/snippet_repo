import {readFile} from "fs/promises";
import {r} from "./r.js";
import {get_token_data} from "./get_token_data.js";

export async function get_token_data_from_file(file_path: string) {
	let bin_file=await readFile(r(file_path));
	let token_enc=bin_file.toString();
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	return get_token_data(base64_enc);
}
