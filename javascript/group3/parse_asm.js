//cspell:words regflags modrm modr
let ar="55 8b ec 8a 4d 08 0f b6 c1 05 4b ff ff ff 83 f8 05 77 1c ff 24 85 28 fa 9c 66 b8 10 00 00 00 5d c3 b8 20 00 00 00 5d c3 b8 40 00 00 00 5d c3 33 c0 3a 0c c5 19 b8 9f 66 72 09 3a 0c c5 1a b8 9f 66 76 0a 40 83 f8 12 72 e8 33 c0 5d c3 66 8b 04 c5 1e b8 9f 66 5d c3".split(" ");
let map_regflags=["eax","ecx","edx","ebx","esp","ebp","esi","edi"];
let reg8=["al","cl","dl","bl","ah","ch","dh","bh"];
let parse_obj=new class ParseAsm {
	/**
	 * @param {string[]} ar
	 */
	"8b"(ar) {
		ar;
		//mov
	}
	/**
	 * @param {string[]} ar
	 */
	"83"(ar) {
		//add & cmp
		// cur 83 7e 08 00
		var num=parseInt(ar[1],16);
		let af=num&0x7;
		let has_reg_displacement=num&0x40;
		let m2=(num>>3)&0x7;
		let rest=(num>>6);
		console.log("mrm8 "+af+" "+m2+" "+rest);
		n_regs.push(ar[0],ar[1],ar[2],ar[3]);
		let dist=ar[2];
		let no_reg=0;
		if(no_reg==15) {
			let val=ar[3];
			console.log("cmp ["+map_regflags[af]+"+"+dist+"],"+val);
			return ar.slice(4);
		}
		if(no_reg==29) {
			console.log("sub "+map_regflags[af]+","+dist);
			return ar.slice(3);
		}
		if(!has_reg_displacement) {
			console.log("add "+map_regflags[af]+","+dist);
		} else {
			console.log("add "+"["+map_regflags[af]+"],"+dist);
		}
		return ar.slice(3);
	}
	/**
	 * @param {string[]} ar
	 */
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
			console.log("cmp "+map_regflags[af]+","+dist);
		} else {
			console.log("cmp "+"["+map_regflags[af]+"],"+dist);
		}
		return ar.slice(4);
	}
	/**
	 * @param {string[]} ar
	 */
	"72"(ar) {
		var num=parseInt(ar[1],16);
		if(num>0x80) {} else {
			console.log("jb cip+"+ar[1]);
		}
		return ar.slice(2);
	};
	/**
	 * @param {string[]} ar
	 */
	"8a"(ar) {
		//mov
		var num=parseInt(ar[1],16);
		let af=num&0x7;
		let bf=((num-af)/8)&7;
		let rest=(num-bf*8-af)/8/8;
		if(rest==3) {
			console.log("mov "+map_regflags[bf]+","+map_regflags[af]);
			return ar.slice(2);
		}
		if(rest) {
			let dist=ar[2];
			let ptr="["+map_regflags[af]+"+"+dist+"]";
			console.log("mov "+reg8[bf]+","+ptr);
			return ar.slice(3);
		} else {
			if(af==0x4) {
				console.log("modrm");
			}
			if(af==5) {
				console.log("mov "+map_regflags[bf]+",["+[ar[5],ar[4],ar[3],ar[2]].join("")+"]");
				return ar.slice(2+4);
			}
			let ptr="???";
			console.log("mov "+map_regflags[af]+","+ptr);
			return ar.slice(2);
		}
	};
};
let n_regs=[];
/**
 * @param {string} n
 */
function pi(n) {
	return parseInt(n,16);
};
/**
 * @param {string[]} ar
 */
function parse_stack(ar) {
	let num=parseInt(ar[0],16);
	let af=num&0x7;
	if(num&0x8) {
		console.log("pop "+map_regflags[af]);
	} else {
		console.log("push "+map_regflags[af]);
	}
	return ar.slice(1);
}
/**
 * @param {string[]} ar
 */
function parse_mov_b(ar,num) {
	let af=num&0x7;
	let big_regs=num&0x8;
	if(big_regs) {
		console.log("mov "+map_regflags[af]+","+[ar[4],ar[3],ar[2],ar[1]].join(""));
		return ar.slice(5);
	} else {
		console.log(ar[0]);
		throw "NYI";
	}
}
let jumps=["jo","jno","jb","jae","je","jne","jbe","ja","js"];
/**
 * @param {string[]} ar
 */
