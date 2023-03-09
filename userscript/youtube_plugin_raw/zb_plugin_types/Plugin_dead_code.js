import {IndexedDBService,TypedIndexedDB} from "../zc_child_modules/YTPlugin_IndexedDB.user";
import {as_any} from "../zc_child_modules/YtPlugin_Base.user";
export class IndexedDBDeadCode extends IndexedDBService {
	/**
	 * @template {"boxed_id"} K
	 * @template {G_BoxedDatabaseData} T
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
	/** @template T @typedef {[true,"unknown","new_info",T]|[false,"missing2",[keyof FromDbData,keyof (FromDbData["value"])],T]|[false,"update2",keyof FromDbData,T]|[false,"update",keyof T,T]|[true,"update",keyof T,T]|[false,"missing",keyof FromDbData,T]|[true,"ok",T]|[false,"bad",T]} UpdateSchemaItem */
	/** @template {G_BoxedDatabaseData} T @arg {T} x */
	update_obj_schema_r(x) {
		/** @type {(UpdateSchemaItem<T>)[]} */
		const arr=[];
		this.update_obj_schema_2(x,arr);
		this.update_obj_schema_3(x,arr);
	}
	/** @template {G_BoxedDatabaseData} T @arg {T} x @arg {(UpdateSchemaItem<T>)[]} res */
	update_obj_schema_2(x,res) {
		let ok=true;
		if(!x.z) {
			res.push([false,"update","z",x]); ok=false;
			/** @type {{key:DST_LoadId["key"],tag:string,value?: {raw:number}}} */
			let o1=as_any(x);
			if(o1.value&&o1.value.raw&&o1.tag) {
				const jl={b: "boxed_id",j: o1.tag,key: x.key,z: [{type: "number",z: [o1.value.raw]}]};
				/** @type {T} */
				const jr=as_any(jl); ok=false; res.push([ok,"update2","value",jr]);
			}
			/** @type {FromDbData} */
			let o2=as_any(x);
			if(!o2.value) {
				ok=false;
				debugger; res.push([false,"missing","value",x]);
			}
			switch(o2.tag) {
				default: debugger; break;
				case "number": break;
				case "channel_id:UC": {
					const {key,tag,value}=o2;
					/** @type {DI_A_ChannelId_UC} */
					let bt=this.make_abcz(value.type,value.tag,[
						this.make_DI_T_Item_AB("raw_id",this.make_prim_v(value.info_arr[0].raw_id)),
						this.make_DI_T_Item_AB("id",this.make_prim_v(value.info_arr[1].id)),
					]);
					/** @type {DST_Channel_UC} */
					const z=this.make_ST_jz(key,tag,bt);
					/** @type {T} */
					ok=false; const zr=as_any(z); res.push([ok,"update","key",zr]);
				} break;
				case "keys": break;
				case "string": break;
				case "video_id": {
					const {key,tag,value}=o2;
					/** @type {DI_A_VideoId} */
					let bt=this.make_abwz_item(value.type,this.make_DI_T_Item_AB("raw_id",this.make_prim_v(value.info_arr[0].raw_id)));
					/** @type {DST_Video_Id} */
					const z=this.make_ST_jz(key,tag,bt);
					/** @type {T} */
					ok=false; const zr=as_any(z); res.push([ok,"update","key",zr]);
				} break;
				case "playlist_id:RD": {
					const {key,value}=o2;
					/** @type {DI_A_Playlist_RD} */
					let bt=this.make_abcz("playlist_id","RD",[
						this.make_DI_T_Item_AB("raw_id",this.make_prim_v(value.info_arr[0].raw_id)),
						this.make_DI_T_Item_AB("id",this.make_prim_v(value.info_arr[1].id)),
					]);
					/** @type {DST_Playlist_RD} */
					const z=this.make_ST_jz(key,"playlist_id:RD",bt);
					/** @type {T} */
					ok=false; const zr=as_any(z); res.push([ok,"update","key",zr]);
				} break;
			}
			const {key,value}=o2;
			if(!("info_arr" in value)) {
				ok=false;
				res.push([ok,"missing2",["value","info_arr"],x]);
			}
			let o_arr_t=value.info_arr[0];
			if(o_arr_t instanceof Array) {
				switch(o_arr_t[0]) {
					default: debugger; ok=true; res.push([ok,"unknown","new_info",x]); return;
					case "many":
					case "arr":
					case "one": {
						const i3={a: "group_value",b: "item",c: o_arr_t[0],f: value.type,z: [o_arr_t[1]]};
						/** @type {DSS_Bigint["z"][0]} */
						const i2={a: "group",b: value.type,z: [as_any(i3)]};
						/** @type {DSS_Bigint} */
						const z={key: as_any(key),a: "SI:T:D",b: "boxed_id",d: "bigint",w: "/key/a/b/d/w/z",z: [i2]};
						return [true,z];
					}
				}
			}
			debugger;
		}
		if(ok) res.push([true,"ok",x]); else res.push([ok,"bad",x]);
		return;
	}
	/** @template {G_BoxedDatabaseData} T @arg {T} u @arg {(UpdateSchemaItem<T>)[]} arr */
	update_obj_schema_3(u,arr) {
		u;
		for(let x of arr) {
			let unk=null,ok_=null,update_ok=null;
			let missing=null,update_bad=null,bad=null,missing2=null,update2=null;
			if(x[0]) switch(x[1]) {
				case "ok": ok_=x; break;
				case "unknown": unk=x; break;
				case "update": update_ok=x; break;
			}
			else switch(x[1]) {
				case "bad": bad=x; break;
				case "missing": missing=x; break;
				case "missing2": missing2=x; break;
				case "update": update_bad=x; break;
				case "update2": update2=x; break;
			}
			/** @arg {[false, "missing2", [keyof FromDbData, keyof FromDbData["value"]], T]|[false,"missing",keyof G_BoxedDatabaseData,T]|[false,"missing",keyof FromDbData,T]|null} x */
			function kty_missing(x) {
				if(!x) return;
				switch(x[2]) {
					case "key": break;
					case "tag": break;
					case "type": break;
					case "value": break;
				}
			}
			/** @arg {[true,"ok",T]|[true,"unknown","new_info",T]|null} x */
			function kty3(x) {
				if(!x) return;
				switch(x[1]) {
					default: debugger; break;
					case "unknown": break;
					case "ok": {
						console.log(...x);
					} return;
				}
				switch(x[2]) {
					default: debugger; break;
					case "new_info": break;
				}
				console.log(...x);
			};
			/** @arg {[false, "update2", keyof FromDbData, T]|[true, "update", keyof T, T]|[false, "update", keyof T, T]} x */
			function kty_upd(x) {
				x;
			}
			/** @arg {[false, "bad", T]} x */
			function kty_bad(x) {
				x;
			}
			kty_missing(missing);
			update_bad&&kty_upd(update_bad);
			kty3(unk);
			kty3(ok_);
			update_ok&&kty_upd(update_ok);
			bad&&kty_bad(bad);
			update2&&kty_upd(update2);
			missing2&&kty_missing(missing2);
		}
	}
}
