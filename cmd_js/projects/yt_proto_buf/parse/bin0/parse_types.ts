import {Bin0Imports} from './Bin0Imports.js';
import {r} from './r.js';

// parse types
export async function parse_types(imp:Bin0Imports): Promise<void> {
	const {
		protobuf,
	}=imp;
	let root=await protobuf.load(r("protobuf/bin0.proto"));
	let proto_A_type=root.lookupType("A");
	let obj=await useTypeA(proto_A_type);
	useTypeT1A(root,obj);
}

// use types
import {as_base64_typeid} from './as_base64_typeid.js';
// start use type A
import {readFile,writeFile} from 'fs/promises';
import {Type} from 'protobufjs';
import {into_type} from './into_type.js';

export type ProtoBufTypeC={
	type: number;
	data: Uint8Array;
};

export type ProtoBufTypeA={
	videoId: string;
	playlistId: string;
	location: string;
	token1: string;
	token2: string;
	type_C: ProtoBufTypeC;
	a3: number;
	a7: number;
	a14: number;
	a24: string;
	a25: number;
	a28: number;
	a47: number;
};

export async function useTypeA(proto_A_type: Type) {
	let bin_file=await readFile(r("binary/bin0.txt"));
	let token_enc=bin_file.toString();
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	const text=atob(base64_enc);
	const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
	let id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	console.log('typeid=%o for A',as_base64_typeid(id_arr,0));
	let message=proto_A_type.decode(token_binary.subarray(4));
	let untyped_obj=proto_A_type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj: ProtoBufTypeA=into_type<typeof untyped_obj,ProtoBufTypeA>(untyped_obj);
	let {
		videoId,playlistId,token1,token2,location,
		type_C,
		a3,a7,a14,a24,a25,a28,a47,
		...obj_other
	}=obj;
	await writeFile(r("binary/bin0_token1.txt"),token1);
	console.log("saved A.token1 as binary/bin0_token1.txt");
	console.assert(Object.keys(obj_other).length===0,"no extra keys",obj_other);
	return obj;
}

// start use type t1_A
import {Root} from 'protobufjs';
import {decode_as_type} from './decode_as_type.js';
import {DesType} from './DesType.js';
import {extract_items} from './extract_items.js';
import {get_token_data} from './get_token_data.js';

export type ProtoBufTypeT1A={
	data: {
		description: DesType;
	};
};

export function useTypeT1A(root: Root,obj: ProtoBufTypeA) {
	let token_binary=get_token_data(obj.token1);
	let id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	let typeid=as_base64_typeid(id_arr,0);
	console.log('typeid=%o for base64(A.token1)',typeid);
	let tmp_data=decode_as_type<ProtoBufTypeT1A>(root,"t1_A",token_binary.slice(4));
	let description: DesType=tmp_data.data.description;
	let items=extract_items(description);
	console.log(items);
	console.log(description.items[0]);
}
