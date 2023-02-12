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
const is_firefox=h_detect_firefox();
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
	/** @constructor @public @arg {ResolverT<LoadAllServices, ServiceOptions>} x @arg {string} [db_name] */
	constructor(x,db_name="yt_plugin",version=4) {
		super(x);
		this.db_args=new DatabaseArguments(db_name,version);
	}
	database_opening=false;
	database_open=false;
	/** @private @type {({[R in keyof DatabaseStoreTypes]:[R,Map<string,number>]})} */
	store_cache_index={
		video_id: ["video_id",new Map],
		hashtag: ["hashtag",new Map],
		channel_id: ["channel_id",new Map],
	};
	/** @private @type {({[R in keyof DatabaseStoreTypes]:[R,DatabaseStoreTypes[R][]]})} */
	store_cache={
		video_id: ["video_id",[]],
		hashtag: ["hashtag",[]],
		channel_id: ["channel_id",[]],
	};
	/** @template {keyof DatabaseStoreTypes} T @arg {T} key @returns {Extract<data_cache_Return,[T,...any]>} */
	get_data_cache(key) {
		return as([key,this.store_cache[key][1]]);
	}
	/** @arg {keyof DatabaseStoreTypes} key */
	get_data_index_cache(key) {return this.store_cache_index[key][1];}
	/** @private @type {(DatabaseStoreTypes[keyof DatabaseStoreTypes])[]} */
	committed_data=[];
	/** @type {Map<"v"|"hashtag"|"channel_id",string[]>} */
	cached_data=new Map;
	/** @arg {DatabaseStoreDescription["name"]} key */
	check_size(key) {
		let d_cache=this.get_data_cache(key);
		/** @type {(DatabaseStoreTypes[keyof DatabaseStoreTypes])[]} */
		let arr=d_cache[1];
		if(arr.length!==arr.reduce((r) => r+1,0)) {debugger;}
	}
	/** @api @public @arg {push_waiting_obj_Args} args */
	put(...args) {
		if(!args[1]) {debugger; return;}
		switch(args[0]) {
			case "channel_id": {
				const [key,obj]=args;
				let cache=this.cached_data.get(key);
				let cache_key=`${key}:${obj.type}:${obj.id}`;
				if(cache?.includes(cache_key)) return;
				if(!this.database_open) this.requestOpen({name: key});
				this.push_waiting_obj(key,obj);
				this.check_size(key);
			} break;
			case "hashtag": {
				const [key,obj]=args;
				/** @type {T_UnionToPartial<typeof obj>} */
				let ac_obj=obj;
				let index_val=ac_obj[key];
				if(index_val==null) return;
				let cache=this.cached_data.get(key);
				if(cache?.includes(index_val)) return;
				if(!this.database_open) this.requestOpen({name: key});
				this.push_waiting_obj(key,obj);
				this.check_size(key);
			} break;
			case "video_id": {
				const [key,obj]=args;
				const index_key="v";
				/** @type {T_UnionToPartial<typeof obj>} */
				let ac_obj=obj;
				let index_val=ac_obj[index_key];
				if(index_val==null) return;
				let cache=this.cached_data.get(index_key);
				if(cache?.includes(index_val)) return;
				if(!this.database_open) this.requestOpen({name: key});
				this.push_waiting_obj(key,obj);
				this.check_size(key);
			} break;
		}
	}
	/** @private @arg {push_waiting_obj_Args} args */
	push_waiting_obj(...args) {
		switch(args[0]) {
			case "channel_id": {
				const [key,obj]=args;
				let d_cache=this.get_data_cache(key);
				let c_index=this.store_cache_index[key][1];
				let index_val=`${key}:${obj.type}:${obj.id}`;
				let idx=c_index.get(index_val);
				if(idx!==void 0) {
					d_cache[1][idx]=obj;
					return;
				}
				idx=d_cache[1].push(obj)-1;
				c_index.set(index_val,idx);
			} break;
			case "hashtag": {
				const [key,obj]=args;
				let d_cache=this.get_data_cache(key);
				let c_index=this.store_cache_index[key][1];
				let index_val=obj.hashtag;
				if(index_val===void 0) break;
				let idx=c_index.get(index_val);
				if(idx!==void 0) {
					d_cache[1][idx]=obj;
					return;
				}
				idx=d_cache[1].push(obj)-1;
				c_index.set(index_val,idx);
			} break;
			case "video_id": {
				const [key,obj]=args;
				let d_cache=this.get_data_cache(key);
				let c_index=this.store_cache_index[key][1];
				let index_val=obj.v;
				if(index_val===void 0) break;
				if(!index_val) {debugger; throw new Error("Invalid index key");}
				let idx=c_index.get(index_val);
				if(idx!==void 0) {
					d_cache[1][idx]=obj;
					return;
				}
				idx=d_cache[1].push(obj)-1;
				c_index.set(index_val,idx);
			}; break;
		}
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
	/** @private @arg {IDBDatabase} db @arg {DatabaseStoreDescription} store_desc */
	start_transaction(db,store_desc) {
		let cur_name=store_desc.name;
		const transaction=db.transaction(cur_name,"readwrite");
		transaction.onerror=event => console.log("IDBTransaction: error",event);
		transaction.onabort=event => console.log("IDBTransaction: abort",event);
		transaction.oncomplete=event => this.onTransactionComplete(db,event,store_desc);
		if(this.get_data_cache(cur_name).length>0) this.consume_data(transaction,store_desc);
	}
	/** @private @arg {IDBDatabase} db @arg {Event} event @arg {DatabaseStoreDescription} store_desc */
	onTransactionComplete(db,event,store_desc) {
		const cur_name=store_desc.name;
		const index_key=this.get_index_key(cur_name);
		const [,dc]=this.get_data_cache(cur_name);
		if(this.log_all_events) console.log("IDBTransaction: complete",event);
		for(let i=dc.length-1;i>=0;i--) {
			const val=dc[i];
			/** @type {T_UnionToPartial<typeof val>} */
			let ac_val=val;
			if(!this.committed_data.includes(val)) continue;
			if(!index_key) {debugger; continue;}
			x: {
				if(!this.cached_data.has(index_key)) this.cached_data.set(index_key,[]);
				let cache=this.cached_data.get(index_key);
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
			let index=this.get_data_index_cache(cur_name);
			index.clear();
		}
		this.database_open=false;
		db.close();
	}
	/** @private @arg {IDBTransaction} transaction @arg {DatabaseStoreDescription} store_desc */
	consume_data(transaction,store_desc={name: "video_id"}) {
		const obj_store=transaction.objectStore(store_desc.name);
		this.consume_data_with_store(store_desc,obj_store);
	}
	/** @template {keyof DatabaseStoreTypes} K @arg {K} key */
	get_index_key(key) {
		return this.get_index_key_str(key);
	}
	/** @template {keyof DatabaseStoreTypes} K @arg {K} key */
	get_index_key_str(key) {
		switch(key) {
			case "channel_id": return null;
			case "hashtag": return "hashtag";
			case "video_id": return "v";
		}
		throw new Error();
	}
	/** @private @arg {IDBObjectStore} obj_store @template {keyof DatabaseStoreTypes} K @template {DatabaseStoreTypes[K]} T @arg {T[]} database_data @arg {K} key */
	on_cursor_complete(obj_store,database_data,key) {
		const index_key=this.get_index_key_str(key);
		/** @private @type {Map<string,DatabaseStoreTypes[K]>} */
		let database_map=new Map;
		/** @private @type {Map<string,DatabaseStoreTypes[keyof DatabaseStoreTypes]>} */
		let new_data_map=new Map;
		database_data.forEach(e => {
			if("hashtag" in e&&index_key==="hashtag") {database_map.set(e[index_key],e);}
			if("v" in e&&index_key==="v") {database_map.set(e[index_key],e);}
		});
		if(is_firefox) {console.log(`database [%s:%s] has${"%o"}items`,this.db_args.name,key,database_data.length);} else {console.log("database [%s:%s] has %o items",this.db_args.name,key,database_data.length);}
		for(let data of this.get_data_cache(key)[1]) {
			if(!data) {debugger; continue;}
			let content;
			switch(index_key) {
				case "v": index_key in data&&(content=data[index_key]); break;
				case "hashtag": index_key in data&&(content=data[index_key]); break;
			}
			if(content!==void 0) {
				if(database_map.has(content)) {
					this.committed_data.push(data);
					let ok=this.get_keys_of(data);
					let in_db=database_map.get(content);
					if(!in_db) continue;
					let ok_db=this.get_keys_of(in_db);
					if(this.eq_keys(ok,ok_db)) continue;
					console.log("[database_needs_obj_merge]");
					console.log("[obj_merge_new]",data);
					console.log("[obj_merge_cur]",in_db);
					debugger;
				} else if(new_data_map.has(content)) {
					this.committed_data.push(data);
					continue;
				} else {
					if("v" in data) {
						new_data_map.set(content,data);
					} else {
						new_data_map.set(content,data);
					}
				}
			} else {debugger;}
		}
		[...new_data_map.values()].forEach(e => {this.add_data_to_store(obj_store,e);});
	}
	/** @private @template {keyof DatabaseStoreTypes} K @template {DatabaseStoreTypes[K]} T @arg {IDBObjectStore} obj_store @arg {DatabaseStoreDescription} store_desc */
	consume_data_with_store(store_desc,obj_store) {
		const key=store_desc.name;
		const cursor_req=obj_store.openCursor();
		/** @private @type {T[]} */
		let database_data=[];
		cursor_req.onsuccess=() => {
			const cursor=cursor_req.result;
			if(cursor) {
				database_data.push(cursor.value);
				cursor.continue();
			} else {this.on_cursor_complete(obj_store,database_data,key);}
		};
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
	/** @template T @arg {IDBRequest<T>} db_request @returns {Promise<{result:T;event:Event}>} */
	await_success(db_request) {
		return new Promise(function(accept,reject) {
			db_request.onsuccess=function(event) {accept({result: db_request.result,event});};
			db_request.onerror=function(event) {reject(event);};
		});
	}
	database_store_index_shape={
		video_id: {v: ""},
		hashtag: {hashtag: ""},
	};
	/** @arg {IDBTransaction} tx @arg {K} key @template {keyof DatabaseStoreTypes} K @template {DatabaseStoreTypes[K]} T @returns {TypedIDBObjectStore<T>} */
	objectStore(tx,key) {
		let rq=tx.objectStore(key);
		return as(rq);
	}
	/** 
	 * @template {keyof DatabaseStoreTypes} K @arg {K} key @template {DatabaseStoreTypes[K]} T @arg {TypedIDBObjectStore<T>} src_obj_store @arg {IDBDatabase} db
	 * @arg {IDBIndexParameters} options
	 * */
	async transfer_store(key,src_obj_store,db,options) {
		const index_key=this.get_index_key(key);
		/** @private @type {IDBRequest<T[]>} */
		let get_all_video_id_req=src_obj_store.getAll();
		let {result: video_id_result}=await this.await_success(get_all_video_id_req);
		if(index_key) {
			const dst_obj_store=db.createObjectStore(key,{keyPath: index_key});
			dst_obj_store.createIndex(key,index_key,options);
			for(let x of video_id_result) {
				if(index_key) {
					if(!(index_key in x)) throw new Error("Invalid transfer_store result");
					dst_obj_store.put(x);
				}
			}
		} else {
			const dst_obj_store=db.createObjectStore(key);
			for(let x of video_id_result) {
				dst_obj_store.put(x);
			}
		}
	}
	/** @template {keyof DatabaseStoreTypes} K @arg {K} key @arg {IDBDatabase} db @arg {IDBIndexParameters} [options] */
	create_store(key,db,options) {
		let index_key=this.get_index_key(key);
		if(index_key) {
			let obj_store=db.createObjectStore(key,{keyPath: this.get_index_key(key)});
			obj_store.createIndex(key,index_key,options);
		} else {
			db.createObjectStore(key);
		}
	}
	/** @private @arg {IDBOpenDBRequest} request @arg {IDBVersionChangeEvent} event */
	onUpgradeNeeded(request,event) {
		if(event.oldVersion===0) {return this.createLatestDatabaseVersion(request);}
		if(this.log_all_events) console.log("IDBOpenDBRequest: oldVersion",event.oldVersion);
		const db=request.result;
		if(event.oldVersion<1) {db.createObjectStore("video_id",{autoIncrement: true});}
		if(!request.transaction) throw new Error("No transaction");
		let tx=request.transaction;
		if(event.oldVersion<2) {
			const video_id_store=this.objectStore(tx,"video_id");
			this.transfer_store("video_id",video_id_store,db,{});
		}
		if(event.oldVersion<3) {
			const video_id_store=this.objectStore(tx,"video_id");
			this.transfer_store("video_id",video_id_store,db,{unique: true});
			this.create_store("hashtag",db,{unique: true});
		}
		if(event.oldVersion<4) {
			this.create_store("channel_id",db);
		}
	}
	/** @private @arg {IDBOpenDBRequest} request */
	createLatestDatabaseVersion(request) {
		const db=request.result;
		this.create_store("video_id",db,{unique: true});
		this.create_store("hashtag",db,{unique: true});
		this.create_store("channel_id",db);
	}
	/** @private @arg {Event} event */
	onError(event) {console.log("idb error",event);}
}
export_(exports => {
	exports.__module_loaded__=true;
	exports.IndexedDBService=IndexedDBService;
});
