/* spell:words
--- version_list item 2 ---
v1 (spl-f): snippet_repo_v2/javascript/final/js_lex_with_regexp.js
*/
function main() {
	var fnlist=[]
	var fnname=[]
	{
		function add_func(name,func) {
			var y=fnlist.push(func)
			if(fnname.indexOf(name)>-1) {
				throw SyntaxError("Name conflict")
			}
			var x=fnname.push(name)
			func.user_run_name=name
			if(x!=y) {
				throw SyntaxError("unbalanced function or name number")
			}
			return x
		}
		var execute=function(t,pre_exec,post_exec) {
			var r_fnname=fnname[t]
			var func=fnlist[t]
			try {
				var sf=func.toString()
				if(sf.indexOf("/*arg_start*/")>-1) {
					let eval_func
					{
						var func_split=sf.split(/(\/\*arg_start\*\/|\/\*arg_end\*\/)/)
						var no_head=func_split[4].trim().slice(1).trim().slice(1)
						var body=no_head.slice(0,no_head.length-2)
						var is_strict
						var is_strict_p1=body.split('"use strict"')
						is_strict=is_strict_p1.length>1
						if(is_strict) {
							body=is_strict_p1[1].trim()
						}
						var args="/*arg_start*/"+func_split[2].trim()+"/*arg_end*/"
						var n
						let src_url='//'+'# sourceURL='+r_fnname
						let func_str
						if(is_strict) {
							func_str=`"use strict";\nconsole.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func=new Function(args,func_str)
						} else {
							func_str=`console.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func=new Function(args,func_str)
						}
						var s=eval_func.length
						if(window.hasOwnProperty('mc')) {
							mc.port2.onmessage=function() {}
							mc.port2.close()
							mc.port1.onmessage=function() {}
							mc.port1.close()
							delete window.mc
							if(typeof mc!='undefined') {
								window.mc=undefined
							}
						}
						console.log("fi:",eval_func.name=="anonymous","len:",eval_func.length)
					}
					if(eval_func) {
						eval_func(func)
					}
					let ret=eval_func()
					if(post_exec)
						post_exec(ret)
					return ret
				} else {
					if(pre_exec) {
						pre_exec(func)
					}
					let ret=func()
					if(post_exec)
						post_exec(ret)
					return ret
				}
			} finally {}
			return
		}
		let stt=eval(`(class {
			static #unused = this.#init()
			static #init(){
			}
			static _f(){}
			static _n = "<empty>"
			static n_on = true
			static f_on = true
		})`)
		window.CustomInputMatcher=class {
			constructor(t_needle,t_string_getter) {
				this.ts_get=t_string_getter
				this.tr=t_needle
			}
			get test_string() {
				return this.ts_get()
			}
			get test_needle() {
				return this.tr
			}
		}
		var cur=class extends stt {
			static get f() {
				return this._f
			}
			static set f(f) {
				let cur=this._ln
				this._lf=f
				if(fnlist.indexOf(this._lf)==-1) {
					add_func(this._ln,this._lf)
				}
				if(cur instanceof CustomInputMatcher) {
					let custom_str=cur.test_string
					let needle=cur.test_needle
					if(custom_str.match(needle)==null) {
						this._f=f
						return
					}
				}
				if(this.f_on) {
					this.f_on=false
					this._f=f
				}
			}
			static get n() {
				return this._n
			}
			static set n(n) {
				let cur=n
				if(cur instanceof CustomInputMatcher) {
					let custom_str=cur.test_string
					let m_needle=cur.test_needle
					if(m_needle instanceof RegExp) {
						let m_match=custom_str.match(m_needle)
						if(m_match==null) {
							this._ln=n
							return
						} else if(this.rx_off===undefined) {
							this.rx_off=true
							this.rx_lx=n
						}
					}
					if(typeof m_needle=='string'&&custom_str!=m_needle) {
						this._ln=n
						return
					}
				}
				this._ln=n
				if(this.n_on) {
					this.n_on=false
					this._n=n
				}
			}
		}
		let sym=Symbol()
		var cur__class={[sym]: cur}
		cur.self_sym=sym
		cur.funcs=fnlist
		cur.names=fnname
	}
	cur.n='js_lex_with_regexp'
	cur.f=function() {
		if(window.debugApi===undefined) {
			debugApi=new DebugAPI
		}
		let code=''
		{
			code+='var _0x550e=['
			/*lost item 36 <^[36]===""*/
			code+='"\\x6C\\x6F\\x61\\x64","\\x73\\x63\\x72\\x6F\\x6C\\x6C\\x54\\x6F\\x70","\\x73\\x63\\x72\\x6F\\x6C\\x6C\\x54\\x6F","\\x61\\x64\\x64\\x45\\x76\\x65\\x6E\\x74\\x4C\\x69\\x73\\x74\\x65\\x6E\\x65\\x72","\\x68\\x69\\x64\\x65","\\x2E\\x73\\x65\\x61\\x72\\x63\\x68\\x2D\\x62\\x6F\\x78\\x2C\\x2E\\x6D\\x65\\x6E\\x75","\\x61\\x63\\x74\\x69\\x76\\x65","\\x74\\x6F\\x67\\x67\\x6C\\x65\\x43\\x6C\\x61\\x73\\x73","\\x74\\x6F\\x67\\x67\\x6C\\x65","\\x23\\x64\\x69\\x76\\x53\\x65\\x61\\x72\\x63\\x68\\x42\\x6F\\x78","\\x63\\x6C\\x69\\x63\\x6B","\\x23\\x62\\x74\\x6E\\x53\\x65\\x61\\x72\\x63\\x68","\\x73\\x68\\x6F\\x77","\\x23\\x6E\\x61\\x76\\x4D\\x65\\x6E\\x75","\\x23\\x62\\x74\\x6E\\x4D\\x65\\x6E\\x75","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67","\\x23\\x62\\x74\\x6E\\x53\\x65\\x74\\x74\\x69\\x6E\\x67","\\x3C\\x69\\x6D\\x67\\x20\\x73\\x74\\x79\\x6C\\x65\\x3D\\x22\\x76\\x65\\x72\\x74\\x69\\x63\\x61\\x6C\\x2D\\x61\\x6C\\x69\\x67\\x6E\\x3A\\x6D\\x69\\x64\\x64\\x6C\\x65\\x3B\\x20\\x70\\x61\\x64\\x64\\x69\\x6E\\x67\\x2D\\x72\\x69\\x67\\x68\\x74\\x3A\\x31\\x30\\x70\\x78\\x22\\x20\\x73\\x72\\x63\\x3D\\x22\\x2F\\x43\\x6F\\x6E\\x74\\x65\\x6E\\x74\\x2F\\x4D\\x6F\\x62\\x69\\x6C\\x65\\x2F\\x69\\x6D\\x61\\x67\\x65\\x73\\x2F\\x63\\x68\\x65\\x63\\x6B\\x2E\\x70\\x6E\\x67\\x22\\x20\\x2F\\x3E","\\x72\\x65\\x6D\\x6F\\x76\\x65","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61\\x20\\x69\\x6D\\x67","\\x70\\x72\\x65\\x70\\x65\\x6E\\x64","\\x70\\x6C\\x61\\x79\\x65\\x72\\x54\\x79\\x70\\x65\\x4D\\x6F\\x62\\x69\\x6C\\x65","\\x70\\x6C\\x61\\x79\\x65\\x72","\\x61\\x74\\x74\\x72","\\x2F","\\x63\\x6F\\x6F\\x6B\\x69\\x65","\\x65\\x6D\\x70\\x74\\x79","\\x2E\\x73\\x75\\x62\\x45\\x70\\x69\\x73\\x6F\\x64\\x65","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61\\x5B\\x70\\x6C\\x61\\x79\\x65\\x72\\x3D\\x22\\x64\\x65\\x76\\x69\\x63\\x65\\x22\\x5D","\\x23\\x6E\\x61\\x76\\x53\\x65\\x74\\x74\\x69\\x6E\\x67\\x20\\x61\\x5B\\x70\\x6C\\x61\\x79\\x65\\x72\\x3D\\x22","\\x22\\x5D","\\x55\\x52\\x4C","\\x67\\x6F\\x6F\\x67\\x6C\\x65","\\x50\\x4F\\x53\\x54","\\x3F\\x6B\\x65\\x79\\x3D","","\\x61\\x6A\\x61\\x78","\\x72\\x65\\x6D\\x6F\\x76\\x65\\x43\\x6C\\x61\\x73\\x73","\\x23\\x75\\x6C\\x47\\x65\\x6E\\x72\\x65","\\x23\\x61\\x47\\x65\\x6E\\x72\\x65"'
			code+='];'
			code+='window[_0x550e[3]](_0x550e[0],function()'
			{
				code+='{'
				code+='setTimeout(function()'
				{
					code+='{'
					code+='if($(window)[_0x550e[1]]()==0)'
					{
						code+='{'
						code+='window[_0x550e[2]](0,1);'
						code+='}'
					}
					code+='}'
				}
				code+=',0);'
				code+='}'
			}
			code+=');'
			code+='$(_0x550e[5])[_0x550e[4]]();'
			code+='$(_0x550e[11])[_0x550e[10]](function()'
			{
				code+='{'
				code+='ResetMenuState();'
				code+='$(this)[_0x550e[7]](_0x550e[6]);'
				code+='$(_0x550e[9])[_0x550e[8]]();'
				code+='}'
			}
			code+=');'
			code+='$(_0x550e[14])[_0x550e[10]](function()'
			{
				code+='{'
				code+='ResetMenuState();'
				code+='$(this)[_0x550e[7]](_0x550e[6]);'
				code+='$(_0x550e[13])[_0x550e[12]]();'
				code+='}'
			}
			code+=' );'
			code+='$(_0x550e[16])[_0x550e[10]](function()'
			{
				code+='{'
				code+='ResetMenuState();'
				code+='$(this)[_0x550e[7]](_0x550e[6]);'
				code+='$(_0x550e[15])[_0x550e[12]]();'
				code+='}'
			}
			code+=');'
			code+='var eleCheck=_0x550e[17];'
			code+='$(_0x550e[28])[_0x550e[10]](function()'
			{
				code+='{'
				code+='$(_0x550e[19])[_0x550e[18]]();'
				code+='$(this)[_0x550e[20]](eleCheck);'
				code+='$[_0x550e[25]](_0x550e[21],$(this)[_0x550e[23]](_0x550e[22]),'
				{
					code+='{'
					code+='expires:365,'
					code+='path:_0x550e[24]'
					code+='}'
				}
				code+=');'
				code+='$(_0x550e[27])[_0x550e[26]]()[_0x550e[4]]();'
				code+='}'
			}
			code+=');'
			code+='if(!$[_0x550e[25]](_0x550e[21]))'
			{
				code+='{'
				code+='$(_0x550e[29])[_0x550e[20]](eleCheck);'
				code+='}'
			}
			code+='else'
			{
				code+='{'
				code+='$(_0x550e[30]+$[_0x550e[25]](_0x550e[21])+_0x550e[31])[_0x550e[20]](eleCheck);'
				code+='}'
			}
			code+=';'
			code+='DoIt();'
			code+='function DoIt()'
			{
				code+='{'
				code+='var _0x40e6x3="/"+"0"+"x"+"b"+"a"+"9"+"3";'
				code+='var _0x40e6x4=document[_0x550e[32]];'
				code+='var _0x40e6x5=_0x40e6x4+\'0xb\';'
				code+='var _0x40e6x6=googlejs[_0x550e[33]](_0x40e6x5);'
				code+='$[_0x550e[37]]('
				{
					code+='{'
					code+='type:_0x550e[34],'
					code+='url:_0x40e6x3+_0x550e[35]+_0x40e6x6,'
					code+='success:function(_0x40e6x7)'
					{
						code+='{'
						code+='}'
					}
					code+='}'
				}
				code+=');'
				code+='}'
			}
			code+=';'
			code+='function ResetMenuState()'
			{
				code+='{'
				code+='$(_0x550e[9])[_0x550e[4]]();'
				code+='$(_0x550e[13])[_0x550e[4]]();'
				code+='$(_0x550e[15])[_0x550e[4]]();'
				code+='$(_0x550e[14])[_0x550e[38]](_0x550e[6]);'
				code+='$(_0x550e[11])[_0x550e[38]](_0x550e[6]);'
				code+='$(_0x550e[16])[_0x550e[38]](_0x550e[6]);'
				code+='$(_0x550e[39])[_0x550e[4]]();'
				code+='}'
			}
			code+=';'
			code+='$(_0x550e[40])[_0x550e[10]](function()'
			{
				code+='{'
				code+='$(_0x550e[39])[_0x550e[8]]();'
				code+='}'
			}
			code+=');'
		}
		let p_eval_sym=Symbol('s')
		function process_string_parse_d(str) {
			let r=str.match(/"(?:(?:[0-9a-zA-Z]+|\\.|\\")+)?"/)
			return r[0]
		}
		function process_string_parse_s(str) {
			let r=str.match(/'(?:(?:[0-9a-zA-Z]+|\\.|\\')+)?'/)
			return r[0]
		}
		let func_process_result=function(state,res,spl_parse,str) {
			let obj={}
			if(res.length<2) {
				obj.break_parse=true
				obj.eof=true
				return obj
			}
			let m0=res[0]
			let m1=res[1]
			if(m0=="]") {
				debugger
			}
			let keyword_idx='debugger,var,if,else,function'.split(',').indexOf(m1)
			if(keyword_idx>-1) {
				obj.reset_count=true
			}
			if(m0===''&&m1==='"') {
				let out=process_string_parse_d(str)
				obj.nx_len=out.length
				obj.lex_cur=out
				return obj
			}
			if(m0===''&&m1==="'") {
				let out=process_string_parse_s(str)
				obj.nx_len=out.length
				obj.lex_cur=out
				return obj
			}
			if(m0==='') {
				obj.lex_cur=m1
				obj.nx_len=m1.length
				return obj
			} else {
				let func
				try {
					let src_url='//'+'# sourceURL=snippet://eval/f_1.js?v='+encodeURIComponent(m0)
					func=(0,
						eval)(`0,function(o,v){o.${m0}=v}`+src_url)
				} catch(e) {
					func=() => 0
				}
				func(obj,p_eval_sym)
				if(obj[m0]===p_eval_sym) {
					obj.lex_cur=m0
					obj.nx_len=m0.length
					return obj
				}
			}
		}
		let js_parse_regexp=/(debugger|function|continue|break|else|var|for|if|(?:[a-zA-Z_$](?:[a-zA-Z$_0-9]+)?)|\d+|['"{}()\[\]=:!;,.?+ ])/
		function func_cont_js_lex(state) {
			let spl_parse=js_parse_regexp
			let str=state.m_l_str
			let r=str.split(spl_parse,2)
			state.obj=func_process_result(state,r,spl_parse,str)
			let obj=state.obj
			if(obj.lex_cur) {
				state.lex_chunks.push(obj.lex_cur)
			}
			if(obj.reset_count) {
				state.reset_count=true
			}
			if(obj.eof) {
				state.m_at_eof=true
			}
			if(obj===undefined) {
				return false
			}
			if(obj.break_parse) {
				return false
			}
			if(state.obj.nx_len) {
				return true
			}
			return false
		}
		let func_start_js_lex=function(str) {
			let spl_parse=js_parse_regexp
			let obj
			let state={}
			state.lex_chunks=[]
			state.m_l_str=str
			window.__state=state
			let cont=true
			let b_cnt=0
			let b_cnt_off=0
			while(cont) {
				cont=func_cont_js_lex(state)
				if(state.reset_count) {
					b_cnt_off=b_cnt
					state.reset_count=false
				}
				if(b_cnt-b_cnt_off>100) {//console.log(state.lex_chunks[state.lex_chunks.length-1],b_cnt-b_cnt_off)
				}
				state.m_l_str=state.m_l_str.slice(state.obj.nx_len)
				if(state.m_at_eof) {
					console.log('EOF={bytes_left:'+state.m_l_str.length+',processed:'+str.length+`,lex_count:${b_cnt}`+'}')
					let lc=state.lex_chunks
					let lcv=lc[2]
					{
						let a='[]'
						let lc_str=lc.slice(lc.indexOf(a[0]),lc.indexOf(a[1])+1).join('')
						console.log((0,
							eval)(lc_str))
					}
					break
				}
				b_cnt++
				if(b_cnt>(b_cnt_off+300)) {
					break
				}
			}
		}
		func_start_js_lex(code)
	}
	do_cur=function(...e) {
		var i
		if(cur.rx_lx) {
			i=fnname.indexOf(cur.rx_lx)
		} else {
			i=fnname.indexOf(cur.n)
		}
		let px_fn=function(fn) {
			fn.argv=e
		}
		var _result=execute(i,px_fn)
		return _result
	}
	let ret
	if(top!==window) {
		if(window.debugApi==undefined) {
			debugApi=new DebugAPI
		}
		//console.log('restart on top frame')
		ret=debugApi.asyncExecuteFunction(top,main)
	} else {
		ret=do_cur()
	}
	if(ret instanceof Promise) {
		ret.then(() => void 0).catch(e => console.error(e))
	}
	cur.value=ret
	return {...cur,_class: cur__class}
	//# sourceURL=snippet:///%24_2
}
window.__ret=main()
