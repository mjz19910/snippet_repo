import {readFile,writeFile} from 'fs/promises';
import {Type} from 'protobufjs';
import {as_base64_typeid} from './as_base64_typeid.js';
import {into_type} from './into_type.js';
import {ProtoBufTypeA} from './ProtoBufTypeA.js';
import {r} from './r.js';

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
	let pad="";
	console.log(`${pad}{`);
	pad+="  ";
	console.log(`${pad}videoId=%o`,videoId);
	console.log(`${pad}playlistId=%o`,playlistId);
	console.log(`${pad}token1=%o...`,token1.slice(0,10));
	console.log(`${pad}token2=%o`,token2);
	pad=pad.slice(0,-2);
	console.log(`}`);
	console.assert(pad=="");
	await writeFile(r("binary/bin0_token1.txt"),token1);
	console.log("saved A.token1 as binary/bin0_token1.txt");
	console.assert(Object.keys(obj_other).length===0,"no extra keys",obj_other);
	return obj;
}
