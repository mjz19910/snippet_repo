import {default as protobufjs} from "protobufjs";

export function init_import_inject(arg0: {protobufjs: typeof protobufjs;}) {
	let Reader=arg0.protobufjs.Reader;
	const real_skip_type=Reader.prototype.skipType;
	Reader.prototype.skipType=function(wireNumber) {
		console.log("wire skip", wireNumber);
		return real_skip_type.call(this,wireNumber);
	}
	throw new Error("Function not implemented.");
}
