// ==UserScript==
// @name	YTPlugin IndexedDb Service
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

const {do_export,as,BaseService,as_any, make_iterator}=require("./YtPlugin_Base.user");

const __module_name__="mod$IndexedDBService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
function h_detect_firefox() {
	let ua=navigator.userAgent;
	return ua.includes("Gecko/")&&ua.includes("Firefox/");
}
const is_firefox=h_detect_firefox(); is_firefox;
class TypedIndexedDb {
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
}
class TypedIDBValidKeyS {
	/** @template {IDBValidKey} T @arg {T} key @returns {TypedIDBValidKey<T>} */
	static only(key) {
		return {type: "key",key};
	}
}
/** @extends {BaseService<ServiceLoader,ServiceOptions>} */
class IndexedDBService extends BaseService {
	/** @constructor @public @arg {ServiceResolverBox<ServiceLoader, ServiceOptions>} x */
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
	/** @private @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @arg {IDBObjectStore} store @arg {T} data */
	async add_data_to_store(store,data) {
		let success=await this.await_success(store.add(data));
		if(this.log_all_events) console.log("IDBRequest: success",success);
		this.committed_data.push(data);
	}
	log_db_actions=false;
	/** @type {Promise<void>|null} */
	open_db_promise=null;
	/** @api @public @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {DT_DatabaseStoreTypes[U]} value @arg {number} version */
	put(key,value,version) {
		if(!value) {debugger; return;}
		let cache=this.cached_data.get(key);
		let cache_key=value.key;
		if(cache===void 0) this.cached_data.set(key,cache=[]);
		if(cache.includes(cache_key)) return;
		this.push_waiting_obj(key,value);
		this.check_size(key);
		if(this.open_db_promise) return;
		this.open_db_promise=this.open_database(key,version);
		this.open_db_promise
			.catch(err => console.log("open_database error",err))
			.then(() => this.open_db_promise=null);
	}
	/** @arg {number} version */
	get_db_request(version) {
		let db_req=indexedDB.open("yt_plugin",version);
		db_req.onupgradeneeded=event => this.onUpgradeNeeded(db_req,event);
		return db_req;
	}
	/** @api @public @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {number} version */
	async open_database(key,version) {
		if(this.log_db_actions) console.log("open db");
		this.database_opening=true;
		let db=await this.get_async_result(this.get_db_request(version));
		this.database_opening=false;
		this.database_open=true;
		let typed_db=new TypedIndexedDb;
		const tx=this.transaction(db,key,"readwrite");
		let is_tx_complete=false;
		/** @template {EventTarget} Base @arg {Base|null} x @template {Base} T @arg {T} y @returns {asserts x is T} */
		function assert_assume_is(x,y) {if(x!==y) throw new Error();}
		tx.oncomplete=function(event) {
			const {type,timeStamp,target}=event;
			assert_assume_is(target,this);
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
			const {mode,error,objectStoreNames}=target;
			console.log("-- [tx_complete] --\nevent:%o\ntarget:%o\nobjectStoreNames:%o\n",{
				type,
				timeStamp,
			},{
				mode,
				error,
			},[...make_iterator(objectStoreNames)]);
			is_tx_complete=true;
		};
		tx.onerror=function(event) {
			console.log("tx error",event,tx.error);
			is_tx_complete=true;
		};
		tx.onabort=function(event) {
			console.log("tx abort",event,tx.error);
			is_tx_complete=true;
		};
		const obj_store=typed_db.objectStore(tx,key);
		let [,d_cache]=this.get_data_cache(key);
		try {
			for_loop: for(let item of d_cache) {
				let cursor_req=typed_db.openCursor(obj_store,TypedIDBValidKeyS.only(item.key));
				cursor_loop: for(let i=0;;i++) {
					const [settled]=await Promise.allSettled([this.get_async_result(cursor_req)]);
					if(settled.status==="rejected") {
						console.log("openCursor failed",settled.reason);
						break for_loop;
					}
					if(is_tx_complete) {
						console.log("tx closed and still iterating");
						break for_loop;
					}
					const cur_cursor=settled.value;
					if(cur_cursor===null) {
						if(this.log_db_actions) console.log("update sync cache item",item);
						try {
							if(tx.error) {
								debugger;
								throw tx.error;
							}
							await this.update(obj_store,item);
						} catch(e) {
							console.log("update failed",e);
						}
						break cursor_loop;
					}
					const cursor_value=cur_cursor.value;
					if(cursor_value.key!==item.key) {
						console.log(cursor_value.key.split(":"));
						console.log(item.key.split(":"));
						debugger;
					}
					let value_keys=this.get_keys_of_2(item);
					let cursor_keys=this.get_keys_of_2(cursor_value);
					if(!this.eq_keys(value_keys,cursor_keys)) {
						console.log("[database_needs_obj_merge]");
						console.log("[obj_merge_new]",item);
						console.log("[obj_merge_cur]",cursor_value);
						try {
							await this.get_async_result(obj_store.delete(item.key));
						} catch(e) {
							console.log("merge delete failed",e);
						}
						try {
							await this.add_data_to_store(obj_store,item);
						} catch(e) {
							console.log("merge add failed",e);
						}
						this.committed_data.push(item);
					} else {
						switch(item.type) {
							default: debugger; break;
							case "str": {
								try {
									await this.update(obj_store,item);
									this.committed_data.push(item);
								} catch(e) {
									console.log("update str_store failed",e);
								}
							} break;
							case "video_id:normal": {
								let cv=cursor_value;
								if(cursor_value.type!==item.type) {
									cv.type=item.type;
									try {
										await this.update(obj_store,cv);
									} catch(e) {
										console.log("update fix_type failed",e);
									}
									continue for_loop;
								}
								if(item.v===cursor_value.v) {
									this.committed_data.push(item);
								}
							} break;
							case "update_id": {
								if(this.log_db_actions) console.log("update sync cache item",item);
								try {
									if(tx.error) {
										debugger;
										throw tx.error;
									}
									await this.update(obj_store,item);
								} catch(e) {
									console.log("update sync failed",e);
									throw e;
								}
							} break cursor_loop;
							// not a dynamic value
							case "playlist_id:self": this.committed_data.push(item); break;
							case "playlist_id:PL":
							case "playlist_id:RD":
							case "playlist_id:RDMM":
							case "playlist_id:UU": {
								if(cursor_value.type!==item.type) {
									debugger;
									continue for_loop;
								}
								this.committed_data.push(item);
							} break;
						};
					}
					try {
						cur_cursor.continue();
					} catch(e) {
						debugger;
					}
				}
			}
		} catch(e) {
			console.log("db error",e);
			throw e;
		} finally {
			this.database_open=false;
			if(this.log_db_actions) console.log("close db");
		}
	}
	/** @arg {K} key @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @arg {T["key"]} store_key @arg {number} version */
	async get(key,store_key,version) {
		let typed_db=new TypedIndexedDb;
		let db=await this.get_async_result(this.get_db_request(version));
		const tx=this.transaction(db,key,"readonly");
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
		if(this.open_db_promise) {
			await this.open_db_promise;
		}
		let waiter_idx=this.waiting_promises.findIndex(x => x[0]===key);
		if(waiter_idx>-1) {
			let waiter=this.waiting_promises[waiter_idx];
			let res=await waiter[1];
			return res;
		}
		let promise=this.getAllImpl(key,version);
		this.waiting_promises.push([key,promise]);
		await promise;
		let idx=this.waiting_promises.findIndex(x => x[0]===key);
		if(idx>0) this.waiting_promises.splice(idx,1);
		return promise;
	}
	/** @template {keyof DT_DatabaseStoreTypes} K @arg {K} key @arg {number} version */
	async getAllImpl(key,version) {
		let typed_db=new TypedIndexedDb;
		let db=await this.get_async_result(this.get_db_request(version));
		const tx=this.transaction(db,key,"readonly");
		const obj_store=typed_db.objectStore(tx,key);
		let result=await this.get_async_result(typed_db.getAll(obj_store));
		db.close();
		return result;
	}
	log_cache_push=false;
	/** @api @public @template {keyof DT_DatabaseStoreTypes} T @arg {T} key @arg {DT_DatabaseStoreTypes[T]} obj */
	push_waiting_obj(key,obj) {
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
	/** @private @template {keyof DT_DatabaseStoreTypes} K @template {DT_DatabaseStoreTypes[K]} T @arg {IDBObjectStore} store @arg {T} data */
	async update(store,data) {
		let req=store.put(data);
		try {
			let success=await this.await_success(req);
			if(this.log_all_events) console.log("IDBRequest: success",success);
			this.committed_data.push(data);
		} catch(e) {
			console.log("update failed",e,req.error);
			throw e;
		}
	}
	/** @template T @arg {IDBRequest<T>} request @returns {Promise<Event>} */
	await_success(request) {
		return new Promise(function(accept,reject) {
			request.onsuccess=accept;
			request.onerror=reject;
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
		let typed_db=new TypedIndexedDb;
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
	/** @arg {IDBDatabase} db @arg {keyof DT_DatabaseStoreTypes} storeNames @arg {IDBTransactionMode} mode */
	transaction(db,storeNames,mode) {return db.transaction(storeNames,mode);}
	/** @arg {number} version */
	async database_diff(version) {
		let typed_db=new TypedIndexedDb;
		let ret={};
		ret.db=await this.get_async_result(this.get_db_request(version));
		let tx=this.transaction(ret.db,"video_id","readonly");
		ret.store=typed_db.objectStore(tx,"video_id");
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
