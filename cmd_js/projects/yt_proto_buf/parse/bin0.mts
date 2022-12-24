import {readFileSync} from 'fs';
import {resolve} from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname=dirname(fileURLToPath(import.meta.url));

let token_enc=readFileSync(resolve(__dirname,"../binary/bin0.txt")).toString();
function r(path: string) {
	return resolve(__dirname,path);
}
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
async function run() {
	let as_uint=new Uint32Array(token_binary.slice(0,4).buffer);
	console.log(as_uint[0]);
	var protobuf=(await import('protobufjs') as any as {default: typeof import("protobufjs");}).default;
	let root=await protobuf.load(r("../protobuf/bin0.proto"));
	var Type=root.lookupType("A");
	console.log(new Uint32Array(token_binary.slice(0,4).buffer));
	let message=Type.decode(token_binary.subarray(4));
	type ProtoBufTypeC={
		type: number;
		data: Uint8Array;
	};

	type ProtoBufTypeA={
		videoId: string;
		playlistId:string;
		location: string;
		token1: string;
		token2: string;
		type_C: ProtoBufTypeC
	};
	function into_type<T,U>(obj:T|U): U {
		return obj as U;
	}
	let untyped_obj=Type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	let obj: ProtoBufTypeA=into_type<typeof untyped_obj,ProtoBufTypeA>(untyped_obj);
	let {videoId,playlistId,token1,token2,location,...obj_other}=obj;
	console.log({token1,token2},Object.keys(obj_other));
	console.log(obj_other);
	let base64_enc_2=obj.token1.replaceAll("_","/").replaceAll("-","+");
	const text_2=atob(base64_enc_2);
	let token_binary_2=new Uint8Array([...text_2].map(e => e.charCodeAt(0)));
	let Type_2=root.lookupType("A_token1");
	let id_arr=new Uint8Array(token_binary.slice(0,7).buffer);
	console.log('typeid',btoa(String.fromCharCode.apply("",Array.from(id_arr))).replaceAll("=",""));
	let message_2=Type_2.decode(token_binary_2.slice(7));
	let obj_2=Type_2.toObject(message_2,{
		longs: Number,
	});
	type DesType={
		items: ({})[];
		keys: number[];
		keysAlt: number[];
		valueMap: {key:number;value:number}[]
	};
	let description:DesType=obj_2.description;
	function extract_items(description: DesType) {
		let items=[];
		let map=new Map(description.valueMap.map(e=>[e.key,e.value]));
		for(let x of description.keys) {
			let index=map.get(x);
			if(!index) {
				console.log("missing index");
				continue;
			}
			let item=description.items[index];
			items.push(item);
		}
		return items;
	}
	let items=extract_items(description);
	console.log(items[0]);
}
run();
