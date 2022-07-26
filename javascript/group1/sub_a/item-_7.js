/* spell:words
-- version_list template --
v1 (cur): snippet_repo_v2/javascript/group1/sub_a/item-_7.js
*/
function main() {
	const LOG_ERROR=1
	const LOG_INFO=2
	const LOG_DEBUG=3
	const LOG_VERBOSE=4
	const LOG_TRACE=5
	void [LOG_ERROR,LOG_DEBUG,LOG_TRACE]
	const log_level=LOG_INFO
	class CSSStyleValue {
		static create(value) {
			const val=new CSSStyleValue
			val.#set_value(value)
			return val
		}
		#has_value=false;
		/**@type {string} */
		#inner_value
		/**@arg {string} style_value */
		#set_value(style_value) {
			this.#has_value=true
			this.#inner_value=style_value
		}
		/**@type {ObjectConstructor['prototype']['toString']} */
		toString() {
			if(this instanceof CSSKeywordValue) {
				return this.value
			}
			if(this.#has_value) {
				return this.#inner_value
			}
		}
	}
	class CSSKeywordValue extends CSSStyleValue {
		#inner_value="";
		get value() {
			return this.#inner_value
		}
		set value(value) {
			this.#inner_value=value
		}
	}
	class StylePropertyMapReadOnly {
		get(_property) {}
		getAll(_property) {}
		has(_property) {}
		entries() {}
		/**@type {Array<CSSKeywordValue|CSSStyleValue>['forEach']} */
		forEach(_callback) {}
	}
	class StylePropertyMap extends StylePropertyMapReadOnly {
		append(_property,..._values) {}
		clear() {}
		delete(_property) {}
		set(_property,..._values) {}
	}
	let all_set_inner_type=function() {
		if(is_typechecking)
			return window
		if(is_typechecking)
			return new HTMLIFrameElement
		if(is_typechecking)
			return new CSSStyleDeclaration
		if(is_typechecking)
			return new HTMLElement
		if(is_typechecking)
			return new Node
		if(is_typechecking)
			return 1
		if(is_typechecking)
			return ""
		// return {};
	}()
	function log_if_noisy(...v) {
		if(log_level>LOG_VERBOSE) {
			console.log(...v)
		}
	}
	function react_find_all() {
		var cmap=new Map
			,fid=0
			,emp=new Set()
		var js
		function get_const_eq(a,b) {
			return Object.getPrototypeOf(a).constructor==b
		}
		function json_rep(st={
			target: {},
			ns: 0,
			all_map: new Map,
			/**@type {Set<typeof all_set_inner_type>} */
			all_set: new Set,
			func_map: new Map,
			dom_map: new Map
		},e,o) {
			void e
			let all_set=st.all_set
			let all_map=st.all_map
			if(!st.hasOwnProperty("func_map")) {
				st.func_map=new Map()
			}
			if(!st.hasOwnProperty("dom_map")) {
				st.dom_map=new Map()
			}
			let is_typechecking=false
			var ret_src=function() {
				if(is_typechecking)
					return window
				if(is_typechecking)
					return new HTMLIFrameElement
				if(is_typechecking)
					return new CSSStyleDeclaration
				if(is_typechecking)
					return new HTMLElement
				if(is_typechecking)
					return new Node
				if(is_typechecking)
					return 1
				if(is_typechecking)
					return ""
			}()
			ret_src=o
			var retcp={}
			if(st.ns>0) {
				st.ns--
				if(typeof ret_src!="object") {
					return ret_src
				}
				all_set.add(ret_src)
				if(ret_src instanceof Window) {
					log_if_noisy(ret_src)
					return "global:window"
				}
				if(ret_src instanceof HTMLIFrameElement) {
					log_if_noisy(ret_src)
					return ret_src.id? "iframe_"+ret_src.id:"iframe_"+(fid++)
				}
				if(ret_src instanceof CSSStyleDeclaration) {
					log_if_noisy(ret_src)
					return "instanceof:CSSStyleDeclaration"
				}
				if(ret_src instanceof HTMLElement) {
					var fc=fid++
					var dname=o.id? "dom_"+o.id:"dom_gen_id_"+(fc)
					st.dom_map.set(o,[dname,fc])
					return dname
				}
				if(ret_src instanceof Node&&(!ret_src==st.target)) {
					var fc=fid++
					var dname=ret_src.id? "dom_"+ret_src.id:"dom_gen_id_"+(fc)
					st.dom_map.set(ret_src,[dname,fc])
					return dname
				}
				if(st.func_map.has(ret_src)) {
					return st.func_map.get(o)
				}
				if(o instanceof Function) {
					return "instanceof:function"
				}
				if(get_const_eq(o,NodeList)) {
					var ar=Array.from(o)
					all_map.set(o,ar)
					return ar
				}
				if(all_map.has(o)) {
					return all_map.get(o)
				}
				for(var i in o) {
					if(typeof o[i]=="undefined") {
						continue
					}
					if(o[i]===null) {
						continue
					}
					if(Node.prototype.hasOwnProperty(i)&&typeof o[i]=="number") {
						continue
					}
					if(Object.getPrototypeOf(o[i])==null&&o[i].parent==window) {
						retcp[i]="window_type_"+(fid++)
						continue
					}
					if(o[i] instanceof CSSStyleSheet) {
						retcp[i]="style_sheet"
						continue
					}
					if(st.func_map.has(o[i])) {
						retcp[i]=st.func_map.get(o[i])[1]
						continue
					}
					if(o[i] instanceof Function) {
						var fname="func_"+o[i].name+"_"+(fid++)
						var ffunc={
							...o[i],
							func_name: fname
						}
						st.func_map.set(o[i],[fname,ffunc])
						retcp[i]=ffunc
						let returns_fname=false
						if(!returns_fname) {
							continue
						}
						retcp[i]=fname
					}
					if(get_const_eq(o[i],Node)) {
						var fc=fid++
						var dname=o.id? "dom_"+o.id:"dom_gen_id_"+(fc)
						st.dom_map.set(o[i],[dname,fc])
						retcp[i]=dname
						continue
					}
					if(o.tagName&&o.tagName=="SCRIPT"&&i=="childNodes") {
						continue
					}
					if(o[i] instanceof Object.getPrototypeOf(Int8Array.prototype).constructor) {
						continue
					}
					if(o[i]=="") {
						continue
					}
					if(all_map.has(o[i])) {
						continue
					}
					retcp[i]=o[i]
				}
				if(retcp.innerText) {
					delete retcp.textContent
					delete retcp.innerText
					delete retcp.outerText
				}
				if(retcp.parentElement||retcp.nextElementSibling||retcp.previousElementSibling) {
					delete retcp.parentElement
					delete retcp.previousElementSibling
					delete retcp.nextElementSibling
					delete retcp.innerHTML
					delete retcp.outerHTML
				}
				if(retcp.documentElement) {
					delete retcp.documentElement
					delete retcp.body
					delete retcp.head
				}
				if(retcp.nextElementSibling) {
					delete retcp.nextElementSibling
					delete retcp.nextSibling
				}
				if(retcp.nextSibling) {
					delete retcp.nextSibling
				}
				if(retcp.parentNode) {
					delete retcp.parentNode
					delete retcp.previousSibling
					delete retcp.nextSibling
					delete retcp.firstChild
					delete retcp.lastChild
				}
				if(retcp.ownerElement) {
					if(all_map.has(retcp.ownerElement)) {
						delete retcp.ownerElement
					}
				}
				if(retcp.offsetParent) {
					all_map.set(retcp.offsetParent,"f")
					delete retcp.offsetParent
				}
				if(is_typechecking)
					retcp.attributeStyleMap=new StylePropertyMap
				if(retcp.attributeStyleMap) {
					var ta=[]
					for(var i=0,sa=o.attributeStyleMap;i<sa.length;i++) {
						ta[i]=sa[i]
					}
					retcp.attributeStyleMap_c=ta
					delete retcp.attributeStyleMap
				}
				if(is_typechecking)
					retcp.attributes=HTMLElement.prototype.attributes
				if(retcp.attributes) {
					var ta=[]
					for(var i=0,sa=o.attributes;i<sa.length;i++) {
						ta[i]=sa[i]
					}
					retcp.attributes_c=ta
					delete retcp.attributes
				}
				if(is_typechecking)
					retcp.classList=HTMLElement.prototype.classList
				if(retcp.classList) {
					let sa=retcp.classList
					let iter_res=[...sa.keys()]
					let class_list_iter_items=iter_res.map(e => sa.item(e))
					retcp.classList_c=class_list_iter_items
					delete retcp.classList
				}
				if(is_typechecking)
					retcp.ownerDocument=HTMLElement.prototype.ownerDocument
				if(retcp.ownerDocument) {
					if(all_map.has(o.ownerDocument)) {} else {
						console.log("cross_document",o.ownerDocument)
						all_map.set(o.ownerDocument,"cross_document")
					}
					delete retcp.ownerDocument
				}
				all_map.set(o,retcp)
				return retcp
			} else {
				if(typeof o=="object") {
					all_set.add(o)
				}
				return "f"
			}
		}
		function do_json_stringify_iter(nsl,cmap,trg) {
			var js,cin
			emp.clear()
			try {
				if(get_const_eq(trg,Function)) {
					cin={
						target: {
							...trg
						},
						ns: nsl,
						all_map: cmap,
						all_set: emp
					}
					js=JSON.stringify(cin.target,json_rep.bind(null,cin))
				} else {
					cin={
						target: trg,
						ns: nsl,
						all_map: cmap,
						all_set: emp
					}
					js=JSON.stringify(trg,json_rep.bind(null,cin))
				}
			} catch(e) {
				console.info("---ERROR---")
				console.log("ERROR",trg,Array.from(emp),e)
				js="Error"
			}
			cin.l=js.length
			Object.defineProperty(cin,"js_g",{
				get: function() {
					return js
				},
				set: function(e) {
					js=e
				}
			})
			Object.defineProperty(cin,"js_o",{
				get: function() {
					return JSON.parse(js)
				},
				set: function(e) {
					js=JSON.stringify(e)
				}
			})
			return cin
		}
		if(window.cr_getC2Runtime) {
			do {
				js=do_json_stringify_iter(90,cmap,cr_getC2Runtime())
			} while(false)
			var retv=exdo_user(cmap)
			var car=[]
				,repo=[]
			for(var c=cmap.entries(),j=c.next(),i=0;!j.done;j=c.next()) {
				i++
				car.push(j.value[0])
				repo.push(j.value[1])
			}
			var protos=Array.from(new Set(car.map(e => Object.getPrototypeOf(e))))
			function get_proto_id(e) {
				var pid=protos.indexOf(Object.getPrototypeOf(e))
				if(pid>0) {
					return pid
				} else {
					return 0
				}
			}
			function do_sort_by_proto(a,b) {
				return get_proto_id(a)-get_proto_id(b)
			}
			car.sort(do_sort_by_proto)
			return js=="Error"? [protos,"X",car,repo]:[protos,JSON.parse(js.js_g),car,JSON.parse(retv.js_g),js,repo]
		}
		function exdo_user(cmap,o_start) {
			var ps=performance.now()
				,o_new_since=0
				,found_objs=0
			var cars=[]
				,js_inner={
					js_g: ""
				}
				,tri=[]
				,scs=[]
				,sc=[]
			for(var c=cmap.keys(),j=c.next(),i=0;!j.done;i++,
				j=c.next()) {
				cars.push(j.value)
				scs.push(j.value)
				found_objs+=1
			}
			found_objs=0
			for(var car=[],sb=2,wv=o_start,i=0;i<(10000*120)&&sb;i++) {
				var js_inner_p=do_json_stringify_iter(9000,cmap,wv)
				tri.push(wv)
				if(js_inner_p.js_g.length>js_inner.js_g.length) {
					js_inner=js_inner_p
				}
				for(var c=cmap.keys(),j=c.next(),z=0;!j.done;j=c.next()) {
					z++
					if(cars.indexOf(j.value)<0) {
						car.push(j.value)
						scs.push(j.value)
						o_new_since++
						cars.push(j.value)
						sc.push(j.value)
					}
				}
				if(sb==1) {
					return js_inner
				}
				while(true) {
					if(sc.length==0) {
						wv=scs.pop()
					} else {
						wv=sc.pop()
						if(sc.length==1) {
							sc.push(scs.pop())
						}
					}
					if(wv&&tri.indexOf(wv)==-1) {
						break
					}
					if(scs.length==0) {
						sb--
						console.log("out of objects, processed",found_objs+o_new_since)
						break
					}
				}
				if(o_new_since>0) {
					console.log(wv,"new_found_objs",o_new_since)
					found_objs+=o_new_since
					o_new_since=0
				}
				if(performance.now()-ps>100) {
					ps=performance.now()
					console.log("long_running",wv,"total_objs_processed",found_objs)
					console.log("ilen",js_inner_p.js_g.length)
				}
				if(performance.now()-ps>100*100) {
					console.log("timeout, processed "+found_objs+" objects since iteration start")
					return js_inner
				}
			}
			return js_inner
		}
		return do_json_stringify_iter(40000,cmap,window.$j)
	}
	react_find_all()
}
main()
