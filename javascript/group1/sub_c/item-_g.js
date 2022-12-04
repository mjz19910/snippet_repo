// this makes a index.html${i++} file every save... :${"()"[0]}
{
	function exclude_from(arr,remove_seq_vec) {
		let ret=[]
		for(let i=0;i<arr.length;i++) {
			let cur=arr[i]
			if(!remove_seq_vec.includes(cur)) {
				ret.push(cur)
			}
		}
		return ret
	}
	function is_window_ctx(e) {
		// cSpell:disable-next-line
		let ev_handler_str_list="onabort,onafterprint,onanimationend,onanimationiteration,onanimationstart,onappinstalled,onauxclick,onbeforeinstallprompt,onbeforeprint,onbeforeunload,onbeforexrselect,onblur,oncancel,oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontextmenu,oncuechange,ondblclick,ondevicemotion,ondeviceorientation,ondeviceorientationabsolute,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,ondrop,ondurationchange,onemptied,onended,onerror,onfocus,onformdata,ongotpointercapture,onhashchange,oninput,oninvalid,onkeydown,onkeypress,onkeyup,onlanguagechange,onload,onloadeddata,onloadedmetadata,onloadstart,onlostpointercapture,onmessage,onmessageerror,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onoffline,ononline,onoverscroll,onpagehide,onpageshow,onpause,onplay,onplaying,onpointercancel,onpointerdown,onpointerenter,onpointerleave,onpointermove,onpointerout,onpointerover,onpointerrawupdate,onpointerup,onpopstate,onprogress,onratechange,onrejectionhandled,onreset,onresize,onscroll,onscrollend,onsearch,onseeked,onseeking,onselect,onselectionchange,onselectstart,onstalled,onstorage,onsubmit,onsuspend,ontimeupdate,ontimezonechange,ontoggle,ontransitioncancel,ontransitionend,ontransitionrun,ontransitionstart,onunhandledrejection,onunload,onvolumechange,onwaiting,onwebkitanimationend,onwebkitanimationiteration,onwebkitanimationstart,onwebkittransitionend"
		let ev_handler_vec=ev_handler_str_list.split(',')
		let wk=Object.keys(e)
		wk=exclude_from(wk,ev_handler_vec)
		return wk.slice(0,wk.indexOf('webkitResolveLocalFileSystemURL')).length===110
	}
	is_window_ctx(window)
}
//perl<is_a>
{
	//has same js_context
	function is_context(a,b) {
		return root_proto.run(a)===root_proto.run(b)
	}
}
//js<is_context>
{
	// get the object prototype of this object
	let gp=function(a,p) {
		"use strict"
		let x
		x: {
			if(window.root_proto) {
				break x
			}
			x=class root_proto {
				static run() {
					if(!this) {
						throw new Error("Need to call with class")
					}
					if(this instanceof root_proto) {
						if(a==undefined) {
							return this.root_s
						}
						let t=a+''
						if(t==='[object Object]') {
							return a
						} else {
							return this.run(Object.getPrototypeOf(a),a)
						}
						if(p)
							return p
					}
					throw Error("called with wrong type")
				}
			}
				
			x.null_s=Symbol('null')
		}
		window.root_proto=x
	}
	gp()
}
//js<window.root_proto>
{
	if(Window.all===undefined) {
		Window.all=Object.entries(window)
	}
	if(Window.all.length!==Object.keys(window).length) {
		console.log('re_entry')
		let d=Date.now()
		let c=d-Date.now()
		let cc=0
		while(c<1000) {
			console.log(c)
			c=Date.now()-d
			if(cc>1000000) {
				console.log('b')
				break
			}
		}
		Window.all=Object.entries(window)
	}
	p=function(...e) {
		console.log(...e)
	}
	let undef_keys=[]
	let null_keys=[]
	let q_keys=[]
	for(q of Window.all) {
		let i=q[1]
		if(i===undefined) {
			undef_keys.push(q[0])
			continue
		}
		if(i===null) {
			null_keys.push(q[0])
			continue
		}
		let len=Object.keys(Object.getPrototypeOf(i))
		if(i instanceof Function) {
			if(i.prototype) {
				let fp=Object.keys(i.prototype)
				if(fp.length==0) {
					let j=Object.getPrototypeOf(i.prototype)
				} else {
					console.log(fp.length)
					try {
						new i
						console.log('cstruct',q[0])
					} catch(e) {
						p('cres',q[0],len,e.name)
					}
					p('fp',fp)
				}
				continue
			}
			q_keys.push([q[0],Object.getPrototypeOf(i)===Function.prototype])
			continue
		}
		if(i[Symbol.toPrimitive]) {
			console.log(i)
		}

	}
	Window.key_types={
		u: undef_keys,
		n: null_keys,
		raw_func: q_keys
	}
}
