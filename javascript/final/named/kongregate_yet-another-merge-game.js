/* spell:words kongregate
--- version_list item 2 ---
v1 (spl-f): snippet_repo/javascript/final/kongregate_yet-another-merge-game.js
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
	if("https://www.kongregate.com/games/cook1eegames/yet-another-merge-game") {
		/* cspell: disable-next-line */
		let rx=/https:\/\/www\.kongregate\.com\/games\/cook1eegames\/yet-another-merge-game/
		//@cspell-enable
		let mx=() => location.origin+location.pathname
		let mto=new CustomInputMatcher(rx,mx)
		cur.n=mto
		mto.str="https://www.kongregate.com/games/cook1eegames/yet-another-merge-game"
	}
	cur.f=function() {
		let _function=function() {
			console.log('run')
			//game.spawnTime.cd=0
			if(window.cint)
				clearInterval(cint)
			if(window.citv)
				clearInterval(citv)
			citv=setInterval(function() {
				let g_u_maxObjects_int=Upgrade.apply(game.upgrades.maxObjects).toNumber()
				let g_mO_l=game.mergeObjects.length
				if(g_mO_l>=g_u_maxObjects_int)
					return
				let i
				let scd=game.spawnTime.cd
				let scd_c=scd
				for(;scd_c<30;)
					scd_c+=0.075
				gameFunctions.decreaseSpawnCooldown(scd_c-scd)
			},100)
			cint=setInterval(function() {
				gameFunctions.maxUpgrades(game.matter,game.upgrades)
			},150)
			x: {
				let time_disabled=true
				function time_main() {
					if(time_disabled) {
						return 0
					}
					let tb=new Float64Array(1)
					function time_base() {
						let ps=performance.now()
						return performance.now()-ps
					}
					function time_it() {
						let ps=performance.now()
						for(let i=0;i<8;i++) {
							tb[0]=0
						}
						return performance.now()-ps
					}
					let c=0
						,tc=1000
					function time_loop_1(tc,c) {
						for(let i=0;i<tc;i++)
							c+=time_it()
						return c
					}
					function time_loop_2(tc,c) {
						for(let i=0;i<tc;i++)
							c+=time_base()
						return c
					}
					for(;c<120;) {
						c=time_loop_1(tc,0)
						console.log('time_2',c)
						tc*=2
					}
					tc/=2
					let ct=0
					let cb=0
					let tx=7
					let carr=[]
					for(let i=0;i<tx;i++) {
						c=time_loop_1(tc,0)
						console.log('time_c1',c)
						c=time_loop_2(tc,0)
						console.log('time_c2',c)
					}
					for(let i=0;i<tx;i++) {
						c=time_loop_1(tc,0)
						carr.push(c)
						console.log('time_ct',c)
						ct+=c
					}
					for(let i=0;i<tx;i++) {
						c=time_loop_2(tc,0)
						carr.push(c)
						console.log('time_cb',c)
						cb+=c
					}
					let rt=ct-cb
					let ret=(rt/tx)/tc
					ret=ret*1000000
					return ret
				}
				let ret=time_main()
				return ret
			}
		}
		if(window.debugApi===undefined) {
			debugApi=new DebugAPI
		}
		if(document.gameiframe) {
			//console.log('restart on gameiframe')
			return debugApi.asyncExecuteEval(document.gameiframe,_function)
		} else {
			if(top===window) {
				console.log('no document.gameiframe')
			}
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
