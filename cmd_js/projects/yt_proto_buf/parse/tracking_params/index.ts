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

class MyReader extends protobufjs.Reader {
	unk_type: MyUnkType;
	my_console: MyConsole;
	constructor(buffer: Uint8Array,unk_type: MyUnkType,my_console: MyConsole) {
		super(buffer);
		this.unk_type=unk_type;
		this.my_console=my_console;
	}
	static createEx(buffer: Uint8Array,unk_type: MyUnkType,my_console: MyConsole) {
		return new MyReader(buffer,unk_type,my_console);
	}
	
	static createFrom(buffer: Uint8Array,other: MyReader) {
		return this.createEx(buffer,other.unk_type,other.my_console);
	}
	fieldId: number|null=null;
	override skipType(wireType: number) {
		let console=this.my_console;
		let prev_pad;
		switch(wireType) {
			case 0:
				console.pad_log("VarInt: \"field %o\": ?",this.fieldId);
				this.skip();
				break;
			case 1:
				console.pad_log("Fixed64: \"field %o\": ?",this.fieldId);
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
						this.unk_type.decode(MyReader.createFrom(this.buf.subarray(this.pos),this),size);
					} catch {
						has_error=true;
					} finally {
						pad=pad_start;
						console.disabled=prev_dis;
					}
				}
				if(has_error) {
					let arr=this.buf.subarray(this.pos,this.pos+size);
					console.pad_log("L-delim: \"field %o: (len=%o)\": %o",this.fieldId,size,arr.toString());
				} else if(size>0) {
					console.pad_log("L-delim: \"field %o: (len=%o)\": {",this.fieldId,size);
					let pad_start=pad;
					pad+=pad_with;
					this.unk_type.decode(MyReader.createFrom(this.buf.subarray(this.pos),this));
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
					this.fieldId=raw_wire_type>>3;
					this.skipType(wireType);
				}
				pad=prev_pad;
				console.pad_log("}");
				break;
			case 5:
				console.pad_log("\"field %o: 32-Bit\": ?",this.fieldId);
				this.skip(4);
				break;

			/* istanbul ignore next */
			default:
				throw Error("invalid wire type "+wireType+" at offset "+this.pos);
		}
		return this;
	}
}

class MyUnkType extends protobufjs.Type {
	constructor(name: string,options?: {[k: string]: any;}) {
		super(name,options);
	}
	_fieldsArray!: protobufjs.Field[];
	override decode(r: MyReader,l?: number) {
		var c=l===undefined? r.len:r.pos+l,m=(new this.ctor) as protobufjs.Message<{}>;
		while(r.pos<c) {
			var t=r.uint32();
			switch(t>>>3) {
				default:
					r.fieldId=t>>3;
					r.skipType(t&7);
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
