import {
	default as protobufjs,
	type Reader,
	type Root,
	type Type,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {get_token_data} from "./get_token_data.js";
import {get_token_data_from_file} from "./get_token_data_from_file.js";
import {r,__dirname} from "./r.js";
type Long=import("long");

function run() {
	parse_types();
}

let pad="";
let pad_with="  ";

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
}

interface DebugDelimType {
	reader: Reader;
	unk_type: Type;
	field_id: number;
	size: number;
}

const decoder=new TextDecoder;

function debug_l_delim_message({reader,unk_type,field_id,size}: DebugDelimType) {
	let console=my_console;
	let o=reader;
	if(size>0) {
		let has_error=false;
		console.disabled=true;
		try {
			unk_type.decode(o.buf.subarray(o.pos,o.pos+size));
		} catch {
			has_error=true;
		} finally {
			console.disabled=false;
		}
		if(has_error) {
			console.pad_log("\"field #%o: L-delim string\": %o,",field_id,decoder.decode(o.buf.subarray(o.pos,o.pos+size)));
		} else {
			console.pad_log("\"field #%o: L-delim message(length=%o)\": {",field_id,size);
			let prev_pad=pad;
			pad+=pad_with;
			unk_type.decode(o.buf.subarray(o.pos,o.pos+size));
			pad=prev_pad;
			console.pad_log("}");
		}
	} else {
		console.pad_log("\"field #%o: L-delim string\": %o,",field_id,"");
	}
}

let my_console=new MyConsole;

export class MyReader extends protobufjs.Reader {
	static override create(buffer: Uint8Array) {
		return new MyReader(buffer);
	}
	last_pos: number;
	constructor(buf: Uint8Array) {
		super(buf);
		this.last_pos=this.pos;
	}
	override skip(length?: number) {
		if(length!==void 0) {
			my_console.pad_log("asked to skip", length);
		} else {
			my_console.pad_log("asked to skip VarInt");
		}
		return super.skip(length);
	}
	public override uint32(): number {
		this.last_pos=this.pos;
		return super.uint32();
	}
	revert<T>(x: () => T) {
		let prev_pos=this.pos;
		this.pos=this.last_pos;
		let ret=x();
		this.pos=prev_pos;
		return ret;
	}
	revert_to<T>(pos: number,x: () => T) {
		let prev_pos=this.pos;
		this.pos=pos;
		let ret=x();
		this.pos=prev_pos;
		return ret;
	}
	logField<T extends any[]>(format: string,...args: T) {
		if(this.pos>=this.buf.length) {
			my_console.pad_log(format,...args);
		} else {
			my_console.pad_log(`${format},`,...args);
		}
	}
	override skipType(wireType: number) {
		my_console.pad_log("skip type",this.pos);
		this.revert(() => {
			let info=this.uint32();
			let pos_start=this.pos;
			switch(wireType) {
				case 0: {
					let value64=this.revert_to(pos_start,() => {
						return this.uint64();
					}) as Long;
					let value32=this.uint32();
					if(value32!==value64.toNumber()) {
						this.logField("\"field #%o: VarInt(int64, type=%o)\": %o",info>>>3,info&7,value64.toNumber());
					} else {
						this.logField("\"field #%o: VarInt(int32, type=%o)\": %o",info>>>3,info&7,value32);
					}
				} break;
				case 2: {
					let size=this.uint32();
					debug_l_delim_message({reader: this,unk_type,field_id: info>>>3,size});
				} break;
				case 5: {
					let f32=this.fixed32();
					this.logField("\"field #%o: 32-Bit(type=%o)\": %o",info>>>3,info&7,f32);
				} break;
				default: my_console.pad_log("\"field #%o: (type=%o)\": \"??\"",info>>>3,info&7);
			}
		});
		switch(wireType) {
			case 0:
				this.skip();
				break;
			case 1:
				this.skip(8);
				break;
			case 2:
				this.skip(this.uint32());
				break;
			case 3:
				while((wireType=this.uint32()&7)!==4) {
					this.skipType(wireType);
				}
				break;
			case 5:
				this.skip(4);
				break;
			default:
				throw Error("invalid wire type "+wireType+" at offset "+this.pos);
		}
		return this;
	}
	skipTypeEx(fieldId: number,wireType: number) {
		let console=my_console;
		let prev_pad;
		switch(wireType) {
			case 0:
				console.pad_log("\"field #%o: VarInt\": ?",fieldId);
				this.skip();
				break;
			case 1:
				console.pad_log("\"field #%o: 64-Bit\": ?",fieldId);
				this.skip(8);
				break;
			case 2:
				let size=this.uint32();
				debug_l_delim_message({reader: this,unk_type,field_id: fieldId,size});
				this.skip(size);
				break;
			case 3:
				prev_pad=pad;
				console.pad_log("oneof: {",wireType);
				pad+=pad_with;
				while((wireType=this.uint32()&7)!==4) {
					this.skipTypeEx(fieldId,wireType);
				}
				pad=prev_pad;
				console.pad_log("}");
				break;
			case 5:
				console.pad_log("\"field #%o: 32-Bit\": ?",fieldId);
				this.skip(4);
				break;

			/* istanbul ignore next */
			default:
				throw Error("invalid wire type "+wireType+" at offset "+this.pos);
		}
	}
}

class MyUnkType extends protobufjs.Type {
	_fieldsArray!: protobufjs.Field[];
	override setup() {
		let types: (protobufjs.Type|protobufjs.Enum|null)[]=[];
		for(var i=0;i< /* initializes */ this.fieldsArray.length;++i)
			types.push(this._fieldsArray[i].resolve().resolvedType);
		this.decode=protobufjs.decoder(this)({
			Reader: MyReader,
			types: types,
			util: protobufjs.util
		}) as (reader: Reader|Uint8Array,length?: number|undefined) => protobufjs.Message<{}>;
		return this;
	}
}


const unk_type=new MyUnkType("SkipUnknown");

export async function parse_types(): Promise<void> {
	const my_console=new MyConsole;
	const myArgs=process.argv.slice(2);
	if(myArgs[0]==="--input") {
		my_console.pad_log("message Type.U {");
		let prev_pad=pad;
		pad+=pad_with;
		const token_buffer=get_token_data(myArgs[1]);
		let reader=MyReader.create(new Uint8Array(token_buffer));
		unk_type.decode(reader);
		pad=prev_pad;
		my_console.pad_log("}");
		return;
	}
	const loaded_types=await load_types();
	await useTypeA(loaded_types);
}
async function load_types() {
	let root=await protobufjs.load(r(`parse/tracking_params/protobuf/tracking_params.proto`));
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
	console.log(obj,token_buffer);
}

run();