function parse_jumping(ar,num) {
	let target=parseInt(ar[1],16);
	let trg=num-0x70;
	if(target>=0x80) {
		console.log(jumps[trg]+" -"+(target+2).toString(16));
	} else {
		console.log(jumps[trg]+" "+(target+2).toString(16));
	}
	return ar.slice(2);
};
/**
 * @param {string[]} ar
 */
function parse_test(ar) {
	let mrm=parseInt(ar[1],16);
	let modrm=mrm&0x7;
	let m2=(mrm>>3)&0x7;
	console.log("test "+map_regflags[modrm]+","+map_regflags[m2]);
	return ar.slice(2);
};
/**
 * @param {string[]} ar
 */
function parse_push_1(ar,sz) {
	if(sz==1) {
		console.log("push "+ar.slice(1,1));
	}
	if(sz==2) {}
	if(sz==4) {
		console.log("push "+ar.slice(1,5).reverse().join(""));
	}
	return ar.slice(1+sz);
};
function do_asm_reg(p,n) {
	console.log(p+" "+"dword ptr "+map_regflags[n]);
	return 1;
};
function do_asm_ptr(p,n) {
	console.log(p+" "+"dword ptr ["+map_regflags[n]+"]");
	return 1;
};
/** @arg {string} d */
function do_asm_pd(p,n,d) {
	let num=parseInt(d,16);
	if(num>0x80) {
		console.log(p+" dword ptr ["+map_regflags[n]+"-"+(num-0x80)+"]");
	} else {
		console.log(p+" dword ptr ["+map_regflags[n]+"+"+d+"]");
	}
	return 0;
};
//cspell:words do_asm_fptrd fword
function do_asm_fptrd(p,n,d) {
	let num=parseInt(d,16);
	if(num>0x80) {
		console.log(p+" far fword ptr ["+map_regflags[n]+"-"+(d-0x80)+"]");
	} else {
		console.log(p+" far fword ptr ["+map_regflags[n]+"+"+d+"]");
	}
	return 0;
}
/**
 * @param {string[]} ar
 */
