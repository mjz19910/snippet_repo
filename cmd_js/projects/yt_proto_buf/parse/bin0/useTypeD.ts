import {Root} from 'protobufjs';
import {as_base64_typeid} from './as_base64_typeid.js';
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
	let typeid=as_base64_typeid(id_arr,0);
	console.log('typeid=%o for base64(A.token1)',typeid);
	id_arr=new Uint8Array(token_binary.slice(4,7).buffer);
	let id_arr_js=Array.from(id_arr);
	let ext_id_arr=[0].concat(id_arr_js);
	let id_arr_2=new Uint8Array(ext_id_arr);
	typeid=as_base64_typeid(id_arr_2,1);
	console.log("extra=%o for base64(A.token1)",typeid);
	let tmp_data=decode_as_type<ProtoBufTypeD>(root,"D",token_binary.slice(4));
	let description: DesType=tmp_data.data.description;
	let items=extract_items(description);
	console.log(items[0]);
}
