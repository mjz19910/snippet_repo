import {r} from './r.js';
import {as_base64_typeid} from './as_base64_typeid.js';
import {readFile,writeFile} from 'fs/promises';
import {Type} from 'protobufjs';
import {into_type} from '../support/into_type.js';
import {ProtoBufTypeA} from './ProtoBufTypeA.js';
import {get_token_data} from './get_token_data.js';


export async function useTypeA(proto_A_type: Type) {
	let bin_file=await readFile(r("binary/bin0.txt"));
	let token_enc=bin_file.toString();
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	const token_binary=get_token_data(base64_enc);
	let id_arr=new Uint8Array(token_binary.subarray(0,4));
	console.log('typeid=%o for A',as_base64_typeid(id_arr,0));
	let message=proto_A_type.decode(token_binary.subarray(4));
	let untyped_obj=proto_A_type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj: ProtoBufTypeA=into_type<typeof untyped_obj,ProtoBufTypeA>(untyped_obj);
	let {
		videoId,playlistId,token1,token2,location,type_C,a3,a7,a14,a24,a25,a28,a47,...obj_other
	}=obj;
	await writeFile(r("binary/bin0_token1.txt"),token1);
	console.log("saved A.token1 as binary/bin0_token1.txt");
	console.assert(Object.keys(obj_other).length===0,"no extra keys",obj_other);
	return obj;
}
