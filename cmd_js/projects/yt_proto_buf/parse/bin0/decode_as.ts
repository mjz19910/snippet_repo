import {Root} from 'protobufjs';



export function decode_as(root: Root,message_type: string|string[],data: Uint8Array) {
	let type=root.lookupType(message_type);
	let message=type.decode(data);
	let obj=type.toObject(message,{
		longs: Number,
	});
	return obj;
}
