import {default as protobufjs} from "protobufjs";

export function init_import_inject(arg0: {protobufjs: typeof protobufjs;}) {
	const {
		Reader,
	}=arg0.protobufjs;
	Reader.prototype.skipType=function(wireType) {
		console.log("wire skip", wireType);
		switch (wireType) {
			case 0:
					this.skip();
					break;
			case 1:
					this.skip(8);
					break;
			case 2:
					this.skip(this.uint32());
					break;
			case 3:
					while ((wireType = this.uint32() & 7) !== 4) {
							this.skipType(wireType);
					}
					break;
			case 5:
					this.skip(4);
					break;

			/* istanbul ignore next */
			default:
					throw Error("invalid wire type " + wireType + " at offset " + this.pos);
	}
	return this;
	}
}
