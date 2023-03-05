// ==UserScript==
// @name	YTPlugin IndexedDB Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.2
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_IndexedDB.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_IndexedDB.user.js
// ==/UserScript==

const {do_export,as,BaseService,split_string_once}=require("./YtPlugin_Base.user");

const __module_name__="mod$IndexedDBService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
function h_detect_firefox() {
	let ua=navigator.userAgent;
	return ua.includes("Gecko/")&&ua.includes("Firefox/");
}
const is_firefox=h_detect_firefox(); is_firefox;
class TypedIndexedDB {
	/** @arg {IDBDatabase} db @arg {keyof DT_DatabaseStoreTypes} storeNames @arg {IDBTransactionMode} mode */
	transaction(db,storeNames,mode) {return db.transaction(storeNames,mode);}
	/** @template {keyof DT_DatabaseStoreTypes} K @arg {TypedIDBObjectStore<DT_DatabaseStoreTypes[K]>} obj_store @arg {TypedIDBValidKey<DT_DatabaseStoreTypes[K]["key"]>|TypedIDBKeyRange<DT_DatabaseStoreTypes[K]["key"]>} [query] @arg {IDBCursorDirection} [direction] @returns {IDBRequest<TypedIDBCursorWithValue<DT_DatabaseStoreTypes[K]>|null>} */
	openCursor(obj_store,query,direction) {
		if(query) {
			if(query.type==="key") {
				return obj_store.openCursor(query.key,direction);
			}
			return obj_store.openCursor(query.key_range,direction);
		}
		return obj_store.openCursor(query,direction);
	}
	/** @arg {IDBTransaction} tx @arg {K} key @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @returns {TypedIDBObjectStore<T>} */
	objectStore(tx,key) {
		let rq=tx.objectStore(key);
		return as(rq);
	}
	/** @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @arg {T["key"]} key @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<T|null>} */
	get(store,key) {return store.get(key);}
	/** @template {{}} T @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<T[]>} */
	getAll(store) {return store.getAll();}
	/** @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @arg {T} value @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<IDBValidKey>} */
	put(store,value) {return store.put(value);}
	/** @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @arg {T} value @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<IDBValidKey>} */
	add(store,value) {return store.add(value);}
}
export_(exports => exports.TypedIndexedDB=TypedIndexedDB);
class TypedIDBValidKeyS {
	/** @template {IDBValidKey} T @arg {T} key @returns {TypedIDBValidKey<T>} */
	static only(key) {
		return {type: "key",key};
	}
}
class IndexedDBService extends BaseService {
	/** @constructor @public @arg {DefaultServiceResolver} x */
	constructor(x) {
		super(x);
		/** @type {DT_DatabaseStoreKeys} */
		let keys=["boxed_id"];
		for(let key of keys) {
			/** @template {keyof DT_DatabaseStoreTypes} R @arg {{[_ in R]?: [R,Map<string,number>]}} s @arg {R} k @arg {[R,Map<string,number>]} v */
			function create_cache_index(s,k,v) {s[k]=v;}
			/** @template {keyof DT_DatabaseStoreTypes} R @arg {T_StoreCacheType<R>} s @arg {R} k @arg {T_CacheInfoType<R>} v */
			function create_cache(s,k,v) {s[k]=v;}
			create_cache_index(this.store_cache_index,key,[key,new Map]);
			create_cache(this.store_cache,key,[key,[]]);
		}
	}
	database_opening=false;
	database_open=false;
	/** @private @type {D_StoreCacheIndex} */
	store_cache_index={};
	/** @private @type {D_StoreCacheType} */
	store_cache={};
	/** @template {keyof DT_DatabaseStoreTypes} T @arg {T} key */
	get_data_cache(key) {
		/** @type {T_StoreCacheType<T>} */
		let sk_ac=this.store_cache;
		/** @type {T_CacheInfoType<T>|undefined} */
		let cache_info=as(this.store_cache[key]);
		cache_info??=[key,[]];
		sk_ac[key]=cache_info;
		/** @type {TR_data_cache<T>} */
		let sk=as([key,cache_info[1]]);
		return sk;
	}
	/** @template {keyof DT_DatabaseStoreTypes} T @arg {T} key */
	get_data_index_cache(key) {
		/** @type {{[R in T]?: [R,Map<string,number>]}} */
		let sk_ac=this.store_cache_index;
		/** @type {[T,Map<string,number>]|undefined} */
		let cache_info=as(this.store_cache_index[key]);
		cache_info=[key,new Map];
		sk_ac[key]=cache_info;
		return cache_info[1];
	}
	/** @private @type {(DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes])[]} */
	committed_data=[];
	/** @type {Map<keyof DT_DatabaseStoreTypes,string[]>} */
	cached_data=new Map;
	cache_weak_set=new WeakSet;
	/** @arg {AG_DatabaseStoreDescription["key"]} key */
	check_size(key) {
		let [,d_cache]=this.get_data_cache(key);
		/** @type {(DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes]|null)[]} */
		let arr=d_cache;
		if(arr.length!==arr.reduce((r) => r+1,0)) {debugger;}
	}
	log_db_actions=false;
	/** @type {Promise<void>|null} */
	open_db_promise=null;
	expected_id=0;
	/** @template {G_BoxedIdObj} T @arg {T} x @arg {number} version @returns {Promise<T|null>} */
	put_box(x,version) {return this.put("boxed_id",x,version);}
	/** @private @template {"load_id"|"save_id"} T @arg {T} key @arg {number} version @returns {Promise<DST_LoadId|DST_SaveId|null>} */
	async get_id_box(key,version) {
		switch(key) {
			case "load_id": {
				const t_key="boxed_id:a:load_id";
				let box=await this.get("boxed_id",t_key,version);
				if(box&&box.key!==t_key) return null;
				return box;
			}
			case "save_id": {
				const t_key="boxed_id:a:save_id";
				let box=await this.get("boxed_id",t_key,version);
				if(box&&box.key!==t_key) return null;
				return box;
			}
			default: throw new Error();
		}
	}
	has_loaded_keys=false;
	on_loaded_resolver=this.create_resolver();
	/** @arg {StoreData} store @arg {number} version */
	async load_store_from_database(store,version) {
		/** @type {G_IDBBoxedType[]} */
		let boxed;
		try {
			boxed=await this.getAll("boxed_id",version);
		} catch {
			this.has_loaded_keys=true;
			this.on_loaded_resolver.resolve();
			return;
		}
		for(let item of boxed) await this.load_store(store,item);
		this.has_loaded_keys=true;
		this.on_loaded_resolver.resolve();
	}
	/** @type {Set<string>} */
	loaded_keys=new Set;
	/** @type {Map<string,G_IDBBoxedType>} */
	loaded_map=new Map;
	/** @arg {StoreData} store @arg {G_IDBBoxedType} item */
	async load_store(store,item) {
		this.add_to_index(item.type,item.key,item,true);
		if(item.type!=="boxed_id") {
			item.type;
			return;
		}
		this.cache_weak_set.add(item.value);
		/** @template {string} T @arg {{tag:T}} x */
		function get_tag(x) {return x.tag;}
		/** @template {{type:keyof DT_DatabaseStoreTypes;tag:string;key:string;}} R @template {R} T @arg {T} x @returns {R} */
		function decay_item(x) {return x;}
		switch(item.tag) {
			case "bigint":
			case "boolean":
			case "keys":
			case "number":
			case "root_visual_element":
			case "string": {
				if(this.cache_weak_set.has(item.value.info_arr[0])) break;
				this.cache_weak_set.add(item.value.info_arr[0]);
			} break;
			default: this.loaded_keys.add(item.key); this.loaded_map.set(item.key,item);
		}
		let ht=this.x.get("handle_types");
		switch(item.tag) {
			default: {
				let di=decay_item(item);
				switch(get_tag(item)) {
				}
				console.log("skip_tag",di.tag);
				debugger;
			} break;
			case "bigint": return store.get_store("bigint_store").load_data(item);
			case "boolean": return store.get_store("bool_store").load_data(item);
			case "keys": return store.get_store("keys_store").load_data(item);
			case "number": return store.get_store("number_store").load_data(item);
			case "root_visual_element": return store.get_store("ve_store").load_data(item);
			case "string": return store.get_store("string_store").load_data(item);
			case "a:load_id":
			case "a:save_id":
			case "a:update_id":
			case "browse_id:FE":
			case "browse_id:MP":
			case "browse_id:SP":
			case "browse_id:VL:PL":
			case "browse_id:VL":
			case "channel_id:UC":
			case "exact:play_next":
			case "guide_entry_id":
			case "hashtag_id":
			case "key":
			case "playlist_id:LL":
			case "playlist_id:PL":
			case "playlist_id:RD:MM":
			case "playlist_id:RD":
			case "playlist_id:WL":
			case "user_id":
			case "video_time": {
				let val_src=item.value;
				switch(val_src.type) {
					default: debugger; break;
					case "hashtag_id": ht.id_cache.add(`${val_src.type}:${val_src.hashtag}`); break;
					case "exact": ht.id_cache.add(`${val_src.type}:${val_src.tag}:${val_src.info_arr[0].raw_id}`); break;
					case "guide_entry_id": ht.id_cache.add(`${val_src.type}:${val_src.info_arr[0].info_arr[0].raw_id}`); break;
					case "video_time": ht.id_cache.add(`${val_src.type}:${val_src.raw_value}`); break;
					case "key": ht.id_cache.add(`${val_src.type}:start_radio:${val_src.info_arr[0].start_radio}`); break;
					case "browse_id": ht.id_cache.add(`${val_src.type}:${val_src.info_arr[0].raw_id}`); break;
					case "channel_id": ht.id_cache.add(`${val_src.type}:${val_src.info_arr[0].raw_id}`); break;
					case "playlist_id": ht.id_cache.add(`${val_src.type}:${val_src.info_arr[0].raw_id}`); break;
					case "user_id": ht.id_cache.add(`${val_src.type}:${val_src.info_arr[0].raw_id}`); break;
					case "number": break;
				}
				let [,d_cache]=this.get_data_cache(item.type);
				let cache_val=d_cache.find(v => v&&v.key===item.key);
				if(cache_val) {
					if(this.log_all_events) console.log("[found_during_load]",item.key);
					this.committed_data.push(cache_val);
				} else {
					console.log("[not_found_during_load]",item.key);
				}
			} break;
			case "video_id": {
				let val_src=item.value;
				ht.id_cache.add(`${val_src.type}:${val_src.info_arr[0].raw_id}`);
				this.loaded_keys.add(item.key); this.loaded_map.set(item.key,item);
			} break;
		}
	}
	expected_save_id=0;
	expected_load_id=0;
	/** @public @arg {StoreData} store @arg {number} version */
	async save_database(store,version) {
		let save_id=await this.get_id_box("save_id",version);
		if(!save_id) {
			this.expected_save_id=0;
			await this.put_boxed_id_async_3(version,"save_id",null,this.expected_save_id);
			save_id=await this.get_id_box("save_id",version);
			if(!save_id) throw new Error("null on get");
		}
		x: if(!save_id.value) {
			/** @type {{}} */
			let update_sid=save_id;
			/** @type {{id?: number}} */
			let old_save_id=update_sid;
			let old_id=old_save_id.id;
			if(!old_id) break x;
			save_id={type: "boxed_id",tag: "a:save_id",key: "boxed_id:a:save_id",value: {type: "number",raw: old_id}};
		}
		if(save_id.value.raw!==this.expected_save_id) this.expected_save_id=save_id.value.raw;
		await this.save_store_to_database(store,version);
		this.expected_save_id++;
		let save_res=await this.put_boxed_id_async_3(version,"save_id",null,this.expected_save_id);
		if(!save_res) {throw new Error("null on put");}
		save_res.ret;
	}
	/** @public @arg {StoreData} store @arg {number} version */
	async load_database(store,version) {
		let load_id=await this.get_id_box("load_id",version);
		if(!load_id) {
			this.expected_load_id=0;
			let put_promise=this.put_boxed_id_async_3(version,"load_id",null,this.expected_load_id);
			this.on_loaded_resolver.resolve();
			await put_promise;
			load_id=await this.get_id_box("load_id",version);
			if(!load_id) throw new Error("null on get");
		}
		x: if(!load_id.value) {
			/** @type {{}} */
			let update_sid=load_id;
			/** @type {{id?: number}} */
			let old_save_id=update_sid;
			let old_id=old_save_id.id;
			if(!old_id) break x;
			load_id={type: "boxed_id",tag: "a:load_id",key: "boxed_id:a:load_id",value: {type: "number",raw: old_id}};
		}
		if(load_id.value.raw!==this.expected_load_id) this.expected_load_id=load_id.value.raw;
		await this.load_store_from_database(store,version);
		this.expected_load_id++;
		let load_res=await this.put_boxed_id_async_3(version,"load_id",null,this.expected_load_id);
		if(!load_res) throw new Error("null on put");
		load_res.ret;
	}
	/** @template {G_StoreDescriptions} T @arg {T} store @arg {number} version */
	async push_store_to_database(store,version) {
		let results=await Promise.allSettled(store.data.map(item => this.push_store_item_to_database(store,item,version)));
		for(let result of results) {
			if(result.status==="rejected") {
				console.log("[push_store_to_database.iter.err]",result.reason);
			} else {
				if(result.value===null) throw new Error("null on put");
				if("err" in result.value) {
				} else {}
			}
		}
	}
	/** @template T @arg {make_item_group<T>} x */
	uv_unpack(x) {
		/** @type {make_one_t<T>|null} */
		let one=null;
		/** @type {make_arr_t<T>|null} */
		let arr=null;
		/** @type {make_many_t<T>|null} */
		let many=null;
		switch(x[0]) {
			default: debugger; break;
			case "one": one=x; break;
			case "many": many=x; break;
			case "arr": arr=x; break;
		}
		return {one,arr,many};
	}
	/** @template T @arg {make_item_group<T>} x @arg {T[]} _mt */
	uv_unpack_mt(x,_mt) {
		/** @type {make_one_t<T>|null} */
		let one=null;
		/** @type {make_arr_t<T>|null} */
		let arr=null;
		/** @type {make_many_t<T>|null} */
		let many=null;
		switch(x[0]) {
			default: debugger; break;
			case "one": one=x; break;
			case "many": many=x; break;
			case "arr": arr=x; break;
		}
		return {one,arr,many};
	}
	/** @arg {{args:Y_PutBoxedArgs;promise:Promise<G_BoxedIdObj>;}} x */
	async await_put_result(x) {
		const {args,promise}=x;
		let ret=await promise;
		return {args,ret};
	}
	/** @arg {number} version @template {Y_PutBoxedArgs} T @arg {T} args */
	async put_boxed_id_async_3(version,...args) {return {args,ret: await (this.put_boxed_id_3(version,...args).promise)};}
	/** @arg {number} version @template {Extract<Y_PutBoxedArgs,{0:"browse_id"}>} T @arg {T} args */
	put_boxed_pl(version,...args) {
		switch(args[1]) {
			default: args[1]===""; debugger; throw new Error("Unreachable");
			case "MP": {
				let [tag,id,value]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag: `${tag}:${id}`,
					key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}:_:${value.info_arr[3].id}`,
					value,
				},version); return {args,promise};
			}
			case "FE": {
				let [tag,id,value]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag: `${tag}:${id}`,
					key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
					value,
				},version); return {args,promise};
			}
			case "VL:LL": {
				let [type,s_tag,value]=args;
				let [tag,id]=split_string_once(s_tag,":");
				let promise=this.put_box({
					type: "boxed_id",
					tag: `${type}:${tag}`,
					key: `boxed_id:${type}:${tag}:${id}`,
					value,
				},version); return {args,promise};
			}
			case "VL:WL": {
				let [type,s_tag,value]=args;
				let [tag,id]=split_string_once(s_tag,":");
				let promise=this.put_box({
					type: "boxed_id",
					tag: `${type}:${tag}`,
					key: `boxed_id:${type}:${tag}:${id}`,
					value,
				},version); return {args,promise};
			}
			case "VL:PL": {
				let [type,tag,value]=args;
				let [tag1,tag2]=split_string_once(tag,":");
				let id=value.info_arr[1].info_arr[1].id;
				/** @type {DSS_Browse_VL_PL} */
				const z={
					type: "boxed_id",
					tag: `${type}:${tag1}:${tag2}`,
					key: `boxed_id:${type}:${tag1}:${tag2}:${id}`,
					value,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "VL:UC": {
				let [type,tag,value]=args;
				let [tag1,tag2]=split_string_once(tag,":");
				let id=value.info_arr[1].info_arr[1].id;
				/** @type {DSS_Browse_VL_UC} */
				const z={
					type: "boxed_id",
					tag: `${type}:${tag1}:${tag2}`,
					key: `boxed_id:${type}:${tag1}:${tag2}:${id}`,
					value,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "SP": {
				let [tag,id,value]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag: `${tag}:${id}`,
					key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
					value,
				},version); return {args,promise};
			}
		}
	}
	/** @arg {number} version @template {Y_PutBoxedArgs} T @arg {T} args */
	put_boxed_id_3(version,...args) {
		switch(args[0]) {
			default: args[0]===""; switch((args[0])) {
			} debugger; throw new Error();
			case "browse_id": return this.put_boxed_pl(version,...args);
			case "key": {
				let [tag,id,value]=args;
				return {args,promise: this.put_box({type: "boxed_id",tag,id,key: `boxed_id:${tag}:${id}:${value.info_arr[0].start_radio}`,value},version)};
			}
			case "guide_entry_id": /*db*/ {
				let [tag,,value]=args;
				switch(value.tag) {
					default: value===""; throw new Error();
					case "LL": {
						/** @type {DST_GuideEntry_LL} */
						const z={type: "boxed_id",tag,key: `boxed_id:${tag}:${value.tag}`,value};
						return {args,promise: this.put_box(z,version)};
					}
					case "WL": {
						/** @type {DST_GuideEntry_WL} */
						const z={type: "boxed_id",tag,key: `boxed_id:${tag}:${value.tag}`,value};
						return {args,promise: this.put_box(z,version)};
					}
					case "PL": {
						let iv=value.info_arr[0];
						/** @type {DST_GuideEntry_PL} */
						const z={type: "boxed_id",tag,key: `boxed_id:${tag}:${iv.tag}:${iv.info_arr[1].id}`,value};
						return {args,promise: this.put_box(z,version)};
					}
					case "UC": {
						let iv=value.info_arr[0];
						/** @type {DST_GuideEntry_UC} */
						const z={type: "boxed_id",tag,key: `boxed_id:${tag}:${iv.tag}:${iv.info_arr[1].id}`,value};
						return {args,promise: this.put_box(z,version)};
					}
					case "VL:LL": {
						/** @type {DST_GuideEntry_VL_LL} */
						const z={type: "boxed_id",tag,key: `boxed_id:${tag}:${value.tag}`,value};
						return {args,promise: this.put_box(z,version)};
					}
				}
			}
			case "video_id": {
				let [tag,,value]=args;
				return {args,promise: this.put_box({type: "boxed_id",tag,key: `boxed_id:${tag}:${value.info_arr[0].raw_id}`,value},version)};
			}
			case "user_id": {
				let [tag,,value]=args;
				return {args,promise: this.put_box({type: "boxed_id",tag,key: `boxed_id:${tag}:${value.info_arr[0].raw_id}`,value},version)};
			}
			case "exact": {
				let [type,tag,value]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag: `${type}:${tag}`,
					key: `boxed_id:${type}:${tag}:${value.info_arr[0].raw_id}`,
					value,
				},version); return {args,promise};
			}
			case "playlist_id": {
				switch(args[1]) {
					default: debugger; throw new Error();
					case "LL": {
						let [,,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: "playlist_id:LL",
							key: "boxed_id:playlist_id:LL",
							value,
						},version); return {args,promise};
					}
					case "WL": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: `${tag}:${id}`,
							key: `boxed_id:${tag}:${id}`,
							value,
						},version); return {args,promise};
					}
					case "PL": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: `${tag}:${id}`,
							key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
							value,
						},version); return {args,promise};
					}
					case "RD": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: `${tag}:${id}`,
							key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
							value,
						},version); return {args,promise};
					}
					case "RD:MM": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: `${tag}:${id}`,
							key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
							value,
						},version); return {args,promise};
					}
				}
			}
			case "hashtag_id": {
				let [tag,,value]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${value.hashtag}`,
					value,
				},version); return {args,promise};
			}
			case "channel_id": {
				let [tag,id,value]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag: `${tag}:${id}`,
					key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
					value,
				},version); return {args,promise};
			}
			case "video_time": {
				let [tag,,value]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${value.raw_value}`,
					value,
				},version); return {args,promise};
			}
			case "bigint": {
				let [tag,,[type,container]]=args;
				/** @type {T_UrlInfoArr<string,make_item_group<bigint>>} */
				let value={
					type,
					info_arr: [container]
				};
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value,
				},version); return {args,promise};
			}
			case "boolean": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "number": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "string": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "keys": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "root_visual_element": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "load_id": {
				let [mode,,id]=args;
				let promise=this.put_box({
					type: "boxed_id",
					key: `boxed_id:a:${mode}`,
					tag: `a:${mode}`,
					value: {type: "number",raw: id},
				},version); return {args,promise};
			}
			case "save_id": {
				let [mode,,id]=args;
				let promise=this.put_box({
					type: "boxed_id",
					key: `boxed_id:a:${mode}`,
					tag: `a:${mode}`,
					value: {type: "number",raw: id},
				},version); return {args,promise};
			}
			case "browse_id": {
				switch(args[1]) {
					case "FE": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: `${tag}:${id}`,
							key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
							value,
						},version); return {args,promise};
					}
					case "MP": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: `${tag}:${id}`,
							key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
							value,
						},version); return {args,promise};
					}
					case "SP": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							type: "boxed_id",
							tag: `${tag}:${id}`,
							key: `boxed_id:${tag}:${id}:${value.info_arr[1].id}`,
							value,
						},version); return {args,promise};
					}
				}
			} throw new Error("end");
			case "bigint": {
				let [tag,,[type,container]]=args;
				/** @type {T_UrlInfoArr<string,make_item_group<bigint>>} */
				let value={
					type,
					info_arr: [container]
				};
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value,
				},version); return {args,promise};
			}
			case "boolean": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "number": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "string": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "keys": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
			case "root_visual_element": {
				let [tag,,[type,container]]=args;
				let promise=this.put_box({
					type: "boxed_id",
					tag,
					key: `boxed_id:${tag}:${type}`,
					value: {
						type,
						info_arr: [container]
					},
				},version); return {args,promise};
			}
		}
	}
	/** @template {G_StoreDescriptions} T @arg {T} store @arg {T["data"][number]} item @arg {number} version */
	async push_store_item_to_database(store,item,version) {
		let [v_key,vi]=item;
		if(this.cache_weak_set.has(vi)) return {item,err: true};
		this.cache_weak_set.add(vi);
		switch(store.content) {
			default: debugger; break;
			case "bigint": {
				if(!this.is_vi_has_bigint(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.content,null,[v_key,vi]);
				return ret;
			}
			case "boolean": {
				if(!this.is_vi_has_bool(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.content,null,[v_key,vi]);
				return ret;
			}
			case "root_visual_element":
			case "number": {
				if(!this.is_vi_has_num(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.content,null,[v_key,vi]);
				return ret;
			}
			case "string": {
				if(!this.is_vi_has_str(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.content,null,[v_key,vi]);
				return ret;
			}
			case "keys": {
				if(!(this.is_vi_has_str(vi)||this.is_vi_has_num(vi))) break;
				let ret=await this.put_boxed_id_async_3(version,store.content,null,[v_key,vi]);
				return ret;
			}
		}
		return {item,err: true};
	}
	/** @arg {StoreData} store @arg {number} version */
	async save_store_to_database(store,version) {
		let s_values=store.stores.values();
		for(let store of s_values) {
			await this.push_store_to_database(store,version);
		}
	}
	/** @arg {make_item_group<any>} x @returns {x is make_item_group<string>} */
	is_vi_has_str(x) {return this.is_vi_typeof_check(x,"string");}
	/** @arg {make_item_group<any>} x @returns {x is make_item_group<number>} */
	is_vi_has_num(x) {return this.is_vi_typeof_check(x,"number");}
	/** @arg {make_item_group<any>} x @returns {x is make_item_group<boolean>} */
	is_vi_has_bool(x) {return this.is_vi_typeof_check(x,"boolean");}
	/** @arg {make_item_group<any>} x @returns {x is make_item_group<bigint>} */
	is_vi_has_bigint(x) {return this.is_vi_typeof_check(x,"bigint");}
	/** @template T @arg {make_item_group<T>} x @returns {boolean} @arg {T_GetTypeof<T>} ty */
	is_vi_typeof_check(x,ty) {
		switch(x[0]) {
			default: debugger; throw new Error();
			case "one": return typeof x[1]===ty;
			case "arr": {
				let x_arr=x[1];
				if(x_arr.length===0) return true;
				return typeof x_arr[0]===ty;
			}
			case "many": {
				let x_many=x[1];
				if(x_many.length===0) return true;
				let x_arr=x_many[0];
				if(x_arr.length===0) return true;
				return typeof x_arr[0]===ty;
			}
		}
	}
	/** @arg {TypedIndexedDB} typed_db @arg {keyof DT_DatabaseStoreTypes} key @arg {number} version */
	async open_rw_object_store(typed_db,key,version) {
		let db=await this.get_async_result(this.get_db_request(version));
		let s=this.open_transaction_scope(typed_db,db,key,"readwrite");
		return typed_db.objectStore(s.tx,key);
	}
	/** @arg {keyof DT_DatabaseStoreTypes} key @arg {string} query @arg {number} version */
	async delete(key,query,version) {
		let typed_db=new TypedIndexedDB;
		let obj_store=await this.open_rw_object_store(typed_db,key,version);
		return this.get_async_result(obj_store.delete(query));
	}
	/** @api @public @template {DT_DatabaseStoreTypes[U]} T @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {T} value @arg {number} version */
	async direct_put(key,value,version) {
		let typed_db=new TypedIndexedDB;
		let obj_store=await this.open_rw_object_store(typed_db,key,version);
		return this.get_async_result(obj_store.put(value));
	}
	/** @returns {J_ResolverType_Ready} */
	create_resolver() {
		/** @type {J_ResolverTypeHelpers['assume_changed_state']} */
		function assume_changed_state(_cls,_state) {
			return true;
		}
		/** @type {J_ResolverTypeHelpers['change_state']} */
		function change_state(cls,state) {
			let n_cls=cls;
			if(cls.state==="init") {
				if(cls.state===state) return;
				if(!assume_changed_state(n_cls,"ready")) throw new Error();
				n_cls.state="ready";
				return;
			} else if(cls.state==="ready") {
				if(cls.state===state) return;
				if(!assume_changed_state(n_cls,"init")) throw new Error();
				n_cls.state="init";
				return;
			} else {
				cls==="";
			}
		}
		/** @type {J_ResolverType_Init|J_ResolverType_Ready} */
		let ret={
			state: "init",
			reset() {
				this.promise=new Promise((resolve,reject) => {
					this.resolve=resolve;
					this.reject=reject;
				});
				return this.get_as_ready();
			},
			/** @type {Promise<void>|null} */
			promise: null,
			/** @type {((value:void|PromiseLike<void>)=>void)|null} */
			resolve: null,
			/** @type {((reason?:any)=>void)|null} */
			reject: null,
			/** @type {J_ResolverTypeBase['get_in_init']} */
			get_in_init() {
				this.state="init";
				return this;
			},
			/** @type {J_ResolverTypeBase['get_as_ready']} */
			get_as_ready() {
				/** @returns {J_ResolverType} */
				let get_any_cls=() => this;
				let cls=get_any_cls();
				change_state(cls,"ready");
				return cls;
			}
		};
		ret=ret.reset();
		return ret;
	}
	/** @type {Promise<{type:"success"}|{type:"failure"}>|null} */
	db_wait_promise=null;
	/** @private @template {DT_DatabaseStoreTypes[U]} T @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {T} value @arg {number} version */
	async putImpl(key,value,version) {
		if(!value) {debugger; return value;}
		let cache=this.cached_data.get(key);
		let cache_key=value.key;
		if(cache===void 0) this.cached_data.set(key,cache=[]);
		if(cache.includes(cache_key)) return value;
		this.push_waiting_obj(key,value);
		this.check_size(key);
		if(this.db_wait_promise) {
			let wait_result=await this.db_wait_promise;
			if(wait_result.type==="failure") return null;
			return value;
		}
		let resolver=this.create_resolver();
		/** @returns {Promise<{type:"success"}|{type:"failure"}>} */
		let s_or_f=async () => {
			try {
				await resolver.promise;
				return {type: "success"};
			} catch {
				return {type: "failure"};
			}
		};
		this.db_wait_promise=s_or_f();
		this.open_db_promise=this.open_database(key,version);
		try {
			await this.open_db_promise;
		} catch(e) {
			resolver.reject(e);
			throw e;
		}
		resolver.resolve();
		this.open_db_promise=null;
		this.db_wait_promise=null;
		return value;
	}
	log_failed=true;
	/** @api @public @template {DT_DatabaseStoreTypes[U]} T @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {T} value @arg {number} version */
	async put(key,value,version) {
		x: if(this.loaded_keys.has(value.key)) {
			let loaded_value=this.loaded_map.get(value.key);
			switch(value.tag) {
				case "video_id": {
					if(!loaded_value) break;
					if(loaded_value.key!==value.key) break;
					if(loaded_value.value.info_arr[0].raw_id===value.value.info_arr[0].raw_id) return value;
					debugger;
				} break;
				case "channel_id:UC":
				case "playlist_id:RD": {
					if(!loaded_value) break;
					if(loaded_value.key!==value.key) break;
					if(loaded_value.value.info_arr[0].raw_id===value.value.info_arr[0].raw_id) return value;
					debugger;
				} break;
				case "a:load_id": {
					if(!loaded_value) break;
					if(loaded_value.key!==value.key) break;
					if(loaded_value.value.raw===value.value.raw) return value;
				} break x;
				case "a:save_id": {
					if(!loaded_value) break;
					if(loaded_value.key!==value.key) break;
					if(loaded_value.value.raw===value.value.raw) return value;
				} break x;
			}
			if(loaded_value) {
				console.log("[change]:",value.key,loaded_value.value,'->',value.value);
			} else {
				console.log("[create]:",value.key,value.value);
			}
		}
		try {
			let ret=await this.putImpl(key,value,version);
			return ret;
		} catch(e) {
			if(this.log_failed) {
				console.log("failed to put",e);
				setTimeout(() => this.log_failed=true,5000);
			}
			this.log_failed=false;
			throw new AggregateError([e],"put await error");
		}
	}
	/** @arg {number} version */
	get_db_request(version) {
		let db_req=indexedDB.open("yt_plugin",version);
		db_req.onupgradeneeded=event => this.onUpgradeNeeded(db_req,event);
		return db_req;
	}
	/**
	 * @arg {TypedIndexedDB} typed_db
	 * @arg {IDBDatabase} db @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {IDBTransactionMode} mode
	 * @arg {()=>void} complete_cb
	*/
	open_transaction(typed_db,db,key,mode,complete_cb) {
		const tx=typed_db.transaction(db,key,mode);
		tx.onerror=function(event) {
			console.log("tx error",event,tx.error);
			complete_cb();
		};
		tx.onabort=function(event) {
			console.log("tx abort",event,tx.error);
			complete_cb();
		};
		return tx;
	}
	/** @arg {TypedIndexedDB} typed_db @arg {IDBDatabase} db @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {IDBTransactionMode} mode @returns {TypedIDBTransactionScope} */
	open_transaction_scope(typed_db,db,key,mode) {
		const tx=this.open_transaction(typed_db,db,key,mode,() => {
			s.is_tx_complete=true;
		});
		let s={
			error_count: 0,
			db,tx,typed_db,
			/** @type {TypedIDBObjectStore<DT_DatabaseStoreTypes[U]>|null} */
			obj_store: null,
			is_tx_complete: false,
			complete_promise: this.await_complete(tx),
		};
		return s;
	}
	/** @arg {IDBTransaction} tx @returns {Promise<Event>} */
	await_complete(tx) {
		return new Promise(function(accept,reject) {
			tx.addEventListener("abort",reject);
			tx.addEventListener("error",reject);
			tx.addEventListener("complete",accept);
		});
	}
	/** @arg {TypedIDBTransactionScope} scope @arg {Event} event */
	handle_transaction_complete(scope,event) {
		if(event.type!=="complete") throw new Error();
		const {type,timeStamp,target}=event;
		this.assert_assume_is(target,scope.tx);
		scope.is_tx_complete=true;
		// these are deprecated
		let dep_obj={
			srcElement: null,
			returnValue: null,
		}; dep_obj;
		// these are not on the ts interface for Event
		let not_ts={
			originalTarget: null,
			explicitOriginalTarget: null,
		}; not_ts;
		let null_after_dispatch={
			currentTarget: null,
		}; null_after_dispatch;
		if(event.target!==event.currentTarget) debugger;
		const {mode,error}=target;
		if(error!==null||mode!=="readwrite") {
			console.log("-- [tx_complete] --\nevent:%o\ntarget:%o\n",{
				type,
				timeStamp,
			},{
				mode,
				error,
			});
		}
	}
	/** @template {EventTarget} Base @arg {Base|null} x @template {Base} T @arg {T} y @returns {asserts x is T} */
	assert_assume_is(x,y) {if(x!==y) throw new Error();}
	/**
	 * @arg {TypedIndexedDB} tdb @template {DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes]} T @arg {TypedIDBObjectStore<T>} store @arg {T} value
	 * @returns {{type:"err";err:unknown}|{type:"ok";req:IDBRequest<IDBValidKey>}}
	 * */
	start_put_request(tdb,store,value) {
		try {
			return {type: "ok",req: tdb.put(store,value)};
		} catch(e) {
			console.log("failed to start put request",e);
			debugger;
			return {type: "err",err: e};
		}
	}
	/** @template {keyof DT_DatabaseStoreTypes} U @arg {{error_count:number;db:IDBDatabase;tx:IDBTransaction|null;obj_store:TypedIDBObjectStore<DT_DatabaseStoreTypes[U]>|null;typed_db:TypedIndexedDB;}} s @arg {DT_DatabaseStoreTypes[U]} value */
	async force_update(s,value) {
		if(!s.obj_store) throw new Error("No object store");
		let put_req=this.start_put_request(s.typed_db,s.obj_store,value);
		if(put_req.type==="err") {
			throw new AggregateError([put_req.err],"start error");
		}
		try {
			let ret=await this.get_async_result(put_req.req);
			return ret;
		} catch(e) {
			throw new AggregateError([e],"async error");
		}
	}
	/** @type {string[][]} */
	delayed_log_messages=[];
	/** @type {number|null} */
	delayed_log_idle_request_id=null;
	/** @arg {string[]} args */
	delayed_log(...args) {
		this.delayed_log_messages.push(args);
		this.delayed_log_idle_request_id=requestIdleCallback(() => {
			this.delayed_log_idle_request_id=null;
		});
	}
	/** @api @public @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {number} version */
	async open_database(key,version) {
		if(this.log_db_actions) console.log("open db");
		if(!this.has_loaded_keys) {
			console.log("[start_load_wait]");
			await this.on_loaded_resolver.promise;
			console.log("[load_wait_done]");
		}
		this.database_opening=true;
		let db=await this.get_async_result(this.get_db_request(version));
		this.database_opening=false;
		this.database_open=true;
		let typed_db=new TypedIndexedDB;
		let tx_scope=this.open_transaction_scope(typed_db,db,key,"readwrite");
		let s={
			error_count: 0,
			db,tx: tx_scope.tx,typed_db,
			/** @type {TypedIDBObjectStore<DT_DatabaseStoreTypes[U]>|null} */
			obj_store: null,
		};
		s.obj_store=typed_db.objectStore(s.tx,key);
		let [,d_cache]=this.get_data_cache(key);
		let no_null_cache=d_cache.filter(e => e!==null&&"type" in e&&!this.loaded_keys.has(e.key));
		let no_id_cache=no_null_cache.filter(e => e!==null&&!(e.tag==="a:save_id"||e.tag==="a:load_id"));
		if(no_id_cache.length===1) {
			console.log("[d_cache_nonnull.0]",no_id_cache[0]);
		} else if(no_id_cache.length===2) {
			console.log("[d_cache_nonnull.0]",no_id_cache[0]);
			console.log("[d_cache_nonnull.1]",no_id_cache[1]);
		} else if(no_id_cache.length>0) {
			console.log("[d_cache_nonnull.arr]",no_id_cache);
		}
		/** @type {G_BoxedIdObj[]} */
		let new_arr=[];
		/** @type {G_BoxedIdObj[]} */
		let same_arr=[];
		/** @type {G_BoxedIdObj[]} */
		let diff_arr=[];
		/** @arg {G_BoxedIdObj} x @arg {"new"|"same"|"diff"} changed */
		let commit_value=(x,changed) => {
			switch(changed) {
				case "new": new_arr.push(x); break;
				case "same": same_arr.push(x); break;
				case "diff": diff_arr.push(x); break;
			}
			this.committed_data.push(x);
			let idx=d_cache.indexOf(x);
			d_cache[idx]=null;
		};
		try {
			for(let item of d_cache) {
				if(tx_scope.is_tx_complete) {
					console.log("cursor_loop_is_tx_complete_0");
					break;
				}
				if(item===null) continue;
				if(this.committed_data.includes(item)) continue;
				if(this.loaded_keys.has(item.key)) {
					let db_val=this.loaded_map.get(item.key);
					/** @type {I_KnownLoaded|{key:string}} */
					let item2=item;
					if(!("tag" in item2)) throw new Error("Unreachable");
					if(!db_val) throw new Error("Unreachable");
					let cv=db_val.value;
					let c2=item2.value;
					switch(c2.type) {
						case "channel_id":
						case "playlist_id":
						case "video_id": {
							if(cv.type!==c2.type) throw new Error("Unreachable");
							if(cv.info_arr[0].raw_id===c2.info_arr[0].raw_id) {
								commit_value(item,"same");
								continue;
							}
						} break;
						case "number": {
							if(cv.type!==c2.type) throw new Error("Unreachable");
							if(cv.raw===c2.raw) {
								commit_value(item,"same");
								continue;
							}
						}
					}
					const {type,...y2}=db_val.value;
					console.log("[was_loaded_from_db] [type=%s]",type,y2);
				}
				let cursor_req=typed_db.openCursor(s.obj_store,TypedIDBValidKeyS.only(item.key));
				if(tx_scope.is_tx_complete) {
					console.log("cursor_loop_is_tx_complete_1");
					break;
				}
				const cur_cursor=await this.get_async_result(cursor_req);
				if(cur_cursor===null) {
					if(this.log_db_actions) console.log("[db_cursor.done]",cur_cursor);
					if(this.log_db_actions) console.log("[update_sync_cache_item_add_to_db]",item);
					if(tx_scope.is_tx_complete) {
						console.log("cursor_loop_is_tx_complete_2");
						break;
					}
					let put_req=typed_db.put(s.obj_store,item);
					await this.get_async_result(put_req);
					commit_value(item,"new");
					continue;
				}
				const item_db_2=cur_cursor.value;
				if(this.log_db_actions) console.log("[db_cursor.continue]",cur_cursor,item_db_2);
				let idx=d_cache.indexOf(item);
				d_cache[idx]=null;
				if(item_db_2.key!==item.key) {
					console.log(item_db_2.key.split(":"));
					console.log(item.key.split(":"));
					debugger;
				}
				let update_item=false;
				/** @type {G_BoxedIdObj} */
				let item_nt=item;
				/** @type {G_BoxedIdObj} */
				let item_db_nt=item_db_2;
				switch(item_nt.tag) {
					default: {
						if(item_db_nt.key!==item_nt.key) {update_item=true; break;}
						let info1=item_nt.value.info_arr[0]; let info2=item_db_nt.value.info_arr[0];
						if("raw_id" in info1&&"raw_id" in info2) {
							if(info1.raw_id!==info2.raw_id) update_item=true;
						}
						if("tag" in info1&&"tag" in info2) {
							if(info1.value.info_arr[0].raw_id!==info2.value.info_arr[0].raw_id) {
								update_item=true;
							}
						}
					} break;
					case "a:save_id":
					case "a:load_id":
					case "a:update_id": {
						if(this.log_db_actions) console.log("[sync_cache.id_obj]",item);
						if(item_db_nt.type!==item_nt.type) {update_item=true; break;}
						if(!item_db_nt.value) {update_item=true; break;}
						if(item_nt.key===item_db_nt.key&&item_nt.value.raw===item_db_nt.value.raw) break;
						update_item=true;
					} break;
					// non-dynamic values
					case "hashtag_id": {
						if(item_db_nt.type!==item_nt.type) {update_item=true; break;}
						if(item_db_nt.key!==item_nt.key) {update_item=true; break;}
						if(item_nt.value.hashtag===item_db_nt.value.hashtag) {update_item=true; break;}
					} break;
					case "key": {
						if(item_db_nt.type!==item_nt.type) break;
						if(item_db_nt.key!==item_nt.key) {update_item=true; break;}
						if(item_nt.value.info_arr[0].start_radio===item_db_nt.value.info_arr[0].start_radio) {update_item=true; break;}
					} break;
					case "exact:play_next": {
						if(item_db_nt.type!==item_nt.type) break;
						if(item_db_nt.key!==item_nt.key) {update_item=true; break;}
						if(item_nt.value.type!==item_db_nt.value.type) {update_item=true; break;}
						if(item_nt.value.tag!==item_db_nt.value.tag) {update_item=true; break;}
						if(item_nt.value.info_arr[0].raw_id!==item_db_nt.value.info_arr[0].raw_id) {update_item=true; break;}
					} break;
					case "video_time": {
						if(item_db_nt.type!==item_nt.type) break;
						if(item_db_nt.key!==item_nt.key) {update_item=true; break;}
						if(item_nt.value.type===item_db_nt.value.type) break;
						if(item_nt.value.raw_value===item_db_nt.value.raw_value) break;
						update_item=true;
					} break;
					case "bigint":
					case "boolean":
					case "keys":
					case "number":
					case "root_visual_element":
					case "string": {
						if(item_db_nt.key!==item_nt.key) {update_item=true; break;}
						let info1=item_nt.value.info_arr[0]; let info2=item_db_nt.value.info_arr[0];
						if(info1 instanceof Array&&info2 instanceof Array) {
							let v1=info1[1]; let v2=info2[1];
							let v1_many=null; let v2_many=null;
							let v1_arr=null; let v2_arr=null;
							let v1_one=null; let v2_one=null;
							if(v1 instanceof Array) for(let item of v1) {
								if(item instanceof Array) {
									if(!v1_many) v1_many=[];
									v1_many.push(item);
								} else {
									if(!v1_arr) v1_arr=[];
									v1_arr.push(item);
								}
							}
							if(v2 instanceof Array) for(let item of v2) {
								if(item instanceof Array) {
									if(!v2_many) v2_many=[];
									v2_many.push(item);
								} else {
									if(!v2_arr) v2_arr=[];
									v2_arr.push(item);
								}
							}
							if(!(v1 instanceof Array)) v1_one=v1;
							if(!(v2 instanceof Array)) v2_one=v2;
							if(v1_one!==null&&v2_one!==null) {
								if(v1_one===v2_one) break;
								debugger;
							}
							if(v1_arr!==null&&v2_arr!==null) {
								if(this.eq_keys(v1_arr,v2_arr)) break;
								debugger;
							}
							if(v1_one!==null) debugger;
							if(v1_many!==null) debugger;
							if(v1_arr!==null) debugger;
							update_item=true;
						}
					} break;
				}
				if(update_item) {
					await this.force_update(s,item);
					commit_value(item,"diff");
				} else {
					commit_value(item,"same");
				}
			}
		} catch(e) {
			s.tx.abort();
			throw e;
		} finally {
			let complete_event=await tx_scope.complete_promise;
			this.handle_transaction_complete(tx_scope,complete_event);
			this.database_open=false;
			if(this.log_db_actions) console.log("close db");
			if(no_id_cache.length>0) {
				console.log(
					"[committed_cache_num] [ init:%o] [ same:%o] [ diff:%o] [ new:%o] [ committed:%o]",
					no_id_cache.length,
					same_arr.length,diff_arr.length,new_arr.length,
					this.committed_data.length
				);
				console.log("[db_new]",new_arr);
				console.log("[db_same]",same_arr);
				console.log("[db_diff]",diff_arr);
				debugger;
			}
			this.committed_data=[];
		}
	}
	/**
	 * @arg {K} key @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @template {T["key"]} KA @arg {KA} store_key
	 * @template {Extract<T,{key:KA}>} T2
	 * @arg {number} version
	 * @returns {Promise<T2|null>}
	 * */
	async get(key,store_key,version) {
		let typed_db=new TypedIndexedDB;
		let db=await this.get_async_result(this.get_db_request(version));
		const tx=typed_db.transaction(db,key,"readonly");
		/** @type {TypedIDBObjectStore<T2>} */
		const obj_store=typed_db.objectStore(tx,key);
		let result=await this.get_async_result(typed_db.get(obj_store,store_key));
		return result;
	}
	/** @type {(keyof DT_DatabaseStoreTypes)[]} */
	get_all_waiting_keys=[];
	/** @type {([keyof DT_DatabaseStoreTypes,Promise<DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes][]>])[]} */
	waiting_promises=[];
	/** @template {keyof DT_DatabaseStoreTypes} K @arg {K} key @arg {number} version */
	async getAll(key,version) {
		let typed_db=new TypedIndexedDB;
		let db=await this.get_async_result(this.get_db_request(version));
		const tx=typed_db.transaction(db,key,"readonly");
		const obj_store=typed_db.objectStore(tx,key);
		let result=await this.get_async_result(typed_db.getAll(obj_store));
		return result;
	}
	log_cache_push=false;
	/** @template {keyof DT_DatabaseStoreTypes} T @arg {T} key @returns {Map<string,number>} */
	get_cache_index(key) {
		/** @type {[T,Map<string,number>]|undefined} */
		let c_index=this.store_cache_index[key];
		if(c_index) return c_index[1];
		c_index=[key,new Map];
		/** @type {{[R in T]?: [R,Map<string,number>]}} */
		let sk_ac=this.store_cache_index;
		sk_ac[key]=c_index;
		return c_index[1];
	}
	/** @api @public @template {keyof DT_DatabaseStoreTypes} T @arg {T} type_key @arg {DT_DatabaseStoreTypes[T]} obj */
	push_waiting_obj(type_key,obj) {
		const {key}=obj;
		let idx=this.add_to_index(type_key,key,obj);
		if(this.log_cache_push) console.log("push wait",type_key,key,idx,obj);
	}
	/** @template {keyof DT_DatabaseStoreTypes} T @arg {T} type_key @arg {DT_DatabaseStoreTypes[T]["key"]} key @arg {DT_DatabaseStoreTypes[T]} x */
	add_to_index(type_key,key,x,null_out_key=false) {
		let [,cache_arr]=this.get_data_cache(type_key);
		let cache_index=this.get_cache_index(type_key);
		let idx=cache_index.get(key);
		if(idx!==void 0) {
			if(!this.cache_weak_set.has(x)) {
				this.cache_weak_set.add(x);
				cache_arr[idx]=x;
			} else if(cache_arr[idx]!==null) {
				cache_arr[idx]=x;
			}
			if(null_out_key) {
				cache_arr[idx]=null;
			}
			return;
		}
		idx=cache_arr.push(x)-1;
		cache_index.set(key,idx);
		return idx;
	}
	log_all_events=false;
	close_db_on_transaction_complete=false;
	/** @protected @template {{}} T @arg {T} obj @returns {T_DistributedKeysOf_2<T>} */
	get_keys_of_2(obj) {
		if(!obj) {debugger;}
		let rq=Object.keys(obj);
		/** @private @type {any} */
		let ra=rq;
		return ra;
	}
	/** @template T @arg {IDBRequest<T>} request @returns {Promise<Event>} */
	await_success(request) {
		return new Promise(function(accept,reject) {
			request.onsuccess=(value) => {
				accept(value);
			};
			request.onerror=(event) => {
				console.log("await_success error",event);
				reject(event);
			};
		});
	}
	/**
	 * @template {keyof DT_DatabaseStoreTypes} K
	 * @template {DT_DatabaseStoreTypes[K]} T
	 * @arg {IDBTransaction} tx
	 * @arg {K} key
	 * @arg {IDBDatabase} db
	 */
	async transfer_store(tx,key,db) {
		let typed_db=new TypedIndexedDB;
		const src_obj_store=typed_db.objectStore(tx,key);
		/** @private @type {IDBRequest<T[]>} */
		let get_all_video_id_req=src_obj_store.getAll();
		await this.await_success(get_all_video_id_req);
		const video_id_result=get_all_video_id_req.result;
		db.deleteObjectStore(key);
		const dst_obj_store=db.createObjectStore(key,{keyPath: "key"});
		dst_obj_store.createIndex(key,"key",{unique: true});
		for(let x of video_id_result) dst_obj_store.put(x);
	}
	/** @template {keyof DT_DatabaseStoreTypes} K @arg {K} key @arg {IDBDatabase} db */
	create_store(key,db) {
		let obj_store=db.createObjectStore(key,{keyPath: "key"});
		obj_store.createIndex(key,"key",{unique: true});
	}
	/** @private @arg {IDBOpenDBRequest} request @arg {IDBVersionChangeEvent} event */
	onUpgradeNeeded(request,event) {
		if(this.log_all_events) console.log("IDBOpenDBRequest: oldVersion",event.oldVersion);
		const {result: db,transaction: tx}=request;
		if(!tx) throw new Error("No transaction");
		this.x.get("handle_types").indexed_db_createDatabaseSchema(this,event.oldVersion,db);
	}
	database_diff_keys=new Set;
	/** @template T @arg {IDBRequest<T>} req @returns {Promise<["success",T]|["error",Event,DOMException]>} */
	async get_async_result_impl(req) {
		if(req.readyState==="done") return ["success",req.result];
		/** @type {[Event,DOMException]|null} */
		let error_event=null;
		try {
			await this.await_success(req);
		} catch(/**@type {any} */e) {
			if(req.error!==null) error_event=[e,req.error];
			else throw e;
		}
		if(error_event!==null) return ["error",...error_event];
		return ["success",req.result];
	}
	/** @template T @arg {IDBRequest<T>} req @returns {Promise<T>} */
	async get_async_result(req) {
		let res=await this.get_async_result_impl(req);
		if(res[0]==="error") {
			let [,event,error]=res;
			if(event.type!=="error") throw new AggregateError([event,error]);
			throw error;
		}
		return res[1];
	}
	/** @template {{key:string}} T @arg {Set<string>} key_set @arg {T[]} x */
	get_diff_by_key(key_set,x) {
		let diff_arr=[];
		for(let item of x) {
			if(key_set.has(item.key)) continue;
			key_set.add(item.key);
			diff_arr.push(item);
		}
		return diff_arr;
	}
	/** @arg {number} version */
	async database_diff(version) {
		let typed_db=new TypedIndexedDB;
		let ret={};
		ret.db=await this.get_async_result(this.get_db_request(version));
		let tx=typed_db.transaction(ret.db,"boxed_id","readonly");
		ret.store=typed_db.objectStore(tx,"boxed_id");
		ret.store_data=await this.get_async_result(typed_db.getAll(ret.store));
		ret.store_diff=this.get_diff_by_key(this.database_diff_keys,ret.store_data);
		return ret;
	}
	async database_diff_console_example() {
		let [set_p]=await Promise.allSettled([(async () => {
			let yt_plugin=window.yt_plugin;
			if(!yt_plugin) throw new Error();
			let idb=yt_plugin.indexed_db;
			return idb.database_diff(3);
		})()]);
		if(set_p.status==="rejected") {
			console.log(set_p.reason);
			return;
		}
		let res=set_p.value;
		console.log(res.store_diff);
	}
}
export_(exports => {
	exports.__module_loaded__=true;
	exports.IndexedDBService=IndexedDBService;
});
