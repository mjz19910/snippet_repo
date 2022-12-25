import {readFile} from "fs/promises";
import {
	default as protobufjs,
	Root,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {increase_padding, init_import_inject, my_console} from "../support/init_import_inject.js";
import {r} from "./r.js";

function run() {
	init_import_inject({protobufjs});
	parse_types().catch(e => {
		console.log("error",e);
	});
}
run();

export async function parse_types(): Promise<void> {
	const myArgs=process.argv.slice(2);
	if(myArgs[0]==="--input") {
		my_console.pad_log("message Type.U {");
		let reset=increase_padding();
		let type=new protobufjs.Type("U");
		const token_buffer=get_token_data(myArgs[1]);
		type.decode(token_buffer);
		reset();
		my_console.pad_log("}");
		return;
	}
	const loaded_types=await load_types();
	await useTypeA(loaded_types);
}
async function load_types() {
	let root=await protobufjs.load(r(`protobuf/tracking_params.proto`));
	const token_buffer=await get_token_data_from_file(r(`binary/tracking_params.bin`));
	return {root,token_buffer};
}
async function useTypeA({root,token_buffer}: {root: Root,token_buffer: Buffer;}) {
	let buf_type=root.lookupType("A");
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
