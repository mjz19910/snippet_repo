//cspell:words getargs idents keywordhandlers gethandler mclass fnbody parama
//cspell:words parast parsebody parsebracket notreg charexpr gimuy
//cspell:words Paran Seperator jsonlike Asignment eatnext outobj
//cspell:words newfn sethandler tryblock tryobj
if(typeof window.code=="undefined") {
	window.code="function d(t){return Boolean(t&&t[vr])}";
}
//console.log(util.inspect(this.state.tok[0],{depth:null,maxArrayLength:300}))
var etn=0;
/** @template U @template {U} T @arg {U} e @returns {T} */
function as_cast(e) {
	/** @type {any} */
	let x=e;
	return x;
}
// cspell:ignore parsejs
class parsejs {
	constructor(s) {
		let kwo_from={
			/** @type {"async,await"} */a: "async,await",
			/** @type {"case,catch,class,const,continue"} */c: "case,catch,class,const,continue",
			/** @type {"debugger,default,delete,do"} */d: "debugger,default,delete,do",
			/** @type {"else,exports,extends"} */e: "else,exports,extends",
			/** @type {"finally,for,function"} */f: "finally,for,function",
			/** @type {"if,import,in,instanceof"} */i: "if,import,in,instanceof",
			/** @type {"let"} */l: "let",
			/** @type {"new"} */n: "new",
			/** @type {"of"} */o: "of",
			/** @type {"return"} */r: "return",
			/** @type {"static,super,switch"} */s: "static,super,switch",
			/** @type {"this,throw,try,typeof"} */t: "this,throw,try,typeof",
			/** @type {"var,void"} */v: "var,void",
			/** @type {"while,with"} */w: "while,with",
			/** @type {"yield"} */y: "yield",
			/** @type {[]} */z: []
		};
		let kwo={
			*[Symbol.iterator]() {
				/** @type {(Exclude<keyof typeof kwo_from,"z">)[]} */
				let tmp=as_cast(Object.getOwnPropertyNames(kwo_from));
				for(let i of tmp) {
					yield kwo_from[i];
				}
			}
		};
		let keywords;
		let kwo_z=[];
		for(var i of kwo) {
			if(i=="yield") {
				kwo_z.push(i);
				keywords=new Set(kwo_z);
				//...kwo_z.flat()
				break;
			}
			if(i.indexOf(",")>0) {
				kwo_z.push.apply(kwo_z,i.split(","));
			} else {
				kwo_z.push(i);
			}
		}
		if(!keywords) throw new Error("keywords not generated");
		this.keywordhandlers=new Map;
		let mclass=this.constructor;
		/** @template T @arg {T} _x @returns {_x is (keyof parsejs)[]}  */
		function as_keyof_arr(_x) {return true;}
		let keyof_arr=Object.getOwnPropertyNames(Reflect.getPrototypeOf(this));
		if(!as_keyof_arr(keyof_arr)) throw 1;
		keyof_arr;
		for(let i of keyof_arr) {
			/** @template {string} T @arg {T} x @returns {x is `eat_${string}`} */
			function is_key_like(x) {return x.startsWith("eat_");}
			/** @template U @template {U} T @arg {U} e @returns {T} */
			function cast_as(e) {
				/** @type {any} */
				let x=e;
				return x;
			}
			/** @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {import("./support/make/Split.js").Split<X,string extends S?",":S>} */
			function split_string(x,s=cast_as(",")) {
				let r=x.split(s);
				return cast_as(r);
			}
			if(is_key_like(i)) {
				this.keywordhandlers.set(split_string(i,"_"),this[i].bind(this));
			}
		}
		let primitives=["null","undefined","true","false","NaN","Infinity","-Infinity","String"];
		this.state={
			getargs: 0,
			parsebody: 0,
			parsebracket: 0,
			pt: 0,
			parast: [],
			tok: [],
			idents: [],
			keywords,
			primitives,
		};
		if(s) {
			/** @this {this} */
			function sethandler(n,fn) {
				if(!this instanceof mclass) {
					throw RangeError("this not instance of "+mclass);
				}
				if(typeof fn!="function") {
					throw TypeError("sethandler called but parameter 2 is not a function");
				}
				this.keywordhandlers.set(n,fn.bind(this));
			};
			let gethandler=function(g) {
				if(!this instanceof mclass) {
					throw RangeError("this not instance of "+mclass);
				}
				this.keywordhandlers.get(g);
			};
			s(this,sethandler,gethandler);
		}
	}
	eat_function(s,state) {
		state.parast.push(state.pt);
		state.pt=7;
		var save=state.tok;
		var named=0;
		state.tok=[];
		if(s[0]!="()"[0])
			while(1) {
				if(s[0]=="()"[0]) {
					break;
				}
				if(s[0].match(/^\s/)) {
					s=s.slice(1);
				} else {
					named=1;
					break;
				}
			}
		s=this.parse(s,state,1);
		state.pt=3;
		var parama=state.tok;
		if(s[0]!="{}"[0]&&s.length!=0) {
			while(s.length>0) {
				if(s[0]=="{}"[0]) {
					break;
				}
				if(s[0].match(/^\s/)) {
					s=s.slice(1);
				} else {
					throw new SyntaxError("Unexpected identifier");
				}
			}
		}
		s=s.slice(1);
		state.tok=[];
		state.getargs=0;
		state.parsebody=1;
		s=this.parse(s,state,2);
		var fnbody=state.tok;
		if(named) {
			save.push({
				value: "Function",
				head: parama.slice(1),
				body: fnbody,
				name: parama[0].data,
				named: true
			});
		} else {
			save.push({
				value: "Function",
				head: parama,
				body: fnbody,
				named: false
			});
		}
		state.tok=save;
		state.parsebody=0;
		if(state.parast.length>0) {
			state.pt=state.parast.pop();
		}
		return s;
	}
	eat_try(s,state) {
		state.parast.push(state.pt);
		state.pt=8;
		var save=state.tok;
		state.tok=[];
		s=this.parse(s,state,0);
		var tryblock=state.tok;
		var tryobj={
			value: "Try",
			body: tryblock
		};
		if(s.substr(0,5)=="catch") {
			state.tok=[];
			s=s.slice(5);
			state.pt=12;
			s=this.eat_catch(s,state,tryobj);
		}
		if(s.substr(0,7)=="finally") {
			state.tok=[];
			s=s.slice(7);
			state.pt=9;
			s=this.eat_finally(s,state,tryobj);
		}
		if(state.parast.length>0) {
			state.pt=state.parast.pop();
		}
		save.push(tryobj);
		state.tok=save;
		return s;
	}
	eat_catch(s,state,tryobj) {
		if(state.pt!=12)
			throw SyntaxError("Unexpected token catch");
		state.parast.push(state.pt);
		state.pt=6;
		var save=state.tok;
		state.tok=[];
		s=this.parse(s,state,1);
		tryobj.catch={
			head: state.tok
		};
		state.tok=[];
		state.pt=14;
		s=this.parse(s,state,0);
		tryobj.catch.body=state.tok;
		state.pt=state.parast.pop();
		return s;
	}
	eat_finally(s,state,tryobj) {
		if(state.pt!=9)
			throw SyntaxError("Unexpected token finally");
		state.parast.push(state.pt);
		state.pt=10;
		var save=state.tok;
		state.tok=[];
		s=this.parse(s,state,0);
		tryobj.finally={
			body: state.tok
		};
		state.pt=state.parast.pop();
		return s;
	}
	parse(s,state,d) {
		let comments=[];
		while(s!="") {
			var len=1;
			var td=0;
			if(s=="") {
				return;
			}
			if(s.charAt(0)=="/"&&s.charAt(1)=="*") {
				var end=s.indexOf('*/');
				var comment=s.substring(2,end);
				comments.push(comment);
				s=s.slice(end+2);
			}
			switch(s.charAt(0)) {
				case "/":
					if(s[1]=="/") {
						var end=s.indexOf("\n");
						var comment=s.substring(2,end);
						len=end;
					} else {
						var len=1;
						var c=s[1];
						var off=0;
						var charexpr=0;
						var flags="";
						do {
							if(c=='[]'[0]) {
								charexpr=1;
							} else if(c=='[]'[1]) {
								charexpr=0;
							} else if(c=='\\') {
								len+=2;
								c=s[len];
								continue;
							} else if(!charexpr&&c=='/') {
								len++;
								break;
							}
							c=s[++len];
						} while(c);
						while("gimuy".indexOf(s[len])>=0) {
							flags+=s[len];
							len++;
						}
						var prev=state.tok[state.tok.length-1];
						console.log(prev);
						if((prev.value=="ident")||(prev.value=="RParan")) {
							len=1;
							state.tok.push({
								value: "Operator",
								data: "/"
							});
						} else {
							console.log(c);
							var regex=s.substring(1,len-flags.length);
							state.tok.push({
								value: "Regex",
								data: new RegExp(regex,flags)
							});
						}
					}
					break;
				case " ":
				case "\t":
					//state.tok.push({
					//    value: "whitespace"
					//})
					var match=s.match(/^\s+/);
					if(match==null) {
						len=1;
					} else if(match.index>0) {
						len=1;
					} else {
						len=match[0].length;
					}
					//if (state.parast.length < 6 || rx < (1300 / 4)) {
					//console.log.apply(null, ["ws", state.tok[state.tok.length - 1], state.tok[state.tok.length - 2]])
					// if we found more than 40 tokens, quit telling what was before whitespace
					//}
					break;
				case "\n":
				case ";":
					if(state.tok.length==0) {
						break;
					}
					if(state.tok[state.tok.length-1]) {
						if(state.tok[state.tok.length-1].value=="Seperator") {
							state.tok.pop();
							if(state.tok.length==0) {
								break;
							}
						}
						if(state.tok[state.tok.length-1].value!="LBracket") {
							state.tok.push({
								value: "Seperator"
							});
						}
					} else {
						state.tok.push({
							value: "Seperator"
						});
					}
					break;
				case "()"[0]:
					if(state.pt==6||state.pt==12) {
						state.pt=11;
						break;
						// no tokens for this when in para mode 6
					}
					if(state.pt==7) {
						state.parast.push(state.pt);
						state.pt=11;
						break;
					}
					state.tok.push({
						value: "LParan"
					});
					break;
				case "{}"[0]:
					if(state.pt==1||state.pt==8||state.pt==10||state.pt==14) {
						// main,try,finally,catch
						state.parast.push(state.pt);
						state.pt=5;
						d++;
					} else {
						state.parast.push(state.pt);
						state.pt=4;
						// state parse jsonlike
						state.tok.push({
							value: "LBracket"
						});
						d++;
					}
					break;
				case "{}"[1]:
					if(state.tok.length>1&&state.tok[state.tok.length-1].value=="Seperator") {
						state.tok.pop();
					}
					if(state.pt==0) {
						break;
					}
					if(state.pt==4) {
						state.tok.push({
							value: "RBracket"
						});
						state.pt=state.parast.pop();
						break;
					}
					if(state.pt==5) {
						state.pt=state.parast.pop();
						return s.slice(1);
					}
					//console.log(state.tok.slice(state.tok.length > 20 ? state.tok.length - 20 : 0, state.tok.length))
					return s.slice(1);
					break;
				case "()"[1]:
					if(state.pt==11) {
						state.pt=state.parast.pop();
						return s.slice(1);
					}
					if(state.pt==1) {
						state.tok.push({
							value: "RParan"
						});
						return s.slice(1);
					}
					state.tok.push({
						value: "RParan"
					});
					break;
				case "!":
					if(s[1]=="=") {
						if(s[2]=="=") {
							state.tok.push({
								value: "Operator",
								data: "!=="
							});
							len=3;
						} else {
							state.tok.push({
								value: "Operator",
								data: "!="
							});
							len=2;
						}
					} else {
						state.tok.push({
							value: "Operator",
							data: "!"
						});
					}
					break;
				case ",":
					state.tok.push({
						value: "Operator",
						data: ","
					});
					break;
				case '"':
					var off=0;
					do {
						if(s[off]=="\\") {
							off++;
						}
						off++;
					} while(s[off]!='"');
					var string=s.substring(1,off);
					state.tok.push({
						value: "primitive",
						type: "String",
						data: string
					});
					len=off+1;
					break;
				case "'":
					var match=s.slice(1).match(/\'/);
					if(match) {
						state.tok.push({
							value: "primitive",
							type: "StringSingle",
							data: s.substring(1,match.index+1)
						});
						len=match.index+2;
					} else {
						throw "Syntax error:unmatched quote";
					}
					break;
				case "=":
					if(s[1]=="=") {
						if(s[2]=="=") {
							state.tok.push({
								value: "Operator",
								data: "==="
							});
							len=3;
						} else {
							state.tok.push({
								value: "Operator",
								data: "=="
							});
							len=2;
						}
					} else {
						state.tok.push({
							value: "Asignment"
						});
					}
					break;
				case "&":
					if(s[1]=="&") {
						state.tok.push({
							value: "Operator",
							data: "&&"
						});
						len=2;
					} else {
						state.tok.push({
							value: "Operator",
							data: "&"
						});
					}
					break;
				case "|":
					if(s[1]=="|") {
						state.tok.push({
							value: "Operator",
							data: "||"
						});
						len=2;
					} else {
						state.tok.push({
							value: "Operator",
							data: "|"
						});
					}
					break;
				case "^":
					state.tok.push({
						value: "Operator",
						data: "^"
					});
					break;
				case ".":
					if(s[1]=="."&&s[2]==".") {
						state.tok.push({
							value: "Operator",
							data: "..."
						});
						len=3;
					} else {
						state.tok.push({
							value: "Operator",
							data: "."
						});
					}
					break;
				case "?":
					state.tok.push({
						value: "Operator",
						data: "?",
						depth: td
					});
					td++;
					break;
				case ":":
					if(state.pt==4) {
						state.tok[state.tok.length-1].eatnext=true;
						break;
					}
					state.tok.push({
						value: "Operator",
						data: ":"
					});
					break;
				case "-":
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					var match=s.match(/^-[0-9]+/);
					if(match==null) {
						match=s.match(/^[0-9]+/);
					}
					if(match) {
						state.tok.push({
							value: "Number",
							data: Number.parseInt(match[0])
						});
						len=match[0].length;
					} else {
						if(s[1]=="-") {
							state.tok.push({
								value: "Operator",
								data: "--"
							});
							len=2;
						} else if(s[1]=="=") {
							state.tok.push({
								value: "Operator",
								data: "-="
							});
							len=2;
						} else {
							state.tok.push({
								value: "Operator",
								data: "-"
							});
						}
					}
					break;
				case "[]"[0]:
					if(s[1]=="[]"[1]) {
						state.tok.push({
							value: "bracket",
							empty: true,
							body: []
						});
						len=2;
					} else {
						if(state.pt!=0) {
							state.parast.push(state.pt);
						}
						state.pt=2;
						var save=state.tok;
						state.tok=[];
						state.parsebracket=1;
						s=s.slice(1);
						s=this.parse(s,state,2);
						// We already ate one bracket, recurse while specifying
						var bracket=state.tok;
						save.push({
							value: "bracket",
							body: bracket
						});
						state.tok=save;
						state.parsebracket=0;
						if(state.parast.length>0) {
							state.pt=state.parast.pop();
						}
						continue;
					}
					break;
				case "[]"[1]:
					if(typeof d=="undefined") {
						throw "Unbalanced bracket or array notation";
					}
					d--;
					if(d==1) {
						return s.slice(1);
					}
					break;
				case ">":
					if(s[1]==">") {
						state.tok.push({
							value: "Operator",
							data: ">>"
						});
						len=2;
					} else {
						state.tok.push({
							value: "Operator",
							data: ">"
						});
					}
					break;
				case "<":
					if(s[1]=="<") {
						state.tok.push({
							value: "Operator",
							data: "<<"
						});
						len=2;
					} else {
						state.tok.push({
							value: "Operator",
							data: "<"
						});
					}
					break;
				case "+":
					if(s[1]=="=") {
						state.tok.push({
							value: "Operator",
							data: "+="
						});
						len=2;
					} else if(s[1]=="+") {
						state.tok.push({
							value: "Operator",
							data: "++"
						});
						len=2;
					} else {
						state.tok.push({
							value: "Operator",
							data: "+"
						});
					}
					break;
				case "*":
					if(s[1]=="=") {
						state.tok.push({
							value: "Operator",
							data: "*="
						});
						len=2;
					} else {
						state.tok.push({
							value: "Operator",
							data: "*"
						});
					}
					break;
				case "~":
					state.tok.push({
						value: "Operator",
						data: "~"
					});
					break;
				case "%":
					state.tok.push({
						value: "Operator",
						data: "%"
					});
					break;
				default:
					var js_ident="ident";
					var match=s.match(/^[a-zA-Z$_\d]+/);
					if(match) {
						var hit=match[0];
						var bailout=state.tok.length>1&&state.tok[state.tok.length-1].value=="Operator"&&state.tok[state.tok.length-1].data=="."&&hit=="catch";
						if(!bailout&&state.keywords.has(hit)) {
							if(this.keywordhandlers.has(hit)) {
								s=s.slice(hit.length);
								console.log(etn);
								window.outobj=0;
								var pre=this["eat_"+hit].toString().slice("eat_".length+hit.length);
								this.newfn=eval("outobj=function "+pre+"//# sourceURL=eat_"+(etn++)+".js");
								s=this.newfn(s,state);
								continue;
							} else {
								state.tok.push({
									value: "keyword",
									data: hit
								});
								s=s.slice(hit.length);
								continue;
							}
						}
						state.tok.push({
							value: js_ident,
							data: hit
						});
						s=s.slice(hit.length);
						continue;
					}
					if(s.length==0) {
						return s;
					}
					throw new Error("Invalid,near:"+etn+",ctx:"+s.substr(0,20));
			}
			s=s.slice(len);
		}
		return s;
	}
	toString() {
		return state.tok;
	}
}
if(typeof exports=="undefined") {
	parser=new parsejs();
	parser.parse(code,parser.state);
	parser.state.tok;
} else {
	exports.parsejs=parsejs;
}
