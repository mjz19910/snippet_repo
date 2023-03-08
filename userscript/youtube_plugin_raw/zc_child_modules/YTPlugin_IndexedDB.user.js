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

const {do_export,as,BaseService,split_string_once,as_any}=require("./YtPlugin_Base.user");

const __module_name__="mod$IndexedDBService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
/** @type {J_ResolverTypeHelpers['assume_changed_state']} */
function assume_changed_state(_cls,_state) {return true;}
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
class J_ResolverTypeImpl {
	static make() {
		let instance=new this();
		return instance.as_ready;
	}
	/** @readonly */
	state="init";
	/** @type {Promise<void>|null} */
	promise=null;
	/** @type {((value:void|PromiseLike<void>)=>void)|null} */
	resolve=null;
	/** @type {((reason?:any)=>void)|null} */
	reject=null;
	constructor() {
		this.promise=new Promise((resolve,reject) => {
			this.resolve=resolve;
			this.reject=reject;
		});
	}
	get as_ready() {
		/** @returns {J_ResolverType} */
		let get_any_cls=() => this;
		let cls=get_any_cls();
		change_state(cls,"ready");
		return cls;
	}
}
function h_detect_firefox() {
	let ua=navigator.userAgent;
	return ua.includes("Gecko/")&&ua.includes("Firefox/");
}
const is_firefox=h_detect_firefox(); is_firefox;
class TypedIndexedDB {
	/** @arg {IDBDatabase} db @arg {"boxed_id"} storeNames @arg {IDBTransactionMode} mode */
	transaction(db,storeNames,mode) {return db.transaction(storeNames,mode);}
	/** @template {"boxed_id"} K @arg {TypedIDBObjectStore<DT_DatabaseStoreTypes[K]>} obj_store @arg {TypedIDBValidKey<DT_DatabaseStoreTypes[K]["key"]>|TypedIDBKeyRange<DT_DatabaseStoreTypes[K]["key"]>} [query] @arg {IDBCursorDirection} [direction] @returns {IDBRequest<TypedIDBCursorWithValue<DT_DatabaseStoreTypes[K]>|null>} */
	openCursor(obj_store,query,direction) {
		if(query) {
			if(query.type==="key") {
				return obj_store.openCursor(query.key,direction);
			}
			return obj_store.openCursor(query.key_range,direction);
		}
		return obj_store.openCursor(query,direction);
	}
	/** @arg {IDBTransaction} tx @arg {K} key @template {"boxed_id"} K @template {DT_DatabaseStoreTypes[K]} T @returns {TypedIDBObjectStore<T>} */
	objectStore(tx,key) {
		let rq=tx.objectStore(key);
		return as(rq);
	}
	/** @template {"boxed_id"} K @template {DT_DatabaseStoreTypes[K]} T @arg {T["key"]} key @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<T|null>} */
	get(store,key) {return store.get(key);}
	/** @template {{}} T @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<T[]>} */
	getAll(store) {return store.getAll();}
	/** @template {"boxed_id"} K @template {DT_DatabaseStoreTypes[K]} T @arg {T} value @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<IDBValidKey>} */
	put(store,value) {return store.put(value);}
	/** @template {"boxed_id"} K @template {DT_DatabaseStoreTypes[K]} T @arg {T} value @arg {TypedIDBObjectStore<T>} store @returns {IDBRequest<IDBValidKey>} */
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
	/** @returns {J_ResolverType_Ready} */
	create_resolver() {return J_ResolverTypeImpl.make();}
	/** @template {"boxed_id"} K @arg {K} key @arg {IDBDatabase} db */
	create_store(key,db) {
		let obj_store=db.createObjectStore(key,{keyPath: "key"});
		obj_store.createIndex(key,"key",{unique: true});
	}
	database_opening=false;
	database_open=false;
	log_db_actions=false;
	log_all_events=false;
	close_db_on_transaction_complete=false;
	has_loaded_keys=false;
	log_cache_push=false;
	log_failed=true;
	//#region number
	expected_id=0;
	expected_save_id=0;
	expected_load_id=0;
	/** @type {number|null} */
	delayed_log_idle_request_id=null;
	//#endregion
	/** @type {Promise<void>|null} */
	open_db_promise=null;
	/** @type {Promise<{type:"success"}|{type:"failure"}>|null} */
	db_wait_promise=null;
	/** @type {Map<"boxed_id",string[]>} */
	cached_data=new Map;
	/** @private @type {Map<string,number>} */
	store_cache_index=new Map;
	cache_index() {return this.store_cache_index;}
	/** @type {Map<string,G_BoxedIdObj>} */
	loaded_map=new Map;
	/** @type {Set<string>} */
	loaded_keys=new Set;
	/** @type {Set<string>} */
	database_diff_keys=new Set;
	/** @type {WeakSet<CacheSetItems>} */
	cache_weak_set=new WeakSet;
	/** @private @type {G_BoxedIdObj[]} */
	committed_data=[];
	/** @private @type {DA_CacheInfoType} */
	store_cache=[];
	cache() {return this.store_cache;}
	/** @type {string[][]} */
	delayed_log_messages=[];
	/** @type {Promise<G_BoxedIdObj[]>[]} */
	waiting_promises=[];
	on_loaded_resolver=J_ResolverTypeImpl.make();
	check_size() {
		let arr=this.cache();
		if(arr.length!==arr.reduce((r) => r+1,0)) {debugger;}
	}
	/** @template {G_BoxedIdObj} T @arg {T} x @arg {number} version @returns {Promise<T|null>} */
	put_box(x,version) {return this.put("boxed_id",x,version);}
	/** @arg {number} version @returns {Promise<DST_LoadId|null>} */
	async get_load_id(version) {
		const t_key="boxed_id:load_id";
		let box=await this.get("boxed_id",t_key,version);
		return box;
	}
	/** @arg {number} version @returns {Promise<DST_SaveId|null>} */
	async get_save_id(version) {
		const t_key="boxed_id:save_id";
		let box=await this.get("boxed_id",t_key,version);
		return box;
	}
	/** @arg {StoreData} store @arg {number} version */
	async load_store_from_database(store,version) {
		/** @type {G_BoxedIdObj[]} */
		let boxed;
		try {
			boxed=await this.getAll("boxed_id",version);
		} catch {
			this.has_loaded_keys=true;
			this.on_loaded_resolver.resolve();
			return;
		}
		for(let item of boxed) await this.load_store(store,item,version);
		this.has_loaded_keys=true;
		this.on_loaded_resolver.resolve();
	}
	/** @template {G_BoxedIdObj} T @arg {T} x @arg {number} version @returns {Promise<T>} */
	async update_obj_schema(x,version) {
		/** @type {G_BoxedIdObj} */
		let ret=x;
		x: if(!x.z) {
			/** @type {{key:DST_LoadId["key"],tag:string,value?: {raw:number}}} */
			let o1=as_any(x);
			if(o1.value&&o1.value.raw&&o1.tag) {
				const jl={b: "boxed_id",j: o1.tag,key: x.key,z: [{type: "number",z: [o1.value.raw]}]};
				ret=as_any(jl);
				break x;
			}
			/** @type {FromDbData} */
			let o2=as_any(x);
			if(!o2.value) {debugger; return x;}
			switch(o2.tag) {
				default: debugger; break;
				case "number": break;
				case "channel_id:UC": {
					const {key,tag,value}=o2;
					/** @type {DI_A_ChannelId_UC} */
					let bt=this.make_abcz(value.type,value.tag,[
						this.make_akz("raw_id",this.make_prim_v(value.info_arr[0].raw_id)),
						this.make_akz("id",this.make_prim_v(value.info_arr[1].id)),
					]);
					/** @type {DST_Channel_UC} */
					const z=this.make_ST_jz(key,tag,bt); ret=z; break x;
				}
				case "keys": break;
				case "string": break;
				case "video_id": {
					const {key,tag,value}=o2;
					/** @type {DI_A_VideoId} */
					let bt=this.make_abwz(value.type,this.make_akz("raw_id",this.make_prim_v(value.info_arr[0].raw_id)));
					/** @type {DST_Video_Id} */
					const z=this.make_ST_jz(key,tag,bt); ret=z; break x;
				}
				case "playlist_id:RD": {
					const {key,value}=o2;
					/** @type {DI_A_Playlist_RD} */
					let bt=this.make_abcz("playlist_id","RD",[
						this.make_akz("raw_id",this.make_prim_v(value.info_arr[0].raw_id)),
						this.make_akz("id",this.make_prim_v(value.info_arr[1].id)),
					]);
					/** @type {DST_Playlist_RD} */
					const z=this.make_ST_jz(key,"playlist_id:RD",bt);
					ret=z;
					break x;
				}
			}
			const {key,value}=o2;
			if(!("info_arr" in value)) {
				debugger; return x;
			}
			let o_arr_t=value.info_arr[0];
			if(o_arr_t instanceof Array) {
				switch(o_arr_t[0]) {
					default: debugger; return x;
					case "many":
					case "arr":
					case "one": {
						const z1={a: "group_value",b: "item",c: o_arr_t[0],f: value.type,z: [o_arr_t[1]]};
						/** @type {DSS_Bigint["z"][0]} */
						const z2={a: "group",b: value.type,z: [as_any(z1)]};
						/** @type {DSS_Bigint} */
						let z={key: as_any(key),a: "SI:T:D",b: "boxed_id",d: "bigint",w: "/key/a/b/d/w/z",z: [z2]};
						ret=as_any(z);
						break x;
					}
				}
			}
			debugger;
		} else {
			return x;
		}
		await this.delete("boxed_id",x.key,version);
		await this.direct_put("boxed_id",ret,version);
		return as_any(ret);
	}
	/** @arg {G_BoxedIdObj} x */
	store_cache_tree(x) {
		this.loaded_keys.add(x.key);
		this.loaded_map.set(x.key,x);
		this.cache_weak_set.add(x);
		this.cache_depth_1(x.z[0]);
	}
	/** @arg {CacheTreeDepth1} x */
	cache_depth_1(x) {
		this.cache_weak_set.add(x);
		this.cache_depth_2(x.z[0]);
	}
	/** @arg {CacheTreeDepth2} x */
	cache_depth_2(x) {
		if(typeof x==="number") return;
		this.cache_weak_set.add(x);
		this.cache_depth_3(x.z[0]);
	}
	/** @arg {CacheTreeDepth3} x */
	cache_depth_3(x) {
		if(typeof x==="string") return;
		if(typeof x==="number") return;
		if(typeof x==="bigint") return;
		if(typeof x==="boolean") return;
		if(x instanceof Array) return this.cache_depth_3_arr(x);
		this.cache_depth_4(x.z[0]);
		this.cache_weak_set.add(x);
	}
	/** @arg {Extract<CacheTreeDepth3,any[]>} x */
	cache_depth_3_arr(x) {
		for(let v of x) this.cache_depth_3_iter(v);
	}
	/** @arg {Extract<CacheTreeDepth3,any[]>[0]} x */
	cache_depth_3_iter(x) {
		if(typeof x==="string") return;
		if(typeof x==="number") return;
		if(typeof x==="bigint") return;
		if(typeof x==="boolean") return;
		this.cache_depth_3_arr2(x);
	}
	/** @arg {Extract<CacheTreeDepth3,any[][]>[0]} x */
	cache_depth_3_arr2(x) {
		for(let v of x) this.cache_depth_3_iter2(v);
	}
	/** @arg {Extract<CacheTreeDepth3,any[][]>[0][0]} x */
	cache_depth_3_iter2(x) {
		if(typeof x==="string") return;
		if(typeof x==="number") return;
		if(typeof x==="bigint") return;
		if(typeof x==="boolean") return;
		debugger;
	}
	/** @arg {CacheTreeDepth4} x */
	cache_depth_4(x) {x;}
	/** @arg {StoreData} store @arg {G_BoxedIdObj} item @arg {number} version */
	async load_store(store,item,version) {
		this.add_to_index(item.key,item,true);
		item=await this.update_obj_schema(item,version);
		if(!item.z) return;
		this.store_cache_tree(item);
		/** @template {string} T @arg {{tag:T}} x */
		function get_tag(x) {return x.tag;}
		/** @template {{b:"boxed_id";tag:string;key:string;}} R @template {R} T @arg {T} x @returns {R} */
		function decay_item(x) {return x;}
		if("d" in item) {
			switch(item.d) {
				default: {
					let di=decay_item(item);
					switch(get_tag(item)) {
					}
					console.log("skip_tag",di.tag);
					debugger;
				} break;
				case "bigint": return store.get_store(item.d).load_data(item);
				case "boolean": return store.get_store(item.d).load_data(item);
				case "keys": return store.get_store(item.d).load_data(item);
				case "number": return store.get_store(item.d).load_data(item);
				case "root_visual_element": return store.get_store(item.d).load_data(item);
				case "string": return store.get_store(item.d).load_data(item);
			}
		}
	}
	/** @public @arg {StoreData} store @arg {number} version */
	async save_database(store,version) {
		let save_id=await this.get_save_id(version);
		if(!save_id) {
			this.expected_save_id=0;
			await this.put_boxed_id_async_3(version,"save_id",null,this.expected_save_id);
			save_id=await this.get_save_id(version);
			if(!save_id) throw new Error("null on get");
		}
		save_id=await this.update_obj_schema(save_id,version);
		if(save_id.z[0].z[0]!==this.expected_save_id) this.expected_save_id=save_id.z[0].z[0];
		await this.save_store_to_database(store,version);
		this.expected_save_id++;
		let save_res=await this.put_boxed_id_async_3(version,"save_id",null,this.expected_save_id);
		if(!save_res) {throw new Error("null on put");}
		save_res.ret;
	}
	/** @public @arg {StoreData} store @arg {number} version */
	async load_database(store,version) {
		let load_id=await this.get_load_id(version);
		if(!load_id) {
			this.expected_load_id=0;
			let put_promise=this.put_boxed_id_async_3(version,"load_id",null,this.expected_load_id);
			this.on_loaded_resolver.resolve();
			await put_promise;
			load_id=await this.get_load_id(version);
			if(!load_id) throw new Error("null on get");
		}
		load_id=await this.update_obj_schema(load_id,version);
		if(load_id.z[0].z[0]!==this.expected_load_id) this.expected_load_id=load_id.z[0].z[0];
		await this.load_store_from_database(store,version);
		this.expected_load_id++;
		let load_res=await this.put_boxed_id_async_3(version,"load_id",null,this.expected_load_id);
		if(!load_res) throw new Error("null on put");
		load_res.ret;
	}
	/** @template {G_StoreDescription} T @arg {T} store @arg {number} version */
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
	/** @template T @arg {make_item_group<T>} x @arg {T[]} _mt */
	uv_unpack_mt(x,_mt) {
		/** @type {MT_MakeSplitObj<T>} */
		const make={},nul=null;
		/** @type {{u:make_arr_t<T>|make_instance_name_t<T>|make_many_t<T>|make_one_t<T>|make_typeof_name_t<T>}} */
		const D_holder={};
		D_holder.u=x; make.arr=nul; make.instance_name=nul; make.many=nul; make.one=nul; make.typeof_name=nul;
		switch(x.c) {
			default: {
				/** @type {unknown} */
				let ux=x;
				if(typeof ux==="object"&&ux!==null&&"c" in ux&&typeof ux.c==="string") {
					/** @type {{[U in string]:{c:string}|null}} */
					let m_any=make;
					m_any[ux.c]={c: ux.c};
				}
			} break;
			case "one": make.one=x; break;
			case "many": make.many=x; break;
			case "arr": make.arr=x; break;
			case "instance_name": make.instance_name=x; break;
			case "typeof_name": make.typeof_name=x; break;
		}
		return make;
	}
	/** @template T @arg {make_item_group<T>} x */
	uv_unpack(x) {return this.uv_unpack_mt(x,[]);}
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
				let [type,tag,value]=args;
				/** @type {DST_Browse_MP} */
				const z={
					a: "ST:D",b: "boxed_id",j: `${type}:${tag}`,w: "/key/a/b/j/z",z: [value],
					key: `boxed_id:browse_id:${tag}:${value.z[1].z[0].z[0]}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "FE": {
				let [type,tag,value]=args;
				/** @type {DST_Browse_FE} */
				const z={
					a: "ST:D",b: "boxed_id",j: `${type}:${tag}`,w: "/key/a/b/j/w/z",z: [value],
					key: `boxed_id:${type}:${tag}:${value.z[1].z[0].z[0]}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "VL:LL": {
				let [type,tag,value]=args;
				let [tag1,]=split_string_once(tag,":");
				let id=value.z[1].z[0].z[0].z[0];
				/** @type {DST_Browse_VL_LL} */
				const z={
					a: "ST:D",b: "boxed_id",j: `${type}:${tag1}`,z: [value],
					key: `boxed_id:${type}:${tag1}:${id}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "VL:WL": {
				let [type,tag,value]=args;
				let [tag1]=split_string_once(tag,":");
				let id=value.z[1].z[0].z[0].z[0];
				/** @type {DST_Browse_VL_WL} */
				const z={
					a: "ST:D",b: "boxed_id",j: `${type}:${tag1}`,z: [value],
					key: `boxed_id:${type}:${tag1}:${id}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "VL:PL": {
				let [type,tag,value]=args;
				let [tag1,tag2]=split_string_once(tag,":");
				let id=value.z[1].z[1].z[0].z[0];
				/** @type {DST_Browse_VL_PL} */
				const z={
					a: "ST:D",b: "boxed_id",j: `${type}:${tag1}:${tag2}`,z: [value],
					key: `boxed_id:${type}:${tag1}:${tag2}:${id}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "VL:UC": {
				let [type,tag,value]=args;
				let [tag1,tag2]=split_string_once(tag,":");
				let id=value.z[1].z[1].z[0].z[0];
				/** @type {DST_Browse_VL_UC} */
				const z={
					a: "ST:D",b: "boxed_id",j: `${type}:${tag1}:${tag2}`,z: [value],
					key: `boxed_id:${type}:${tag1}:${tag2}:${id}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "SP": {
				let [tag,id,value]=args;
				let promise=this.put_box({
					a: "ST:D",b: "boxed_id",j: `${tag}:${id}`,z: [value],
					key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`
				},version); return {args,promise};
			}
		}
	}
	/** @arg {number} version @template {Extract<Y_PutBoxedArgs,{0:"url_info"}>} T @arg {T} args */
	put_boxed_url_info(version,...args) {
		version; args;
		let [,,x]=args;
		switch(x.b) {
			default: debugger; throw new Error("Unreachable");
			case "key": {
				/** @type {DST_KeySection} */
				const z={
					a: "ST:D",b: "boxed_id",j: "key",k: x.z[0].k,w: "key/a/b/j/k/w/z",z: [x],
					key: `boxed_id:key:${x.z[0].k}:${x.z[0].z[0].z[0]}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "hashtag_id": {
				const {b: k,z: [w]}=x;
				/** @type {DI_HashtagId} */
				const a={a: "key_value",k,w: "/item/a/k/w/z",z: [w.z[0]]};
				/** @type {DST_HashtagId} */
				const z={
					a: "ST:D",b: "boxed_id",j: k,w: "/db/a/b/j/w/z",z: [a],
					key: `boxed_id:${k}:${x.z[0].z[0].z[0]}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "video_id": {
				const {b: j,w,z: [zi]}=x;
				/** @type {DI_A_VideoId} */
				const a={a: "DI:A",b: j,w,z: [zi]};
				/** @type {DST_Video_Id} */
				const z={
					a: "ST:D",b: "boxed_id",j,w: "/db/key/a/b/j/w/z",z: [a],
					key: `boxed_id:${j}:${x.z[0].z[0].z[0]}`,
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
		}
	}
	/** @template T @arg {T_Tag} j @arg {T_VTag} tag @arg {T} x @template {string} T_Tag @template {string} T_VTag	*/
	make_box_3(j,tag,x) {
		/** @type {`boxed_id:${T_Tag}:${T_VTag}`} */
		const key=`boxed_id:${j}:${tag}`;
		return this.make_ST_jz(key,j,x);
	}
	/** @template A4 @arg {A1} a1 @arg {A2} a2 @arg {A3} tag @arg {A4} x @template {string} A1 @template {string} A2 @template {string} A3	*/
	make_box_4(a1,a2,tag,x) {
		/** @type {`${A1}:${A2}`} */
		const j=`${a1}:${a2}`;
		return this.make_box_3(j,tag,x);
	}
	/** @arg {K} key @arg {A} a @arg {D} d @arg {T} x @template {string} K @template {string} A @template {string} D @template T @returns {T_BoxStore_adz<K,A,D,T>} */
	make_BoxStore_adz(key,a,d,x) {return {key,a,b: "boxed_id",d,w: "/key/a/b/d/w/z",z: [x]};}
	/** @template {string} T_Tag1 @template {string} T_Tag2 @arg {T_Tag1} tag1 @arg {T_Tag2} tag2 @template T @template {DIZ_Item_AB<T_Tag2,T>} V @arg {V} x @returns {DSI_T_Item_ABD2<T_Tag1,T_Tag2,V>} */
	make_T_BoxedStore(tag1,tag2,x) {return this.make_BoxStore_adz(`boxed_id:${tag1}:${tag2}`,"boxed_store",tag1,x);}
	/** @template {string} T_Tag1 @template {string} T_Tag2 @arg {T_Tag1} tag1 @arg {T_Tag2} tag2 @template T @template {DIZ_Item_AB<T_Tag2,T>} V @arg {V} x @returns {DSI_T_Item_ABD2_v2<T_Tag1,T_Tag2,V>} */
	make_T_BoxedStore_v2(tag1,tag2,x) {return this.make_BoxStore_adz(`boxed_id:${tag1}:${tag2}`,"SI:T:D",tag1,x);}
	/** @template {string} B @arg {B} b @template T @arg {make_item_group<T>} x @returns {DIZ_Item_AB<B,T>} */
	DIZ_Item_AB(b,x) {return {a: "group",b,z: [x]};}
	/** @arg {number} version @template {Y_PutBoxedArgs} T @arg {T} args */
	put_boxed_id_3(version,...args) {
		const [k,,x]=args;
		switch(k) {
			default: k===""; switch((k)) {
			} debugger; throw new Error();
			case "browse_id": return this.put_boxed_pl(version,...args);
			case "url_info": return this.put_boxed_url_info(version,...args);
			case "key": {
				let [j,id]=args;
				/** @type {DST_KeySection} */
				const z={key: `boxed_id:${j}:${id}:${x.z[0].z[0].z[0]}`,a: "ST:D",b: "boxed_id",j,k: id,w: "key/a/b/j/k/w/z",z: [x]};
				return {args,promise: this.put_box(z,version)};
			}
			case "guide_entry_id": /*db*/ {
				let [tag]=args;
				switch(x.c) {
					default: x===""; throw new Error();
					case "LL": {
						/** @type {DST_GuideEntry_LL} */
						const z={a: "ST:D",b: "boxed_id",j: tag,key: `boxed_id:${tag}:${x.c}`,z: [x]};
						return {args,promise: this.put_box(z,version)};
					}
					case "WL": {
						/** @type {DST_GuideEntry_WL} */
						const z={key: `boxed_id:${tag}:${x.c}`,a: "ST:D",b: "boxed_id",j: tag,w: "key/a/b/w/j/z",z: [x]};
						return {args,promise: this.put_box(z,version)};
					}
					case "PL": {
						let iv=x.z[0];
						/** @type {DST_GuideEntry_PL} */
						const z={a: "ST:D",b: "boxed_id",j: tag,key: `boxed_id:${tag}:${iv.c}:${iv.z[1].z[0].z[0]}`,z: [x]};
						return {args,promise: this.put_box(z,version)};
					}
					case "UC": {
						let iv=x.z[0];
						/** @type {DST_GuideEntry_UC} */
						const z={a: "ST:D",b: "boxed_id",j: tag,key: `boxed_id:${tag}:${iv.c}:${iv.z[1].z[0].z[0]}`,z: [x]};
						return {args,promise: this.put_box(z,version)};
					}
					case "VL:LL": {
						/** @type {DST_GuideEntry_VL_LL} */
						const z={a: "ST:D",b: "boxed_id",j: tag,key: `boxed_id:${tag}:${x.c}`,z: [{a: "DI",b: "guide_entry_id",c: "VL:LL",z: [x]}]};
						return {args,promise: this.put_box(z,version)};
					}
				}
			}
			case "video_id": {
				let [,v,x]=args;
				/** @type {Pick<DST_Video_Id,"key">} */
				const kj={key: `boxed_id:${k}:${v}`};
				/** @type {DST_Video_Id} */
				const z=this.make_ST_jz(kj.key,"video_id",x);
				return {args,promise: this.put_box(z,version)};
			}
			case "user_id": {
				const x=args[2];
				/** @type {Pick<DST_User_Id,"key">} */
				const kj={key: `boxed_id:${k}:${x.z[0].z[0].z[0]}`};
				/** @type {DST_User_Id} */
				const z=this.make_ST_jz(kj.key,"user_id",x);
				return {args,promise: this.put_box(z,version)};
			}
			case "play_next": {
				const x=args[2];
				/** @type {Pick<DST_PlayNext,"key">} */
				const kj={key: `boxed_id:${k}:${x.z[0].z[0].z[0]}`};
				/** @type {DST_PlayNext} */
				const z=this.make_ST_jz(kj.key,"play_next",x);
				return {args,promise: this.put_box(z,version)};
			}
			case "playlist_id": {
				switch(args[1]) {
					default: debugger; throw new Error();
					case "LL": {
						let [,v,x]=args;
						/** @type {Pick<DST_Playlist_LL,"key"|"j">} */
						const kj={key: `boxed_id:${k}:${v}`,j: `${k}:${v}`};
						/** @type {DST_Playlist_LL} */
						const z=this.make_ST_jz(kj.key,kj.j,x);
						return {args,promise: this.put_box(z,version)};
					}
					case "WL": {
						let [tag,id,value]=args;
						/** @type {Pick<DST_Playlist_WL,"key"|"j">} */
						const kj={key: `boxed_id:${tag}:${id}`,j: `${tag}:${id}`};
						/** @type {DST_Playlist_WL} */
						const z=this.make_ST_jz(kj.key,kj.j,value);
						return {args,promise: this.put_box(z,version)};
					}
					case "PL": {
						let [tag,id,value]=args;
						/** @type {Pick<DST_Playlist_PL,"key"|"j">} */
						const kj={key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`,j: `${tag}:${id}`};
						/** @type {DST_Playlist_PL} */
						const z=this.make_ST_jz(kj.key,kj.j,value);
						return {args,promise: this.put_box(z,version)};
					}
					case "RD": {
						let [tag,id,value]=args;
						/** @type {Pick<DST_Playlist_RD,"key"|"j">} */
						const kj={key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`,j: `${tag}:${id}`};
						/** @type {DST_Playlist_RD} */
						const z=this.make_ST_jz(kj.key,kj.j,value);
						const r={args,promise: this.put_box(z,version)}; r;
						return {args,promise: this.put_box(z,version)};
					}
					case "RD:MM": {
						let [tag,id,value]=args;
						/** @type {Pick<DST_Playlist_RD_MM,"key"|"j">} */
						const kj={key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`,j: `${tag}:${id}`};
						/** @type {DST_Playlist_RD_MM} */
						const z=this.make_ST_jz(kj.key,kj.j,value);
						return {args,promise: this.put_box(z,version)};
					}
					case "RD:CM:UC": {
						let [tag,id,value]=args;
						/** @type {Pick<DST_Playlist_RD_CM_UC,"key"|"j">} */
						const kj={key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`,j: `${tag}:${id}`};
						/** @type {DST_Playlist_RD_CM_UC} */
						const z=this.make_ST_jz(kj.key,kj.j,value);
						return {args,promise: this.put_box(z,version)};
					}
				}
			}
			case "hashtag_id": {
				let [tag,,value]=args;
				/** @type {DST_HashtagId} */
				const z=this.make_box_3(tag,value.z[0].z[0],value);
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "channel_id": {
				let [tag,,value]=args;
				/** @type {DST_Channel_UC} */
				const z=this.make_box_4(tag,value.c,value.z[1].z[0].z[0],value);
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "video_time": {
				let [tag,,value]=args;
				const z=this.make_box_3(tag,value.z[0].z[0],value);
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "bigint": {
				const [tag,,[id,value]]=args;
				/** @type {DSS_Bigint} */
				const z={
					a: "SI:T:D",
					/** @type {"boxed_id"} */
					b: "boxed_id",d: tag,
					/** @type {`boxed_id:${typeof tag}:${typeof id}`} */
					key: `boxed_id:${tag}:${id}`,
					w: "/key/a/b/d/w/z",
					z: [{a: "group",b: id,z: [value]}]
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "boolean": {
				let [tag1,,[tag2,value]]=args;
				/** @type {DSS_Boolean["z"][0]} */
				let p1=this.DIZ_Item_AB(tag2,value);
				/** @type {DSS_Boolean} */
				const z={
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",z: [p1],
					key: `boxed_id:${tag1}:${tag2}`
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "number": {
				let [tag1,,[tag2,value]]=args;
				/** @type {DSS_Number["z"][0]} */
				let p1=this.DIZ_Item_AB(tag2,value);
				/** @type {DSS_Number} */
				const z={
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",z: [p1],
					key: `boxed_id:${tag1}:${tag2}`
				};
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "string": {
				let [tag1,,[tag2,value]]=args;
				/** @type {DSS_String} */
				const z=this.make_T_BoxedStore_v2(tag1,tag2,this.DIZ_Item_AB(tag2,value));
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "keys": {
				let [tag1,,[tag2,value]]=args;
				/** @type {DSS_Keys} */
				const z=this.make_T_BoxedStore_v2(tag1,tag2,this.DIZ_Item_AB(tag2,value));
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "root_visual_element": {
				let [tag1,,[tag2,value]]=args;
				/** @type {DSS_VE} */
				const z=this.make_T_BoxedStore_v2(tag1,tag2,this.DIZ_Item_AB(tag2,value));
				let promise=this.put_box(z,version); return {args,promise};
			}
			case "load_id": {
				let [j,,id]=args;
				/** @type {DST_LoadId} */
				const z2={a: "ST:D",b: "boxed_id",j,key: `boxed_id:${j}`,z: [{type: "number",z: [id]}]};
				return {args,promise: this.put_box(z2,version)};
			}
			case "save_id": {
				let [j,,id]=args;
				/** @type {DST_SaveId} */
				const z2={a: "ST:D",b: "boxed_id",j,key: `boxed_id:${j}`,z: [{type: "number",z: [id]}]};
				return {args,promise: this.put_box(z2,version)};
			}
			case "browse_id": {
				switch(args[1]) {
					case "FE": {
						let [tag,id,value]=args;
						/** @type {DST_Browse_FE} */
						const z={a: "ST:D",b: "boxed_id",j: `${tag}:${id}`,w: "/key/a/b/j/w/z",key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`,z: [value]};
						let promise=this.put_box(z,version); return {args,promise};
					}
					case "MP": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							a: "ST:D",b: "boxed_id",j: `${tag}:${id}`,w: "/key/a/b/j/z",z: [value],
							key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`
						},version); return {args,promise};
					}
					case "SP": {
						let [tag,id,value]=args;
						let promise=this.put_box({
							a: "ST:D",b: "boxed_id",j: `${tag}:${id}`,z: [value],
							key: `boxed_id:${tag}:${id}:${value.z[1].z[0].z[0]}`
						},version); return {args,promise};
					}
				}
			} throw new Error("end");
			case "bigint": {
				let [tag1,,[tag2,value]]=args;
				let promise=this.put_box({
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",
					key: `boxed_id:${tag1}:${tag2}`,
					z: [{a: "group",b: tag2,z: [value]}],
				},version); return {args,promise};
			}
			case "boolean": {
				let [tag1,,[tag2,value]]=args;
				let promise=this.put_box({
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",
					key: `boxed_id:${tag1}:${tag2}`,
					z: [{a: "group",b: tag2,z: [value]}],
				},version); return {args,promise};
			}
			case "number": {
				let [tag1,,[tag2,value]]=args;
				let promise=this.put_box({
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",
					key: `boxed_id:${tag1}:${tag2}`,
					z: [{a: "group",b: tag2,z: [value]}],
				},version); return {args,promise};
			}
			case "string": {
				let [tag1,,[tag2,value]]=args;
				let promise=this.put_box({
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",
					key: `boxed_id:${tag1}:${tag2}`,
					z: [{a: "group",b: tag2,z: [value]}],
				},version); return {args,promise};
			}
			case "keys": {
				let [tag1,,[tag2,value]]=args;
				let promise=this.put_box({
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",
					key: `boxed_id:${tag1}:${tag2}`,
					z: [{a: "group",b: tag2,z: [value]}],
				},version); return {args,promise};
			}
			case "root_visual_element": {
				let [tag1,,[tag2,value]]=args;
				let promise=this.put_box({
					a: "SI:T:D",b: "boxed_id",d: tag1,w: "/key/a/b/d/w/z",
					key: `boxed_id:${tag1}:${tag2}`,
					z: [{a: "group",b: tag2,z: [value]}],
				},version); return {args,promise};
			}
		}
	}
	/** @template {G_StoreDescription} T @arg {T} store @arg {T["data"][number]} item @arg {number} version */
	async push_store_item_to_database(store,item,version) {
		let [v_key,vi]=item;
		if(this.cache_weak_set.has(vi)) return {item,err: true};
		this.cache_weak_set.add(vi);
		switch(store.type) {
			default: debugger; break;
			case "bigint": {
				if(!this.is_vi_has_bigint(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.type,null,[v_key,vi]);
				return ret;
			}
			case "boolean": {
				if(!this.is_vi_has_bool(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.type,null,[v_key,vi]);
				return ret;
			}
			case "root_visual_element":
			case "number": {
				if(!this.is_vi_has_num(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.type,null,[v_key,vi]);
				return ret;
			}
			case "string": {
				if(!this.is_vi_has_str(vi)) break;
				let ret=await this.put_boxed_id_async_3(version,store.type,null,[v_key,vi]);
				return ret;
			}
			case "keys": {
				if(!(this.is_vi_has_str(vi)||this.is_vi_has_num(vi))) break;
				let ret=await this.put_boxed_id_async_3(version,store.type,null,[v_key,vi]);
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
		/** @arg {T} x @arg {T_GetTypeof<T>} ty */
		function t_check_typeof(x,ty) {return typeof x===ty;}
		switch(x.c) {
			default: debugger; throw new Error();
			case "one": const z1=x.z; return t_check_typeof(z1[0],ty);
			case "arr": const u=x.z,z2=u[0]; return z2.length===0||t_check_typeof(z2[0],ty);
			case "many": const b=x.z,m=b[0],z3=m[0]; return m.length===0||z3.length===0||t_check_typeof(z3[0],ty);
		}
	}
	/** @arg {TypedIndexedDB} typed_db @arg {"boxed_id"} key @arg {number} version */
	async open_rw_object_store(typed_db,key,version) {
		let db=await this.get_async_result(this.get_db_request(version));
		let s=this.open_transaction_scope(typed_db,db,key,"readwrite");
		return typed_db.objectStore(s.tx,key);
	}
	/** @arg {"boxed_id"} key @arg {string} query @arg {number} version */
	async delete(key,query,version) {
		let typed_db=new TypedIndexedDB;
		let obj_store=await this.open_rw_object_store(typed_db,key,version);
		return this.get_async_result(obj_store.delete(query));
	}
	/** @api @public @template {DT_DatabaseStoreTypes[U]} T @template {"boxed_id"} U @arg {U} key @arg {T} value @arg {number} version */
	async direct_put(key,value,version) {
		let typed_db=new TypedIndexedDB;
		let obj_store=await this.open_rw_object_store(typed_db,key,version);
		return this.get_async_result(obj_store.put(value));
	}
	/** @private @template {DT_DatabaseStoreTypes[U]} T @template {"boxed_id"} U @arg {U} key @arg {T} value @arg {number} version */
	async putImpl(key,value,version) {
		if(!value) {debugger; return value;}
		let cache=this.cached_data.get(key);
		let cache_key=value.key;
		if(cache===void 0) this.cached_data.set(key,cache=[]);
		if(cache.includes(cache_key)) return value;
		this.push_value(value);
		this.check_size();
		if(this.db_wait_promise) {
			let wait_result=await this.db_wait_promise;
			if(wait_result.type==="failure") return null;
			return value;
		}
		let resolver=J_ResolverTypeImpl.make();
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
	/** @api @public @template {G_BoxedIdObj} T @arg {"boxed_id"} key @arg {T} value @arg {number} version */
	async put(key,value,version) {
		x: if(this.loaded_keys.has(value.key)) {
			let loaded_value=this.loaded_map.get(value.key);
			if(value.b!=="boxed_id") {debugger; break x;}
			let nw=null;
			switch(value.a) {
				case "ST:D": {
					value.j;
				} break;
				case "SI:T:D": {
					switch(value.d) {
						default: debugger; break;
						case "bigint": break;
						case "boolean": break;
						case "keys": break;
						case "string": break;
						case "number": break;
						case "root_visual_element": break;
					}
				} break;
			}
			if(!("w" in value)) nw=value;
			y: if(nw!==null&&!("j" in nw)) {
				/** @type {{a:"boxed_store"}} */
				const no=nw;
				if(no.a!=="boxed_store") break y;
				console.log("[cache_outdated]",no);
			}
			if(nw!==null&&!("j" in nw)&&"d" in nw) {
				/** @type {{d:GST_DSS["d"]}} */
				const no=nw;
				switch(no.d) {
					default: debugger; break;
					case "bigint":
					case "boolean":
					case "keys":
					case "string":
					case "number":
					case "root_visual_element": console.log("[cache_outdated]",no); break;
				}
			}
			console.log("has loaded cache value",loaded_value,value);
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
	 * @arg {IDBDatabase} db @template {"boxed_id"} U @arg {U} key @arg {IDBTransactionMode} mode
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
	/** @arg {TypedIndexedDB} typed_db @arg {IDBDatabase} db @template {"boxed_id"} U @arg {U} key @arg {IDBTransactionMode} mode @returns {TypedIDBTransactionScope} */
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
	 * @arg {TypedIndexedDB} tdb @template {G_BoxedIdObj} T @arg {TypedIDBObjectStore<T>} store @arg {T} value
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
	/** @template {"boxed_id"} U @arg {{error_count:number;db:IDBDatabase;tx:IDBTransaction|null;obj_store:TypedIDBObjectStore<DT_DatabaseStoreTypes[U]>|null;typed_db:TypedIndexedDB;}} s @arg {DT_DatabaseStoreTypes[U]} value */
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
	/** @arg {string[]} args */
	delayed_log(...args) {
		this.delayed_log_messages.push(args);
		this.delayed_log_idle_request_id=requestIdleCallback(() => {
			this.delayed_log_idle_request_id=null;
		});
	}
	/** @api @public @template {"boxed_id"} U @arg {U} key @arg {number} version */
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
		let d_cache=this.cache();
		let no_null_cache=d_cache.filter(e => e!==null&&"type" in e&&!this.loaded_keys.has(e.key));
		/** @type {G_BoxedIdObj[]} */
		let new_arr=[];
		/** @type {G_BoxedIdObj[]} */
		let same_arr=[];
		/** @type {G_BoxedIdObj[]} */
		let diff_arr=[];
		/** @type {G_BoxedIdObj[]} */
		let unknown_arr=[];
		/** @arg {G_BoxedIdObj} x @arg {"new"|"same"|"diff"|"unknown"} changed */
		let commit_value=(x,changed) => {
			switch(changed) {
				case "new": new_arr.push(x); break;
				case "same": same_arr.push(x); break;
				case "diff": diff_arr.push(x); break;
				case "unknown": unknown_arr.push(x); break;
			}
			this.committed_data.push(x);
			let idx=d_cache.indexOf(x);
			d_cache[idx]=null;
		};
		try {
			for(let x_value of d_cache) {
				if(tx_scope.is_tx_complete) {
					console.log("cursor_loop_is_tx_complete_0");
					break;
				}
				if(x_value===null) continue;
				if(this.committed_data.includes(x_value)) continue;
				if(this.loaded_keys.has(x_value.key)) {
					let y_value=this.loaded_map.get(x_value.key); y_value;
				}
				let cursor_req=typed_db.openCursor(s.obj_store,TypedIDBValidKeyS.only(x_value.key));
				if(tx_scope.is_tx_complete) {
					console.log("cursor_loop_is_tx_complete_1");
					break;
				}
				const cur_cursor=await this.get_async_result(cursor_req);
				if(cur_cursor===null) {
					if(this.log_db_actions) console.log("[db_cursor.done]",cur_cursor);
					if(this.log_db_actions) console.log("[update_sync_cache_item_add_to_db]",x_value);
					let put_req=typed_db.put(s.obj_store,x_value);
					await this.get_async_result(put_req);
					commit_value(x_value,"new");
					continue;
				}
				const y_value=cur_cursor.value;
				if(this.log_db_actions) console.log("[db_cursor.continue]",cur_cursor,y_value);
				commit_value(x_value,"unknown");
				await this.force_update(s,x_value);
			}
		} catch(e) {
			s.tx.abort();
			throw e;
		} finally {
			let complete_event=await tx_scope.complete_promise;
			this.handle_transaction_complete(tx_scope,complete_event);
			this.database_open=false;
			if(this.log_db_actions) console.log("close db");
			if(no_null_cache.length>0) {
				console.log(
					"[committed_cache_num] [ init:%o] [ same:%o] [ diff:%o] [ new:%o] [ committed:%o]",
					no_null_cache.length,
					same_arr.length,diff_arr.length,new_arr.length,
					this.committed_data.length
				);
				console.log("[db_new]",new_arr);
				console.log("[db_same]",same_arr);
				console.log("[db_diff]",diff_arr);
			}
			this.committed_data=[];
		}
	}
	/**
	 * @param {K} key @template {"boxed_id"} K @template {DT_DatabaseStoreTypes[K]} T @template {T["key"]} KA @arg {KA} store_key
	 * @template {Extract<T,{key:KA}>} T2
	 * @param {number} version
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
	/** @template {"boxed_id"} K @arg {K} key @arg {number} version */
	async getAll(key,version) {
		let typed_db=new TypedIndexedDB;
		let db=await this.get_async_result(this.get_db_request(version));
		const tx=typed_db.transaction(db,key,"readonly");
		const obj_store=typed_db.objectStore(tx,key);
		let result=await this.get_async_result(typed_db.getAll(obj_store));
		return result;
	}
	/** @api @public @arg {G_BoxedIdObj} obj */
	push_value(obj) {
		const {key}=obj;
		let idx=this.add_to_index(key,obj);
		if(this.log_cache_push) console.log("push wait",key,idx,obj);
	}
	/** @arg {G_BoxedIdObj["key"]} key @arg {G_BoxedIdObj} x */
	add_to_index(key,x,null_out_key=false) {
		let cache_arr=this.cache();
		let cache_index=this.cache_index();
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
	/** @private @arg {IDBOpenDBRequest} request @arg {IDBVersionChangeEvent} event */
	onUpgradeNeeded(request,event) {
		if(this.log_all_events) console.log("IDBOpenDBRequest: oldVersion",event.oldVersion);
		const {result: db,transaction: tx}=request;
		if(!tx) throw new Error("No transaction");
		this.x.get("handle_types").indexed_db_createDatabaseSchema(this,event.oldVersion,db);
	}
	/** @private @template T @arg {IDBRequest<T>} req @returns {Promise<["success",T]|["error",Event,DOMException]>} */
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
	/** @private @template T @arg {IDBRequest<T>} req @returns {Promise<T>} */
	async get_async_result(req) {
		let res=await this.get_async_result_impl(req);
		if(res[0]==="error") {
			let [,event,error]=res;
			if(event.type!=="error") throw new AggregateError([event,error]);
			throw error;
		}
		return res[1];
	}
	/** @private @template {{key:string}} T @arg {Set<string>} key_set @arg {T[]} x */
	get_diff_by_key(key_set,x) {
		let diff_arr=[];
		for(let item of x) {
			if(key_set.has(item.key)) continue;
			key_set.add(item.key);
			diff_arr.push(item);
		}
		return diff_arr;
	}
	/** @private @arg {number} version */
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
