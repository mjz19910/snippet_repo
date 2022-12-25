import {readFile} from "fs/promises";
import {
	default as protobufjs,
	type Root,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {r} from "./r.js";

function run() {
	parse_types();
}

const pad_with="   ";
let pad="";

function increase_padding() {
	let prev=pad;
	pad+=pad_with;
	return () => {
		pad=prev;
	};
}

class MyConsole {
	paused=false;
	cache: [string,string,any[]][]=[];
	disabled=false;
	log(...data: any[]) {
		console.log(...data);
	}
	pad_log(message: string,...data: any[]) {
		if(this.disabled) return;
		if(this.paused) {
			this.cache.push([pad,message,data]);
			return;
		}
		console.log(pad+message,...data);
	}
	scope_id_max=1;
	start_stack=new Array<[number,number,boolean]>;
	pause(scope: () => void) {
		let scope_id=this.scope_id_max++;
		let enter_len=this.start_stack.length;
		let start_pause_length=this.cache.length;
		this.start_stack.push([scope_id,start_pause_length,this.paused]);
		this.paused=false;
		scope();
		let scope_val=this.start_stack.at(-1);
		if(scope_val) {
			this.paused=scope_val[2];
		}
		if(!this.paused) this.on_resume();
		x: if(scope_val) {
			if(scope_val[0]!==scope_id) {
				break x;
			}
			this.cache.length=scope_val[1];
			if(this.start_stack.length>enter_len) {
				this.start_stack.length=enter_len;
			}
		} else {
			this.paused=false;
			this.cache.length=start_pause_length;
		}
	}
	on_resume() {
		for(let msg of this.cache) {
			let [pad,message,data]=msg;
			this.pad_log(pad+message,...data);
		}
	}
}

export class MyReader {
	reader: protobufjs.Reader;
	unk_type: MyUnkType;
	constructor(buffer: Uint8Array,unk_type:MyUnkType) {
		this.reader=new protobufjs.Reader(buffer);
		this.unk_type=unk_type;
	}
	static create(buffer: Uint8Array,unk_type:MyUnkType) {
		return new MyReader(buffer,unk_type);
	}
}

class MyUnkType extends protobufjs.Type {
	constructor(v: string,opt?: {[k: string]: any;}) {
		super(v,opt);
	}
	_fieldsArray!: protobufjs.Field[];
}
const {
	Reader
}=protobufjs;

export async function parse_types(): Promise<void> {
	const my_console=new MyConsole;
	const myArgs=process.argv.slice(2);
	let unk_type=new MyUnkType("SkipUnknown");
	if(myArgs[0]==="--input") {
		my_console.pad_log("message Type.U {");
		let reset=increase_padding();
		const token_buffer=get_token_data(myArgs[1]);
		let reader=Reader.create(new Uint8Array(token_buffer.buffer));
		let ss=reader.uint32();
		my_console.pad_log("%o",ss);
		reader.pos=0;
		unk_type.decode(reader);
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

run();
