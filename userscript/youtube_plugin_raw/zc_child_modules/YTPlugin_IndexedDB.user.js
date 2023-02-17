// ==UserScript==
// @name	YTPlugin IndexedDb Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_IndexedDB.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_IndexedDB.user.js
// ==/UserScript==
const __module_name__="mod$IndexedDBService";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
function h_detect_firefox() {
	let ua=navigator.userAgent;
	return ua.includes("Gecko/")&&ua.includes("Firefox/");
}
const is_firefox=h_detect_firefox(); is_firefox;
const BaseService=required(store.mod$YoutubePluginBase).BaseService;
const as_any=required(store.mod$YoutubePluginBase).as_any; as_any;
const as=bs.as_;
/** @extends {BaseService<ServiceLoader,ServiceOptions>} */
class IndexedDBService extends BaseService {
	/** @constructor @public @arg {ResolverT<ServiceLoader, ServiceOptions>} x */
	constructor(x) {
		super(x);
		/** @type {DT_DatabaseStoreKeys} */
		let keys=["video_id","hashtag_id","boxed_id","channel_id","playlist_id","browse_id"];
		for(let key of keys) {
			/** @template {keyof DT_DatabaseStoreTypes} R @arg {{[_ in R]?: [R,Map<string,number>]}} s @arg {R} k @arg {[R,Map<string,number>]} v */
			function create_cache_index(s,k,v) {s[k]=v;}
			/** @template {keyof DT_DatabaseStoreTypes} R @arg {{[_ in R]?: [R,DT_DatabaseStoreTypes[R][]]}} s @arg {R} k @arg {[R,DT_DatabaseStoreTypes[R][]]} v */
			function create_cache(s,k,v) {s[k]=v;}
			create_cache_index(this.store_cache_index,key,[key,new Map]);
			create_cache(this.store_cache,key,[key,[]]);
		}
	}
	database_opening=false;
	database_open=false;
	/** @private @type {{[R in keyof DT_DatabaseStoreTypes]?: [R,Map<string,number>]}} */
	store_cache_index={};
	/** @private @type {{[R in keyof DT_DatabaseStoreTypes]?: [R,DT_DatabaseStoreTypes[R][]]}} */
	store_cache={};
	/** @template {keyof DT_DatabaseStoreTypes} T @arg {T} key */
	get_data_cache(key) {
		/** @type {{[R in T]?: [R,DT_DatabaseStoreTypes[R][]]}} */
		let sk_ac=this.store_cache;
		/** @type {[T,DT_DatabaseStoreTypes[T][]]|undefined} */
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
	/** @arg {AG_DatabaseStoreDescription["key"]} key */
	check_size(key) {
		let d_cache=this.get_data_cache(key);
		/** @type {(DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes])[]} */
		let arr=d_cache[1];
		if(arr.length!==arr.reduce((r) => r+1,0)) {debugger;}
	}
	is_broken=false;
	trigger_bp() {
		if(this.is_broken) return;
		debugger;
		this.is_broken=true;
	}
	/** @api @public @arg {AGA_push_waiting_obj} args */
	put(...args) {
		if(!args[1]) {debugger; return;}
		const [key,value,version]=args;
		let cache=this.cached_data.get(key);
		let cache_key=value.key;
		if(cache?.includes(cache_key)) return;
		if(!this.database_open) this.requestOpen(as_any({key,value}),version);
		this.push_waiting_obj(...args);
		this.check_size(key);
	}
	log_cache_push=false;
	/** @private @template {keyof DT_DatabaseStoreTypes} T @arg {TA_push_waiting_obj<T>} args */
	push_waiting_obj(...args) {
		const [key,obj]=args;
		let d_cache=this.get_data_cache(key);
		/** @type {{[R in T]?: [R,Map<string,number>]}} */
		let sk_ac=this.store_cache_index;
		/** @type {[T,Map<string,number>]|undefined} */
		let cache_index_info=as_any(this.store_cache_index[key]);
		cache_index_info??=[key,new Map];
		sk_ac[key]=cache_index_info;
		let c_index=cache_index_info[1];
		let index_val=obj.key;
		let idx=c_index.get(index_val);
		if(idx!==void 0) {
			d_cache[1][idx]=obj;
			return;
		}
		idx=d_cache[1].push(as(obj))-1;
		c_index.set(index_val,idx);
		if(this.log_cache_push) console.log("push wait",key,index_val,idx,obj);
	}
	/** @arg {AG_DatabaseStoreDescription} store_desc @arg {number} version */
	requestOpen(store_desc,version) {
		if(this.database_opening||this.database_open) return;
		this.database_opening=true;
		this.open(store_desc,version);
	}
	/** @arg {AG_DatabaseStoreDescription} store_desc @arg {number} version */
	open(store_desc,version) {
		const request=indexedDB.open("yt_plugin",version);
		this.onOpenRequest(request,store_desc);
	}
	/** @private @arg {IDBOpenDBRequest} request @arg {AG_DatabaseStoreDescription} store_desc */
	onOpenRequest(request,store_desc) {
		request.onsuccess=event => this.onSuccess(request,event,store_desc);
		request.onerror=event => this.onError(event);
		request.onupgradeneeded=event => this.onUpgradeNeeded(request,event);
	}
	log_all_events=false;
	close_db_on_transaction_complete=false;
	/** @private @arg {IDBOpenDBRequest} request @arg {Event} event @arg {AG_DatabaseStoreDescription} store_desc */
	onSuccess(request,event,store_desc) {
		if(this.log_all_events) console.log("OpenDBRequest success",event);
		this.onDatabaseReady(request.result,store_desc);
	}
	/** @private @arg {IDBDatabase} db @arg {AG_DatabaseStoreDescription} store_desc */
	onDatabaseReady(db,store_desc) {
		this.database_opening=false;
		this.database_open=true;
		this.onDatabaseResult(db);
		this.start_transaction(db,store_desc);
	}
	/** @private @arg {IDBDatabase} db */
	onDatabaseResult(db) {
		db.onerror=event => console.log("IDBDatabase: error",event);
		db.onabort=event => console.log("IDBDatabase: abort",event);
		db.onclose=event => console.log("IDBDatabase: close",event);
		db.onversionchange=event => this.onDatabaseVersionChange(db,event);
	}
	/** @private @arg {IDBDatabase} db @arg {IDBVersionChangeEvent} event */
	onDatabaseVersionChange(db,event) {
		this.database_open=false;
		console.log("IDBDatabase: version_change",event);
		db.close();
	}
	/** @arg {TypedIDBObjectStore<DT_DatabaseStoreTypes["video_id"]>} obj_store @arg {IDBValidKey|IDBKeyRange} [query] @arg {IDBCursorDirection} [direction] @returns {IDBRequest<TypedIDBCursorWithValue<DT_DatabaseStoreTypes["video_id"]>|null>} */
	openCursor(obj_store,query,direction) {
		return obj_store.openCursor(query,direction);
	}
	/** @private @arg {IDBDatabase} db @arg {AG_DatabaseStoreDescription} store_desc */
	async start_transaction(db,store_desc) {
		let {key: tx_namespace}=store_desc;
		const transaction=db.transaction(tx_namespace,"readwrite");
		transaction.onerror=event => console.log("IDBTransaction: error",event);
		transaction.onabort=event => console.log("IDBTransaction: abort",event);
		transaction.oncomplete=event => this.onTransactionComplete(db,event,store_desc);
		try {
			let [,d_cache]=this.get_data_cache(tx_namespace);
			const obj_store=this.objectStore(transaction,tx_namespace);
			for(let value of d_cache) {
				if(this.committed_data.includes(value)) continue;
				const index_val=value.key;
				const cursor_req=this.openCursor(obj_store,IDBKeyRange.only(index_val));
				for(let i=0;;i++) {
					let cursor_res=await this.await_success(cursor_req);
					cursor_res;
					const cur_cursor=cursor_req.result;
					if(cur_cursor===null) {
						if(i===0) {
							this.committed_data.push(value);
							await this.add_data_to_store(obj_store,value);
						}
						if(i===0||i===1) break;
						console.log("cursor_done after %o",i);
						break;
					}
					const cursor_value=cur_cursor.value;
					if(cursor_value.key!==index_val) {
						console.log(cursor_value.key.split(":"));
						console.log(index_val.split(":"));
						debugger;
					}
					let value_keys=this.get_keys_of_2(value);
					let cursor_keys=this.get_keys_of_2(cursor_value);
					if(!this.eq_keys(value_keys,cursor_keys)) {
						console.log("[database_needs_obj_merge]");
						console.log("[obj_merge_new]",value);
						console.log("[obj_merge_cur]",cursor_value);
						debugger;
					} else {
						this.committed_data.push(value);
					}
					try {
						cur_cursor.continue();
					} catch(e) {
						debugger;
					}
				}
			}
		} catch(e) {
			console.log("db transaction failed",e);
			throw e;
		}
	}
	/** @protected @template {{}} T @arg {T} obj @returns {T_DistributedKeysOf_2<T>} */
	get_keys_of_2(obj) {
		if(!obj) {debugger;}
		let rq=Object.keys(obj);
		/** @private @type {any} */
		let ra=rq;
		return ra;
	}
	/** @private @arg {IDBDatabase} db @arg {Event} event @arg {AG_DatabaseStoreDescription} store_desc */
	onTransactionComplete(db,event,store_desc) {
		const key=store_desc.key;
		const [,d_cache]=this.get_data_cache(key);
		if(this.log_all_events) console.log("IDBTransaction: complete",event);
		this.cached_data.set(key,[]);
		this.committed_data.length=0;
		d_cache.length=0;
		let index=this.get_data_index_cache(key);
		index.clear();
		this.database_open=false;
		db.close();
	}
	/** @private @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @arg {IDBObjectStore} store @arg {T} data */
	async add_data_to_store(store,data) {
		let success=await this.await_success(store.add(data));
		if(this.log_all_events) console.log("IDBRequest: success",success);
		this.committed_data.push(data);
	}
	/** @template T @arg {IDBRequest<T>} request @returns {Promise<Event>} */
	await_success(request) {
		return new Promise(function(accept,reject) {
			request.onsuccess=accept;
			request.onerror=reject;
		});
	}
	/** @arg {IDBTransaction} tx @arg {K} key @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @returns {TypedIDBObjectStore<T>} */
	objectStore(tx,key) {
		let rq=tx.objectStore(key);
		return as(rq);
	}
	/**
	 * @template {keyof DT_DatabaseStoreTypes} K
	 * @template {DT_DatabaseStoreTypes[K]} T
	 * @arg {IDBTransaction} tx
	 * @arg {K} key
	 * @arg {IDBDatabase} db
	 */
	async transfer_store(tx,key,db) {
		const src_obj_store=this.objectStore(tx,key);
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
	/** @private @arg {Event} event */
	onError(event) {console.log("idb error",event);}
	database_diff_keys=new Set;
	/** @template T @arg {IDBRequest<T>} req @returns {Promise<["success",T]|["error",Event,DOMException]>} */
	async get_async_result_impl(req) {
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
	async database_diff() {
		{
			let idb=this;
			let open_req=indexedDB.open("yt_plugin",3);
			try {
				await idb.await_success(open_req);
				let open_db=open_req.result;
				let tx=open_db.transaction("video_id","readonly");
				let store=idb.objectStore(tx,"video_id");
				let all_req=store.getAll();
				await idb.await_success(all_req);
				let store_data=all_req.result;
				let store_diff=[];
				for(let item of store_data) {
					if(this.database_diff_keys.has(item.key)) continue;
					this.database_diff_keys.add(item.key);
					store_diff.push(item);
				}
				return {
					db: open_db,
					store,
					store_data,
					store_diff,
				};
			} catch(event) {
				throw open_req.error;
			}
		}
	}
}
export_(exports => {
	exports.__module_loaded__=true;
	exports.IndexedDBService=IndexedDBService;
});
