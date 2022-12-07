window.async_func=(async function() {
	var message_channel_class=class message_channel_class {
		constructor(des_arr) {
			des_arr.push(e => {
				this.p_tx.close()
				this.p_rx.close()
				this._listeners={}
				for(let i of this.promise_reject_on_destroy) {
					i()
				}
			}
			)
			let cls=Reflect.getPrototypeOf(this).constructor
			let log_cls=false
			if(log_cls)
				console.log(cls)
			let {port1: mp1,port2: mp2}=new MessageChannel
			this.p_tx=mp2
			this.p_rx=mp1
			this._listeners={}
			let t=this
			this.promise_reject_on_destroy=[]
			this.p_rx.onmessage=function(e) {
				t.save_port_this(this)
				t.portOnMessage(e)
			}
		}
		save_port_this(e) {
			this.port_this_save=e
		}
		portOnMessage(e) {
			let _fn
			switch(typeof e.data.eventType) {
				case 'string':
					_fn=this._listeners[e.data.eventType]
					for(let ob of _fn) {
						let fn=ob.callback
						fn(e)
					}
					break
				default:
					console.error("invalid message on message channel",typeof e.data.eventType,e.data)
			}
		}
		addEventListener(e,fn,opts={}) {
			this._listeners[e]??=[]
			if(this._listeners[e].findIndex(function(e) {
				return e.callback==fn
			})==-1) {
				this._listeners[e].push({
					callback: fn,
					opts: opts
				})
			}
		}
		dispatchDelayed(e) {
			this.p_tx.postMessage(e)
		}
		delayedCallback(fn) {
			this.addEventListener('run',fn,{
				once: true
			})
			this.p_tx.postMessage({
				eventType: 'run'
			})
		}
		delayedPromise(fn) {
			void fn
			var t=this
			let __rj__=null
			let __destroy__=e => t.promise_reject_on_destroy.splice(__rj__,1)
			var ret=new Promise((_e,_reject) => {
				t.delayedCallback(_e)
				__rj__=t.promise_reject_on_destroy.push(() => {
					_reject()
					__destroy__()
				}
				)
			}
			)
			ret.then(__destroy__)
			return ret
		}
	}
	let is_start_elem
	let smm_des=[]
	let smm=new message_channel_class(smm_des)
	if(typeof xarray=='undefined') {
		xarray=[]
	} else {
		if(xarray.length>4) {
			xarray.eval_scope.length=0
		}
		if(xarray.eval_scope&&xarray.eval_scope.length>4) {
			xarray.eval_scope.length=0
		}
	}
	xarray.des_arr??=[]
	xarray.finish=function() {
		for(let x of xarray.des_arr) {
			x()
		}
	}
	let wait_for_print=null
	if(xarray.done==false) {
		let gsp=xarray.g_promise
		await gsp
		let lc=0
		while(gsp!=xarray.g_promise) {
			lc++
			gsp=xarray.g_promise
			await gsp
		}
		wait_for_print=[lc]
	}
	console.clear()
	if(wait_for_print) {
		console.log("wait for n:"+wait_for_print[0])
		wait_for_print=null
	}
	xarray.done=false
	is_start_elem=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").shadowRoot.querySelector('[class*="start-recording"]')
	getEventListeners=getEventListeners
	debug=debug
	undebug=undebug
	let fn_name
	void fn_name
	let nx_name='Ji ex Qi'
	let log_name_of
	x: if(is_start_elem==null) {
		let canc=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").shadowRoot.querySelector('[class*="stop-recording"]')
		if(canc==null) {
			let tel=document.querySelector("div#sources-panel-sources-view")
			let ec=tel.__widget._editorContainer
			ec.showFile({
				url: e => "recording:///Recording"+encodeURIComponent(" #1")
			})
			await smm.delayedPromise()
			let ed_cont=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").parentElement.parentElement.__widget._editorContainer
			ed_cont._currentFile._content.content=''
			ed_cont._currentFile._workingCopyChanged()
			is_start_elem=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").shadowRoot.querySelector('[class*="start-recording"]')
			break x
		} else {
			canc.click()
			await smm.delayedPromise()
		}
		let ed_cont=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").parentElement.parentElement.__widget._editorContainer
		ed_cont._currentFile._content.content=''
		ed_cont._currentFile._workingCopyChanged()
		let tfn_=get_arrmap(xarray.tfn,'Ji ex Qi')
		undebug(tfn_)
		is_start_elem=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").shadowRoot.querySelector('[class*="start-recording"]')
	}
	let ed_cont=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").parentElement.parentElement.__widget._editorContainer
	ed_cont._currentFile._content.content=''
	ed_cont._currentFile._workingCopyChanged()

	tlele=is_start_elem.parentElement
	xarray.des_arr.push(e => delete tlele)
	tlis=getEventListeners(tlele).click[0].listener
	xarray.des_arr.push(e => delete tlis)
	xarray.anid=xarray.anid??0
	let g_msg_chan=new message_channel_class(xarray.des_arr)
	void g_msg_chan
	xarray.tfn=[]
	xarray.tfn.push('Ji ex Qi',tlis)
	pof=(e) => Object.getPrototypeOf(e)
	xarray.des_arr.push(e => delete pof)
	xarray.chk=['Ji ex Qi',(e) => e&&e.constructor.name=='Ji'&&pof(e.constructor.prototype).constructor.name=='Qi']
	get_arrmap=(m,e) => m[m.indexOf(e)+1]
	xarray.des_arr.push(e => delete get_arrmap)
	xarray.act_probj=[]
	xarray.act_promise=[]
	xarray.act_probj.push('Ji ex Qi',new Promise((e,fa) => {
		xarray.act_promise.push('Ji ex Qi',e)
		xarray.des_arr.push(e => fa(new Error("Finished")))
	}
	))
	xarray.make_act=function(n,fn_make) {
		var _new=fn_make(n)
		if(this.act.indexOf(n)>-1) {
			let tni=this.act.indexOf(n)
			let tfn=this.act[tni+1]
			//console.log('mkadd',tfn)
			if(tfn instanceof Function) {
				this.act[tni+1]=[tfn,_new]
			} else {
				this.act[tni+1].push(_new)
			}
			return
		}
		//console.log('akadd',this.act,n,_new)
		let plen=this.act.length
		this.act.push(n,_new)
		//console.log(this.act.length,plen)
	}

	xarray.act=[]
	xarray.nxt=_e => xarray.chk.filter(e => e instanceof Function).filter(e => e(_e)).map(e => xarray.chk[xarray.chk.indexOf(e)-1])[0]
	var make_dbg=function(fn) {
		debug.tfn=fn
		xarray.anid++
		let nx_l_name=debug.tfn.name? ("fn(\\\""+debug.tfn.name+'\\"):'+(xarray.anid)):("anon:"+(xarray.anid))
		if(debug.tfn.name.indexOf('bound ')==0) {
			nx_l_name="fn_bnd(\\\""+debug.tfn.name.slice(5+1)+'\\"):'+(xarray.anid)
		}
		log_name_of=JSON.parse(`\"${nx_l_name}\"`)
		let grc=function(e,...r) {
			//console.log(arguments)
			let s=e.raw[0]
			let c=1
			for(let i of r) {
				s+=i
				if(e.raw[c]) {
					s+=e.raw[c]
				}
				c++
			}
			return s
		}
		debug.str_code=grc`
xarray.indexOf(this)==-1?xarray.push(this):0
let log_name_of="${nx_l_name}"
let fn_name="${nx_name}"
console.log('breakpoint',fn_name,log_name_of)
try{
	let arg_save=Array.prototype.slice.call(arguments)
	let evaler=(__eval_in__)=>{
		if(__eval_in__=="arguments"){
			return arg_save
		}
		return eval(__eval_in__)
	}
	let _ntn=this
	let nxt_ex=xarray.nxt(_ntn)
	let nx=xarray.act.indexOf(nxt_ex)
	let nfn=xarray.act[nx+1]
	nfn(_ntn,evaler)
}catch(e){
	console.log(e)
}
${'//'}# sourceURL=snippet://web/dbg0.js
0
`

	}
	make_dbg(tlis)
	let h={
		h: null
	}
	var async_promise_run
	{
		let asyfn=(async function() {
			var cur=get_arrmap(xarray.act_probj,'Ji ex Qi')
			var ret=await cur
			let tfn_=get_arrmap(xarray.tfn,'Ji ex Qi')
			undebug(tfn_)
			let log_ret=false
			x: {
				if(!log_ret)
					break x
				console.log(ret._listeners)
				h.h=ret._listeners
			}
			let tpr
			let pr_state={}
			x: {
				let msg_chan=new message_channel_class(xarray.des_arr)
				pr_state.msg_chan=msg_chan
				tpr=msg_chan.delayedPromise()
				break x
			}
			let npr=tpr.then(e => {
				tlele.click()
				return pr_state.msg_chan.delayedPromise()
			}
			)
			let retpr=npr.then(e => {
				let ed_cont=document.querySelector("div#sources-panel-sources-view > div.sources-toolbar > div:nth-child(2)").parentElement.parentElement.__widget._editorContainer
				ed_cont._currentFile._content.content=''
				ed_cont._currentFile._workingCopyChanged()
				return "done"
			}
			)
			return retpr
		}
		)
		let asy=asyfn()
		asy.then(function() {},function(e) {
			console.error(e)
			setTimeout(e => tlele.click())
		})
		async_promise_run=asy
	}
	xarray.make_act('Ji ex Qi',function(_e) {
		let asya=get_arrmap(xarray.act_promise,_e)
		return function(e,evaler) {
			_xx2=e
			xarray.des_arr.push(e => delete _xx3)
			asya(e)
			var cur=xarray.callbacks[xarray.callbacks.indexOf(nx_name)+1]
			cur(e,evaler)
		}
	})
	xarray.callbacks=[]
	xarray.callbacks.push('Ji ex Qi',function(_,evaler) {
		xarray.eval_scope??=[]
		xarray.eval_scope.push(evaler)
		let e=_._listeners
		let tkey=e.keys().next().value
		let tlis_arr=e.get(tkey)
		let got_lis=tlis_arr[0]
		let nx=got_lis.listener
		let nx_pof=pof(nx)
		void nx_pof
		let tobj=null
		let obj={
			clicked: function(e) {
				let spc=tlis_arr.indexOf(tobj)
				let last=tlis_arr.splice(spc,1)
				void last
			}
		}
		tobj={
			thisObject: obj,
			listener: obj.clicked,
			disposed: void 0
		}
		tlis_arr.splice(0,0,tobj)
		let nx_str=nx.toString()
		let nx_parse={}
		{
			let e=nx_parse
			e.x=nx_str.indexOf("=>")
			e.aend=nx_str.indexOf(")")
			if(e.aend==-1||e.aend>e.x) {
				e.skip=2
				e.aend=e.x
				e.astart=-1
			} else {
				e.astart=nx_str.indexOf("(")
			}
			e.arg=nx_str.slice(e.astart+1,e.aend)
			e.rest=nx_str.slice(e.aend+e.skip+1,-1)
		}
		let nx_name=nx.name+' '+nx_parse.arg+"@"+nx_parse.rest
		xarray.act_probj.push(nx_name,new Promise(e => {
			xarray.act_promise.push(nx_name,e)
		}
		))
		//console.log('b',nx_name,xarray.act)
		xarray.make_act(nx_name,function(_e) {
			let asya=get_arrmap(xarray.act_promise,_e)
			return function(e,evaler) {
				_xx3=e
				xarray.des_arr.push(e => delete _xx3)
				asya(e)
				var cur=get_arrmap(xarray.callbacks,nx_name)
				cur(e,evaler)
			}
				
		})
		//console.log('a',xarray.act)
		xarray.chk.push(nx_name,e => e==nx)
		xarray.tfn.push(nx_name,nx)
		let msg_chan=new message_channel_class(xarray.des_arr)
		xarray.callbacks.push(nx_name,function(e,evaler) {
			//console.log('cbr',evaler('e'))
			xarray.eval_scope.push(evaler)
			msg_chan.delayedCallback(e => {
				undebug(get_arrmap(xarray.tfn,nx_name))
			}
			)
		})
		undebug(get_arrmap(xarray.tfn,nx_name))
		xarray.anid++
		let nx_l_name=(nx.name? ("fn(\\\""+nx.name+'\\"):'+(xarray.anid)):("anon:"+(xarray.anid)))
		let log_name_of=JSON.parse('"'+nx_l_name+'"')
		let grc=function(e,...r) {
			//console.log(arguments)
			let s=e.raw[0]
			let c=1
			for(let i of r) {
				s+=i
				if(e.raw[c]) {
					s+=e.raw[c]
				}
				c++
			}
			return s
		}
		debug.str_code=grc`
	x:{
	let sargs=typeof arguments
	let evaler
	let fn_name="${nx_name}"
	let log_name_of="${nx_l_name}"
	let nfn
	console.log('breakpoint',fn_name,log_name_of)
	if(sargs=='undefined'){
		evaler=(__eval_in__)=>{
			if(__eval_in__=="arguments"){
				throw RuntimeError("Failed to save arguments from bound function")
			}
			return eval(__eval_in__)
		}
		//console.dir(evaler)
		if(typeof this=='undefined'){
			try{
			let nx=xarray.act.indexOf(fn_name)
			nfn=xarray.act[nx+1]
			nfn(e,evaler)
			}catch(e){
				console.log('nthis,err')
				console.error(e)
			}
			break x
		}
		let _ntn=this
		let nxt_ex=xarray.nxt(_ntn)
		let nx=xarray.act.indexOf(nxt_ex)
		nfn=xarray.act[nx+1]
		nfn(_ntn,evaler)
		break x
	}
	try{
xarray.indexOf(this)==-1?xarray.push(this):0
console.log(sargs+":"+fn_name,xarray.nxt(this))
try{
	let arg_save=Array.prototype.slice.call(arguments)
	evaler=(__eval_in__)=>{
		if(__eval_in__=="arguments"){
			return arg_save
		}
		return eval(__eval_in__)
	}
	let _ntn=this
	let nxt_ex=xarray.nxt(_ntn)
	let nx=xarray.act.indexOf(nxt_ex)
	let nfn=xarray.act[nx+1]
	nfn(_ntn,evaler)
}catch(e){
	console.log(e)
}
}catch(e){
	console.log(e)
}
${'//'}# sourceURL=snippet://web/dbg.js
}
0`
		xarray.act_probj.push(nx_name,new Promise(e => {
			xarray.act_promise.push(nx_name,e)
		}
		))
		console.log('set_debug_bp',log_name_of)
		debug(get_arrmap(xarray.tfn,nx_name),debug.str_code)
	})
	debug=debug
	undebug(get_arrmap(xarray.tfn,'Ji ex Qi'))
	for(let i of smm_des) {
		i()
	}
	console.log('set_debug_bp',log_name_of)
	debug(get_arrmap(xarray.tfn,'Ji ex Qi'),debug.str_code)
	tlele.click()
	get_arrmap(xarray.tfn,'Ji ex Qi')
	h
	h.h=xarray[0]._listeners
	{
		let got_lis=h.h.get(h.h.keys().next().value)[0]
		got_lis.listener.name
		let nx=got_lis.listener
		let nx_pof=pof(nx)
		let log_nx_pof=false
		if(log_nx_pof) {
			console.log(nx_pof)
		}
		let nx_str=got_lis.listener.toString()
		let nx_parse={}
		{
			let e=nx_parse
			e.x=nx_str.indexOf("=>")
			e.aend=nx_str.indexOf(")")
			if(e.aend==-1||e.aend>e.x) {
				e.skip=2
				e.aend=e.x
				e.astart=-1
			} else {
				e.astart=nx_str.indexOf("(")
			}
			e.arg=nx_str.slice(e.astart+1,e.aend)
			e.rest=nx_str.slice(e.aend+e.skip+1,-1)
		}
		let nx_name=nx.name+' '+nx_parse.arg+"@"+nx_parse.rest
		let nx_name_log=false
		if(nx_name_log) {
			console.log(nx_name)
		}
		xarray.g_promise=async_promise_run
		async_promise_run.then(e => xarray.done=true).then(e => {
			if(xarray.length>6) {
				xarray.length-=2
			}
			while(xarray.eval_scope.length>6) {
				xarray.eval_scope.length-=2
			}
			xarray.finish()
			var xar=xarray
			xarray=[]
			xarray.done=xar.done
		}
		)
		return async_promise_run
	}
}
)
perf_test=async function(n) {
	for(let i=0;i<n;i++) {
		try {
			let res=await async_func()
			console.log(res)
		} catch(e) {
			console.log('error',e)
		}
	}
}
{
	let t_start=performance.now()
	perf_test(3).then(e => console.log("DonePerf:"+(performance.now()-t_start)))
}
