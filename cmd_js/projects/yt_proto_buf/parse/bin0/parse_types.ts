import {Bin0Imports} from './Bin0Imports.js';
import {useTypeA} from './useTypeA.js';
import {useTypeD} from './useTypeD.js';

export async function parse_types(imp:Bin0Imports): Promise<void> {
	await useTypeA(imp,useTypeD);
}
