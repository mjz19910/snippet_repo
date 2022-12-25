import {as_base64_typeid} from './as_base64_typeid.js';
import {Root} from 'protobufjs';
import {decode_as_type} from './decode_as_type.js';
import {DesType} from './DesType.js';
import {extract_items} from './extract_items.js';
import {get_token_data} from './get_token_data.js';
import {ProtoBufTypeA,ProtoBufTypeT1A} from './parse_types';


export function useTypeT1A(root: Root,obj: ProtoBufTypeA) {
	let token_binary=get_token_data(obj.token1);
	let id_arr=new Uint8Array(token_binary.subarray(0,4));
	let typeid=as_base64_typeid(id_arr,0);
	console.log('typeid=%o for base64(A.token1)',typeid);
	let tmp_data=decode_as_type<ProtoBufTypeT1A>(root,"t1_A",token_binary.subarray(4));
	let description: DesType=tmp_data.data.description;
	let items=extract_items(description);
	console.log(items);
	console.log("placeholder length",description.items[0].alt_6.length);
}
