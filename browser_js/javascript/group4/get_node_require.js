run_d=function(...d) {
	undebug=undebug
	debug=debug
	let d_run=function(activator_array_functions) {
		/*w,t,q,l,x*/
		let w=debug
		w.u=undebug
		let native_module_scope={}
		Function.prototype.debug=debug
		//wont lose this to functions named debug...
		window.native_module_scope=native_module_scope
		let all_results=this
		this.errors=[]
		this.res=[]
		all_results.native_module_scope=native_module_scope
		let l=[]
		all_results.l=l
		let x
		w.m=function(f,b,s,fwd) {
			//cspell:words brkpt
			/*f,b,s,w,x,w.s,w=this,x=Promise,w.f=<brkpt:string as (scope:v8.get_scope(f))=>boolean>{w.f=scope[s]}*/
			//this=debug
			let w=this
			let c={}
			c.r=true
			w.s=(e) => {
				switch(s) {
					case "internalBinding":
					case "compileFunction":
					case "lazyError":
					case "primordials":
					case "NativeModule":
					case "assert":
					case "require":
					case "mod":
						break
					default:
						console.log('bp',s,e.toString(16).slice(1))
				}
				c.f=w.f
				c.r=false
				Promise.resolve(0).then(() => {
					w.u(f)
				}
				)
			}
			w.u(f)
			w.t=f
			w.un=atob.bind(window)
			w(f,`{
				let w=(()=>0).debug
				let bid
				try{
					w.f=${s}
					bid=+w.un('${btoa(fwd)}')
				}catch(e){
					w.f=e
				}
				if(w.s){
					w.s(bid)
				}else{
					console.log(w)
				}
				w.u(w.t)
				0
			}`)
			//console.log(s)
			try {
				c.user_res=b(f)
			} catch(e) {
				c.e=e
			}
			if(c.r) {
				console.log('failure',w.f)
			} else {
				//cspell:words bpac
				if(f===w.f)
					console.log('bpac',f)
				w.u(f)
			}
			return c
		}

		{
			/*O<a>,O<x>,w,l,i*/
			let x=null
				,i=0
			let rng_seed=Math.random()
			let uniq=rng_seed*256|0
			all_results.seed=uniq
			let arr=activator_array_functions
			for(let cur=0;cur<arr.length;cur++) {
				let q=arr[cur]
				let b=q(w,x,l,all_results)
				x=b[0]([256*256+cur*256+uniq])
				if(x.f instanceof Error) {
					all_results.errors.push(x.f)
					all_results.res.push(null)
					break
				} else {
					all_results.res.push(x.f)
					all_results.errors.push(null)
				}
				b[1](x,i)
				x=b[2](i)
				i++
			}
		}
		return all_results
	}
	let all_results={
		mapped_arr: [],
	}
	all_results.run_async=d_run
	all_results.run_async(d)
	all_results.the_results=function(cb) {
		cb(all_results)
	}
	return all_results
}
{
	let last_save=0
	let nms

	function do_require_dbg_get_var(w,x,l,all_results,the_name) {
		function set_result(d) {
			all_results.native_module_scope[the_name]=l[d]
			return l[d]
		}
		return [(fwd) => w.m(x.f,f => f('v8'),the_name,fwd),(e,d) => l[d]=e,set_result]
	}

	you_got=run_d(function(w,x,l,all_results) {
		nms=all_results.native_module_scope
		return [(fwd) => {
			let nrs=nodeRequire.toString()
			nrs=nrs.replace(/\w\.record\(\d+,\w\);?/g,"")
			let req_var=nrs.split(nrs.split(/[()]/,2)[1])[1].split(/[()]/)[1].split(" ")[1]
			all_results.nodeRequire_internal_require_name=req_var
			return w.m(nodeRequire,f => {
				return f('fs')
			}
				,req_var,fwd)
		}
			,(e,d) => {
				l[d]=e
			}
			,(d) => {
				return l[d]
			}
		]
	},function(w,x,l,all_results) {
		let result_info={
			name: all_results.nodeRequire_internal_require_name,
			alt: "internal_nodeRequire",
			value: x.f
		}
		all_results.mapped_arr.push(result_info)
		all_results.native_module_scope[result_info.alt]=x.f
		nms.v8=x.f('v8')
		return [(fwd) => w.m(x.f,f => f('v8'),'mod',fwd),(e,d) => l[d]=e,(d) => l[d]]
	},function(w,x,l,all_results) {
		let result_info={
			name: "mod.require",
			alt: "mod_require",
			value: x.f
		}
		all_results.mapped_arr.push(result_info)
		all_results.native_module_scope[result_info.alt]=x.f
		x.f=nms.v8.Serializer
		return [(fwd) => w.m(x.f,f => new f,'assert',fwd),(e,d) => l[d]=e,(d) => l[d]]
	},function(w,x,l,all_results) {
		nms.assert=x.f
		return [(fwd) => w.m(x.f,f => f(!0),'lazyError',fwd),(e,d) => l[d]=e,(d) => l[d]]
	},function(w,x,l,all_results) {
		nms.lazyError=x.f
		return [(fwd) => w.m(x.f,f => f(),'require',fwd),(e,d) => l[d]=e,(d) => l[d]]
	},function(w,x,l,all_results) {
		nms.require=x.f
		let the_name='NativeModule'
		return do_require_dbg_get_var(w,x,l,all_results,the_name)
	},function(w,x,l,all_results) {
		nms.NativeModule=x.f
		x.f=nms.require
		let the_name='primordials'
		return do_require_dbg_get_var(w,x,l,all_results,the_name)
	},function(w,x,l,all_results) {
		x.f=nms.require
		let the_name='compileFunction'
		return do_require_dbg_get_var(w,x,l,all_results,the_name)
	},function(w,x,l,all_results) {
		all_results.native_module_scope.NativeModule=x.f
		x.f=nms.require
		let the_name='internalBinding'
		return do_require_dbg_get_var(w,x,l,all_results,the_name)
	})
	/*
	l[2]=x=q.require=await w.m(x,f=>f(),'require');//lazyError
	l[3]=q.NativeModule=await w.m(x,f=>f('v8'),'NativeModule');//require
	l[4]=q.primordials=await w.m(l[2],f=>f('v8'),'primordials');//require
*/
	let blank_req=(function(w,x,l,all_results) {
		x.f=() => 0
		/**/
		return [(fwd) => w.m(x.f,f => f(),'null',fwd),(e,d) => l[d]=e,(d) => l[d]]
	}
	)
	void blank_req
	let from_last_req=(function(w,x,l,all_results) {
		return [(fwd) => w.m(x.f,f => f(),'null',fwd),(e,d) => l[d]=e,(d) => l[d]]
	}
	)
	void from_last_req
	you_got.the_results(e => {
		let error_set=new Set(e.errors)
		let error_set_arr=new Array(error_set)
		if(error_set_arr.indexOf(null)>-1&&error_set_arr.length>1) {
			console.log('e',e.errors.map(e => +(e!==null)).join(''))
		}
		console.log('r',e.res.map(e => +(e!==null)).join(''))
		let r=e.res
		return true
	}
	)
	you_got.res
}
