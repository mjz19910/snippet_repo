/* spell:words
--- version_list item 2 ---
v1 (spl-f): snippet_repo/javascript/final/Hero_js.js
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
	cur.n='Hero_js'
	cur.f=function() {
		let mode='async_map_find'
		if(mode==='it_find_func_scope') {
			undebug=undebug
			debug=debug
			debug.fn=game_objects.Player.instance.game.update
			let dbg_src_url='//'+'# sourceURL=snippet://js/js_1.js'
			debug(debug.fn,`
			window.out={}
			debug.get_from=function(e){return eval(e)}
			debug.g()
			undebug(debug.fn)
			` +dbg_src_url)
			let eok=(function() {
				"use strict"
				let src_url='//'+'# '+'sourceURL=snippet://js/js_2.js'
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
								super(...a)
								tt.instance=this
							}
						}
					}${src_url}
				};x`)
			}
			)()
			class str_to_var {
				fel(...a) {
					try {
						let g=debug.get_from
						let __nxs=String.fromCharCode(...a)
						if(__nxs=='0') {
							return true
						}
						; if(__nxs=='i') {
							return true
						}
						; if(window[__nxs]) {
							console.log("skip_wind",__nxs)
							return true
						}
						let __x=new Function(__nxs,"return "+__nxs)
						if(__x.length==1) {
							__x=g("__x("+__nxs+")")
							if(__x!==undefined)
								out[__nxs]=__x
						}
					} catch {}
				}
				fet(...a) {
					let __nxs=String.fromCharCode(...a)
					let __x=new Function(__nxs,"return "+__nxs)
					if(__x.length==1) {
						return true
					}
				}
				g() {
					var vvl=[]
					for(var ji__=0;ji__<256;ji__++) {
						var kok=this.fet(ji__)
						if(kok) {
							vvl.push(ji__)
						}
					}
					var v2l=[]
					for(var ji__1=0;ji__1<256;ji__1++) {
						var kok=this.fet(ji__)
						if(kok) {
							v2l.push(ji__,ji__1)
						}
					}
					return [...vvl,...v2l]
				}
			}
			window.func_want=eok
			str_to_var=eok(str_to_var)
			debug.g=str_to_var.instance.g
			return
		}
		_player=game_objects.Player
		game=game_objects.Player.instance.game
		async function run() {
			"use strict"
			var static_part=eval(`(class {
			static ar=[]
			time=null
			w=null
			timeout=true
		})`)
			class timeout_class extends static_part {
				constructor(time) {
					super()
					this.time=time
					timeout_class.instance=this
				}
				static do_back(iid) {
					var n=timeout_class.ar[iid]
					n.w()
					if(n.timeout) {
						timeout_class.ar.splice(iid,1)
					}
				}
				static w_in(x) {
					var n=timeout_class.instance
					n.w=x
					var iid=timeout_class.ar.push(n)-1
					timeout_class.instance=null
					n.cint=setTimeout(timeout_class.do_back,timeout_class.time,iid)
				}
			}
			function w(t) {
				return new Promise(timeout_class.w_in)
			}
			if(game.dungeonHeroes.length<6) {
				game.addHero(new game_objects['creature.Hero'](_player))
				await w(60)
			}
			let tx=0
			let tx_div=3
			let to=[]
			let rr=new Map
			let con=Symbol(0)
			let brk=Symbol(1)
			let a=[]
			let rf=(function(e,dz) {
				var ret=con
				if(!rr.has(e.map)) {
					rr.set(e.map,e)
					e.map.setCounts()
					//console.log('t_new', dz,e.map.countFloors - e.map.countExplored)
					ret=brk
				}
				var mp_no_exp=e.map.countFloors-e.map.countExplored
				return [con,[mp_no_exp,e,dz]]
			}
			)
			let c=game.dungeonHeroes
			for(let x=c.entries(),y=x.next();y.done==false;y=x.next()) {
				let e=y.value
				let d=e[0]
				let r=rf(e[1],d,c)
				let z=r[1]
				a[d]=z
				if(z[0]>0)
					console.log('h_info',z[0],z[2])
				if(r[0]===brk) {
					await w(60)
				}
			}
			console.log('rr>',rr.size)
			a.forEach(function(e) {
				if(e[0]>(tx/tx_div)) {
					if(e[0]>tx)
						tx=e[0]
					to.push(e)
				}
			})
			let ll=[]
			to=to.filter(e => e[0]>(tx/tx_div))
			to.forEach(e => {
				ll.push(e[0])
			}
			)
			ll.sort()
			if(ll.pop()>3000) {
				tx_div=4
			}
			let find_res_ar=a.filter(function(e) {
				return e[0]==tx
			})
			let find_res=find_res_ar[0]
			let find_id=find_res[2]
			let t=function(f,...x) {
				f.dep=0
				return f.apply(null,[f,...x])
			}
			let hero_deep=[]
			let tx_=t(function(f,e,...x) {
				var oe=e
				if(!e) {
					console.log(f.dep,'undef',arguments.length)
					return []
				}
				e=e.slice(1)
				let ret=null
				if(x[0] instanceof Array) {
					if(x.length>1) {
						f.dep++
						ret=[...e,...f(f,...x.slice(0,x.length/2)),...f(f,...x.slice(x.length/2,x.length))]
						f.dep--
					} else {
						f.dep++
						ret=[...e,...f(f,...x)]
						f.dep--
					}
				} else {
					f.dep++
					ret=[...e,...x]
					f.dep--
				}
				hero_deep.push(oe)
				return ret
			},...to)
			let ss=Symbol('[')
			let sa=Symbol(',')
			let sb=Symbol(']')
			hero_deep=hero_deep.sort(function(a,b) {
				return a[0]-b[0]
			})
			game.dungeonHeroes=game.dungeonHeroes.sort((e,b) => {
				let a=hero_deep.findIndex(t => t[1]==e)
				let c=hero_deep.findIndex(t => t[1]==b)
				if(c==-1) {
					c=0
				}
				; if(a==-1) {
					a=0
				}
				; if(c>a) {
					return 1
				}
				if(a>c) {
					return -1
				}
				if(c==a) {
					return 0
				}
			}
			)
			a=game.dungeonHeroes.map((e,dz) => {
				//e.map.setCounts()
				let mp_no_exp=e.map.countFloors-e.map.countExplored
				return [mp_no_exp,e,dz]
			}
			)
			find_res_ar=a.filter(function(e) {
				return e[0]==tx
			})
			ll=[]
			a.filter(e => e[0]>(tx/tx_div)).map(e => {
				ll.push(e[0])
				return e.slice(1)
			}
			)
			find_res=find_res_ar[0]
			find_id=find_res[2]
			game.scrollDungeonHeroTo(find_id)
			return [ss,sb,find_id,tx,ss,...tx_,sa,...ll,sb,find_res]
		}
		return run()
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
