import {Bin0Imports} from './Bin0Imports.js';

export function load_imports(in_module: {}): Bin0Imports {
	var protobuf=(in_module as {default: typeof import("protobufjs");}).default;
	return {protobuf};
}
