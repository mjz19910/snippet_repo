import {readFile} from "fs/promises";
import {default as protobufjs} from "protobufjs";
import {r} from "./r.js";

function run() {
	parse_types("tracking_params").catch(e=>{
		console.log("error",e);
	});
}
run();
export async function parse_types(proto_type: string): Promise<void> {
	let root=await protobufjs.load(r(`protobuf/${proto_type}.proto`));
	let proto_A_type=root.lookupType("A");
	await useTypeA(proto_A_type,proto_type);
}
async function useTypeA(type: {},proto_type: string) {
	const token_buffer=await get_token_data_from_file(r(`binary/${proto_type}.bin`));
	console.log(type);
}
export function get_token_data(token: string) {
	let base64_enc_2=token.replaceAll("_","/").replaceAll("-","+");
	return Buffer.from(base64_enc_2, 'base64');
}
async function get_token_data_from_file(file_path: string) {
	let bin_file=await readFile(r(file_path));
	let token_enc=bin_file.toString();
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	return get_token_data(base64_enc);
}
