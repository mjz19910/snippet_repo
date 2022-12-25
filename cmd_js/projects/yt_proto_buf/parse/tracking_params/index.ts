import {resolve} from "path";
import {
	default as protobufjs,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {get_token_data} from "./get_token_data.js";
import {get_token_data_from_file} from "./get_token_data_from_file.js";
import {r, __dirname} from "./r.js";

function run() {
	parse_types();
}

export async function parse_types(): Promise<void> {
	const myArgs=process.argv.slice(2);
	const loaded_types=await load_types();
	let root=loaded_types.root;
	if(myArgs[0]==="--input") {
		const token_buffer=get_token_data(myArgs[1]);
		let buf_type=root.lookupType("A");
		let message=buf_type.decode(token_buffer);
		let u_obj=buf_type.toObject(message,{
			longs: Number,
			arrays: true,
		});
		let obj=into_type<typeof u_obj,{}>(u_obj);
		console.log(obj);
		return;
	}
	await useTypeA(loaded_types);
}

async function load_types() {
	let root=await protobufjs.load(resolve(__dirname,`protobuf/tracking_params.proto`));
	const token_buffer=await get_token_data_from_file(r(`binary/tracking_params.bin`));
	return {root,token_buffer};
}

async function useTypeA({root,token_buffer}: {root: protobufjs.Root,token_buffer: Buffer;}) {
	let buf_type=root.lookupType("A");
	let message=buf_type.decode(token_buffer);
	let u_obj=buf_type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj=into_type<typeof u_obj,{}>(u_obj);
	console.log(obj);
}

run();
