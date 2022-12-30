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

function run() {
	parse_types();
}

let pad=""
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

type MyState={
	my_console: MyConsole;
};

function debug_l_delim_message(state: MyState,reader: Reader,unk_type: Type,field_id: number,size: number) {
	let console=state.my_console;
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
			console.pad_log("\"field %o: L-delim string\": %o",field_id,o.buf.subarray(o.pos,o.pos+size).toString());
		} else {
			console.pad_log("\"field %o: L-delim message(length=%o)\": {",field_id,size);
			let prev_pad=pad;
			pad+=pad_with;
			unk_type.decode(o.buf.subarray(o.pos,o.pos+size));
			pad=prev_pad;
			console.pad_log("}");
		}
	} else {
		console.pad_log("\"field %o: L-delim string\": %o",field_id,"");
	}
}

export class MyReader extends protobufjs.Reader {
	static override create(buffer: Uint8Array) {
		return new MyReader(buffer);
	}
	skipTypeEx(state: MyState,fieldId: number,wireType: number) {
		let console=state.my_console;
		let prev_pad;
		switch(wireType) {
			case 0:
				console.pad_log("\"field %o: VarInt\": ?",fieldId);
				this.skip();
				break;
			case 1:
				console.pad_log("\"field %o: 64-Bit\": ?",fieldId);
				this.skip(8);
				break;
			case 2:
				let size=this.uint32();
				debug_l_delim_message(state,this,unk_type,fieldId,size);
				this.skip(size);
				break;
			case 3:
				prev_pad=pad;
				console.pad_log("oneof: {",wireType);
				pad+=pad_with;
				while((wireType=this.uint32()&7)!==4) {
					this.skipTypeEx(state,fieldId,wireType);
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
				throw Error("invalid wire type "+wireType+" at offset "+this.pos);
		}
	}
}

class MyUnkType extends protobufjs.Type {
	_fieldsArray!: protobufjs.Field[];
	override setup() {
		let types=[];
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
		let ss=reader.uint32();
		my_console.pad_log("fieldId:%o type:%o",ss&7, ss>>>3);
		reader.fixed32();
		reader.pos=0;
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
