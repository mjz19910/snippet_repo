// ==UserScript==
// @name         youtube plugin
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences

console=window.console
function main() {
	const debug=false
	/** @type {<U>(v:U)=>U&Box<any>} */
	function any(value) {
		return value
	}
	window.g_api??={
		Seen: undefined,
		property_handler_state: undefined,
		yt_state: undefined,
		blob_create_args_arr: undefined,
		yt_handlers: undefined,
		dom_observer: undefined,
		port_state: undefined,
		plugin_overlay_element: undefined,
		yt_watch_page_loaded_handler: undefined,
		gain_controller: undefined,
	}
	/**@type {<U>(v:U|undefined)=>U} */
	function ts_remove_undefined(v) {
		if(v===undefined) throw new Error("Bad")
		return v
	}
	let g_api=ts_remove_undefined(window.g_api)
	class YtdAppElement extends HTMLElement {
		/**@type {HTMLStyleElement|undefined}*/
		ui_plugin_style_element
		/**@type {VolumeRange|undefined}*/
		volume_range
		/**@arg {HTMLElement} element @return {YtdAppElement} */
		static cast(element) {
			return any<HTMLElement,YtdAppElement>(element)
		}
		__shady_children={
			masthead: {
				$: {
					container: {
						children: {
							center: new Element
						}
					}
				}
			}
		};
	}
	class YtCurrentPage extends HTMLElement {
		/**@return {YTPlayerData} */
		getPlayer() {
			return new YTPlayerData
		}
	}
	class YtdPageManagerElement extends HTMLElement {
		/**@return {YtCurrentPage} */
		getCurrentPage() {
			return new YtCurrentPage
		}
	}
	class Seen {
		static debug=false;
		/**
		 * @type {any[]}
		 */
		static all_seen_objs=[];
		static all_seen_map=new Map;
		static seen_gen_counter=1;
		static seen_uid_counter=0;
		/**
		 * @param {null} value
		 */
		static as_any(value) {
			let weak_info,ret
			const [instance_index,instance_gen,ref_obj]=this.see_value(value)
			const index_key=instance_index+"@"+instance_gen
			if(this.debug) console.log('any',index_key,value)
			value=null
			if(this.all_seen_map.has(index_key)) {
				weak_info=this.all_seen_map.get(index_key)
				ret=weak_info.deref()
				if(ret!==null) {
					return ret
				}
			}
			let obj_id=this.seen_uid_counter
			this.seen_uid_counter++
			ret={
				type: 'any',
				any_key: index_key,
				obj_id,
			}
			weak_info=new WeakRef(ret)
			ref_obj.info=weak_info
			this.all_seen_map.set(index_key,weak_info)
			return ret
		}
		/**
		 * @param {Function|null} value
		 */
		static as_callable(value) {
			const [instance_index,instance_gen,ref_obj]=this.see_value(value)
			value=null
			const index_key=instance_index+"@"+instance_gen
			if(this.all_seen_map.has(index_key)) {
				let seen_info=this.all_seen_map.get(index_key)
				if(this.debug) console.log('get callable',index_key,seen_info.deref())
				if(seen_info.deref()!==null) return seen_info.deref()
			}
			let obj_id=this.seen_uid_counter
			this.seen_uid_counter++
			let ret={
				type: 'callable',
				fn_index_key: index_key,
				obj_id
			}
			let weak_info=new WeakRef(ret)
			ref_obj.info=weak_info
			this.all_seen_map.set(index_key,weak_info)
			return ret
		}
		/**
		 * @param {null} value
		 */
		static as_constructor(value) {
			const [instance_index,instance_gen,ref_obj]=this.see_value(value)
			value=null
			const index_key=instance_index+"@"+instance_gen
			if(this.all_seen_map.has(index_key)) {
				let seen_info=this.all_seen_map.get(index_key)
				if(this.debug) console.log('get constructor',index_key,seen_info.deref())
				if(seen_info.deref()!==null) return seen_info.deref()
			}
			let obj_id=this.seen_uid_counter
			this.seen_uid_counter++
			let ret={
				type: 'constructor',
				constructor_key: index_key,
				obj_id
			}
			let weak_info=new WeakRef(ret)
			ref_obj.info=weak_info
			this.all_seen_map.set(index_key,weak_info)
			return ret
		}
		/**
		 * @param {{} | null} instance
		 * @param {{ constructor_tag: any; prototype_tag: any; }} prototype_info
		 */
		static as_instance(instance,prototype_info) {
			const [instance_index,instance_gen,ref_obj]=this.see_value(instance)
			instance=null
			const index_key=instance_index+"@"+instance_gen
			if(this.all_seen_map.has(index_key)) {
				let seen_info=this.all_seen_map.get(index_key)
				if(this.debug) console.log('get instance',index_key,seen_info.deref())
				if(seen_info.deref()!==null) return seen_info.deref()
			}
			let obj_id=this.seen_uid_counter
			this.seen_uid_counter++
			let ret={
				type: 'instance',
				index_key,
				prototype_info,
				obj_id
			}
			let weak_info=new WeakRef(ret)
			ref_obj.info=weak_info
			this.all_seen_map.set(index_key,weak_info)
			return ret
		}
		/**
		 * @param {any} value
		 */
		static see_value(value) {
			let index=this.seen_index_of(value)
			iz: if(index>-1) {
				let ref_obj_seen=this.all_seen_objs[index]
				let ref_obj=ref_obj_seen.ref.deref()
				if(ref_obj===null) break iz
				return [index,this.seen_gen_counter,ref_obj]
			}
			let ref_obj={
				ref: new WeakRef(value)
			}
			index=this.all_seen_objs.push(ref_obj)-1
			return [index,this.seen_gen_counter,ref_obj]
		}
		/**
		 * @param {any} value
		 */
		static seen_index_of(value) {
			let arr=this.all_seen_objs
			let index=-1
			let remove_cnt=0
			for(let i=0;i<arr.length;i++) {
				let obj=arr[i]
				let ref=obj.ref
				let item=ref.deref()
				if(item===null) {
					remove_cnt++
					continue
				}
				if(item===value) {
					index=i
					break
				}
			}
			if(remove_cnt>arr.length/4) {
				let new_arr=[]
				this.seen_gen_counter++
				for(let i=0;i<arr.length;i++) {
					let obj=arr[i]
					let ref=obj.ref
					let item=ref.deref()
					if(item===null) continue
					new_arr.push(obj)
				}
				this.all_seen_objs=new_arr
				index=this.seen_index_of(value)
			}
			return index
		}
	}
	g_api.Seen=Seen
	/**
	 * @type {<T extends any[]>(value:T)=>typeof value}
	 */
	function clone_array(arr) {
		/**@type {typeof arr}*/
		let copy=any([])
		for(let i=0;i<arr.length;i++) {
			copy[i]=deep_clone(arr[i])
		}
		return copy
	}
	/**
	 * @type {<T extends Map<any, any>>(map:T)=>typeof map}
	 */
	function clone_map(map) {
		let arr=Array.from(map)
		let cloned_arr=arr.map(/**@return {[any, any]}*/(map_entry) => [map_entry[0],deep_clone(map_entry[1])])
		return any(new Map(cloned_arr))
	}
	/**@arg {{}} obj*/
	function clone_object(obj) {
		let obj_entries=Object.entries(obj)
		let cloned_entries=obj_entries.map((object_entry) => [object_entry[0],deep_clone(object_entry[1])])
		let clone=Object.fromEntries(cloned_entries)
		return clone
	}
	/**
	 * @type {<T>(value:T)=>typeof value}
	 */
	function deep_clone(value) {
		if(typeof value==='object') {
			if(value===null) {
				// null is a primitive
				return value
			}
			if(value instanceof Array) {
				return clone_array(value)
			}
			if(value instanceof Map) {
				/**@type {typeof value}*/
				let copy=clone_map(value)
				return copy
			}
			if(Object.getPrototypeOf(value)===null) {
				let obj=clone_object(value)
				Object.setPrototypeOf(obj,null)
				return obj
			}
			if(Object.getPrototypeOf(value).constructor===Object) {
				return clone_object(value)
			}
			let create=Object.getPrototypeOf(value).constructor
			let proto=Object.getPrototypeOf(value)
			let str=Object.getPrototypeOf(value).constructor.name
			let seen_obj=Seen.as_instance(value,{
				constructor_tag: Seen.as_constructor(create),
				prototype_tag: Seen.as_any(proto)
			})
			if(create===HTMLVideoElement) {
				// don't recurse into exact dom elements
				return seen_obj
			}
			// was the real one shimmed already
			if(any(realHTMLElement).es5Shimmed) {
				// the constructor is still non-shimmed
				if(create===realHTMLElement.prototype.constructor) {
					return seen_obj
				}
			}
			if(create===realHTMLElement) {
				return seen_obj
			}
			// you probably want to fix this...
			if(str in window) {
				debugger
			}
			// if(!had_func)console.log('proto', str, create.toString().slice(0, 32), create.toString().length);
			return seen_obj
		}
		if(typeof value==='boolean') {
			// booleans are primitive
			return value
		}
		if(typeof value==='string') {
			// strings are constant
			return value
		}
		if(typeof value==='number') {
			// numbers are constant
			return value
		}
		if(typeof value==='function') {
			if(value.name in window) {
				debugger
			}
			return Seen.as_callable(value)
		}
		if(typeof value==='undefined') {
			// undefined is the signal for a bug.
			debugger
			return value
		}
		console.log('unk',typeof value,value)
		return value
	}
	function fetch_filter_text_then_data_url(/** @type {string | URL} */ url, /** @type {{}} */ response_obj) {
		let url_obj=new URL(url)
		if(debug) {
			console.log('url & response_obj',url,response_obj)
		}
		try {
			yt_handlers.on_handle_api(response_obj,url_obj)
		} catch(err) {
			console.log('filter error')
			console.log(err)
		}
	}
	/**
	 * @param {(arg0: any) => any} onfulfilled
	 * @param {any} request_info
	 * @arg {string} response_text
	 * @param {(arg0: unknown) => void} onrejected
	 */
	function handle_json_parse(request_info,onfulfilled,onrejected,response_text) {
		let original_json_parse=JSON.parse
		if(debug) console.log('JSON.parse = new Proxy()')
		JSON.parse=new Proxy(JSON.parse,{
			apply: function(...proxy_args) {
				if(debug) console.log('JSON.parse()')
				let obj=Reflect.apply(...proxy_args)
				if(debug) console.log('request_info.url')
				if(request_info.url) {
					fetch_filter_text_then_data_url(request_info.url,obj)
				} else {
					if(debug) console.log("handle_json_parse no url",request_info,obj)
				}
				return obj
			}
		})
		let ret
		try {
			ret=onfulfilled(response_text)
		} catch(err) {
			onrejected(err)
		} finally {
			JSON.parse=original_json_parse
		}
		return ret
	}
	/**
	 * @param {any} request_info
	 * @param {((value: any) => any | PromiseLike<any>) | null | undefined} onfulfilled
	 * @param {((reason: any) => any | PromiseLike<any>) | null | undefined} onrejected
	 */
	function bind_promise_handler(request_info,onfulfilled,onrejected) {
		if(debug) console.log('handle_json_parse.bind()')
		return handle_json_parse.bind(null,request_info,onfulfilled,onrejected)
	}
	/**
	 * @param {any} request_info
	 * @arg {Promise<any>} ov
	 * @return {Promise<any>}
	 */
	function handle_fetch_response_2(request_info,ov) {
		return {
			/**@type {<T, TResult2 = never>(onfulfilled?: ((value: T) => T | PromiseLike<T>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null)=>Promise<T | TResult2>} */
			then(onfulfilled,onrejected) {
				return ov.then(bind_promise_handler(request_info,onfulfilled,onrejected))
			},
			/**@type {<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<any>} */
			catch(onrejected) {
				return ov.catch(onrejected)
			},
			finally(onfinally) {
				return ov.finally(onfinally)
			},
			[Symbol.toStringTag]: "Promise",
		}
	}
	/**
	 * @param {RequestInfo} request_info
	 * @return {Response}
	 */
	function handle_fetch_response_1(request_info, /** @type {Response} */ response) {
		class FakeResponse {
			text() {
				if(debug) console.log('response.text()')
				return handle_fetch_response_2(request_info,response.text())
			}
		}
		let fake_response=new FakeResponse
		return new Proxy(any(fake_response),{
			/**
			 * @param {[FakeResponse, keyof Response, FakeResponse]} obj
			 */
			get(...[obj,key,_]) {
				if(!(key in obj)) {
					return Reflect.get(response,key)
				}
				return any(obj)[key]
			}
		})
	}
	/**
	 * @param {RequestInfo} request_info
	 * @param {Response} response
	 */
	function fetch_promise_handler(request_info,response) {
		return handle_fetch_response_1(request_info,response)
	}
	/**
	 * @type {typeof fetch | null}
	 */
	let original_fetch=null
	/**
	 * @param {RequestInfo} request_info
	 */
	function fetch_inject(request_info) {
		if(!original_fetch) throw new Error("No original fetch")
		let ret=original_fetch(request_info)
		return ret.then(fetch_promise_handler.bind(null,request_info))
	}
	/**
	 * @param {(arg0: [target: any, thisArg: any, argArray: any[]]) => void} callback
	 * @param {any} value
	 */
	function create_proxy(value,callback) {
		return new Proxy(value,{
			apply(...arr) {
				return callback(arr)
			}
		})
	}
	function do_proxy_call_getInitialData(/** @type {any} */ args) {
		return yt_handlers.on_initial_data(args)
	}
	class PropertyHandler {
		/**@type {Map<{}, {}>} */
		static proxy_map=new Map;
		/**@type {Map<string, {}>} */
		static override_map=new Map;
		/**
		 * @param {string} key
		 * @param {(args: any) => any} on_target_apply_callback
		 */
		constructor(key,on_target_apply_callback) {
			this.key=key
			this.on_target_apply_callback=on_target_apply_callback
		}
		get() {
			return PropertyHandler.override_map.get(this.key)
		}
		/**
		 * @param {any} value
		 */
		set(value) {
			if(value===void 0) {
				PropertyHandler.override_map.delete(this.key)
				return
			} else if(value===null) {
				PropertyHandler.override_map.set(this.key,value)
				return
			}
			if(PropertyHandler.proxy_map.has(value)) {
				let nv=PropertyHandler.proxy_map.get(value)
				if(!nv) return
				PropertyHandler.override_map.set(this.key,nv)
				return
			}
			let proxy_override=create_proxy(value,this.on_target_apply_callback)
			PropertyHandler.proxy_map.set(value,proxy_override)
			PropertyHandler.override_map.set(this.key,proxy_override)
		}
	}
	g_api.property_handler_state=PropertyHandler
	/**
	 * @arg {{}} object
	 * @param {PropertyKey} property
	 * @param {PropertyHandler} property_handler
	 */
	function override_prop(object,property,property_handler) {
		Object.defineProperty(object,property,{
			get() {
				return property_handler.get()
			},
			set(value) {
				return property_handler.set(value)
			}
		})
	}
	override_prop(window,"getInitialData",new PropertyHandler("getInitialData",do_proxy_call_getInitialData))
	class ObjectInfo {
		constructor() {
			let [gr_0,gr_1,gr_2]="{{:,:}}".split(":")
			this.chunk_beg=gr_0
			this.chunk_sep=gr_1
			this.chunk_end=gr_2
			this.key_sep=this.chunk_end+this.chunk_sep+this.chunk_beg
		}
		/**
		 * @param {{}} object
		 * @param {((value: string, index: number, array: string[]) => value is string) | undefined} [filter_function]
		 */
		keys_of(object,filter_function) {
			let object_keys=Object.keys(object)
			if(filter_function) object_keys=object_keys.filter(filter_function)
			return this.chunk_beg+object_keys.join(this.key_sep)+this.chunk_end
		}
	}
	ObjectInfo.instance=new ObjectInfo
	/**@type {Map<string, {}>}*/
	let yt_state=new Map
	g_api.yt_state=yt_state
	class YTIterateAllBase {
		/**
		 * @param {string} path
		 * @arg {{[str:string]:{}}} data
		 */
		default_iter(path,data) {
			if(data===void 0) {
				return
			}
			if(typeof data==='string') {
				this.update_state(path,data)
				return
			}
			if(data instanceof Array) {
				for(let [key,value] of data.entries()) {
					this.default_iter(`${path}[${key}]`,value)
				}
				return
			}
			for(let [key,value] of Object.entries(data)) {
				this.default_iter(`${path}.${key}`,value)
				if(any(this)[key]) {
					any(this)[key](`${path}.${key}`,value)
				}
			}
		}
		/**
		 * @param {string} key
		 * @param {string} value
		 * @private
		 */
		update_state(key,value) {
			if(yt_state.has(key)) {
				let stored_state=yt_state.get(key)
				if(stored_state instanceof Array) {
					stored_state.push(value)
					return
				}
				yt_state.set(key,[stored_state,value])
			} else {
				yt_state.set(key,[value])
			}
		}
	}
	class RichItemRenderer {
		/**@type {{displayAdRenderer?:{}}} */
		content={};
	}
	class RendererContentItem {
		richItemRenderer=new RichItemRenderer;
	}
	// { masthead: { [str: string]: any; videoMastheadAdV3Renderer?: any; }; contents: {richItemRenderer:{content:{}}}[]; }
	class RichGridRenderer {
		/**@type {{[str:string]:any; videoMastheadAdV3Renderer?: any}} */
		masthead={};
		/**@type {RendererContentItem[]} */
		contents=[];
	}
	class HandleRichGridRenderer {
		static debug=false;
		/**
		 * @param {string} path
		 * @param {RichGridRenderer} object
		 */
		static run(path,object) {
			let renderer=object
			if(this.debug) console.log('run handler',path)
			if(renderer.masthead) {
				if(renderer.masthead.videoMastheadAdV3Renderer) {
					let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead
					console.log('masthead',masthead)
					renderer.masthead=masthead
				}
			}
			if(renderer.contents) {
				this.on_contents(object)
			}
		}
		/**
		 * @param {string[]} keys
		 * @param {string} path
		 */
		static check_item_keys(path,keys) {
			/**@type {string[]|string|null} */
			let key=null
			if(keys.length===1) {
				key=keys[0]
			} else {
				key=keys
			}
			switch(path) {
				case 'richItemRenderer.content':
					if(key==='videoRenderer') return
				case 'richGridRenderer.contents[]':
					if(key==='richItemRenderer') return
			}
			if(this.debug) console.log('content keys',path,key)
		}
		/**@arg {RichGridRenderer} renderer */
		static on_contents(renderer) {
			renderer.contents=renderer.contents.filter(content_item => {
				let {richItemRenderer}=content_item
				this.check_item_keys('richGridRenderer.contents[]',Object.keys(content_item))
				// WARNING: This function is filtering an array (was just "return;")
				if(!richItemRenderer) return true
				let {content}=richItemRenderer
				if(!content) return true
				this.check_item_keys('richItemRenderer.content',Object.keys(content))
				if(content.displayAdRenderer) return false
				return true
			})
		}
	}
	class YTFilterHandlers extends YTIterateAllBase {
		/**
		 * @param {string} path
		 * @param {RichGridRenderer} renderer
		 */
		richGridRenderer(path,renderer) {
			HandleRichGridRenderer.run(path,renderer)
		}
		/**
		 * @param {string} path
		 * @param {{ contents: {}[]; }} renderer
		 */
		itemSectionRenderer(path,renderer) {
			this.default_iter(path,renderer)
			if(renderer.contents===void 0) return
			renderer.contents=renderer.contents.filter((item) => {
				let keys=Object.keys(item)
				for(let key of keys) {
					switch(key) {
						case 'promotedSparklesWebRenderer': return false
						case 'compactPromotedVideoRenderer': return false
					}
				}
				return true
			})
		}
		/**
		 * @param {{playerAds?: any[]; adPlacements?: any[];}} data
		 * @param {string} _path
		 */
		on_v1_player(_path,data) {
			if(data.playerAds) {
				data.playerAds=[]
			}
			if(data.adPlacements) {
				data.adPlacements=[]
			}
		}
		/**
		 * @arg {{}} data
		 * @param {URL} url_as_URL
		 */
		on_handle_api(data,url_as_URL) {
			const debug=false
			let path_url=url_as_URL.pathname
			if(path_url==="/getDatasyncIdsEndpoint") return
			let api_parts=url_as_URL.pathname.slice(1).split("/")
			if(api_parts[0]!=='youtubei') {
				console.log('unknown api path',url_as_URL.pathname)
				return
			}
			if(api_parts[1]!=='v1') {
				console.log('unknown api path',url_as_URL.pathname)
				return
			}
			let api_path=api_parts.slice(2).join(".")
			debug&&console.log('on_handle_api api_path',api_parts.slice(0,2).join("/"),api_path)
			this.default_iter(api_path,data)
			switch(api_parts[2]) {
				case 'player': this.on_v1_player(api_path,data); break
			}
		}
		/**
		 * @arg {{}} data
		 * @param {string} page_type
		 */
		handle_page_type(data,page_type,response_type) {
			const debug=false
			debug&&console.log('handle_page_type with page_type and response_type',page_type,response_type)
			this.default_iter(page_type,data)
			switch(response_type) {
				case 'response': break
				case 'playerResponse': switch(page_type) {
					case 'watch': this.on_v1_player(page_type,data); break
				}
			}
		}
		/**
		 * @param {[()=>{}, object, []]} apply_args
		 */
		on_initial_data(apply_args) {
			let ret=Reflect.apply(...apply_args)
			if(ret.response) {
				console.log('initial page info:',ret)
				try {
					if(window.ytPageType) {
						if(ret.page==="browse") {
							this.handle_page_type(ret.response,window.ytPageType,'response')
							if(ret.playerResponse) {
								console.log("playerResponse in ret.page === 'browse'")
								debugger
							}
						} else {
							console.log('page info ret type',ret.page)
							this.handle_page_type(ret.response,window.ytPageType,'response')
							this.handle_page_type(ret.playerResponse,window.ytPageType,'playerResponse')
						}
					}
				} catch(err) {
					console.log('init filter error')
					console.log(err)
				}
			} else {
				console.log("Can't handle return value",ret)
			}
			return ret
		}
	}
	/**
	 * @type {any[]}
	 */
	let blob_create_args_arr=[]
	let leftover_args=[]
	g_api.blob_create_args_arr=blob_create_args_arr
	let yt_handlers=new YTFilterHandlers
	g_api.yt_handlers=yt_handlers
	{
		// PROTOTYPE MODIFIERS
		/**
		 * @type {Map<string, any[]>}
		 */
		let created_blobs=new Map
		let active_blob_set=new Set
		URL.createObjectURL=new Proxy(URL.createObjectURL,{
			apply(...arr) {
				let [target_fn,this_,args]=arr
				let [url_source,...rest]=args
				if(rest.length>0) {
					leftover_args.push([target_fn,this_,rest])
				}
				blob_create_args_arr.push(url_source)
				let ret=Reflect.apply(...arr)
				created_blobs.set(ret,url_source)
				active_blob_set.add(ret)
				return ret
			}
		})
		URL.revokeObjectURL=new Proxy(URL.revokeObjectURL,{
			apply(...proxy_args) {
				let val=proxy_args[2][0]
				active_blob_set.delete(val)
				return Reflect.apply(...proxy_args)
			}
		})
		original_fetch=fetch
		window.fetch=fetch_inject
		fetch_inject.__proxy_target__=original_fetch
		class json_parse_handler {
			/**
			 * @param {any[]} proxy_args
			 */
			apply(...proxy_args) {
				let cst=new Error
				let error_stack=cst.stack
				if(!error_stack) throw new Error("Unable to handle error without stack")
				let string_arr=error_stack.split('\n')
				string_arr=string_arr.slice(2)
				string_arr=string_arr.map(str => str.split('()'[0])[0].slice(4+3,-1))
				string_arr=string_arr.map(str => str.match(/^Object/)===null&&str||str.slice(6))
				string_arr=string_arr.map(str => '{'+str+'}')
				let simple_error_stack=string_arr.join('!')
				if(simple_error_stack==="{Se}!{._.uf}!{b}!{.apply}") {
					return false
				}
				return Reflect.apply(proxy_args[0],proxy_args[1],proxy_args[2])
			}
		}
		//window.fetch=o_fetch;
		if(any(Function).JSON_parse_changed===undefined) {
			let orig_json_parse=JSON.parse
			JSON.parse=new Proxy(JSON.parse,new json_parse_handler)
			JSON.parse=orig_json_parse
			any(Function).JSON_parse_changed=true
		}
		let navigator_sendBeacon=navigator.sendBeacon
		navigator.sendBeacon=function(...args) {
			if(typeof args[0]==='string'&&args[0].indexOf("/api/stats/qoe")>-1) {
				return true
			}
			console.log("send_beacon",args[0])
			return navigator_sendBeacon.call(this,...args)
		}
		let OriginalImage=Image
		Image=new Proxy(Image,{
			construct(...proxy_args) {
				let c_cls=proxy_args[0]
				let tc=class extends c_cls {
					set src(_src) {
						if(_src.indexOf('/api/stats/qoe?')>-1) return
						super.src=_src
					}
					get src() {
						return super.src
					}
				}
				let c_args=proxy_args[1]
				let ret=new tc(...c_args)
				return ret
			}
		})
		Image=OriginalImage
	}
	function plr_raw_replace(/** @type {{ args: { raw_player_response: any; }; }} */ player_config) {
		let raw_plr_rsp=player_config.args.raw_player_response
		if(raw_plr_rsp===void 0) {
			console.log('yt_cfg',player_config)
			return
		}
		raw_plr_rsp.playerAds=[]
		raw_plr_rsp.adPlacements=[]
		return
	};
	function plr_raw_replace_embed() {
		return
	};
	let ar='yt.player.Application'.split('.')
	let a2=ar.slice()
	ar.push('create')
	a2.push('createAlternate')
	/**
	 * @type {any[]}
	 */
	let mk_tree_arr=[]
	function act_found_create_yt_player(/** @type {{ data: { type: string; data: [any, any, any]; }; }} */ event) {
		let tr=event.data.type
		if(tr!='yt.player.Application.createAlternate'&&tr!='yt.player.Application.create') return
		let [,,value]=event.data.data
		let [,player_config,static_config]=value
		if(!player_config) return
		if(static_config.isEmbed) {
			void player_config
			plr_raw_replace_embed()
		} else {
			plr_raw_replace(player_config)
		}
	};
	let locked_set=new WeakMap()
	let ud_func=new WeakSet()
	class OnWindowProperty {
		constructor() {
			/**@type {{[str:string]:any}} */
			this._events={}
		}
		/**
		 * @param {{ type: any; data?: { type: any; data: any[]; }; }} ev
		 */
		dispatchEvent(ev) {
			let evt=this._events[ev.type].slice()
			if(evt===undefined) return
			for(let i=0;i<evt.length;i++) {
				let hnd=evt[i]
				if(hnd.disposed) continue
				let handler=hnd.handler
				handler(ev)
			}
		}
		/**
		 * @param {string | number} ev_name
		 * @param {any} fn
		 */
		removeEventListener(ev_name,fn) {
			let evt=this._events[ev_name]
			if(evt===undefined) return
			for(let i=0;i<evt.length;i++) {
				let ce=evt[i]
				if(!ce.disposed&&ce.handler===fn) {
					evt.splice(i,1)
					i-=1
				}
			}
		}
		/**
		 * @param {string} ev_name
		 * @param {(event: { data: { type: any; data: [any, any, any]; }; }) => void} fn
		 */
		addEventListener(ev_name,fn) {
			(this._events[ev_name]??=[]).push({disposed: false,handler: fn})
		}
	}
	/**
	 * @param {{ value?: any; value_tr?: any; value_of?: any; noisy_flag?: any; }} cc
	 * @arg {string} ms
	 * @arg {{}} obj
	 * @arg {string} [mc]
	 */
	function walk_key_path(cc,ms,obj,mc) {
		let fs
		let mt=ms.match(cc.value_tr)
		if(mt!==null) {
			fs=mt[0]
		} else {
			return mc
		}
		let f2=ms.slice(fs.length+1)
		let dx=f2.indexOf('.')
		let pq
		if(dx>-1) {
			pq=f2.slice(0,dx)
		} else {
			pq=f2
		}
		if(pq.length>0) {
			if((cc.value_tr+'.'+pq)==mc) {
				return cc.value_tr+'.'+pq
			}
			mk(obj,pq,cc.value_tr+'.'+pq,cc.noisy_flag)
			return cc.value_tr+'.'+pq
		}
	}
	let win_watch=new OnWindowProperty
	/**
	 * @param {any} val
	 * @param {MKState} cc
	 */
	function new_pv_fn(val,cc, /** @type {any[]} */ ...args) {
		let ret
		let act_cb_obj={fired: false,ret: ret}
		win_watch.dispatchEvent({type: 'new_window_object',data: {type: cc.value_tr,data: [cc.function_value,val,args,act_cb_obj]}})
		if(!act_cb_obj.fired&&cc.function_value) {
			ret=cc.function_value.apply(val,args)
		} else {
			ret=act_cb_obj.ret
		}
		return ret
	}
	/**
	 * @param {MKState} cc
	 */
	function on_mk_function_property(cc) {
		/**@this {{}}*/
		function with_this(/** @type {any} */ ...args) {
			new_pv_fn(any(this),cc,...args)
		}
		cc.value=with_this
		ud_func.add(cc.value)
	}
	const ghost_symbol=Symbol.for('ghost')
	class MKState {
		[ghost_symbol]=true;
		/**
		 * @param {{}} value
		 * @param {PropertyKey} property_key
		 * @param {object} target
		 * @param {string} property_path
		 * @param {boolean} noisy
		 */
		constructor(value,target,property_key,property_path,noisy) {
			this.value=value
			this.property_key=property_key
			this.target=target
			this.property_path=property_path
			this.noisy=noisy
		}
		run() {
			return mk_run(this)
		}
		value={};
		value_tr="";
		/**@type {Function | null} */
		function_value=null;
		noisy=false;
	}
	/**
	 * @param {MKState} cc
	 * @param {{}} obj
	 */
	function on_mk_new_property(cc,obj) {
		if(obj instanceof Function) {
			cc.function_value=obj
			on_mk_function_property(cc)
		} else {
			let mc
			let ck_i=0
			let ck_str=mk_tree_arr[ck_i]
			mc=walk_key_path(cc,ck_str,obj,mc)
			for(;ck_i<mk_tree_arr.length;ck_i++) {
				ck_str=mk_tree_arr[ck_i]
				mc=walk_key_path(cc,ck_str,obj,mc)
			}
			cc.value=obj
		}
	}
	/**
	 * @param {MKState} cc
	 * @param {{}} obj
	 */
	function on_mk_property_set(cc,obj) {
		if(ud_func.has(obj)) cc.value=obj
		if(any(obj)[ghost_symbol]===undefined) {
			on_mk_new_property(cc,obj)
		} else {
			cc.value=obj
		}
	}
	/**
	 * @param {MKState} cc
	 */
	function mk_run(cc) {
		if(locked_set.has(cc.target)&&locked_set.get(cc.target).names.indexOf(cc.property_key)>-1) {
			return cc
		}
		Object.defineProperty(cc.target,cc.property_key,{
			configurable: true,
			enumerable: true,
			get() {
				return cc.value
			},
			set(val) {
				on_mk_property_set(cc,val)
			}
		})
		if(locked_set.has(cc.target)) {
			locked_set.get(cc.target).names.push(cc.property_key)
		} else {
			locked_set.set(cc.target,{names: [cc.property_key]})
		}
		return cc
	}
	/**
	 * @param {object} target
	 * @param {PropertyKey} property_key
	 * @param {string} property_path
	 * @param {boolean} noisy
	 */
	function mk(target,property_key,property_path,noisy=false) {
		return new MKState({},target,property_key,property_path,noisy).run()
	};
	let yta_str='yt.player.Application'
	mk_tree_arr.push(yta_str+'.create',yta_str+'.createAlternate')
	mk(window,'yt','yt',true)
	win_watch.addEventListener('new_window_object',act_found_create_yt_player)
	const LOGGING_LEVEL=1
	/**
	 * @param {number} logging_level
	 * @param {string} logger_format
	 * @param {any[]} logger_args
	 */
	function log_if_level(logging_level,logger_format,...logger_args) {
		if(logging_level>LOGGING_LEVEL) {
			console.log(logger_format,...logger_args)
		}
	}
	log_if_level
	window.playlist_arr??=[]
	/**@type {string[]} */
	let playlist_arr=window.playlist_arr
	/**
	 * @type {YtdPageManagerElement | null}
	 */
	let ytd_page_manager=null
	/**
	 * @param {HTMLElement} element
	 */
	function on_ytd_page_manager(element) {
		const element_id="ytd-page-manager"
		console.log(`on ${element_id}`)
		element_map.set(element_id,element)
		ytd_page_manager=any(element)
		window.ytd_page_manager=element
	}
	class YtdWatchFlexyElement extends Element {}
	/**
	 * @type {YtdWatchFlexyElement | null}
	 */
	let ytd_watch_flexy=null
	/**
	 * @param {HTMLElement} element
	 */
	function on_ytd_watch_flexy(element) {
		const element_id="ytd-watch-flexy"
		console.log(`on ${element_id}`)
		element_map.set(element_id,element)
		ytd_watch_flexy=any(element)
		window.ytd_watch_flexy=element
	}
	/**
	 * @type {YtdAppElement | null}
	 */
	// yt display app
	let ytd_app=null
	/**
	 * @param {HTMLElement} element
	 */
	function on_ytd_app(element) {
		const element_id="ytd-app"
		console.log(`on ${element_id}`)
		element_map.set(element_id,element)
		ytd_app=any(element)
		window.ytd_app=element
	}
	/**
	 * @type {Element | null}
	 */
	let yt_playlist_manager=null
	/**
	 * @param {HTMLElement} element
	 */
	function on_yt_playlist_manager(element) {
		const element_id="yt-playlist-manager"
		console.log(`on ${element_id}`)
		element_map.set(element_id,element)
		yt_playlist_manager=any(element)
		window.yt_playlist_manager=element
	}
	class YTPlayerData extends HTMLElement {
		active_nav=false;
		/**@type {{getVideoData():{video_id:string;eventId: undefined;title: any;author: any;};getPlayerState():{}}|null} */
		player_=null;
		playerResolver_={
			promise: Promise.resolve()
		};
		init_nav=false;
		is_watch_page_active=false;
		pause() {}
		play() {}
	}
	/**
	 * @type {YTPlayerData | null}
	 */
	let ytd_player=null
	/**
	 * @param {HTMLElement} element
	 */
	function on_ytd_player(element) {
		const element_id="ytd-player"
		console.log(`on ${element_id}`)
		element_map.set(element_id,element)
		ytd_player=any(element)
		window.ytd_player=element
	}
	function is_watch_page_active() {
		return ytd_page_manager&&ytd_page_manager.getCurrentPage()&&ytd_page_manager.getCurrentPage().nodeName=="YTD-WATCH-FLEXY"
	}
	class Box {
		/**@readonly*/
		type="box";
		/** @param {HTMLVideoElement[]} value */
		constructor(value) {
			this.value=value
		}
	}
	/**@type {Map<string, HTMLElement>}*/
	let element_map=new Map
	/**@type {Map<string, Box>}*/
	let box_map=new Map
	class CustomEventType {
		type="event_type";
		detail={};
		port=new MessagePort;
	}
	class CustomEventTarget {
		constructor() {
			/**@type {{[str: string]:?((this:CustomEventTarget, event: CustomEventType) => void)[]}} */
			this._events={}
			this.trace=false
		}
		/**
		 * @param {string} type
		 * @param {(this:CustomEventTarget, event: CustomEventType) => void} handler
		 */
		addEventListener(type,handler) {
			(this._events[type]??=[]).push(handler)
		}
		/**
		 * @param {string} type
		 * @param {any} handler
		 */
		removeEventListener(type,handler) {
			let event_arr=this._events[type]
			if(!event_arr) return
			if(event_arr.length) return
			for(let i=event_arr.length-1;i>=0;i--) {
				let cur=event_arr[i]
				if(cur!==handler) continue
				event_arr.splice(i,1)
			}
		}
		/**
		 * @param {CustomEventType} event
		 */
		dispatchEvent(event) {
			let msg_arr=this._events[event.type]
			if(!msg_arr) return
			for(let i=0;i<msg_arr.length;i++) {
				let cur=msg_arr[i]
				cur.call(this,event)
			}
		}
	}
	let dom_observer=new CustomEventTarget
	g_api.dom_observer=dom_observer
	/**@arg {MessagePort} port*/
	function continue_callback(port) {
		dom_observer.dispatchEvent({
			type: port_state.current_event_type,
			detail: {},
			port
		})
	}
	/**@type {[number, number][]}*/
	let port_state_log=[]
	class MessagePortState {
		cint=-1;
		state_log=port_state_log;
		time_offset=performance.now();
		current_event_type="find-ytd-app";
	}
	let port_state=new MessagePortState
	g_api.port_state=port_state
	let found_element_arr=[
		"yt-playlist-manager",
		"video",
	]
	/**@type {string}*/
	let find_element_tag_name='video'
	let found_element=false
	/**@arg {number} message_id*/
	function try_find_element(message_id) {
		if(found_element_arr.includes(find_element_tag_name)) return
		if(found_element) return
		if(!find_element_tag_name) return
		let element=document.getElementsByTagName(find_element_tag_name)[0]
		if(element) {
			console.log('found element at message_id=%o',message_id)
			debugger
			found_element=true
		}
	}
	/**@arg {CustomEventTarget} observer @arg {MessagePort} port @arg {number} message_id*/
	function dom_observer_next_tick_action(observer,port,message_id) {
		if(observer.trace) console.log("trace_id_"+message_id+":continue")
		port.postMessage(message_id)
	}
	function observer_default_action(type,message_id) {
		port_state.current_event_type=type
		try_find_element(message_id)
	}
	/**
	 * @this {CustomEventTarget}
	 * @arg {CustomEventType} event
	 * ID(10)
	 * */
	function event_find_ytd_app(event) {
		const current_message_id=10
		let {port,detail,type}=event
		observer_default_action(type,current_message_id)
		let target_element=document.getElementsByTagName('ytd-app')[0]
		if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id)
		on_ytd_app(target_element)
		VolumeRangePlugin()
		this.dispatchEvent({type: "find-yt-playlist-manager",detail,port})
	}
	dom_observer.addEventListener('find-ytd-app',event_find_ytd_app)
	/**
	 * @this {CustomEventTarget}
	 * @param {CustomEventType} event
	 * ID(20)
	 * */
	function event_find_yt_playlist_manager(event) {
		const current_message_id=20
		let {type,detail,port}=event
		observer_default_action(type,current_message_id)
		const target_element=document.getElementsByTagName('yt-playlist-manager')[0]
		if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id)
		on_yt_playlist_manager(target_element)
		this.dispatchEvent({type: "find-ytd-page-manager",detail,port})
	}
	dom_observer.addEventListener("find-yt-playlist-manager",event_find_yt_playlist_manager)
	/**
	 * @this {CustomEventTarget}
	 * @param {CustomEventType} event
	 * ID(30)
	 * */
	function event_find_ytd_page_manager(event) {
		const current_message_id=30
		let {type,detail,port}=event
		observer_default_action(type,current_message_id)
		const target_element=document.getElementsByTagName('ytd-page-manager')[0]
		if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id)
		on_ytd_page_manager(target_element)
		this.dispatchEvent({type: "find-ytd-watch-flexy",detail,port})
	}
	dom_observer.addEventListener("find-ytd-page-manager",event_find_ytd_page_manager)
	dom_observer.addEventListener('yt-page-type-changed',function(event) {
		if(this.trace) console.log("yt-page-type-changed")
		continue_callback(event.port)
	})
	/**
	 * @this {CustomEventTarget}
	 * @param {CustomEventType} event
	 * ID(40)
	 * */
	function event_find_ytd_watch_flexy(event) {
		const current_message_id=40
		let {type,detail,port}=event
		observer_default_action(type,current_message_id)
		let target_element=ytd_page_manager.getCurrentPage()
		if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id)
		console.log("PageManager:current_page:"+target_element.tagName.toLowerCase())
		if(target_element.tagName=="YTD-WATCH-FLEXY") {
			on_ytd_watch_flexy(target_element)
			this.dispatchEvent({type: "ytd-watch-flexy",detail,port})
		} else {
			ytd_page_manager.addEventListener(
				"yt-page-type-changed",
				() => this.dispatchEvent({type: "yt-page-type-changed",detail,port}),
				{once: true}
			)
		}
	}
	dom_observer.addEventListener('find-ytd-watch-flexy',event_find_ytd_watch_flexy)
	/**
	 * @this {CustomEventTarget}
	 * @arg {CustomEventType} event
	 * ID(50)
	 * */
	function event_ytd_watch_flexy(event) {
		const current_message_id=50
		let {type,detail,port}=event
		observer_default_action(type,current_message_id)
		let target_element=ytd_watch_flexy.getElementsByTagName('ytd-player')[0]
		if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id)
		on_ytd_player(target_element)
		this.dispatchEvent({type: "ytd-player",detail,port})
	}
	dom_observer.addEventListener('ytd-watch-flexy',event_ytd_watch_flexy)
	/**
	 * @this {CustomEventTarget}
	 * @param {CustomEventType} event
	 * ID(60)
	 */
	function event_ytd_player(event) {
		const current_message_id=60
		let {type,detail,port}=event
		observer_default_action(type,current_message_id)
		const element_list=document.getElementsByTagName('video')
		if(element_list.length<=0) return dom_observer_next_tick_action(this,port,current_message_id)
		/**@type {HTMLVideoElement[]}*/
		let element_list_arr=[...Array.prototype.slice.call(element_list)]
		box_map.set('video-list',new Box(element_list_arr))
		this.dispatchEvent({type: "video",detail,port})
	}
	dom_observer.addEventListener('ytd-player',event_ytd_player)
	/**
	 * @this {CustomEventTarget}
	 * @param {CustomEventType} event
	 * ID(70)
	 */
	function event_video_element_list(event) {
		const current_message_id=70
		let {type,detail,port}=event
		observer_default_action(type,current_message_id)
		if(!box_map.has("video-list")) {
			console.log('no video element list')
			return
		}
		this.dispatchEvent({type: "plugin-activate",detail,port})
	}
	dom_observer.addEventListener('video',event_video_element_list)
	function event_plugin_activate() {
		if(is_watch_page_active())
			yt_watch_page_loaded_handler()
	}
	dom_observer.addEventListener('plugin-activate',event_plugin_activate)
	const realHTMLElement=HTMLElement
	class MessageChannelWithReadonlyPorts {
		get port1() {
			return Object.freeze(MessageChannel.prototype.port1)
		}
		get port2() {
			return Object.freeze(MessageChannel.prototype.port2)
		}
	}
	/**@return {Readonly<MessageChannelWithReadonlyPorts>} */
	function create_message_channel() {
		let channel=Object.freeze(new MessageChannel())
		let {port1,port2}=channel
		port2.onmessage=on_port_message
		Object.freeze(port1)
		Object.freeze(port2)
		return channel
	}
	let message_channel=create_message_channel()
	let slow_message_event=true
	let rep_size=8
	function handle_port_message() {
		let {port1}=message_channel
		rep_count++
		if(rep_count<rep_max) return continue_callback(port1)
		port_state.cint=setTimeout(() => {
			rep_max+=rep_size
			handle_port_message()
		},20)
	}
	/**
	 * @param {MessageEvent<number>} event
	 */
	function on_port_message(event) {
		if(debug) console.log('msg_port:message %o',event.data)
		port_state_log.push([performance.now()-port_state.time_offset,event.data])
		if(slow_message_event) {
			setTimeout(() => handle_port_message(),500)
		} else {
			handle_port_message()
		}
	}
	let rep_count=0
	let rep_max=25
	/**
	 * @type {((event:{})=>void)[]}
	 */
	var on_yt_navigate_finish=[]
	/**
	 * @type {((event:{})=>void)[]}
	 */
	var on_yt_navigate=[]
	// spell:words monospace
	let player_overlay_style_str=`
		position: absolute;
		top: 80px;
		left: 68px;
		font-size: 1.7rem;
		font-weight: 100;
		font-family: monospace;
		color: var(--c2);
		z-index: 1;
		mix-blend-mode: difference;
		background-blend-mode: normal;
		--p0: 100%;
		--p1: 100%;
		--s0: 0 0 0.8px;
		--s1: 0 0 0.8px;
		--c0: rgb(255 255 255 / var(--p0));
		--c1: rgb(20 20 20 / var(--p1));
		--c2: white;
		--sc0: var(--s0) var(--c0);
		--sc1: var(--s1) var(--c1);
		--f0: drop-shadow(var(--sc0));
		--f1: drop-shadow(var(--sc1));
		filter: var(--f0) var(--f1);
		border: 0px solid black;
		-webkit-mask-clip: text;
		user-select: none;
		width: 10px;
	`
	let waiting_for_ytd_player=false
	let current_timeout=null
	function init_ui_plugin() {
		if(waiting_for_ytd_player) return
		if(current_timeout>0) {
			clearTimeout(current_timeout)
			current_timeout=0
		}
		if(!ytd_player||!ytd_player.player_) {
			console.log('wait for player')
			waiting_for_ytd_player=true
			wait_for_yt_player().then(function() {
				waiting_for_ytd_player=false
				init_ui_plugin()
			})
			return
		}
		if(!ytd_player.player_.getVideoData) {
			current_timeout=setTimeout(init_ui_plugin,0)
			return
		}
		if(ytd_player.active_nav) {
			console.log('ytd-player:active_nav = true')
			return
		}
		current_timeout=setTimeout(activate_nav,0)
	}
	async function wait_for_yt_player() {
		if(!ytd_player) {
			throw new Error("No ytd_player to await")
		}
		await ytd_player.playerResolver_.promise
	}
	/**
	 * @param {HTMLElement} element
	 */
	function sumOffset(element) {
		let cache={
			top_offset: 0,
			left_offset: 0
		}
		/**@type {HTMLElement | null} */
		let cur_element=null
		cur_element=element
		for(;;) {
			cache.top_offset+=cur_element.offsetTop
			cache.left_offset+=cur_element.offsetLeft
			/**@type {Element|null}*/
			let next_element=cur_element.offsetParent
			if(next_element instanceof HTMLElement) {
				cur_element=next_element
			} else {
				break
			}
		}
		return cache
	}
	function fix_offset() {
		if(!ytd_player) return
		if(!plugin_overlay_element) return
		let player_offset=sumOffset(ytd_player)
		plugin_overlay_element.style.top=player_offset.top_offset+"px"
		plugin_overlay_element.style.left=player_offset.left_offset+"px"
	}
	let title_text_overlay_enabled=true
	/**@type {HTMLDivElement | null}*/
	let overlay_hide_ui_input=null
	/**@type {HTMLDivElement | null}*/
	let overlay_content_div=null
	function title_text_overlay_update() {
		title_display_update()
		if(!overlay_hide_ui_input) return
		if(title_text_overlay_enabled) {
			overlay_hide_ui_input.style.color=''
		} else {
			overlay_hide_ui_input.style.color='#888'
		}
	}
	let title_save=localStorage.title_save_data
	if(!title_save) {
		title_save=localStorage.title_save_data='{"value":false}'
	}
	let title_on=JSON.parse(title_save).value
	function title_display_update() {
		if(!overlay_content_div) return
		if(title_on&&title_text_overlay_enabled) {
			overlay_content_div.style.display=""
		} else {
			overlay_content_div.style.display="none"
		}
	}
	/**@type {(detail:any)=>detail is {actionName:"yt-fullscreen-change-action", args:[boolean]}}*/
	function is_yt_fullscreen_change_action(detail) {
		return detail.actionName==='yt-fullscreen-change-action'
	}
	/**
	 * @param {CustomEvent<{actionName:"yt-fullscreen-change-action", args:[boolean]}>|CustomEvent<{actionName:string}>} event
	 */
	function on_yt_action(event) {
		let {detail}=event
		if(is_yt_fullscreen_change_action(detail)) {
			let {args}=detail
			fix_offset()
			setTimeout(fix_offset)
			title_text_overlay_enabled=!args[0]
			title_text_overlay_update()
		}
	}
	document.addEventListener('yt-action',on_yt_action)
	/**
	 * @param {{ detail?: { pageType: string; }; }} event
	 */
	function log_page_type_change(event) {
		let {detail}=event
		if(detail) {
			let s_val=detail.pageType
			switch(s_val) {
				default: {
					if(ytd_page_manager) {
						let page_manager_current_tag_name=ytd_page_manager.getCurrentPage().tagName.toLowerCase()
						let nav_load_str=`:: current_page ${page_manager_current_tag_name} -> ${detail.pageType}`
						playlist_arr.push(nav_load_str)
						console.log(nav_load_str)
					} else {
						let nav_load_str=`:: current_page = ${detail.pageType}`
						playlist_arr.push(nav_load_str)
						console.log(nav_load_str)
					}
				} return
			}
		}
	}
	function update_plugin_overlay() {
		if(!plugin_overlay_element) return
		plugin_overlay_element.onupdate()
	}
	function log_current_video_data() {
		if(!ytd_player) return
		if(!ytd_player.player_) {
			wait_for_yt_player().then(log_current_video_data)
			return
		}
		const video_data=ytd_player.player_.getVideoData()
		update_plugin_overlay()
		if(video_data.video_id===undefined) return
		if(video_data.eventId===void 0) return
		const {video_id,title,author}=video_data
		const playlist_log_str=`[${author},${video_id}] ${title}`
		if(playlist_log_str===playlist_arr.at(-1)) return
		playlist_arr.push(playlist_log_str)
		console.log(playlist_log_str)
		if(!overlay_content_div) return
		overlay_content_div.innerText=`[${video_id}] ${title}`
	}
	/**
	 * @param {{ detail?: { pageType: string; }; }} event
	 */
	function log_yt_finish_navigation(event) {
		log_page_type_change(event)
		log_current_video_data()
	}
	function title_display_toggle() {
		title_on=!title_on
		title_display_update()
		localStorage.title_save_data=JSON.stringify({value: title_on})
	}
	let ui_plugin_css_enabled=false
	function ui_css_toggle_click_handler() {
		if(ui_plugin_css_enabled) {
			if(ytd_app&&ytd_app.ui_plugin_style_element) {
				ytd_app.ui_plugin_style_element.remove()
			}
			ui_plugin_css_enabled=false
		} else {
			if(ytd_app&&ytd_app.ui_plugin_style_element) {
				document.head.append(ytd_app.ui_plugin_style_element)
			}
			ui_plugin_css_enabled=true
		}
	}
	function yt_watch_page_loaded_handler() {
		if(!ytd_app) {
			console.log("no ytd-app")
			return
		}
		if(!yt_playlist_manager) {
			console.log("no yt-playlist-manager")
			return
		}
		if(!ytd_page_manager) {
			console.log("no ytd-page-manager")
			return
		}
		overlay_content_div=document.createElement("div")
		var input_modify_css_style=document.createElement("div")
		overlay_hide_ui_input=document.createElement("div")
		if(!plugin_overlay_element) {
			let overlay_element=PluginOverlayElement.cast(document.createElement("div"))
			g_api.plugin_overlay_element=overlay_element
			overlay_element.id="mz_overlay"
			plugin_overlay_element=overlay_element
			let custom_style_element=document.createElement("style")
			ytd_app.ui_plugin_style_element=custom_style_element
			ytd_watch_flexy.addEventListener("yt-navigate",function(event) {
				for(let handler of on_yt_navigate) {
					handler(event)
				}
			})
			ytd_app.addEventListener("yt-navigate-finish",function(event) {
				for(let handler of on_yt_navigate_finish) {
					handler(event)
				}
			})
		}
		for(let i;i=plugin_overlay_element.childNodes[0];) i.remove()
		overlay_content_div.style.userSelect="all"
		overlay_content_div.style.width='max-content'
		plugin_overlay_element.append(overlay_content_div)
		input_modify_css_style.style.float="left"
		overlay_hide_ui_input.style.float="left"
		overlay_hide_ui_input.style.clear="left"
		overlay_hide_ui_input.innerHTML="H"
		overlay_hide_ui_input.onclick=title_display_toggle
		title_text_overlay_update()
		plugin_overlay_element.append(input_modify_css_style)
		plugin_overlay_element.append(overlay_hide_ui_input)
		title_display_update()
		var css_str=`ytd-watch-next-secondary-results-renderer{overflow-x:scroll;height:80vh;}\n/*# sourceURL=yt_css_user */`
		if(ytd_app.ui_plugin_style_element) ytd_app.ui_plugin_style_element.innerHTML=css_str
		if(!ytd_player) return
		ytd_player.active_nav=false
		plugin_overlay_element.onupdate=fix_offset
		on_yt_navigate_finish[0]=log_yt_finish_navigation
		init_ui_plugin()
		ytd_player.init_nav=true
		input_modify_css_style.innerHTML="C"
		input_modify_css_style.onclick=ui_css_toggle_click_handler
		let current_page_element=ytd_page_manager.getCurrentPage()
		function update_ui_plugin() {
			if(debug) console.log('update_ui_plugin')
			setTimeout(update_plugin_overlay)
		};
		current_page_element.addEventListener("yt-set-theater-mode-enabled",update_ui_plugin)
		// visibilitychange handler (resume video when page is visible again)
		let vis_imm=false
		any(ytd_app).app_is_visible=1
		function fire_on_visibility_change_restart_video_playback() {
			if(!is_watch_page_active()) return
			if(!ytd_player||!ytd_player.player_) return
			if(ytd_player.player_.getPlayerState()!=2) return
			ytd_player.pause()
			ytd_player.play()
		}
		document.addEventListener("visibilitychange",function() {
			if(!is_watch_page_active()) return
			if(document.visibilityState==='visible') {
				any(ytd_app).app_is_visible=1
				if(vis_imm) {
					fire_on_visibility_change_restart_video_playback()
					vis_imm=false
				}
			} else {
				any(ytd_app).app_is_visible=0
			}
		})
		// spell:ignore cint
		any(ytd_app).ytp_click_cint=setInterval(() => {
			if(!is_watch_page_active()||!ytd_app) return
			if(!any(ytd_app).app_is_visible) {
				vis_imm=true
				return
			}
		},15*60*1000)
	}
	g_api.yt_watch_page_loaded_handler=yt_watch_page_loaded_handler
	function dummy_event_callback() {
		on_yt_navigate_finish[0]({})
	}
	class PluginOverlayElement extends HTMLElement {
		/**@arg {HTMLDivElement} value @return {PluginOverlayElement} */
		static cast(value) {
			return any(value)
		}
		onupdate() {}
	}
	/**@type {PluginOverlayElement | null} */
	let plugin_overlay_element=null
	function page_changed_next_frame() {
		if(!plugin_overlay_element) return
		if(!ytd_page_manager) return
		plugin_overlay_element.onupdate()
		ytd_page_manager.getCurrentPage().append(plugin_overlay_element)
	}
	window.addEventListener("resize",function() {
		plugin_overlay_element&&plugin_overlay_element.onupdate()
	})
	function activate_nav() {
		if(debug) console.log('activate_nav:fire')
		VolumeRangePlugin()
		if(!ytd_player) return
		if(!ytd_page_manager) return
		if(ytd_player.active_nav) return
		if(!plugin_overlay_element) return
		ytd_player.active_nav=true
		plugin_overlay_element.setAttribute("style",player_overlay_style_str)
		plugin_overlay_element.onupdate()
		ytd_page_manager.getCurrentPage().append(plugin_overlay_element)
		dummy_event_callback()
		ytd_page_manager.addEventListener("yt-page-type-changed",function() {
			if(!ytd_player) return
			if(!ytd_page_manager) return
			if(ytd_page_manager.getCurrentPage().tagName!="YTD-WATCH-FLEXY") {
				ytd_player.is_watch_page_active=false
				plugin_overlay_element&&plugin_overlay_element.remove()
				return
			} else {
				ytd_player.is_watch_page_active=true
			}
			requestAnimationFrame(page_changed_next_frame)
		})
	}
	let volume_plugin_style_source=`
	#rh_css {
		--w:calc(100% - 16px - 185px - 728px - 225px);
		--cv:calc(100% / 3.98);
		--fo:0.6px;
		width:calc(var(--w) / 2 - 25px);
		margin-left:calc(var(--w) * -0.5 - 8px - 25px);
		margin-right:calc(var(--w) / -2 + 50px);
		z-index:1
	}
	@media screen and (max-width: calc(1250px + 10px)) {
		#rh_css {
			display:none;
		}
	}
	#i_r_css {
		outline: none;
	}
	@supports selector(::-webkit-slider-thumb) {
		#i_r_css::-webkit-slider-runnable-track{
			padding:0;
			margin:0;
		}
		@media screen and (prefers-color-scheme: light){
			#i_r_css::-webkit-slider-runnable-track,#i_r_css::-moz-range-track{
				background:repeating-linear-gradient(90deg,transparent,transparent var(--fo),#ff000040 var(--cv));
			}
			#i_r_css{
				background:#fff;
			}
		}
		@media screen and (prefers-color-scheme: dark){
			#i_r_css::-webkit-slider-runnable-track{
				background:repeating-linear-gradient(90deg,transparent,#ff000014 var(--fo),#ff000086 var(--cv));
			}
			#i_r_css{
				background:transparent;
			}
		}
		#i_r_css{
			border-style:solid;
			border-width:0 2.5px;
			border-right-color:#f00;
			border-left-color:#f00;
			appearance:none;
			padding:0;
			display:block;
			z-index:1;
		}
		#i_r_css::-webkit-slider-thumb{
			appearance:none;
			width:4px;
			height:8px;
			color:#000;
			background:#000;
			border:0;
		}
	}
	@supports selector(::-moz-range-thumb) {
		#i_r_css::-moz-range-track {
			padding:0;
			margin:0;
			height:8px;
		}
		@media screen and (prefers-color-scheme: light) {
			#i_r_css::-moz-range-track {
				background:repeating-linear-gradient(90deg, transparent, transparent var(--fo), #ff000040 var(--cv));
			}
			#i_r_css{
				background:#fff;
			}
		}
		@media screen and (prefers-color-scheme: dark) {
			#i_r_css::-moz-range-track {
				background:repeating-linear-gradient(90deg, transparent, #ff000014 var(--fo), #ff000086 var(--cv));
			}
			#i_r_css {
				background:transparent;
			}
		}
		#i_r_css {
			height: 8px;
			border-style:solid;
			border-width:0 2.5px;
			border-color:#f00;
			border-right-color:#f00;
			appearance:none;
			padding:0;
			display:block;
		}
		#i_r_css::-moz-range-thumb {
			appearance:none;
			width:4px;
			height:8px;
			color:#000;
			background:#000;
			border:0;
		}
	}
	/\*# sourceURL=youtube_volume_plugin_style_source*\/
	`
	class HTMLMediaElementGainController {
		/**@type {Event|undefined}*/
		last_event=undefined;
		/**@type {(HTMLVideoElement | HTMLAudioElement)[]} */
		attached_element_list=[];
		audioCtx=new AudioContext();
		style=document.createElement("style");
		constructor() {
			this.gain_node=this.audioCtx.createGain()
			this.gain=this.gain_node.gain
			this.gain_node.connect(this.audioCtx.destination)
			let dynamics_compressor=this.audioCtx.createDynamicsCompressor()
			dynamics_compressor.connect(this.gain_node)
			this.dynamics_compressor=dynamics_compressor;
			(({knee,attack,release,ratio,threshold}) => {
				knee.value=27//28 -1
				attack.value=1
				release.value=1
				ratio.value=4//3 +1
				threshold.value=-24
			})(dynamics_compressor)
			this.style.innerHTML=volume_plugin_style_source
			document.head.append(this.style)
		}
		/**
		 * @param {number} gain
		 */
		setGain(gain) {
			this.gain.value=gain
		}
		/**
		 * @type {MediaElementAudioSourceNode[]}
		 */
		media_element_source_list=[];
		/**
		 * @param {NodeListOf<HTMLMediaElement>} media_node_list
		 */
		attach_element_list(media_node_list) {
			for(let i=0;i<media_node_list.length;i++) {
				let video_element=media_node_list[i]
				if(this.attached_element_list.includes(video_element)) continue
				let media_element_source=this.audioCtx.createMediaElementSource(video_element)
				media_element_source.connect(this.dynamics_compressor)
				this.attached_element_list.push(video_element)
				this.media_element_source_list.push(media_element_source)
			}
		}
	}
	/**@type {HTMLMediaElementGainController | null} */
	let gain_controller=null
	/**@arg {()=>HTMLMediaElementGainController} create_gain_controller */
	function on_gain_controller(create_gain_controller) {
		if(g_api.gain_controller) {
			return g_api.gain_controller
		}
		let controller=create_gain_controller()
		g_api.gain_controller=controller
		return controller
	}
	class VolumeRange {
		/**
		 * @param {number} min
		 * @param {number} max
		 * @param {number} overdrive
		 * @param {HTMLMediaElementGainController} obj
		 */
		constructor(min,max,overdrive,obj) {
			this.cache=true
			this.max=max
			this.min=min
			this.overdrive=overdrive
			this.gain_controller=obj
		}
		/**
		 * @param {number} gain
		 */
		setGain(gain) {
			this.gain_controller.setGain(gain)
			this.setGainCache(gain)
		}
		/**
		 * @param {any} gain
		 */
		setGainCache(gain) {
			if(!this.cache) return
			this.setHistoryStateCache('filter_gain',gain)
		}
		getGainCache() {
			if(!this.cache) return null
			if(typeof history.state=='object') {
				return this.getHistoryStateCache('filter_gain')
			}
			return null
		}
		/**
		 * @param {string} key
		 * @param {any} value
		 */
		setHistoryStateCache(key,value) {
			if(typeof history.state==='object') {
				history.replaceState({...history.state,[key]: value},document.title)
			} else {
				console.log('history-replace',[history.state])
				history.replaceState({[key]: value},document.title)
			}
		}
		/**
		 * @param {string} key
		 */
		getHistoryStateCache(key) {
			if(!this.cache) return null
			if(history.state!==null&&history.state.hasOwnProperty(key)) {
				let {[key]: value}=history.state
				return value
			}
			return null
		}
		loadCachedGain() {
			if(!this.cache) return 1*this.max
			console.log('history-cache',[history.state])
			let c_gain=this.getGainCache()
			if(c_gain===null) c_gain=1
			return c_gain*this.max
		}
		max_compressor_reduction=-0.00011033167538698763;
		/**
		 * @param {KeyboardEvent} event
		 */
		on_key_down(event) {
			if(!this.range_element) return
			this.gain_controller.last_event=event
			if(event.key=="f") {
				var compressor_reduction_factor=this.gain_controller.dynamics_compressor.reduction
				if(compressor_reduction_factor>0) {
					console.log('+',compressor_reduction_factor)
					return
				}
				let new_gain=Math.log((compressor_reduction_factor)*-1)
				if(new_gain>0) return
				new_gain=(new_gain*-1)/(Math.log(this.max_compressor_reduction*-1)*-1/2)
				console.log('ng',new_gain,compressor_reduction_factor)
				if(new_gain>this.overdrive) new_gain=this.overdrive
				if(new_gain<this.min) new_gain=this.min
				this.range_element.value=""+Math.floor(this.max*new_gain)
				this.setGain(new_gain)
			}
		}
		/**
		 * @param {Element} view_parent
		 */
		attach_to_element(view_parent) {
			if(!this.view_div) {
				let element=document.getElementById('rh_css')
				if(!element) {
					element=document.createElement("div")
					element.id='rh_css'
				}
				this.view_div=element
			}
			if(!this.range_element) {
				let element=document.getElementById('i_r_css')
				if(element instanceof HTMLInputElement) this.range_element=element
				if(!this.range_element) {
					if(element) element.remove()
					this.range_element=document.createElement('input')
					this.range_element.type="range"
					this.range_element.id="i_r_css"
					let range_style=this.range_element.style
					range_style.width="calc(100% + 40px + 8px + 40px)"
					any(range_style).marginLeft=0
					any(range_style).marginRight=0
				}
				this.range_element
				this.range_element.oninput=() => {
					if(!this.range_element) return
					this.setGain(any(this.range_element).value/this.max)
				}
				this.range_element.onkeydown=(event) => this.on_key_down(event)
				this.range_element.min=""+this.min
				this.range_element.max=""+this.overdrive
				let new_gain=this.loadCachedGain()
				this.range_element.value=""+new_gain
				this.setGain(new_gain/this.max)
				this.view_div.append(this.range_element)
			}
			view_parent.insertAdjacentElement("beforebegin",this.view_div)
		}
	}
	function createGainController() {
		return new HTMLMediaElementGainController
	}
	function VolumeRangePlugin() {
		if(debug) console.log('VolumeRangePlugin')
		if(!gain_controller) gain_controller=on_gain_controller(createGainController)
		if(!gain_controller) return
		gain_controller.attach_element_list(document.querySelectorAll("video"))
		if(!ytd_app) return
		if(!ytd_app.__shady_children.masthead.$) return
		if(!ytd_app.volume_range) {
			ytd_app.volume_range=new VolumeRange(0,100*5,100*5*2,gain_controller)
			let container_dom_parent=ytd_app.__shady_children.masthead.$.container.children.center
			let use_container=true
			if(use_container) {
				ytd_app.volume_range.attach_to_element(container_dom_parent)
			} else {
				ytd_app.volume_range.attach_to_element(ytd_app)
			}
		}
	}
	if(top===window) {
		continue_callback(message_channel.port1)
	}
}
main()
