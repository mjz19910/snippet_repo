x: if(location.href==="https://mrredshark77.github.io/incremental-merge/") {
	y: {
		let do_si_update_block=false
		if(svm.si_update===undefined) {
			if(!do_si_update_block)
				break y
			undebug=undebug
			debug=debug
			debug.f=vm_render._s
			undebug(debug.f)
			function dbg_bp() {
				val.save=_toString
				console.log(val)
				Promise.resolve([debug,undebug]).then(([x,e]) => e(x.f))
			}
			let fn_bp_str=dbg_bp.toString()
			{
				let e='dbg_bp'.length
				let a=fn_bp_str.slice(12+e,-1)
				let b=a.trim()
				let c=b.split('\n')
				let d=c.map(a => {
					a=a.trim()
					if(a[a.length-1]==';') {
						a=a.slice(0,-1)
					}
					return a
				}
				)
				fn_bp_str=d.join(';')
			}
			debug(debug.f,fn_bp_str+';0')
			debug.a=[1,2,3]
		}
		if((typeof vm_render)[0]=='u') {
			break x
		}
		let child_class=class children extends Array {
		}
		let tag_gen=function(idt,...e) {
			let x=idt
			let o={}
			let fn=new Function('o,e','let '+idt+'=class extends Array{};return '+idt+".from(e)")
			function rsg(x) {
				return child_class.from(e[0])
			}
			switch(e.length) {
				case 0:
					console.log(x)
					break
				case 1:
					console.log(x,e[0])
					e[0]=rsg(e[0])
					break
				case 2:
				case 3:
					e[1]=rsg(e[1])
					break
				default:
					console.log(x,'args',e)
			}
			let ret=fn(o,e)
			return ret
		}
		let t=tag_gen
		let x=(...e) => e
		x===void 0
		let virtual_gen=function(o,na) {
			let virtual_class=(new Function('let '+na+'=class extends Array{};return '+na))()
			o[na]=function(...e) {
				console.log(na,e)
				return virtual_class.from(e)
			}
		}
		let y=virtual_gen
		let vm_scope={}
		let c=vm_scope
		c._c=t
		y(c,'_v')
		y(c,'_s')
		c._l=function(arr,iter) {
			console.log('_l',arr,iter)
			let out=[]
			for(let i in arr) {
				console.log('_l',i)
				out[i]=iter(arr[i])
			}
			return out
		}
		c._e=(tx) => {
			let was_null=false
			if(tx===void 0) {
				tx=''
				was_null=true
			}
			let arr=(function() {
				return class {
					constructor(e) {
						this.text=e
					}
				}
					
			}
			)()
			if(was_null) {
				arr.prototype[Symbol.toStringTag]='null_comment'
			} else
				arr.prototype[Symbol.toStringTag]='comment'
			return new arr(tx)
		}
		vm_render.$options.render.call(vm_scope)
	}
	if(svm.update!==undefined) {
		break x
	}
	svm.update=function() {
		var t=this
		let needs_dom=false
		var get_tab_div=function() {
			return document.querySelector('div#app > :nth-child(8)').childNodes[0]
		}
		x: if(t.t===undefined) {
			if(get_tab_div().nodeType!==1) {
				break x
			}
			t.t=document.querySelector('div#app>div>div>.table_center')
			t.dom_node=t.t.firstElementChild.cloneNode(true)
			t.t.append(t.dom_node)
			needs_dom=true
		}
		x: if(t.t.parentElement===null) {
			if(get_tab_div().nodeType!==1) {
				break x
			}
			t.t=document.querySelector('div#app>div>div>.table_center')
			if(t.dom_node)
				t.dom_node.remove()
		}
		if(t.dom_node.parentElement===null) {
			t.dom_node=t.t.firstElementChild.cloneNode(true)
			t.t.append(t.dom_node)
			needs_dom=true
		}
		if(needs_dom) {
			t.mg=document.querySelector('[style] > button[onclick]')
		}
		if(needs_dom&&t.btn&&t.btn.onclick) {
			let o=t.btn
			let n=t.dom_node.firstElementChild
			t.btn=n
			t.dm=t.dom_node
			t.dp=t.t
			n.onclick=o.onclick
		} else if(needs_dom) {
			let n=t.dom_node.firstElementChild
			t.dm=t.dom_node
			t.dp=t.t
			t.btn=n
			n.onclick=function() {
				let dm=[...t.dp.children]
				var tbl_arr=dm.slice(0,2)
				for(let item of tbl_arr) {
					if(!item.firstElementChild.classList.contains('closed')) {
						item.firstElementChild.click()
					}
				}
				t.mg.click()
			}
		}
	}
	'done:'+location.href
}
