import {readFile} from "fs/promises";
import {
	default as protobufjs,
	Root,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {init_import_inject} from "../support/init_import_inject.js";
import {r} from "./r.js";

function run() {
	init_import_inject({protobufjs});
	parse_types().catch(e => {
		console.log("error",e);
	});
}
run();

export async function parse_types(): Promise<void> {
	let root=await protobufjs.load(r(`protobuf/tracking_params.proto`));
	const token_buffer=await get_token_data_from_file(r(`binary/tracking_params.bin`));
	await useTypeA(root,token_buffer);
}
async function useTypeA(root: Root,token_buffer: Buffer) {
	let buf_type=root.lookupType("A");
	let type=new protobufjs.Type("U");
	type.decode(token_buffer);
	let message=buf_type.decode(token_buffer);
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
