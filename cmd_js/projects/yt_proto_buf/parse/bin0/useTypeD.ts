import {Root} from 'protobufjs';
import {decode_as_type} from './decode_as_type.js';
import {DesType} from './DesType.js';
import {extract_items} from './extract_items.js';
import {get_token_data} from './get_token_data.js';
import {ProtoBufTypeA} from './ProtoBufTypeA.js';
import {ProtoBufTypeD} from './ProtoBufTypeD.js';
import {r} from './r.js';

export function useTypeD(root: Root,obj: ProtoBufTypeA) {
	let token_binary=get_token_data(obj.token1,r);
	let id_arr=new Uint8Array(token_binary.slice(0,4).buffer);
	console.log('typeid=%o for base64(A.token1)',btoa(String.fromCharCode.apply("",Array.from(id_arr))).replaceAll("=",""));
	id_arr=new Uint8Array(token_binary.slice(4,7).buffer);
	console.log('base64(A.token1).extra',id_arr);
	let tmp_data=decode_as_type<ProtoBufTypeD>(root,"D",token_binary.slice(4));
	let description: DesType=tmp_data.data.description;
	let items=extract_items(description);
	console.log(items[0]);
}
