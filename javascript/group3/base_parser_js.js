if(typeof exports!="undefined") {
	v8=require("v8")
	util=require("util")
}
//console.log(util.inspect(this.state.tok[0],{depth:null,maxArrayLength:300}))
var rx=0
void rx
class parser_base {
	/**@arg {(a:parser_base,set_handler:(key:any, value:any)=>void,get_handler:(key:any)=>any)=>void} s */
	constructor(s) {
		this.state={
			tok: [],
			stk: [],
			kwd: [],
			idc: [],
			u_kwd: [],
			refs: [],
			prim: [],
			char: [],
			primitives: []
		}
		let ci=this.state.u_kwd
		void ci
		this.keyword_handlers=new Map
		let m_class=this.constructor
		for(var i of Object.getOwnPropertyNames(Reflect.getPrototypeOf(this))) {
			if(i.match(/eat_/)) {
				this.keyword_handlers.set(i.substr(4),this[i].bind(this))
			}
		}
		if(s) {
			/**@this {parser_base} */
			function set_handler(n,fn) {
				if(!this instanceof m_class) {
					throw RangeError("this not instance of "+m_class)
				}
				if(typeof fn!="function") {
					throw TypeError("set_handler called but parameter 2 is not a function")
				}
				this.keyword_handlers.set(n,fn.bind(this))
			}
			/**@this {parser_base} */
			function get_handler(g) {
				if(!this instanceof m_class) {
					throw RangeError("this not instance of "+m_class)
				}
				this.keyword_handlers.get(g)
			}
			s(this,set_handler,get_handler)
		} else {
			throw new Error("Base class is not specialized")
		}
	}
	parse(s,d) {
		void d
		var br_count=0
		var state=this.state
		var char=state.char
		var ptr=0
		var lm=0
		void lm
		var a_tok
		void a_tok
		var stk=state.stk
		var stk_a=[]
		var stk_t=[]
		main: while(ptr<s.length) {
			br_count++
			if(br_count>38000) {
				console.log("too many steps to parse this depth")
				return
			}
			var len=1
			var td=0
			if(ptr>=s.length) {
				return
			}
			var c=s.charAt(ptr)
			if(char.indexOf(c)>-1) {
				if(stk_t[stk_t.length-1]==1) {
					stk_a.push(stk_a.pop()+c)
				} else {
					stk_t.push(1)
					stk_a.push(c)
				}
			} else {
				if(stk_t[stk_t.length-1]==1) {
					if("0123456789".indexOf(c)>-1) {
						stk_a.push(stk_a.pop()+c)
						ptr++
						continue
					}
					var rs=stk_a.pop()
					state.tok.push({
						t: "I",
						r: rs
					})
					if(rs=="replace") {
						var as=s.slice(ptr,ptr+1000)
					}
					stk_t.pop()
				}
				if("0123456789".indexOf(c)>-1) {
					if(Object.prototype.isPrototypeOf(state.tok[state.tok.length-1])&&!Array.prototype.isPrototypeOf(state.tok[state.tok.length-1])&&state.tok[state.tok.length-1].t=="?N") {
						c=state.tok.pop().i_num+c
					}
					state.tok.push({
						t: "?N",
						i_num: c
					})
					ptr++
					continue main
				}
				switch(c) {
					case "(":
						stk.push(state.tok)
						state.tok.push({
							t: "R",
							r: "()"[0]
						})
						state.tok=[]
						break
					case ")":
						var nj=state.tok
						state.tok=stk.pop()
						state.tok.push(nj)
						state.tok.push({
							t: "R",
							r: "()"[1]
						})
						break
					case "{":
						br_count=0
						rx++
						stk.push(state.tok)
						state.tok.push({
							t: "R",
							r: "{}"[0]
						})
						state.tok=[]
						break
					case "}":
						var nj=state.tok
						state.tok=stk.pop()
						state.tok.push(nj)
						state.tok.push({
							t: "R",
							r: "{}"[1]
						})
						break
					case "[":
						stk.push(state.tok)
						state.tok.push({
							t: "R",
							r: "[]"[0]
						})
						state.tok=[]
						break
					case "]":
						var nj=state.tok
						state.tok=stk.pop()
						state.tok.push(nj)
						state.tok.push({
							t: "R",
							r: "[]"[1]
						})
						break
					case "'":
						var nx=s.indexOf("'",ptr+1)
						console.log(nx)
						var inner_str=s.slice(ptr+1,nx)
						var res_str=this.switch_parser_fn_string_s(inner_str)
						state.tok.push({
							t: "S",
							r: res_str
						})
						ptr=nx+1
						continue main
					case '"':
						var nx=s.indexOf('"',ptr+1)
						var inner_str=s.slice(ptr+1,nx)
						var res_str=this.switch_parser_fn_string_d(inner_str)
						state.tok.push({
							t: "SS",
							r: res_str
						})
						ptr=nx+1
						continue main
					case ".":
						state.tok.push({
							t: "O",
							r: "."
						})
						break
					case " ":
						state.tok.push(" ")
						break
					case "=":
						state.tok.push("=")
						break
					case "-":
						state.tok.push("-")
						break
					case "+":
						state.tok.push("+")
						break
					case ";":
						state.tok.push(";")
						break
					case "\n":
						state.tok.push("\n")
						break
					case ":":
						state.tok.push(":")
						break
					case "?":
						state.tok.push("?")
						break
					case "|":
						state.tok.push("|")
						break
					case "&":
						state.tok.push("&")
						break
					case "!":
						state.tok.push("!")
						break
					case "*":
						state.tok.push("*")
						break
					case ",":
						state.tok.push(",")
						break
					case "<":
						state.tok.push("<")
						break
					case ">":
						state.tok.push(">")
						break
					case "^":
						state.tok.push("^")
						break
					case "%":
						state.tok.push("%")
						break
					case "~":
						state.tok.push("~")
						break
					case "/":
						var bs=s.slice(ptr-1,ptr+50)
						var result=-1
						var sa_st=stk_a.length
						if(s[ptr+1]=="/") {
							var nl=s.indexOf("\n",ptr)
							ptr=nl
							continue main
						}
						if(s[ptr+1]=="*") {
							var idx=s.indexOf("*/",ptr+2)
							ptr=idx+2
							continue main
						}
						if(state.tok.length==0) {
							result=this.switch_parser_fn_regex(s,ptr,state)
						}
						if(state.tok.length>0&state.tok[state.tok.length-1]==" ") {
							var f_x=function() {
								void "NOP func"
							}
							stk_a.push(f_x)
							stk_a.push(state.tok.pop())
							while(state.tok[state.tok.length-1]==" ") {
								stk_a.push(state.tok.pop())
							}
						}
						if(state.tok.length>0&state.tok[state.tok.length-1]=="=") {
							result=this.switch_parser_fn_regex(s,ptr,state)
						}
						if(state.tok.length>0&state.tok[state.tok.length-1]=="!") {
							result=this.switch_parser_fn_regex(s,ptr,state)
						}
						if(state.tok.length>0&state.tok[state.tok.length-1]==",") {
							result=this.switch_parser_fn_regex(s,ptr,state)
						}
						if(state.tok.length>0&state.tok[state.tok.length-1]==":") {
							result=this.switch_parser_fn_regex(s,ptr,state)
						}
						if(stk_a.length>sa_st) {
							if(stk_a[stk_a.length-1]==f_x) {
								void stk_a.pop()
							} else {
								while(stk_a[stk_a.length-1]!=f_x) {
									state.tok.push(stk_a.pop())
								}
								void stk_a.pop()
							}
						}
						if(sa_st!=stk_a.length) {
							debugger
						}
						if(result!=-1) {
							ptr=result
							continue main
						} else {
							state.tok.push({
								t: "rx/m",
								r: c
							})
						}
						a_tok=state.tok
						break
					case "\\":
						if(s[ptr+1]=="\\") {
							state.tok.push("\\")
							ptr++
						}
						void 0
						break
					default:
						debugger; console.log(c)
						console.log(s.slice(ptr-40,ptr+40))
						break main
				}
			}
			ptr++
		}
		if(stk_t[stk_t.length-1]==1) {
			state.tok.push({
				t: "I",
				r: stk_a.pop()
			})
		}
		return this.state
	}
	toString() {
		return state.tok
	}
	switch_parser_fn_regex(s,ptr,state) {
		var regex=""
		void regex
		var char_expr=0
		var rx_len=1
		var rc=s[ptr+rx_len]
		do {
			if(rc=='[') {
				char_expr=1
			} else if(rc==']') {
				char_expr=0
			} else if(rc=='\\') {
				rx_len+=2
				rc=s[ptr+rx_len]
				continue
			} else if(!char_expr&&rc=='/') {
				rx_len++
				break
			}
			rc=s[ptr+(++rx_len)]
		} while(rc)
		state.tok.push({
			t: "x",
			r: s.slice(ptr,ptr+rx_len)
		})
		return ptr+rx_len
	}
	switch_parser_fn_string_d(s) {
		if(s.indexOf("\\x")==0) {
			var sar=s.slice(2).split("\\x")
			s=sar.map(e => {
				var ch=e.slice(0,2)
				return String.fromCharCode(parseInt(ch,16))+e.slice(2)
			}
			).join("")
		}
		console.log(s)
		return s
	}
	switch_parser_fn_string_s(s) {
		return s
	}
}
function run_code() {
	/**@arg {parser_base} target */
	function gen_parsejs(target) {
		console.log("ggs")
		var ts=target.state
		let kwo=[]
		p=function(a) {
			kwo.push(a.split(","))
		}
			
		p("async,await")
		p("case,catch,class,const,continue")
		p("debugger,default,delete,do")
		p("else,exports,extends")
		p("finally,for,function")
		p("if,import,in,instanceof")
		p("let")
		p("new")
		p("of")
		p("return")
		p("static,super,switch")
		p("this,throw,try,typeof")
		p("var,void")
		p("while,with")
		p("yield")
		ts.keywords=kwo
		ts.char="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$"
		target.switch_parser_fn_string_s=function(s) {
			return s
		}

	}
	parser=new parser_base(gen_parsejs)
	var res=parser.parse(code)
	void res
	console.log(parser.state.stk)
	window.tok=parser.state.tok
	return parser.state.tok
}
if(typeof exports=="undefined") {
	run_code()
} else {
	exports.parsejs=parsejs
}
