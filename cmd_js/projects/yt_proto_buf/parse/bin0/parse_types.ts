import {readFile} from 'fs/promises';
import {r} from './r.js';
import {useTypeA} from './useTypeA.js';
import {useTypeD} from './useTypeD.js';

export async function parse_types(protobuf: typeof import("protobufjs")): Promise<void> {
	let root=await protobuf.load(r("protobuf/bin0.proto"));
	let bin_file=await readFile(r("binary/bin0.txt"));
	let token_enc=bin_file.toString();
	let obj=useTypeA(root,token_enc);
	useTypeD(obj,root);
}
