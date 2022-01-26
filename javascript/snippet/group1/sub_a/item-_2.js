function main() {
	var fnlist = [];
	var fnname = [];
	{
		function add_func(name, func) {
			var y = fnlist.push(func);
			if (fnname.indexOf(name) > -1) {
				throw SyntaxError("Name conflict")
			}
			var x = fnname.push(name);
			func.user_run_name = name;
			if (x != y) {
				throw SyntaxError("unbalanced function or name number")
			}
			return x;
		}
		var execute = function(t, pre_exec, post_exec) {
			var r_fnname = fnname[t]
			var func = fnlist[t]
			try {
				var sf = func.toString();
				if (sf.indexOf("/*arg_start*/") > -1) {
					let eval_func;
					{
						var func_split = sf.split(/(\/\*arg_start\*\/|\/\*arg_end\*\/)/)
						var no_head = func_split[4].trim().slice(1).trim().slice(1)
						var body = no_head.slice(0, no_head.length - 2)
						var is_strict
						var is_strict_p1 = body.split('"use strict"')
						is_strict = is_strict_p1.length > 1
						if (is_strict) {
							body = is_strict_p1[1].trim()
						}
						var args = "/*arg_start*/" + func_split[2].trim() + "/*arg_end*/";
						var n;
						let src_url = '//' + '# sourceURL=' + r_fnname;
						let func_str;
						if (is_strict) {
							func_str = `"use strict";\nconsole.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func = new Function(args,func_str);
						} else {
							func_str = `console.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func = new Function(args,func_str);
						}
						var s = eval_func.length
						if (window.hasOwnProperty('mc')) {
							mc.port2.onmessage = function() {}
							mc.port2.close()
							mc.port1.onmessage = function() {}
							mc.port1.close()
							delete window.mc;
							if (typeof mc != 'undefined') {
								window.mc = undefined
							}
						}
						console.log("fi:", eval_func.name == "anonymous", "len:", eval_func.length);
					}
					if (eval_func) {
						eval_func(func);
					}
					let ret = eval_func()
					if (post_exec)
						post_exec(ret);
					return ret;
				} else {
					if (pre_exec) {
						pre_exec(func);
					}
					let ret = func();
					if (post_exec)
						post_exec(ret);
					return ret;
				}
			} finally {}
			return;
		}
		let stt = eval(`(class {
			static #unused = this.#init();
			static #init(){
				
			}
			static _f(){}
			static _n = "<empty>";
			static n_on = true;
			static f_on = true;
		})`);
		window.CustomInputMatcher = class {
			constructor(t_needle, t_string_getter) {
				this.ts_get = t_string_getter;
				this.tr = t_needle;
			}
			get test_string() {
				return this.ts_get();
			}
			get test_needle() {
				return this.tr;
			}
		}
		var cur = class extends stt {
			static get f() {
				return this._f
			}
			static set f(f) {
				let cur = this._ln;
				this._lf = f;
				if (fnlist.indexOf(this._lf) == -1) {
					add_func(this._ln, this._lf)
				}
				if (cur instanceof CustomInputMatcher) {
					let custom_str = cur.test_string;
					let needle = cur.test_needle;
					if (custom_str.match(needle) == null) {
						this._f = f;
						return;
					}
				}
				if (this.f_on) {
					this.f_on = false
					this._f = f
				}
			}
			static get n() {
				return this._n
			}
			static set n(n) {
				let cur = n;
				if (cur instanceof CustomInputMatcher) {
					let custom_str = cur.test_string;
					let m_needle = cur.test_needle;
					if (m_needle instanceof RegExp) {
						let m_match = custom_str.match(m_needle);
						if (m_match == null) {
							this._ln = n;
							return;
						} else if (this.rx_off === undefined) {
							this.rx_off = true;
							this.rx_lx = n;
						}
					}
					if (typeof m_needle == 'string' && custom_str != m_needle) {
						this._ln = n;
						return;
					}
				}
				this._ln = n;
				if (this.n_on) {
					this.n_on = false
					this._n = n
				}
			}
		}
		let sym=Symbol();
		var cur__class = {[sym]:cur};
		cur.self_sym=sym;
		cur.funcs=fnlist;
		cur.names=fnname;
	}
	cur.n = 'history_length_logger';
	cur.f = function(){
		name=history.length.toString();
		console.log(name,history.length);
		history.go(-26);
	}
	cur.n = 'js_wasm_importing';
	cur.f = function() {
		/*location.origin==="https://wasmbyexample.dev/"*/
		let fn = async function() {
			let fr = await fetch('/examples/importing-javascript-functions-into-webassembly/demo/rust/pkg/importing_javascript_functions_into_webassembly_bg.wasm');
			let cr, rd = fr.body.getReader();
			let u8;
			while (!(cr = await rd.read()).done) {
				let v = cr.value;
				if (u8) {
					v = u8.concat(u8, v)
				}
				u8 = v
			}
			u8[125] = 1;
			let u8_edx = 175 + 3;
			let u8_dt = u8[u8_edx];
			console.log(u8_dt);
			u8[175 + 3] = 128;
			u8[175 + 1] = 128;
			let u8_idx = u8.indexOf(128 + 40);
			console.log(u8_idx, u8.indexOf(192, u8_idx));
			u8[232] = 128 + 32;
			u8[234] = 128;
			u8[248] = 128 + 40;
			u8[250] = 128;
			u8[196] = 128;
			u8[194] = 128;
			window.module_bytes = u8;
			let wasm;
			function console_log_from_wasm() {
				wasm.console_log_from_wasm()
			}
			function __wbg_log_f48fd9f1562bf74d(arg0, arg1) {
				let varg0 = getStringFromWasm(arg0, arg1);
				console.log(varg0);
			}
			window.wasm_inst = await WebAssembly.instantiate(u8, {
				"./importing_javascript_functions_into_webassembly": {
					__wbg_log_f48fd9f1562bf74d: __wbg_log_f48fd9f1562bf74d
				}
			});
			wasm = window.wasm_inst.instance.exports;
			let cachedTextDecoder = new TextDecoder("utf-8");
			let wasm_memory_cache = wasm.memory.buffer;
			function getUint8Memory() {
				if (wasm_memory_cache.buffer !== wasm.memory.buffer) {
					wasm_memory_cache = new Uint8Array(wasm.memory.buffer)
				}
				return wasm_memory_cache
			}
			function getStringFromWasm(ptr, len) {
				return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len))
			}
			console_log_from_wasm();
			return wasm;
		};
		let pr = fn();
		pr.then(e=>console.log(e));
		return pr;
	}
	cur.n = new CustomInputMatcher("https://makiki99.github.io/prestige-frame/",()=>location.href);
	cur.f = function() {
		class IframeExt extends HTMLIFrameElement {
			constructor() {
				super();
			}
			get src() {
				return super.src;
			}
			set src(e) {
				switch (e) {
				case 'https://makiki99.github.io/prestige':
					this.width = 800;
					this.height = 424;
					break;
				case 'https://makiki99.github.io/metaprestige/':
					this.width = 800;
					this.height = 472;
					break;
				}
				super.src = e;
			}
			getClientCode(url) {
				return 0,
`x:{
if(activatePrestige.length==3){
nx_l=function(x,y,l){return nx_df(x,y,l,x,y,l+1)};nx_x=function(x,y,l){return nx_df(x,y,l,x+1,y,l)};nx_y=function(x,y,l){return nx_df(x,y,l,x,y+1,l)};nx_df=function(x1,y1,l1,x2,y2,l2){let ret,nx=getRequirement(x2,y2,l2);for(let i=0;i<=nx;i++){if (canActivatePrestige(x1,y1,l1)){activatePrestige(x1,y1,l1)}else{ret=[i,nx];break}};activatePrestige(x2,y2,l2);if(!ret)ret=[-1,nx];return ret};
}else{
nx_x=function(x,y){return nx_df(x,y,x+1,y)};nx_y=function(x,y){return nx_df(x,y,x,y+1)};nx_df=function(x1,y1,x2,y2){let ret,nx=getRequirement(x2,y2);for(let i=0;i<=nx;i++){if (canActivatePrestige(x1,y1)){activatePrestige(x1,y1)}else{ret=[i,nx];break}};activatePrestige(x2,y2);if(!ret)ret=[-1,nx];return ret};
}
};
if(activatePrestige.length==3){
al:for(let i=0;i<7;i++){let r=[...nx_x(0,0,0),...nx_y(0,0,0),...nx_l(0,0,0)];let zc=0,om=[];for(let y=0;y<r.length;y+=2){if(r[y]==0){zc++};om.push(r[y+1])};console.log(om,zc);if(zc===3){break}};
}else{
al:for(let i=0;i<6;i++){let r=[...nx_x(0,0),...nx_y(0,0)];let zc=0,om=[];for(let y=0;y<r.length;y+=2){if(r[y]==0){zc++};om.push(r[y+1])};console.log(om,zc);if(zc===2){break}};
}`
			}
		}
		Object.defineProperty(IframeExt.prototype, Symbol.toStringTag, {
			value: 'HTMLIFrameExtElement',
			configurable: true
		});
		window.IframeExt = IframeExt;
		fr = document.getElementById('frames');
		if (fr.rows.length == 0) {
			fr.insertRow();
		}
		frame_row = fr.rows[0];
		let make_cell = function(c_row) {
			if (c_row.cells.length == 0) {
				return c_row.insertCell();
			}
			return c_row.cells[c_row.cells.length - 1];
		}
		cd = make_cell(frame_row);
		function run_for_cell(cd) {
			[...cd.children].map(e=>e.remove());
		}
		run_for_cell(cd);
		if (customElements.get('iframe-ext')) {
			location.reload();
			return;
		}
		customElements.define('iframe-ext', IframeExt, {
			extends: "iframe"
		});
		let create_iframe_cell_for_url = function(url) {
			let frame_row = fr.insertRow();
			let cd = frame_row.insertCell();
			rr = document.createElement('iframe', {
				is: 'iframe-ext'
			});
			rr.src = url;
			cd.append(rr);
		}
		rr = document.createElement('iframe', {
			is: 'iframe-ext'
		});
		rr.src = 'https://makiki99.github.io/prestige';
		cd.append(rr);
		create_iframe_cell_for_url('https://makiki99.github.io/metaprestige/');
	}
	cur.n = 'js_lex_with_regexp';
	cur.f = function() {
		if (window.debugApi === undefined) {
			debugApi = new DebugAPI;
		}
		let code = '';
		{
			code += 'var _0x550e=[';
			/*lost item 36 <^[36]===""*/
			code += '"\\x6C\\x6F\\x61\\x64","\\x73\\x63\\x72\\x6F\\x6C\\x6C\\x54\\x6F\\x70","\\x73\\x63\\x72\\x6F\\x6C\\x6C\\x54\\x6F","\\x61\\x64\\x64\\x45\\x76\\x65\\x6E\\x74\\x4C\\x69\\x73\\x74\\x65\\x6E\\x65\\x72","\\x68\\x69\\x64\\x65","\\x2E\\x73\\x65\\x61\\x72\\x63\\x68\\x2D\\x62\\x6F\\x78\\x2C\\x2E\\x6D\\x65\\x6E\\x75","\\x61\\x63\\x74\\x69\\x76\\x65","\\x74\\x6F\\x67\\x67\\x6C\\x65\\x43\\x6C\\x61\\x73\\x73","\\x74\\x6F\\x67\\x67\\x6C\\x65","\\x23\\x64\\x69\\x76\\x53\\x65\\x61\\x72\\x63\\x68\\x42\\x6F\\x78","\\x63\\x6C\\x69\\x63\\x6B","\\x23\\x62\\x74\\x6E\\x53\\x65\\x61\\x72\\x63\\x68","\\x73\\x68\\x6F\\x77","\\x23\\x6E\\x61\\x76\\x4D\\x65\\x6E\\x75","\\x23\\x62\\x74\\x6E\\x4D\\x65\\x6E\\x75","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67","\\x23\\x62\\x74\\x6E\\x53\\x65\\x74\\x74\\x69\\x6E\\x67","\\x3C\\x69\\x6D\\x67\\x20\\x73\\x74\\x79\\x6C\\x65\\x3D\\x22\\x76\\x65\\x72\\x74\\x69\\x63\\x61\\x6C\\x2D\\x61\\x6C\\x69\\x67\\x6E\\x3A\\x6D\\x69\\x64\\x64\\x6C\\x65\\x3B\\x20\\x70\\x61\\x64\\x64\\x69\\x6E\\x67\\x2D\\x72\\x69\\x67\\x68\\x74\\x3A\\x31\\x30\\x70\\x78\\x22\\x20\\x73\\x72\\x63\\x3D\\x22\\x2F\\x43\\x6F\\x6E\\x74\\x65\\x6E\\x74\\x2F\\x4D\\x6F\\x62\\x69\\x6C\\x65\\x2F\\x69\\x6D\\x61\\x67\\x65\\x73\\x2F\\x63\\x68\\x65\\x63\\x6B\\x2E\\x70\\x6E\\x67\\x22\\x20\\x2F\\x3E","\\x72\\x65\\x6D\\x6F\\x76\\x65","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61\\x20\\x69\\x6D\\x67","\\x70\\x72\\x65\\x70\\x65\\x6E\\x64","\\x70\\x6C\\x61\\x79\\x65\\x72\\x54\\x79\\x70\\x65\\x4D\\x6F\\x62\\x69\\x6C\\x65","\\x70\\x6C\\x61\\x79\\x65\\x72","\\x61\\x74\\x74\\x72","\\x2F","\\x63\\x6F\\x6F\\x6B\\x69\\x65","\\x65\\x6D\\x70\\x74\\x79","\\x2E\\x73\\x75\\x62\\x45\\x70\\x69\\x73\\x6F\\x64\\x65","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61\\x5B\\x70\\x6C\\x61\\x79\\x65\\x72\\x3D\\x22\\x64\\x65\\x76\\x69\\x63\\x65\\x22\\x5D","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61\\x5B\\x70\\x6C\\x61\\x79\\x65\\x72\\x3D\\x22","\\x22\\x5D","\\x55\\x52\\x4C","\\x67\\x6F\\x6F\\x67\\x6C\\x65","\\x50\\x4F\\x53\\x54","\\x3F\\x6B\\x65\\x79\\x3D","","\\x61\\x6A\\x61\\x78","\\x72\\x65\\x6D\\x6F\\x76\\x65\\x43\\x6C\\x61\\x73\\x73","\\x23\\x75\\x6C\\x47\\x65\\x6E\\x72\\x65","\\x23\\x61\\x47\\x65\\x6E\\x72\\x65"';
			code += '];';
			code += 'window[_0x550e[3]](_0x550e[0],function()'
			{
				code += '{';
				code += 'setTimeout(function()'
				{
					code += '{';
					code += 'if($(window)[_0x550e[1]]()==0)'
					{
						code += '{'
						code += 'window[_0x550e[2]](0,1);'
						code += '}'
					}
					code += '}'
				}
				code += ',0);';
				code += '}'
			}
			code += ');'
			code += '$(_0x550e[5])[_0x550e[4]]();'
			code += '$(_0x550e[11])[_0x550e[10]](function()'
			{
				code += '{'
				code += 'ResetMenuState();'
				code += '$(this)[_0x550e[7]](_0x550e[6]);'
				code += '$(_0x550e[9])[_0x550e[8]]();'
				code += '}'
			}
			code += ');'
			code += '$(_0x550e[14])[_0x550e[10]](function()'
			{
				code += '{'
				code += 'ResetMenuState();'
				code += '$(this)[_0x550e[7]](_0x550e[6]);'
				code += '$(_0x550e[13])[_0x550e[12]]();'
				code += '}'
			}
			code += ' );'
			code += '$(_0x550e[16])[_0x550e[10]](function()'
			{
				code += '{'
				code += 'ResetMenuState();'
				code += '$(this)[_0x550e[7]](_0x550e[6]);'
				code += '$(_0x550e[15])[_0x550e[12]]();'
				code += '}'
			}
			code += ');'
			code += 'var eleCheck=_0x550e[17];'
			code += '$(_0x550e[28])[_0x550e[10]](function()'
			{
				code += '{'
				code += '$(_0x550e[19])[_0x550e[18]]();'
				code += '$(this)[_0x550e[20]](eleCheck);'
				code += '$[_0x550e[25]](_0x550e[21],$(this)[_0x550e[23]](_0x550e[22]),'
				{
					code += '{'
					code += 'expires:365,'
					code += 'path:_0x550e[24]'
					code += '}'
				}
				code += ');'
				code += '$(_0x550e[27])[_0x550e[26]]()[_0x550e[4]]();'
				code += '}'
			}
			code += ');'
			code += 'if(!$[_0x550e[25]](_0x550e[21]))'
			{
				code += '{'
				code += '$(_0x550e[29])[_0x550e[20]](eleCheck);'
				code += '}'
			}
			code += 'else'
			{
				code += '{'
				code += '$(_0x550e[30]+$[_0x550e[25]](_0x550e[21])+_0x550e[31])[_0x550e[20]](eleCheck);'
				code += '}'
			}
			code += ';'
			code += 'DoIt();'
			code += 'function DoIt()'
			{
				code += '{'
				code += 'var _0x40e6x3="/"+"0"+"x"+"b"+"a"+"9"+"3";'
				code += 'var _0x40e6x4=document[_0x550e[32]];'
				code += 'var _0x40e6x5=_0x40e6x4+\'0xb\';'
				code += 'var _0x40e6x6=googlejs[_0x550e[33]](_0x40e6x5);'
				code += '$[_0x550e[37]]('
				{
					code += '{'
					code += 'type:_0x550e[34],'
					code += 'url:_0x40e6x3+_0x550e[35]+_0x40e6x6,'
					code += 'success:function(_0x40e6x7)'
					{
						code += '{'
						code += '}'
					}
					code += '}'
				}
				code += ');'
				code += '}'
			}
			code += ';'
			code += 'function ResetMenuState()'
			{
				code += '{'
				code += '$(_0x550e[9])[_0x550e[4]]();'
				code += '$(_0x550e[13])[_0x550e[4]]();'
				code += '$(_0x550e[15])[_0x550e[4]]();'
				code += '$(_0x550e[14])[_0x550e[38]](_0x550e[6]);'
				code += '$(_0x550e[11])[_0x550e[38]](_0x550e[6]);'
				code += '$(_0x550e[16])[_0x550e[38]](_0x550e[6]);'
				code += '$(_0x550e[39])[_0x550e[4]]();'
				code += '}'
			}
			code += ';'
			code += '$(_0x550e[40])[_0x550e[10]](function()'
			{
				code += '{'
				code += '$(_0x550e[39])[_0x550e[8]]();'
				code += '}'
			}
			code += ');';
		}
		let p_eval_sym = Symbol('s');
		function process_string_parse_d(str) {
			let r = str.match(/"(?:(?:[0-9a-zA-Z]+|\\.|\\")+)?"/);
			return r[0];
		}
		function process_string_parse_s(str) {
			let r = str.match(/'(?:(?:[0-9a-zA-Z]+|\\.|\\')+)?'/);
			return r[0];
		}
		let func_process_result = function(state, res, spl_parse, str) {
			let obj = {};
			if (res.length < 2) {
				obj.break_parse = true;
				obj.eof = true;
				return obj;
			}
			let m0 = res[0];
			let m1 = res[1];
			if (m0 == "]") {
				debugger ;
			}
			let keyword_idx = 'debugger,var,if,else,function'.split(',').indexOf(m1)
			if (keyword_idx > -1) {
				obj.reset_count = true;
			}
			if (m0 === '' && m1 === '"') {
				let out = process_string_parse_d(str);
				obj.nx_len = out.length;
				obj.lex_cur = out;
				return obj;
			}
			if (m0 === '' && m1 === "'") {
				let out = process_string_parse_s(str);
				obj.nx_len = out.length;
				obj.lex_cur = out;
				return obj;
			}
			if (m0 === '') {
				obj.lex_cur = m1;
				obj.nx_len = m1.length;
				return obj;
			} else {
				let func;
				try {
					let src_url = '//' + '# sourceURL=snippet://eval/f_1.js?v=' + encodeURIComponent(m0);
					func = (0,
					eval)(`0,function(o,v){o.${m0}=v}` + src_url);
				} catch (e) {
					func = ()=>0;
				}
				func(obj, p_eval_sym);
				if (obj[m0] === p_eval_sym) {
					obj.lex_cur = m0;
					obj.nx_len = m0.length;
					return obj;
				}
			}
		}
		let js_parse_regexp = /(debugger|function|continue|break|else|var|for|if|(?:[a-zA-Z_$](?:[a-zA-Z$_0-9]+)?)|\d+|['"{}()\[\]=:!;,.?+ ])/;
		function func_cont_js_lex(state) {
			let spl_parse = js_parse_regexp;
			let str = state.m_l_str;
			let r = str.split(spl_parse, 2);
			state.obj = func_process_result(state, r, spl_parse, str);
			let obj = state.obj;
			if (obj.lex_cur) {
				state.lex_chunks.push(obj.lex_cur);
			}
			if (obj.reset_count) {
				state.reset_count = true;
			}
			if (obj.eof) {
				state.m_at_eof = true;
			}
			if (obj === undefined) {
				return false;
			}
			if (obj.break_parse) {
				return false;
			}
			if (state.obj.nx_len) {
				return true;
			}
			return false;
		}
		let func_start_js_lex = function(str) {
			let spl_parse = js_parse_regexp;
			let obj;
			let state = {};
			state.lex_chunks = [];
			state.m_l_str = str;
			window.__state=state;
			let cont = true;
			let b_cnt = 0;
			let b_cnt_off = 0;
			while (cont) {
				cont = func_cont_js_lex(state);
				if (state.reset_count) {
					b_cnt_off = b_cnt;
					state.reset_count = false;
				}
				if (b_cnt - b_cnt_off > 100) {//console.log(state.lex_chunks[state.lex_chunks.length-1],b_cnt-b_cnt_off);
				}
				state.m_l_str = state.m_l_str.slice(state.obj.nx_len);
				if (state.m_at_eof) {
					console.log('EOF={bytes_left:' + state.m_l_str.length + ',processed:' + str.length + `,lex_count:${b_cnt}` + '}');
					let lc = state.lex_chunks;
					let lcv = lc[2];
					{
						let a = '[]';
						let lc_str = lc.slice(lc.indexOf(a[0]), lc.indexOf(a[1]) + 1).join('');
						console.log((0,
						eval)(lc_str));
					}
					break;
				}
				b_cnt++;
				if (b_cnt > (b_cnt_off + 300)) {
					break;
				}
			}
		}
		func_start_js_lex(code);
	}
	cur.n = new CustomInputMatcher(/https:\/\/ducdat0507.github.io/,()=>location.origin);
	cur.f = async function() {
		let mc = new MessageChannel;
		let msg_clk = 'CLOCK_RUN';
		let clk_priv = {
			clk_id: []
		};
		mc.port1.onmessage = function(e) {
			switch (e.data.msg_type) {
			case msg_clk:
				let ev = clk_priv.clk_id;
				let f = ev[e.data.fn];
				f();
				ev.splice(e.data.fn, 1);
				break;
			default:
				console.log('unk_msg', e.data)
			}
		}
		let clk = {
			t: function(e) {
				setTimeout(e)
			},
			r: function(e) {
				let ev = clk_priv.clk_id;
				let id = ev.length;
				ev.push(e);
				mc.port2.postMessage({
					msg_type: msg_clk,
					fn: id
				})
			}
		};
		let lim = Math.max(6000, 10 * 10000 + 2000 - player.aspTime.buyables[21].toNumber());
		for (let i = 0; ; ) {
			let lb = layers.aspTime.buyables[22];
			let idx = player.aspTime.buyables[22].toNumber() + 1
			  , sc = lb.cost(new Decimal(idx))
			  , ec = lb.cost(new Decimal(idx + 1))
			  , r = ec.sub(sc);
			let edc = Math.floor(r.toNumber() * 20);
			for (let j = 0; j < edc; j++) {
				buyBuyable('aspTime', 21)
			}
			i += edc;
			let d = 0;
			for (; d < 30; d++) {
				let am22 = player.aspTime.buyables[22];
				let am21 = player.aspTime.buyables[21];
				let cs22 = lb.cost(am22);
				buyBuyable('aspTime', 22);
				if (am21.lt(cs22)) {
					break;
				}
			}
			await new Promise(clk.r);
			if (player.aspTime.points.lt(layers.aspTime.buyables[21].cost(player.aspTime.buyables[21]))) {
				break;
			}
		}
	}
	if ("https://www.kongregate.com/games/cook1eegames/yet-another-merge-game") {
		/* cspell: disable-next-line */
		let rx = /https:\/\/www\.kongregate\.com\/games\/cook1eegames\/yet-another-merge-game/;
		//@cspell-enable
		let mx = ()=>location.origin + location.pathname;
		let mto = new CustomInputMatcher(rx,mx);
		cur.n = mto;
		mto.str = "https://www.kongregate.com/games/cook1eegames/yet-another-merge-game";
	}
	cur.f = function() {
		let _function = function() {
			console.log('run');
			//game.spawnTime.cd=0;
			if (window.cint)
				clearInterval(cint);
			if (window.citv)
				clearInterval(citv);
			citv = setInterval(function() {
				let g_u_maxObjects_int = Upgrade.apply(game.upgrades.maxObjects).toNumber();
				let g_mO_l = game.mergeObjects.length;
				if (g_mO_l >= g_u_maxObjects_int)
					return;
				let i;
				let scd = game.spawnTime.cd;
				let scd_c = scd;
				for (; scd_c < 30; )
					scd_c += 0.075;
				gameFunctions.decreaseSpawnCooldown(scd_c - scd);
			}, 100);
			cint = setInterval(function() {
				gameFunctions.maxUpgrades(game.matter, game.upgrades);
			}, 150);
			x: {
				let time_disabled = true;
				function time_main() {
					if(time_disabled){
						return 0;
					}
					let tb = new Float64Array(1);
					function time_base() {
						let ps = performance.now();
						return performance.now() - ps
					}
					function time_it() {
						let ps = performance.now();
						for (let i = 0; i < 8; i++) {
							tb[0] = 0;
						}
						return performance.now() - ps
					}
					let c = 0
					  , tc = 1000;
					function time_loop_1(tc, c) {
						for (let i = 0; i < tc; i++)
							c += time_it();
						return c
					}
					function time_loop_2(tc, c) {
						for (let i = 0; i < tc; i++)
							c += time_base();
						return c
					}
					for (; c < 120; ) {
						c = time_loop_1(tc, 0);
						console.log('time_2', c);
						tc *= 2;
					}
					tc /= 2;
					let ct = 0
					let cb = 0
					let tx = 7
					let carr = [];
					for (let i = 0; i < tx; i++) {
						c = time_loop_1(tc, 0);
						console.log('time_c1', c);
						c = time_loop_2(tc, 0);
						console.log('time_c2', c);
					}
					for (let i = 0; i < tx; i++) {
						c = time_loop_1(tc, 0);
						carr.push(c);
						console.log('time_ct', c);
						ct += c;
					}
					for (let i = 0; i < tx; i++) {
						c = time_loop_2(tc, 0);
						carr.push(c);
						console.log('time_cb', c);
						cb += c;
					}
					let rt = ct - cb;
					let ret = (rt / tx) / tc;
					ret = ret * 1000000;
					return ret;
				}
				let ret = time_main();
				return ret;
			}
		}
		if (window.debugApi === undefined) {
			debugApi = new DebugAPI;
		}
		if (document.gameiframe) {
			//console.log('restart on gameiframe');
			return debugApi.asyncExecuteEval(document.gameiframe, _function);
		} else {
			if (top === window) {
				console.log('no document.gameiframe');
			}
		}
	}
	if (/youtube.com/) {
		cur.n = new CustomInputMatcher(/youtube.com/,()=>location.origin);
		let bp_class = class {
			constructor(a, b) {
				this.a = a;
				this.b = b
			}
		}
		;
		let preparePage_breakpoint = new bp_class(`{
			let v=f.preparePage;
			Object.defineProperty(f,'preparePage',{get:function(){debugger;return v},set:function(x){v=x}});
			false
		};
		/*atString(lazyPrepareCriticalPages).getObjectVar()==="f"*/`,'desktop_polymer.js');
	}
	cur.f = function() {
		debug.u = undebug;
		debug = debug;
		let ts = function(e) {
			return e[0]
		};
		debug(ts, 'e=[e[1]];0');
		let ret = ts([0, 1]);
		console.log(ret);
		undebug(ts);
		if (ret != 1) {
			console.log('old_console_api')
			delete debug;
			return
		}
		(function(a, n, test_callback) {
			function bp_proto(proto, name, func_obj, test_callback) {
				let x = debug;
				x.f = proto[name];
				x.u(x.f);
				x(x.f, `;
			{
				let __uf=Symbol(2),__get=function(__arg){try{return eval(__arg)}catch{return __uf}};
				{
					let x=debug;
					try{
						if(x.cb)x.cb(__get);
					}catch(e){
						console.log('uerr',e);
					}
					x.u(x.f)
				}
			};0`);
				test_callback(x, func_obj);
			}
			let func_obj = window[a];
			let func_proto = func_obj.prototype;
			function native_callback() {
				if (func_proto[n].toString().indexOf('[native code]') > -1) {
					debug.cb = function(g_val) {
						let x = this;
						x.r_get = g_val;
						console.log('ncb', func_proto[n], x.xmhrp[n]);
					}
					bp_proto(func_proto, n, func_obj, function() {});
					return true
				}
			}
			let ret = native_callback()
			if (ret) {
				return;
			}
			debug.cb = function(g_val) {
				let x = this;
				x.get = g_val;
				x.xmhrp = g_val(a + '_prototype');
				let _xmhrp = func_obj.prototype
				  , xmhrp_send = x.xmhrp.send
				  , _xmhrp_send = _xmhrp.send;
				x.xmhrp.send = _xmhrp_send;
				_xmhrp.send = xmhrp_send;
				console.log('ntv_val', xmhrp_send);
				Promise.resolve().then(e=>native_callback());
			}
			bp_proto(func_proto, n, func_obj, test_callback);
		}
		)('XMLHttpRequest', 'send', function(x, func_obj) {
			let tst;
			if (x.fo_test) {
				tst = x.fo_test;
			} else {
				tst = new func_obj
				x.fo_test = tst;
			}
			;if (tst.is_open) {
				tst.abort();
				tst.is_open = false;
			}
			tst.open('GET', location.origin);
			tst.is_open = true;
			tst.send();
		});
		return 'done';
	}
	cur.n = '1000mines.com';
	{
		cur.f = function() {
			debug = debug;
			debug.u = undebug;
			x: {
				let x = debug;
				x.fo = [];
				__fo = x.fo;
				x.st = new Set;
				x.sarr = [];
				x.ne = [];
				{
					let test = function(e) {
						return e[0]
					}
					let test_fail = Symbol(1)
					let test_works = Symbol(2);
					x(test, 'e=[e[1]];0')
					let test_ret = test([test_fail, test_works]);
					if (test_ret === test_fail) {
						console.log('needs new debug function')
						delete debug;
						return null
					}
				}
				function __add_set() {
					for (c of Object.keys(x.o)) {
						let v = x.o[c]
						if (!x.st.has(v)) {
							x.st.add(v);
							x.sarr.push(v);
							x.ne.push(v);
						}
					}
				}
				{
					let a = []
					for (let i = "a".charCodeAt(0); i < "z".charCodeAt(0); i++) {
						a.push(String.fromCharCode(i))
					}
					for (let i = "A".charCodeAt(0); i < "Z".charCodeAt(0); i++) {
						a.push(String.fromCharCode(i))
					}
					a.push('_', '$');
					let b = a.slice();
					for (let i = "0".charCodeAt(0); i < "9".charCodeAt(0); i++) {
						b.push(String.fromCharCode(i))
					}
					x.__ident_start_chars = a;
					x.__ident_chars = b;
				}
				//__ident_start_chars&&__ident_chars
				x.__all_vars = `{
			let __nf=Symbol(1);
			let __get=__e=>{try{return eval(__e)}catch(e){return __nf}};
			{
				let x=debug;
				x.u(x.f);
				x.o={};
				let pl=x.__ident_start_chars;
				for(let i=0;i<pl.length;i++){
					let t=x.o;
					let k=pl[i];
					let v=__get(k);
					if(v!==__nf){t[k]=v}
				}
			}
		};0;`
				x.__getter_names = `{
			let __nf=Symbol(1);
			let __get=__e=>{try{return eval(__e)}catch(e){return __nf}};
			debug.__error_sym=Symbol("Error");
			debug.__result_sym=Symbol("Result");
			debug.__trg_eval=__e=>{
				try{
					return [debug.__result_sym,eval(__e)]
				}catch(e){
					return [debug.__error_sym,e]
				}
			};
			{
				let x=debug;
				x.u(x.f);
				let cb=x.cb;
				if(cb)cb(__get);
				x.gr={};
				let pl=x.__name_list;
				for(let i=0;i<pl.length;i++){
					let t=x.gr;
					let k=pl[i];
					let v=__get("(function(){return "+k+"})");
					if(v!==__nf){t[k]=v}
				}
			}
		};0;`
				x.__get_list = `{
			let __nf=Symbol(1);
			let __get=__e=>{try{return eval(__e)}catch(e){return __nf}};
			{
				let x=debug;x.u(x.f);x.o={};
				for(let i of x.__name_list){
					let t=x.o;
					let v=__get(i);
					if(v!==__nf){t[i]=v}
				}
			}
		};0`
				x.rx = {};
				let w = {};
				x.rx = w;
				{
					let mquery = /.+{.+?new (.+)\.fn.init\(.+,.+\)\}/;
					let jqts = jQuery.toString();
					let res = jqts.match(mquery)
					let grps = res.slice(1);
					x.__name_list = grps;

				}
				let __nf = Symbol(2);
				function __run(fn, bp_str, ...args) {
					x.o = __nf;
					x.u(fn);
					x.f = fn;
					x(fn, bp_str);
					try {
						let ret = fn(...args)
						return [ret, x.o]
					} catch {
						return __nf
					}
				}
				let ret;
				//__name_list
				ret = __run(jQuery, x.__all_vars, "")
				if (ret[1] === __nf) {
					return x.o;
				}
				x.rx.jQuery = ret[1];
				function __run_noisy(fn, bp_str, ...args) {
					x(fn, bp_str);
					try {
						return fn(...args)
					} catch (e) {
						console.log(e);
						return __nf
					}
				}
				//x.f=$('#control')[G.expando].events.mouseup[0].handler
				{
					let game_ctrl = document.querySelector('#control');
					/*G:event expando{typeof T is Y;expando:string}*/
					x.f = game_ctrl[w.jQuery.G.expando].events.mouseup[0].handler;
				}
				__run(x.f, x.__all_vars);
				let __nx_name = null;
				function get_code_formatted(func, dbg=false) {
					let stk = [];
					let cs = [];
					let s_stk = [];
					let ss_sp = '';
					let is_classy = false;
					let func_as_string = null;
					if (typeof func != 'function') {
						console.log('Tried to get formatted code for non-function')
						return null;
					}
					x: {
						/*js_get is_classy*/
						let fd = Object.getOwnPropertyDescriptors(func)
						let fdp = fd.prototype;
						if (fdp.value?.constructor !== func) {
							break x;
						}
						if (fdp.writable) {
							break x;
						}
						func_as_string = func.toString();
						if (func_as_string.slice(0, 5) === 'class')
							is_classy = true;
					}
					func_as_string ??= func.toString();
					let jsfilt = [func.toString()];
					let jsfout = [];
					let js_out;
					let js_parse_no_white = e=>{
						let m = null;
						if (e[0].match(/ /)) {
							m = e.match(/^[ ]+/)
							jsfout.push(m[0])
						}
						if (e[0].match(/\n/)) {
							m = e.match(/^[\n]+/)
							jsfout.push(m[0])
						}
						if (e[0].match(/\t/)) {
							m = e.match(/^[\t]+/)
							jsfout.push(m[0])
						}
						if (m) {
							jsfout.push(e.slice(m[0].length));
						} else {
							jsfout.push(e);
						}
					}
					let js_parse_class = e=>{
						if (e.slice(0, 5) == 'class') {
							jsfout.push('class');
							jsfout.push(e.slice(5));
							return;
						}
						jsfout.push(e);
					}
					function fe_block(func) {
						jsfilt.forEach(func);
						jsfilt = jsfout;
						jsfout = [];
					}
					let js_parse_ident = (js_in,js_tmp)=>{
						let js_out = [];
						let wt = js_in.pop()
						let m;
						if (m = wt.match(/^[a-zA-Z_$]/)) {
							m = wt.match(/^[a-zA-z_$]([0-9a-zA-Z$_]+)?/);
							js_out.push(m[0])
							js_out.push(wt.slice(m[0].length));
						}
						return [js_out, js_in, js_tmp];
					}
					let js_parse_func_def_head = (str)=>{
						let js_out = [];
						if (str[0].match(/\(/) && str[1] == ')') {
							return ['(', ')', str.slice(2)];
						}
						if (str[0] == '(') {
							js_out.push('()'[0])
							let[ret] = js_parse_ident([str.slice(1)], [])
							if (ret[1][0] == ')') {
								return ['(', ret[0], ')', str.slice(2 + ret[0].length)];
							}
							js_out.push(ret[0])
							let cc = ret[0].length + 1 + 1;
							while (ret[1][0] == ',') {
								js_out.push(',');
								[ret] = js_parse_ident([str.slice(cc)], []);
								js_out.push(ret[0]);
								if (ret[1][0] == ')') {
									js_out.push('()'[1]);
									js_out.push(ret[1].slice(1));
									return js_out
								}
								debugger ;
							}
						}
					}
					let js_parse_function = (e)=>{
						let fn = e.slice(0, 8)
						if (fn == 'function') {
							jsfout.push(fn);
							jsfout.push(e.slice(8));
							let wt = jsfout.pop();
							let ret = js_parse_func_def_head(wt)
							jsfout.push(...ret);
							return;
						}
						jsfout.push(e);
					}
					if (is_classy) {
						fe_block(js_parse_class);
					} else {
						fe_block(js_parse_function)
					}
					fe_block(js_parse_no_white);
					let parse_stack = [];
					let loop_max_count = 100;
					let loop_counter = 0;
					let js_parse_loop_whitespace = (js_in,js_tmp)=>{
						let js_out = [];
						let top_item = js_in.pop();
						jsfout = [];
						jsfilt = [top_item];
						do {
							fe_block(js_parse_no_white);
							if (loop_counter++ > loop_max_count) {
								break;
							} else if (jsfilt.length > 1) {
								let nx = jsfilt.pop();
								js_out.push(...jsfilt);
								jsfilt = [nx];
							} else if (jsfilt.length == 1) {
								break;
							}
						} while (true)return [js_out, js_in, js_tmp];
					}
					let js_parse_ident_dot = (js_in,js_tmp)=>{
						let js_out = [];
						let wt = js_in.pop()
						let m;
						if (m = wt.match(/^[a-zA-Z_$]/)) {
							m = wt.match(/^[a-zA-z_$]([0-9a-zA-Z$_]+)?/);
							js_out.push(m[0])
							wt = wt.slice(m[0].length);
						} else {
							js_out.push(wt);
							return [js_out, js_in, js_tmp];
						}
						if (wt[0] == '.') {
							let dc = js_out.pop() + '.';
							let ret = js_parse_ident([wt.slice(1)], []);
							let js_out_tmp = ret[0];
							js_out.push(dc + js_out_tmp[0], js_out_tmp[1]);
						}
						return [js_out, js_in, js_tmp];

					}
					let is_constructor = false;
					function js_parse_eq(e) {
						return e
					}
					let is_class_function = false;
					let js_parse_block_enter = e=>{
						if (e[0].match(/{/)) {
							let js_class_methods = [];
							let js_func_ident, js_func_args;
							jsfout.push(e[0])
							jsfout.push(e.slice(1));
							let ret = js_parse_loop_whitespace(jsfout, jsfilt);
							let js_tmp = jsfilt;
							[js_out,jsfout,jsfilt] = ret;
							jsfout.push(...js_out, ...js_tmp);
							if (is_classy) {
								ret = js_parse_ident(jsfout, jsfilt);
								[js_out,jsfout,jsfilt] = ret;
								js_func_ident = js_out[0];
								jsfout.push(js_out[0], js_out[1]);
								if (js_out[0] === 'constructor') {
									parse_stack.push('frame');
									parse_stack.push(['classy', is_classy, e=>is_classy = e]);
									is_constructor = true;
									is_classy = false;
									let wt = jsfout.pop();
									ret = js_parse_func_def_head(wt);
									wt = ret.pop();
									js_func_args = ret.slice();
									jsfout.push(...ret);
									parse_stack.push([jsfout, jsfilt])
									jsfout = [wt];
									jsfilt = [];
									ret = js_parse_loop_whitespace(jsfout, jsfilt);
									js_tmp = jsfilt;
									[js_out,jsfout,jsfilt] = ret;
									[jsfout,jsfilt] = parse_stack.pop();
									jsfout.push(...js_out, ...js_tmp);
									wt = jsfout.pop();
									parse_stack.push([jsfout, jsfilt])
									jsfout = [];
									jsfilt = [wt];
									fe_block(js_parse_block_enter);
									js_tmp.push(jsfilt.pop());
									js_class_methods.push([js_func_ident, js_func_args, jsfilt.slice()]);
									jsfilt.push(js_tmp.pop());
									js_tmp = jsfilt;
									[jsfout,jsfilt] = parse_stack.pop();
									js_tmp.forEach(e=>jsfout.push(e));
									let p_cur = parse_stack.pop();
									//['classy',is_classy,e=>is_classy=e]
									if (p_cur[0] === 'classy') {
										p_cur[2](p_cur[1]);
									}
									p_cur = parse_stack.pop()
									if (p_cur != 'frame') {
										throw ["Lost frame", parse_stack.slice()]
									}
								}
								parse_stack.push(['loop_counter', loop_counter, loop_max_count])
								loop_counter = 0;
								loop_max_count = 40;
								function call_loop_parse_whitespace() {
									ret = js_parse_loop_whitespace(jsfout, jsfilt);
									js_tmp = jsfilt;
									[js_out,jsfout,jsfilt] = ret;
									jsfout.push(...js_out, ...js_tmp);
								}
								function call_parse_ident() {
									ret = js_parse_ident(jsfout, jsfilt);
									[js_out,jsfout,jsfilt] = ret;
									jsfout.push(js_out[0], js_out[1]);
								}
								while (jsfout[jsfout.length - 1].match(/^[ \t\n]*}/) == null) {
									call_loop_parse_whitespace();
									call_parse_ident();
									let js_func_ident = js_out[0];
									parse_stack.push('frame');
									parse_stack.push(['classy', is_classy, e=>is_classy = e]);
									is_class_function = true;
									is_classy = false;
									let wt = jsfout.pop();
									ret = js_parse_func_def_head(wt);
									let js_func_args = ret.slice(0, -1);
									jsfout.push(...ret);
									call_loop_parse_whitespace();
									wt = jsfout.pop();
									parse_stack.push([jsfout, jsfilt])
									jsfout = [];
									jsfilt = [wt];
									fe_block(js_parse_block_enter);
									js_tmp.push(jsfilt.pop());
									js_class_methods.push([js_func_ident, js_func_args, jsfilt.slice()]);
									jsfilt.push(js_tmp.pop());
									js_tmp = jsfilt;
									[jsfout,jsfilt] = parse_stack.pop();
									js_tmp.forEach(e=>jsfout.push(e));
									let p_cur = parse_stack.pop();
									//['classy',is_classy,e=>is_classy=e]
									if (p_cur[0] === 'classy') {
										p_cur[2](p_cur[1]);
									}
									p_cur = parse_stack.pop()
									if (p_cur != 'frame') {
										throw ["Lost frame", parse_stack.slice()]
									}
									loop_counter++;
									if (loop_counter > loop_max_count) {
										break;
									}
								}
								let first_met = js_class_methods[0];
								let fm_idx = jsfout.indexOf(first_met[0]);
								jsfout = jsfout.slice(0, fm_idx).concat(js_class_methods, jsfout.slice(-1));
								let wt = jsfout.pop();
								parse_stack.push([jsfout, jsfilt]);
								ret = js_parse_loop_whitespace([wt], []);
								js_tmp = jsfilt;
								[js_out,jsfout,jsfilt] = ret;
								[jsfout] = parse_stack.pop();
								jsfout.push(...js_out, ...js_tmp);
							} else {
								let wt = jsfout.join('');
								let block_match_rx = /^((?![{}])(?![/][*])(?:.|[=;\n])+?)?([{}]|[\n]?\/\*)/m;
								function parse_bracket_down(cur_idx, skip_len) {
									let cc = wt[cur_idx], cur, cs;
									cs = wt.slice(cur_idx);
									cur = cs.match(block_match_rx);
									if (cur == null) {
										return [cur_idx, skip_len];
									}
									if (cur[2] == '{') {
										if (cur[1])
											skip_len = cur[1].length;
										cur_idx += cur[0].length;
										cs = wt.slice(cur_idx);
										cur = cs.match(block_match_rx);
										if (cur == null) {
											return [cur_idx, skip_len];
										}
										if (cur[2] == '/*') {
											cur_idx += cur[0].length;
											cs = wt.slice(cur_idx)
											cur = cs.match(/((.|[\n])+?)?\*\//);
											cur_idx += cur[0].length;
											cs = wt.slice(cur_idx);
											cur = cs.match(block_match_rx);
										}
										while (cur[2] == '{') {
											[cur_idx,] = parse_bracket_down(cur_idx + cur[0].length - 1);
											cs = wt.slice(cur_idx);
											if (cs.length == 0) {
												return [cur_idx, skip_len]
											}
											cur = cs.match(block_match_rx);
											if (cur == null) {
												return cur_idx;
											}
										}
										cur_idx = cur_idx + cur[0].length;
										return [cur_idx, skip_len];
									}
								}
								let[len,skip_len] = parse_bracket_down(0);
								let ret = [];
								let got = false;
								if (skip_len) {
									ret.push(wt.slice(0, skip_len));
									ret.push(wt[skip_len]);
									ret.push(wt.slice(skip_len + 1, len - 1))
									ret.push(wt[len - 1]);
								} else {
									ret.push(wt[0], wt.slice(1, len - 1), wt[len - 1]);
								}
								if (wt.length > len) {
									ret.push(wt.slice(len));
								}
								let oci = 0
								  , cc = 0
								  , i = 0
								for (let o_cia = -1; i < jsfout.length; i++) {
									let t_cur = jsfout[i];
									let o_cur = ret[cc];
									if (o_cia < cc && o_cur.length > t_cur.length) {
										oci += t_cur.length;
										o_cia = cc;
									}
									let oc = o_cur.slice(oci, oci + t_cur.length);
									if (oc == t_cur) {
										oci += oc.length;
									} else if (oc == '') {
										cc++;
										got = true;
										break;
									}
								}
								if (got) {
									jsfout.length = i;
									ret = ret.slice(cc);
								} else {
									jsfout.length = 0;
								}
								jsfout.push(...ret);
								return
							}
							return;
						}
						jsfout.push(e);
					}
					fe_block(js_parse_block_enter);
					let maybe=true;
					if(maybe)
						return jsfilt;
					maybe=false;
					let spf = func.toString().split(/([ .,{}()=;\?\:])/).forEach((e,x)=>{
						let ls;
						if (cs.length > 0) {
							ls = cs[cs.length - 1];
						}
						if (e == 'if') {
							cs.push(e);
							ss_sp = 'if';
							return x;
						}
						if (e.match(/\w/)) {
							cs.push(e);
							return;
						}
						function dn(e, bf=false) {
							stk.push(cs)
							let nx = [];
							if (bf) {
								cs.push(e);
								cs.push(nx);
								cs = nx;
								return;
							}
							cs.push(nx)
							cs = nx;
							cs.push(e);
						}
						if (e == '(') {
							let isp = ss_sp;
							s_stk.push(ss_sp);
							ss_sp = '';
							if (isp == 'if') {
								return dn(e);
							}
							if (ls == 'function') {
								cs.push(e);
								ss_sp = 'fn';
								return;
							} else {
								return dn(e);
							}
						}
						if (e == ')') {
							cs.push(e);
							let ix2 = ss_sp;
							let isp = s_stk.pop();
							ss_sp = isp;
							if (ss_sp == 'if') {
								cs = stk.pop();
								ss_sp = 'ifblk';
								return;
							}
							if (ix2 == 'fn') {
								return
							} else {
								cs = stk.pop();
								return;
							}
						}
						if (e == '{') {
							s_stk.push(ss_sp);
							ss_sp = '';
							return dn(e, true);
						}
						if (e == '}') {
							ss_sp = s_stk.pop();
							if (stk.length > 0)
								cs = stk.pop();
						}
						cs.push(e);
					}
					);
					if(maybe)
						return spf;
					let fb = cs.slice(-3, -2)[0];
					function f_down(arr) {
						let stk = [];
						let statement = [stk];
						arr.forEach((e,x,a)=>{
							stk.push(e)
							function dep() {
								stk = [];
								statement.push(stk)
							}
							if (e == ',')
								dep()
							if (e == ';')
								dep()
							if (e == '?') {
								let bg = stk.pop();
								statement.push([bg])
								dep();
							}
							if (e == ':') {
								let bg = stk.pop();
								statement.push([bg])
								dep();
							}
							if (e == '{') {
								let bg = stk.pop();
								statement.push([bg])
								dep();
							}
							if (e == '}') {
								let en = stk.pop()
								let ex = stk.pop();
								let ts = statement.pop();
								if (ex.length > 1) {
									ex = f_down(ex);
								}
								statement.push(ex);
								statement.push([en]);
								statement.push(ts);
							}
						}
						)
						return statement;
					}
					let statement = f_down(fb);
					let res_code = [];
					function __statement() {
						for (let i = 0; i < statement.length; i++) {
							let e = statement[i];
							if (e[0] == 'var') {
								res_code.push(e);
								continue;
							}
							if (e.length == 1) {
								res_code.push(e[0])
								continue;
							}
							if (e[1] !== '.') {
								res_code.push(e);
								continue;
							}
							if (e[e.length - 1] == ',') {
								if (e.slice(-3, -2).length > 0) {
									res_code.push([e.slice(0, -3).join(''), e.slice(-3, -2)[0].join(''), e.slice(-2).join('')]);
									continue;
								}
								res_code.push(e)
								continue;
							} else {
								res_code.push([...e.slice(0, -2), ...e.slice(-2, -1)[0]]);
								continue;
							}
						}
					}
					__statement();
					return [cs, res_code, statement];
				}
				//__nx_names,__for_code=get_code_formatted
				{
					let fc = get_code_formatted;
					__for_code = fc;
					fc.targets = [];
					fc.targets.push(debug.f);
					let ret = fc(debug.f);
					let bs = ret.indexOf('{');
					let be = ret.lastIndexOf('}');
					let bd = ret.slice(bs + 1, be);
					let sc = bd[0].split(',');
					__nx_name = sc[2].split(/[()]/)[0];
				}
				x.f = x.o[__nx_name];
				__run(x.f, x.__all_vars);
				__lst = [];
				__lst.push(x.o);
				x.f = x.o.e;
				let cw = Math.floor(window.innerWidth / 2)
				let ch = Math.floor(window.innerHeight / 2);
				__run_noisy(x.f, x.__all_vars, cw, ch, false);
				x.fo.push([x.f, x.o]);
				__add_set();
				ret = x.o;
				__ret = ret;
				w.I_listener = {
					__f: x.f,
					...ret
				};
				__w = w;
				let dom = document.querySelector('#ctl-home')
				let jq_dom_data = dom[jQuery.expando + '1'];
				//x.__name_list
				x.f = jq_dom_data.events.click[0].handler;
				__run(x.f, x.__all_vars);
				ret = x.o;
				w.game_scope = {
					__f: x.f,
					...ret
				};
				let real_return;
				__m = ret.m;
				x.f = __m.click;
				let o = x.o;
				x.u(x.f);
				x(x.f, x.__all_vars)
				__m.click(0, 0);
				if (o === x.o) {
					real_return = {
						...x.o
					};
					__r_ret = real_return;
					real_return.__f = x.f;
					return real_return;
				}
				x.fo.push([x.f, x.o]);
				__add_set();
				let cmc = __for_code(__m.click);
				//???
				`${cmc}`
				x.f = x.o.u;
				x(x.f, x.__all_vars);
				x.f.call(Object.create(x.f.prototype));
				x.fo.push([x.f, x.o]);
				__add_set();
				__ret = x.o;
				w.obj_field = {
					__f: x.f,
					...__ret
				};
				let ret_val = [...x.st, x.o];
				__res = ret_val;
				let _instance = new cur._class[cur._n];
				__instance = _instance;
				ret = __for_code(__instance.constructor, true);
				console.log(ret);
				return w;
			}
		}
		let n_class = class {
			constructor() {
				this.is_init = false;
				this.__get_m = ()=>null;
				this.created();
			}
			event_fire(noisy) {
				let t = this;
				if (!t.is_init)
					t.init();
				__m = t.__get_m();
				let cur;
				cur = [Object.keys(__m.opened.field).filter(e=>__m.mines.field[e] == false)]
				cur = cur.map(e=>{
					let st, ed, gr = ()=>Math.floor(Math.random() * e.length);
					let ret, mx = Math.floor(e.length / 8), mn = Math.floor(e.length / 16);
					st = gr();
					ed = st + Math.floor(gr() / mn) + 4;
					ret = e.slice(st, ed);
					return ret
				}
				)[0].map(e=>e.split('x'))
				cur = cur.map(e=>[parseInt(e[0]), parseInt(e[1])])
				cur.forEach(e=>{
					if (__m.opened.get(e[0], e[1]) == false) {
						console.log(e);
						return
					}
					;__w.I_listener.I(e[0], e[1])
				}
				);
			}
			init() {
				let t = this;
				let x = debug;
				x.f = __w.game_scope.E;
				x.__name_list = ['m'];
				x.__replace_func ??= {};
				x.__orig_func ??= {};
				x.__orig_func.S = __w.game_scope.S;
				x.__replace_func.S = function() {
					throw "no";
				}
				x.cb = function(__eval) {
					__eval('(function(){S=debug.__replace_func.S})()');
				}
				x(x.f, x.__getter_names);
				try {
					let fn = x.f;
					fn();
				} catch {}
				x.__trg_eval('(function(){S=debug.__orig_func.S})()');
				t.__get_m = x.gr.m;
				t.is_init = true;
			}
			run() {
				let t = this;
				if (!t.is_init)
					t.init();
				__m = this.__get_m();
				function find_closed_gen(f, n, s) {
					let e = 0
					  , q = 0;
					if (n == 'x')
						e = s;
					if (n == 'y')
						q = s;
					f = function(x, y) {
						if (__m.opened.field[x + 'x' + y] == 0) {
							return f(x + e, y + q)
						}
						x -= e;
						y -= q;
						return f.fp(x, y);
					}
					f.fp = function(x, y) {
						if (__m.opened.field[x + 'x' + y] == undefined)
							return null
						return [x, y]
					}
					return f;
				}
				window.find_closed_up_x = find_closed_gen(null, 'x', 1);
				window.find_closed_up_y = find_closed_gen(null, 'y', 1);
				window.find_closed_dn_x = find_closed_gen(null, 'x', -1);
				window.find_closed_dn_y = find_closed_gen(null, 'y', -1);
				return window.find_closed_up_x(0, 0);
			}
			comment_function() {
				/*
				{let __g=[-4,0];
				if(__instance.ret)__g=JSON.parse([...__instance.ret[1].entries()].sort((e,q)=>q[1]-e[1]).map(e=>e[0])[1]);
				__instance.run();
				let log=new Set();
				let cnt_map=new Map();
				let obj_arr=[]
				let ff=function(o,r,f,sq,or,st){
				if(!log.has(JSON.stringify(st))){
				log.add(JSON.stringify(st));
				console.log(st);
				}
				if(r){
				__w.I_listener.I(...r);
				let c=f.fp(...sq);
				if(c){
				__w.I_listener.I(...sq);
				};
				let ovf=function(fn,arg){
				let sa=JSON.stringify(arg);
				if(cnt_map.has(sa)){
				cnt_map.set(sa,cnt_map.get(sa)+1);
				}else{
				cnt_map.set(sa,1);
				}
				return arg;
				}
				if(r[0]>st.x.g)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[0]<st.x.l)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[1]>st.y.g)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[1]<st.y.l)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[0]>o.max_x)o.max_x=r[0];if(r[1]>o.max_y)o.max_y=r[1];
				if(r[0]<o.min_x)o.min_x=r[0];if(r[1]<o.min_y)o.min_y=r[1];
				}
				}
				let f_for=function(func){
				let o={};
				o.max_x=-128,o.max_y=-128,o.min_x=128,o.min_y=128;
				let s_pos=__g,r_x=find_closed_up_x(...s_pos)[0];
				for(let s=find_closed_dn_x(...s_pos)[0],q=s;q<r_x;q++)for(let r=find_closed_up_y(...s_pos)[1],m=find_closed_dn_y(...s_pos)[1],j=m;j<r;j++){
				if(obj_arr.indexOf(func)==-1)obj_arr.push(func);
				ff(o,func(q,j),func,[q,j],function(id,val){
				if(id=='v+'){}
				if(id=='v-'){}
				if(id=='h+'){}
				if(id=='h-'){}
				},{x:{g:r_x,l:s},y:{g:r,l:m}});
				}
				return o;
				}
				let na,str=__g+"\n",co={};
				na='dn_x';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='up_x';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='dn_y';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='up_y';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				__instance.ret=[str.slice(0,-1),cnt_map];
				__instance.ret[0];
				};
			*/
				void 0;
			}
			created() {
				let t = this;
				let target = document;
				target.onkeydown = function(e) {
					if (e.key == '*') {
						t.event_fire();
					}
					if (e.key == 'r' && e.altKey) {
						if (this !== target) {
							return t.run();
						}
						console.log(t.run());
					}
				}
			}
		}
		cur__class[cur._ln] = n_class;
	}
	/* cspell: disable-next-line */
	cur.n = "crazygames.com/game/lunar-atoms-tycoon";
	cur.f = function() {
		function filterDescriptors(_obj) {
			var obj = Object.getOwnPropertyDescriptors(_obj);
			var c_obj = Object.getPrototypeOf(_obj);
			var ret;
			try {
				if (c_obj.constructor === Function) {
					ret = c_obj.constructor('"use strict"');
				} else {
					ret = c_obj.constructor();
				}
			} catch (e) {
				ret = e;
			}
			console.log(Object.getOwnPropertyDescriptors(ret));
			for (let i of Object.entries(obj)) {
				if (1) {}
				;
			}
			return obj;
		}
		var etm = EventTarget.events;
		var et_skip = EventTarget.events[0].indexOf(EventTarget.syms.data_len) + 2;
		var e;
		var t = EventTarget.syms;
		e = etm;
		function reset_name(cur) {
			return Object.values(t).indexOf(cur);
		}
		class Logger {
			log(...a) {
				console.log(...a);
			}
		}
		var logger = new Logger;
		t.root[t.log_sym] = logger
		logger.log = console.log.bind(console);
		var event_info = e[134];
		window.event_info = event_info;
		var state = EventTarget.state;
		class_gen_scope: {
			break class_gen_scope;
			class_scope: {
				t.data_arr.put = function(obj, target, cur) {
					var nv = cur.slice(1 + this.off, cur[this.off] + 1);
					var arr_out = [];
					var cc = -1;
					for (let i = 0; i < nv.length; i++) {
						if (nv[i]instanceof state.sym_null_class) {
							cc++;
							arr_out.push([]);
							arr_out[cc].push(nv[i]);
						} else {
							arr_out[cc].push(nv[i]);
						}
					}
					var arr_rep = arr_out.slice();
					for (cc = 0; cc < arr_rep.length; cc++) {
						arr_rep[cc][0].array_put(arr_rep, cc, arr_rep[cc]);
					}
					obj[target] = arr_rep;
					var rest = cur.slice(cur[this.off] + 1)
					if (rest.length > 0)
						this[t.log_sym].log(rest);
					return cur[this.off] + 1;
				}
			}
		}
		var x0 = event_info[0].submit(event_info);
		let lnx = "EventTarget"
		t.root[t.log_sym].log(lnx + " ".repeat(28 - x0.str.length - lnx.length) + x0.str, ...x0.arr);
		var x1 = x0.arr[1][1];
		var y = Function.events[x1.__bound_event_id__];
		var x2 = y[0].submit(y)
		lnx = "Function"
		t.root[t.log_sym].log(lnx + " ".repeat(28 - x2.str.length - lnx.length) + x2.str, ...x2.arr);
		window.x2 = x2;
		return 'done';
	}
	cur.n = 'Hero_js'
	cur.f = function() {
		let mode = 'async_map_find'
		if (mode === 'it_find_func_scope') {
			undebug = undebug;
			debug = debug;
			debug.fn = game_objects.Player.instance.game.update;
			let dbg_src_url = '//' + '# sourceURL=snippet://js/js_1.js';
			debug(debug.fn, `
			window.out={};
			debug.get_from=function(e){return eval(e)};
			debug.g();
			undebug(debug.fn);
			` + dbg_src_url);
			let eok = (function() {
				"use strict";
				let src_url = '//' + '# ' + 'sourceURL=snippet://js/js_2.js';
				return eval(`function x(f_in,cb){
					if(cb){
						return class tb extends f_in{
							constructor(...a){
								super(...a)
								cb(this)
							}
						}
					}else{
						return class tt extends f_in {
							constructor(...a){
								super(...a);
								tt.instance=this;
							}
						}
					}${src_url}
				};x`)
			}
			)()
			class str_to_var {
				fel(...a) {
					try {
						let g = debug.get_from;
						let __nxs = String.fromCharCode(...a);
						if (__nxs == '0') {
							return true
						}
						;if (__nxs == 'i') {
							return true
						}
						;if (window[__nxs]) {
							console.log("skip_wind", __nxs);
							return true;
						}
						let __x = new Function(__nxs,"return " + __nxs);
						if (__x.length == 1) {
							__x = g("__x(" + __nxs + ")");
							if (__x !== undefined)
								out[__nxs] = __x;
						}
					} catch {}
				}
				fet(...a) {
					let __nxs = String.fromCharCode(...a);
					let __x = new Function(__nxs,"return " + __nxs);
					if (__x.length == 1) {
						return true;
					}
				}
				g() {
					var vvl = []
					for (var ji__ = 0; ji__ < 256; ji__++) {
						var kok = this.fet(ji__)
						if (kok) {
							vvl.push(ji__)
						}
					}
					var v2l = [];
					for (var ji__1 = 0; ji__1 < 256; ji__1++) {
						var kok = this.fet(ji__)
						if (kok) {
							v2l.push(ji__, ji__1)
						}
					}
					return [...vvl, ...v2l]
				}
			}
			window.func_want = eok;
			str_to_var = eok(str_to_var);
			let t = new str_to_var()
			debug.g = str_to_var.instance.g;
			return;
		}
		_player = game_objects.Player;
		game = game_objects.Player.instance.game;
		async function run() {
			"use strict";
			var static_part = eval(`(class {
			static ar=[];
			time=null;
			w=null;
			timeout=true;
		})`)
			class timeout_class extends static_part {
				constructor(time) {
					super();
					this.time = time;
					timeout_class.instance = this;
				}
				static do_back(iid) {
					var n = timeout_class.ar[iid];
					n.w();
					if (n.timeout) {
						timeout_class.ar.splice(iid, 1);
					}
				}
				static w_in(x) {
					var n = timeout_class.instance;
					n.w = x;
					var iid = timeout_class.ar.push(n) - 1
					timeout_class.instance = null;
					n.cint = setTimeout(timeout_class.do_back, timeout_class.time, iid)
				}
			}
			function w(t) {
				var c = new timeout_class(t);
				return new Promise(timeout_class.w_in)
			}
			if (game.dungeonHeroes.length < 6) {
				game.addHero(new game_objects['creature.Hero'](_player));
				await w(60);
			}
			let tx = 0;
			let tx_div = 3
			let to = [];
			let rr = new Map
			let cc = 0;
			let con = Symbol(0)
			let brk = Symbol(1)
			let a = [];
			let rf = (function(e, dz) {
				var ret = con;
				if (!rr.has(e.map)) {
					rr.set(e.map, e)
					e.map.setCounts();
					//console.log('t_new', dz,e.map.countFloors - e.map.countExplored);
					ret = brk;
				}
				var mp_no_exp = e.map.countFloors - e.map.countExplored;
				return [con, [mp_no_exp, e, dz]];
			}
			)
			let c = game.dungeonHeroes;
			for (let x = c.entries(), y = x.next(); y.done == false; y = x.next()) {
				let e = y.value;
				let d = e[0];
				let r = rf(e[1], d, c);
				let z = r[1];
				a[d] = z;
				if (z[0] > 0)
					console.log('h_info', z[0], z[2]);
				if (r[0] === brk) {
					await w(60);
				}
			}
			console.log('rr>', rr.size);
			a.forEach(function(e) {
				if (e[0] > (tx / tx_div)) {
					if (e[0] > tx)
						tx = e[0];
					to.push(e)
				}
			});
			let ll = []
			to = to.filter(e=>e[0] > (tx / tx_div));
			to.forEach(e=>{
				ll.push(e[0])
			}
			);
			ll.sort()
			if (ll.pop() > 3000) {
				tx_div = 4
			}
			let find_res_ar = a.filter(function(e) {
				return e[0] == tx
			});
			let find_res = find_res_ar[0];
			let find_id = find_res[2];
			let t = function(f, ...x) {
				f.dep = 0;
				return f.apply(null, [f, ...x])
			}
			let hero_deep = []
			let tx_ = t(function(f, e, ...x) {
				var oe = e;
				if (!e) {
					console.log(f.dep, 'undef', arguments.length);
					return []
				}
				e = e.slice(1)
				let ret = null;
				if (x[0]instanceof Array) {
					if (x.length > 1) {
						f.dep++
						ret = [...e, ...f(f, ...x.slice(0, x.length / 2)), ...f(f, ...x.slice(x.length / 2, x.length))];
						f.dep--
					} else {
						f.dep++
						ret = [...e, ...f(f, ...x)];
						f.dep--
					}
				} else {
					f.dep++
					ret = [...e, ...x]
					f.dep--
				}
				hero_deep.push(oe);
				return ret;
			}, ...to)
			let ss = Symbol('[')
			let sa = Symbol(',')
			let sb = Symbol(']')
			hero_deep = hero_deep.sort(function(a, b) {
				return a[0] - b[0]
			})
			game.dungeonHeroes = game.dungeonHeroes.sort((e,b)=>{
				let a = hero_deep.findIndex(t=>t[1] == e);
				let c = hero_deep.findIndex(t=>t[1] == b);
				if (c == -1) {
					c = 0
				}
				;if (a == -1) {
					a = 0
				}
				;if (c > a) {
					return 1
				}
				if (a > c) {
					return -1
				}
				if (c == a) {
					return 0
				}
			}
			);
			a = game.dungeonHeroes.map((e,dz)=>{
				//e.map.setCounts();
				let mp_no_exp = e.map.countFloors - e.map.countExplored;
				return [mp_no_exp, e, dz]
			}
			);
			find_res_ar = a.filter(function(e) {
				return e[0] == tx
			});
			ll = [];
			a.filter(e=>e[0] > (tx / tx_div)).map(e=>{
				ll.push(e[0]);
				return e.slice(1)
			}
			);
			find_res = find_res_ar[0];
			find_id = find_res[2];
			game.scrollDungeonHeroTo(find_id);
			return [ss, sb, find_id, tx, ss, ...tx_, sa, ...ll, sb, find_res];
		}
		return run();
	}
	/* cspell: disable-next-line */
	cur.n = "debug_js_call_konggames"
	cur.f = function() {
		let raw_str = function(d, ...s) {
			var str = d.raw[0];
			let x = 1;
			for (i of s) {
				str += i;
				str += d.raw[x++];
			}
			return str
		}
		var debug_class = class {
			constructor(state) {
				this.data = {};
				this.error_array = [];
				var id = Math.floor(Math.random() * (1 << (24)) * (1 << 8 + 8 + 4)).toString(16);
				let key = '_debugger_' + id;
				this.key = key;
				this.state = state;
				this.breakpoint_function_path = state.breakpoint_function_path
				if (state.sym) {
					this.sym = state.sym
				} else {
					this.sym = {};
					this.sym.abort = Symbol('abort')
					this.sym.error = Symbol('error')
					this.sym.success = Symbol('success')
					this.sym.failure = Symbol('failure')
					this.sym.debug = Symbol('debug')
					state.sym = this.sym;
				}
				state.info = [];
			}
			async clear(event_foward_function) {
				if (this.state.root) {
					var nop = function() {}
					this.event_foward_function = event_foward_function
					nop.call(null)
					await this.promise
					this.clear_root();
					if (this.next) {
						await this.next.clear();
						this.next = null;
					}
					return
				}
				var nop = function() {}
				Reflect.apply(this.breakpoint_function, nop, [])
				await this.promise;
			}
			run() {
				var t = this;
				var state = this.state;
				window[this.key] = this;
				if (state && !state.breakpoint_function) {
					let g = window
					let pth = this.breakpoint_function_path.split(".")
					for (let c; c = pth.shift(); ) {
						g = g[c]
					}
					state.breakpoint_function = g
				}
				this.breakpoint_function = state.breakpoint_function;
				this.failed_check = [];
				var make_internal_promise = function(a) {
					t.on_internal_callback = function(e) {
						a(e)
					}
				}
				this.internal_promise = new Promise(make_internal_promise)
				var make_promise = function(a) {
					t.on_breakpoint_clear = function(e) {
						a(e)
					}
				}
				var ret = new Promise(make_promise);
				this.promise = ret;
				this.on_page_unload = function() {
					if (t.has_breakpoint) {
						t.clear_breakpoint(null);
					}
				}
				window.addEventListener('unload', this.on_page_unload)
				if (this.in_callback) {
					console.log('not setting breakpoint in breakpoint')
				} else {
					this.set_breakpoint()
				}
			}
			callback(info) {
				x: {
					if (this.state.info && info.arg?.[1]?.[0] !== undefined && this.state.info.indexOf(info.arg[1][0]) > -1) {
						let arg_info = info.arg[1][0]
						let dbg_sym = this.sym.debug
						if (arg_info == dbg_sym) {
							let idx = this.state.info.indexOf(dbg_sym)
							this.state.info.splice(idx, 1)
							this.internal_result = info
							this.on_internal_callback(info)
						}
						return
					}
					if (this.failed_check.length > 256) {
						break x
					}
					if (info.m_this === Array.prototype.slice) {
						this.failed_check.push(info);
						console.log('1');
						return
					}
					if (info.m_this === Object.prototype.hasOwnProperty) {
						this.failed_check.push(info);
						console.log('2', ...info.arg);
						return
					}
					this.clear_breakpoint(info)
				}
			}
			clear_breakpoint(result) {
				var error;
				if (arguments.length < 1) {
					error = new Error("Not enough arguments")
				}
				if (result === undefined) {
					error = new Error("required argument 'result' is undefined")
				}
				if (error) {
					Error.captureStackTrace(error, this.clear_breakpoint)
					throw error;
				}
				if (this.event_foward_function) {
					this.event_foward_function('clear ' + this.key)
				} else {
					console.log('clear ' + this.key)
				}
				undebug(this.breakpoint_function);
				delete window[this.key];
				if (result !== null) {
					window.removeEventListener('unload', this.on_page_unload);
					this.result = result;
				}
				this.on_breakpoint_clear();
			}
			set_breakpoint() {
				console.log('set debug breakpoint', this.breakpoint_function);
				this.first = true;
				debug(this.breakpoint_function, this.get_breakpoint_string());
				this.has_breakpoint = true;
			}
			get_breakpoint_string() {
				var tmp = `
				x:{
					try{
						let function_path="${this.breakpoint_function_path}";
						let key_for_dbg="${this.key}";
						if(window[key_for_dbg]===undefined){
							if(function_path){
								console.log("Bad breakpoint","try undebug");
								undebug(new Function("return "+function_path));
							}
							console.log("Bad breakpoint");
							1;
							break x;
						}
						let _debugger=window[key_for_dbg]
						let info={m_this:this,arg:arguments};
						info.scope_accessor=function(e){
							try{
								var r=eval(e)
								return [_debugger.sym.success,r]
							}
							catch(q){
								var x=q
								return [_debugger.sym.failure,x]
							}
						}
						if(_debugger.first){
							//_debugger.first=false
							console.log(_debugger.state.root?"HERE.root":"HERE")
						}
						_debugger.in_callback=true
						_debugger.callback(info)
						_debugger.in_callback=false
					}
					catch(e){
						console.log('at_bp',e);
						1;
					}
				}
				`;
				var a = tmp.split("\n")
				var b = a.shift();
				var c = a.pop();
				var pad_str = a[0].match(/\s+/)?.[0]
				if (pad_str) {
					let t_len = pad_str.length
					for (var i = 0; i < a.length; i++) {
						a[i] = a[i].slice(t_len)
					}
				}
				if (!b) {
					let ul_p1 = 'snippet://dbg/dbg_bp.'
					var src_url = '//' + "# sourceURL=" + ul_p1 + this.state.depth + ".js";
					if (this.state.root)
						src_url = '//' + "# sourceURL=" + ul_p1 + "root.js";
					return ([...a, c, src_url]).join("\n");
				}
				return ([b, ...a, c]).join("\n")
				return tmp;
			}
		}
		function run_sync_code() {
			function dbg_init(pre_init, at_init, done_cb) {
				var state = pre_init()
				let _debugger = new debug_class(state);
				at_init(_debugger, state)
				_debugger.run();
				done_cb(_debugger, state)
				return _debugger;
			}
			let _debugger = dbg_init(function() {
				debug = debug
				undebug = undebug
				var state = {};
				state.breakpoint_function_path = "Function.prototype.call"
				state.root = true;
				state.depth = 0;
				return state
			}, function(_debugger, state) {
				var d_sym = _debugger.sym.debug
				state.info.push(d_sym)
				state.call_info = d_sym
			}, function(_debugger, state) {
				var nop = function() {}
				nop.call(null, [state.call_info])
				window.dz = _debugger;
				_debugger.clear_root = function() {
					delete window.dz;
				}
			});
			var promise_debugger = _debugger;
			_debugger.internal_promise.then(function(z) {
				console.log([z.scope_accessor]);
				if (promise_debugger.breakpoint_function.rep === undefined) {
					return
				}
				var access_res = z.scope_accessor('data')
				if (access_res[0] !== promise_debugger.sym.success) {
					promise_debugger.error_array.push(access_res[1])
					console.log('failure', access_res[0], Object.getPrototypeOf(access_res[1]).name + ":" + access_res[1].message)
					return
				}
				var ghost_tree = access_res[1].original;
				let r = dbg_init(function() {
					var state = {}
					Object.assign(state, promise_debugger.state)
					state.breakpoint_function_path = "Function.prototype.call"
					var original_sym = state.sym
					state.sym = {}
					Object.assign(state.sym, original_sym)
					state.depth++;
					debugger ;return state;
				}, function(_debugger, state) {
					state.breakpoint_function = ghost_tree.Function.prototype.call
				}, function(_debugger, state) {
					_debugger.data.ghost_tree = ghost_tree;
					promise_debugger.next = _debugger;
				});
				console.log(r);
				return r;
			});
			if (!_debugger.state.root)
				console.log(_debugger)
			return _debugger
		}
		var _debugger = window.dz
		if (_debugger) {
			var run_async_code = async function() {
				console.log('async clear')
				await _debugger.clear(e=>console.log(e));
				return run_sync_code()
			}
			var _promise = run_async_code();
			return _promise;
		}
		var result = run_sync_code()
		return result
	}
	cur.n = "reddit"
	cur.f = function() {
		//x: {
		//	break x;
		//	/* cspell: disable-next-line */
		//	document.querySelector("[id^='continueThread']").__reactInternalInstance$fh55rrshmcw
		//}
		var dom = document.body.children["2x-container"];
		dom = dom._reactRootContainer._internalRoot.current.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode
		var do_ar = Object.getOwnPropertyNames(dom);
		var react_ii = do_ar.find(e=>e.indexOf("__reactInternalInstance") == 0);
		window.react_ii = react_ii;
		(function(f) {
			f(f);
		}
		)(async function(f) {
			console.log('en');
			var get_dom = ()=>document.querySelector("[id^='continueThread']");
			var dom = get_dom();
			let count = 0;
			if (!dom) {
				dom = await new Promise(function(a) {
					count++;
					setTimeout(function t() {
						var c_dom = get_dom();
						if (c_dom) {
							a(c_dom);
							return
						}
						count++;
						if (count > 45) {
							var want = [...document.all].filter(e=>e[react_ii]).map(e=>e[react_ii]).filter(e=>e.key == 'commentsPaneWrapper').map(e=>e);
							if (want.length == 0) {
								cint = setTimeout(t, 33);
								return;
							}
							var w2 = want[0].stateNode.querySelectorAll('[target=_blank][rel]:not([id])');
							var a_link = w2.item(w2.length - 1)
							a_link.target = '';
							a_link.rel = '';
							a_link.href = a_link.href.replace("old.reddit.com", "reddit.com")
							a_link.click();
							cint = setTimeout(t, 12000);
							return
						}
						cint = setTimeout(t, 33);
					}, 33);
				}
				);
				console.log('wc', count);
			}
			var do_ar = Object.getOwnPropertyNames(dom);
			var root_new = dom[react_ii];
			window.root_new = root_new;
			function get_inner() {
				try {
					return root_new.child.sibling.child.child.child.child.child.child.child.child.child.child.child.stateNode;
				} catch {}
				return null;
			}
			count = 0;
			var n_dom = await new Promise(function(a) {
				function t() {
					var c_dom = get_inner();
					if (c_dom) {
						a(c_dom);
						return
					}
					count++;
					cint = setTimeout(t, 33);
				}
				t();
			}
			);
			console.log('wb', count);
			if (n_dom) {
				console.log('ts');
				return setTimeout(e=>{
					dom = get_dom();
					do_ar = Object.getOwnPropertyNames(dom);
					root_new = dom[react_ii];
					window.root_new = root_new;
					n_dom = get_inner();
					n_dom.click();
					window.inner_dom = n_dom;
					cint = setTimeout(function() {
						cint = f(f)
					}, 1500);
				}
				, 33)
			}

		});
		x: {
			let maybe=true;
			if(maybe){
				return
			}
		}
		var dom = document.querySelector("[id^='continueThread']")
		var do_ar = Object.getOwnPropertyNames(dom)
		var root_new = dom[do_ar.find(e=>e.indexOf("__reactInternalInstance") == 0)];
		let refs = [];
		function add_root(r) {
			if (typeof root_new != 'undefined') {
				r.push(root_new)
			} else {
				let x = document.body.children["2x-container"];
				let a = x._reactRootContainer;
				r.push(a._internalRoot);
			}
		}
		if (!window.refs) {
			window.refs = refs
			add_root(refs)
		} else {
			window.refs = refs
			add_root(refs)
		}
		for (let j = 0; j < 2; j++) {
			var s_refs = [];
			let rar = [];
			for (let i of refs) {
				rar.push(i)
			}
			console.log(rar.length);
			for (let i of rar) {
				if (typeof i == 'string') {
					continue;
				}
				s_refs.push(Object.entries(Object.getOwnPropertyDescriptors(i)).map(([n,e])=>{
					if (e.get || e.set) {
						var n = {};
						if (e.get)
							n.get = e.get;
						if (e.set)
							n.set = e.set;
						return [n, n]
					}
					var v = e.value;
					var f = false;
					function or(b) {
						f = f || b
					}
					or(typeof v == 'number');
					or(typeof v == 'function');
					or(typeof v == 'string');
					or(v === null);
					or(v === true || v === false);
					or(v === undefined);
					or(v instanceof Node);
					if (f) {
						return [n, v]
					}
					refs.indexOf(v) == -1 ? refs.push(v) : 0;
					return {
						n: n,
						r: refs.indexOf(v)
					}
				}
				))
			}
			console.log(j, s_refs.length)
		}
		window.sr = s_refs;
		return refs;
	}
	cur.n = "yet_another_merge_game";
	cur.f = function() {
		var lnc;
		if (!Function.func_log) {
			console.log("Wrong frame")
			return
		}
		if (Function.func_log.length < 3 && typeof cf == 'undefined') {
			console.log("Not called from main.js:633")
			do_cur.count = 8
			return
		}
		if (typeof cf == 'undefined') {
			fi_ob = Function.func_log[2].args;
			cf = Function.func_log[2].args[0].toString()
			if (Math.random() > 0.4) {
				do_cur.count++;
			}
		}
		fi_ob = Function.func_log[Function.func_log.length - 1].args;
		cf = Function.func_log[Function.func_log.length - 1].args[0].toString();
		console.log("el", cur._f.argv[0].split("\n")[3])
		var error_line = cur._f.argv[0].split("\n")[3]
		var line_func_info
		if (error_line.includes("eval at createFunction")) {
			line_func_info = error_line.split(/(\(.+\))/g)[1].slice(1, -1).split(/(\(.+\))/g)[2].slice(2).split(":")
		} else {
			debugger ;
		}
		lnc = line_func_info[2] - 1;
		var line_num_idx = line_func_info[1] - 1
		var fs_str = cf.split("\n")[line_num_idx];
		var d_idx = fs_str.indexOf(String.fromCharCode(125), lnc) + 2;
		var t_idx = fs_str.lastIndexOf(String.fromCharCode(123), lnc) - 1
		var e_js_call = d_idx
		console.log(fs_str.slice(t_idx, d_idx))
		for (var cc = 0; cc < 10; cc++) {
			let cv = fs_str.lastIndexOf(String.fromCharCode(123), t_idx);
			let c2 = fs_str.lastIndexOf(",", t_idx);
			if (c2 > cv) {
				cv = c2;
			}
			console.log(t_idx, fs_str.slice(cv + 1, d_idx))
			let oi = d_idx;
			d_idx = cv;
			if (fs_str.slice(cv - 1, d_idx) == String.fromCharCode(125)) {
				var t_idx = fs_str.lastIndexOf(String.fromCharCode(123), d_idx) - 1
				continue;
			}
			if (fs_str.slice(cv - 1, d_idx) == ",") {
				var t_idx = fs_str.lastIndexOf(String.fromCharCode(123), d_idx) + 1
				console.log(t_idx, cv + 1 == t_idx, fs_str.slice(t_idx, oi))
				if (cv + 1 == t_idx) {
					let c1 = fs_str.lastIndexOf(String.fromCharCode(123), t_idx - 1)
					let c2 = fs_str.lastIndexOf(",", t_idx - 1)
					let c3 = fs_str.lastIndexOf(String.fromCharCode(40), t_idx - 1)
					let cc = Math.min(c1, c2, c3)
					console.log(fs_str.slice(cc - 2, e_js_call))
					let can_try_again = true;
					let end_char = e_js_call;
					var ix_pc = function(n) {
						return fs_str.indexOf(n, end_char + 1);
					}
					var w_ext = {}
					w_ext._l = function(...a) {
						if (a.length > 0)
							Array._log("l", ...a)
						return {
							v: a
						};
					}
					w_ext._v = function(...a) {
						if (a.length > 0)
							Array._log("v", ...a)
						if (a.length == 1)
							return a[0];
						return a;
					}
					w_ext._c = function(...a) {
						if (a.length > 0)
							Array._log("c", ...a)
						return {
							v: a
						};
					}
					w_ext._e = function(...a) {
						/* cspell: disable */
						console.log("new Empty VNode", a.length)
						return {
							vnode: null
						}
						/* cspell: enable */
					}
					w_ext._s = function(...a) {
						return a
					}
					w_ext.getQuantumFoam = fi_ob[1].getQuantumFoam
					w_ext.matterThisPrestige = fi_ob[1].matterThisPrestige
					{
						let do_def = ["prestigeGame", "formatNumber", "getQFMilestoneInfo"]
						for (let i of do_def) {
							w_ext[i] = fi_ob[1][i];
						}
					}
					Array.tv = w_ext;
					with (w_ext) {
						Array._eval = function(s) {
							eval(s);
						}
					}
					for (var ov, i = 0; (ov = can_try_again,
					can_try_again = false,
					ov && i < 120); i++) {
						try {
							let events = fs_str.slice(cc - 2, end_char);
							console.log(fs_str.slice(cc - 2, end_char + 32))
							Array.s = events;
							Array._log = (...e)=>{
								console.log(...e)
							}
							if (!Array.s.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger ;
							}
							Array._log("Sl:", Array.s.length)
							Array._eval(Array.s)
							cf = void 0;
							if (!Array.s.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger ;
							}
							break
						} catch (e) {
							let is_token_error = e.message == "Invalid or unexpected token";
							let is_eoi_error = e.message == "Unexpected end of input";
							let aal = e.message.indexOf("after argument list") > 3;
							let kno_err = is_token_error || is_eoi_error || aal;
							if (kno_err) {
								can_try_again = true
								let c1 = ix_pc(String.fromCharCode(125));
								let c2 = Math.min(c1, ix_pc(String.fromCharCode(93)));
								c1 = Math.min(c2, ix_pc(String.fromCharCode(41)))
								end_char = c1
							}
							let ndi = e.message.indexOf(" is not defined")
							if (ndi > 0) {
								var s_name = e.message.slice(0, ndi)
								if (fi_ob[1][s_name]) {
									w_ext[s_name] = fi_ob[1][s_name]
									console.log("for VUE defined:", s_name)
									can_try_again = true;
								}
								//can_try_again=true
							}
							console.log(e.message);
						}
					}
					break
				} else {
					console.log(fs_str.slice(cv - 8, oi))
				}
			}
			console.log(t_idx, fs_str.slice(cv - 1, d_idx))
			break;
		}
	}
	do_cur = function(...e) {
		var i;
		if (cur.rx_lx) {
			i = fnname.indexOf(cur.rx_lx);
		} else {
			i = fnname.indexOf(cur.n);
		}
		let px_fn = function(fn) {
			fn.argv = e;
		}
		var _result = execute(i, px_fn);
		return _result;
	}
	let ret;
	if (top !== window) {
		if (window.debugApi == undefined) {
			debugApi = new DebugAPI;
		}
		//console.log('restart on top frame');
		ret = debugApi.asyncExecuteFunction(top, main);
	} else {
		ret = do_cur();
	}
	if (ret instanceof Promise) {
		ret.then(()=>void 0).catch(e=>console.error(e));
	}
	cur.value=ret;
	return {...cur,_class:cur__class};
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();
