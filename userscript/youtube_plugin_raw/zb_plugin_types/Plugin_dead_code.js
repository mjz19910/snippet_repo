import {IndexedDBService,TypedIndexedDB} from "../zc_child_modules/YTPlugin_IndexedDB.user";
export class IndexedDBDeadCode extends IndexedDBService {
	/**
	 * @template {"boxed_id"} K
	 * @template {import("../yt_json_types/ghi/group_G.js").G_BoxedDatabaseData} T
	 * @param {IDBTransaction} tx
	 * @param {K} key
	 * @param {IDBDatabase} db
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
}
