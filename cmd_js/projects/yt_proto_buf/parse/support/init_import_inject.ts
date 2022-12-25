import {default as protobufjs} from "protobufjs";

export function init_import_inject(arg0: {protobufjs: typeof protobufjs;}) {
	const {
		Reader,
	}=arg0.protobufjs;
	let pad="";
	const my_console=new class {
		pad_log(message: string, ...data: any[]) {
			console.log(pad+message, ...data);
		}
	}
	Reader.prototype.skipType=function(wireType: number) {
		my_console.pad_log("wire skip",wireType);
		switch(wireType) {
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
				pad+=" ";
				let enterType=wireType;
				my_console.pad_log("enter", wireType);
				while((wireType=this.uint32()&7)!==4) {
					this.skipType(wireType);
				}
				my_console.pad_log("leave", enterType);
				break;
			case 5:
				this.skip(4);
				break;

			/* istanbul ignore next */
			default:
				throw Error("invalid wire type "+wireType+" at offset "+this.pos);
		}
		return this;
	};
}
