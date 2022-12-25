import {Bin0Imports} from './Bin0Imports.js';
import {r} from './r.js';
import {useTypeT1A} from './useTypeT1A.js';
import {useTypeA} from './useTypeA.js';

export async function parse_types(imp:Bin0Imports): Promise<void> {
	const {
		protobuf,
	}=imp;
	let root=await protobuf.load(r("protobuf/bin0.proto"));
	let proto_A_type=root.lookupType("A");
	let obj=await useTypeA(proto_A_type);
	useTypeT1A(root,obj);
}

