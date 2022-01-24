if (typeof exports != "undefined") {
	v8 = require("v8")
	util = require("util")
}
//console.log(util.inspect(this.state.tok[0],{depth:null,maxArrayLength:300}))
var rx = 0
var parsejs = class {
	constructor(s) {
		this.state = {
			getargs: 0,
			parsebody: 0,
			parsebracket: 0,
			pt: 0,
			parast: [],
			tok: [],
			idents: []
		}
		let kwo = {
			[Symbol.iterator]: function*() {
				let tmp = Object.getOwnPropertyNames(this)
				for (let i of tmp) {
					yield this[i]
				}
			},
			a: "async,await",
			c: "case,catch,class,const,continue",
			d: "debugger,default,delete,do",
			e: "else,exports,extends",
			f: "finally,for,function",
			i: "if,import,in,instanceof",
			l: "let",
			n: "new",
			o: "of",
			r: "return",
			s: "static,super,switch",
			t: "this,throw,try,typeof",
			v: "var,void",
			w: "while,with",
			y: "yield",
			z: []
		}
		for (var i of kwo) {
			if (i == "yield") {
				kwo.z.push(i)
				this.state.keywords = new Set(kwo.z)
				//...kwo.z.flat()
				break
			}
			if (i.indexOf(",") > 0) {
				kwo.z.push.apply(kwo.z, i.split(","));
			} else {
				kwo.z.push(i)
			}
		}
		this.keywordhandlers = new Map
		let mclass = this.constructor
		for (i of Object.getOwnPropertyNames(Reflect.getPrototypeOf(this))) {
			if (i.match(/eat_/)) {
				this.keywordhandlers.set(i.substr(4), this[i].bind(this))
			}
		}
		this.state.primitives = ["null", "undefined", "true", "false", "NaN", "Infinity", "-Infinity", "String"]
		if (s) {
			let sethandler = function(n, fn) {
				if (!this instanceof mclass) {
					throw RangeError("this not instance of " + mclass)
				}
				if (typeof fn != "function") {
					throw TypeError("sethandler called but parameter 2 is not a function")
				}
				this.keywordhandlers.set(n, fn.bind(this))
			}
			let gethandler = function(g) {
				if (!this instanceof mclass) {
					throw RangeError("this not instance of " + mclass)
				}
				this.keywordhandlers.get(g)
			}
			s(this, sethandler, gethandler)
		}
	}
	eat_function(s, state) {
		state.parast.push(state.pt)
		state.pt = 7
		var save = state.tok
		var named = 0
		state.tok = []
		if (s[0] != "()"[0])
			while (1) {
				if (s[0] == "()"[0]) {
					break;
				}
				if (s[0].match(/^\s/)) {
					s = s.slice(1);
				} else {
					named = 1;
					break
				}
			}
		s = this.parse(s, state, 1)
		state.pt = 3
		var parama = state.tok
		if (s[0] != "{}"[0] && s.length != 0) {
			while (1) {
				if (s[0] == "{}"[0]) {
					break
				}
				if (s[0].match(/^\s/)) {
					s = s.slice(1)
				} else {
					throw new SyntaxError("Unexpected identifier")
				}
			}
		}
		s = s.slice(1)
		state.tok = []
		state.getargs = 0
		state.parsebody = 1
		s = this.parse(s, state, 2)
		var fnbody = state.tok
		if (named) {
			save.push({
				value: "Function",
				head: parama.slice(1),
				body: fnbody,
				name: parama[0].data,
				named: true
			})
		} else {
			save.push({
				value: "Function",
				head: parama,
				body: fnbody,
				named: false
			})
		}
		state.tok = save;
		state.parsebody = 0
		if (state.parast.length > 0) {
			state.pt = state.parast.pop()
		}
		return s
	}
	eat_try(s, state) {
		state.parast.push(state.pt)
		state.pt = 8
		var save = state.tok
		state.tok = []
		s = this.parse(s, state, 1)
		var tryblock = state.tok
		var tryobj = {
			value: "Try",
			body: tryblock
		}
		if (s.substr(0, 5) == "catch") {
			state.tok = []
			s = s.slice(5)
			state.pt = 12
			s = this.eat_catch(s, state, tryobj)
		}
		if (s.substr(0, 7) == "finally") {
			state.tok = []
			s = s.slice(7)
			state.pt = 9
			s = this.eat_finally(s, state)
			tryobj.finally = state.tok
		}
		if (state.parast.length > 0) {
			state.pt = state.parast.pop()
		}
		save.push(tryobj)
		state.tok = save;
		return s
	}
	eat_catch(s, state, tryobj) {
		if (state.pt != 12)
			throw SyntaxError("Unexpected token catch")
		state.parast.push(state.pt)
		state.pt = 6
		var save = state.tok
		state.tok = []
		s = this.parse(s, state, 1)
		tryobj.catch = {
			head: state.tok
		}
		state.tok = []
		state.pt = 14
		s = this.parse(s, state, 1)
		tryobj.catch.body = state.tok
		state.pt = state.parast.pop()
		return s
	}
	eat_finally(s, state, tryobj) {
		if (state.pt != 9)
			throw SyntaxError("Unexpected token finally")
		state.parast.push(state.pt)
		state.pt = 10
		var save = state.tok
		state.tok = []
		s = this.parse(s, state, 1)
		state.pt = state.parast.pop()
		return s
	}
	parse(s, state, d) {
		while (s != "") {
			rx++;
			var len = 1
			var td = 0
			if (s == "") {
				return
			}
			if (s.charAt(0) == "/" && s.charAt(1) == "*") {
				var end = s.indexOf('*/')
				var comment = s.substring(2, end)
				s = s.slice(end + 2)
			}
			switch (s.charAt(0)) {
			case "/":
				if (s[1] == "/") {
					var end = s.indexOf("\n")
					var comment = s.substring(2, end)
					len = end
				} else {
					var len = 1
					var c = s[1]
					var off = 0
					var notreg = 0
					var charexpr = 0
					var flags = ""
					do {
						if (c == '[') {
							charexpr = 1;
						} else if (c == ']') {
							charexpr = 0;
						} else if (c == '\\') {
							len += 2
							c = s[len]
							continue
						} else if (!charexpr && c == '/') {
							len++
							break;
						}
						c = s[++len]
					} while (c);
					while ("gimuy".indexOf(s[len]) >= 0) {
						flags += s[len];
						len++
					}
					var prev = state.tok[state.tok.length - 1];
					if ((prev.value == "ident") || (prev.value == "RParan") || prev.value == "Number" || prev.value == "bracket") {
						len = 1;
						state.tok.push({
							value: "Operator",
							data: "/"
						})
					} else {
						console.log(c)
						var regex = s.substring(1, len - flags.length)
						state.tok.push({
							value: "Regex",
							data: new RegExp(regex,flags)
						})
					}
				}
				break
			case " ":
			case "\t":
				//state.tok.push({
				//    value: "whitespace"
				//})
				var match = s.match(/^\s+/)
				if (match == null) {
					len = 1
				} else if (match.index > 0) {
					len = 1
				} else {
					len = match[0].length
				}
				//if (state.parast.length < 2 || rx < (1300 / 4)) {
				//    console.log.apply(0, ["ws", state.tok[state.tok.length - 1], state.tok[state.tok.length - 2]])
				//    // if we found more than 40 tokens, quit telling what was before whitespace
				//}
				break
			case "\n":
			case ";":
				if (state.tok.length == 0) {
					break
				}
				if (state.tok[state.tok.length - 1]) {
					if (state.tok[state.tok.length - 1].value == "Seperator") {
						state.tok.pop()
						if (state.tok.length == 0) {
							break
						}
					}
					if (state.tok[state.tok.length - 1].value != "LBracket") {
						state.tok.push({
							value: "Seperator"
						})
					}
				} else {
					state.tok.push({
						value: "Seperator"
					})
				}
				break
			case "(":
				if (state.pt == 6 || state.pt == 12) {
					state.pt = 11
					break
					// no tokens for this when in para mode 6
				}
				if (state.pt == 7) {
					state.parast.push(state.pt)
					state.pt = 11
					state.tok.push({
						value: "LParan"
					})
					break
				}
				state.tok.push({
					value: "LParan"
				})
				break
			case "{":
				if (state.pt == 1 || state.pt == 8 || state.pt == 14) {
					state.parast.push(state.pt)
					state.pt = 5
					d++
				} else {
					state.parast.push(state.pt)
					state.pt = 4
					// state parse jsonlike
					state.tok.push({
						value: "LBracket"
					})
					d++
				}
				break
			case "}":
				if (state.tok.length > 1 && state.tok[state.tok.length - 1].value == "Seperator") {
					state.tok.pop()
				}
				if (state.pt == 0) {
					break
				}
				if (state.pt == 4) {
					state.tok.push({
						value: "RBracket"
					})
					state.pt = state.parast.pop()
					break
				}
				if (state.pt == 5) {
					state.pt = state.parast.pop()
					return s.slice(1)
				}
				//console.log(state.tok.slice(state.tok.length > 20 ? state.tok.length - 20 : 0, state.tok.length))
				return s.slice(1)
				break
			case ")":
				if (state.pt == 11) {
					state.pt = state.parast.pop();
					state.tok.push({
						value: "RParan"
					})
					return s.slice(1)
				}
				if (state.pt == 1) {
					state.tok.push({
						value: "RParan"
					})
					return s.slice(1)
				}
				state.tok.push({
					value: "RParan"
				})
				break
			case "!":
				if (s[1] == "=") {
					if (s[2] == "=") {
						state.tok.push({
							value: "Operator",
							data: "!=="
						})
						len = 3
					} else {
						state.tok.push({
							value: "Operator",
							data: "!="
						})
						len = 2
					}
				} else {
					state.tok.push({
						value: "Operator",
						data: "!"
					})
				}
				break
			case ",":
				state.tok.push({
					value: "Operator",
					data: ","
				})
				break
			case '"':
				var off = 0
				wk: {
					do {
						if (s[off] == "\\") {
							off++
						}
						off++
					} while (s[off] != '"')
				}
				var string = s.substring(1, off)
				state.tok.push({
					value: "primitive",
					type: "String",
					data: string
				})
				len = off + 1
				break
			case "'":
				var match = s.slice(1).match(/\'/)
				if (match) {
					state.tok.push({
						value: "primitive",
						type: "StringSingle",
						data: s.substring(1, match.index + 1)
					})
					len = match.index + 2
				} else {
					throw "Syntax error:unmatched quote"
				}
				break
			case "=":
				if (s[1] == "=") {
					if (s[2] == "=") {
						state.tok.push({
							value: "Operator",
							data: "==="
						})
						len = 3
					} else {
						state.tok.push({
							value: "Operator",
							data: "=="
						})
						len = 2
					}
				} else {
					state.tok.push({
						value: "Asignment"
					})
				}
				break
			case "&":
				if (s[1] == "&") {
					state.tok.push({
						value: "Operator",
						data: "&&"
					})
					len = 2
				} else {
					state.tok.push({
						value: "Operator",
						data: "&"
					})
				}
				break
			case "|":
				if (s[1] == "|") {
					state.tok.push({
						value: "Operator",
						data: "||"
					})
					len = 2
				} else {
					state.tok.push({
						value: "Operator",
						data: "|"
					})
				}
				break
			case "^":
				state.tok.push({
					value: "Operator",
					data: "^"
				})
				break
			case ".":
				if (s[1] == "." && s[2] == ".") {
					state.tok.push({
						value: "Operator",
						data: "..."
					})
					len = 3
				} else {
					state.tok.push({
						value: "Operator",
						data: "."
					})
				}
				break
			case "?":
				state.tok.push({
					value: "Operator",
					data: "?",
					depth: td
				})
				td++
				break
			case ":":
				if (state.pt == 4) {
					state.tok[state.tok.length - 1].eatnext = true
					break
				}
				state.tok.push({
					value: "Operator",
					data: ":"
				})
				break
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
				var match = s.match(/^-[0-9]+/)
				if (match == null) {
					match = s.match(/^[0-9]+/)
				}
				if (match) {
					state.tok.push({
						value: "Number",
						data: Number.parseInt(match[0])
					})
					len = match[0].length
				} else {
					if (s[1] == "-") {
						state.tok.push({
							value: "Operator",
							data: "--"
						})
						len = 2
					} else if (s[1] == "=") {
						state.tok.push({
							value: "Operator",
							data: "-="
						})
						len = 2
					} else {
						state.tok.push({
							value: "Operator",
							data: "-"
						})
					}
				}
				break
			case "[":
				if (s[1] == "]") {
					state.tok.push({
						value: "bracket",
						empty: true,
						body: []
					})
					len = 2
				} else {
					if (state.pt != 0) {
						state.parast.push(state.pt)
					}
					state.pt = 2
					var save = state.tok
					state.tok = []
					state.parsebracket = 1
					s = s.slice(1)
					s = this.parse(s, state, 2)
					// We already ate one bracket, recurse while specifying
					var bracket = state.tok
					save.push({
						value: "bracket",
						body: bracket
					})
					state.tok = save
					state.parsebracket = 0
					if (state.parast.length > 0) {
						state.pt = state.parast.pop()
					}
					continue
				}
				break
			case "]":
				if (typeof d == "undefined") {
					throw "Unbalanced bracket or array notation"
				}
				d--
				if (d == 1) {
					return s.slice(1)
				}
				break
			case ">":
				if (s[1] == ">") {
					state.tok.push({
						value: "Operator",
						data: ">>"
					})
					len = 2
				} else {
					state.tok.push({
						value: "Operator",
						data: ">"
					})
				}
				break
			case "<":
				if (s[1] == "<") {
					state.tok.push({
						value: "Operator",
						data: "<<"
					})
					len = 2
				} else {
					state.tok.push({
						value: "Operator",
						data: "<"
					})
				}
				break
			case "+":
				if (s[1] == "=") {
					state.tok.push({
						value: "Operator",
						data: "+="
					})
					len = 2
				} else if (s[1] == "+") {
					state.tok.push({
						value: "Operator",
						data: "++"
					})
					len = 2
				} else {
					state.tok.push({
						value: "Operator",
						data: "+"
					})
				}
				break
			case "*":
				if (s[1] == "=") {
					state.tok.push({
						value: "Operator",
						data: "*="
					})
					len = 2
				} else {
					state.tok.push({
						value: "Operator",
						data: "*"
					})
				}
				break
			case "~":
				state.tok.push({
					value: "Operator",
					data: "~"
				})
				break
			case "%":
				state.tok.push({
					value: "Operator",
					data: "%"
				})
				break
			default:
				var js_ident = "ident"
				var match = s.match(/^[a-zA-Z$_\d]+/)
				if (match) {
					var hit = match[0]
					if (state.keywords.has(hit)) {
						if (this.keywordhandlers.has(hit)) {
							s = s.slice(hit.length)
							s = this.keywordhandlers.get(hit)(s, state)
							continue
						} else {
							state.tok.push({
								value: "keyword",
								data: hit
							})
							s = s.slice(hit.length)
							continue
						}
					}
					state.tok.push({
						value: js_ident,
						data: hit
					});
					s = s.slice(hit.length);
					continue
				}
				if (s.length == 0) {
					return s
				}
				throw "Invalid,ctx:" + s.substr(0, 20)
				break
			}
			s = s.slice(len)
		}
		return s
	}
	toString() {
		return state.tok
	}
}
keywordexecuters = {}
keywordexecuters.var = function(runscope) {
	var tokens = runscope.tok
	var cur = tokens[runscope.i + 1]
	var targ_s;
	if (cur.value == "ident") {
		targ_s = cur.data
		runscope.i++;
		//parseing ident;;;
		cur = tokens[runscope.i + 1]
	} else {
		console.log("unexpected", cur)
	}
	if (cur.value == "Asignment" && tokens[runscope.i + 2].value == "bracket") {
		var newscope = {
			my: [],
			up: null,
			tok: tokens[runscope.i + 2].body,
			i: 0
		}
		bracket_run(newscope)
		runscope.my[targ_s] = newscope.my
		runscope.i++
		return {
			value: "brret"
		}

	}
	return {
		value: "continue"
	}

}
bracket_run = function(runscope) {
	var tokens = runscope.tok
	var cur = tokens[runscope.i]
	while (cur) {
		if (cur.value == "primitive" && cur.type == "String") {
			runscope.my.push(eval('"' + cur.data + '"'))
			runscope.i++
			cur = tokens[runscope.i]
		}
		if (cur && cur.value == "Operator" && cur.data == ",") {
			runscope.i++
			cur = tokens[runscope.i]
			continue
		}
		break
	}

}
tokcall = function(tokens) {
	var runscope = {
		my: {},
		up: window,
		tok: tokens,
		i: 0
	}, argint, cur
	var exec_drop_list = []
	var did_eat = 0;
	var retval = null
	var did_ret = false;
	while (did_ret === false) {
		cur = tokens[runscope.i];
		if (cur.value == "Function") {
			argint = cur.head.slice(1, cur.head.length - 1);
			var fn = function(...a) {
				if (this !== window) {
					fn.call(this, ...a)
				}
				fn.call(null, ...a)
			}
			fn.call = function(tv, ...args) {
				runscope.my.this = tv
			}
			exec_drop_list.push(fn)
		}
		if (cur.value == "keyword" && keywordexecuters.hasOwnProperty(cur.data)) {
			var out_val = keywordexecuters[cur.data](runscope)
			if (out_val.value == "return") {
				retval = out_val.data
			}
			if (out_val.value == "continue") {
				runscope.i++
				continue
			}
			if (out_val.value == "brret") {
				runscope.i += 2
				continue
			}
		}
		if (cur.value == "Seperator") {
			runscope.i++
			continue
		}
		console.log(cur)
		break
	}
	if (retval === null && did_eat === 0) {
		return
	}
	return retval
}
if (typeof exports == "undefined") {
	parser = new parsejs();
	parser.parse(code, parser.state)
	console.log(parser.state.tok)
	ctor = tokcall(parser.state.tok)
	ctor;
} else {
	exports.parsejs = parsejs
}
