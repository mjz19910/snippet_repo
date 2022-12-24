import {Root} from 'protobufjs';
import {as_base64_typeid} from './as_base64_typeid.js';
import {into_type} from './into_type.js';
import {ProtoBufTypeA} from './ProtoBufTypeA.js';

export function useTypeA(root: Root,token_enc: string) {
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	const text=atob(base64_enc);
	const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
	var Type=root.lookupType("A");
	let id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	console.log('typeid=%o for A',as_base64_typeid(id_arr));
	let message=Type.decode(token_binary.subarray(4));
	let untyped_obj=Type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj: ProtoBufTypeA=into_type<typeof untyped_obj,ProtoBufTypeA>(untyped_obj);
	let {
		videoId,playlistId,token1,token2,location,type_C,a3,a7,a14,a24,a25,a28,a47,...obj_other
	}=obj;
	console.assert(Object.keys(obj_other).length===0,"no extra keys",obj_other);
	return obj;
}
