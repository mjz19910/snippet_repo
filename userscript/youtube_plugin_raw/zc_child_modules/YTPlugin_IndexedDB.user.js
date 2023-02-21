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

const {do_export,as,BaseService,as_any}=require("./YtPlugin_Base.user");

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
class IndexedDBService extends BaseService {
	/** @constructor @public @arg {DefaultServiceResolver} x */
	constructor(x) {
		super(x);
		/** @type {DT_DatabaseStoreKeys} */
		let keys=["video_id","hashtag_id","boxed_id","channel_id","playlist_id","browse_id"];
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
	/** @private @type {StoreCacheIndex} */
	store_cache_index={};
	/** @private @type {StoreCacheType} */
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
	/** @arg {AG_DatabaseStoreDescription["key"]} key */
	check_size(key) {
		let d_cache=this.get_data_cache(key);
		/** @type {(DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes]|null)[]} */
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
	expected_id=0;
	/** @template {G_BoxedIdObj} T @arg {T} x @arg {number} version @returns {T} */
	put_box(x,version) {return this.put("boxed_id",x,version);}
	/** @arg {number} id @arg {number} version @returns {D_BoxedUpdateId} */
	put_update_id(id,version) {
		return this.put_box({
			key: "boxed_id:update_id",
			base: "boxed_id",
			type: "update_id",
			id,
		},version);
	}
	/** @private @arg {number} version */
	async get_update_id(version) {
		let box=await this.get("boxed_id","boxed_id:update_id",version);
		if(box&&box.key!=="boxed_id:update_id") return null;
		return box;
	}
	/** @arg {StoreData} store @arg {number} version */
	async load_store_from_database(store,version) {
		/** @type {IDBBoxedType[]} */
		let boxed=await this.getAll("boxed_id",version);
		for(let item of boxed) {
			this.load_store(store,item,version);
		}
	}
	/** @type {IDBBoxedType["type"][]} */
	valid_types=["boolean","keys","number"];
	/** @arg {StoreData} store @arg {IDBBoxedType} item @arg {number} version */
	load_store(store,item,version) {
		switch(item.type) {
			default: {
				if(!this.valid_types.includes(item.type)) {
					/** @type {string} */
					let bad_type=item.type;
					if(bad_type==="str") {
						this.delete("boxed_id",item.key,version);
						return;
					}
					debugger;
				}
			} break;
			case "boolean": return store.bool_store.load_data(item);
			case "keys": return store.keys_store.load_data(item);
			case "number": return store.numbers_store.load_data(item);
			case "update_id": break;
		}
	}
	/** @public @arg {StoreData} store @arg {number} version */
	async save_database(store,version) {
		let update_id=await this.get_update_id(version);
		if(!update_id) {
			this.expected_id=0;
			update_id=this.put_update_id(this.expected_id,version);
		}
		if(update_id.id!==this.expected_id) this.expected_id=update_id.id;
		this.expected_id++;
		await this.save_store_to_database(store,version);
		this.put_update_id(this.expected_id,version);
	}
	/** @public @arg {StoreData} store @arg {number} version */
	async load_database(store,version) {
		let update_id=await this.get_update_id(version);
		if(!update_id) this.expected_id=0;
		else this.expected_id=update_id.id;
		this.load_store_from_database(store,version);
		this.expected_id++;
		this.put_update_id(this.expected_id,version);
	}
	/** @template {G_StoreDescriptions} T @arg {T} store @arg {number} version */
	async push_store_to_database(store,version) {
		/** @type {IDBBoxedType[]} */
		let boxed=await this.getAll("boxed_id",version);
		for(let item of store.data) {
			await this.push_store_item_to_database(store,boxed,item,version);
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
	/** @arg {number} version @arg {string} b @arg {["number",make_item_group<number>]|["string"|"keys",make_item_group<string>]|["boolean",make_item_group<boolean>]} args */
	put_boxed_id(b,version,...args) {
		switch(args[0]) {
			default: debugger; throw new Error();
			case "number": {
				let [a,value]=args;
				return this.put_box({
					key: `boxed_id:${a}:${b}`,
					base: "boxed_id",
					type: a,
					id: b,
					value,
				},version);
			}
			case "boolean": {
				let [a,value]=args;
				return this.put_box({
					key: `boxed_id:${a}:${b}`,
					base: "boxed_id",
					type: a,
					id: b,
					value,
				},version);
			}
			case "string": {
				let [a,value]=args;
				return this.put_box({
					key: `boxed_id:${a}:${b}`,
					base: "boxed_id",
					type: a,
					id: b,
					value,
				},version);
			}
			case "keys": {
				let [a,value]=args;
				return this.put_box({
					key: `boxed_id:${a}:${b}`,
					base: "boxed_id",
					type: a,
					id: b,
					value,
				},version);
			}
		}
	}
	/** @template {G_StoreDescriptions} T @arg {IDBBoxedType[]} db_boxed @arg {T} store @arg {T["data"][number]} item @arg {number} version */
	async push_store_item_to_database(store,db_boxed,item,version) {
		let do_update=false;
		/** @type {D_BoxedStrStore[]} */
		let db_str_box=[];
		/** @type {D_BoxedNumStore[]} */
		let db_num_box=[]; db_num_box;
		for(let db_box of db_boxed) {
			switch(db_box.type) {
				default: console.log("unable to push [type=%s]",db_box.type); break;
				case "number": db_num_box.push(db_box); break;
				case "string": db_str_box.push(db_box); break;
				case "keys": {
					// TODO: handle keys
				} break;
				case "update_id": break;
			}
		}
		let found=false;
		let found_box=null;
		for(let box of db_str_box) {
			if(box.id===item[0]) {
				found=true; found_box=box;
				let [,db_container]=box.value;
				let [,item_container]=item;
				if(!this.is_vi_has_str(item_container)) break;
				if(item_container[0]!==db_container[0]) {
					switch(db_container[0]) {
						default: debugger; break;
						case "arr": {
							let [,db_value]=db_container;
							if(item_container[0]==="one") {
								let [,item_value]=item_container;
								if(db_value.includes(item_value)) continue;
								debugger;
								continue;
							}
						}
					}
					debugger;
				}
			}
		}
		if(do_update&&found_box) this.put_box(found_box,version);
		if(found) return;
		let [,vi]=item;
		switch(store.content) {
			default: debugger; break;
			case "number": {
				if(!this.is_vi_has_num(vi)) break;
				let uv=this.uv_unpack(vi);
				if(uv.one) this.put_boxed_id(item[0],version,store.content,uv.one);
				if(uv.arr) this.put_boxed_id(item[0],version,store.content,uv.arr);
				if(uv.many) this.put_boxed_id(item[0],version,store.content,uv.many);
			} break;
			case "boolean": {
				if(!this.is_vi_has_bool(vi)) break;
				let uv=this.uv_unpack(vi);
				if(uv.one) this.put_boxed_id(item[0],version,store.content,uv.one);
				if(uv.arr) this.put_boxed_id(item[0],version,store.content,uv.arr);
				if(uv.many) this.put_boxed_id(item[0],version,store.content,uv.many);
			} break;
			case "string":
			case "keys": {
				if(!this.is_vi_has_str(vi)) break;
				let uv=this.uv_unpack(vi);
				if(uv.one) this.put_boxed_id(item[0],version,store.content,uv.one);
				if(uv.arr) this.put_boxed_id(item[0],version,store.content,uv.arr);
				if(uv.many) this.put_boxed_id(item[0],version,store.content,uv.many);
			} break;
		}
	}
	/** @arg {StoreData} store @arg {number} version */
	async save_store_to_database(store,version) {
		let changes=store.get_changed_stores();
		for(let changed of changes) {
			if(changed==="string") {
				let ss=store.string_store;
				await this.push_store_to_database(ss,version);
				continue;
			}
			if(changed==="keys") {
				let ks=store.keys_store;
				await this.push_store_to_database(ks,version);
				continue;
			}
			if(changed==="number") {
				let ns=store.numbers_store;
				await this.push_store_to_database(ns,version);
				continue;
			}
			debugger;
		}
	}
	/** @arg {make_item_group<any>} x @returns {x is make_item_group<string>} */
	is_vi_has_str(x) {return this.is_vi_typeof_check(x,"string");}
	/** @arg {make_item_group<any>} x @returns {x is make_item_group<number>} */
	is_vi_has_num(x) {return this.is_vi_typeof_check(x,"number");}
	/** @arg {make_item_group<any>} x @returns {x is make_item_group<boolean>} */
	is_vi_has_bool(x) {return this.is_vi_typeof_check(x,"boolean");}
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
	/** @arg {keyof DT_DatabaseStoreTypes} key @arg {string} query @arg {number} version */
	async deleteImpl(key,query,version) {
		let typed_db=new TypedIndexedDb;
		let db=await this.get_async_result(this.get_db_request(version));
		let s=this.open_transaction_scope(db,key,"readwrite");
		let obj_store=typed_db.objectStore(s.tx,key);
		await this.get_async_result(obj_store.delete(query));
		s; query;
	}
	/** @arg {keyof DT_DatabaseStoreTypes} key @arg {number} version @arg {string} query */
	delete(key,query,version) {
		this.deleteImpl(key,query,version).catch(e => console.log("delete error",e)).then(() => {});
	}
	/** @api @public @template {DT_DatabaseStoreTypes[U]} T @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {T} value @arg {number} version */
	put(key,value,version) {
		if(!value) {debugger; return value;}
		let cache=this.cached_data.get(key);
		let cache_key=value.key;
		if(cache===void 0) this.cached_data.set(key,cache=[]);
		if(cache.includes(cache_key)) return value;
		this.push_waiting_obj(key,value);
		this.check_size(key);
		if(this.open_db_promise) return value;
		this.open_db_promise=this.open_database(key,version);
		this.open_db_promise
			.catch(err => console.log("open_database error",err))
			.then(() => this.open_db_promise=null);
		return value;
	}
	/** @arg {number} version */
	get_db_request(version) {
		let db_req=indexedDB.open("yt_plugin",version);
		db_req.onupgradeneeded=event => this.onUpgradeNeeded(db_req,event);
		return db_req;
	}
	/**
	 * @arg {IDBDatabase} db @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {IDBTransactionMode} mode
	 * @arg {()=>void} complete_cb
	*/
	open_transaction(db,key,mode,complete_cb) {
		const tx=this.transaction(db,key,mode);
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
	/** @arg {IDBDatabase} db @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {IDBTransactionMode} mode @returns {TypedIDBTransactionScope} */
	open_transaction_scope(db,key,mode) {
		const tx=this.open_transaction(db,key,mode,() => {
			scope.is_tx_complete=true;
		});
		let scope={
			tx,
			is_tx_complete: false,
			complete_promise: this.await_complete(tx),
		};
		return scope;
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
	/** @template {keyof DT_DatabaseStoreTypes} U @arg {{error_count:number;db:IDBDatabase;tx:IDBTransaction|null;obj_store:TypedIDBObjectStore<DT_DatabaseStoreTypes[U]>|null;typed_db:TypedIndexedDb;}} s @arg {keyof DT_DatabaseStoreTypes} key @arg {any} x */
	async force_update(s,key,x) {
		try {
			this.put(key,x,3);
		} catch(e) {
			throw new AggregateError([e]);
		}
		let bp=true;
		if(bp) return;
		for(let scope=null;s.error_count<64;) {
			try {
				if(s.tx===null&&scope) {
					let complete_event=await scope.complete_promise;
					this.handle_transaction_complete(scope,complete_event);
				}
				if(s.tx===null) {
					scope=this.open_transaction_scope(s.db,key,"readwrite");
					s.tx=scope.tx;
				}
				if(s.obj_store===null) s.obj_store=s.typed_db.objectStore(s.tx,key);
				this.put(key,x,3);
			} catch(e) {
				s.error_count++;
				s.tx=null;
				s.obj_store=null;
				continue;
			}
			if(scope) {
				let complete_event=await scope.complete_promise;
				this.handle_transaction_complete(scope,complete_event);
			}
			break;
		}
	}
	/** @template T @arg {make_item_group<T>} x @arg {make_item_group<T>} y @arg {(x:T,y:T)=>boolean} eq_fn */
	eq_group(x,y,eq_fn) {
		switch(x[0]) {
			case "arr": {
				if(y[0]!=="arr") {debugger; break;}
				if(x[1].length!==y[1].length) return false;
				for(let x_item of x[1]) {
					let y_item=y[1].findIndex(y_item => eq_fn(y_item,x_item));
					if(y_item===-1) return false;
				}
				return true;
			}
			case "many": {
				if(y[0]!=="arr") {debugger; break;}
				for(let x_arr of x[1]) {
					if(x_arr.length!==y[1].length) return false;
					for(let x_item of x_arr) {
						let y_item=y[1].findIndex(y_item => eq_fn(y_item,x_item));
						if(y_item===-1) return false;
					}
				}
				return true;
			}
			case "one": {
				if(y[0]!=="one") {debugger; break;}
				return eq_fn(x[1],y[1]);
			}
		}
		return false;
	}
	/** @api @public @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {number} version */
	async open_database(key,version) {
		if(this.log_db_actions) console.log("open db");
		this.database_opening=true;
		let db=await this.get_async_result(this.get_db_request(version));
		this.database_opening=false;
		this.database_open=true;
		let typed_db=new TypedIndexedDb;
		let tx_scope=this.open_transaction_scope(db,key,"readwrite");
		let state={
			error_count: 0,
			db,tx: tx_scope.tx,typed_db,
			/** @type {TypedIDBObjectStore<DT_DatabaseStoreTypes[U]>|null} */
			obj_store: null,
		};
		state.obj_store=typed_db.objectStore(state.tx,key);
		let [,d_cache]=this.get_data_cache(key);
		try {
			for_loop: for(let item of d_cache) {
				if(item===null) continue;
				if(this.committed_data.includes(item)) continue;
				let cursor_req=typed_db.openCursor(state.obj_store,TypedIDBValidKeyS.only(item.key));
				cursor_loop: for(let i=0;i<12;i++) {
					const cur_cursor=await this.get_async_result(cursor_req);
					if(tx_scope.is_tx_complete) {
						console.log("cursor_loop_is_tx_complete_1");
						break for_loop;
					}
					if(cur_cursor===null) {
						if(this.log_db_actions) console.log("[update_sync_cache_item_add_to_db]",item);
						if(tx_scope.is_tx_complete) {
							console.log("cursor_loop_is_tx_complete_2");
							break cursor_loop;
						}
						await this.force_update(state,key,item);
						let idx=d_cache.indexOf(item);
						d_cache[idx]=null;
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
							await this.get_async_result(state.obj_store.delete(item.key));
						} catch(e) {
							console.log("merge delete failed",e);
						}
						try {
							await this.add_data_to_store(state.obj_store,item);
						} catch(e) {
							console.log("merge add failed",e);
						}
						this.committed_data.push(item);
					} else {
						switch(item.type) {
							default: debugger; break;
							case "keys":
							case "string": {
								if(cursor_value.type!==item.type) {
									await this.force_update(state,key,item);
									continue for_loop;
								}
								if(this.eq_group(item.value,cursor_value.value,(a,b) => a===b)) {
									this.committed_data.push(item);
									break;
								}
								await this.force_update(state,key,item);
								this.committed_data.push(item);
							} break;
							case "video_id:normal": {
								if(cursor_value.type!==item.type) {
									await this.force_update(state,key,item);
									continue for_loop;
								}
								if(item.v===cursor_value.v) {
									this.committed_data.push(item);
								}
							} break;
							case "update_id": {
								if(this.log_db_actions) console.log("[update_sync_cache_item_update_id]",item);
								if(item.key===cursor_value.key&&item.id===cursor_value.id) break;
								await this.force_update(state,key,item);
								this.committed_data.push(item);
							} break cursor_loop;
							// not a dynamic value
							case "playlist_id:self": this.committed_data.push(item); break;
							case "channel_id:UC":
							case "playlist_id:PL":
							case "playlist_id:RD":
							case "playlist_id:RDMM":
							case "playlist_id:UU": {
								if(cursor_value.key===item.key&&item.id===cursor_value.id) {
									this.committed_data.push(item);
								} else {
									await this.force_update(state,key,item);
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
			let complete_event=await tx_scope.complete_promise;
			this.handle_transaction_complete(tx_scope,complete_event);
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
		let typed_db=new TypedIndexedDb;
		let db=await this.get_async_result(this.get_db_request(version));
		const tx=this.transaction(db,key,"readonly");
		const obj_store=typed_db.objectStore(tx,key);
		let result=await this.get_async_result(typed_db.getAll(obj_store));
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
