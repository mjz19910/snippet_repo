import {resolve} from "path";
import {
	default as protobufjs,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {get_token_data} from "./get_token_data.js";
import {get_token_data_from_file} from "./get_token_data_from_file.js";
import {r,__dirname} from "./r.js";

function run() {
	parse_types();
}

type LoadedTypes={
	root: protobufjs.Root;
	token_buffer: Buffer;
};


function use_input_arg(x: LoadedTypes,token_str: string) {
	let {root}: {
		root: protobufjs.Root;
		token_buffer: Buffer;
	}=x;
	const token_buffer=get_token_data(token_str);
	let buf_type=root.lookupType("A");
	let message=buf_type.decode(token_buffer);
	let u_obj=buf_type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj=into_type<typeof u_obj,{}>(u_obj);
	console.log(obj);
}

export async function parse_types(): Promise<void> {
	const loaded_types=await load_types();
	let myArgs=process.argv.slice(2);
	let root=loaded_types.root;
	let input_type=null;
	if(myArgs[0]==="--input-type") {
		input_type=myArgs[1];
		myArgs=myArgs.slice(2);
	}
	if(myArgs[0]==="--input") {
		let token_str=myArgs[1];
		if(input_type!==null) {
			const token_buffer=get_token_data(token_str);
			let buf_type;
			try {
				buf_type=root.lookupType(input_type);
			} catch {
				buf_type=new protobufjs.Type(input_type);
			}
			let message=buf_type.decode(token_buffer);
			let obj=buf_type.toObject(message,{
				longs: Number,
				arrays: true,
			});
			console.log(obj);
			return;
		}
		use_input_arg(loaded_types,token_str);
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
