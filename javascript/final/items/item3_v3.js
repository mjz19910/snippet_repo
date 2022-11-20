/* spell:words
--- version_list item 3 ---
v1 (old): snippet_repo/javascript/final/items/item3_v1.js
v2 (old): snippet_repo/javascript/final/items/item3_v2.js
v3 (cur): snippet_repo/javascript/final/items/item3_v3.js
v4 (new): snippet_repo/javascript/final/items/item3_v4.js
v5 (new): snippet_repo/javascript/group1/sub_a/item-_3.js
*/
(function() {
	const open_or_space_match=RegExp('[\\s]'+"{}"[0],'g')
	let does_return=true
	undebug=undebug
	debug=debug
	async function xxx(fn,cb) {
		debug.f_i=debug.f.size
		debug.f.set(debug.f_i,fn)
		debug(debug.f,'try{debug.g['+debug.f_i+'](function(e){return eval(e)},[this,...arguments])}catch(e){console.log(e)};0;')
		let x={
			Y() {},
			cid: debug.f_i
		}
		let w=new Promise(e => x.e=e)
		if(debug.g instanceof Function) {
			delete debug.g
		}
		if(!debug.g)
			debug.g=[]
		cb.scope=x
		let cur=cb
		debug.g[debug.f_i]=cur
		let o=new Promise(e => setTimeout(e,12000,null))
		console.log('pre_race')
		let r=await Promise.race([w,o,debug.q])
		if(r==null) {
			debug.g[x.cid](null)
			return r
		}
		if(globalThis instanceof DedicatedWorkerGlobalScope) {
			globalThis.res=r
		} else {
			debugger
		}
		return r
	}
	async function rf(done_callback) {
		if(debug.f instanceof Map&&debug.f.size>0) {
			return debug.f
		} else {
			undebug(debug.f)
		}
		if(!debug.f) {
			if(typeof debug.f==='undefined')
				debug.f=new Map()
		} else {
			if(!(debug.f instanceof Map)) {
				let ok=debug.f
				debug.f=new Map()
				debug.f.set(0,ok)
			}
		}
		if(debug.c) {
			debug.c()
			delete debug.c
		}
		if(!debug.q) {
			debug.q=new Promise(e => debug.c=e)
			debug.q.then(() => delete debug.q)
		}
		function cb(e,args) {
			let x=cb.scope
			x.get_func=e
			if(e===null) {
				undebug(debug.f.get(x.cid))
				x.e(null)
				return
			}
			if(args[0].toString().indexOf('native')==-1) {
				if(args[0].name=='it') {
					x.Y(args[0])
				}
				x.e([e,args])
			}
			console.log(args.length,args[0].name)
		}
		return done_callback(Function.prototype.call,cb)
	}
	/**@arg {CallableFunction} func@arg {string} src_url_js */
	function make_async_function(func,src_url_js) {
		let rc="("+func.toString()+")"
		let func_prototype=Object.getPrototypeOf(func)
		/**@type {typeof func} */
		let func_constructor=func_prototype.constructor
		/**@type {CallableFunction} */
		let re_create_func=func_constructor('','')
		let re_func_str_0=re_create_func.toString()
		let re_func_str_1=re_func_str_0.split(/\s+/g)
		let base_function_def=re_func_str_1.join(" ")
		let is_async=base_function_def.match('async')!==null
		let generates=base_function_def.match('\\*')!==null
		let g=(e,...x) => {
			for(var g=x.length,w=e.raw,s='';g;) {
				s=x.pop()+w[g--]+s
			}
			return w[0]+s
		}
		let i=0
		let rev_i=0
		if(rc[i]=='()'[0]) {
			i++
		}
		if(rc.at(rev_i-1)=='()'[1]) {
			rev_i--
		}
		let word_regex=/\w+/g
		let ws_regex=/\s+/g
		if(is_async&&word_regex.exec(rc)[0]=="async") {
			let ws_len=ws_regex.exec(rc)
			console.assert(ws_len.index==word_regex.lastIndex)
			i+="async".length+1
		}
		if(word_regex.exec(rc)[0]=="function") {
			let ws_len=ws_regex.exec(rc)
			console.assert(ws_len.index==word_regex.lastIndex)
			i+="function".length+1
		}
		let fn_name=word_regex.exec(rc)[0]
		i+=fn_name.length
		console.assert(rc[word_regex.lastIndex]=='()'[0])
		word_regex.lastIndex++
		let fn_args=[]
		let start
		while(rc[word_regex.lastIndex]!="()"[1]) {
			if(rc[word_regex.lastIndex]==",") {
				word_regex.lastIndex++
			}
			if(rc[word_regex.lastIndex]==" ") {
				word_regex.lastIndex++
			}
			start=word_regex.lastIndex
			let mat=word_regex.exec(rc)[0]
			console.assert(rc.slice(start,word_regex.lastIndex)==mat)
			start=word_regex.lastIndex
			fn_args.push(mat)
			i+=mat.length
		}
		i=word_regex.lastIndex
		console.assert(rc[word_regex.lastIndex]=='()'[1])
		i++
		while(rc[i]==' '||rc[i]=='\t') {
			i++
		}
		let j=rc.slice(i,rev_i)
		console.log(j)
		if(does_return)
			return
		if(j)
			j=j[0]
		console.log(j)
		var AsyncFunction=func_constructor
		function while_eq_iter(iter,char) {
			let m,i=0
			do {
				m=iter.next()
				i++
			} while(!m.done&&m.value==char)
			return i
		}
		let e=rc.matchAll(open_or_space_match)
		let m=j.matchAll(open_or_space_match)
		let x=while_eq_iter(e," ")-while_eq_iter(m," ")
		let tx_regex=/.+\n/
		function get_padding_len(str) {
			return str.match(tx_regex)[0].length
		}
		let func_out=rc.slice(x+is_async*5+generates*1+12+j.length,rc.lastIndexOf("{}"[1]))
		let slice_me=func_out.slice(0,get_padding_len(func_out)-get_padding_len(func_out.trim()))
		let vp=0
		if(slice_me)
			vp=slice_me.split('').map(e => e=='\t'? 4:1).reduce((a,b) => a+b)
		function no_pad(e,d) {
			if(d==0)
				return e
			let x,i=0
			do {
				x=e[i]
				if(x=='\t')
					d-=4
				else if(x==' ')
					d-=1
				else
					break
				i++
			} while(d>0)
			return e.slice(i)
		}
		function source_url_comment(url) {
			return `\n//# sourceURL=${url}`
		}
		let code_str=func_out.split("\n").map(e => no_pad(e,vp)).join('\n')
		return AsyncFunction(j,code_str+source_url_comment(src_url_js))
	}
	let src_url_func=make_async_function(rf,"devtools://devtools/bundled/acorn._debug.rf.js")
	let res_func_1=make_async_function(xxx,"devtools://devtools/bundled/acorn._debug.xxx.js")
	if(does_return)
		return
	let res_func_2=src_url_func(res_func_1)
	if(does_return)
		return res_func_2
	if(typeof cint!="undefined") {
		clearTimeout(cint)
	}
	function presfn(some_function) {
		if(getPrestigePower(player.stars).div(player.prestigePower).toNumber()>100) {
			checkToReset(1)
			if(player.stars.toNumber()==10) {
				console.log("r1",player.supernovaPlaytime.toFixed(3))
			}
			some_function(presfn)
		} else if(showTooMuch) {
			console.log("r3")
			reset(3)
			some_function(presfn)
		} else {
			maxAll()
			some_function(presfn)
		}
	}
	function nxfn(other_function) {
		if(!window.hasOwnProperty("player")) {
			cint=setTimeout(nxfn,70,other_function)
			return
		}
		if(player.stars.log(10)<90) {
			cint=setTimeout(other_function,70,nxfn)
		} else if(player.stars.log(10)<250) {
			cint=setTimeout(other_function,70,nxfn)
		} else if(player.stars.log(10)<280) {
			cint=setTimeout(other_function,70,nxfn)
		} else {
			cint=setTimeout(other_function,70,nxfn)
		}
	}
	//nxfn(presfn)
}
)()
//# sourceURL=UA_user_auto.js