function parse_ff(ar) {
	var l;
	let next=pi(ar[1]);
	let modrm=next&0x7;
	let rest=(next>>3);
	if(rest==0) {
		l=do_asm_ptr("inc",modrm);
	}
	if(rest==1) {
		l=do_asm_ptr("dec",modrm);
	}
	if(rest==2) {
		console.log("call dword ptr ["+[ar[5],ar[4],ar[3],ar[2]].join("")+"]");
		return ar.slice(2+4);
	}
	if(rest==3) {
		console.log("call far FWORD PTR ["+map_regflags[modrm]+"]");
		l=1;
	}
	if(rest==4) {
		l=do_asm_ptr("jmp",modrm);
	}
	if(rest==5) {
		console.log("jmp far FWORD PTR ["+map_regflags[modrm]+"]");
		l=1;
	}
	if(rest==6) {
		l=do_asm_ptr("push",modrm);
	}
	if(rest==7) {
		throw "invalid m/r";
	}
	if(rest==8) {
		l=do_asm_pd("inc",modrm,ar[2]);
	}
	if(rest==9) {
		l=do_asm_pd("dec",modrm,ar[2]);
	}
	if(rest==10) {
		l=do_asm_pd("call",modrm,ar[2]);
	}
	if(rest==11) {
		l=do_asm_fptrd("call",modrm,ar[2]);
	}
	if(rest==12) {
		l=do_asm_pd("jmp",modrm,ar[2]);
	}
	if(rest==13) {
		l=do_asm_fptrd("jmp",modrm,ar[2]);
	}
	if(rest==14) {
		l=do_asm_pd("push",modrm,ar[2]);
	}
	if(rest>=15&&rest<24) {
		throw "invalid instruction";
	}
	if(rest==24) {
		l=do_asm_reg("inc",modrm);
	}
	if(rest==25) {
		l=do_asm_reg("dec",modrm);
	}
	if(rest==26) {
		l=do_asm_reg("call",modrm);
	}
	if(rest==27) {
		throw "invalid instruction";
	}
	if(rest==28) {
		l=do_asm_reg("jmp",modrm);
	}
	if(rest==29) {
		throw "invalid instruction";
	}
	if(rest==30) {
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
};
/**
 * @param {string[]} ar
 */
function parse_0f(ar) {
	let next=pi(ar[1]);
	let mrm=pi(ar[2]);
	let modrm=mrm&0x7;
	let m2=(mrm>>4)&0x7;
	if(modrm==7) {
		console.log(map_regflags[m2],map_regflags[modrm]);
	} else if(modrm==1) {
		console.log(map_regflags[m2],reg8[modrm]);
	}
	//spell:words movzx
	if(next==0xb6) {
		if(modrm==7) {
			console.log(ar);
			console.log("movzx "+map_regflags[mrm>>8&0x7]+",["+map_regflags[next&0x7]);
			throw "n";
			return ar.slice(4);
		}
		console.log("movzx:",m2,modrm);
		return ar.slice(3);
	}
	console.log("unk "+map_regflags[modrm]+","+map_regflags[m2]);
	return ar.slice(3);
};
/**
 * @param {string[]} ar
 * 0x8b
 */
function parse_mov_1(ar) {
	var num=parseInt(ar[1],16);
	let af=num&0x7;
	let bf=((num-af)/8)&7;
	let rest=(num-bf*8-af)/8/8;
	if(rest==3) {
		console.log("mov "+map_regflags[bf]+","+map_regflags[af]);
		return ar.slice(2);
	}
	if(rest) {
		let dist=ar[2];
		let ptr="["+map_regflags[af]+"+"+dist+"]";
		console.log("mov "+map_regflags[bf]+","+ptr);
		return ar.slice(3);
	} else {
		if(af==0x4) {
			console.log("modrm");
		}
		if(af==5) {
			console.log("mov "+map_regflags[bf]+",["+[ar[5],ar[4],ar[3],ar[2]].join("")+"]");
			return ar.slice(2+4);
		}
		let ptr="???";
		console.log("mov "+map_regflags[af]+","+ptr);
		return ar.slice(2);
	}
};
/**
 * @param {string[]} ar
 * 0x8c
 */
function parse_mov_2(ar) {
	ar;
};
/**
 * @param {string[]} ar
 * 0x8d
 */
function parse_lea_1(ar) {
	ar;
};
/**
 * @param {string[]} ar
 * 0x8e
 */
function parse_mov_3(ar) {
	ar;
};
/**
 * @param {string[]} ar
 * 0x8f
 */
function parse_pop_1(ar) {
	ar;
};
/**
 * @param {string[]} ar
 * 0x90
 */
function parse_xchg(ar) {
	console.log("nop");
	return ar.slice(1);
}
/**
 * @param {string[]} ar
 * 0x6a
 */
function parse_push_2(ar) {
	let num=pi(ar[1]);
	if(num>0x7f) {
		console.log("push "+(num|0xffffff00).toString(16));
	} else {
		console.log("push "+num.toString(16));
	}
	return ar.slice(2);
};
/**
 * @param {string[]} ar
 */
function nn(ar) {
	return parseInt(ar[1],16);
}
/**
 * @param {string[]} ar
 */
function ni(ar,i) {
	return parseInt(ar[i],16);
};
/**
 * @param {string[]} ar
 */
function fn(ar) {
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
					ar=parse_stack(ar);
					continue;
				}
				if(num>=0xb0&&num<0xc0) {
					ar=parse_mov_b(ar,num);
					continue;
				}
				if(num>=0x70&&num<0x80) {
					ar=parse_jumping(ar,num);
					continue;
				}
				if(num==0x88) {
					let next=nn(ar);
					let modr=(next>>4)&0x7;
					console.log("mov ["+map_regflags[next&0x7]+"],"+reg8[modr]);
					ar=ar.slice(2);
					continue;
				}
				if(num==0x68) {
					ar=parse_push_1(ar,4);
					continue;
				}
				if(num==0x6a) {
					ar=parse_push_2(ar);
					continue;
				}
				if(num==0x0e) {}
				if(num==0x16) {}
				if(num==0x1e) {}
				if(num==0x06) {}
				if(num==0x0f) {
					ar=parse_0f(ar);
					continue;
				}
				if(num>=0x50&&num<0x60) {
					throw "NYI";
				}
				if(num==0xff) {
					ar=parse_ff(ar);
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
					ar=parse_test(ar);
					continue;
				}
				if(num==0x8b) {
					ar=parse_mov_1(ar);
					continue;
				}
				if(!parse_obj[ar[0]]) {
					console.log(ar);
					break;
				}
				ar=parse_obj[ar[0]](ar);
			}
		} else {
			throw ar[0];
		}
	} catch(e) {
		console.log(e);
	} finally {}
}
fn(ar);
