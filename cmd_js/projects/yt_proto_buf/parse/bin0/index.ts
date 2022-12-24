import {parse_types} from './parse_types.js';
async function run() {
	var protobuf=(await import('protobufjs') as any as {default: typeof import("protobufjs");}).default;
	return parse_types(protobuf);
}
run();
