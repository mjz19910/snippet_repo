import {
	Codegen,
	default as protobufjs,
	Field,
	type Reader,
	type Root,
	type Type,
} from "protobufjs";
import {into_type} from "../support/into_type.js";
import {get_token_data} from "./get_token_data.js";
import {get_token_data_from_file} from "./get_token_data_from_file.js";
import {r} from "./r.js";

function run() {
	parse_types();
}
run();

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
export namespace codegen_ex {	
	const util=protobufjs.util;
	const Enum=protobufjs.Enum;
	const Type=protobufjs.Type;Type;
	const types=protobufjs.types;
	/**
 * Generates a partial message type encoder.
 */
function genTypePartial(gen: Codegen, field: Field, fieldIndex: number, ref: string): Codegen {
	if(!field.resolvedType) throw new Error("Failed to resolve type");
	return ((field.resolvedType as {} as {group: {}|null}).group
		? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0)
		: gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0)) as Codegen;
}

function missing(field: {name: string;}) {
	return "missing required '" + field.name + "'";
}
/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
export function decoder(mtype: MyUnkType): Codegen {
	/* eslint-disable no-unexpected-multiline */
	var gen = util.codegen(["r", "l"], mtype.name + "$decode")
	("if(!(r instanceof Reader))")
			("r=Reader.create(r)")
	("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field) { return field.map; }).length ? ",k,value" : ""))
	("while(r.pos<c){")
			("var t=r.uint32()");
	if ((mtype as {} as {group: {}|null}).group) gen
			("if((t&7)===4)")
					("break");
	gen
			("switch(t>>>3){");

	var i = 0;
	for (; i < /* initializes */ mtype.fieldsArray.length; ++i) {
			var field = mtype._fieldsArray[i].resolve() as Field&{keyType:"int64"},
					type  = (field.resolvedType instanceof Enum ? "int32" : field.type) as "int32",
					ref   = "m" + util.safeProp(field.name); gen
					("case %i: {", field.id);

			// Map fields
			if (field.map) { gen
							("if(%s===util.emptyObject)", ref)
									("%s={}", ref)
							("var c2 = r.uint32()+r.pos");

					if (types.defaults[field.keyType] !== undefined) gen
							("k=%j", types.defaults[field.keyType]);
					else gen
							("k=null");

					if (types.defaults[type] !== undefined) gen
							("value=%j", types.defaults[type]);
					else gen
							("value=null");

					gen
							("while(r.pos<c2){")
									("var tag2=r.uint32()")
									("switch(tag2>>>3){")
											("case 1: k=r.%s(); break", field.keyType)
											("case 2:");

					if (types.basic[type] === undefined) gen
													("value=types[%i].decode(r,r.uint32())", i); // can't be groups
					else gen
													("value=r.%s()", type);

					gen
													("break")
											("default:")
													("r.skipType(tag2&7)")
													("break")
									("}")
							("}");

					if (types.long[field.keyType] !== undefined) gen
							("%s[typeof k===\"object\"?util.longToHash(k):k]=value", ref);
					else gen
							("%s[k]=value", ref);

			// Repeated fields
			} else if (field.repeated) { gen

							("if(!(%s&&%s.length))", ref, ref)
									("%s=[]", ref);

					// Packable (always check for forward and backward compatibility)
					if (types.packed[type] !== undefined) gen
							("if((t&7)===2){")
									("var c2=r.uint32()+r.pos")
									("while(r.pos<c2)")
											("%s.push(r.%s())", ref, type)
							("}else");

					// Non-packed
					if (types.basic[type] === undefined) gen((field.resolvedType! as {} as {group: {}|null}).group
									? "%s.push(types[%i].decode(r))"
									: "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
					else gen
									("%s.push(r.%s())", ref, type);

			// Non-repeated
			} else if (types.basic[type] === undefined) gen((field.resolvedType! as {} as {group: {}|null}).group
							? "%s=types[%i].decode(r)"
							: "%s=types[%i].decode(r,r.uint32())", ref, i);
			else gen
							("%s=r.%s()", ref, type);
			gen
							("break")
					("}");
			// Unknown fields
	} gen
					("default:")
							("r.skipType(t&7)")
							("break")

			("}")
	("}");

	// Field presence
	for (i = 0; i < mtype._fieldsArray.length; ++i) {
			var rfield = mtype._fieldsArray[i];
			if (rfield.required) gen
	("if(!m.hasOwnProperty(%j))", rfield.name)
			("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
	}

	return gen
	("return m");
	/* eslint-enable no-unexpected-multiline */
}
	/**
	 * Generates an encoder specific to the specified message type.
	 */
	export function encoder(mtype:MyUnkType): Codegen {
		/* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
		var gen=util.codegen(["m","w"],mtype.name+"$encode")
			("if(!w)")
			("w=Writer.create()");

		var i:number,ref;

		// "when a message is serialized its known fields should be written sequentially by field number"
		var fields= /* initializes */ mtype.fieldsArray.slice().sort(util.compareFieldsById);

		for(var i=0;i<fields.length;++i) {
			var field=fields[i].resolve();
			var index=mtype._fieldsArray.indexOf(field);
			var type=field.resolvedType instanceof Enum? "int32":field.type;
			if(type!=="int32") continue;
			var wireType=types.basic[type];
			ref="m"+util.safeProp(field.name);

			// Map fields
			if(field.map) {
				gen
					("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){",ref,field.name) // !== undefined && !== null
					("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){",ref)
					("w.uint32(%i).fork().uint32(%i).%s(ks[i])",(field.id<<3|2)>>>0,8|(types.mapKey as any)[(field as any).keyType],(field as any).keyType);
				if(wireType===undefined) gen
					("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()",index,ref); // can't be groups
				else gen
					(".uint32(%i).%s(%s[ks[i]]).ldelim()",16|wireType,type,ref);
				gen
					("}")
					("}");

				// Repeated fields
			} else if(field.repeated) {
				gen
					("if(%s!=null&&%s.length){",ref,ref); // !== undefined && !== null

				// Packed repeated
				if(field.packed&&types.packed[type]!==undefined) {
					gen

						("w.uint32(%i).fork()",(field.id<<3|2)>>>0)
					("for(var i=0;i<%s.length;++i)",ref)
					("w.%s(%s[i])",type,ref)
					("w.ldelim()");

					// Non-packed
				} else {
					gen

						("for(var i=0;i<%s.length;++i)",ref);
					if(wireType===undefined)
						genTypePartial(gen,field,index,ref+"[i]");
					else gen
						("w.uint32(%i).%s(%s[i])",(field.id<<3|wireType)>>>0,type,ref);

				} gen
					("}");

				// Non-repeated
			} else {
				if(field.optional) gen
					("if(%s!=null&&Object.hasOwnProperty.call(m,%j))",ref,field.name); // !== undefined && !== null

				if(wireType===undefined)
					genTypePartial(gen,field,index,ref);
				else gen
					("w.uint32(%i).%s(%s)",(field.id<<3|wireType)>>>0,type,ref);

			}
		}

		return gen
			("return w");
		/* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
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
		let reset=increase_padding();
		const token_buffer=get_token_data(myArgs[1]);
		let reader=MyReader.create(new Uint8Array(token_buffer));
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
	console.log(type,token_buffer);
}

run();
