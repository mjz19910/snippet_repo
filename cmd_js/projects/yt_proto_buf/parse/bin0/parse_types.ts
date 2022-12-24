import {readFile} from 'fs/promises';
import {Bin0Imports} from './Bin0Imports.js';
import {r} from './r.js';
import {useTypeA} from './useTypeA.js';
import {useTypeD} from './useTypeD.js';

export async function parse_types(imp:Bin0Imports): Promise<void> {
	const {
		protobuf,
	}=imp;
	let root=await protobuf.load(r("protobuf/bin0.proto"));
	let bin_file=await readFile(r("binary/bin0.txt"));
	let token_enc=bin_file.toString();
	let obj=useTypeA(root,token_enc);
	useTypeD(obj,root);
}
