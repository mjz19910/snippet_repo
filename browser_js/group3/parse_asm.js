
let n_registers=[];
/** @arg {string} n */
function pi(n) {
	return parseInt(n,16);
}
function main() {
	//cspell:words regflags
	let ar="55 8b ec 8a 4d 08 0f b6 c1 05 4b ff ff ff 83 f8 05 77 1c ff 24 85 28 fa 9c 66 b8 10 00 00 00 5d c3 b8 20 00 00 00 5d c3 b8 40 00 00 00 5d c3 33 c0 3a 0c c5 19 b8 9f 66 72 09 3a 0c c5 1a b8 9f 66 76 0a 40 83 f8 12 72 e8 33 c0 5d c3 66 8b 04 c5 1e b8 9f 66 5d c3".split(" ");
	let map_regflags=["eax","ecx","edx","ebx","esp","ebp","esi","edi"];
	let reg8=["al","cl","dl","bl","ah","ch","dh","bh"];
	let parser=new ParseAsm(map_regflags,reg8,ar);
	parser;
}
class ParseAsm {
	/** @arg {string[]} map_regflags @arg {string[]} reg8 @arg {string[]} ar */
	constructor(map_regflags,reg8,ar) {
		this.map_regflags=map_regflags;
		this.reg8=reg8;
		this.instructions=ar;
	}
	/** @arg {string[]} ar */
	"8b"(ar) {
		ar;
		//mov
	}
	/** @arg {string[]} ar */
	"83"(ar) {
		//add & cmp
		// cur 83 7e 08 00
		var num=parseInt(ar[1],16);
		let af=num&0x7;
		let has_reg_displacement=num&0x40;
		let m2=(num>>3)&0x7;
		let rest=(num>>6);
		console.log("mrm8 "+af+" "+m2+" "+rest);
		n_registers.push(ar[0],ar[1],ar[2],ar[3]);
		let dist=ar[2];
		let no_reg=0;
		if(no_reg==15) {
			let val=ar[3];
			console.log("cmp ["+this.map_regflags[af]+"+"+dist+"],"+val);
			return ar.slice(4);
		}
		if(no_reg==29) {
			console.log("sub "+this.map_regflags[af]+","+dist);
			return ar.slice(3);
		}
		if(!has_reg_displacement) {
			console.log("add "+this.map_regflags[af]+","+dist);
		} else {
			console.log("add "+"["+this.map_regflags[af]+"],"+dist);
		}
		return ar.slice(3);
	}
	/** @arg {string[]} ar */
	"80"(ar) {
		//cmp
		var num=parseInt(ar[1],16);
		let af=num&0x7;
		let dist=ar[2];
		let is_ptr=0;
		let offsets=0;
		if((num&0x80)==0x80) {
			is_ptr=1;
			console.log("cmp is_ptr",is_ptr);
		}
		if((num&0x40)==0x40) {
			offsets=1;
			console.log("cmp offsets",offsets);
		}
		if((num&0xc0)==0xc0) {
			console.log("cmp "+this.map_regflags[af]+","+dist);
		} else {
			console.log("cmp "+"["+this.map_regflags[af]+"],"+dist);
		}
		return ar.slice(4);
	}
	/** @arg {string[]} ar */
	"72"(ar) {
		var num=parseInt(ar[1],16);
		if(num>0x80) {} else {
			console.log("jb cip+"+ar[1]);
		}
		return ar.slice(2);
	}
	/** @arg {string[]} ar */
	"8a"(ar) {
		//mov
		var num=parseInt(ar[1],16);
		let af=num&0x7;
		let bf=((num-af)/8)&7;
		let rest=(num-bf*8-af)/8/8;
		if(rest==3) {
			console.log("mov "+this.map_regflags[bf]+","+this.map_regflags[af]);
			return ar.slice(2);
		}
		if(rest) {
			let dist=ar[2];
			let ptr="byte ptr ss:["+this.map_regflags[af]+"+"+dist+"]";
			console.log("mov "+this.reg8[bf]+","+ptr);
			return ar.slice(3);
		} else {
			if(af==0x4) {
				// cspell:words modrm
				console.log("modrm");
			}
			if(af==5) {
				console.log("mov "+this.map_regflags[bf]+",["+[ar[5],ar[4],ar[3],ar[2]].join("")+"]");
				return ar.slice(2+4);
			}
			let ptr="???";
			console.log("mov "+this.map_regflags[af]+","+ptr);
			return ar.slice(2);
		}
	}
	/** @arg {string[]} ar */
	parse_stack(ar) {
		let num=parseInt(ar[0],16);
		let af=num&0x7;
		if(num&0x8) {
			console.log("pop "+this.map_regflags[af]);
		} else {
			console.log("push "+this.map_regflags[af]);
		}
		return ar.slice(1);
	}
	/** @arg {string[]} ar @arg {number} num op>=0xb0 and op<0xc0 */
	parse_mov_b(ar,num) {
		let af=num&0x7;
		let big_register=num&0x8;
		if(big_register) {
			console.log("mov "+this.map_regflags[af]+","+[ar[4],ar[3],ar[2],ar[1]].join(""));
			return ar.slice(5);
		} else {
			console.log(ar[0]);
			throw "NYI";
		}
	}
	jumps=["jo","jno","jb","jae","je","jne","jbe","ja","js"];
	/** @arg {string[]} ar @arg {number} num */
	parse_jumping(ar,num) {
		let target=parseInt(ar[1],16);
		let trg=num-0x70;
		if(target>=0x80) {
			console.log(this.jumps[trg]+" -"+(target+2).toString(16));
		} else {
			console.log(this.jumps[trg]+" "+(target+2).toString(16));
		}
		return ar.slice(2);
	}
	/** @arg {string[]} ar */
	parse_test(ar) {
		let mrm=parseInt(ar[1],16);
		let modrm=mrm&0x7;
		let m2=(mrm>>3)&0x7;
		console.log("test "+this.map_regflags[modrm]+","+this.map_regflags[m2]);
		return ar.slice(2);
	}
	/** @arg {string[]} ar @arg {number} sz */
	parse_push_1(ar,sz) {
		if(sz==1) {
			console.log("push "+ar.slice(1,1));
		}
		if(sz==2) {}
		if(sz==4) {
			console.log("push "+ar.slice(1,5).reverse().join(""));
		}
		return ar.slice(1+sz);
	}
	// @ts-ignore
	do_asm_reg(p,n) {
		console.log(p+" "+"dword ptr "+this.map_regflags[n]);
		return 1;
	}
	// @ts-ignore
	do_asm_ptr(p,n) {
		console.log(p+" "+"dword ptr ["+this.map_regflags[n]+"]");
		return 1;
	}
	/** @arg {string} d */
	// @ts-ignore
	do_asm_pd(p,n,d) {
		let num=parseInt(d,16);
		if(num>0x80) {
			// @ts-ignore
			console.log(p+" dword ptr ["+map_regflags[n]+"-"+(num-0x80)+"]");
		} else {
			// @ts-ignore
			console.log(p+" dword ptr ["+map_regflags[n]+"+"+d+"]");
		}
		return 0;
	}
	//cspell:words do_asm_fptrd fword
	// @ts-ignore
	do_asm_fptrd(p,n,d) {
		let num=parseInt(d,16);
		if(num>0x80) {
			// @ts-ignore
			console.log(p+" far fword ptr ["+map_regflags[n]+"-"+(d-0x80)+"]");
		} else {
			// @ts-ignore
			console.log(p+" far fword ptr ["+map_regflags[n]+"+"+d+"]");
		}
		return 0;
	}
	/** @arg {string[]} ar */
	// @ts-ignore
	parse_ff(ar) {
		var l;
		let next=pi(ar[1]);
		let modrm=next&0x7;
		let rest=(next>>3);
		if(rest==0) {
			// @ts-ignore
			l=do_asm_ptr("inc",modrm);
		}
		if(rest==1) {
			// @ts-ignore
			l=do_asm_ptr("dec",modrm);
		}
		if(rest==2) {
			console.log("call dword ptr ["+[ar[5],ar[4],ar[3],ar[2]].join("")+"]");
			return ar.slice(2+4);
		}
		if(rest==3) {
			// @ts-ignore
			console.log("call far FWORD PTR ["+map_regflags[modrm]+"]");
			l=1;
		}
		if(rest==4) {
			// @ts-ignore
			l=do_asm_ptr("jmp",modrm);
		}
		if(rest==5) {
			// @ts-ignore
			console.log("jmp far FWORD PTR ["+map_regflags[modrm]+"]");
			l=1;
		}
		if(rest==6) {
			// @ts-ignore
			l=do_asm_ptr("push",modrm);
		}
		if(rest==7) {
			throw "invalid m/r";
		}
		if(rest==8) {
			// @ts-ignore
			l=do_asm_pd("inc",modrm,ar[2]);
		}
		if(rest==9) {
			// @ts-ignore
			l=do_asm_pd("dec",modrm,ar[2]);
		}
		if(rest==10) {
			// @ts-ignore
			l=do_asm_pd("call",modrm,ar[2]);
		}
		if(rest==11) {
			// @ts-ignore
			l=do_asm_fptrd("call",modrm,ar[2]);
		}
		if(rest==12) {
			// @ts-ignore
			l=do_asm_pd("jmp",modrm,ar[2]);
		}
		if(rest==13) {
			// @ts-ignore
			l=do_asm_fptrd("jmp",modrm,ar[2]);
		}
		if(rest==14) {
			// @ts-ignore
			l=do_asm_pd("push",modrm,ar[2]);
		}
		if(rest>=15&&rest<24) {
			throw "invalid instruction";
		}
		if(rest==24) {
			// @ts-ignore
			l=do_asm_reg("inc",modrm);
		}
		if(rest==25) {
			// @ts-ignore
			l=do_asm_reg("dec",modrm);
		}
		if(rest==26) {
			// @ts-ignore
			l=do_asm_reg("call",modrm);
		}
		if(rest==27) {
			throw "invalid instruction";
		}
		if(rest==28) {
			// @ts-ignore
			l=do_asm_reg("jmp",modrm);
		}
		if(rest==29) {
			throw "invalid instruction";
		}
		if(rest==30) {
			// @ts-ignore
			l=do_asm_reg("push",modrm);
		}
		if(rest==31) {
			throw "invalid instruction";
		}
		if(l==1) {
			return ar.slice(2);
		}
		if(l==0) {
			return ar.slice(3);
		}
		throw new Error("Unexpected flow");
	}
	/** @arg {string[]} ar */
	parse_0f(ar) {
		let next=pi(ar[1]);
		let mrm=pi(ar[2]);
		let modrm=mrm&0x7;
		let m2=(mrm>>4)&0x7;
		if(modrm==7) {
			// @ts-ignore
			console.log(map_regflags[m2],map_regflags[modrm]);
		} else {
			// @ts-ignore
			console.log(map_regflags[m2],map_regflags[modrm]);
		}
		//spell:words movzx
		if(next==0xb6) {
			if(modrm==7) {
				// @ts-ignore
				console.log("movzx "+map_regflags[mrm>>8&0x7]+",["+map_regflags[next&0x7]);
				let complete=false;
				if(!complete) {
					throw new Error("TODO: not sure about movzx");
				}
				return ar.slice(4);
			}
			if(modrm==1) {
				// @ts-ignore
				console.log("movzx "+map_regflags[mrm>>8&0x7]+","+reg8[modrm]);
				return ar.slice(3);
			}
			console.log("movzx:",m2,modrm);
			return ar.slice(3);
		}
		// @ts-ignore
		console.log("unk "+map_regflags[modrm]+","+map_regflags[m2]);
		return ar.slice(3);
	}
	/** @arg {string[]} ar 0x8b */
	parse_mov_1(ar) {
		var num=parseInt(ar[1],16);
		let af=num&0x7;
		let bf=((num-af)/8)&7;
		let rest=(num-bf*8-af)/8/8;
		if(rest==3) {
			// @ts-ignore
			console.log("mov "+map_regflags[bf]+","+map_regflags[af]);
			return ar.slice(2);
		}
		if(rest) {
			let dist=ar[2];
			// @ts-ignore
			let ptr="["+map_regflags[af]+"+"+dist+"]";
			// @ts-ignore
			console.log("mov "+map_regflags[bf]+","+ptr);
			return ar.slice(3);
		} else {
			if(af==0x4) {
				console.log("modrm");
			}
			if(af==5) {
				// @ts-ignore
				console.log("mov "+map_regflags[bf]+",["+[ar[5],ar[4],ar[3],ar[2]].join("")+"]");
				return ar.slice(2+4);
			}
			let ptr="???";
			// @ts-ignore
			console.log("mov "+map_regflags[af]+","+ptr);
			return ar.slice(2);
		}
	}
	/** @arg {string[]} ar 0x8c */
	parse_mov_2(ar) {
		ar;
	}
	/** @arg {string[]} ar 0x8d */
	parse_lea_1(ar) {
		ar;
	}
	/** @arg {string[]} ar 0x8e */
	parse_mov_3(ar) {
		ar;
	}
	/** @arg {string[]} ar 0x8f */
	parse_pop_1(ar) {
		ar;
	}
	/** @arg {string[]} ar 0x90 */
	parse_xchg(ar) {
		console.log("nop");
		return ar.slice(1);
	}
	/** @arg {string[]} ar 0x6a */
	parse_push_2(ar) {
		let num=pi(ar[1]);
		if(num>0x7f) {
			console.log("push "+(num|0xffffff00).toString(16));
		} else {
			console.log("push "+num.toString(16));
		}
		return ar.slice(2);
	}
	/** @arg {string[]} ar */
	nn(ar) {
		return parseInt(ar[1],16);
	}
	/** @arg {string[]} ar @arg {number} i */
	ni(ar,i) {
		return parseInt(ar[i],16);
	}
	/** @arg {string[]} ar @arg {number} off */
	id(ar,off) {
		let dword=[];
		dword.push(ar[off+0]);
		dword.push(ar[off+1]);
		dword.push(ar[off+2]);
		dword.push(ar[off+3]);
		return dword.reverse().join("");
	}
	/** @arg {string[]} ar */
	parse_add_1(ar) {
		let dword_str=this.id(ar,1);
		let dword_imm=-(0x100000000-parseInt(dword_str,16));
		dword_imm;
		console.log(`add eax, `+dword_str);
		return ar.slice(5);
	}
	fn() {
		let ar=this.instructions;
		try {
			if(1) {
				let arlen=ar.length;
				let i=0;
				while(i<arlen) {
					i++;
					let num=parseInt(ar[0],16);
					//spell:words pusha
					if(num==0x60) {
						console.log("pusha");
						ar=ar.slice(1);
						continue;
					}
					if((num>0x49)&&(num<0x60)) {
						// @ts-ignore
						ar=this.parse_stack(ar);
						continue;
					}
					if(num>=0xb0&&num<0xc0) {
						// @ts-ignore
						ar=this.parse_mov_b(ar,num);
						continue;
					}
					if(num>=0x70&&num<0x80) {
						// @ts-ignore
						ar=this.parse_jumping(ar,num);
						continue;
					}
					if(num==0x88) {
						let next=this.nn(ar);
						let modrm_reg_8=(next>>4)&0x7;
						// @ts-ignore
						console.log("mov ["+map_regflags[next&0x7]+"],"+reg8[modrm_reg_8]);
						ar=ar.slice(2);
						continue;
					}
					if(num==0x68) {
						// @ts-ignore
						ar=parse_push_1(ar,4);
						continue;
					}
					if(num==0x6a) {
						ar=this.parse_push_2(ar);
						continue;
					}
					if(num==0x0e) {}
					if(num==0x16) {}
					if(num==0x1e) {}
					if(num==0x06) {}
					if(num==0x0f) {
						ar=this.parse_0f(ar);
						continue;
					}
					if(num>=0x50&&num<0x60) {
						throw "NYI";
					}
					if(num==0xff) {
						ar=this.parse_ff(ar);
						continue;
					}
					if(num==0x90) {
						console.log("nop");
						ar=ar.slice(1);
						continue;
					}
					if(num>0x90&&num<0xa0) {}
					if(num==0xc3) {
						console.log("ret");
						ar=ar.slice(1);
						continue;
					}
					if(num==0xcd) {
						console.log("int "+ar[1]);
						ar=ar.slice(2);
						continue;
					}
					if(num==0x85) {
						// @ts-ignore
						ar=this.parse_test(ar);
						continue;
					}
					if(num==0x8b) {
						ar=this.parse_mov_1(ar);
						continue;
					}
					if(num==0x05) {
						ar=this.parse_add_1(ar);
					}
					// @ts-ignore
					if(!parse_obj[ar[0]]) {
						console.log(ar.slice(0,15).join(" "));
						break;
					}
					// @ts-ignore
					ar=parse_obj[ar[0]](ar);
				}
			} else {
				throw ar[0];
			}
		} catch(e) {
			console.log(e);
		} finally {}
	}
// @ts-ignore
}
// @ts-ignore
fn(ar);
