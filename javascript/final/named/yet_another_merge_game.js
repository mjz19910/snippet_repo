/* spell:words
--- version_list item 2 ---
v1 (spl-f): snippet_repo_v2/javascript/final/yet_another_merge_game.js
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
			static #unused = this.#init();
			static #init(){
				
			}
			static _f(){}
			static _n = "<empty>";
			static n_on = true;
			static f_on = true;
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
	cur.n="yet_another_merge_game"
	cur.f=function() {
		var lnc
		if(!Function.func_log) {
			console.log("Wrong frame")
			return
		}
		if(Function.func_log.length<3&&typeof cf=='undefined') {
			console.log("Not called from main.js:633")
			do_cur.count=8
			return
		}
		if(typeof cf=='undefined') {
			fi_ob=Function.func_log[2].args
			cf=Function.func_log[2].args[0].toString()
			if(Math.random()>0.4) {
				do_cur.count++
			}
		}
		fi_ob=Function.func_log[Function.func_log.length-1].args
		cf=Function.func_log[Function.func_log.length-1].args[0].toString()
		console.log("el",cur._f.argv[0].split("\n")[3])
		var error_line=cur._f.argv[0].split("\n")[3]
		var line_func_info
		if(error_line.includes("eval at createFunction")) {
			line_func_info=error_line.split(/(\(.+\))/g)[1].slice(1,-1).split(/(\(.+\))/g)[2].slice(2).split(":")
		} else {
			debugger
		}
		lnc=line_func_info[2]-1
		var line_num_idx=line_func_info[1]-1
		var fs_str=cf.split("\n")[line_num_idx]
		var d_idx=fs_str.indexOf(String.fromCharCode(125),lnc)+2
		var t_idx=fs_str.lastIndexOf(String.fromCharCode(123),lnc)-1
		var e_js_call=d_idx
		console.log(fs_str.slice(t_idx,d_idx))
		for(var cc=0;cc<10;cc++) {
			let cv=fs_str.lastIndexOf(String.fromCharCode(123),t_idx)
			let c2=fs_str.lastIndexOf(",",t_idx)
			if(c2>cv) {
				cv=c2
			}
			console.log(t_idx,fs_str.slice(cv+1,d_idx))
			let oi=d_idx
			d_idx=cv
			if(fs_str.slice(cv-1,d_idx)==String.fromCharCode(125)) {
				var t_idx=fs_str.lastIndexOf(String.fromCharCode(123),d_idx)-1
				continue
			}
			if(fs_str.slice(cv-1,d_idx)==",") {
				var t_idx=fs_str.lastIndexOf(String.fromCharCode(123),d_idx)+1
				console.log(t_idx,cv+1==t_idx,fs_str.slice(t_idx,oi))
				if(cv+1==t_idx) {
					let c1=fs_str.lastIndexOf(String.fromCharCode(123),t_idx-1)
					let c2=fs_str.lastIndexOf(",",t_idx-1)
					let c3=fs_str.lastIndexOf(String.fromCharCode(40),t_idx-1)
					let cc=Math.min(c1,c2,c3)
					console.log(fs_str.slice(cc-2,e_js_call))
					let can_try_again=true
					let end_char=e_js_call
					var ix_pc=function(n) {
						return fs_str.indexOf(n,end_char+1)
					}
					var w_ext={}
					w_ext._l=function(...a) {
						if(a.length>0)
							Array._log("l",...a)
						return {
							v: a
						}
					}
					w_ext._v=function(...a) {
						if(a.length>0)
							Array._log("v",...a)
						if(a.length==1)
							return a[0]
						return a
					}
					w_ext._c=function(...a) {
						if(a.length>0)
							Array._log("c",...a)
						return {
							v: a
						}
					}
					w_ext._e=function(...a) {
						/* cspell: disable */
						console.log("new Empty VNode",a.length)
						return {
							vnode: null
						}
						/* cspell: enable */
					}
					w_ext._s=function(...a) {
						return a
					}
					w_ext.getQuantumFoam=fi_ob[1].getQuantumFoam
					w_ext.matterThisPrestige=fi_ob[1].matterThisPrestige
					{
						let do_def=["prestigeGame","formatNumber","getQFMilestoneInfo"]
						for(let i of do_def) {
							w_ext[i]=fi_ob[1][i]
						}
					}
					Array.tv=w_ext
					with(w_ext) {
						Array._eval=function(s) {
							eval(s)
						}
					}
					for(var ov,i=0;(ov=can_try_again,
						can_try_again=false,
						ov&&i<120);i++) {
						try {
							let events=fs_str.slice(cc-2,end_char)
							console.log(fs_str.slice(cc-2,end_char+32))
							Array.s=events
							Array._log=(...e) => {
								console.log(...e)
							}
							if(!Array.s.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger
							}
							Array._log("Sl:",Array.s.length)
							Array._eval(Array.s)
							cf=void 0
							if(!Array.s.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger
							}
							break
						} catch(e) {
							let is_token_error=e.message=="Invalid or unexpected token"
							let is_eoi_error=e.message=="Unexpected end of input"
							let aal=e.message.indexOf("after argument list")>3
							let kno_err=is_token_error||is_eoi_error||aal
							if(kno_err) {
								can_try_again=true
								let c1=ix_pc(String.fromCharCode(125))
								let c2=Math.min(c1,ix_pc(String.fromCharCode(93)))
								c1=Math.min(c2,ix_pc(String.fromCharCode(41)))
								end_char=c1
							}
							let ndi=e.message.indexOf(" is not defined")
							if(ndi>0) {
								var s_name=e.message.slice(0,ndi)
								if(fi_ob[1][s_name]) {
									w_ext[s_name]=fi_ob[1][s_name]
									console.log("for VUE defined:",s_name)
									can_try_again=true
								}
								//can_try_again=true
							}
							console.log(e.message)
						}
					}
					break
				} else {
					console.log(fs_str.slice(cv-8,oi))
				}
			}
			console.log(t_idx,fs_str.slice(cv-1,d_idx))
			break
		}
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
		//console.log('restart on top frame');
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
