import {default as protobufjs} from "protobufjs";

export function init_import_inject(arg0: {protobufjs: typeof protobufjs;}) {
	const {
		Reader,
	}=arg0.protobufjs;
	let pad="\t";
	const my_console=new class {
		pad_log(message: string, ...data: any[]) {
			console.log(pad+message, ...data);
		}
	}
	Reader.prototype.skipType=function(wireType: number) {
		switch(wireType) {
			case 0:
				my_console.pad_log("wireType=%o for varint",wireType);
				this.skip();
				break;
			case 1:
				my_console.pad_log("wireType=%o for %o bytes",wireType,8);
				this.skip(8);
				break;
			case 2:
				let size=this.uint32();
				my_console.pad_log("wireType=%o for %o bytes",wireType,size);
				this.skip(size);
				break;
			case 3:
				let prev_pad=pad;
				pad+=" ";
				let enterType=wireType;
				my_console.pad_log("enter", wireType);
				while((wireType=this.uint32()&7)!==4) {
					this.skipType(wireType);
				}
				my_console.pad_log("leave", enterType);
				pad=prev_pad;
				break;
			case 5:
				my_console.pad_log("wireType=%o for %o bytes",wireType,4);
				this.skip(4);
				break;

			/* istanbul ignore next */
			default:
				throw Error("invalid wire type "+wireType+" at offset "+this.pos);
		}
		return this;
	};
}
