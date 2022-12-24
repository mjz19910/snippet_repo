import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import {dirname} from 'path';
import {Root} from 'protobufjs';
import {fileURLToPath} from 'url';
import {into_type} from './into_type';
import {ProtoBufTypeA} from './ProtoBufTypeA';

const __dirname=dirname(fileURLToPath(import.meta.url));

let token_enc=readFileSync(resolve(__dirname,"../binary/bin0.txt")).toString();
function r(path: string) {
	return resolve(__dirname,path);
}
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
async function run() {
	var protobuf=(await import('protobufjs') as any as {default: typeof import("protobufjs");}).default;
	let root=await protobuf.load(r("../protobuf/bin0.proto"));
	parse_types(root);
}
run();
function parse_types(root: Root): void {
	var Type=root.lookupType("A");
	let id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	console.log('A.typeid=%o',btoa(String.fromCharCode.apply("",Array.from(id_arr))).replaceAll("=",""));
	let message=Type.decode(token_binary.subarray(4));
	let untyped_obj=Type.toObject(message,{
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
	console.assert(Object.keys(obj_other).length===0, "no extra keys",obj_other);
	let base64_enc_2=obj.token1.replaceAll("_","/").replaceAll("-","+");
	writeFileSync(r("../binary/bin0_token1.txt"),base64_enc_2);
	const text_2=atob(base64_enc_2);
	let token_binary_2=new Uint8Array([...text_2].map(e => e.charCodeAt(0)));
	let Type_2=root.lookupType("A_token1");
	id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	console.log('base64(A.token1).typeid=%o',btoa(String.fromCharCode.apply("",Array.from(id_arr))).replaceAll("=",""));
	id_arr=new Uint8Array(token_binary.slice(4,7).buffer);
	console.log('base64(A.token1).extra',id_arr);
	function decode_as(message_type: string|string[],data: Uint8Array) {
		let type=root.lookupType(message_type);
		let message=type.decode(data);
		let obj=type.toObject(message,{
			longs: Number,
		});
		return obj;
	}
	let tmp_data=decode_as("D",token_binary_2.slice(4));
	console.log('as D',tmp_data.data);
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