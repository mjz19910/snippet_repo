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

// yt_plugin/IndexedDB_Service(10) => base_require/BaseRequire(1)
const {as,do_export}=require("../../base_require_raw/BaseRequire.user");
// yt_plugin/IndexedDB_Service(10) => yt_plugin/Base(4) => base_require/BaseRequire(1)
const {BaseService}=require("./YTPlugin_Base.user");

// priority yt_plugin/IndexedDB_Service(10)

const __module_name__="mod$IndexedDBService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
function init_module() {
	// yt_plugin/IndexedDB_Service(9) => yt_plugin/Support_Service(11) => yt_plugin/Base(4)
	const {StoreData}=require("./YTPlugin_Support_Service.user");
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
		_delayed_log_idle_request_id=null;
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
		/** @type {Set<string>} */
		database_diff_keys=new Set;
		/** @private @type {G_BoxedDatabaseData[]} */
		committed_data=[];
		/** @private @type {DA_CacheInfoType} */
		store_cache=[];
		cache() {return this.store_cache;}
		/** @type {string[][]} */
		_delayed_log_messages=[];
		/** @type {Promise<G_BoxedDatabaseData[]>[]} */
		waiting_promises=[];
		on_loaded_resolver=J_ResolverTypeImpl.make();
		check_size() {
			let arr=this.cache();
			if(arr.length!==arr.reduce((r) => r+1,0)) {debugger;}
		}
		/** @temporary @template {G_BoxedDatabaseData} T @arg {T} x @arg {number} version @returns {Promise<T|null>} */
		put_box(x,version) {return this.ht.put("boxed_id",x,version);}
		/** @arg {number} version @returns {Promise<DST_LoadId|null>} */
		async get_load_id(version) {
			/** @type {DST_LoadId|null} */
			const box=await this.get("boxed_id","boxed_id:load_id",version);
			return box;
		}
		/** @arg {number} version @returns {Promise<DST_SaveId|null>} */
		async get_save_id(version) {
			/** @type {DST_SaveId|null} */
			const box=await this.get("boxed_id","boxed_id:save_id",version);
			return box;
		}
		/** @arg {StoreData} store @arg {number} version */
		async load_store_from_database(store,version) {
			/** @type {G_BoxedDatabaseData[]} */
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
		/** @arg {StoreData} store @arg {G_BoxedDatabaseData} item @arg {number} version */
		async load_store(store,item,version) {
			this.add_to_index(item.key,item);
			item=await this.update_obj_schema(item,version);
			store.on_item_loaded_from_database(item);
		}
		/** @template {G_BoxedDatabaseData} T @arg {T} x @arg {number} version @returns {Promise<T>} */
		async update_obj_schema(x,version) {
			if(x.z) return x;
			await this.delete("boxed_id",x.key,version);
			await this.direct_put("boxed_id",x,version);
			return x;
		}
		/** @public @arg {StoreData} store @arg {number} version */
		async save_database(store,version) {
			let cur_id_box=await this.get_save_id(version);
			if(!cur_id_box) {
				this.expected_save_id=0;
				await this.put_boxed_id(version,"save_id",[null,this.expected_save_id]);
				cur_id_box=await this.get_save_id(version);
				if(!cur_id_box) throw new Error("null on get");
			}
			cur_id_box=await this.update_obj_schema(cur_id_box,version);
			if(cur_id_box.z[0]!==this.expected_save_id) this.expected_save_id=cur_id_box.z[0];
			await this.save_store_data_to_database(store,version);
			this.expected_save_id++;
			await this.put_boxed_id(version,"save_id",[null,this.expected_save_id]);
		}
		/** @public @arg {StoreData} store @arg {number} version */
		async load_database(store,version) {
			let cur_id_box=await this.get_load_id(version);
			if(!cur_id_box) {
				this.expected_load_id=0;
				let put_promise=this.put_boxed_id(version,"load_id",[null,this.expected_load_id]);
				this.on_loaded_resolver.resolve();
				await put_promise;
				cur_id_box=await this.get_load_id(version);
				if(!cur_id_box) throw new Error("null on get");
			}
			cur_id_box=await this.update_obj_schema(cur_id_box,version);
			if(cur_id_box.z[0]!==this.expected_save_id) this.expected_save_id=cur_id_box.z[0];
			await this.load_store_from_database(store,version);
			this.expected_load_id++;
			await this.put_boxed_id(version,"load_id",[null,this.expected_load_id]);
		}
		/** @arg {StoreData} store @arg {number} version */
		async save_store_data_to_database(store,version) {
			let s_values=store.stores.values();
			for(let store of s_values) {
				await this.save_store_to_database(store,version);
			}
		}
		/** @arg {StoreDescription<string>} store @arg {number} version */
		async save_store_to_database(store,version) {
			let results=await Promise.allSettled(store.data.map(item => this.save_store_item_to_database(store,item,version)));
			for(let result of results) {
				if(result.status==="rejected") {
					console.log("[push_store_to_database.iter.err]",result.reason);
				} else {
					if(result.value==null) throw new Error("null on put");
					if("err" in result.value) {
					} else {}
				}
			}
		}
		/** @arg {{key: string; z: [any]; _z: [string]}} x @template U @arg {()=>U} fn_ex @returns {asserts x is U} */
		assert_is_distributed_iter(x,fn_ex) {x; fn_ex;}
		/** @template {string} T @arg {T} src @template U @arg {U} value @returns {T extends infer I?{key:`boxed_id:${I}`; z: [U]; _z: [I]}:never} */
		make_box_size_1(src,value) {
			/** @type {{key:`boxed_id:${T}`; z: [U]; _z: [T]}} */
			const z={
				/** @type {`boxed_id:${T}`} */
				key: `boxed_id:${src}`,
				z: [value],_z: [src]
			};
			/** @returns {T extends infer I?{key:`boxed_id:${I}`; z: [U]; _z: [I]}:never} */
			function fn_ex() {throw new Error();}
			this.assert_is_distributed_iter(z,fn_ex);
			return z;
		}
		/** @arg {number} version @template {Y_PutBoxedArgs} T @arg {T} s0 */
		async put_boxed_id(version,...s0) {
			const [k,x]=s0; k; x;
			if(x[0]===null) {
				switch(k) {
					case "save_id":
					case "load_id": {
						/** @type {DST_SaveId|DST_LoadId} */
						const z=this.make_box_size_1(k,x[1]);
						return this.put_box(z,version);
					}
				}
				debugger;
				return null;
			}
			/** @type {DST_Group} */
			const z={key: `boxed_id:${k}:${x[0]}`,z: [x[1]],_z: [k,x[0]]};;
			return this.put_box(z,version);
		}
		/** @template {G_StoreDescription} T @arg {T} store @arg {T["data"][number]} item @arg {number} version */
		async save_store_item_to_database(store,item,version) {
			return this.put_boxed_id(version,store.type,item);
		}
		/** @arg {G_BoxedDatabaseData} x */
		store_cache_tree(x) {
			this.ht.loaded_keys.add(x.key);
			this.ht.loaded_map.set(x.key,x);
		}
		/** @template T @arg {make_item_group<T>} x @arg {T[]} _mt */
		uv_unpack_mt(x,_mt) {
			/** @type {MT_MakeSplitObj<T>} */
			const make={},nul=null;
			/** @type {{u:make_arr_t<T>|make_instance_name_t<string>|make_many_t<T>|make_one_t<T>|make_typeof_name_t<T>}} */
			const D_holder={};
			D_holder.u=x; make.arr=nul; make.instance_name=nul; make.many=nul; make.one=nul; make.typeof_name=nul;
			switch(x.l) {
				default: {
					/** @type {unknown} */
					let ux=x;
					if(typeof ux==="object"&&ux!==null&&"k" in ux&&typeof ux.k==="string") {
						/** @type {{[U in string]:{k:string}|null}} */
						let m_any=make;
						m_any[ux.k]={k: ux.k};
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
			switch(x.l) {
				default: debugger; throw new Error();
				case "one": const z1=x.z; return t_check_typeof(z1[0],ty);
				case "arr": const u=x.z,z2=u[0]; return z2.length===0||t_check_typeof(z2[0],ty);
				case "many": const b=x.z,m=b[0],z3=m[0]; return m.length===0||z3.length===0||t_check_typeof(z3[0],ty);
			}
		}
		/** @arg {TypedIndexedDB} typed_db @arg {"boxed_id"} key @arg {number} version */
		async open_rw_object_store(typed_db,key,version) {
			let db_request=this.get_db_request(version);
			if(!db_request) throw new Error("Unable to access IndexedDB");
			let db=await this.get_async_result(db_request);
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
		/** @api @public @template {DT_DatabaseStoreTypes[U]} T @template {"boxed_id"} U @arg {U} key @arg {T} value @arg {number} version */
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
		/** @arg {number} version */
		get_db_request(version) {
			try {
				let db_req=indexedDB.open("yt_plugin",version);
				db_req.onupgradeneeded=event => this.onUpgradeNeeded(db_req,event);
				return db_req;
			} catch(err) {
				throw new AggregateError([err],"Unable to access IndexedDB");
			}
		}
		/**
		 * @param {TypedIndexedDB} typed_db
		 * @param {IDBDatabase} db @template {"boxed_id"} U @arg {U} key @arg {IDBTransactionMode} mode
		 * @param {()=>void} complete_cb
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
		 * @param {TypedIndexedDB} tdb @template {G_BoxedDatabaseData} T @arg {TypedIDBObjectStore<T>} store @arg {T} value
		 * @returns {{type:"err";err:unknown}|{type:"ok";req:IDBRequest<IDBValidKey>}}
		 */
		start_put_request(tdb,store,value) {
			try {
				return {type: "ok",req: tdb.put(store,value)};
			} catch(e) {
				if(this.log_failed) {
					console.log("IDBObjectStore.put threw an error:",e);
					setTimeout(() => this.log_failed=true,5000);
				}
				this.log_failed=false;
				throw new AggregateError([e],"failed to call IDBObjectStore.put");
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
		_delayed_log(...args) {
			this._delayed_log_messages.push(args);
			this._delayed_log_idle_request_id=requestIdleCallback(() => {
				this._delayed_log_idle_request_id=null;
			});
		}
		/** @api @public @template {"boxed_id"} U @arg {U} key @arg {number} version */
		async open_database(key,version) {
			if(this.log_db_actions) console.log("open db");
			if(!this.has_loaded_keys) {
				if(this.log_db_actions) console.log("[start_load_wait]");
				await this.on_loaded_resolver.promise;
				if(this.log_db_actions) console.log("[load_wait_done]");
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
			let no_null_cache=d_cache.filter(e => e!==null&&"type" in e&&!this.ht.loaded_keys.has(e.key));
			/** @type {G_BoxedDatabaseData[]} */
			let new_arr=[];
			/** @type {G_BoxedDatabaseData[]} */
			let same_arr=[];
			/** @type {G_BoxedDatabaseData[]} */
			let diff_arr=[];
			/** @type {G_BoxedDatabaseData[]} */
			let unknown_arr=[];
			/** @arg {G_BoxedDatabaseData} x @arg {"new"|"same"|"diff"|"unknown"} changed */
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
					if(this.ht.loaded_keys.has(x_value.key)) {
						let y_value=this.ht.loaded_map.get(x_value.key); y_value;
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
						let req=this.start_put_request(s.typed_db,s.obj_store,x_value);
						if(req.type==="err") {
							throw new AggregateError([req.err],"start_put_request error");
						}
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
		 */
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
		/** @api @public @arg {G_BoxedDatabaseData} obj */
		push_value(obj) {
			const {key}=obj;
			let idx=this.add_to_index(key,obj);
			if(this.log_cache_push) console.log("push wait",key,idx,obj);
		}
		/** @arg {G_BoxedDatabaseData["key"]} key @arg {G_BoxedDatabaseData} x */
		add_to_index(key,x) {
			let cache_arr=this.cache();
			let cache_index=this.cache_index();
			let idx=cache_index.get(key);
			if(idx!==void 0) {
				cache_arr[idx]=x;
				return;
			}
			idx=cache_arr.push(x)-1;
			cache_index.set(key,idx);
			return idx;
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
	export_(exports => {exports.IndexedDBService=IndexedDBService;});
}
export_(exports => {exports.init_module=init_module;});
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
export_(exports => exports.__module_loaded__=true);
