import {readFile} from 'fs/promises';
import {resolve} from 'path';
import {dirname} from 'path';
import {Root} from 'protobufjs';
import {fileURLToPath} from 'url';
import {decode_as_type} from './decode_as_type';
import {DesType} from './DesType.js';
import {extract_items} from './extract_items';
import {get_token_data} from './get_token_data.js';
import {ProtoBufTypeA} from './ProtoBufTypeA.js';
import {ProtoBufTypeD} from './ProtoBufTypeD';
import {useTypeA} from './useTypeA.js';

const __dirname=dirname(fileURLToPath(import.meta.url));

export function r(path: string) {
	return resolve(__dirname,"..","..",path);
}
async function run() {
	var protobuf=(await import('protobufjs') as any as {default: typeof import("protobufjs");}).default;
	let root=await protobuf.load(r("protobuf/bin0.proto"));
	return parse_types(root);
}
run();


async function parse_types(root: Root): Promise<void> {
	let file=await readFile(r("binary/bin0.txt"));
	let token_enc=file.toString();
	let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
	const text=atob(base64_enc);
	const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
	let obj=useTypeA(root,token_binary);
	let token_binary_2=get_token_data(obj.token1,r);
	let id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	console.log('base64(A.token1).typeid=%o',btoa(String.fromCharCode.apply("",Array.from(id_arr))).replaceAll("=",""));
	id_arr=new Uint8Array(token_binary.slice(4,7).buffer);
	console.log('base64(A.token1).extra',id_arr);
	let tmp_data=decode_as_type<ProtoBufTypeD>(root,"D",token_binary_2.slice(4));
	let description:DesType=tmp_data.data.description;
	let items=extract_items(description);
	console.log(items[0]);
}
