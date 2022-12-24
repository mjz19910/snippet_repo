import {Root} from 'protobufjs';
import {decode_as} from './decode_as.js';
import {into_type} from './into_type.js';

export function decode_as_type<T>(root: Root,type: string,data: Uint8Array) {
	let obj=decode_as(root,type,data);
	return into_type<{},T>(obj);
}
