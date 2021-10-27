if(typeof exports != "undefined") {
    v8 = require("v8");
    util = require("util");
}
//console.log(util.inspect(this.state.tok[0],{depth:null,maxArrayLength:300}))
var rx = 0;
runcode = function() {
    gen_parsejs = function(target) {
        console.log("ggs");
        var ts = target.state;
        let kwo = [];
        p = function(a) {
            kwo.push(a.split(","));
        };
        p("async,await");
        p("case,catch,class,const,continue");
        p("debugger,default,delete,do");
        p("else,exports,extends");
        p("finally,for,function");
        p("if,import,in,instanceof");
        p("let");
        p("new");
        p("of");
        p("return");
        p("static,super,switch");
        p("this,throw,try,typeof");
        p("var,void");
        p("while,with");
        p("yield");
        ts.keywords = kwo;
        ts.char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$";
        target.switch_parserfn_regex = function(s, ptr, state) {
            var regx = "";
            var charexpr = 0;
            var rxlen = 1;
            var rc = s[ptr + rxlen];
            do {
                if(rc == '[') {
                    charexpr = 1;
                } else if(rc == ']') {
                    charexpr = 0;
                } else if(rc == '\\') {
                    rxlen += 2;
                    rc = s[ptr + rxlen];
                    continue;
                } else if(!charexpr && rc == '/') {
                    rxlen++;
                    break;
                }
                rc = s[ptr + (++rxlen)];
            } while(rc) ;state.tok.push({
                t: "x",
                r: s.slice(ptr, ptr + rxlen)
            });
            return ptr + rxlen;
        };
        target.switch_parserfn_string_d = function(s) {
            if(s.indexOf("\\x") == 0) {
                var sar = s.slice(2).split("\\x");
                s = sar.map(e => {
                    var ch = e.slice(0, 2);
                    return String.fromCharCode(parseInt(ch, 16)) + e.slice(2);
                }
                ).join("");
            }
            console.log(s);
            return s;
        };
        target.switch_parserfn_string_s = function(s) {
            return s;
        };

    };
    parser = new parser_base(gen_parsejs);
    var res = parser.parse(code);
    console.log(parser.state.stk);
    window.tok = parser.state.tok;
    return parser.state.tok;
};
var parser_base = class {
    parse(s, d) {
        var brcount = 0;
        var state = this.state;
        var char = state.char;
        var ptr = 0;
        var lm = 0;
        var stk = state.stk;
        var stka = [];
        var stkt = [];
        main: while(ptr < s.length) {
            brcount++;
            if(brcount > 38000) {
                console.log("too many steps to parse this depth");
                return;
            }
            var len = 1;
            var td = 0;
            if(ptr >= s.length) {
                return;
            }
            var c = s.charAt(ptr);
            if(char.indexOf(c) > -1) {
                if(stkt[stkt.length - 1] == 1) {
                    stka.push(stka.pop() + c);
                } else {
                    stkt.push(1);
                    stka.push(c);
                }
            } else {
                if(stkt[stkt.length - 1] == 1) {
                    if("0123456789".indexOf(c) > -1) {
                        stka.push(stka.pop() + c);
                        ptr++;
                        continue;
                    }
                    var rs = stka.pop();
                    state.tok.push({
                        t: "I",
                        r: rs
                    });
                    if(rs == "replace") {
                        var as = s.slice(ptr, ptr + 1000);
                    }
                    stkt.pop();
                }
                if("0123456789".indexOf(c) > -1) {
                    if(Object.prototype.isPrototypeOf(state.tok[state.tok.length - 1]) && !Array.prototype.isPrototypeOf(state.tok[state.tok.length - 1]) && state.tok[state.tok.length - 1].t == "?N") {
                        c = state.tok.pop().i_num + c;
                    }
                    state.tok.push({
                        t: "?N",
                        i_num: c
                    });
                    ptr++;
                    continue main;
                }
                switch(c) {
                    case "(":
                        stk.push(state.tok);
                        state.tok.push({
                            t: "R",
                            r: "()"[0]
                        });
                        state.tok = [];
                        break;
                    case ")":
                        var nj = state.tok;
                        state.tok = stk.pop();
                        state.tok.push(nj);
                        state.tok.push({
                            t: "R",
                            r: "()"[1]
                        });
                        break;
                    case "{":
                        brcount = 0;
                        rx++;
                        stk.push(state.tok);
                        state.tok.push({
                            t: "R",
                            r: "{}"[0]
                        });
                        state.tok = [];
                        break;
                    case "}":
                        var nj = state.tok;
                        state.tok = stk.pop();
                        state.tok.push(nj);
                        state.tok.push({
                            t: "R",
                            r: "{}"[1]
                        });
                        break;
                    case "[":
                        stk.push(state.tok);
                        state.tok.push({
                            t: "R",
                            r: "[]"[0]
                        });
                        state.tok = [];
                        break;
                    case "]":
                        var nj = state.tok;
                        state.tok = stk.pop();
                        state.tok.push(nj);
                        state.tok.push({
                            t: "R",
                            r: "[]"[1]
                        });
                        break;
                    case "'":
                        var nx = s.indexOf("'", ptr + 1);
                        console.log(nx);
                        var inner_str = s.slice(ptr + 1, nx);
                        var res_str = this.switch_parserfn_string_s(inner_str);
                        state.tok.push({
                            t: "S",
                            r: res_str
                        });
                        ptr = nx + 1;
                        continue main;
                    case '"':
                        var nx = s.indexOf('"', ptr + 1);
                        var inner_str = s.slice(ptr + 1, nx);
                        var res_str = this.switch_parserfn_string_d(inner_str);
                        state.tok.push({
                            t: "SS",
                            r: res_str
                        });
                        ptr = nx + 1;
                        continue main;
                    case ".":
                        state.tok.push({
                            t: "O",
                            r: "."
                        });
                        break;
                    case " ":
                        state.tok.push(" ");
                        break;
                    case "=":
                        state.tok.push("=");
                        break;
                    case "-":
                        state.tok.push("-");
                        break;
                    case "+":
                        state.tok.push("+");
                        break;
                    case ";":
                        state.tok.push(";");
                        break;
                    case "\n":
                        state.tok.push("\n");
                        break;
                    case ":":
                        state.tok.push(":");
                        break;
                    case "?":
                        state.tok.push("?");
                        break;
                    case "|":
                        state.tok.push("|");
                        break;
                    case "&":
                        state.tok.push("&");
                        break;
                    case "!":
                        state.tok.push("!");
                        break;
                    case "*":
                        state.tok.push("*");
                        break;
                    case ",":
                        state.tok.push(",");
                        break;
                    case "<":
                        state.tok.push("<");
                        break;
                    case ">":
                        state.tok.push(">");
                        break;
                    case "^":
                        state.tok.push("^");
                        break;
                    case "%":
                        state.tok.push("%");
                        break;
                    case "~":
                        state.tok.push("~");
                        break;
                    case "/":
                        var bs = s.slice(ptr - 1, ptr + 50);
                        var result = -1;
                        var sa_st = stka.length;
                        if(s[ptr + 1] == "/") {
                            var nl = s.indexOf("\n", ptr);
                            ptr = nl;
                            continue main;
                        }
                        if(s[ptr + 1] == "*") {
                            var idx = s.indexOf("*/", ptr + 2);
                            ptr = idx + 2;
                            continue main;
                        }
                        if(state.tok.length == 0) {
                            result = this.switch_parserfn_regex(s, ptr, state);
                        }
                        if(state.tok.length > 0 & state.tok[state.tok.length - 1] == " ") {
                            var f_x = function() {
                                void "NOP func";
                            };
                            stka.push(f_x);
                            stka.push(state.tok.pop());
                            while(state.tok[state.tok.length - 1] == " ") {
                                stka.push(state.tok.pop());
                            }
                        }
                        if(state.tok.length > 0 & state.tok[state.tok.length - 1] == "=") {
                            result = this.switch_parserfn_regex(s, ptr, state);
                        }
                        if(state.tok.length > 0 & state.tok[state.tok.length - 1] == "!") {
                            result = this.switch_parserfn_regex(s, ptr, state);
                        }
                        if(state.tok.length > 0 & state.tok[state.tok.length - 1] == ",") {
                            result = this.switch_parserfn_regex(s, ptr, state);
                        }
                        if(state.tok.length > 0 & state.tok[state.tok.length - 1] == ":") {
                            result = this.switch_parserfn_regex(s, ptr, state);
                        }
                        if(stka.length > sa_st) {
                            if(stka[stka.length - 1] == f_x) {
                                void stka.pop();
                            } else {
                                while(stka[stka.length - 1] != f_x) {
                                    state.tok.push(stka.pop());
                                }
                                void stka.pop();
                            }
                        }
                        if(sa_st != stka.length) {
                            debugger;
                        }
                        if(result != -1) {
                            ptr = result;
                            continue main;
                        } else {
                            state.tok.push({
                                t: "rx/m",
                                r: c
                            });
                        }
                        var atok = state.tok;
                        break;
                    case "\\":
                        if(s[ptr + 1] == "\\") {
                            state.tok.push("\\");
                            ptr++;
                        }
                        void 0;
                        break;
                    default:
                        debugger; console.log(c);
                        console.log(s.slice(ptr - 40, ptr + 40));
                        break main;
                }
            }
            ptr++;
        }
        if(stkt[stkt.length - 1] == 1) {
            state.tok.push({
                t: "I",
                r: stka.pop()
            });
        }
        return this.state;
    }
    constructor(s) {
        this.state = {
            tok: [],
            stk: [],
            kwd: [],
            idc: [],
            ukwd: [],
            refs: [],
            prim: [],
            char: [],
            primitives: []
        };
        let ci = this.state.ukwd;
        this.keywordhandlers = new Map;
        let mclass = this.constructor;
        for(var i of Object.getOwnPropertyNames(Reflect.getPrototypeOf(this))) {
            if(i.match(/eat_/)) {
                this.keywordhandlers.set(i.substr(4), this[i].bind(this));
            }
        }
        if(s) {
            let sethandler = function(n, fn) {
                if(!this instanceof mclass) {
                    throw RangeError("this not instance of " + mclass);
                }
                if(typeof fn != "function") {
                    throw TypeError("sethandler called but parameter 2 is not a function");
                }
                this.keywordhandlers.set(n, fn.bind(this));
            };
            let gethandler = function(g) {
                if(!this instanceof mclass) {
                    throw RangeError("this not instance of " + mclass);
                }
                this.keywordhandlers.get(g);
            };
            s(this, sethandler, gethandler);
        } else {
            throw new Error("Base class has no specilizer");
        }
    }
    toString() {
        return state.tok;
    }
};
if(typeof exports == "undefined") {
    runcode();
} else {
    exports.parsejs = parsejs;
}
