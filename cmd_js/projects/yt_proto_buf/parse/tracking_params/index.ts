import {readFile} from "fs/promises";
import {
	default as protobufjs,
	Root,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {r} from "./r.js";

function run() {
	parse_types("tracking_params").catch(e => {
		console.log("error",e);
	});
}
run();

export async function parse_types(proto_name: string): Promise<void> {
	let root=await protobufjs.load(r(`protobuf/${proto_name}.proto`));
	await useTypeA(root,proto_name);
}
async function useTypeA(root: Root,proto_name: string) {
	const token_buffer=await get_token_data_from_file(r(`binary/${proto_name}.bin`));
	let buf_type=root.lookupType("A");
	let message=buf_type.decode(token_buffer.subarray(2));
	let u_obj=buf_type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj=into_type<typeof u_obj,{}>(u_obj);
	console.log(obj);
}
export function get_token_data(token: string) {
	let base64_enc_2=token.replaceAll("_","/").replaceAll("-","+");
	return Buffer.from(base64_enc_2,'base64');
}
async function get_token_data_from_file(file_path: string) {
	let bin_file=await readFile(r(file_path));
	let token_enc=bin_file.toString();
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	return get_token_data(base64_enc);
}
