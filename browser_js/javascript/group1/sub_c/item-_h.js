__cur={}
__cur.f=function() {
	debug=debug
	debug.u=undebug
	x: {
		let x=debug
		x.fo=[]
		__fo=x.fo
		x.st=new Set
		x.sarr=[]
		x.ne=[]
		function __add_set() {
			for(c of Object.keys(x.o)) {
				let v=x.o[c]
				if(!x.st.has(v)) {
					x.st.add(v)
					x.sarr.push(v)
					x.ne.push(v)
				}
			}
		}
		{
			let a=[]
			let cca=(e => e.charCodeAt(0))
			let iter_chars=function(a,s) {
				for(let i=cca(s[0]);i<cca(s[1]);i++) {
					a.push(String.fromCharCode(i))
				}
			}
			iter_chars(a,'az')
			iter_chars(a,'AZ')
			a.push('_','$')
			let b=a.slice()
			iter_chars(b,'09')
			x.__ident_start_chars=a
			x.__ident_chars=b
		}
		//__ident_start_chars&&__ident_chars
		x.__all_vars=`{
			let __nf=Symbol(1)
			let __get=__e=>{try{return eval(__e)}catch(e){return __nf}}
			{
				let x=debug
				x.u(x.f)
				x.o={}
				let pl=x.__ident_start_chars
				for(let i=0;i<pl.length;i++){
					let t=x.o
					let k=pl[i]
					let v=__get(k)
					if(v!==__nf){t[k]=v}
				}
			}
		};0;`
		x.__getter_names=`{
			let __nf=Symbol(1)
			let __get=__e=>{try{return eval(__e)}catch(e){return __nf}}
			debug.__error_sym=Symbol("Error")
			debug.__result_sym=Symbol("Result")
			debug.__trg_eval=__e=>{
				try{
					return [debug.__result_sym,eval(__e)]
				}catch(e){
					return [debug.__error_sym,e]
				}
			}
			{
				let x=debug
				x.u(x.f)
				let cb=x.cb
				if(cb)cb(__get)
				x.gr={}
				let pl=x.__name_list
				for(let i=0;i<pl.length;i++){
					let t=x.gr
					let k=pl[i]
					let v=__get("(function(){return "+k+"})")
					if(v!==__nf){t[k]=v}
				}
			}
		};0;`
		x.__get_list=`{
			let __nf=Symbol(1)
			let __get=__e=>{try{return eval(__e)}catch(e){return __nf}}
			{
				let x=debug;x.u(x.f);x.o={}
				for(let i of x.__name_list){
					let t=x.o
					let v=__get(i)
					if(v!==__nf){t[i]=v}
				}
			}
		};0`
		x.rx={}
		let w={}
		x.rx=w
		__w=w
		x.f=jQuery
		x(x.f,x.__all_vars)
		x.f.call(null,"")
		x.rx.jQuery=x.o
		let __nf=Symbol(2)
		function __run(fn,bp_str,...args) {
			x(fn,bp_str)
			try {
				return fn(...args)
			} catch {
				return __nf
			}
		}
		function __run_noisy(fn,bp_str,...args) {
			x(fn,bp_str)
			try {
				return fn(...args)
			} catch(e) {
				console.log(e)
				return __nf
			}
		}
		let use_functions=false
		if(use_functions) {
			__run(() => 0,'test',1)
			__run_noisy(() => 0,'test',1)
			__add_set()
		}
		break x
	}
	let ret={
		...debug
	}
	let ex=(class extends null {
	}
	).prototype
	delete ex.constructor
	delete ret.toString
	delete ret.u
	for(let i in ret) {
		ex[i]=ret[i]
	}
	return ex
}
__cur.f=function() {
	{
		let tfn=(function() {
			let dcl=0
			ast=[]
			lps=[[],[]]
			alens=[]
			sarr=[() => 76671+Math.floor(Math.random()*1024),e => Math.random()*1]
			arr=sarr.slice().map(e => e())
			function iter_end() {
				for(let dc,i=0;lps.length<12;i+=1) {
					let a,cp,sl,de=false
					let ea=[1]
					dc=0
					try {
						while(1) {
							lc++
							a=arr[0]
							b=arr[1]
							al=arr.length
							let nx=sarr.slice().map(e => e())
							arr[0]=nx[0]
							arr[1]=nx[1]
							arr.length=Math.floor(arr[0]*arr[1])
							if(!de) {
								sl=(arr.length)
								de=true
							}
							for(let j=0;j<arr.length;j++) {
								arr[j]??=1
							}
							cp=arr.slice()
							let c2=ea.slice()
							ea.length=0
							let tlen=c2.length*2
							for(let j=0,oe=0;j<tlen;j++) {
								if(j<c2.length) {
									ea[j]=c2[j]
								}
								ea[j]=c2[oe++]
							}
							let eas=ea.slice(0,Math.floor(Math.random()*(ea.length/8))-1)
							dcl=cp.length+ea.length
							a=arr.push(...cp,...eas)
							if(lps.length>8192) {
								return ['oom',arr.length]
							}
							arc=(() => class extends Array {
							}
							)()
							Object.setPrototypeOf(arc,Array)
							Object.setPrototypeOf(arc.prototype,Array.prototype)
							arc.prototype[Symbol.toStringTag]='e'
							lps[lps.length-1]=new arc
							console.log([a,cp.length+eas.length,(dc++)])
							lps[lps.length-1]
						}
					} catch {
						lps.push(['c',a,dcl])
						lps.push([])
						alens.push([arr.length,dcl,sl,dc])
					}
				}
				lps.shift()
				lps.pop()
				ast[1]=1
				return alens
			}
			let ret=iter_end()
			return ret
		}
		)
		let ret=tfn()
		console.log(...lps)
		console.log(...ret)
	}
}
__cur.f()
