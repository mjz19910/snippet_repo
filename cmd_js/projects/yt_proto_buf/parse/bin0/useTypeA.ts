import {readFile} from 'fs/promises';
import {Root} from 'protobufjs';
import {as_base64_typeid} from './as_base64_typeid.js';
import {Bin0Imports} from './Bin0Imports.js';
import {into_type} from './into_type.js';
import {ProtoBufTypeA} from './ProtoBufTypeA.js';
import {r} from './r.js';

export async function useTypeA(imp:Bin0Imports,then_fn: (root:Root,buf_type: ProtoBufTypeA)=>void) {
	const {
		protobuf,
	}=imp;
	let root=await protobuf.load(r("protobuf/bin0.proto"));
	let bin_file=await readFile(r("binary/bin0.txt"));
	let token_enc=bin_file.toString();
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	const text=atob(base64_enc);
	const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
	var Type=root.lookupType("A");
	let id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	console.log('typeid=%o for A',as_base64_typeid(id_arr,0));
	let message=Type.decode(token_binary.subarray(4));
	let untyped_obj=Type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj: ProtoBufTypeA=into_type<typeof untyped_obj,ProtoBufTypeA>(untyped_obj);
	let {
		videoId,playlistId,token1,token2,location,type_C,a3,a7,a14,a24,a25,a28,a47,...obj_other
	}=obj;
	console.log({
		videoId,
		playlistId,
		token2,
	});
	console.log("token1=%o...",token1.slice(0,10));
	console.assert(Object.keys(obj_other).length===0,"no extra keys",obj_other);
	then_fn(root,obj);
}
