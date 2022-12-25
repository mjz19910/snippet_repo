import {default as protobufjs} from "protobufjs";

const pad_with="   ";
let pad="";

export function increase_padding() {
	let prev=pad;
	pad+=pad_with;
	return () => {
		pad=prev;
	};
}

class MyConsole {
	paused=false;
	cache: [string,...any[]][]=[];
	unpause(scope: () => void) {
		if(!this.paused) {
			scope();
			return;
		}
		this.paused=false;
		scope();
		this.paused=true;
	}
	pad_log(message: string,...data: any[]) {
		if(this.paused) {
			this.cache.push([message,...data]);
			return;
		}
		console.log(pad+message,...data);
	}
	scope_id_max=1;
	start_stack=new Array<[number,number,boolean]>;
	pause(scope: (resume: ()=>void) => void) {
		let scope_id=this.scope_id_max++;
		let enter_len=this.start_stack.length;
		let start_pause_length=this.cache.length;
		this.start_stack.push([scope_id,start_pause_length,this.paused]);
		this.paused=true;
		scope(() => {
			let scope=this.start_stack.at(-1);
			if(scope) {
				this.paused=scope[2];
			}
			this.on_resume();
			x: if(scope) {
				if(scope[0]!==scope_id) {
					break x;
				}
				this.cache.length=scope[1];
				if(this.start_stack.length>enter_len) {
					this.start_stack.length=enter_len;
				}
			} else {
				this.paused==false;
				this.cache.length=start_pause_length;
			}
		});
	}
	on_resume() {
		for(let msg of this.cache) {
			this.pad_log(...msg);
		}
	}
	clear_cache() {
		let scope=this.start_stack.at(-1);
		if(scope) {
			this.cache.length=scope[1];
		} else {
			this.cache.length=0;
		}
	}
}
export const my_console=new MyConsole;

function debug_l_delim_message() {

}

export function init_import_inject(arg0: {protobufjs: typeof protobufjs;}) {
	const {
		Reader,
	}=arg0.protobufjs;
	const unk_type=new protobufjs.Type("SkipUnknown");
	Reader.prototype.skipType=function(wireType: number) {
		let console=my_console;
		let prev_pad;
		let field_id=this.buf[this.pos-1]>>3;
		switch(wireType) {
			case 0:
				console.pad_log("\"field %o: VarInt\": ?",field_id);
				this.skip();
				break;
			case 1:
				console.pad_log("\"field %o 64-Bit\": ?",field_id);
				this.skip(8);
				break;
			case 2:
				let size=this.uint32();
				if(size>0) {
					console.pause((resume)=>{
					let has_error=false;
					try {
						unk_type.decode(this.buf.subarray(this.pos,this.pos+size));
					} catch {
						has_error=true;
					}
					if(!has_error) {
					prev_pad=pad;
					console.unpause(() => {
						console.pad_log("\"field %o: L-delim message(length=%o)\": {",field_id,size);
					});
					pad+=pad_with;
					resume();
					pad=prev_pad;
					console.pad_log("}");
					} else if(has_error) {
						console.pad_log("\"field %o L-delim string\": %o",field_id,this.buf.subarray(this.pos,this.pos+size).toString());
					}

					});
				} else {
					console.pad_log("\"field %o L-delim string\": %o",field_id,"");
				}
				this.skip(size);
				break;
			case 3:
				prev_pad=pad;
				console.pad_log("oneof: {",wireType);
				pad+=pad_with;
				while((wireType=this.uint32()&7)!==4) {
					this.skipType(wireType);
				}
				pad=prev_pad;
				console.pad_log("}");
				break;
			case 5:
				console.pad_log("\"field %o: 32-Bit\": ?",field_id);
				this.skip(4);
				break;

			/* istanbul ignore next */
			default:
				throw Error("invalid wire type "+wireType+" at offset "+this.pos);
		}
		return this;
	};
}
