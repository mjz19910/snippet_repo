/* spell:words
-- version_list template --
v1 (cur): snippet_repo/javascript/group1/sub_a/item-_7.js
*/
function main() {
	const LOG_ERROR=1;
	const LOG_INFO=2;
	const LOG_DEBUG=3;
	const LOG_VERBOSE=4;
	const LOG_TRACE=5;
	void [LOG_ERROR,LOG_DEBUG,LOG_TRACE];
	const log_level=LOG_INFO;
	class CSSStyleValue {
		/**
		 * @param {string} value
		 */
		static create(value) {
			const val=new CSSStyleValue;
			val.#set_value(value);
			return val;
		}
		#has_value=false;
		/**@type {string} */
		#inner_value="";
		/**@arg {string} style_value */
		#set_value(style_value) {
			this.#has_value=true;
			this.#inner_value=style_value;
		}
		/**@type {ObjectConstructor['prototype']['toString']} */
		toString() {
			if(this instanceof CSSKeywordValue) {
				return this.value;
			}
			if(this.#has_value) {
				return this.#inner_value;
			}
			throw 1;
		}
	}
	class CSSKeywordValue extends CSSStyleValue {
		#inner_value="";
		get value() {
			return this.#inner_value;
		}
		set value(value) {
			this.#inner_value=value;
		}
	}
	class StylePropertyMapReadOnly {
		/**
		 * @param {any} _property
		 */
		get(_property) {}
		/**
		 * @param {any} _property
		 */
		getAll(_property) {}
		/**
		 * @param {any} _property
		 */
		has(_property) {}
		entries() {}
		/**@type {Array<CSSKeywordValue|CSSStyleValue>['forEach']} */
		forEach(_callback) {}
	}
	class StylePropertyMap extends StylePropertyMapReadOnly {
		/**
		 * @param {any} _property
		 * @param {any[]} _values
		 */
		append(_property,..._values) {}
		clear() {}
		/**
		 * @param {any} _property
		 */
		delete(_property) {}
		/**
		 * @param {any} _property
		 * @param {any[]} _values
		 */
		set(_property,..._values) {}
	}
	let is_typechecking=false;
	let all_set_inner_type=function() {
		if(is_typechecking)
			return window;
		if(is_typechecking)
			return new HTMLIFrameElement;
		if(is_typechecking)
			return new CSSStyleDeclaration;
		if(is_typechecking)
			return new HTMLElement;
		if(is_typechecking)
			return new Node;
		if(is_typechecking)
			return 1;
		if(is_typechecking)
			return "";
		// return {}
	}();
	/**
	 * @param {((Window & typeof globalThis) | HTMLIFrameElement | CSSStyleDeclaration)[]} v
	 */
	function log_if_noisy(...v) {
		if(log_level>LOG_VERBOSE) {
			console.log(...v);
		}
	}
	function react_find_all() {
		var cmap=new Map
			,fid=0
			,emp=new Set();
		var js;
		/**
		 * @param {NodeList|Node|Function} a
		 * @param {typeof NodeList|typeof Node|FunctionConstructor} b
		 */
		function get_const_eq(a,b) {
			return Object.getPrototypeOf(a).constructor==b;
		}
		class JSONRepArg0 {
			target={};
			ns=0;
			all_map=new Map;
			/**@type {Set<typeof all_set_inner_type>} */
			all_set=new Set;
			func_map=new Map;
			dom_map=new Map;
			/** @type {number|undefined} */
			l;
		}
		/**
		 * @param {any} e
		 * @param {any} o
		 */
		function json_rep(st=new JSONRepArg0,e,o) {
			void e;
			let all_set=st.all_set;
			let all_map=st.all_map;
			if(!st.hasOwnProperty("func_map")) {
				st.func_map=new Map();
			}
			if(!st.hasOwnProperty("dom_map")) {
				st.dom_map=new Map();
			}
			let is_typechecking=false;
			var ret_src=function() {
				if(is_typechecking)
					return window;
				if(is_typechecking)
					return new HTMLIFrameElement;
				if(is_typechecking)
					return new CSSStyleDeclaration;
				if(is_typechecking)
					return new HTMLElement;
				if(is_typechecking)
					return new Node;
				if(is_typechecking)
					return 1;
				if(is_typechecking)
					return "";
			}();
			ret_src=o;
			/** @type {Map<string,{}>} */
			var retcp=new Map;
			if(st.ns>0) {
				st.ns--;
				if(typeof ret_src!="object") {
					return ret_src;
				}
				all_set.add(ret_src);
				if(ret_src instanceof Window) {
					log_if_noisy(ret_src);
					return "global:window";
				}
				if(ret_src instanceof HTMLIFrameElement) {
					log_if_noisy(ret_src);
					return ret_src.id? "iframe_"+ret_src.id:"iframe_"+(fid++);
				}
				if(ret_src instanceof CSSStyleDeclaration) {
					log_if_noisy(ret_src);
					return "instanceof:CSSStyleDeclaration";
				}
				if(ret_src instanceof HTMLElement) {
					var fc=fid++;
					var dname=o.id? "dom_"+o.id:"dom_gen_id_"+(fc);
					st.dom_map.set(o,[dname,fc]);
					return dname;
				}
				if(ret_src instanceof Element&&(!ret_src==st.target)) {
					var fc=fid++;
					var dname=ret_src.id? "dom_"+ret_src.id:"dom_gen_id_"+(fc);
					st.dom_map.set(ret_src,[dname,fc]);
					return dname;
				} if(ret_src instanceof Node&&(!ret_src==st.target)) {
					var fc=fid++;
					var dname="dom_gen_id_"+(fc);
					st.dom_map.set(ret_src,[dname,fc]);
					return dname;
				}
				if(st.func_map.has(ret_src)) {
					return st.func_map.get(o);
				}
				if(o instanceof Function) {
					return "instanceof:function";
				}
				if(get_const_eq(o,NodeList)) {
					var ar=Array.from(o);
					all_map.set(o,ar);
					return ar;
				}
				if(all_map.has(o)) {
					return all_map.get(o);
				}
				for(let i in o) {
					if(typeof o[i]=="undefined") {
						continue;
					}
					if(o[i]===null) {
						continue;
					}
					if(Node.prototype.hasOwnProperty(i)&&typeof o[i]=="number") {
						continue;
					}
					if(Object.getPrototypeOf(o[i])==null&&o[i].parent==window) {
						retcp.set(i,"window_type_"+(fid++));
						continue;
					}
					if(o[i] instanceof CSSStyleSheet) {
						retcp.set(i,"style_sheet");
						continue;
					}
					if(st.func_map.has(o[i])) {
						retcp.set(i,st.func_map.get(o[i])[1]);
						continue;
					}
					if(o[i] instanceof Function) {
						var fname="func_"+o[i].name+"_"+(fid++);
						var ffunc={
							...o[i],
							func_name: fname
						};
						st.func_map.set(o[i],[fname,ffunc]);
						retcp.set(i,ffunc);
						let returns_fname=false;
						if(!returns_fname) {
							continue;
						}
						retcp.set(i,fname);
					}
					if(get_const_eq(o[i],Node)) {
						var fc=fid++;
						var dname=o.id? "dom_"+o.id:"dom_gen_id_"+(fc);
						st.dom_map.set(o[i],[dname,fc]);
						retcp.set(i,dname);
						continue;
					}
					if(o.tagName&&o.tagName=="SCRIPT"&&i=="childNodes") {
						continue;
					}
					if(o[i] instanceof Object.getPrototypeOf(Int8Array.prototype).constructor) {
						continue;
					}
					if(o[i]=="") {
						continue;
					}
					if(all_map.has(o[i])) {
						continue;
					}
					retcp.set(i,o[i]);
				}
				if(retcp.has("innerText")) {
					retcp.delete("textContent");
					retcp.delete("innerText");
					retcp.delete("outerText");
				}
				if(retcp.has("parentElement")||retcp.has("nextElementSibling")||retcp.has("previousElementSibling")) {
					retcp.delete("parentElement");
					retcp.delete("previousElementSibling");
					retcp.delete("nextElementSibling");
					retcp.delete("innerHTML");
					retcp.delete("outerHTML");
				}
				if(retcp.has("documentElement")) {
					retcp.delete("documentElement");
					retcp.delete("body");
					retcp.delete("head");
				}
				if(retcp.has("nextElementSibling")) {
					retcp.delete("nextElementSibling");
					retcp.delete("nextSibling");
				}
				if(retcp.has("nextSibling")) {
					retcp.delete("nextSibling");
				}
				if(retcp.has("parentNode")) {
					retcp.delete("parentNode");
					retcp.delete("previousSibling");
					retcp.delete("nextSibling");
					retcp.delete("firstChild");
					retcp.delete("lastChild");
				}
				if(retcp.has("ownerElement")) {
					if(all_map.has(retcp.get("ownerElement"))) {
						retcp.delete("ownerElement");
					}
				}
				if(retcp.has("offsetParent")) {
					all_map.set(retcp.get("offsetParent"),"f");
					retcp.delete("offsetParent");
				}
				if(is_typechecking)
					retcp.set("attributeStyleMap",new StylePropertyMap);
				if(retcp.has("attributeStyleMap")) {
					/**
					 * @type {any[]}
					 */
					var ta=[];
					for(let i=0,sa=o.attributeStyleMap;i<sa.length;i++) {
						ta[i]=sa[i];
					}
					retcp.set("attributeStyleMap_c",ta);
					retcp.delete("attributeStyleMap");
				}
				if(is_typechecking)
					retcp.set("attributes",HTMLElement.prototype.attributes);
				if(retcp.has("attributes")) {
					var ta=[];
					for(let i=0,sa=o.attributes;i<sa.length;i++) {
						ta[i]=sa[i];
					}
					retcp.set("attributes_c",ta);
					retcp.delete("attributes");
				}
				if(is_typechecking)
					retcp.set("classList",HTMLElement.prototype.classList);
				if(retcp.has("classList")) {
					let sa=retcp.get("classList");
					if(!sa) throw 1;
					if(!(sa instanceof DOMTokenList)) throw 1;
					let class_list_iter_items=[];
					for(let i=0;i<sa.length;i++) {
						class_list_iter_items.push(sa[i]);
					}
					retcp.set("classList_c",class_list_iter_items);
					retcp.delete("classList");
				}
				if(is_typechecking)
					retcp.set("ownerDocument",HTMLElement.prototype.ownerDocument);
				if(retcp.has("ownerDocument")) {
					if(all_map.has(o.ownerDocument)) {} else {
						console.log("cross_document",o.ownerDocument);
						all_map.set(o.ownerDocument,"cross_document");
					}
					retcp.delete("ownerDocument");
				}
				all_map.set(o,retcp);
				return retcp;
			} else {
				if(typeof o=="object") {
					all_set.add(o);
				}
				return "f";
			}
		}
		/**
		 * @param {number} nsl
		 * @param {Map<any, any>} cmap
		 * @param {any} trg
		 */
		function do_json_stringify_iter(nsl,cmap,trg) {
			/**
			 * @type {string|null}
			 */
			var js=null;
			/**
			 * @type {JSONRepArg0|undefined}
			 */
			var cin;
			/** @arg {JSONRepArg0} v */
			function set_cin(v) {
				cin=v;
			}
			/**
			 * @param {string} v
			 */
			function set_js(v) {
				js=v;
			}
			emp.clear();
			try {
				if(get_const_eq(trg,Function)) {
					let cin=new JSONRepArg0;
					cin.target={
						...trg
					};
					cin.ns=nsl;
					cin.all_map=cmap;
					cin.all_set=emp;
					let js=JSON.stringify(cin.target,function(...args) {
						json_rep(cin,...args);
					});
					set_js(js);
					set_cin(cin);
				} else {
					let cin=new JSONRepArg0;
					cin.target=trg;
					cin.ns=nsl;
					cin.all_map=cmap;
					cin.all_set=emp;
					js=JSON.stringify(trg,json_rep.bind(null,cin));
					set_js(js);
					set_cin(cin);
				}
			} catch(e) {
				console.info("---ERROR---");
				console.log("ERROR",trg,Array.from(emp),e);
				js="Error";
			}
			if(!cin) throw new Error("Error 1");
			if(!js) throw new Error("Error 2");
			cin.l=js.length;
			Object.defineProperty(cin,"js_g",{
				get: function() {
					return js;
				},
				set: function(e) {
					js=e;
				}
			});
			Object.defineProperty(cin,"js_o",{
				get: function() {
					return JSON.parse(js);
				},
				set: function(e) {
					js=JSON.stringify(e);
				}
			});
			return cin;
		}
		if(window.cr_getC2Runtime) {
			do {
				js=do_json_stringify_iter(90,cmap,cr_getC2Runtime());
			} while(false);
			var retv=exdo_user(cmap);
			var car=[]
				,repo=[];
			for(var c=cmap.entries(),j=c.next(),i=0;!j.done;j=c.next()) {
				i++;
				car.push(j.value[0]);
				repo.push(j.value[1]);
			}
			var protos=Array.from(new Set(car.map(e => Object.getPrototypeOf(e))));
			/**
			 * @param {any} e
			 */
			function get_proto_id(e) {
				var pid=protos.indexOf(Object.getPrototypeOf(e));
				if(pid>0) {
					return pid;
				} else {
					return 0;
				}
			}
			/**
			 * @param {any} a
			 * @param {any} b
			 */
			function do_sort_by_proto(a,b) {
				return get_proto_id(a)-get_proto_id(b);
			}
			car.sort(do_sort_by_proto);
			return js=="Error"? [protos,"X",car,repo]:[protos,JSON.parse(js.js_g),car,JSON.parse(retv.js_g),js,repo];
		}
		/**
		 * @param {any[] | Map<any, any>} cmap
		 * @param {undefined} [o_start]
		 */
		function exdo_user(cmap,o_start) {
			var ps=performance.now()
				,o_new_since=0
				,found_objs=0;
			var cars=[]
				,js_inner={
					js_g: ""
				}
				,tri=[]
				,scs=[]
				,sc=[];
			for(var c=cmap.keys(),j=c.next(),i=0;!j.done;i++,
				j=c.next()) {
				cars.push(j.value);
				scs.push(j.value);
				found_objs+=1;
			}
			found_objs=0;
			for(var car=[],sb=2,wv=o_start,i=0;i<(10000*120)&&sb;i++) {
				var js_inner_p=do_json_stringify_iter(9000,cmap,wv);
				tri.push(wv);
				if(js_inner_p.js_g.length>js_inner.js_g.length) {
					js_inner=js_inner_p;
				}
				for(var c=cmap.keys(),j=c.next(),z=0;!j.done;j=c.next()) {
					z++;
					if(cars.indexOf(j.value)<0) {
						car.push(j.value);
						scs.push(j.value);
						o_new_since++;
						cars.push(j.value);
						sc.push(j.value);
					}
				}
				if(sb==1) {
					return js_inner;
				}
				while(true) {
					if(sc.length==0) {
						wv=scs.pop();
					} else {
						wv=sc.pop();
						if(sc.length==1) {
							sc.push(scs.pop());
						}
					}
					if(wv&&tri.indexOf(wv)==-1) {
						break;
					}
					if(scs.length==0) {
						sb--;
						console.log("out of objects, processed",found_objs+o_new_since);
						break;
					}
				}
				if(o_new_since>0) {
					console.log(wv,"new_found_objs",o_new_since);
					found_objs+=o_new_since;
					o_new_since=0;
				}
				if(performance.now()-ps>100) {
					ps=performance.now();
					console.log("long_running",wv,"total_objs_processed",found_objs);
					console.log("ilen",js_inner_p.js_g.length);
				}
				if(performance.now()-ps>100*100) {
					console.log("timeout, processed "+found_objs+" objects since iteration start");
					return js_inner;
				}
			}
			return js_inner;
		}
		return do_json_stringify_iter(40000,cmap,window.$j);
	}
	react_find_all();
}
main();
