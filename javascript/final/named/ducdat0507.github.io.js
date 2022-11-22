/* spell:words
--- version_list item 2 ---
v1 (spl-f): snippet_repo/javascript/final/ducdat0507.github.io.js
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
						let src_url='//'+'# sourceURL='+r_fnname
						let func_str
						if(is_strict) {
							func_str=`"use strict";\nconsole.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func=new Function(args,func_str)
						} else {
							func_str=`console.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func=new Function(args,func_str)
						}
						if('mc' in window&&window.mc instanceof MessageChannel) {
							let mc=window.mc;
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
	cur.n=new CustomInputMatcher(/https:\/\/ducdat0507.github.io/,() => location.origin)
	cur.f=async function() {
		let mc=new MessageChannel
		let msg_clk='CLOCK_RUN'
		let clk_priv={
			clk_id: []
		}
		mc.port1.onmessage=function(e) {
			switch(e.data.msg_type) {
				case msg_clk:
					let ev=clk_priv.clk_id
					let f=ev[e.data.fn]
					f()
					ev.splice(e.data.fn,1)
					break
				default:
					console.log('unk_msg',e.data)
			}
		}
		let clk={
			t: function(e) {
				setTimeout(e)
			},
			r: function(e) {
				let ev=clk_priv.clk_id
				let id=ev.length
				ev.push(e)
				mc.port2.postMessage({
					msg_type: msg_clk,
					fn: id
				})
			}
		}
		for(let i=0;;) {
			let lb=layers.aspTime.buyables[22]
			let idx=player.aspTime.buyables[22].toNumber()+1
				,sc=lb.cost(new Decimal(idx))
				,ec=lb.cost(new Decimal(idx+1))
				,r=ec.sub(sc)
			let edc=Math.floor(r.toNumber()*20)
			for(let j=0;j<edc;j++) {
				buyBuyable('aspTime',21)
			}
			i+=edc
			let d=0
			for(;d<30;d++) {
				let am22=player.aspTime.buyables[22]
				let am21=player.aspTime.buyables[21]
				let cs22=lb.cost(am22)
				buyBuyable('aspTime',22)
				if(am21.lt(cs22)) {
					break
				}
			}
			await new Promise(clk.r)
			if(player.aspTime.points.lt(layers.aspTime.buyables[21].cost(player.aspTime.buyables[21]))) {
				break
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
