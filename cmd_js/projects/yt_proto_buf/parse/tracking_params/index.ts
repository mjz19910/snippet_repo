import {readFile} from "fs/promises";
import {
	default as protobufjs,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {r} from "./r.js";

function run() {
	parse_types();
}

const pad_with="   ";
let pad="";

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

type MyState={
	my_console: MyConsole;
};

class MyReader {
	reader: protobufjs.Reader;
	unk_type: MyUnkType;
	constructor(buffer: Uint8Array,unk_type: MyUnkType) {
		this.reader=new protobufjs.Reader(buffer);
		this.unk_type=unk_type;
	}
	static create(buffer: Uint8Array,unk_type: MyUnkType) {
		return new MyReader(buffer,unk_type);
	}
	skip(length?: number) {
		this.reader.skip(length);
		return this;
	}
	uint32() {
		return this.reader.uint32();
	}
	skipTypeEx(state: MyState,fieldId: number,wireType: number) {
		let console=state.my_console;
		let prev_pad;
		switch(wireType) {
			case 0:
				console.pad_log("VarInt: \"field %o\": ?",fieldId);
				this.skip();
				break;
			case 1:
				console.pad_log("Fixed64: \"field %o\": ?",fieldId);
				this.skip(8);
				break;
			case 2:
				let size=this.uint32();
				let has_error=false;
				if(size>0) {
					let pad_start=pad;
					let prev_dis=console.disabled;
					try {
						console.disabled=true;
						pad+=pad_with;
						this.unk_type.decodeEx(MyReader.create(this.reader.buf.subarray(this.reader.pos),this.unk_type),size);
					} catch {
						has_error=true;
					} finally {
						pad=pad_start;
						console.disabled=prev_dis;
					}
				}
				if(has_error) {
					let arr=this.reader.buf.subarray(this.reader.pos,this.reader.pos+size);
					console.pad_log("L-delim: \"field %o: (len=%o)\": %o",fieldId,size,arr.toString());
				} else if(size>0) {
					console.pad_log("L-delim: \"field %o: (len=%o)\": {",fieldId,size);
					let pad_start=pad;
					pad+=pad_with;
					this.unk_type.decodeEx(MyReader.create(this.reader.buf.subarray(this.reader.pos),this.unk_type),size);
					pad=pad_start;
					console.pad_log("}");
				}
				this.skip(size);
				break;
			case 3:
				prev_pad=pad;
				console.pad_log("StartGroup: {");
				pad+=pad_with;
				let raw_wire_type;
				while((wireType=(raw_wire_type=this.uint32())&7)!==4) {
					this.skipTypeEx(state,raw_wire_type>>3,wireType);
				}
				pad=prev_pad;
				console.pad_log("}");
				break;
			case 5:
				console.pad_log("\"field %o: 32-Bit\": ?",fieldId);
				this.skip(4);
				break;

			/* istanbul ignore next */
			default:
				throw Error("invalid wire type "+wireType+" at offset "+this.reader.pos);
		}
	}
}

class MyUnkType extends protobufjs.Type {
	state: any;
	constructor(v: string,opt: {[k: string]: any;}|undefined,state: MyState) {
		super(v,opt);
		this.state=state;
	}
	_fieldsArray!: protobufjs.Field[];
	decodeEx(r: MyReader,l?: number) {
		var c=l===undefined? r.reader.len:r.reader.pos+l,m=(new this.ctor) as protobufjs.Message<{}>;
		while(r.reader.pos<c) {
			var t=r.uint32();
			switch(t>>>3) {
				default:
					r.skipTypeEx(this.state,t>>3,t&7);
					break;
			}
		}
		return m;
	}
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
	let root=await protobufjs.load(r(`protobuf/tracking_params.proto`));
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
