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
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_IndexedDB_Service.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_IndexedDB_Service.user.js
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
class DatabaseArguments {
	/** @constructor @public @arg {string} name @arg {number} version */
	constructor(name,version) {
		this.name=name;
		this.version=version;
	}
}
/** @extends {BaseService<LoadAllServices,ServiceOptions>} */
class IndexedDBService extends BaseService {
	/** @constructor @public @arg {ResolverT<LoadAllServices, ServiceOptions>} x */
	constructor(x) {
		super(x);
		this.db_args=new DatabaseArguments("yt_plugin",IndexedDBService.schema_version);
	}
	database_opening=false;
	database_open=false;
	/** @private @type {({[R in keyof DatabaseStoreTypes]:[R,Map<string,number>]})} */
	store_cache_index={
		video_id: ["video_id",new Map],
		hashtag: ["hashtag",new Map],
		boxed_id: ["boxed_id",new Map],
	};
	/** @private @type {({[R in keyof DatabaseStoreTypes]:[R,DatabaseStoreTypes[R][]]})} */
	store_cache={
		video_id: ["video_id",[]],
		hashtag: ["hashtag",[]],
		boxed_id: ["boxed_id",[]],
	};
	/** @template {keyof DatabaseStoreTypes} T @arg {T} key @returns {Mk_data_cache_Return<T>} */
	get_data_cache(key) {
		return as([key,this.store_cache[key][1]]);
	}
	/** @arg {keyof DatabaseStoreTypes} key */
	get_data_index_cache(key) {return this.store_cache_index[key][1];}
	/** @private @type {(DatabaseStoreTypes[keyof DatabaseStoreTypes])[]} */
	committed_data=[];
	/** @type {Map<keyof DatabaseStoreTypes,string[]>} */
	cached_data=new Map;
	/** @arg {DatabaseStoreDescription["key"]} key */
	check_size(key) {
		let d_cache=this.get_data_cache(key);
		/** @type {(DatabaseStoreTypes[keyof DatabaseStoreTypes])[]} */
		let arr=d_cache[1];
		if(arr.length!==arr.reduce((r) => r+1,0)) {debugger;}
	}
	/** @api @public @arg {push_waiting_obj_Args} args */
	put(...args) {
		if(!args[1]) {debugger; return;}
		const [key,value]=args;
		let cache=this.cached_data.get(key);
		let cache_key=value.key;
		if(cache?.includes(cache_key)) return;
		if(!this.database_open) this.requestOpen(as_any({key,value}));
		this.push_waiting_obj(...args);
		this.check_size(key);
	}
	/** @private @arg {push_waiting_obj_Args} args */
	push_waiting_obj(...args) {
		const [key,obj]=args;
		let d_cache=this.get_data_cache(key);
		let c_index=this.store_cache_index[key][1];
		let index_val=obj.key;
		let idx=c_index.get(index_val);
		if(idx!==void 0) {
			d_cache[1][idx]=obj;
			return;
		}
		idx=d_cache[1].push(as(obj))-1;
		c_index.set(index_val,idx);
	}
	/** @arg {DatabaseStoreDescription} store_desc */
	requestOpen(store_desc) {
		if(this.database_opening||this.database_open) return;
		this.database_opening=true;
		this.open(store_desc);
	}
	/** @arg {DatabaseStoreDescription} store_desc */
	open(store_desc) {
		const {name,version}=this.db_args;
		const request=indexedDB.open(name,version);
		this.onOpenRequest(request,store_desc);
	}
	/** @private @arg {IDBOpenDBRequest} request @arg {DatabaseStoreDescription} store_desc */
	onOpenRequest(request,store_desc) {
		request.onsuccess=event => this.onSuccess(request,event,store_desc);
		request.onerror=event => this.onError(event);
		request.onupgradeneeded=event => this.onUpgradeNeeded(request,event);
	}
	log_all_events=false;
	close_db_on_transaction_complete=false;
	/** @private @arg {IDBOpenDBRequest} request @arg {Event} event @arg {DatabaseStoreDescription} store_desc */
	onSuccess(request,event,store_desc) {
		if(this.log_all_events) console.log("OpenDBRequest success",event);
		this.onDatabaseReady(request.result,store_desc);
	}
	/** @private @arg {IDBDatabase} db @arg {DatabaseStoreDescription} store_desc */
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
	/** @arg {TypedIDBObjectStore<DatabaseStoreTypes["video_id"]>} obj_store @arg {IDBValidKey|IDBKeyRange} [query] @arg {IDBCursorDirection} [direction] @returns {IDBRequest<TypedIDBCursorWithValue<DatabaseStoreTypes["video_id"]>|null>} */
	openCursor(obj_store,query,direction) {
		return obj_store.openCursor(query,direction);
	}
	/** @private @arg {IDBDatabase} db @arg {DatabaseStoreDescription} store_desc */
	async start_transaction(db,store_desc) {
		let {key: tx_namespace}=store_desc;
		const transaction=db.transaction(tx_namespace,"readwrite");
		transaction.onerror=event => console.log("IDBTransaction: error",event);
		transaction.onabort=event => console.log("IDBTransaction: abort",event);
		transaction.oncomplete=event => this.onTransactionComplete(db,event,store_desc);
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
						this.add_data_to_store(obj_store,value);
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
				cur_cursor.continue();
			}
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
	/** @private @arg {IDBDatabase} db @arg {Event} event @arg {DatabaseStoreDescription} store_desc */
	onTransactionComplete(db,event,store_desc) {
		const key=store_desc.key;
		const index_key=this.get_index_key(key);
		const [,dc]=this.get_data_cache(key);
		if(this.log_all_events) console.log("IDBTransaction: complete",event);
		for(let i=dc.length-1;i>=0;i--) {
			const val=dc[i];
			/** @type {T_UnionToPartial<typeof val>} */
			let ac_val=val;
			if(!this.committed_data.includes(val)) continue;
			if(!index_key) {debugger; continue;}
			x: {
				if(!this.cached_data.has(key)) this.cached_data.set(key,[]);
				let cache=this.cached_data.get(key);
				if(!cache) throw new Error();
				let index_val=ac_val[index_key];
				if(!index_val) break x;
				if(cache.includes(index_val)) break x;
				cache.push(index_val);
			}
			dc.splice(i,1);
		}
		if(dc.length>0) {
			console.log("transaction done, but not all data was committed");
			console.log("[new_data_after_tx_complete]",dc);
		} else {
			this.committed_data.length=0;
			let index=this.get_data_index_cache(key);
			index.clear();
		}
		this.database_open=false;
		db.close();
	}
	/** @protected @template {keyof DatabaseStoreTypes} K @arg {K} key */
	get_index_key(key) {
		switch(key) {
			case "hashtag": return "hashtag";
			case "video_id": return "v";
			case "boxed_id": return "id";
		}
		throw new Error();
	}
	/** @private @template {keyof DatabaseStoreTypes} K @template {DatabaseStoreTypes[K]} T @arg {IDBObjectStore} store @arg {T} data */
	add_data_to_store(store,data) {
		const request=store.add(data);
		request.onerror=event => console.log("IDBRequest: error",event);
		request.onsuccess=event => {
			if(this.log_all_events) console.log("IDBRequest: success",event);
			this.committed_data.push(data);
		};
	}
	/** @template T @arg {IDBRequest<T>} db_request @returns {Promise<Event>} */
	await_success(db_request) {
		return new Promise(function(accept,reject) {
			db_request.onsuccess=function(event) {accept(event);};
			db_request.onerror=function(event) {reject(event);};
		});
	}
	/** @arg {IDBTransaction} tx @arg {K} key @template {keyof DatabaseStoreTypes} K @template {DatabaseStoreTypes[K]} T @returns {TypedIDBObjectStore<T>} */
	objectStore(tx,key) {
		let rq=tx.objectStore(key);
		return as(rq);
	}
	/**
	 * @arg {IDBTransaction} tx
	 * @template {keyof DatabaseStoreTypes} K @arg {K} key @template {DatabaseStoreTypes[K]} T @arg {IDBDatabase} db
	 * @arg {IDBIndexParameters} options
	 * */
	async transfer_store(tx,key,db,options) {
		const src_obj_store=this.objectStore(tx,key);
		/** @private @type {IDBRequest<T[]>} */
		let get_all_video_id_req=src_obj_store.getAll();
		await this.await_success(get_all_video_id_req);
		const video_id_result=get_all_video_id_req.result;
		db.deleteObjectStore(key);
		const dst_obj_store=db.createObjectStore(key,{keyPath: "key"});
		dst_obj_store.createIndex(key,"key",options);
		for(let x of video_id_result) {
			/** @type {DatabaseStoreTypes[keyof DatabaseStoreTypes]} */
			let u=x;
			if("v" in u) {
				u.key=`video_id:${u.type}:${u.v}`;
			} else if("id" in u) {
				u.key=`boxed_id:${u.type}:${u.id}`;
			} else {
				u.key=`hashtag:${u.hashtag}`;
			}
			dst_obj_store.put(x);
		}
	}
	/** @template {keyof DatabaseStoreTypes} K @arg {K} key @arg {IDBDatabase} db @arg {IDBIndexParameters} [options] */
	create_store(key,db,options) {
		let index_key=this.get_index_key(key);
		if(index_key) {
			let obj_store=db.createObjectStore(key,{keyPath: "key"});
			obj_store.createIndex(key,index_key,options);
		} else {
			db.createObjectStore(key);
		}
	}
	/** @private @arg {IDBOpenDBRequest} request @arg {IDBVersionChangeEvent} event */
	onUpgradeNeeded(request,event) {
		if(event.oldVersion===0) {return this.createLatestDatabaseVersion(request);}
		if(this.log_all_events) console.log("IDBOpenDBRequest: oldVersion",event.oldVersion);
		const {result: db,transaction: tx}=request;
		if(!tx) throw new Error("No transaction");
		if(event.oldVersion<1) {
			this.transfer_store(tx,"video_id",db,{unique: true});
			this.transfer_store(tx,"hashtag",db,{unique: true});
			this.transfer_store(tx,"boxed_id",db,{unique: true});
		}
	}
	static schema_version=1;
	/** @private @arg {IDBOpenDBRequest} request */
	createLatestDatabaseVersion(request) {
		const db=request.result;
		this.create_store("video_id",db,{unique: true});
		this.create_store("hashtag",db,{unique: true});
		this.create_store("boxed_id",db,{unique: true});
	}
	/** @private @arg {Event} event */
	onError(event) {console.log("idb error",event);}
}
export_(exports => {
	exports.__module_loaded__=true;
	exports.IndexedDBService=IndexedDBService;
});
