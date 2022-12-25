import {r} from './r.js';
import {useTypeT1A} from './useTypeT1A.js';
import {useTypeA} from './useTypeA.js';
import {protobuf_api} from '../protobuf_api.js';

export async function parse_types(): Promise<void> {
	let root=await protobuf_api.load(r("protobuf/bin0.proto"));
	let proto_A_type=root.lookupType("A");
	let obj=await useTypeA(proto_A_type);
	useTypeT1A(root,obj);
}
