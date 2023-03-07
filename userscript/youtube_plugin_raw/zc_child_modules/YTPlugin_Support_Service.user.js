// ==UserScript==
// @name	YTPlugin Support Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.2
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support_Service.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support_Service.user.js
// ==/UserScript==

const {do_export,as,split_string_once,split_string,split_string_once_ex,split_string_once_last,ApiBase,ApiBase2,as_any,BaseService,JsonReplacerState}=require("./YtPlugin_Base.user");

const __module_name__="mod$SupportService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
//#region SeenDatabase & non support exports
/** @private @arg {WA|null} _wa @template {[string,string]} WA @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {TI_SplitOnce_v2<WA,S,D>} */
function split_string_once_ex_v2(s,d=as(","),_wa) {
	if(s==="") {
		/** @private @type {[]} */
		let r=[];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let i=s.indexOf(d);
	if(i===-1) {
		/** @private @type {[S]} */
		let r=[s];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let a=s.slice(0,i);
	let b=s.slice(i+d.length);
	/** @private @type {[string,string]} */
	let r=[a,b];
	/** @private @type {any} */
	let q=r;
	return as(q);
}
/** @template {{}} T */
class OnePropertyObjArray {
	/** @arg {ApiBase} cls */
	constructor(cls) {
		this.cls=cls;
	}
	/** @type {T[]} */
	arr=[];
	/** @arg {T} v */
	push(v) {
		if(this.cls.get_keys_of(v).length!==1) debugger;
		this.arr.push(v);
	}
	get length() {return this.arr.length;}
	[Symbol.iterator]() {return this.arr[Symbol.iterator]();}
}
export_(exports => {exports.OnePropertyObjArray=OnePropertyObjArray;});
class TypedefGenerator extends BaseService {
	/** @arg {D_TypedefGenerator_Popup} x */
	D_TypedefGenerator_Popup(x) {
		const cf="popup_dialog"; cf; this.sm.k(cf,x);
		let x1=this.sm.unpack_popup_dialog(x);
		if(!x1[0]) {debugger; return null;}
		let dialog=x1[1];
		return this.D_TypedefGenerator_Popup_R(dialog);
	}
	/** @arg {D_TypedefGenerator_Popup_R} x */
	D_TypedefGenerator_Popup_R(x) {
		const cf="R_ConfirmDialog"; cf; this.sm.k(cf,x);
		if("confirmDialogRenderer" in x) return "TYPE::Popup_ConfirmDialog";
		if("fancyDismissibleDialogRenderer" in x) return "TYPE::Popup_DismissibleDialog";
		return null;
	}
}
export_(exports => {exports.TypedefGenerator=TypedefGenerator;});
/** @private @template T */
class BitmapResult {
	/** @constructor @public @arg {T[]} map_arr @arg {string} bitmap */
	constructor(map_arr,bitmap) {
		this.map_arr=map_arr;
		this.bitmap=bitmap;
	}
}
/** @template {keyof J_StoreTypeMap} CLS_K */
class StoreDescription extends ApiBase2 {
	/** @type {Map<string,number>} */
	key_index=new Map;
	/** @type {Map<string,number>} */
	new_key_index=new Map;
	/** @type {[string, make_item_group<J_StoreTypeMap[CLS_K]>][]} */
	data=[];
	/** @type {[string, make_item_group<J_StoreTypeMap[CLS_K]>][]} */
	new_data=[];
	/** @arg {CLS_K} type @arg {J_StoreStrMap[CLS_K]} type_arr @arg {()=>void} data_update_callback */
	constructor(type,type_arr,data_update_callback) {
		super();
		this.type=type;
		this.type_arr=type_arr;
		this.data_update_callback=data_update_callback;
	}
	/** @arg {string} k @arg {make_item_group<J_StoreTypeMap[CLS_K]>} x */
	add_data_to_index(k,x) {
		let idx=this.key_index.get(k);
		if(idx!==void 0) {
			this.data[idx]=[k,x];
			return;
		}
		let new_len=this.data.push([k,x]);
		this.key_index.set(k,new_len-1);
		this.data_update_callback();
	}
	/** @arg {string} k @arg {make_item_group<J_StoreTypeMap[CLS_K]>} x */
	add_new_data_to_index(k,x) {
		let idx=this.new_key_index.get(k);
		if(idx!==void 0) {
			this.new_data[idx]=[k,x];
			return;
		}
		let new_len=this.new_data.push([k,x]);
		this.new_key_index.set(k,new_len-1);
	}
	/** @arg {string} k @arg {make_item_group<J_StoreTypeMap[CLS_K]>} x */
	push_new_data(k,x) {
		this.add_new_data_to_index(k,x);
		this.add_data_to_index(k,x);
	}
	/** @arg {DSI_T_Item_ABD<CLS_K,J_StoreTypeMap[CLS_K]>} item */
	load_data(item) {
		const x=item.z[0].z[0];
		const k=item.z[0].b;
		this.add_data_to_index(k,x);
	}
	/** @template {make_item_group<J_StoreTypeMap[CLS_K]>} R @arg {R} x @returns {R} */
	clone_container(x) {
		switch(x.c) {
			default: debugger; throw new Error("Unable to clone");
			case "arr": {
				/** @type {typeof x} */
				let x_clone=structuredClone(x);
				return x_clone;
			}
			case "many": {
				/** @type {typeof x} */
				let x_clone=structuredClone(x);
				return x_clone;
			}
			case "one": {
				/** @type {typeof x} */
				let x_clone=structuredClone(x);
				return x_clone;
			}
		}
	}
	/** @template {make_item_group<J_StoreTypeMap[CLS_K]>} T @arg {T} x @template {make_item_group<J_StoreTypeMap[CLS_K]>} U @arg {(x:T)=>U} prepare */
	clone_and_then(x,prepare) {
		let x1=this.clone_container(x);
		return prepare(x1);
	}
	/** @template {make_item_group<J_StoreTypeMap[CLS_K]>} T @arg {T} x @template TI @template {make_arr_t<TI>} U @arg {(x:T)=>U} prepare */
	clone_and_then_arr(x,prepare) {
		let x1=this.clone_container(x);
		return prepare(x1);
	}
	/** @template T @template {[string,"one",T]|[string,"arr",T[]]|[string,"many",T[][]]} TA @arg {TA} arg0 */
	make_item(...[f,c,x]) {
		switch(c) {
			case "one": return this.make_one_t(f,x);
			case "arr": return this.make_arr_t(f,x);
			case "many": return this.make_many_t(f,x);
		}
	}
	/** @arg {string} f @template T @arg {T} x @returns {make_one_t<T>} */
	make_one_t(f,x) {return this.make_group([x],f,"one");}
	/** @arg {string} f @template T @arg {T[][]} x @returns {make_many_t<T>} */
	make_many_t(f,x) {return this.make_group([x],f,"many");}
	/** @arg {string} f @template T @arg {T[]} x @returns {make_arr_t<T>} */
	make_arr_t(f,x) {return this.make_group([x],f,"arr");}
	/**
	 * @template Z @arg {Z} z @template {string} F @arg {F} f
	 * @template {string} C @arg {C} c
	 * @param {"item"} b
	 * @param {"group_value"} a
	 * @returns {{a:"group_value",b:"item",c:C,f:F,z:Z}}
	 **/
	make_group(z,f,c,b="item",a="group_value") {return {a,b,c,f,z};}
	/** @arg {string} k @arg {make_item_group<J_StoreTypeMap[CLS_K]>} x_container */
	save_data(k,x_container) {
		if(this.includes_key(k)) {
			let idx=this.key_index.get(k);
			if(idx===void 0) throw new Error();
			let y_item=this.data[idx];
			let y_container=y_item[1];
			if(!("b" in x_container)) {x_container;}
			if(y_container.c==="many"&&x_container.c==="arr") {
				let {z: [y_many]}=y_container;
				if(y_many.findIndex(y_arr => this.eq_keys(y_arr,x_container.z[0]))>-1) return;
				let new_container=this.clone_and_then(y_container,x1 => (x1.z[0].push(x_container.z[0]),x1));
				this.push_new_data(k,new_container);
				return;
			}
			if(y_container.c==="arr"&&x_container.c==="one") {
				let {z: [item_arr]}=y_container;
				if("special" in x_container) {debugger; return;}
				if(item_arr.includes(x_container.z[0])) return;
				let new_container=this.clone_and_then(y_container,x1 => (x1.z[0].push(x_container.z[0]),x1));
				this.push_new_data(k,new_container);
				return;
			}
			if(y_container.c==="arr"&&x_container.c==="arr") {
				let {z: [y_arr]}=y_container;
				if(this.eq_keys(y_arr,x_container.z[0])) return;
				let {f,z: [y1_arr]}=this.clone_container(y_container);
				this.push_new_data(k,this.make_many_t(f,[y1_arr,x_container.z[0]]));
				return;
			}
			if(y_container.c==="one"&&x_container.c==="one") {
				const {z: [y]}=y_container,{z: [x]}=x_container;
				if(y===x) return;
				let new_container=this.clone_and_then(y_container,y1 => this.make_arr_t(y1.f,[y1.z[0],x]));
				this.push_new_data(k,new_container);
				return;
			}
			debugger;
			return;
		}
		this.push_new_data(k,x_container);
	}
	/** @api @public @this {V_StoreKeys} @template {{}} T @arg {string} k @arg {T|undefined} obj */
	save_keys(k,obj) {
		if(!obj) {debugger; return;}
		/** @type {{}} */
		let tc=obj;
		let zo=null;
		let ta=typeof tc;
		switch(ta) {
			default: {
				ta==="";
			} break;
			case "bigint": zo=ta; break;
			case "boolean": zo=ta; break;
			case "function": zo=ta; break;
			case "number": zo=ta; break;
			case "object": zo=ta; break;
			case "string": zo=ta; break;
			case "symbol": zo=ta; break;
			case "undefined": zo=ta; break;
		}
		if(typeof obj!=="object") {
			if(zo===null) throw new Error("Invalid state");
			switch(zo) {
				case "bigint": throw new Error("Unable to save type");
				case "boolean": throw new Error("Unable to save type");
				case "function": throw new Error("Unable to save type");
				case "number": this.save_data(`${k}.type`,this.make_one_t(k,zo)); break;
				case "object": throw new Error("Unable to save type");
				case "string": this.save_data(`${k}.type`,this.make_one_t(k,zo)); break;
				case "symbol": throw new Error("Unable to save type");
				case "undefined": throw new Error("Unable to save type");
			}
			return;
		}
		/** @type {object} */
		let q=obj;
		if(q instanceof Array) {
			/** @type {make_instance_name_t<"array">} */
			const z2=this.make_group(["array"],k,"instance_name");
			this.save_data(`${k}.instance`,z2);
			return;
		}
		let value=this.get_keys_of(obj);
		return this.save_data(k,this.make_arr_t(k,value));
	}
	/** @arg {string} k @arg {make_item_group<J_StoreTypeMap[CLS_K]>} x */
	add_to_index(k,x) {
		/** @type {[typeof k,typeof x]} */
		let p=[k,x];
		let nk=this.data.push(p)-1;
		this.key_index.set(k,nk);
		return p;
	}
	/** @arg {string} k */
	includes_key(k) {
		let idx=this.key_index.get(k);
		if(idx!==void 0) return true;
		return false;
	}
	/** @arg {string} key */
	index_get(key) {
		let idx=this.key_index.get(key);
		if(idx===void 0) return null;
		return this.data[idx];
	}
}
export_(exports => {exports.StoreDescription=StoreDescription;});
class StoreData {
	/** @type {Map<StoreDataInput["type"],StoreDataInput["description"]>} */
	stores=new Map;
	/** @arg {()=>void} data_update_callback */
	constructor(data_update_callback) {
		/** @arg {StoreDataInput["type"]} type @returns {StoreDataInput} */
		function make_store(type) {
			switch(type) {
				case "bigint": {
					/** @type {StoreDescription<"bigint">} */
					const description=new StoreDescription(type,[type],data_update_callback); return {type,description};
				}
				case "boolean": {
					/** @type {StoreDescription<typeof type>} */
					const description=new StoreDescription(type,[type],data_update_callback); return {type,description};
				}
				case "keys": {
					/** @type {StoreDescription<typeof type>} */
					const description=new StoreDescription(type,["number","string"],data_update_callback); return {type,description};
				}
				case "number": {
					/** @type {StoreDescription<typeof type>} */
					const description=new StoreDescription(type,[type],data_update_callback); return {type,description};
				}
				case "root_visual_element": {
					/** @type {StoreDescription<typeof type>} */
					const description=new StoreDescription(type,["number"],data_update_callback); return {type,description};
				}
				case "string": {
					/** @type {StoreDescription<typeof type>} */
					const description=new StoreDescription(type,[type],data_update_callback); return {type,description};
				}
			}
		}
		/** @type {["bigint","boolean","keys","number","root_visual_element","string"]} */
		const store_names_arr=["bigint","boolean","keys","number","root_visual_element","string"];
		for(let store_name of store_names_arr) this.add_store(make_store(store_name));
	}
	/** @returns {StoreDescription<"string">} */
	get_string_store() {return this.get_store("string");}
	/** @returns {StoreDescription<"number">} */
	get_number_store() {return this.get_store("number");}
	/** @template {StoreDataInput} R @template {R["type"]} T @arg {T} key @returns {Extract<R,{type:T}>["description"]} */
	get_store(key) {
		let item=this.stores.get(key);
		if(item===void 0) throw new Error();
		return item;
	}
	/** @arg {StoreDataInput} args */
	add_store(args) {let {type,description}=args; this.stores.set(type,description);}
}
export_(exports => {exports.StoreData=StoreData;});
class LocalStorageSeenDatabase extends BaseService {
	/** @arg {string} key */
	get_store_keys(key) {return this.data_store.get_store("string").index_get(key);}
	/** @public @template {string} T @arg {`[${T}]`} x @returns {T} */
	unwrap_brackets(x) {
		/** @returns {T|null} */
		function gn() {return null;}
		let wv=gn();
		let wa=split_string_once_ex(x,"[",wv);
		let [_s1,s2]=wa;
		let ua=split_string_once_last(s2,"]",wv);
		let [s3,_s4]=ua;
		return s3;
	}
	data_store=new StoreData(() => this.onDataChange());
	/** @template {StoreDataInput["type"]} SName @arg {SName extends infer I extends keyof J_StoreTypeMap?[I,make_item_group<J_StoreTypeMap[I]>]:never} args */
	save_to_data_store(...args) {
		const [sn,x]=args;
		this.data_store.get_store(sn).save_data(x.f,as(x));
	}
	/** @type {IndexedDBService} */
	idb=(() => {
		if(!this.x) {
			this.addOnServicesListener(() => {
				this.idb=this.x.get("indexed_db");
			});
			return as_any({});
		}
		return this.x.get("indexed_db");
	})();
	/** @no_mod @type {number|null} */
	#idle_id=null;
	loaded_database=false;
	onDataChange() {
		if(this.#idle_id!==null) return;
		this.is_ready=false;
		this.#idle_id=requestIdleCallback(async () => {
			const version=this.sm.indexed_db_version;
			if(!this.loaded_database) {
				try {
					await this.idb.load_database(this.data_store,version);
					this.loaded_database=true;
				} catch(err) {
					console.log("load_database failed",err);
					return;
				}
			}
			try {
				await this.idb.save_database(this.data_store,version);
			} catch(err) {
				console.log("save_database failed",err);
				return;
			}
			this.is_ready=true;
			this.#idle_id=null;
		});
	}
	/** @template {string} A @template {string} B @arg {`boxed_id:${A}:${B}`} k */
	split_box_type(k) {
		/** @returns {`${A}:${B}`|null} */
		function gn() {return null;}
		let wv=gn();
		let wa=split_string_once_ex(k,":",wv);
		if(wa.length===2) {
			wa;
		}
		/** @type {`${A}:${B}`} */
		let z1=wa[1];
		/** @returns {[A,B]|null} */
		function gb_a() {return null;}
		let [za,zb]=split_string_once_ex_v2(z1,":",gb_a());
		return this.exact_arr(za,zb);
	}
	log_load_database=false;
	expected_id=0;
	/** @api @public @arg {string} cf @template {string} T @template {`${T}${"_"|"-"}${string}`} U @arg {T} ns @arg {U} s */
	save_enum_impl(cf,ns,s) {
		/** @private @type {"_"|"-"} */
		let sep;
		/** @type {"ENUM"|"ELEMENT"} */
		let ns_name="ENUM";
		if(s.includes("-")) {
			sep="-";
			ns_name="ELEMENT";
		} else {sep="_";}
		let no_ns=split_string_once(s,ns);
		if(!no_ns[1]) throw new Error();
		let nn=split_string_once(no_ns[1],sep);
		if(!nn[1]) throw new Error();
		/** @private @type {T_SplitOnce<NonNullable<T_SplitOnce<U,T>[1]>,"">[1]} */
		let no_ns_part=nn[1];
		this.save_string(`${ns_name}::${ns}`,no_ns_part);
		this.save_string(`${cf}::enum_type`,ns_name);
		this.save_string(`${cf}::enum_namespace`,ns);
	}
	/** @public @arg {string} ns @arg {number} idx @arg {StoreDescription<"string"|"keys">} store */
	show_strings_bitmap(ns,idx,store) {
		debugger;
		let f=true;
		if(f) return;
		let p=store.data[idx];
		if(!p) return;
		let k=p[0];
		let cur=p[1];
		switch(cur.c) {
			default: debugger; break;
			case "one": debugger; break;
			case "many": {
				let src_data=cur.z[0];
				let max_len=src_data.map(e => e.length).reduce((a,b) => Math.max(a,b));
				for(let bitmap_src_idx=0;bitmap_src_idx<max_len;bitmap_src_idx++) {
					let bitmap_src=src_data.filter(e => bitmap_src_idx<e.length).map(e => e[bitmap_src_idx]);
					let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
					console.log(` --------- [${ns}] [store["${k}"][${bitmap_src_idx}]] --------- `);
					if(index_map.length===0) continue;
					console.log(index_map.map(e => `"${e}"`).join(","));
					console.log(bitmap);
				}

			} break;
			case "arr": {
				let bitmap_src=cur.z[0];
				if(bitmap_src.length===0) return;
				let linear_map=bitmap_src.every(e => {
					if(typeof e!=="string") return false;
					return !e.includes(",");
				});
				if(linear_map) {
					console.log(` --------- [${ns}] [${k}] --------- `);
					if(bitmap_src.length===0) return;
					console.log(bitmap_src.join(","));
					return;
				}
				let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
				console.log(` --------- [${ns}] [${k}] --------- `);
				if(index_map.length===0) return;
				console.log(index_map.join(","));
				console.log(bitmap);
			} break;
		}
	}
	/** @private @arg {string} x */
	rle_enc(x) {
		let rle=x.replaceAll(/(1+)|(0+)/g,(v,c1,c2) => {
			let rle=c1?.length??c2?.length;
			if(rle<4) return "!"+v[0]+":"+v.length;
			if(c1?.length!==void 0) return "!"+c1[0]+":"+c1.length;
			if(c2?.length!==void 0) return "!"+c2[0]+":"+c2.length;
			return ["!",c1?.length,"$",c2?.length,":"]+"";
		}).split("!").slice(1);
		return rle.join("!");
	}
	/** @private @template T @arg {T[]} bitmap_src */
	generate_bitmap(bitmap_src) {
		let map_arr=[...new Set([...bitmap_src.map(e => {
			if(typeof e!=="string") return [];
			return e.split(",");
		}).flat()])];
		let bitmap="\n"+bitmap_src.map(e => {
			if(typeof e!=="string") return [];
			return e.split(",").map(e => map_arr.indexOf(e));
		}).map(e => {
			let ta=new Array(map_arr.length).fill(0);
			for(let x of e) ta[x]=1;
			let bs=ta.join("");
			return bs;
		}).sort((a,b) => b.split("0").length-a.split("0").length).join("\n")+"\n";
		return new BitmapResult(map_arr,bitmap);
	}
	/** @private @arg {number[]} src */
	generate_bitmap_num_raw_fill(src,fill_value=0) {
		let map_arr=[...new Set([...src])].sort((a,b) => a-b);
		let zz=map_arr.at(-1)??0;
		let ta=new Array(zz+1).fill(fill_value);
		/** @private @type {0|1} */
		let replace_value;
		if(fill_value===0) {replace_value=1;} else {replace_value=0;}
		src.forEach(e => {ta[e]=replace_value;});
		let bs=ta.join("");
		return new BitmapResult(map_arr,bs);
	}
	bitmap_console_todo_1() {
		let yt_plugin={ds: this,};
		let gg=yt_plugin.ds.data_store.get_number_store().data.find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		if(gg[1].c!=="arr") return;
		gg[1].z[0].sort((a,b) => a-b);
		let g1=gg[1];
		/** @private @arg {string} str */
		function find_one_set_bit(str) {
			let rx=/(?<=0)1{1}(?=0)/g;
			/** @private @type {[number,string][]} */
			let r=[];
			for(;;) {
				let rr=rx.exec(str);
				if(rr===null) return r;
				r.push([rx.lastIndex,rr[0]]);
			}
		}
		let bm=yt_plugin.ds.generate_bitmap_num_raw_fill(g1.z[0],1).bitmap;
		let mm=find_one_set_bit(bm);
		/** @private @arg {string} bm */
		function unset_bits(bm) {
			let mu=bm.split("");
			for(let u of mm) {
				let [k,v]=u;
				let cx=k-1;
				let off=0;
				if(v.length===2) off=0;
				if(v.length===1) off=1;
				for(let i=cx-1;i<k+v.length-2;i++) {
					let ui=i+off;
					let log_clear=false;
					if(log_clear) console.log("clear",ui,"of",mu[ui]);
					mu[ui]="0";
				}
			}
			return mu;
		}
		/** @private @arg {string[]} s */
		function swap_mask(s) {return s.map(e => e==="0"? "1":"0").join("");}
		let mu=unset_bits(bm);
		new Map(mm);
		yt_plugin.ds.rle_enc(mu.join(""));
		let mc=swap_mask(mu);
		mm=find_one_set_bit(mc);
		mu=unset_bits(mc);
		let mu_=swap_mask(mu);
		let mx=mu_;
		let rle_x=yt_plugin.ds.rle_enc(mx);
		console.log(rle_x.split("!"));
	}
}
export_(exports => {exports.LocalStorageSeenDatabase=LocalStorageSeenDatabase;});
//#endregion
class Support_RS_Player extends BaseService {
	//#region dup
	/** @arg {`${string}.${string}`} x */
	parse_signature(x) {
		let [sig_0,sig_1]=split_string_once(x,".");
		if(sig_0.match(/^[0-9A-F]+$/)===null) debugger;
		switch(sig_0.length) {
			default: debugger; break;
			case 38: case 40:
		}
		if(sig_1.match(/^[0-9A-F]+$/)===null) debugger; if(sig_1.length!==40) debugger;
	}
	//#endregion
	/** @public @arg {RS_Player} x */
	RS_Player(x) {
		const cf="RS_Player";
		const {responseContext: {},playabilityStatus,streamingData,heartbeatParams,playerAds,playbackTracking,videoDetails,playerConfig,storyboards,microformat,cards,trackingParams,attestation,videoQualityPromoSupportedRenderers,captions,adPlacements,frameworkUpdates,endscreen,paidContentOverlay,annotations,cacheMetadata,...y}=this.s(cf,x); this.g(y);
		this.D_PlayabilityStatus(playabilityStatus);
		this.t(streamingData,this.DD_Streaming);
		this.t(heartbeatParams,this.D_HeartbeatParams);
		this.tz(playerAds,this.R_DesktopWatchAds);
		this.t(playbackTracking,x => this.xm.D_PlaybackTracking(x));
		this.t(videoDetails,x => this.ht.D_VideoDetails(x));
		this.t(playerConfig,x => this.ht.D_PlayerConfig(x));
		this.t(storyboards,this.G_PlayerStoryboards);
		this.t(microformat,this.R_PlayerMicroformat);
		this.t(cards,this.R_CardCollection);
		this.sm.trackingParams(trackingParams);
		this.t(attestation,this.R_PlayerAttestation);
		this.t(videoQualityPromoSupportedRenderers,this.R_VideoQualityPromo);
		this.t(captions,this.R_PlayerCaptionsTracklist);
		this.tz(adPlacements,x => {
			if("adPlacementRenderer" in x) return this.R_AdPlacement(x);
			let ka=this.get_keys_of(x);
			if(ka.length!==0) debugger;
		});
		this.t(frameworkUpdates,x => this.sm.D_FrameworkUpdates(x));
		this.t(endscreen,this.R_Endscreen);
		this.t(paidContentOverlay,this.R_PaidContentOverlay);
		this.tz(annotations,x => {
			if(!x.playerAnnotationsExpandedRenderer) debugger;
			this.R_PlayerAnnotationsExpanded(x);
		});
		this.t(cacheMetadata,this.sm.D_Cache_MD);
	}
	/** @private @arg {R_EndscreenElement} x */
	R_EndscreenElement(x) {this.H_("endscreenElementRenderer",x,this.D_EndscreenElement);}
	/** @private @arg {R_AdPlacementConfig} x */
	R_AdPlacementConfig(x) {this.H_("adPlacementConfig",x,this.D_AdPlacementConfig);}
	/** @private @arg {R_PlayerAnnotationsExpanded} x */
	R_PlayerAnnotationsExpanded(x) {this.H_("playerAnnotationsExpandedRenderer",x,this.D_PlayerAnnotationsExpanded);}
	/** @private @arg {R_Miniplayer} x */
	R_Miniplayer(x) {this.H_("miniplayerRenderer",x,this.D_Miniplayer);}
	/** @private @arg {R_DesktopWatchAds} x */
	R_DesktopWatchAds(x) {this.H_("playerLegacyDesktopWatchAdsRenderer",x,this.D_DesktopWatchAds);}
	/** @private @arg {R_PlayerCaptionsTracklist} x */
	R_PlayerCaptionsTracklist(x) {this.H_("playerCaptionsTracklistRenderer",x,this.D_PlayerCaptionsTracklist);}
	/** @private @arg {R_VideoQualityPromo} x */
	R_VideoQualityPromo(x) {this.H_("videoQualityPromoRenderer",x,this.D_VideoQualityPromo);}
	/** @private @arg {R_PlayerAttestation} x */
	R_PlayerAttestation(x) {this.H_("playerAttestationRenderer",x,this.D_PlayerAttestation);}
	/** @private @arg {R_CardCollection} x */
	R_CardCollection(x) {this.H_("cardCollectionRenderer",x,this.D_CardCollection);}
	/** @private @arg {R_PlayerMicroformat} x */
	R_PlayerMicroformat(x) {this.H_("playerMicroformatRenderer",x,this.D_PlayerMicroformat);}
	/** @private @arg {R_AdPlacement} x */
	R_AdPlacement(x) {this.H_("adPlacementRenderer",x,this.D_AdPlacement);}
	/** @private @arg {R_Endscreen} x */
	R_Endscreen(x) {this.H_("endscreenRenderer",x,this.D_Endscreen);}
	/** @private @arg {R_PaidContentOverlay} x */
	R_PaidContentOverlay(x) {this.H_("paidContentOverlayRenderer",x,this.D_PaidContentOverlay);}
	/** @private @arg {D_PaidContentOverlay} x */
	D_PaidContentOverlay(x) {
		const cf="D_PaidContentOverlay";
		const {text,durationMs,navigationEndpoint,icon,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(text);
		if(durationMs!=="10000") debugger;
		this.xm.E_Url(navigationEndpoint);
		this.sm.T_Icon(cf,icon);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlayabilityStatus} x */
	D_PlayabilityStatus(x) {
		const cf="D_PlayabilityStatus";
		switch(x.status) {
			default: debugger; break;
			case "LIVE_STREAM_OFFLINE": {
				const {status: {},reason,playableInEmbed,liveStreamability,miniplayer,contextParams,...y}=this.s(cf,x); this.g(y);
				this.sm.cq(reason,"This live event will begin in a few moments.");
				this.sm.a_primitive_bool(playableInEmbed);
				this.t(liveStreamability,this.R_LiveStreamability);
				this.t(miniplayer,this.R_Miniplayer);
				let ctx=atob(contextParams);
				this.sm.params("playability_status.context_params",ctx);
			} break;
			case "OK": {
				const {status,reason,playableInEmbed,liveStreamability,offlineability,miniplayer,contextParams,...y}=this.s(cf,x); this.g(y);
				this.t(reason,x => {
					switch(x) {
						default: this.cg.codegen_case(`${cf}.reason`,x); break;
						case "We're experiencing technical difficulties.":
						case "This live event has ended.":
					}
				});
				this.sm.a_primitive_bool(playableInEmbed);
				this.t(liveStreamability,this.R_LiveStreamability);
				this.t(offlineability,x => this.xm.R_Button(x));
				this.t(miniplayer,this.R_Miniplayer);
				let ctx=atob(contextParams);
				this.sm.params("playability_status.context_params",ctx);
			} break;
		}
	}
	/** @private @arg {R_LiveStreamability} x */
	R_LiveStreamability(x) {this.H_("liveStreamabilityRenderer",x,this.D_LiveStreamability);}
	/** @private @arg {D_LiveStreamability} x */
	D_LiveStreamability(x) {
		const cf="D_LiveStreamability";
		const {videoId,broadcastId,pollDelayMs,...y}=this.s(cf,x); this.g(y);
		this.sm.videoId(videoId);
		this.t(broadcastId,x => this.sm.cq(x,"1"));
		this.sm.cq(pollDelayMs,"15000");
	}
	/** @private @arg {G_PlayerStoryboards} x */
	G_PlayerStoryboards(x) {
		const cf="G_PlayerStoryboards"; this.sm.k(cf,x);
		if("playerStoryboardSpecRenderer" in x) return;
		if("playerLiveStoryboardSpecRenderer" in x) return;
		this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {D_CaptionTrackItem} x */
	D_CaptionTrackItem(x) {
		const cf="D_CaptionTrackItem",t=this;
		const {baseUrl,name,vssId,languageCode,rtl,kind,isTranslatable,...y}=t.sm.s(cf,x); t.g(y);
		{
			let x=baseUrl;
			let x1=split_string_once(x,"?");
			if(x1[0]!=="https://www.youtube.com/api/timedtext") debugger;
			let rx=t.parse_url_search_params(x1[1]);
			t.xr.D_TimedTextApi(as_any(rx));
		}
		t.sm.G_Text(name);
		t.save_string(`${cf}.vssId`,vssId);
		t.save_string(`${cf}.languageCode`,languageCode);
		t.t(kind,x => t.save_string(`${cf}.kind`,x));
		if(isTranslatable!==true) debugger;
		t.t(rtl,x => t.sm.cq(x,true));
	}
	/** @private @arg {D_AudioTrackItem} x */
	D_AudioTrackItem(x) {
		const cf="D_AudioTrackItem";
		if("defaultCaptionTrackIndex" in x) {
			const {captionTrackIndices,defaultCaptionTrackIndex,visibility,hasDefaultTrack,captionsInitialState,...y}=this.s(cf,x); this.g(y);
			this.z(captionTrackIndices,this.sm.a_primitive_num);
			this.sm.a_primitive_num(defaultCaptionTrackIndex);
			this.sm.cq(visibility,"UNKNOWN");
			this.sm.cq(hasDefaultTrack,true);
			if(captionsInitialState!=="CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED") debugger;
			return;
		}
		const {captionTrackIndices,...y}=this.s(cf,x); this.g(y);
		this.z(captionTrackIndices,this.sm.a_primitive_num);
	}
	/** @private @arg {D_TranslationLanguage} x */
	D_TranslationLanguage(x) {
		const cf="D_TranslationLanguage";
		const {languageCode,languageName,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(languageCode);
		this.sm.G_Text(languageName);
	}
	/** @private @arg {D_Endscreen} x */
	D_Endscreen(x) {
		const cf="D_Endscreen";
		const {elements,startMs,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.z(elements,this.R_EndscreenElement);
		this.t(startMs,x => this.sm.a_primitive_str(x));
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlayerAnnotationsExpanded} x */
	D_PlayerAnnotationsExpanded(x) {
		const cf="D_PlayerAnnotationsExpanded"; this.sm.k(cf,x);
		const {featuredChannel,allowSwipeDismiss,annotationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_FeaturedChannel(featuredChannel);
		this.parse_uuid(annotationId);
		this.sm.a_primitive_bool(allowSwipeDismiss);
	}
	/** @private @arg {D_HeartbeatParams} x */
	D_HeartbeatParams(x) {
		const cf="D_HeartbeatParams";
		const {intervalMilliseconds,softFailOnError,heartbeatServerData,...y}=this.s(cf,x); this.g(y);
		this.save_string(`${cf}.intervalMilliseconds`,intervalMilliseconds);
		this.sm.a_primitive_bool(softFailOnError);
		this.save_string(`${cf}.heartbeatServerData`,heartbeatServerData);
	}
	/** @private @arg {D_Miniplayer} x */
	D_Miniplayer(x) {
		const cf="D_Miniplayer";
		const {playbackMode,...y}=this.s(cf,x); this.g(y);
		if(playbackMode!=="PLAYBACK_MODE_ALLOW") debugger;
	}
	/** @private @arg {D_DesktopWatchAds} x */
	D_DesktopWatchAds(x) {
		const cf="D_DesktopWatchAds";
		const {gutParams,playerAdParams,showCompanion,showInstream,useGut,...y}=this.s(cf,x);
		/** @arg {true} x */
		const expect_true=x => this.sm.cq(x,true);
		let params_tag=this.t(gutParams,x => this.sm.B_TagObj(x));
		// cSpell:ignoreRegExp /\\\\4061\\\\ytpwmpu/
		this.t(params_tag,x => this.sm.cq(x,"\\4061\\ytpwmpu"));
		this.t(showCompanion,expect_true);
		this.t(showInstream,expect_true);
		this.t(useGut,expect_true);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[${cf}.next_key] [${ka.shift()}]`);
		}
	}
	/** @private @arg {D_PlayerMicroformat} x */
	D_PlayerMicroformat(x) {
		const cf="D_PlayerMicroformat";
		const {thumbnail,embed,title,description,lengthSeconds,ownerProfileUrl,externalChannelId,isFamilySafe,availableCountries,isUnlisted,hasYpcMetadata,viewCount,category,publishDate,ownerChannelName,liveBroadcastDetails,uploadDate,learningResource,...y}=this.s(cf,x); this.g(y);
		this.sm.D_Thumbnail(thumbnail);
		this.t(embed,this.D_MicroformatEmbed);
		this.sm.G_Text(title);
		this.t(description,this.sm.G_Text);
		this.sm.a_primitive_str(lengthSeconds);
		this.parser.parse_url(cf,ownerProfileUrl);
		this.sm.channelId(externalChannelId);
		this.sm.a_primitive_bool(isFamilySafe);
		this.z(availableCountries,x => this.sm.a_primitive_str(x));
		this.sm.a_primitive_bool(isUnlisted);
		this.sm.a_primitive_bool(hasYpcMetadata);
		this.sm.a_primitive_str(viewCount);
		this.D_VideoCategory(category);
		this.sm.a_primitive_str(publishDate);
		this.sm.a_primitive_str(ownerChannelName);
		this.t(liveBroadcastDetails,this.D_LiveBroadcastDetails);
		this.sm.a_primitive_str(uploadDate);
		this.t(learningResource,this.D_LearningResource);
	}
	/** @private @arg {D_AdPlacement} x */
	D_AdPlacement(x) {
		const cf="D_AdPlacement";
		const {config,renderer,...y}=this.s(cf,x); this.g(y);
		this.R_AdPlacementConfig(config);
		this.sm.G_AdPlacementRendererItem(renderer);
	}
	/** @private @arg {D_PlayerCaptionsTracklist} x */
	D_PlayerCaptionsTracklist(x) {
		const cf="D_PlayerCaptionsTracklist";
		const {captionTracks,audioTracks,translationLanguages,defaultAudioTrackIndex,openTranscriptCommand,...y}=this.s(cf,x); this.g(y);
		this.z(captionTracks,this.D_CaptionTrackItem);
		this.z(audioTracks,this.D_AudioTrackItem);
		this.z(translationLanguages,this.D_TranslationLanguage);
		this.sm.a_primitive_num(defaultAudioTrackIndex);
		this.t(openTranscriptCommand,x => {
			if("changeEngagementPanelVisibilityAction" in x) return this.sm.A_ChangeEngagementPanelVisibility(x);
			debugger;
		});
	}
	/** @private @arg {D_VideoQualityPromo} x */
	D_VideoQualityPromo(x) {
		const cf="D_VideoQualityPromo";
		const {triggerCriteria,text,endpoint,trackingParams,snackbar,...y}=this.s(cf,x); this.g(y);
		this.D_TriggerCriteria(triggerCriteria);
		this.sm.G_Text(text);
		this.xm.E_Url(endpoint);
		this.sm.trackingParams(trackingParams);
		this.sm.RA_Notification(snackbar);
	}
	/** @private @arg {D_PlayerAttestation} x */
	D_PlayerAttestation(x) {
		const cf="D_PlayerAttestation";
		const {challenge,botguardData,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(challenge);
		this.D_Botguard(botguardData);
	}
	/** @private @arg {DD_Streaming} x */
	DD_Streaming(x) {
		const cf="DD_Streaming";
		const {expiresInSeconds,adaptiveFormats,formats,probeUrl,dashManifestUrl,hlsManifestUrl,...y}=this.s(cf,x); this.g(y);
		this.sm.parse_number_template(expiresInSeconds);
		this.z(adaptiveFormats,this.D_AdaptiveFormatItem);
		this.tz(formats,this.D_FormatItem);
		this.t(probeUrl,x => this.parser.parse_url(cf,x));
		this.t(dashManifestUrl,x => this.sm.a_primitive_str(x));
		this.t(hlsManifestUrl,x => this.sm.a_primitive_str(x));
	}
	/** @private @arg {D_AdPlacementConfig} x */
	D_AdPlacementConfig(x) {
		const cf="D_AdPlacementConfig";
		const {kind,adTimeOffset,hideCueRangeMarker,...y}=this.s(cf,x); this.g(y);
		switch(kind) {
			default: debugger; break;
			case "AD_PLACEMENT_KIND_END":
			case "AD_PLACEMENT_KIND_SELF_START":
			case "AD_PLACEMENT_KIND_START":
		}
		this.t(adTimeOffset,this.D_AdTimeOffset);
		this.sm.cq(hideCueRangeMarker,true);
	}
	/** @private @arg {D_TriggerCriteria} x */
	D_TriggerCriteria(x) {
		const cf="D_TriggerCriteria";
		const {connectionWhitelist,joinLatencySeconds,rebufferTimeSeconds,watchTimeWindowSeconds,refractorySeconds,...y}=this.s(cf,x); this.g(y);
		if(connectionWhitelist.length!==1) debugger;
		this.sm.cq(connectionWhitelist[0],"WIFI");
		if(joinLatencySeconds!==15) debugger;
		if(rebufferTimeSeconds!==10) debugger;
		if(watchTimeWindowSeconds!==180) debugger;
		if(refractorySeconds!==2592000) debugger;
	}
	/** @private @arg {`${D_AudioSampleRate}`} x */
	D_AudioSampleRate(x) {
		switch(x) {
			default: debugger; break;
			case "22050": case "44100": case "48000":
		}
	}
	/** @private @arg {D_FormatItem} x */
	D_FormatItem(x) {
		const cf="D_FormatItem";
		const {itag,url,mimeType,bitrate,width,height,lastModified,contentLength,quality,fps,qualityLabel,projectionType,averageBitrate,audioQuality,approxDurationMs,audioSampleRate,audioChannels,signatureCipher,...u}=this.s(cf,x);
		this.sm.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.sm.a_primitive_str(mimeType);
		this.sm.a_primitive_num(bitrate);
		this.t(width,this.sm.a_primitive_num);
		this.t(height,this.sm.a_primitive_num);
		this.sm.a_primitive_str(lastModified);
		this.t(contentLength,x => this.sm.a_primitive_str(x));
		this.sm.a_primitive_str(quality);
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,x => this.sm.a_primitive_str(x));
		if(projectionType!=="RECTANGULAR") debugger;
		this.t(averageBitrate,this.sm.a_primitive_num);
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.sm.a_primitive_str(approxDurationMs);
		this.t(audioSampleRate,this.D_AudioSampleRate);
		this.t(audioChannels,x => {if(x!==2) debugger;});
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
		const {xtags,...y}=u; this.g(y);
		this.t(xtags,x => this.sm.params("format_item.xtags",x));
	}
	/** @private @arg {D_UUIDString} x */
	parse_uuid(x) {
		let uuid_parts=split_string(x,"-");
		let [_up0,_up1,_up2,up3,_up4]=uuid_parts;
		let bd=parseInt(split_string(up3,"")[0],16).toString(2);
		if(bd.length!==4) debugger;
		if(bd.slice(0,2)!=="10") debugger;
		return uuid_parts;
	}
	/** @private @arg {D_FeaturedChannel} x */
	D_FeaturedChannel(x) {
		const cf="D_FeaturedChannel"; this.sm.k(cf,x);
		const {startTimeMs,endTimeMs,watermark,trackingParams,navigationEndpoint,channelName,subscribeButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([startTimeMs,endTimeMs],x => this.sm.a_primitive_str(x));
		this.sm.D_Thumbnail(watermark);
		this.sm.trackingParams(trackingParams);
		x: {
			let x2=navigationEndpoint;
			if(this.sm.is_TE_VE(x2,3611)) {this.sm.E_VE3611(x2); break x;}
			debugger;
		}
		this.sm.a_primitive_str(channelName);
		this.xm.R_SubscribeButton(subscribeButton);
	}
	/** @private @arg {D_Botguard} x */
	D_Botguard(x) {
		const cf="D_Botguard";
		const {program,interpreterSafeUrl,serverEnvironment,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(program);
		let interpreterUrl=this.sm.UrlWrappedValueT(interpreterSafeUrl);
		this.sm.a_primitive_str(interpreterUrl);
		this.save_number(`${cf}.serverEnvironment`,serverEnvironment);
	}
	/** @private @arg {D_CardCollection} x */
	D_CardCollection(x) {
		const cf="D_CardCollection";
		const {cards,headerText,icon,closeButton,trackingParams,allowTeaserDismiss,logIconVisibilityUpdates,...y}=this.s(cf,x); this.g(y);
		this.z(cards,this.R_Card);
		this.sm.G_Text(headerText);
		this.R_InfoCardIcon(icon);
		this.R_InfoCardIcon(closeButton);
		this.sm.trackingParams(trackingParams);
		this.sm.cq(allowTeaserDismiss,true);
		this.sm.cq(logIconVisibilityUpdates,true);
	}
	/** @private @arg {D_MicroformatEmbed} x */
	D_MicroformatEmbed(x) {
		const cf="D_CardCollection";
		const {iframeUrl,flashUrl,width,height,flashSecureUrl,...y}=this.s(cf,x); this.g(y);
		this.parser.parse_url(cf,iframeUrl);
		this.parser.parse_url(cf,flashUrl);
		this.save_number(`${cf}.width`,width);
		this.save_number(`${cf}.height`,height);
		this.parser.parse_url(cf,flashSecureUrl);
	}
	/** @private @arg {D_VideoCategory} x */
	D_VideoCategory(x) {
		switch(x) {
			default: {
				switch(x) {
				}
				debugger;
			} break;
			case "News & Politics":
			case "Nonprofits & Activism":
			case "Travel & Events": case "Sports": case "Education": case "Pets & Animals":
			case "Autos & Vehicles": case "Comedy": case "Entertainment": case "Film & Animation": case "Gaming":
			case "Howto & Style": case "Music": case "People & Blogs": case "Science & Technology":
		}
	}
	/** @private @arg {D_LiveBroadcastDetails} x */
	D_LiveBroadcastDetails(x) {
		const cf="D_LiveBroadcastDetails";
		const {isLiveNow,startTimestamp,...y}=this.s(cf,x);
		this.sm.a_primitive_bool(isLiveNow);
		this.sm.a_primitive_str(startTimestamp);
		if("endTimestamp" in y) {
			const {endTimestamp,...y1}=y; this.g(y1);
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_AdaptiveFormatItem} x */
	D_AdaptiveFormatItem(x) {
		const cf="D_AdaptiveFormatItem";
		const {itag,url,mimeType,bitrate,width,height,initRange,indexRange,lastModified,contentLength,quality,xtags,fps,qualityLabel,projectionType,targetDurationSec,maxDvrDurationSec,audioTrack,averageBitrate,colorInfo,highReplication,audioQuality,approxDurationMs,audioSampleRate,audioChannels,loudnessDb,signatureCipher,...y}=this.s(cf,x); this.g(y);
		this.t(audioTrack,this.D_AudioTrack);
		this.sm.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.sm.a_primitive_str(mimeType);
		this.sm.a_primitive_num(bitrate);
		this.t(width,this.sm.a_primitive_num);
		this.t(height,this.sm.a_primitive_num);
		this.t(initRange,this.D_Range);
		this.t(indexRange,this.D_Range);
		this.t(lastModified,x => this.sm.a_primitive_str(x));
		this.t(contentLength,x => this.sm.a_primitive_str(x));
		this.sm.a_primitive_str(quality);
		this.t(xtags,x => this.sm.params("adaptive_format_item.xtags",x));
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,x => this.sm.a_primitive_str(x));
		if(projectionType!=="RECTANGULAR") debugger;
		this.t(targetDurationSec,x => this.sm.cq(x,1));
		this.t(maxDvrDurationSec,x => this.sm.cq(x,43200));
		maxDvrDurationSec;
		this.t(averageBitrate,this.sm.a_primitive_num);
		this.t(colorInfo,this.D_FormatColorInfo);
		this.t(highReplication,x => {if(x!==true) debugger;});
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.t(approxDurationMs,x => this.sm.a_primitive_str(x));
		this.t(audioSampleRate,this.D_AudioSampleRate);
		this.t(audioChannels,x => {
			if(x!==2) debugger;
		});
		this.t(loudnessDb,this.sm.a_primitive_num);
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
	}
	/** @private @arg {R_Card} x */
	R_Card(x) {this.H_("cardRenderer",x,this.D_Card);}
	/** @private @arg {R_InfoCardIcon} x */
	R_InfoCardIcon(x) {this.H_("infoCardIconRenderer",x,this.D_InfoCardIcon);}
	/** @private @arg {"D_AdaptiveFormatItem"|"D_FormatItem"} cf @arg {D_FormatItem_SignatureCipher_SP} x */
	D_Format_signatureCipher(cf,x) {
		/** @type {`${cf}:signatureCipher`} */
		const cf1=`${cf}:signatureCipher`;
		let {s: {},sp,url,...y}=this.parse_url_search_params(x); this.g(y);
		switch(sp) {
			default: debugger; break;
			case "sig": break;
		}
		this.parser.parse_url(cf1,as_any(url));
	}
	/** @private @arg {D_FormatColorInfo} x */
	D_FormatColorInfo(x) {
		const cf="D_Range";
		const {primaries,transferCharacteristics,matrixCoefficients,...y}=this.s(cf,x); this.g(y);
		switch(primaries) {
			default: debugger; break;
			case "COLOR_PRIMARIES_BT709":
			case "COLOR_PRIMARIES_BT2020":
			case void 0:
		}
		switch(transferCharacteristics) {
			default: debugger; break;
			case "COLOR_TRANSFER_CHARACTERISTICS_ARIB_STD_B67":
			case "COLOR_TRANSFER_CHARACTERISTICS_BT709":
		}
		switch(matrixCoefficients) {
			default: debugger; break;
			case "COLOR_MATRIX_COEFFICIENTS_BT709":
			case "COLOR_MATRIX_COEFFICIENTS_BT2020_NCL":
			case void 0:
		}
	}
	/** @private @arg {D_FormatFps} x */
	D_FormatFps(x) {
		const cf="D_FormatFps";
		this.save_number(cf,x);
	}
	/** @private @arg {D_Range} x */
	D_Range(x) {
		const cf="D_Range";
		const {start,end,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(start);
		this.sm.a_primitive_str(end);
	}
	/** @private @arg {D_AdTimeOffset} x */
	D_AdTimeOffset(x) {
		const cf="D_AdTimeOffset";
		const {offsetStartMilliseconds,offsetEndMilliseconds,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(offsetStartMilliseconds);
		if(offsetEndMilliseconds!=="-1") debugger;
	}
	/** @private @arg {D_EndscreenElement} x */
	D_EndscreenElement(x) {
		const cf="D_EndscreenElement";
		const {style,image,playlistLength,icon,left,width,top,aspectRatio,startMs,endMs,title,metadata,callToAction,dismiss,endpoint,subscribersText,hovercardButton,trackingParams,isSubscribe,id,thumbnailOverlays,...y}=this.s(cf,x); this.g(y);
		switch(style) {
			default: debugger; break;
			case "CHANNEL":
			case "VIDEO":
			case "WEBSITE":
			case "PLAYLIST":
		}
		this.sm.D_Thumbnail(image);
		this.t(playlistLength,this.sm.G_Text);
		this.t(icon,this.sm.D_Thumbnail);
		this.sm.a_primitive_num(left);
		this.sm.a_primitive_num(width);
		this.sm.a_primitive_num(top);
		this.sm.a_primitive_num(aspectRatio);
		this.sm.a_primitive_str(startMs);
		this.sm.a_primitive_str(endMs);
		this.sm.G_Text(title);
		this.sm.G_Text(metadata);
		this.t(callToAction,this.sm.G_Text);
		this.t(dismiss,this.sm.G_Text);
		this.sm.D_EndscreenElement_EP(endpoint);
		this.t(subscribersText,this.sm.G_Text);
		this.t(hovercardButton,this.xm.R_SubscribeButton);
		this.sm.trackingParams(trackingParams);
		this.t(isSubscribe,this.sm.a_primitive_bool);
		this.sm.a_primitive_str(id);
		this.tz(thumbnailOverlays,this.xm.G_ThumbnailOverlayItem);
	}
	/** @private @arg {D_AudioTrack} x */
	D_AudioTrack(x) {
		const cf="D_AudioTrack";
		const {displayName,id,audioIsDefault,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(displayName);
		this.save_string(`${cf}.id`,id);
		this.sm.cq(audioIsDefault,false);
	}
	/** @private @arg {D_Card_Content} x */
	D_Card_Content(x) {
		const cf="D_Card_Content"; this.sm.k(cf,x);
		if("collaboratorInfoCardContentRenderer" in x) return this.R_CollaboratorInfoCardContent(x);
		if("playlistInfoCardContentRenderer" in x) return this.R_PlaylistInfoCardContent(x);
		if("simpleCardContentRenderer" in x) return this.xr.R_SimpleCardContent(x);
		if("videoInfoCardContentRenderer" in x) return this.xr.R_VideoInfoCardContent(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {D_Card} x */
	D_Card(x) {
		const cf="D_Card";
		const {teaser,content,cueRanges,icon,trackingParams,cardId,feature,...y}=this.s(cf,x); this.g(y);
		this.R_SimpleCardTeaser(teaser);
		this.t(content,this.D_Card_Content);
		this.z(cueRanges,this.D_CueRangeItem);
		this.sm.trackingParams(trackingParams);
		this.t(cardId,x => this.sm.a_primitive_str(x));
		this.t(feature,x => {
			if(x!=="cards") debugger;
		});
	}
	/** @private @arg {R_PlaylistInfoCardContent} x */
	R_PlaylistInfoCardContent(x) {this.H_("playlistInfoCardContentRenderer",x,this.DI_PlaylistCardContent);}
	/** @private @arg {D_PlaylistInfoCardContent} x */
	DI_PlaylistCardContent(x) {x;}
	/** @private @arg {R_CollaboratorInfoCardContent} x */
	R_CollaboratorInfoCardContent(x) {this.H_("collaboratorInfoCardContentRenderer",x,this.D_CollaboratorInfoCardContent);}
	/** @private @arg {D_CollaboratorInfoCardContent} x */
	D_CollaboratorInfoCardContent(x) {x;}
	/** @private @arg {D_TrackingParams} x */
	D_InfoCardIcon(x) {this.sm.D_TrackingParams("D_InfoCardIcon",x);}
	/** @private @arg {R_SimpleCardTeaser} x */
	R_SimpleCardTeaser(x) {this.H_("simpleCardTeaserRenderer",x,this.D_SimpleCardTeaser);}
	/** @arg {`${number}`} x */
	_bd=x => this.mb(this.sm.parse_number_template,this.m(x));
	/** @arg {`${number}`} x */
	_pn=x => this.mb(this.sm.a_primitive_num,this._bd(x));
	get bd() {return this._bd.bind(this);}
	get pn() {return this._pn.bind(this);}
	/** @private @arg {D_CueRangeItem} x */
	D_CueRangeItem(x) {
		const cf="D_CueRangeItem",t=this;
		const {startCardActiveMs,endCardActiveMs,teaserDurationMs,iconAfterTeaserMs,...y}=this.s(cf,x); this.g(y);
		this.z([startCardActiveMs,endCardActiveMs],t.pn);
		this.save_number(`${cf}.teaserDurationMs`,this.sm.parse_number_template(teaserDurationMs));
		this.save_number(`${cf}.endCardActiveMs`,this.sm.parse_number_template(endCardActiveMs));
	}
	/** @private @arg {D_SimpleCardTeaser} x */
	D_SimpleCardTeaser(x) {
		const cf="D_SimpleCardTeaser";
		const {message,trackingParams,prominent,logVisibilityUpdates,onTapCommand,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(message);
		this.sm.trackingParams(trackingParams);
		this.sm.cq(prominent,true);
		this.sm.cq(logVisibilityUpdates,true);
		this.t(onTapCommand,this.sm.A_ChangeEngagementPanelVisibility);
	}
	/** @private @arg {D_LearningResource} x */
	D_LearningResource(x) {
		const cf="D_LearningResource";
		const {learningResourceType,educationalLevel,educationalLevelCountry,...y}=this.s(cf,x); this.g(y);
		this.save_string_arr("D_LearningResource.learningResourceType",learningResourceType);
		educationalLevel&&this.save_string_arr("D_LearningResource.educationalLevel",educationalLevel);
		educationalLevelCountry&&this.save_string("D_LearningResource.educationalLevelCountry",educationalLevelCountry);
	}
}
export_(exports => {exports.Support_RS_Player=Support_RS_Player;});
class Support_RS_WatchPage extends BaseService {
	/** @public @arg {G_RS_WatchPage} x */
	RS_WatchPage(x) {
		const cf="R_WatchPage"; this.sm.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: return this.RS_VE3832_Page_Watch(x);
			default: debugger; return;
		}
		this.RS_Page_Watch(x);
	}
	/** @private @arg {RS_VE3832_Page_Watch} x */
	RS_VE3832_Page_Watch(x) {
		const cf="R_WatchPage_VE3832"; this.sm.k(cf,x);
		const {page: {},rootVe,url,endpoint,preconnect,playerResponse,response,csn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.rootVe(rootVe,3832);
		let wp_params=this.ht.D_WatchPageUrl(cf,url);
		wp_params&&this.save_keys(`VE3832.${cf}.wp_params`,wp_params);
		this.sm.E_Watch(endpoint);
		if(preconnect!==void 0) this.ht.parse_preconnect_arr(preconnect);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.x.get("x_RS_Watch").RS_Watch(response);
		this.t(csn,x => this.sm.D_VeCsn(x));
	}
	/** @private @arg {RS_Page_Watch} x */
	RS_Page_Watch(x) {
		const cf="RS_Page_Watch"; this.sm.k(cf,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.E_Watch(endpoint);
		this.x.get("x_RS_Watch").RS_Watch(response);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		let wp_params=this.ht.D_WatchPageUrl(cf,url);
		wp_params&&this.save_keys(`${cf}.wp_params`,wp_params);
		this.t(previousCsn,x => this.sm.D_VeCsn(x,true));
	}
}
export_(exports => {exports.Support_RS_WatchPage=Support_RS_WatchPage;});
class Support_RS_Watch extends BaseService {
	/** @public @arg {RS_Watch} x */
	RS_Watch(x) {
		const cf="RS_Watch";
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.RC_ResponseContext(responseContext);
		this.sm.R_TwoColumnWatchNextResults(contents);
		this.sm.E_Watch(currentVideoEndpoint);
		this.sm.trackingParams(trackingParams);
		this.sm.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => this.xm.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,x => this.xm.R_EngagementPanelSectionList(x));
		this.sm.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,x => this.sm.R_CinematicContainer(x));
		this.sm.D_FrameworkUpdates(frameworkUpdates);
	}
}
export_(exports => {exports.Support_RS_Watch=Support_RS_Watch;});
class Support_RS_Page_Browse extends BaseService {
	/** @public @arg {RS_Page_Browse} x */
	RS_Page_Browse(x) {
		const cf="RS_Page_Browse";
		if("rootVe" in x) {
			switch(x.rootVe) {
				case 3854: {
					const {rootVe,expirationTime,...y}=this.RS_Page_Browse_Omit(cf,x); this.g(y);
					this._primitive_of(expirationTime,"number");
					this.save_number(`${cf}.rootVe`,rootVe);
				} break;
				default: debugger; break;
			}
			return;
		}
		if("expirationTime" in x) {
			const {expirationTime,...y}=this.RS_Page_Browse_Omit(cf,x); this.g(y);
			this._primitive_of(expirationTime,"number");
			return;
		}
		const {...y}=this.RS_Page_Browse_Omit(cf,x); this.g(y);
	}
	/** @private */
	log_url=false;
	/** @private @arg {"RS_Page_Browse"} cf @template {RS_Page_Browse} T @arg {T} x */
	RS_Page_Browse_Omit(cf,x) {
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		debugger;
		if(page!=="browse") debugger;
		this.x.get("x_RS_Browse").RS_Browse(response);
		return y;
	}
}
export_(exports => {exports.Support_RS_Page_Browse=Support_RS_Page_Browse;});
class Support_RS_Browse extends BaseService {
	/** @public @arg {RS_Browse} x */
	RS_Browse(x) {
		const cf="RS_Browse";
		x: {
			let kk=this.get_keys_of(x);
			let jk=kk.filter(e => {
				if(e==="responseContext") return false;
				return true;
			}).join();
			// contents,header [tag_1]
			{
				jk=kk.filter(e => {
					if(e==="responseContext") return false;
					if(e==="contents") return false;
					if(e==="header") return false;
					return true;
				}).join();
				if(jk==="metadata,trackingParams,topbar,microformat,onResponseReceivedActions,frameworkUpdates") break x;
				if(jk==="trackingParams,topbar,onResponseReceivedActions,frameworkUpdates") break x;
				if(jk==="trackingParams,topbar,onResponseReceivedActions,cacheMetadata") break x;
				if(jk==="metadata,trackingParams,topbar,microformat,frameworkUpdates") break x;
				if(jk==="alerts,metadata,trackingParams,topbar,microformat,sidebar") break x;
				if(jk==="trackingParams,topbar,observedStateTags,cacheMetadata") break x;
				if(jk==="metadata,trackingParams,topbar,microformat,sidebar") break x;
				if(jk==="trackingParams,topbar,onResponseReceivedActions") break x;
				if(jk==="trackingParams,topbar,observedStateTags") break x;
				if(jk==="trackingParams,topbar") break x;
				if("contents" in x&&"header" in x) {
					console.log(`-- [RS_Browse.jk_gen_tag_1] --\n\nif(jk==="${jk}") break x;`);
					break x;
				}
			}
			// contents [tag_2]
			{
				jk=kk.filter(e => {
					if(e==="responseContext") return false;
					if(e==="contents") return false;
					return true;
				}).join();
				if(jk==="trackingParams,topbar,sidebar") break x;
				if(jk==="trackingParams,topbar") break x;
				if("contents" in x) {
					console.log(`-- [RS_Browse.jk_gen_tag_2] --\n\nif(jk==="${jk}") break x;`);
					break x;
				}
			}
			// -contents,header [tag_3]
			{
				jk=kk.filter(e => {
					if(e==="responseContext") return false;
					if(e==="header") return false;
					return true;
				}).join();
				if(jk==="trackingParams,onResponseReceivedActions") break x;
				if("header" in x) {
					console.log(`-- [RS_Browse.tag_3] --\n\nif(jk==="${jk}") break x;`);
					break x;
				}
			}
			// -contents,-header [tag_4]
			{
				if(jk==="continuationContents,metadata,trackingParams,microformat,onResponseReceivedActions,frameworkUpdates") break x;
				if(jk==="trackingParams,onResponseReceivedEndpoints") break x;
				if(jk==="trackingParams,onResponseReceivedActions") break x;
				console.log(`-- [RS_Browse.tag_4] --\n\nif(jk==="${jk}") break x;`);
				break x;
			}
		}
		const {responseContext,header,trackingParams,onResponseReceivedActions,onResponseReceivedEndpoints,contents,topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,metadata,microformat,maxAgeStoreSeconds,background,continuationContents,alerts,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.RC_ResponseContext(responseContext);
		this.t(header,this.xm.G_BrowseHeader);
		this.sm.trackingParams(trackingParams);
		this.tz(onResponseReceivedActions,this.xm.GA_ResponseReceived);
		this.tz_cf(cf,onResponseReceivedEndpoints,this.xm.GE_ResponseReceived);
		this.t(contents,this.xm.G_BrowseContents);
		this.t(topbar,this.sm.R_DesktopTopbar);
		this.t(frameworkUpdates,this.sm.R_EntityBatchUpdate);
		this.t(sidebar,this.xm.G_BrowseSidebar);
		this.tz(observedStateTags,this.sm.B_StateTag);
		this.t(cacheMetadata,this.sm.D_Cache_MD);
		this.t(metadata,this.xm.G_Browse_MD);
		this.t(microformat,this.sm.R_Microformat);
		this.t(maxAgeStoreSeconds,x => this._primitive_of(x,"number"));
		this.t(background,this.xm.R_MusicThumbnail);
		this.t(continuationContents,this.xm.RC_SectionList);
		this.tz_cf(cf,alerts,this.sm.RS_Playlist_AlertItem);
	}
}
export_(exports => {exports.Support_RS_Browse=Support_RS_Browse;});
class Support_GenericApi extends BaseService {
	/** @private @arg {Popup_DD_NotificationMenu} x */
	D_NotificationMenu_Popup(x) {
		const cf="D_NotificationMenu_Popup";
		const {popupType: a,popup: b,beReused,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(a!=="DROPDOWN") {this.sm.codegen_typedef(cf,x); return null;}
		this.t(beReused,x => this.sm.cq(x,true));
		return b;
	}
	/** @public @arg {Response} response @arg {G_ResponseTypes} x */
	G_ResponseTypes(response,x) {
		const cf="G_ResponseTypes"; this.sm.ks(cf,x);
		if(!response.ok) {
			console.log("not ok",x);
			return;
		}
		/** @private @arg {{type:string}} x */
		let g=x => {return this.save_string("need_api_type",x.type);};
		switch(x.type) {case "_Generic": return g(x);}
		/** @private */
		this._current_response_type=x.type;
		/** @private @type {{data:{responseContext:RC_ResponseContext;}}} */
		let v=x;
		this.sm.RC_ResponseContext(v.data.responseContext);
		x: if("actions" in x.data) {
			if(x.type==="account.account_menu") break x;
			if(x.type==="browse.edit_playlist") break x;
			if(x.type==="like.dislike") break x;
			if(x.type==="notification.get_notification_menu") break x;
			if(x.type==="notification.get_unseen_count") break x;
			if(x.type==="notification.modify_channel_preference") break x;
			if(x.type==="share.get_share_panel") break x;
			if(x.type==="subscription.subscribe") break x;
			if(x.type==="subscription.unsubscribe") break x;
			if(x.type==="updated_metadata") break x;
			if(x.type==="get_transcript") break x;
		}
		switch(x.type) {
			case "account.account_menu": return this.ht.RS_AccountMenu(x.data);
			case "account.accounts_list": return this.ht.RS_AccountsList(x.data);
			case "account.set_setting": return this.ht.RS_SetSetting(x.data);
			case "att.get": return this.ht.RS_AttGet(x.data);
			case "att.log": return this.ht.RS_AttLog_RC(x.data);
			case "browse.edit_playlist": return this.RSB_EditPlaylist(x.data);
			case "browse": return this.x.get("x_RS_Browse").RS_Browse(x.data);
			case "feedback": return this.ht.RS_Feedback(x.data);
			case "get_transcript": return this.ht.RSG_Transcript(x.data);
			case "get_survey": return this.ht.RSG_Survey(x.data);
			case "getAccountSwitcherEndpoint": return this.ht.REG_AccountSwitcher(x.data);
			case "getDatasyncIdsEndpoint": return this.ht.REG_DatasyncIds(x.data);
			case "guide": return this.ht.RS_Guide(x.data);
			case "like.like": return this.ht.RSL_Like(x.data);
			case "like.dislike": return this.ht.RSL_Dislike(x.data);
			case "like.removelike": return this.ht.RSL_RemoveLike(x.data);
			case "live_chat.get_live_chat_replay": return this.ht.RS_GetLiveChat(x.data);
			case "live_chat.get_live_chat": return this.ht.RS_GetLiveChat(x.data);
			case "music.get_search_suggestions": return this.ht.RSG_SearchSuggestions(x.data);
			case "next": return this.ht.RS_Next(x.data);
			case "notification.get_notification_menu": return this.RSG_NotificationMenu(x.data);
			case "notification.get_unseen_count": return this.RSG_GetUnseenCount(x.data);
			case "notification.modify_channel_preference": return this.RSM_ChannelPreference(x.data);
			case "notification.record_interactions": return this.RS_Success(x.data);
			case "player": return this.x.get("x_RS_Player").RS_Player(x.data);
			case "playlist.get_add_to_playlist": return this.RSG_AddToPlaylist(x.data);
			case "reel.reel_item_watch": return this.ht.RS_WatchReelItem(x.data);
			case "reel.reel_watch_sequence": return this.ht.RS_ReelWatchSequence(x.data);
			case "share.get_share_panel": return this.ht.RSG_SharePanel(x.data);
			case "subscription.subscribe": return this.ht.RS_Subscribe(x.data);
			case "subscription.unsubscribe": return this.ht.RS_Unsubscribe(x.data);
			case "search": return this.ht.RS_Search(x.data);
			case "updated_metadata": return this.ht.RS_UpdateMetadata(x.data);
			case "pdg.get_pdg_buy_flow": return this.ht.RSG_PdgBuyFlow(x.data);
			default: debugger; return g(x);
		}
	}
	/** @private @arg {RSG_AddToPlaylist} x */
	RSG_AddToPlaylist(x) {
		const cf="RS_GetAddToPlaylist";
		const {responseContext: {},contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_AddToPlaylist);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {RSB_EditPlaylist} x */
	RSB_EditPlaylist(x) {
		const cf="RSB_EditPlaylist";
		const {responseContext: {},status,actions,playlistEditResults,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="STATUS_SUCCEEDED") debugger;
		let [r]=this.z(actions,x => {
			if("refreshPlaylistCommand" in x) return this.C_RefreshPlaylist(x);
			if("openPopupAction" in x) return this.xm.TA_OpenPopup("TA_OpenPopup_Empty",x);
		});
		this.z(r,a => a);
		this.z(playlistEditResults,this.g);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {RSG_NotificationMenu} x */
	RSG_NotificationMenu(x) {
		const cf="RSG_NotificationMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let [ar]=this.z(actions,this.RSG_NotificationMenu_Action);
		let [u2]=this.z(ar,this.D_NotificationMenu_Popup);
		let [u3]=this.z(u2,x => this.sm.TR_MultiPageMenu("D_NotificationMenu_PopupItemMenu",x));
		this.z(u3,this.D_NotificationMenu);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {RSM_ChannelPreference} x */
	RSM_ChannelPreference(x) {
		const cf="RSM_ChannelPreference";
		const {responseContext,actions,trackingParams,frameworkUpdates,channelId,newNotificationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.RC_ResponseContext(responseContext);
		let [u1]=this.z(actions,x => {
			if(!x.openPopupAction) debugger;
			let a=this.xm.TA_OpenPopup(cf,x);
			return this.T_OpenPopup_Toast(a);
		});
		this.z(u1,this.sm.RA_Notification);
		this.sm.trackingParams(trackingParams);
		this.sm.R_EntityBatchUpdate(frameworkUpdates);
		this.sm.channelId(channelId);
		this.sm.R_SubscriptionNotificationToggleButton(newNotificationButton);
	}
	/** @private @arg {RS_Success} x */
	RS_Success(x) {
		const cf="RS_Success";
		const {responseContext: {},success,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._primitive_of(success,"boolean");
	}
	/** @private @arg {RSG_GetUnseenCount} x */
	RSG_GetUnseenCount(x) {
		const cf="RSG_GetUnseenCount";
		const {responseContext: {},actions,unseenCount,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,(x => {
			if("updateNotificationsUnseenCountAction" in x) return this.AU_NotificationsUnseenCount(x);
		}));
		if(unseenCount!==void 0) this.sm.a_primitive_num(unseenCount);
	}
	/** @private @arg {A_NotificationMenuPopup} x */
	RSG_NotificationMenu_Action(x) {
		const cf="RSG_NotificationMenu_Action";
		if("openPopupAction" in x) return this.xm.TA_OpenPopup("RSG_NotificationMenu_Action",x);
		x===""; this.sm.codegen_typedef(cf,x);
		return null;
	}
	/** @private @arg {AU_NotificationsUnseenCount} x */
	AU_NotificationsUnseenCount(x) {let [a,y]=this.sm.TE_Endpoint_2("AU_NotificationsUnseenCount","updateNotificationsUnseenCountAction",x); this.g(y); this.AD_UpdateNotificationsUnseenCount(a);}
	/** @private @template T @arg {T_OpenPopup_Toast<T>} x */
	T_OpenPopup_Toast(x) {
		const cf="T_OpenPopup_Toast";
		const {popupType,popup,...y}=this.s(cf,x); this.g(y);
		if(popupType!=="TOAST") return null;
		return popup;
	}
	/** @private @arg {AD_UpdateNotificationsUnseenCount} x */
	AD_UpdateNotificationsUnseenCount(x) {
		const cf="AD_UpdateNotificationsUnseenCount";
		const {handlerData,unseenCount,timeoutMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.a_primitive_str(handlerData);
		this.sm.a_primitive_num(unseenCount);
		this.sm.a_primitive_num(timeoutMs);
	}
	/** @private @arg {R_AddToPlaylist} x */
	R_AddToPlaylist(x) {this.H_("addToPlaylistRenderer",x,this.D_AddToPlaylist);}
	/** @private @arg {D_AddToPlaylist} x */
	D_AddToPlaylist(x) {
		const cf="D_AddToPlaylist";
		const {playlists,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(playlists,this.R_PlaylistAddToOption);
		this.z(actions,this.R_AddToPlaylistCreate);
	}
	/** @private @arg {R_AddToPlaylistCreate} x */
	R_AddToPlaylistCreate(x) {this.H_("addToPlaylistCreateRenderer",x,this.D_AddToPlaylistCreate);}
	/** @private @arg {D_AddToPlaylistCreate} x */
	D_AddToPlaylistCreate(x) {
		const cf="D_AddToPlaylistCreate";
		const {openCreateLink,nameInput,privacyInput,createAction,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.R_CompactLink(openCreateLink);
		this.xr.R_TextInputFormField(nameInput);
		this.R_Dropdown(privacyInput);
		this.xm.R_Button(createAction);
		this.sm.E_CreatePlaylistService(serviceEndpoint);
	}
	/** @private @arg {R_PlaylistAddToOption} x */
	R_PlaylistAddToOption(x) {this.H_("playlistAddToOptionRenderer",x,this.D_PlaylistAddToOption);}
	/** @private @arg {C_RefreshPlaylist} x */
	C_RefreshPlaylist(x) {let [a,y]=this.sm.TE_Endpoint_2("C_RefreshPlaylist","refreshPlaylistCommand",x); this.g(y); this.g(a);}
	/** @private @arg {D_NotificationMenu_SectionItem} x */
	D_NotificationMenu_SectionItem(x) {
		const cf="D_NotificationMenu_SectionItem";
		if("multiPageMenuNotificationSectionRenderer" in x) return this.R_MP_MenuNotificationSection(x);
		if("backgroundPromoRenderer" in x) return this.ht.R_BackgroundPromo(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {MP_NotificationMenu} x */
	D_NotificationMenu(x) {
		const cf="D_NotificationMenu";
		const {header,sections,style,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._R_SimpleMenuHeader(header);
		this.z(sections,this.D_NotificationMenu_SectionItem);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlaylistAddToOption} x */
	D_PlaylistAddToOption(x) {
		const cf="D_PlaylistAddToOption";
		const {playlistId,title,privacy,containsSelectedVideos,privacyIcon,addToPlaylistServiceEndpoint,removeFromPlaylistServiceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.playlistId(playlistId);
		this.sm.G_Text(title);
		switch(privacy) {
			default: debugger; break;
			case "PRIVATE":
			case "UNLISTED":
			case "PUBLIC":
		}
		this.sm.cq(containsSelectedVideos,"NONE");
		this.sm.cq(privacyIcon.iconType,"PRIVACY_PRIVATE");
		this.sm.E_PlaylistEdit(addToPlaylistServiceEndpoint);
		this.sm.E_PlaylistEdit(removeFromPlaylistServiceEndpoint);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {R_SimpleMenuHeader} x */
	_R_SimpleMenuHeader(x) {this.H_("simpleMenuHeaderRenderer",x,this.D_SimpleMenuHeader);}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {
		const cf="D_SimpleMenuHeader";
		const {title,buttons,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(title);
		this.z(buttons,this.xm.R_Button);
	}
	/** @private @arg {R_Dropdown} x */
	R_Dropdown(x) {this.H_("dropdownRenderer",x,this.D_Dropdown);}
	/** @private @arg {D_Dropdown_Privacy} x */
	D_Dropdown(x) {
		const cf="D_Dropdown";
		const {entries,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entries,this.R_PrivacyDropdownItem);
		this.t(label,x => this.sm.cq(x,"Privacy"));
	}
	/** @private @arg {R_MultiPageMenuNotificationSection} x */
	R_MP_MenuNotificationSection(x) {this.H_("multiPageMenuNotificationSectionRenderer",x,this.D_MP_MenuNotificationSection);}
	/** @private @arg {D_MultiPageMenuNotificationSection} x */
	D_MP_MenuNotificationSection(x) {
		const cf="D_MP_MenuNotificationSection";
		const {trackingParams,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.trackingParams(trackingParams);
		this.z(items,this.GR_MP_MenuNotificationSection_Item);
	}
	/** @private @arg {R_PrivacyDropdownItem} x */
	R_PrivacyDropdownItem(x) {this.H_("privacyDropdownItemRenderer",x,this.D_PrivacyDropdownItem);}
	/** @private @arg {D_PrivacyDropdownItem} x */
	D_PrivacyDropdownItem(x) {
		const cf="D_PrivacyDropdownItem";
		const {label,icon,description,int32Value,isSelected,accessibility,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(label);
		if(icon.iconType!=="PRIVACY_PUBLIC") debugger;
		this.sm.G_Text(description);
		if(int32Value!==1) debugger;
		if(isSelected!==false) debugger;
		this.sm.D_Label(accessibility);
	}
	/** @private @arg {GR_MP_MenuNotificationSection_Item} x */
	GR_MP_MenuNotificationSection_Item(x) {
		const cf="R_MP_MenuNotificationSection_Item";
		if("notificationRenderer" in x) return this.R_Notification(x);
		if("continuationItemRenderer" in x) return this.sm.R_ContinuationItem(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {R_Notification} x */
	R_Notification(x) {this.H_("notificationRenderer",x,this.D_Notification);}
	/** @private @arg {D_Notification} x */
	D_Notification(x) {
		const cf="D_Notification";
		const {trackingParams,thumbnail,videoThumbnail,shortMessage,sentTimeText,navigationEndpoint,read,recordClickEndpoint,contextualMenu,notificationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.trackingParams(trackingParams);
		this.z([thumbnail,videoThumbnail],this.sm.D_Thumbnail);
		this.z([shortMessage,sentTimeText],this.sm.G_Text);
		if(navigationEndpoint.watchEndpoint) {this.sm.E_Watch(navigationEndpoint);} else {debugger;}
		this._primitive_of(read,"boolean");
		if(recordClickEndpoint.recordNotificationInteractionsEndpoint) {this.sm.E_RecordNotificationInteractions(recordClickEndpoint);}
		this.sm.R_Menu(contextualMenu);
		this.sm.parse_number_template(notificationId);
	}
}
export_(exports => {exports.Support_GenericApi=Support_GenericApi;});
class Support_EventInput extends BaseService {
	/** @arg {{endpoint:TE_VE<number>}} x @template {number} T @arg {T} t @returns {x is {endpoint:TE_VE<T>}} */
	is_EP_Val(x,t) {return this.sm.is_TE_VE(x.endpoint,t);}
	//#region Renderer & Group
	/** @private @arg {G_ResponseBrowse} x */
	G_ResponseBrowse(x) {
		const cf="R_PageTypeBrowse_Response";
		if("rootVe" in x) {
			switch(x.rootVe) {
				default: x===""; debugger; break;
				case 3854: {
					const {rootVe,page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); y;/*#destructure_done*/
					switch(url) {
						default: debugger; switch(url) {
							case "/":
						} break;
						case "/":
					}
				} break;
				case 6827: {
					const {rootVe,page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); y;/*#destructure_done*/
					switch(url) {
						default: debugger; switch(url) {
							case "/feed":
						} break;
						case "/feed/library":
					}
				} break;
				case 96368: {
					const {rootVe,page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); y;/*#destructure_done*/
					switch(url) {
						default: debugger; switch(url) {
							case "/feed":
						} break;
						case "/feed/subscriptions":
					}
				} break;
			}
			return;
		}
		if(this.is_EP_Val(x,3854)) {
			let {...u}=this.RS_Page_Type1(cf,x,{
				page: x => this.sm.cq(x,"browse"),
				endpoint: x => this.sm.E_VE3854(x),
				response: x => this.x.get("x_RS_Browse").RS_Browse(x),
				/** @arg {RS_VE3854_BrowsePage["url"]} x */
				url(x) {
					switch(x) {
						default: x===""; debugger; switch(x) {
							case "/":
						} break;
						case "/":
					}
				},
				expirationTime: x => this.t(x,this.sm.a_primitive_num),
			});
			if(!this.sm.is_not_empty_obj(u)) return;
			if("previousCsn" in u) {
				const {previousCsn,...y}=u; this.g(y);
				this.sm.D_VeCsn(previousCsn,true);
				return;
			}
			const {graftedVes,csn,...y}=u; this.g(y);
			this.z(graftedVes,this.D_GraftedVeItem);
			this.sm.D_VeCsn(csn);
			return;
		}
		if(this.is_EP_Val(x,6827)) return this.g(this.RS_Page_Type1(cf,x,{
			/** @arg {RS_VE6827_BrowsePage["url"]} url */
			url: (url) => {
				if(this.sm.str_is_search(url)) {
					let up=split_string_once(url,"?");
					switch(up[0]) {
						default: up[0]===""; debugger; switch(up[0]) {
							case "/":
						} break;
						case "/feed/trending": {
							let {bp,...y}=this.parse_url_search_params(up[1]); this.g(y);
							this.sm.params("trending.bp",bp);
						}
					}
					return;
				}
				switch(url) {
					default: url===""; debugger; switch(url) {
						case "/":
					} break;
					case "/feed/history":
					case "/feed/library":
				}
			}
		}));
		if(this.is_EP_Val(x,96368)) return this.g(this.RS_Page_Type1(cf,x,{
			/** @arg {RS_VE96368_BrowsePage["url"]} url */
			url(url) {
				switch(url) {
					default: url===""; debugger; switch(url) {
						case "/":
					} break;
					case "/feed/subscriptions":
				}
			}
		}));
		debugger;
	}
	//#endregion
	/** @private @arg {NavFinishDetail_Browse} x */
	NavFinishDetail_Browse(x) {
		const cf="R_PageTypeBrowse";
		if(this.is_EP_Val(x,3854)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.sm.E_VE3854(endpoint);
			this.G_ResponseBrowse(response);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.sm.a_primitive_num(navigationDoneMs);
			return;
		}
		if(this.is_EP_Val(x,6827)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.G_ResponseBrowse(response);
			this.sm.E_VE6827(endpoint);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.sm.a_primitive_num(navigationDoneMs);
			return;
		}
		if(this.is_EP_Val(x,96368)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.G_ResponseBrowse(response);
			this.sm.E_VE96368(endpoint);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.sm.a_primitive_num(navigationDoneMs);
			return;
		}
		debugger;
	}
	/** @private @arg {NavFinishDetail_Channel} x */
	NavFinishDetail_Channel(x) {
		const cf="R_PageTypeChannel";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DataResponsePageType(response);
		this.sm.E_VE3611(endpoint);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.sm.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {NavFinishDetail_Playlist} x */
	NavFinishDetail_Playlist(x) {
		const cf="R_PageTypePlaylist";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.E_VE5754(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.sm.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {NavFinishDetail_Search} x */
	NavFinishDetail_Search(x) {
		const cf="R_PageTypeSearch";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.E_Search(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.sm.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {NavFinishDetail_Settings} x */
	NavFinishDetail_Settings(x) {
		const cf="R_PageTypeSettings";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			let x2=endpoint;
			if("browseEndpoint" in x2) {this.sm.E_VE23462(x2); break x;}
			x2===""; debugger;
		}
		if(response.page!=="settings") debugger;
		this.G_RS_Page_Settings(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.sm.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {NavFinishDetail_Shorts} x */
	NavFinishDetail_Shorts(x) {
		const cf="R_PageTypeShorts";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.x.get("x_VE37414").E_VE37414_ReelWatch(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.sm.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {NavFinishDetail_Watch} x */
	NavFinishDetail_Watch(x) {
		const cf="R_PageTypeWatch";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.E_Watch(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.sm.a_primitive_num(navigationDoneMs);
	}
	//#region Event handlers
	/** @public @arg {G_NavFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const cf="YTNavigateFinishDetail"; this.sm.k(cf,x);
		switch(x.pageType) {
			default: debugger; break;
			case "browse": return this.NavFinishDetail_Browse(x);
			case "channel": return this.NavFinishDetail_Channel(x);
			case "playlist": return this.NavFinishDetail_Playlist(x);
			case "search": return this.NavFinishDetail_Search(x);
			case "settings": return this.NavFinishDetail_Settings(x);
			case "shorts": return this.NavFinishDetail_Shorts(x);
			case "watch": return this.NavFinishDetail_Watch(x);
		}
	}
	//#endregion
	/** @private @arg {G_RS_ByPageType} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType";
		this.sm.RC_ResponseContext(x.response.responseContext);
		switch(x.page) {
			case "browse": return this.x.get("x_RS_Page_Browse").RS_Page_Browse(x);
			case "watch": return this.x.get("x_RS_WatchPage").RS_WatchPage(x);
			case "channel": return this.RS_Page_Channel(x);
			case "playlist": return this.G_RS_Page_Playlist(x);
			case "settings": return this.G_RS_Page_Settings(x);
			case "shorts": return this.G_RS_Page_Shorts(x);
			case "search": return this.RS_Page_Search(x);
			default: break;
		}
		console.log("pt",x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	//#endregion
	/** @template {{}} T @arg {{}} x @arg {()=>T|null} wx @returns {asserts x is T} */
	assert_is_omit_key(x,wx) {
		function u1() {x; wx;}
		u1;
	}
	/**
	 * @template {CF_RS_Page_Type1} T_CF @arg {T_CF} cf @template {{page:string,endpoint:any,response:any,url:string,expirationTime?:number}} T @arg {T} x
	 * @param {T_MakeHandlers<T>} handlers
	 * @returns {T_OmitKey<T,T_Split<"page,endpoint,response,url,expirationTime">[number]>}
	 */
	RS_Page_Type1(cf,x,handlers) {
		const {page: a,endpoint: b,response: c,url: d,expirationTime: e,...u}=this.s(cf,x);/*#destructure_done*/
		handlers.page?.(a);
		handlers.endpoint?.(b);
		handlers.response?.(c);
		handlers.url?.(d);
		handlers.expirationTime?.(e);
		/** @returns {T_OmitKey<T,T_Split<"page,endpoint,response,url,expirationTime">[number]>|null} */
		function wx() {return null;}
		this.assert_is_omit_key(u,wx);
		return u;
	}
	/** @private @arg {RS_ChannelPage} x */
	RS_Page_Channel(x) {
		const cf="RS_Page_Channel";
		/** @arg {RS_ChannelPage["url"]} url */
		const h_url=url => {
			let [a,u]=split_string_once(url,"/"); this.sm.cq(a,"");
			let c=split_string_once(u,"/");
			if(c.length===1) {
				return;
			}
			switch(c[0]) {
				case "c": {
					let [d,e]=c;
					this.sm.cq(d,"c");
					let f=split_string_once(e,"/");
					if(f.length===2) debugger;
					return;
				}
			}
			switch(c[0]) {
				default: {
					let [d,e]=c;
					if(!d.startsWith("@")) debugger;
					if(this.sm.str_is_search(e)) {
						let [p,s]=split_string_once(e,"?");
						if(p!=="search") debugger;
						let {query,...y}=this.parse_url_search_params(s); this.g(y);
						this.sm.a_primitive_str(query);
						return;
					}
					switch(e) {
						default: e===""; debugger; break;
						case "search": case "shorts": case "featured":
						case "about": case "videos": case "playlists": case "community": case "channels": case "shorts":
					}

				} break;
				case "channel": {
					let [,e]=c;
					if(!this.sm.str_starts_with(e,"UC")) {debugger; break;}
					if(this.sm.str_is_search(e)) {debugger; break;}
					let p=split_string_once(e,"/"); this.sm.cq(p.length,1);
					this.sm.channelId(p[0]);
				} break;
			}
		};
		/** @arg {(typeof x)["endpoint"]} x */
		let h_ep=x => {
			if(this.sm.is_TE_VE(x,3611)) return this.sm.E_VE3611(x);
			debugger;
		};
		/** @arg {(typeof x)["response"]} x */
		let h_rs=x => this.ht.RS_Channel(x);
		/** @arg {(typeof x)["expirationTime"]} x */
		let h_et=x => this.sm.a_primitive_num(x);
		/** @type {T_MakeHandlers<typeof x>} */
		const h_d={
			page: x => this.sm.cq(x,"channel"),
			endpoint: h_ep,
			response: h_rs,
		};
		if(!this.is_EP_Val(x,3611)) debugger;
		if("previousCsn" in x) {
			/** @type {T_MakeHandlers<typeof x>} */
			const handlers={...h_d,url: h_url,expirationTime: h_et};
			let {previousCsn,...u1}=this.RS_Page_Type1(cf,x,handlers); this.g(u1);
			this.sm.D_VeCsn(previousCsn,true);
			return;
		}
		if("rootVe" in x) {
			/** @type {T_MakeHandlers<typeof x>} */
			const handlers={
				page: h_d.page,
				endpoint: h_d.endpoint,
				response: h_d.response,
				url: x => h_url(x),
				expirationTime: h_et,
			};
			const {rootVe,csn,...y}=this.RS_Page_Type1(cf,x,handlers); this.g(y);
			this.sm.rootVe(rootVe,3611);
			this.t(csn,this.sm.D_VeCsn);
			return;
		}
		if("csn" in x) {
			/** @type {T_MakeHandlers<typeof x>} */
			const handlers={
				page: h_d.page,
				endpoint: h_d.endpoint,
				response: h_d.response,
				url: x => h_url(x),
				expirationTime: h_et,
			};
			const {csn,graftedVes,...y}=this.RS_Page_Type1(cf,x,handlers); this.g(y);
			this.t(csn,this.sm.D_VeCsn);
			this.z(graftedVes,this.D_GraftedVeItem);
			return;
		}
		/** @type {T_MakeHandlers<typeof x>} */
		const handlers={
			page: h_d.page,
			endpoint: h_d.endpoint,
			response: h_d.response,
			/** @arg {GU_VE3611_2} x */
			url: x => h_url(x),
			expirationTime: h_et,
		};
		const {...y}=this.RS_Page_Type1(cf,x,handlers); this.g(y);
		if(this.sm.is_not_empty_obj(y)) debugger;
	}
	/** @private @arg {G_RS_Page_Playlist} x */
	G_RS_Page_Playlist(x) {
		const cf="R_PlaylistPage";
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(page!=="playlist") debugger;
		this.sm.E_VE5754(endpoint);
		this.RS_Playlist(response);
		this.sm.a_primitive_str(url);
		if("rootVe" in y) {
			const {rootVe,...u}=this.s(cf,y); this.g(u);/*#destructure_done*/
			switch(rootVe) {
				default: debugger; break;
				case 5754: break;
			}
			return;
		}
		this.g(y);
	}
	/** @private @arg {G_RS_SettingsPage} x */
	G_RS_Page_Settings(x) {
		const cf="R_SettingsPage";
		if("rootVe" in x) return this.RS_VE23462_Page_Settings(x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		this.sm.E_VE23462(endpoint);
		this.RS_Settings(response);
		this.sm.a_primitive_str(url);
	}
	/** @private @arg {G_RS_ShortsPage} x */
	G_RS_Page_Shorts(x) {
		const cf="RS_ShortsPage";
		if("rootVe" in x) return this.RS_VE37414_Shorts(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,previousCsn,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="shorts") debugger;
		this.x.get("x_VE37414").E_VE37414_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.t(reelWatchSequenceResponse,x => this.ht.RS_ReelWatchSequence(x));
		if(!this.sm.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(previousCsn,x => this.sm.D_VeCsn(x,true));
		this.t(cachedReelWatchSequenceResponse,x => this.ht.RS_ReelWatchSequence(x));
	}
	/** @private @arg {RS_SearchPage} x */
	RS_Page_Search(x) {
		const cf="RS_SearchPage";
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="search") debugger;
		this.sm.E_Search(endpoint);
		this.ht.RS_Search(response);
		if(!this.sm.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @private @arg {D_GraftedVeItem} x */
	D_GraftedVeItem(x) {
		const cf="D_GraftedVeItem";
		const {veData,csn,...y}=this.s(cf,x); this.g(y);
		this.sm.D_VeCsn(csn);
	}
	/** @private @arg {RS_VE23462_Page_Settings} x */
	RS_VE23462_Page_Settings(x) {
		const cf="Settings_VE23462";
		const {page,endpoint,response,url,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		this.sm.E_VE23462(endpoint);
		this.RS_Settings(response);
		this.sm.a_primitive_str(url);
		this.sm.rootVe(rootVe,23462);
	}
	/** @private @arg {RS_VE37414_Shorts} x */
	RS_VE37414_Shorts(x) {
		const cf="Shorts_VE37414";
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.rootVe(rootVe,37414);
		if(page!=="shorts") debugger;
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.x.get("x_VE37414").E_VE37414_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.t(reelWatchSequenceResponse,x => this.ht.RS_ReelWatchSequence(x));
		if(!this.sm.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		if(!cachedReelWatchSequenceResponse) debugger;
		this.ht.RS_ReelWatchSequence(cachedReelWatchSequenceResponse);
	}
	/** @private @arg {RS_Reel} x */
	RS_Reel(x) {
		const cf="RS_Reel";
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xr.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.sm.trackingParams(trackingParams);
		this.sm.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {this.z(engagementPanels,x => this.xm.R_EngagementPanelSectionList(x));}
	}
	/** @private @arg {RS_Playlist} x */
	RS_Playlist(x) {
		const cf="RS_Playlist";
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xm.R_TwoColumnBrowseResults(contents);
		this.xm.R_PlaylistHeader(header);
		this.tz_cf(cf,alerts,this.sm.RS_Playlist_AlertItem);
		this.xr.R_Playlist_MD(metadata);
		this.sm.R_DesktopTopbar(topbar);
		this.sm.trackingParams(trackingParams);
		this.sm.R_Microformat(microformat);
		this.xr.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {RS_Settings} x */
	RS_Settings(x) {
		const cf="RS_Settings";
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xm.R_TwoColumnBrowseResults(contents);
		this.sm.R_DesktopTopbar(topbar);
		this.sm.trackingParams(trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.xr.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D_Tab_WhatToWatch} x */
	D_Tab_WhatToWatch(x) {
		const {selected,content,tabIdentifier: {},trackingParams,...y}=this.s("D_Tab_WhatToWatch",x); this.g(y);
		this.sm.cq(selected,true);
		this.sm.R_RichGrid(content);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_Tab_Library} x */
	D_Tab_Library(x) {x;}
	/** @public @arg {R_Tab} x */
	R_Tab(x) {this.H_("tabRenderer",x,this.D_Tab);}
	/** @private @arg {D_Tab} x */
	D_Tab(x) {
		const cf="D_Tab";
		if("tabIdentifier" in x) {
			let ux=x;
			switch(x.tabIdentifier) {
				default: this.sm.codegen_typedef(`${cf}_${ux.tabIdentifier}`,x,false); break;
				case "FEhistory": return this.D_Tab_History(x);
				case "FEsubscriptions": return this.D_Tab_Subscriptions(x);
				case "FEwhat_to_watch": return this.D_Tab_WhatToWatch(x);
				case "FElibrary": return this.D_Tab_Library(x);
			}
			return;
		}
		if("selected" in x) {return;}
		if("content" in x) {
			/** @type {`${typeof cf}_${"R_MusicQueue"}`} */
			const cf2=`${cf}_${"R_MusicQueue"}`;
			const {content,trackingParams,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
			this.sm.R_MusicQueue(content);
			this.sm.trackingParams(trackingParams);
			return;
		}
		x: {
			if(!("endpoint" in x)) break x;
			/** @type {`${typeof cf}_WithEndpoint`} */
			const cf2=`${cf}_WithEndpoint`;
			const {endpoint,title,trackingParams,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
			y: {
				if(this.sm.is_TE_VE(endpoint,3611)) {this.sm.E_VE3611(endpoint); break y;}
				debugger;
			}
			this.sm.trackingParams(trackingParams);
			this.save_string(`${cf2}.title`,title);
		}
	}
	/** @private @arg {D_Tab_History} x */
	D_Tab_History(x) {
		const cf="D_Tab_History";
		const {selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);
		if(selected!==true) debugger;
		if(!content.sectionListRenderer) debugger;
		this.xm.R_SectionList(content);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_Tab_Subscriptions} x */
	D_Tab_Subscriptions(x) {
		const cf="D_Tab_Subscriptions";
		const {endpoint,selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.D_Tab_Subscriptions_EP(endpoint);
		this.sm.cq(selected,true);
		this.xm.R_SectionList(content);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {Extract<D_Tab,{tabIdentifier:"FEsubscriptions"}>["endpoint"]} x */
	D_Tab_Subscriptions_EP(x) {
		const cf="D_Tab_Subscriptions_EP";
		if(this.sm.is_TE_VE(x,96368)) return this.sm.E_VE96368(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
}
export_(exports => {exports.Support_EventInput=Support_EventInput;});
class Support_VE extends BaseService {
	/** @public @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {this.H_("vssLoggingContext",x,this.D_VssLoggingContext);}
	/** @public @arg {D_VssLoggingContext} x */
	D_VssLoggingContext(x) {
		const cf="D_VssLoggingContext";
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.params("logging_context.serialized_context_data",serializedContextData);
	}
}
export_(exports => {exports.Support_VE=Support_VE;});
class Support_VE37414 extends BaseService {
	/** @private @arg {D_SerializedContextData} x */
	D_QoeLoggingContext(x) {
		const cf="D_QoeLoggingContext";
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.params("logging_context.serialized_context_data",serializedContextData);
	}
	/** @private @arg {DE_ReelWatch} x */
	DE_VE37414_ReelWatch(x) {
		const cf="DE_VE37414_ReelWatch";
		const {videoId,playerParams,thumbnail,overlay,params,loggingContext,sequenceProvider,inputType,sequenceParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(videoId,x => this.sm.videoId(x));
		this.sm.params("reel.player_params",playerParams);
		this.t(thumbnail,this.sm.D_Thumbnail);
		this.xr.R_ReelPlayerOverlay(overlay);
		this.sm.params("reel.params",params);
		this.t(loggingContext,this.D_LoggingContext);
		this.t(sequenceProvider,x => this.sm.cq(x,"REEL_WATCH_SEQUENCE_PROVIDER_RPC"));
		this.t(inputType,x => this.sm.cq(x,"REEL_WATCH_INPUT_TYPE_SEEDLESS"));
		this.t(sequenceParams,x => this.sm.params("reel.sequence_params",x));
	}
	/** @private @arg {D_LoggingContext} x */
	D_LoggingContext(x) {
		if(!x) {debugger; return;}
		const cf="D_LoggingContext";
		const {vssLoggingContext,qoeLoggingContext,...y}=this.s(cf,x); this.g(y);
		this.x.get("x_VE").D_VssLoggingContext(vssLoggingContext);
		this.D_QoeLoggingContext(qoeLoggingContext);
	}
	/** @public @arg {E_VE37414_ReelWatch} x */
	E_VE37414_ReelWatch(x) {const [a,b,y]=this.sm.TE_Endpoint_3("E_VE37414_ReelWatch","reelWatchEndpoint",x); this.g(y); this.M_VE37414(a); this.DE_VE37414_ReelWatch(b);}
	/** @private @arg {M_VE37414} x */
	M_VE37414(x) {this.T_WCM("M_VE37414",x,this.GM_VE37414);}
	/** @private @arg {GM_VE37414} x @returns {`VE${rootVe}`} */
	GM_VE37414(x) {
		const cf="GM_VE37414";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			if(url==="/shorts/") break x;
			let up=split_string_once(url,"/");
			let [p1,p2]=up; if(p1!=="") debugger;
			let u2=split_string_once(p2,"/");
			let [p3,p4]=u2; if(p3!=="shorts") debugger;
			this.sm.videoId(p4);
		}
		if(webPageType!=="WEB_PAGE_TYPE_SHORTS") debugger;
		this.sm.rootVe(rootVe,37414);
		return `VE${rootVe}`;
	}
}
export_(exports => {exports.Support_VE37414=Support_VE37414;});
class Support_Renderer extends BaseService {
	//#region data members
	/** @type {Map<number,object>} */
	view_conversion_info=new Map;
	//#endregion
	//#region Endpoint methods
	/** @public @arg {E_YpcGetCart} x */
	E_YpcGetCart(x) {const [a,b,y]=this.sm.TE_Endpoint_3("E_YpcGetCart","ypcGetCartEndpoint",x); this.g(y); this.M_YpcGetCart(a); this.DE_YpcGetCart(b);}
	/** @public @arg {E_ApplicationSettings} x */
	E_ApplicationSettings(x) {const [y]=this.TE_Endpoint_3_v2("applicationSettingsEndpoint",x,this.M_ApplicationSettings,this.sm.B_Hack); this.g(y);}
	/** @private @arg {E_SubmitFeedback} x */
	E_SubmitFeedback(x) {const [y]=this.TE_Endpoint_3_v2("signalServiceEndpoint",x,this.sm.M_Feedback,this.DE_SubmitFeedback); this.g(y);}
	//#endregion
	//#region Action methods
	/** @private @arg {A_AddToGuideSection} x */
	A_AddToGuideSection(x) {let [a,y]=this.sm.TE_Endpoint_2("A_AddToGuideSection","addToGuideSectionAction",x); this.g(y); this.AD_AddToGuideSection(a);}
	/** @private @arg {A_ReplayChatItem} x */
	A_ReplayChatItem(x) {this.H_("replayChatItemAction",x,this.AD_ReplayChatItem);}
	/** @private @arg {A_AddChatItem} x */
	A_AddChatItem(x) {
		const cf="A_AddChatItem";
		const {clickTrackingParams,addChatItemAction,...y}=this.s(cf,x); this.g(y);
		this.t(clickTrackingParams,this.sm.clickTrackingParams);
		this.AD_AddChatItem(addChatItemAction);
	}
	/**
	 * @protected @template R_D
	 * @template {Extract<keyof T_Endpoint,KA_EndpointKey>} T_Key @template {TE_Endpoint_2_Opt<any,any>} T_Endpoint @arg {T_Endpoint} x
	 * @param {T_Key} k
	 * @param {(this:this,x:T_Endpoint[T_Key])=>R_D} f1
	 * @returns {[typeof y,R_D]}
	 */
	TE_Endpoint_2_opt_v2(k,x,f1) {
		let keys=this.get_keys_of(x);
		let s=new JsonReplacerState({
			text_decoder: this._decoder,
			cf: k,keys,is_root: true,
		});
		let cf=this.cg.get_auto_type_name(s,x);
		const {clickTrackingParams: a,[k]: b,...y}=this.s(cf,x); y;
		a&&this.sm.clickTrackingParams(a);
		const r1=f1.call(this,b);
		return [y,r1];
	}
	// UpdateAction methods
	/** @private @arg {AU_SubscribeButton} x */
	AU_SubscribeButton(x) {this.TE_Endpoint_2_opt_v2("updateSubscribeButtonAction",x,this.AD_SubscribeButton);}
	// Command methods
	/** @private @arg {C_RunAttestation} x */
	C_RunAttestation(x) {this.TE_Endpoint_2_opt_v2("runAttestationCommand",x,this.D_RunAttestation);}
	//#endregion
	//#region ActionData methods
	/** @private @arg {AD_AddToGuideSection} x */
	AD_AddToGuideSection(x) {
		const cf="AD_AddToGuideSection";
		const {handlerData,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(handlerData) {
			case "GUIDE_ACTION_ADD_TO_PLAYLISTS": break;
			case "GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS": break;
		}
		this.z(items,x => this.xr.R_GuideEntry(x));
	}
	/** @private @arg {AD_SubscribeButton} x */
	AD_SubscribeButton(x) {
		const cf="AD_SubscribeButton";
		const {subscribed,channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.a_primitive_bool(subscribed);
		this.sm.channelId(channelId);
	}
	/** @private @arg {AD_ReplayChatItem} x */
	AD_ReplayChatItem(x) {
		const cf="AD_ReplayChatItem";
		const {actions,videoOffsetTimeMsec,...y}=this.s(cf,x); this.g(y);
		this.z(actions,this.A_AddChatItem);
		this.sm.a_primitive_str(videoOffsetTimeMsec);
	}
	/** @private @arg {AD_AddChatItem} x */
	AD_AddChatItem(x) {
		const cf="AD_AddChatItem";
		const {item,clientId,...y}=this.s(cf,x); this.g(y);
		this.xr.G_ChatItem(item);
		this.t(clientId,x => this.save_string(`${cf}.clientId`,x));
	}
	// CommandData Data methods
	/** @private @arg {"DC_PlayerSeek"} cf @arg {P_ParamParse} path @arg {DC_Generic} x */
	DC_Generic(cf,path,x) {this.y(this,cf,"continuation",x,x => this.sm.params(path,x));}
	/** @private @arg {DC_PlayerSeek} x */
	DC_PlayerSeek(x) {this.DC_Generic("DC_PlayerSeek","player_seek.continuation",x);}
	/** @private @arg {DC_LiveChatReplay} x */
	DC_LiveChatReplay(x) {
		const cf="DC_LiveChatReplay";
		const {continuation,timeUntilLastMessageMsec,...y}=this.s(cf,x); this.g(y);
		this.sm.params("live_chat_replay.continuation",continuation);
		this.sm.a_primitive_num(timeUntilLastMessageMsec);
	}
	// ContinuationData Renderer methods
	/** @private @arg {CD_PlayerSeek} x */
	CD_PlayerSeek(x) {this.y(this,"CD_PlayerSeek","playerSeekContinuationData",x,this.DC_PlayerSeek);}
	/** @private @arg {CD_LiveChatReplay} x */
	CD_LiveChatReplay(x) {this.y(this,"CD_LiveChatReplay","liveChatReplayContinuationData",x,this.DC_LiveChatReplay);}
	/** @private @arg {CD_Invalidation} x */
	CD_Invalidation(x) {this.y(this,"CD_Invalidation","invalidationContinuationData",x,this.DC_Invalidation);}
	// ContinuationData Data methods
	/** @private @arg {DC_Invalidation} x */
	DC_Invalidation(x) {
		const cf="DC_Invalidation";
		const {invalidationId,timeoutMs,continuation,clickTrackingParams,...y}=this.s(cf,x); this.g(y);
		this.D_InvalidationId(invalidationId);
		if(timeoutMs!==10000) debugger;
		this.sm.params("invalidation.continuation",continuation);
		this.t(clickTrackingParams,this.sm.clickTrackingParams);
	}
	// Endpoint Data methods
	/** @private @arg {DE_YpcGetCart} x */
	DE_YpcGetCart(x) {this.sm.TD_Params("DE_YpcGetCart","ypc_get_cart.transaction_params","transactionParams",x);}
	/** @private @arg {DE_SubmitFeedback} x */
	DE_SubmitFeedback(x) {this.sm.cq(this.sm.T_Signal("DE_SubmitFeedback",x),"SUBMIT_FEEDBACK");}
	//#endregion
	//#region CommandMetadata methods
	/** @private @arg {M_YpcGetCart} x */
	M_YpcGetCart(x) {this.T_WCM("M_YpcGetCart",x,this.GM_YpcGetCart);}
	/** @private @arg {M_VE12924} x */
	M_ApplicationSettings(x) {this.T_WCM("M_VE12924",x,this.GM_VE12924);}
	//#endregion
	//#region WebCommandMetadata methods
	/** @private @arg {GM_VE12924} x */
	GM_VE12924(x) {
		const cf="GM_VE12924";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);
		this.sm.cq(url,"/select_site");
		this.sm.cq(webPageType,"WEB_PAGE_TYPE_SETTINGS");
		this.sm.rootVe(rootVe,12924);
	}
	/** @private @arg {GM_YpcGetCart} x */
	GM_YpcGetCart(x) {this.sm.T_GM("GM_YpcGetOffers",x,x => this.sm.cq(x,"/youtubei/v1/ypc/get_cart"));}
	/** @private @arg {GM_Browse} x */
	GM_Browse(x) {this.sm.T_GM("GM_Browse",x,x => this.sm.cq(x,"/youtubei/v1/browse"));}
	/** @private @arg {GM_Next} x */
	GM_Next(x) {this.sm.T_GM("GM_Next",x,x => this.sm.cq(x,"/youtubei/v1/next"));}
	/** @private @arg {GM_PerformCommentAction} x */
	GM_PerformCommentAction(x) {this.sm.T_GM("GM_PerformCommentAction",x,x => this.sm.cq(x,"/youtubei/v1/comment/perform_comment_action"));}
	//#endregion
	//#region Renderer
	/** @public @arg {R_SettingsSidebar} x */
	R_SettingsSidebar(x) {this.H_("settingsSidebarRenderer",x,this.D_SettingsSidebar);}
	/** @private @arg {D_SettingsSidebar} x */
	D_SettingsSidebar(x) {
		const cf="D_SettingsSidebar";
		const {title,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(title);
		this.z(items,this.sm.R_CompactLink);
	}
	/** @public @arg {R_PlaylistSidebar} x */
	R_PlaylistSidebar(x) {this.H_("playlistSidebarRenderer",x,this.D_PlaylistSidebar);}
	/** @private @arg {R_PlaylistSidebarPrimaryInfo} x */
	R_PlaylistSidebarPrimaryInfo(x) {this.H_("playlistSidebarPrimaryInfoRenderer",x,this.D_PlaylistSidebarPrimaryInfo);}
	/** @private @arg {D_PlaylistSidebarPrimaryInfo} x */
	D_PlaylistSidebarPrimaryInfo(x) {
		const cf="D_PlaylistSidebarPrimaryInfo";
		const {thumbnailRenderer,title,stats,menu,navigationEndpoint,badges,description,showMoreText,titleForm,descriptionForm,privacyForm,...y}=this.xm.D_Omit_ThumbnailOverlay(cf,x); this.g(y);
		this.R_PlaylistVideoThumbnail(thumbnailRenderer);
		this.t(title,this.sm.G_Text);
		this.z(stats,this.sm.G_Text);
		this.sm.R_Menu(menu);
		this.sm.E_Watch(navigationEndpoint);
		this.tz(badges,this.sm.RMD_Badge);
		this.tg(description);
		this.sm.G_Text(showMoreText);
		this.t(titleForm,this.R_InlineForm);
		this.t(descriptionForm,this.R_InlineForm);
		this.t(privacyForm,this.R_DropdownFormField);
	}
	/** @public @arg {R_PdgBuyFlow} x */
	R_PdgBuyFlow(x) {this.H_("pdgBuyFlowRenderer",x,this.D_PdgBuyFlow);}
	/** @private @arg {D_PdgBuyFlow} x */
	D_PdgBuyFlow(x) {
		const cf="D_PdgBuyFlow";
		const {header,content,trackingParams,onCloseCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_PdgBuyFlowHeader(header);
		this.z(content,x => {
			if(!x.superVodBuyFlowContentRenderer) debugger;
			return this.R_SuperVodBuyFlowContent(x);
		});
		this.sm.trackingParams(trackingParams);
		if("getSurveyCommand" in onCloseCommand) return this.sm.C_GetSurvey(onCloseCommand);
		{debugger;}
	}
	/** @private @arg {R_SuperVodBuyFlowContent} x */
	R_SuperVodBuyFlowContent(x) {this.H_("superVodBuyFlowContentRenderer",x,this.D_SuperVodBuyFlowContent);}
	/** @private @arg {D_SuperVodBuyFlowContent} x */
	D_SuperVodBuyFlowContent(x) {
		const cf="D_SuperVodBuyFlowContent";
		const {description,buyButton,trackingParams,commentPreview,disclaimerText,colorSlider,defaultPriceTier,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([description,disclaimerText],this.sm.G_Text);
		this.xm.R_Button(buyButton);
		this.sm.trackingParams(trackingParams);
		this.R_PdgCommentPreview(commentPreview);
		this.R_PdgColorSlider(colorSlider);
		console.log("defaultPriceTier",defaultPriceTier);
		this.ht.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {R_PdgColorSlider} x */
	R_PdgColorSlider(x) {this.H_("pdgColorSliderRenderer",x,this.D_PdgColorSlider);}
	/** @private @arg {D_PdgColorSlider} x */
	D_PdgColorSlider(x) {
		const cf="D_PdgColorSlider";
		const {notches,superThanksSelectedTierEntity,maxTierValue,minTierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(notches,this.D_NotchesItem);
		this.ht.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
		this.sm.G_Text(maxTierValue);
		this.sm.G_Text(minTierValue);
	}
	/** @private @arg {R_PdgCommentPreview} x */
	R_PdgCommentPreview(x) {this.H_("pdgCommentPreviewRenderer",x,this.D_PdgCommentPreview);}
	/** @private @arg {D_PdgCommentPreview} x */
	D_PdgCommentPreview(x) {
		const cf="D_PdgCommentPreview";
		const {title,authorThumbnail,authorText,commentOptionRenderers,defaultCommentText,editButton,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(title);
		this.sm.D_Thumbnail(authorThumbnail);
		this.sm.G_Text(authorText);
		this.z(commentOptionRenderers,this.R_PdgCommentOption);
		this.sm.G_Text(defaultCommentText);
		this.xm.R_Button(editButton);
		this.ht.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {R_PdgBuyFlowHeader} x */
	R_PdgBuyFlowHeader(x) {this.H_("pdgBuyFlowHeaderRenderer",x,this.D_PdgBuyFlowHeader);}
	/** @private @arg {D_PdgBuyFlowHeader} x */
	D_PdgBuyFlowHeader(x) {
		const cf="D_PdgBuyFlowHeader";
		const {text,helpButton,dismissButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(text);
		this.xm.R_Button(helpButton);
		this.xm.R_Button(dismissButton);
	}
	/** @private @arg {R_SingleColumnMusicWatchNextResults} x */
	R_SingleColumnMusicWatchNextResults(x) {this.H_("singleColumnMusicWatchNextResultsRenderer",x,this.R_Tabbed);}
	/** @private @arg {R_Tabbed} x */
	R_Tabbed(x) {this.H_("tabbedRenderer",x,this.R_WatchNextTabbedResults);}
	/** @private @arg {R_WatchNextTabbedResults} x */
	R_WatchNextTabbedResults(x) {this.H_("watchNextTabbedResultsRenderer",x,this.D_WatchNextTabbedResults);}
	/** @private @arg {D_WatchNextTabbedResults} x */
	D_WatchNextTabbedResults(x) {
		const cf="D_WatchNextTabbedResults";
		const {tabs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,x => this.x.get("x_EventInput").R_Tab(x));
	}
	/** @public @arg {R_TemplateUpdate} x */
	R_TemplateUpdate(x) {this.H_("templateUpdate",x,this.D_TemplateUpdate);}
	/** @private @arg {D_TemplateUpdate} x */
	D_TemplateUpdate(x) {
		const cf="D_TemplateUpdate";
		if("dependencies" in x) {
			const {identifier,dependencies,serializedTemplateConfig: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			let idp=split_string_once(identifier,"|");
			if(idp[0]!=="track_selection_sheet_option.eml") debugger;
			this.save_string("D_TemplateUpdate.identifier.id",idp[0]);
			this.save_string("D_TemplateUpdate.identifier.hash",idp[1]);
			this.t(dependencies,dep_arr => {
				if(dep_arr.length!==1) debugger;
				const dep=dep_arr[0];
				let ddp=split_string_once(dep,"|");
				if(ddp[0]!=="bottom_sheet_list_option.eml") debugger;
				this.save_string(`D_TemplateUpdate.${idp[0]}.deps[0].id`,idp[0]);
				this.save_string(`D_TemplateUpdate.${idp[0]}.deps[0].hash`,idp[1]);
			});
			this.sm.a_primitive_str(a);
		} else {
			const {identifier,serializedTemplateConfig: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			let idp=split_string_once(identifier,"|");
			if(idp[0]!=="bottom_sheet_list_option.eml") debugger;
			this.sm.a_primitive_str(a);
		}
	}
	/** @public @arg {R_Transcript} x */
	R_Transcript(x) {this.H_("transcriptRenderer",x,this.D_Transcript);}
	/** @private @arg {D_Transcript} x */
	D_Transcript(x) {
		const cf="D_Transcript";
		const {trackingParams,content: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.trackingParams(trackingParams);
		this.R_TranscriptSearchPanel(a);
	}
	/** @public @arg {R_TwoColumnSearchResults} x */
	R_TwoColumnSearchResults(x) {this.H_("twoColumnSearchResultsRenderer",x,this.D_TwoColumnSearchResults);}
	/** @private @arg {D_TwoColumnSearchResults} x */
	D_TwoColumnSearchResults(x) {this.H_("primaryContents",x,this.xm.R_SectionList);}
	/** @private @arg {R_TranscriptSegmentList} x */
	R_TranscriptSegmentList(x) {this.H_("transcriptSegmentListRenderer",x,this.D_TranscriptSegmentList);}
	/** @private @arg {D_TranscriptSegmentList} x */
	D_TranscriptSegmentList(x) {
		const cf="D_TranscriptSegmentList";
		const {initialSegments,noResultLabel,retryLabel,touchCaptionsEnabled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(initialSegments,this.R_TranscriptSegment);
		this.sm.G_Text(noResultLabel);
		this.sm.G_Text(retryLabel);
		this.sm.a_primitive_bool(touchCaptionsEnabled);
	}
	/** @private @arg {R_TranscriptFooter} x */
	R_TranscriptFooter(x) {this.H_("transcriptFooterRenderer",x,this.D_TranscriptFooter);}
	/** @private @arg {R_TranscriptSearchPanel} x */
	R_TranscriptSearchPanel(x) {this.H_("transcriptSearchPanelRenderer",x,this.D_TranscriptSearchPanel);}
	/** @private @arg {D_TranscriptSearchPanel} x */
	D_TranscriptSearchPanel(x) {
		const cf="D_TranscriptSearchPanel";
		const {body,footer,trackingParams,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TranscriptSegmentList(body);
		this.R_TranscriptFooter(footer);
		this.sm.trackingParams(trackingParams);
		if(targetId!=="engagement-panel-searchable-transcript-search-panel") debugger;
	}
	/** @private @arg {R_TranscriptSegment} x */
	R_TranscriptSegment(x) {this.H_("transcriptSegmentRenderer",x,this.D_TranscriptSegment);}
	/** @private @arg {D_TranscriptSegment} x */
	D_TranscriptSegment(x) {
		const cf="D_TranscriptSegment";
		const {startMs,endMs,snippet,startTimeText,trackingParams,accessibility,targetId,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(startMs);
		this.sm.a_primitive_str(endMs);
		this.sm.G_Text(snippet);
		this.sm.G_Text(startTimeText);
		this.sm.trackingParams(trackingParams);
		this.sm.D_Accessibility(accessibility);
		this.t(targetId,x => this.save_string(`${cf}.targetId`,x));
	}
	/** @private @arg {D_TranscriptFooter} x */
	D_TranscriptFooter(x) {this.H_("languageMenu",x,this.sm.R_SortFilterSubMenu);}
	/** @public @arg {D_TimedTextApi} x */
	D_TimedTextApi(x) {
		const cf="D_TimedTextApi";
		let {v,caps,xoaf,xoadf,xosf,hl,ip,ipbits,expire,signature,sparams,key,kind,lang,...y}=this.s(cf,x); this.g(y);
		this.sm.videoId(v);
		caps&&this.save_string(`${cf}.caps`,caps);
		this.save_string(`${cf}.xoaf`,xoaf);
		xoadf&&this.save_string(`${cf}.xoadf`,xoadf);
		xosf&&this.save_string(`${cf}.xosf`,xosf);
		this.save_string(`${cf}.hl`,hl);
		this.save_string(`${cf}.ip`,ip);
		this.save_string(`${cf}.ipbits`,ipbits);
		let e_num=this.sm.parse_number_template(expire);
		if(Number.isNaN(e_num)) debugger;
		this.sm.a_primitive_num(e_num);
		this.ht.parse_signature(signature);
		this.save_string(`${cf}.sparams`,sparams);
		this.save_string(`${cf}.key`,key);
		kind&&this.save_string(`${cf}.kind`,kind);
		this.save_string(`${cf}.lang`,lang);
	}
	/** @private @arg {R_GuideSubscriptionsSection} x */
	R_GuideSubscriptionsSection(x) {this.H_("guideSubscriptionsSectionRenderer",x,this.D_GuideSubscriptionsSection);}
	/** @private @arg {R_GuideDownloadsEntry} x */
	R_GuideDownloadsEntry(x) {this.H_("guideDownloadsEntryRenderer",x,this.D_GuideDownloadsEntry);}
	/** @private @arg {R_GuideCollapsibleEntry} x */
	R_GuideCollapsibleEntry(x) {this.H_("guideCollapsibleEntryRenderer",x,this.D_GuideCollapsibleEntry);}
	/** @private @arg {R_GuideCollapsibleSectionEntry} x */
	R_GuideCollapsibleSectionEntry(x) {this.H_("guideCollapsibleSectionEntryRenderer",x,this.D_GuideCollapsibleSectionEntry);}
	/** @type {D_GuideEntry_IconType_Obj} */
	D_GuideEntry_IconType={
		WithNavEP: [
			"MY_VIDEOS","TRENDING","WATCH_HISTORY","WATCH_LATER","CLAPPERBOARD","MUSIC","LIVE",
			"GAMING_LOGO","COURSE","TROPHY","NEWS","YOUTUBE_ROUND","FASHION_LOGO","FLAG",
			"CREATOR_STUDIO_RED_LOGO","YOUTUBE_MUSIC","YOUTUBE_KIDS_ROUND","UNPLUGGED_LOGO","SETTINGS",
			"ADD_CIRCLE",
		],
		WithIcon: [
			"HELP","FEEDBACK",
		]
	};
	/** @type {Extract<D_GuideEntry,{icon:any}>['icon']['iconType'][]} */
	D_GuideEntry_MissingIconType=[];
	/** @public @arg {R_GuideEntry} x */
	R_GuideEntry(x) {this.H_("guideEntryRenderer",x,this.D_GuideEntry);}
	/** @private @arg {D_GuideEntry} x */
	D_GuideEntry(x) {
		const cf="D_GuideEntry";
		if("targetId" in x) return this.D_GuideEntry_WithTargetId(cf,x);
		if("icon" in x) return this.D_GuideEntry_WithIcon(cf,x);
		if("presentationStyle" in x) {
			const {navigationEndpoint,thumbnail,badges,trackingParams,formattedTitle,accessibility,entryData,presentationStyle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.sm.E_VE3611(navigationEndpoint);
			this.sm.D_Thumbnail(thumbnail);
			this.D_LiveBroadcastingBadge(badges);
			this.sm.trackingParams(trackingParams);
			this.sm.G_Text(formattedTitle);
			this.sm.D_Accessibility(accessibility);
			this.R_GuideEntryData(entryData);
			switch(presentationStyle) {
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT":
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NONE": break;
				default: console.log(`[D_GuideEntry_PresentationType]\n\n\ncase"${presentationStyle}":`); break;
			}
			return;
		}
		if("entryData" in x) {
			const {navigationEndpoint,thumbnail,trackingParams,formattedTitle,accessibility,entryData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.sm.E_VE3611(navigationEndpoint);
			this.sm.D_Thumbnail(thumbnail);
			this.sm.trackingParams(trackingParams);
			this.sm.G_Text(formattedTitle);
			this.sm.D_Accessibility(accessibility);
			this.R_GuideEntryData(entryData);
			return;
		}
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {"D_GuideEntry"} cf @arg {Extract<D_GuideEntry,{targetId:any;}>|D_GuideEntry_OfflineDownloadEntry|D_GuideEntry_VideoLibrary} x */
	D_GuideEntry_WithTargetId(cf,x) {
		const {navigationEndpoint,icon,targetId,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
		{
			let x2=navigationEndpoint;
			if(this.sm.is_TE_VE(x2,6827)) return this.sm.E_VE6827(x2);
			if(this.sm.is_TE_VE(x2,42352)) return this.sm.E_VE42352(x2);
			debugger;
		}
		if(icon.iconType!=="VIDEO_LIBRARY_WHITE") debugger;
		this.sm.T_Icon_AnyOf("D_GuideEntry_Icon",icon,["OFFLINE_DOWNLOAD","VIDEO_LIBRARY_WHITE"]);
		this.D_GuideEntry_TargetId(targetId);
		if(isPrimary!==true) debugger;
	}
	/** @private @arg {"D_GuideEntry"} cf1 @arg {D_GuideEntry} x */
	D_GuideEntry_WithIcon(cf1,x) {
		const cf2="D_GuideEntry_WithIcon";
		if("entryData" in x) {
			if("icon" in x) {
				const {navigationEndpoint,icon,entryData,...y}=this.D_GuideEntry_Omit(cf2,x); this.g(y);
				this.sm.E_VE5754(navigationEndpoint);
				switch(icon.iconType) {
					default: icon===""; this.sm.codegen_typedef(cf1,x); break;
					case "LIKES_PLAYLIST": case "PLAYLISTS":
				}
				return this.R_GuideEntryData(entryData);
			}
			if("presentationStyle" in x) {
				const {entryData,presentationStyle,navigationEndpoint,thumbnail,badges,...y}=this.D_GuideEntry_Omit(cf2,x); this.g(y);/*#destructure_done*/
				this.R_GuideEntryData(entryData);
				if(!navigationEndpoint.browseEndpoint) debugger;
				if(presentationStyle!=="GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT") debugger;
				this.sm.D_Thumbnail(thumbnail);
				this.D_LiveBroadcastingBadge(badges);
				return;
			}
			const {entryData,navigationEndpoint,thumbnail,...y}=this.D_GuideEntry_Omit(cf2,x); this.g(y);/*#destructure_done*/
			this.R_GuideEntryData(entryData);
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.sm.D_Thumbnail(thumbnail);
			return;
		}
		if("navigationEndpoint" in x) return this.D_GuideEntry_WithNavEP(cf1,x);
		if("isPrimary" in x) return this.D_GuideEntry_WithPrimary(cf1,x);
		if("serviceEndpoint" in x) {
			const {accessibility,formattedTitle,icon,serviceEndpoint,trackingParams,...y}=this.s(cf1,x); this.g(y);
			this.sm.D_Accessibility(accessibility);
			this.sm.G_Text(formattedTitle);
			let is_not_in_set=this.sm.T_Icon_AnyOf("D_GuideEntry_WithIcon:icon",icon,this.D_GuideEntry_IconType.WithIcon);
			if(is_not_in_set) this.sm.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithIcon,this.D_GuideEntry_MissingIconType);
			/** @type {`${cf2}.SE_Signal`} */
			const cf3=`${cf2}.SE_Signal`;
			let [a,b]=this.sm.T_SE_Signal(cf3,serviceEndpoint);
			this.sm.M_SendPost(a);
			this.xm.G_ClientSignal(b);
			this.sm.trackingParams(trackingParams);
			return;
		}
		if("icon" in x&&"trackingParams" in x&&"formattedTitle" in x&&"accessibility" in x) {
			const {icon,trackingParams,formattedTitle,accessibility,...y}=this.s(cf1,x); this.g(y);
			this.sm.D_Accessibility(accessibility);
			this.sm.trackingParams(trackingParams);
			this.sm.G_Text(formattedTitle);
			this.sm.D_Accessibility(accessibility);
			return;
		}
		this.sm.codegen_typedef(cf1,x);
	}
	/** @private @template {Extract<D_GuideEntry,{accessibility:any}>} T @arg {CF_D_GuideEntry} cf @arg {T} x */
	D_GuideEntry_Omit(cf,x) {
		const {accessibility,formattedTitle,trackingParams,...y}=this.s(cf,x);
		this.sm.D_Accessibility(accessibility);
		this.sm.G_Text(formattedTitle);
		this.sm.trackingParams(trackingParams);
		return y;
	}
	/** @arg {Extract<D_GuideEntry,{targetId:any;}>["targetId"]} x */
	D_GuideEntry_TargetId(x) {
		const cf="D_GuideEntry_TargetId";
		switch(x) {
			default: this.cg.codegen_case(cf,x); break;
			case "downloads-guide-item":
			case "library-guide-item":
		}
	}
	/** @arg {"D_GuideEntry"} cf1 @arg {D_GuideEntry_WithNavEP} x */
	D_GuideEntry_WithNavEP(cf1,x) {
		const cf2="D_GuideEntry_WithNavEP";
		if("targetId" in x) return this.D_GuideEntry_WithTargetId(cf1,x);
		if("isPrimary" in x) {
			const {navigationEndpoint,icon,isPrimary,...y}=this.D_GuideEntry_Omit(cf1,x); this.g(y);
			if(!navigationEndpoint.browseEndpoint) debugger;
			if(this.sm.is_TE_VE(navigationEndpoint,3854)) {
				this.sm.E_VE3854(navigationEndpoint);
			} else if(this.sm.is_TE_VE(navigationEndpoint,96368)) {
				this.sm.E_VE96368(navigationEndpoint);
			} else {
				debugger;
			}
			switch(icon.iconType) {
				case "SUBSCRIPTIONS": break;
				case "WHAT_TO_WATCH": break;
				default: debugger; break;
			}
			if(isPrimary!==true) debugger;
			return;
		}
		const {navigationEndpoint,icon,...y}=this.D_GuideEntry_Omit(cf1,x); this.g(y);
		x: {
			let x2=navigationEndpoint;
			if("browseEndpoint" in x2) {
				if(this.sm.is_TE_VE(x2,3611)) return this.sm.E_VE3611(x2);
				if(this.sm.is_TE_VE(x2,5754)) return this.sm.E_VE5754(x2);
				if(this.sm.is_TE_VE(x2,6827)) return this.sm.E_VE6827(x2);
				if(this.sm.is_TE_VE(x2,11487)) return this.sm.E_VE11487(x2);
				if(this.sm.is_TE_VE(x2,23462)) return this.sm.E_VE23462(x2);
				x2; debugger;
				break x;
			}
			if("urlEndpoint" in x2) {
				this.xm.E_Url(x2);
				break x;
			}
			debugger;
		}
		let is_not_in_set=this.sm.T_Icon_AnyOf("D_GuideEntry_WithNavEP:icon",icon,this.D_GuideEntry_IconType.WithNavEP);
		if(is_not_in_set) this.sm.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithNavEP,this.D_GuideEntry_MissingIconType);
		{
			let x2=navigationEndpoint;
			if("urlEndpoint" in x2) return this.xm.E_Url(x2);
			if("browseEndpoint" in x2) {
				if(this.sm.is_TE_VE(x2,6827)) return this.sm.E_VE6827(x2);
				if(this.sm.is_TE_VE(x2,5754)) return this.sm.E_VE5754(x2);
				x2; debugger;
				return;
			};
		}
	}
	/** @private @arg {"D_GuideEntry"} cf1 @arg {D_GuideEntry_WithPrimary} x */
	D_GuideEntry_WithPrimary(cf1,x) {
		/** @type {`${cf1}_WithPrimary`} */
		const cf2=`${cf1}_WithPrimary`;
		const {icon,isPrimary,serviceEndpoint,...y}=this.D_GuideEntry_Omit(cf2,x); this.g(y);
		if(icon.iconType!=="TAB_SHORTS") debugger;
		if(isPrimary!==true) debugger;
		x: {
			let x=serviceEndpoint;
			if("reelWatchEndpoint" in x) {
				this.x.get("x_VE37414").E_VE37414_ReelWatch(x);
				break x;
			}
			if("signalServiceEndpoint" in x) {
				debugger;
				break x;
			}
			x===""; debugger;
		}
	}
	/** @private @arg {R_GuideEntryData} x */
	R_GuideEntryData(x) {this.H_("guideEntryData",x,this.D_GuideEntryData);}
	/** @private @arg {D_GuideEntryData} x */
	D_GuideEntryData(x) {
		const cf="D_GuideEntryData";
		const {guideEntryId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.guideEntryId(guideEntryId);
	}
	/** @private @arg {R_GuideSection} x */
	R_GuideSection(x) {this.H_("guideSectionRenderer",x,this.D_GuideSection);}
	/** @public @arg {R_ResourceStatusInResponseCheck} x */
	R_ResourceStatusInResponseCheck(x) {this.H_("resourceStatusInResponseCheck",x,this.D_ResourceStatusInResponseCheck);}
	/** @public @arg {R_ReportFormModal} x */
	R_ReportFormModal(x) {this.H_("reportFormModalRenderer",x,this.g);}
	/** @arg {R_RichShelf} x */
	R_RichShelf(x) {this.H_("richShelfRenderer",x,this.D_RichShelf);}
	/** @private @arg {D_RichShelf} x */
	D_RichShelf(x) {
		const cf="D_RichShelf";
		/** @type {T_UnionToPartial<D_RichShelf>} */
		let pt=x;
		const {icon,title,contents,trackingParams,menu,showMoreButton,rowIndex,...y}=this.s(cf,pt); this.g(y);
		if(icon) {
			switch(icon.iconType) {
				default: this.cg.codegen_case(`${cf}.icon`,icon.iconType); break;
				case "YOUTUBE_SHORTS_BRAND_24": break;
			}
		}
		this.sm.G_Text(title);
		this.z(contents,this.sm.R_RichItem);
		this.sm.trackingParams(trackingParams);
		this.sm.R_Menu(menu);
		this.xm.R_Button(showMoreButton);
		switch(rowIndex) {
			default: this.cg.codegen_case(`${cf}.rowIndex`,rowIndex); break;
			case 2: case 4: break;
		}
	}
	/** @arg {R_RatingSurveyOption} x */
	R_RatingSurveyOption(x) {this.H_("ratingSurveyOptionRenderer",x,this.D_RatingSurveyOption);}
	/** @private @arg {D_RatingSurveyOption} x */
	D_RatingSurveyOption(x) {
		const cf="D_ExpandableSurveyResponse";
		const {responseText,defaultStateIcon,onStateIcon,followUpCommand,responseEndpoint,trackingParams,checked,selected,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(responseText);
		if(defaultStateIcon.iconType!=="STAR_BORDER") debugger;
		if(onStateIcon.iconType!=="STAR") debugger;
		this.ht.C_FollowUp(followUpCommand);
		this.sm.E_Feedback(responseEndpoint);
		this.sm.trackingParams(trackingParams);
		this.sm.a_primitive_bool(checked);
		this.sm.a_primitive_bool(selected);
	}
	/** @arg {R_RatingSurvey} x */
	R_RatingSurvey(x) {this.H_("ratingSurveyRenderer",x,this.D_RatingSurvey);}
	/** @private @arg {D_RatingSurvey} x */
	D_RatingSurvey(x) {
		const cf="D_ExpandableSurveyResponse";
		const {ratings,trackingParams,notSureButton,undoButton,notSureEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ratings,x => this.xr.R_RatingSurveyOption(x));
		this.sm.trackingParams(trackingParams);
		this.xm.R_Button(notSureButton);
		this.xm.R_Button(undoButton);
		this.g(notSureEndpoint);
	}
	/** @private @arg {R_PlaylistSidebarSecondaryInfo} x */
	R_PlaylistSidebarSecondaryInfo(x) {this.H_("playlistSidebarSecondaryInfoRenderer",x,this.D_PlaylistSidebarSecondaryInfo);}
	/** @public @arg {R_Channel_MD} x */
	R_Channel_MD(x) {this.H_("channelMetadataRenderer",x,this.D_Channel_MD);}
	/** @public @arg {R_Playlist_MD} x */
	R_Playlist_MD(x) {this.H_("playlistMetadataRenderer",x,this.D_Playlist_MD);}
	/** @public @arg {R_ChannelSwitcherPage} x */
	R_ChannelSwitcherPage(x) {this.H_("channelSwitcherPageRenderer",x,this.D_ChannelSwitcherPage);}
	/** @private @arg {R_PlaylistVideoThumbnail} x */
	R_PlaylistVideoThumbnail(x) {this.H_("playlistVideoThumbnailRenderer",x,this.D_PlaylistVideoThumbnail);}
	/** @public @arg {R_Message} x */
	R_Message(x) {this.H_("messageRenderer",x,this.D_Message);}
	/** @private @arg {D_Message} x */
	D_Message(x) {
		const cf="D_Message";
		const {text,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(text);
		this.sm.trackingParams(trackingParams);
	}
	/** @public @arg {R_ConversationBar} x */
	R_ConversationBar(x) {this.H_("conversationBarRenderer",x,this.R_AvailabilityMessage);}
	/** @public @arg {R_AvailabilityMessage} x */
	R_AvailabilityMessage(x) {this.H_("availabilityMessage",x,x => this.R_Message(x));}
	/** @private @arg {D_LiveBroadcastingBadge} x */
	D_LiveBroadcastingBadge(x) {
		const cf="D_LiveBroadcastingBadge";
		const {liveBroadcasting,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.a_primitive_bool(liveBroadcasting);
	}
	/** @public @arg {R_LiveChatParticipantsList} x */
	R_LiveChatParticipantsList(x) {this.H_("liveChatParticipantsListRenderer",x,this.g);}
	/** @public @arg {R_LiveChatTicker} x */
	R_LiveChatTicker(x) {this.H_("liveChatTickerRenderer",x,this.g);}
	/** @public @arg {R_LiveChatItemList} x */
	R_LiveChatItemList(x) {this.H_("liveChatItemListRenderer",x,this.g);}
	/** @public @arg {R_LiveChatMessageInput} x */
	R_LiveChatMessageInput(x) {this.H_("liveChatMessageInputRenderer",x,this.g);}
	/** @public @arg {R_LiveChatViewerEngagementMessage} x */
	R_LiveChatViewerEngagementMessage(x) {this.H_("liveChatViewerEngagementMessageRenderer",x,this.D_LiveChatViewerEngagementMessage);}
	/** @public @arg {D_LiveChatViewerEngagementMessage} x */
	D_LiveChatViewerEngagementMessage(x) {
		const cf="D_LiveChatViewerEngagementMessage";
		const {id,timestampUsec,icon,message,actionButton,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.sm.trackingParams(trackingParams);
	}
	/** @public @arg {R_LiveChatPlaceholderItem} x */
	R_LiveChatPlaceholderItem(x) {this.H_("liveChatPlaceholderItemRenderer",x,this.D_LiveChatPlaceholderItem);}
	/** @public @arg {D_LiveChatPlaceholderItem} x */
	D_LiveChatPlaceholderItem(x) {
		const cf="D_LiveChatPlaceholderItem";
		const {id,timestampUsec,...y}=this.s(cf,x); this.g(y);
		console.log(`${cf}.id`,id);
		let u_seconds=this.sm.parse_number_template(timestampUsec);
		this.sm.a_primitive_num(u_seconds);
	}
	/** @public @arg {R_LiveChatTextMessage} x */
	R_LiveChatTextMessage(x) {this.H_("liveChatTextMessageRenderer",x,this.D_LiveChatTextMessage);}
	/** @public @arg {D_LiveChatTextMessage} x */
	D_LiveChatTextMessage(x) {
		const cf="D_LiveChatTextMessage";
		const {message,authorName,authorPhoto,contextMenuEndpoint,id,authorBadges,timestampUsec,authorExternalChannelId,contextMenuAccessibility,timestampText,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(message);
		console.log(`${cf}.id`,id);
	}
	/** @public @arg {D_LiveChatEmoji} x */
	D_LiveChatEmoji(x) {
		const cf="D_LiveChatEmoji";
		const {isLocked,...y}=this.sm.D_CustomEmoji_Omit(cf,x); this.g(y);
		this.sm.a_primitive_bool(isLocked);
	}
	/** @private @arg {R_ChannelSwitcherHeader} x */
	R_ChannelSwitcherHeader(x) {this.H_("channelSwitcherHeaderRenderer",x,this.D_ChannelSwitcherHeader);}
	/** @private @arg {D_ChannelSwitcherPage} x */
	D_ChannelSwitcherPage(x) {
		const cf="D_ChannelSwitcherPage";
		const {header,targetId,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ChannelSwitcherHeader(header);
		this.sm.cq(targetId,"ceq");
		this.z(contents,this.G_ChannelSwitcherContent);
	}
	/** @private @arg {D_ChannelSwitcherHeader} x */
	D_ChannelSwitcherHeader(x) {
		const cf="D_ChannelSwitcherHeader";
		const {title,button,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(title);
		this.xm.R_Button(button);
	}
	/** @private @arg {D_ChipColorPalette} x */
	D_ChipColorPalette(x) {const cf="D_ChipColorPalette"; this.sm.codegen_typedef(cf,x); this.sm.GEN(cf,x);}
	/** @private @arg {D_Channel_MD} x */
	D_Channel_MD(x) {
		const cf="D_Channel_MD";
		const {title,description,androidDeepLink,iosAppindexingLink,isFamilySafe,facebookProfileId,externalId,androidAppindexingLink,availableCountryCodes,avatar,rssUrl,keywords,ownerUrls,channelUrl,vanityChannelUrl,...u}=this.s(cf,x);
		this.t(facebookProfileId,x => this.sm.a_primitive_str(x));
		this.sm.a_primitive_str(title);
		this.sm.a_primitive_str(description);
		this.sm.a_primitive_str(androidDeepLink);
		this.sm.a_primitive_str(iosAppindexingLink);
		this.sm.cq(isFamilySafe,true);
		this.sm.a_primitive_str(externalId);
		this.sm.a_primitive_str(androidAppindexingLink);
		this.z(availableCountryCodes,x => this.sm.a_primitive_str(x));
		this.sm.D_Thumbnail(avatar);
		this.sm.a_primitive_str(rssUrl);
		this.sm.a_primitive_str(keywords);
		if(ownerUrls.length!==1) debugger;
		let ur=this._convert_url_to_obj(ownerUrls[0]);
		this.sm.cq(this.sm.str_starts_with_rx("/@",ur.pathname),true);
		this.sm.a_primitive_str(channelUrl);
		this.sm.a_primitive_str(vanityChannelUrl);
		const {channelConversionUrl,...y}=u; this.g(y);/*#destructure_done*/
		this.t_cf(`${cf}.channelConversionUrl`,channelConversionUrl,(cf,x) => this.parser.parse_url(cf,x));
	}
	/** @private @arg {R_PdgCommentOption} x */
	R_PdgCommentOption(x) {this.H_("pdgCommentOptionRenderer",x,this.D_PdgCommentOption);}
	/** @arg {R_InlineSurvey} x */
	R_InlineSurvey(x) {this.H_("inlineSurveyRenderer",x,this.D_InlineSurvey);}
	/** @private @arg {D_InlineSurvey} x */
	D_InlineSurvey(x) {
		const cf="D_InlineSurvey";
		const {dismissalEndpoint,title,subtitle,inlineContent,response,trackingParams,dismissalText,impressionEndpoints,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.codegen_typedef(`${cf}.dismissalEndpoint`,dismissalEndpoint);
		this.sm.G_Text(title);
		this.sm.G_Text(subtitle);
		this.sm.R_CompactVideo(inlineContent);
		this.xr.R_ExpandableSurveyResponse(response);
		this.sm.trackingParams(trackingParams);
		this.sm.G_Text(dismissalText);
		this.z(impressionEndpoints,this.g);
	}
	/** @arg {R_SourcePivotHeader} x */
	R_SourcePivotHeader(x) {this.H_("sourcePivotHeaderRenderer",x,this.D_SourcePivotHeader);}
	/** @private @arg {D_SourcePivotHeader} x */
	D_SourcePivotHeader(x) {
		const cf="D_SourcePivotHeader";
		const {headerInformation,buttonRow,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xr.R_ProfilePageHeaderInformationViewModel(headerInformation);
		this.xr.R_ProfilePageHeaderButtonRowViewModel(buttonRow);
		this.sm.trackingParams(trackingParams);
	}
	/** @arg {R_ProfilePageHeaderInformationViewModel} x */
	R_ProfilePageHeaderInformationViewModel(x) {this.H_("profilePageHeaderInformationViewModel",x,this.D_ProfilePageHeaderInformation);}
	/** @private @arg {D_ProfilePageHeaderInformation} x */
	D_ProfilePageHeaderInformation(x) {
		const cf="D_ProfilePageHeaderInformation";
		const {title,metadata,thumbnail,alignment,onTap,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xr.R_ProfilePageHeaderTitleViewModel(title);
		this.xr.R_ProfilePageHeaderMetadataViewModel(metadata);
		this.xr.R_ProfilePageHeaderThumbnailViewModel(thumbnail);
		if(alignment!=="a") debugger;
		this.ht.C_Innertube(onTap);
	}
	/** @arg {R_ProfilePageHeaderTitleViewModel} x */
	R_ProfilePageHeaderTitleViewModel(x) {this.H_("profilePageHeaderTitleViewModel",x,this.D_ProfilePageHeaderTitle);}
	/** @private @arg {D_ProfilePageHeaderTitle} x */
	D_ProfilePageHeaderTitle(x) {this.y(this,"D_ProfilePageHeaderTitle","title",x,this.D_ProfilePageHeaderTitle_Content);}
	/** @private @arg {D_ProfilePageHeaderTitle_Content} x */
	D_ProfilePageHeaderTitle_Content(x) {this.y(this.sm,"D_ProfilePageHeaderTitle_Content","content",x,this.sm.a_primitive_str);}
	/** @arg {R_ProfilePageHeaderThumbnailViewModel} x */
	R_ProfilePageHeaderThumbnailViewModel(x) {this.H_("profilePageHeaderThumbnailViewModel",x,this.g);}
	/** @arg {R_ProfilePageHeaderMetadataViewModel} x */
	R_ProfilePageHeaderMetadataViewModel(x) {this.H_("profilePageHeaderMetadataViewModel",x,this.g);}
	/** @arg {R_ProfilePageHeaderButtonRowViewModel} x */
	R_ProfilePageHeaderButtonRowViewModel(x) {this.H_("profilePageHeaderButtonRowViewModel",x,this.g);}
	/** @arg {R_ExpandableSurveyResponse} x */
	R_ExpandableSurveyResponse(x) {this.H_("expandableSurveyResponseRenderer",x,this.D_ExpandableSurveyResponse);}
	/** @private @arg {D_ExpandableSurveyResponse} x */
	D_ExpandableSurveyResponse(x) {
		const cf="D_ExpandableSurveyResponse";
		const {options,submitButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xr.R_RatingSurvey(options);
		this.xm.R_Button(submitButton);
		this.sm.trackingParams(trackingParams);
	}
	/** @arg {R_AutomixPreviewVideo} x */
	R_AutomixPreviewVideo(x) {this.H_("automixPreviewVideoRenderer",x,this.g);}
	/** @public @arg {D_AttBgChallenge} x */
	D_AttBgChallenge(x) {
		const cf="D_AttBgChallenge";
		const {interpreterUrl,interpreterHash,program,globalName,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(interpreterUrl,a => {
			let uw=this.sm.UrlWrappedValueT(a);
			this.sm.a_primitive_str(uw);
		});
		this.sm.a_primitive_str(interpreterHash);
		this.sm.a_primitive_str(program);
		if(globalName!=="trayride") debugger;
	}
	/** @public @arg {D_AudioConfig} x */
	D_AudioConfig(x) {
		const cf="D_AudioConfig";
		const {loudnessDb,perceptualLoudnessDb,enablePerFormatLoudness,...y}=this.s(cf,x); this.g(y);
		this.t(loudnessDb,this.sm.a_primitive_num);
		this.t(perceptualLoudnessDb,this.sm.a_primitive_num);
		this.t(enablePerFormatLoudness,this.sm.a_primitive_bool);
	}
	/** @public @arg {R_DynamicReadaheadConfig} x */
	R_DynamicReadaheadConfig(x) {this.H_("dynamicReadaheadConfig",x,this.D_DynamicReadaheadConfig);}
	/** @public @arg {D_DynamicReadaheadConfig} x */
	D_DynamicReadaheadConfig(x) {
		const cf="D_DynamicReadaheadConfig";
		const {maxReadAheadMediaTimeMs,minReadAheadMediaTimeMs,readAheadGrowthRateMs,...y}=this.s(cf,x); this.g(y);
		this.sm.cq(maxReadAheadMediaTimeMs,120000);
		this.sm.cq(minReadAheadMediaTimeMs,15000);
		this.sm.cq(readAheadGrowthRateMs,1000);
	}
	/** @private @arg {R_PdgCommentChip} x */
	R_PdgCommentChip(x) {this.H_("pdgCommentChipRenderer",x,this.D_PdgCommentChip);}
	/** @public @arg {A_FancyDismissibleDialog} x */
	A_FancyDismissibleDialog(x) {
		let dl=this.xm.TA_OpenPopup("A_FancyDismissibleDialog",x);
		let pu=this.Popup_DL_DismissibleDialog(dl);
		this.sm.R_FancyDismissibleDialog(pu);
	}
	/** @protected @arg {Popup_DL_DismissibleDialog} x */
	Popup_DL_DismissibleDialog(x) {
		const {popup,popupType,beReused,...y}=this.s("Popup_DL_DismissibleDialog",x); this.g(y);/*#destructure_done*/
		this.sm.cq(popupType,"DIALOG");
		this.t(beReused,x => this.sm.cq(x,true));
		return popup;
	}
	/** @public @arg {R_InlineForm} x */
	R_InlineForm(x) {this.H_("inlineFormRenderer",x,this.D_InlineForm);}
	/** @public @arg {D_InlineForm} x */
	D_InlineForm(x) {
		const cf="D_InlineForm";
		const {formField,editButton,saveButton,cancelButton,textDisplayed,style,placeholder,...y}=this.s(cf,x); this.g(y);
		this.R_TextInputFormField(formField);
		this.xm.R_Button(editButton);
		this.xm.R_Button(saveButton);
		this.xm.R_Button(cancelButton);
		this.t(textDisplayed,this.sm.G_Text);
		this.save_enum(cf,"INLINE_FORM_STYLE",style);
		this.t(placeholder,this.sm.G_Text);
	}
	/** @public @arg {R_TextInputFormField} x */
	R_TextInputFormField(x) {this.H_("textInputFormFieldRenderer",x,this.D_TextInputFormField);}
	/** @public @arg {D_TextInputFormField} x */
	D_TextInputFormField(x) {
		const cf="D_TextInputFormField";
		const {label,value,maxCharacterLimit,key,onChange,placeholderText,validValueRegexp,invalidValueErrorMessage,isMultiline,required,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(label);
		this.t(value,x => this.sm.a_primitive_str(x));
		this.save_number(`${cf}.maxCharacterLimit`,maxCharacterLimit);
		this.t(key,x => this.save_string(`${cf}.key`,x));
		this.t(onChange,this.sm.E_PlaylistEdit);
		this.t(placeholderText,x => this.sm.a_primitive_str(x));
		this.sm.cq(validValueRegexp,"[^<>]*");
		this.sm.G_Text(invalidValueErrorMessage);
		this.t(isMultiline,x => this.sm.cq(x,true));
		this.t(required,x => this.sm.cq(x,true));
	}
	/** @public @arg {R_DropdownFormField} x */
	R_DropdownFormField(x) {this.H_("dropdownFormFieldRenderer",x,this.D_DropdownFormField);}
	/** @public @arg {D_DropdownFormField} x */
	D_DropdownFormField(x) {
		const cf="D_DropdownFormField";
		const {dropdown,key,onChange,...y}=this.s(cf,x); this.g(y);
		this.R_Dropdown(dropdown);
		this.sm.cq(key,"playlistEditEndpoint.actions.0.playlistPrivacy");
		let kp=split_string(key,".");
		this.sm.cq(kp[0],"playlistEditEndpoint");
		this.sm.E_PlaylistEdit(onChange);
	}
	/** @public @arg {R_Dropdown} x */
	R_Dropdown(x) {this.H_("dropdownRenderer",x,this.D_Dropdown);}
	/** @public @arg {D_Dropdown} x */
	D_Dropdown(x) {
		const cf="D_Dropdown";
		const {entries,label,...y}=this.s(cf,x); this.g(y);
		this.z(entries,x => {
			if("privacyDropdownItemRenderer" in x) return this.R_PrivacyDropdownItem(x);
			debugger;
		});
		this.t(label,x => this.sm.a_primitive_str(x));
	}
	/** @public @arg {R_PrivacyDropdownItem} x */
	R_PrivacyDropdownItem(x) {this.H_("privacyDropdownItemRenderer",x,this.D_PrivacyDropdownItem);}
	/** @public @arg {D_PrivacyDropdownItem} x */
	D_PrivacyDropdownItem(x) {
		const cf="D_PrivacyDropdownItem";
		const {label,icon,description,int32Value,isSelected,accessibility,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(label);
		this.sm.T_Icon(cf,icon);
		this.sm.G_Text(description);
		switch(int32Value) {
			default: debugger; break;
			case 0: case 1: case 2:
		}
		this.sm.a_primitive_bool(isSelected);
		this.sm.D_Label(accessibility);
	}
	/** @public @arg {R_C4TabbedHeader} x */
	R_C4TabbedHeader(x) {this.H_("c4TabbedHeaderRenderer",x,this.D_C4TabbedHeader);}
	/** @private @arg {D_C4TabbedHeader} x */
	D_C4TabbedHeader(x) {
		const cf="D_C4TabbedHeader";
		const {channelId,title,navigationEndpoint,avatar,banner,badges,headerLinks,subscribeButton,subscriberCountText,tvBanner,mobileBanner,trackingParams,sponsorButton,channelHandleText,videosCountText,...u}=this.s(cf,x);
		this.sm.channelId(channelId);
		this.sm.a_primitive_str(title);
		this.sm.E_VE3611(navigationEndpoint);
		this.sm.D_Thumbnail(avatar);
		this.sm.D_Thumbnail(banner);
		this.tz(badges,this.sm.RMD_Badge);
		this.t(headerLinks,this.sm.R_ChannelHeaderLinks);
		this.xm.R_SubscribeButton(subscribeButton);
		this.sm.G_Text(subscriberCountText);
		this.sm.D_Thumbnail(tvBanner);
		this.sm.D_Thumbnail(mobileBanner);
		this.sm.trackingParams(trackingParams);
		this.t(sponsorButton,this.xm.R_Button);
		this.sm.G_Text(channelHandleText);
		this.sm.G_Text(videosCountText);
		const {visitTracking,...y}=u; this.g(y);
		this.t(visitTracking,this.D_RemarketingPing);
	}
	/** @public @arg {R_ActiveAccountHeader} x */
	R_ActiveAccountHeader(x) {this.H_("activeAccountHeaderRenderer",x,this.D_ActiveAccountHeader);}
	/** @private @arg {D_ActiveAccountHeader} x */
	D_ActiveAccountHeader(x) {
		const cf="D_ActiveAccountHeader";
		const {accountName,accountPhoto,settingsEndpoint,manageAccountTitle,trackingParams,channelHandle,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(accountName);
		this.sm.D_Thumbnail(accountPhoto);
		this.E_ApplicationSettings(settingsEndpoint);
		this.sm.G_Text(manageAccountTitle);
		this.sm.trackingParams(trackingParams);
		this.sm.G_Text(channelHandle);
	}
	/** @private @arg {R_DismissalFollowUp} x */
	R_DismissalFollowUp(x) {this.H_("dismissalFollowUpRenderer",x,this.D_DismissalFollowUp);}
	/** @private @arg {D_DismissalFollowUp} x */
	D_DismissalFollowUp(x) {
		const cf="D_DismissalFollowUp";
		const {trackingParams,dismissalReasonsPrompt,reasons,cancelButton,submitButton,submitFeedbackEndpoint,dismissalViewStyle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.trackingParams(trackingParams);
		this.sm.G_Text(dismissalReasonsPrompt);
		this.z(reasons,this.R_DismissalReasonText);
		this.xm.R_Button(cancelButton);
		this.xm.R_Button(submitButton);
		this.E_SubmitFeedback(submitFeedbackEndpoint);
		this.sm.cq(dismissalViewStyle,"DISMISSAL_VIEW_STYLE_COMPACT_TALL");
	}
	/** @public @arg {R_MacroMarkersListItem} x */
	R_MacroMarkersListItem(x) {this.H_("macroMarkersListItemRenderer",x,this.D_MacroMarkersListItem);}
	/** @private @arg {D_MacroMarkersListItem} x */
	D_MacroMarkersListItem(x) {
		const cf="D_MacroMarkersListItem";
		if("playerStateEntityKey" in x) {
			const {title,timeDescription,thumbnail,onTap,trackingParams,shareButton,repeatButton,macroMarkerRepeatStateEntityKey: a,endRepeatCommand,playerStateEntityKey: b,carouselType,lightColorPalette,darkColorPalette,timeDescriptionA11yLabel,...y}=this.s(cf,x); this.g(y);
			this.sm.G_Text(title);
			this.sm.G_Text(timeDescription);
			this.sm.D_Thumbnail(thumbnail);
			this.sm.E_Watch(onTap);
			this.sm.trackingParams(trackingParams);
			this.xm.R_Button(shareButton);
			this.t(repeatButton,this.xm.R_ToggleButton);
			this.sm.params("macro_marker_repeat_state.entity.key",a);
			this.t(endRepeatCommand,this.sm.C_CommandExecutor);
			this.sm.params("player_state.entity.key",b);
			if(carouselType!=="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT") debugger;
			this.sm.a_primitive_str(timeDescriptionA11yLabel);
			this.t_cf(cf,lightColorPalette,this.sm.D_LightColorPalette);
			this.t_cf(cf,darkColorPalette,this.sm.D_DarkColorPalette);
			return;
		}
		const {title,timeDescription,thumbnail,onTap,trackingParams,carouselType,layout,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(title);
		this.sm.G_Text(timeDescription);
		this.sm.D_Thumbnail(thumbnail);
		this.sm.E_Watch(onTap);
		this.sm.trackingParams(trackingParams);
		if(carouselType!=="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT") debugger;
		if(layout!=="MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL") debugger;
	}
	/** @private @arg {R_MacroMarkersInfoItem} x */
	R_MacroMarkersInfoItem(x) {this.H_("macroMarkersInfoItemRenderer",x,this.D_MacroMarkersInfoItem);}
	/** @private @arg {D_MacroMarkersInfoItem} x */
	D_MacroMarkersInfoItem(x) {
		const cf="D_MacroMarkersList";
		const {infoText,menu,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(infoText);
		this.sm.R_Menu(menu);
	}
	/** @public @arg {R_MacroMarkersList} x */
	R_MacroMarkersList(x) {this.H_("macroMarkersListRenderer",x,this.D_MacroMarkersList);}
	/** @private @arg {D_MacroMarkersList} x */
	D_MacroMarkersList(x) {
		const cf="D_MacroMarkersList";
		const {contents,syncButtonLabel,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,x => {
			if("macroMarkersListItemRenderer" in x) return this.R_MacroMarkersListItem(x);
			if("macroMarkersInfoItemRenderer" in x) return this.R_MacroMarkersInfoItem(x);
			debugger;
		});
		this.sm.G_Text(syncButtonLabel);
		this.sm.trackingParams(trackingParams);
	}
	/** @public @arg {R_HorizontalCardList} x */
	R_HorizontalCardList(x) {this.H_("horizontalCardListRenderer",x,this.D_HorizontalCardList);}
	/** @private @arg {D_HorizontalCardList} x */
	D_HorizontalCardList(x) {
		const cf="D_HorizontalCardList";
		const {cards,trackingParams,header,style,centerItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(cards,this.R_MacroMarkersListItem);
		this.sm.trackingParams(trackingParams);
		this.sm.R_RichListHeader(header);
		x: {
			let x1=style;
			if("styleType" in x1) {this.sm.cq(x1.styleType,"HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION"); break x;}
			if("type" in x1) {this.sm.cq(x1.type,"HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION"); break x;}
			this.sm.cq(x1+"1",x1+"");
		}
		this.sm.cq(centerItems,false);
	}
	/** @public @arg {R_StructuredDescriptionContent} x */
	R_StructuredDescriptionContent(x) {this.H_("structuredDescriptionContentRenderer",x,this.D_StructuredDescriptionContent);}
	/** @private @arg {D_StructuredDescriptionContent} x */
	D_StructuredDescriptionContent(x) {this.H_("items",x,x => this.z(x,this.G_StructuredDescriptionContentItem));}
	/** @private @arg {G_StructuredDescriptionContentItem} x */
	G_StructuredDescriptionContentItem(x) {
		const cf="G_StructuredDescriptionContentItem";
		if("expandableVideoDescriptionBodyRenderer" in x) return this.ht.R_ExpandableVideoDescriptionBody(x);
		if("horizontalCardListRenderer" in x) return this.R_HorizontalCardList(x);
		if("videoDescriptionHeaderRenderer" in x) return this.sm.R_VideoDescriptionHeader(x);
		if("videoDescriptionMusicSectionRenderer" in x) return this.ht.R_VideoDescriptionMusicSection(x);
		if("videoDescriptionCourseSectionRenderer" in x) return this.sm.R_VideoDescriptionCourseSection(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {A_GetSystemMenu} x */
	A_GetSystemMenu(x) {
		const cf="A_GetSystemMenu";
		let pu=this.xm.TA_OpenPopup(cf,x);
		this.Popup_DD_SystemMenu(pu);
	}
	/** @private @arg {Popup_DD_SystemMenu} x */
	Popup_DD_SystemMenu(x) {
		let m=this.sm.T_OpenPopup_Dropdown("Popup_DD_SystemMenu",x);
		this.t(m,this.R_SystemMenu);
	}
	/** @public @arg {R_SystemMenu} x */
	R_SystemMenu(x) {this.t(this.sm.TR_MultiPageMenu("R_SystemMenu",x),this.MP_SystemMenu);}
	/** @public @arg {MP_SystemMenu} x */
	MP_SystemMenu(x) {
		const cf="MP_SystemMenu";
		const {header,sections,trackingParams,style,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xr.R_ActiveAccountHeader(header);
		this.sm.trackingParams(trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_SYSTEM") debugger;
	}
	/** @private @arg {R_DismissalReasonText} x */
	R_DismissalReasonText(x) {this.H_("dismissalReasonTextRenderer",x,this.D_DismissalReasonText);}
	/** @private @arg {D_DismissalReasonText} x */
	D_DismissalReasonText(x) {
		const cf="D_DismissalReasonText";
		const {trackingParams,text,feedbackToken,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.trackingParams(trackingParams);
		this.sm.G_Text(text);
		this.sm.save_b64_binary(`${cf}.feedbackToken`,feedbackToken);
	}
	//#endregion
	//#region Group Union
	//#region G_
	/** @private @arg {G_ChannelSwitcherContent} x */
	G_ChannelSwitcherContent(x) {
		const cf="G_ChannelSwitcherContent";
		if("buttonRenderer" in x) return this.xm.R_Button(x);
		if("accountItem" in x) return this.ht.A_AccountItem(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_PlaylistSidebarItem} x */
	G_PlaylistSidebarItem(x) {
		const cf="G_PlaylistSidebarItem";
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_NextContents} x */
	G_NextContents(x) {
		const cf="G_NextContents";
		if("twoColumnWatchNextResults" in x) return this.sm.R_TwoColumnWatchNextResults(x);
		if("singleColumnMusicWatchNextResultsRenderer" in x) return this.R_SingleColumnMusicWatchNextResults(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_GuideSectionItem} x */
	G_GuideSectionItem(x) {
		const cf="G_GuideSectionItem";
		if("guideEntryRenderer" in x) return this.R_GuideEntry(x);
		if("guideCollapsibleSectionEntryRenderer" in x) return this.R_GuideCollapsibleSectionEntry(x);
		if("guideDownloadsEntryRenderer" in x) return this.R_GuideDownloadsEntry(x);
		if("guideCollapsibleEntryRenderer" in x) return this.R_GuideCollapsibleEntry(x);
		if("guideSubscriptionsSectionRenderer" in x) return this.R_GuideSubscriptionsSection(x);
		if("guideSectionRenderer" in x) return this.R_GuideSection(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_ChatItem} x */
	G_ChatItem(x) {
		const cf="G_ChatItem";
		if("liveChatTextMessageRenderer" in x) return this.R_LiveChatTextMessage(x);
		if("liveChatPlaceholderItemRenderer" in x) return this.R_LiveChatPlaceholderItem(x);
		if("liveChatViewerEngagementMessageRenderer" in x) return this.R_LiveChatViewerEngagementMessage(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_RS_Subscribe_Action} x */
	G_RS_Subscribe_Action(x) {
		const cf="RS_Subscribe_ActionItem";
		if("openPopupAction" in x) {
			/** @type {`${typeof cf}_Action`} */
			const cf1=`${cf}_Action`;
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf1,x); this.g(y);
			this.sm.clickTrackingParams(clickTrackingParams);
			console.log(`[${cf}.openPopupAction]`,openPopupAction);
			return;
		}
		if("addToGuideSectionAction" in x) return this.A_AddToGuideSection(x);
		if("runAttestationCommand" in x) return this.C_RunAttestation(x);
		if("updateSubscribeButtonAction" in x) return this.AU_SubscribeButton(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_LiveChatContinuationItem} x */
	G_LiveChatContinuationItem(x) {
		const cf="G_LiveChatContinuationItem";
		if("invalidationContinuationData" in x) return this.CD_Invalidation(x);
		if("liveChatReplayContinuationData" in x) return this.CD_LiveChatReplay(x);
		if("playerSeekContinuationData" in x) return this.CD_PlayerSeek(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_RA_LiveChatContinuationActions} x */
	G_LiveChatContinuationActions(x) {
		const cf="G_LiveChatContinuationActions";
		if("replayChatItemAction" in x) return this.A_ReplayChatItem(x);
		if("addChatItemAction" in x) return this.A_AddChatItem(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_WatchNext} x */
	G_WatchNext(x) {
		const cf="G_WatchNext";
		if("continuationItemRenderer" in x) return this.sm.R_ContinuationItem(x);
		if("compactVideoRenderer" in x) return this.sm.R_CompactVideo(x);
		if("compactPlaylistRenderer" in x) return this.sm.R_CompactPlaylist(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_MenuNavigationItem_NavEP} x */
	G_MenuNavigationItem_NavEP(x) {
		if("userFeedbackEndpoint" in x) return this.sm.E_UserFeedback(x);
		if("openPopupAction" in x) return this.GA_MenuNavigationPopup(x);
		debugger;
	}
	//#endregion
	//#region GA_
	/** @private @arg {GA_MenuNavigationPopup} x */
	GA_MenuNavigationPopup(x) {
		const cf="GA_MenuNavigationPopup";
		const {clickTrackingParams,openPopupAction: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.clickTrackingParams(clickTrackingParams);
		{
			const {popup,popupType,beReused,...y}=this.s("Popup_DL_MenuNavigation",a); this.g(y);
			x: {
				let x2=popup; this.sm.k("G_MenuNavigationPopup",x2);
				if("aboutThisAdRenderer" in x2) {this.sm.R_AboutThisAd(x2); break x;}
				if("fancyDismissibleDialogRenderer" in x2) {this.sm.R_FancyDismissibleDialog(x2); break x;}
				debugger;
			}
			this.sm.cq(popupType,"DIALOG");
			this.t(beReused,x => this.sm.cq(x,true));
		}
	}
	//#endregion
	//#endregion
	//#region Data methods
	/** @private @arg {D_PlaylistSidebar} x */
	D_PlaylistSidebar(x) {
		const cf="D_PlaylistSidebar";
		const {items,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_PlaylistSidebarItem);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlaylistSidebarSecondaryInfo} x */
	D_PlaylistSidebarSecondaryInfo(x) {this.H_("videoOwner",x,this.sm.R_VideoOwner);}
	/** @private @arg {D_NotchesItem} x */
	D_NotchesItem(x) {
		const cf="NotchesItem";
		const {linearGradientCssStyle,knobColorArgb,purchaseCommand,tierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(linearGradientCssStyle) {debugger;}
		if(knobColorArgb!==4280191205) debugger;
		this.xr.E_YpcGetCart(purchaseCommand);
		this.sm.G_Text(tierValue);
	}
	/** @private @arg {D_GuideCollapsibleEntry} x */
	D_GuideCollapsibleEntry(x) {
		const cf="D_GuideCollapsibleEntry";
		const {expanderItem,expandableItems,collapserItem,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_GuideEntry(expanderItem);
		this.z(expandableItems,x => {
			if("guideEntryRenderer" in x) return this.G_GuideSectionItem(x);
		});
		this.R_GuideEntry(collapserItem);
	}
	/** @private @arg {D_GuideDownloadsEntry} x */
	D_GuideDownloadsEntry(x) {
		const cf="D_GuideDownloadsEntry";
		const {alwaysShow,entryRenderer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(alwaysShow!==false) debugger;
		if(!entryRenderer.guideEntryRenderer) debugger;
		this.R_GuideEntry(entryRenderer);
	}
	/** @private @arg {D_GuideSubscriptionsSection} x */
	D_GuideSubscriptionsSection(x) {
		const cf="D_GuideSubscriptionsSection";
		const {sort,items,trackingParams,formattedTitle,handlerDatas,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(sort!=="CHANNEL_ACTIVITY") debugger;
		this.z(items,x => {
			if("guideEntryRenderer" in x) return this.G_GuideSectionItem(x);
			if("guideCollapsibleEntryRenderer" in x) return this.G_GuideSectionItem(x);
			let ua=this.get_keys_of(x);
			if(ua.length>0) console.log("[G_GuideSubscriptionsSectionItem.key]",ua);
		});
		this.sm.trackingParams(trackingParams);
		this.t(formattedTitle,this.sm.G_Text);
		if(!this.eq_keys(handlerDatas,["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"])) debugger;
	}
	/** @private @arg {D_GuideSection} x */
	D_GuideSection(x) {
		const cf="D_GuideSection";
		const {items,trackingParams,formattedTitle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_GuideSectionItem);
		this.sm.trackingParams(trackingParams);
		this.t(formattedTitle,this.sm.G_Text);
	}
	/** @private @arg {D_GuideCollapsibleSectionEntry} x */
	D_GuideCollapsibleSectionEntry(x) {
		const cf="D_GuideCollapsibleSectionEntry";
		const {headerEntry,expanderIcon,collapserIcon,sectionItems,handlerDatas,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_GuideEntry(headerEntry);
		this.sm.T_Icon("D_Guide_ExpandIcon",expanderIcon);
		this.sm.T_Icon("D_Guide_CollapseIcon",collapserIcon);
		this.z(sectionItems,this.G_GuideSectionItem);
		if(handlerDatas[0]!=="GUIDE_ACTION_ADD_TO_PLAYLISTS") debugger;
		if(handlerDatas[1]!=="GUIDE_ACTION_REMOVE_FROM_PLAYLISTS") debugger;
		if(handlerDatas.length!==2) debugger;
	}
	/** @private @arg {D_ResourceStatusInResponseCheck} x */
	D_ResourceStatusInResponseCheck(x) {
		const cf="D_ResourceStatusInResponseCheckData";
		const {serverBuildLabel,resourceStatuses: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.a_primitive_str(serverBuildLabel);
		this.z(a,this.D_ElementResourceStatus);
	}
	/** @private @arg {D_ElementResourceStatus} x */
	D_ElementResourceStatus(x) {
		const cf="D_ElementResourceStatus";
		const {identifier,status,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		this.sm.a_primitive_str(identifier);
	}
	/** @private @arg {D_PlaylistVideoThumbnail} x */
	D_PlaylistVideoThumbnail(x) {
		const cf="D_PlaylistVideoThumbnail";
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.D_Thumbnail(thumbnail);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_Playlist_MD} x */
	D_Playlist_MD(x) {
		const cf="D_Playlist_MD";
		const {title,iosAppindexingLink,androidAppindexingLink,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.a_primitive_str(title);
		this.sm.a_primitive_str(iosAppindexingLink);
		this.sm.a_primitive_str(androidAppindexingLink);
	}
	/** @private @arg {D_PdgCommentOption} x */
	D_PdgCommentOption(x) {
		const cf="D_PdgCommentOption";
		const {commentText,chipRenderer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(commentText);
		this.R_PdgCommentChip(chipRenderer);
	}
	/** @private @arg {D_PdgCommentChip} x */
	D_PdgCommentChip(x) {
		const cf="D_PdgCommentChip";
		const {chipText,chipColorPalette,chipIcon,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(chipText);
		this.D_ChipColorPalette(chipColorPalette);
		if(chipIcon.iconType!=="FILL_DOLLAR_SIGN_HEART_12") debugger;
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_RemarketingPing} x */
	D_RemarketingPing(x) {
		const cf="D_RemarketingPing",{remarketingPing,...y}=this.s(cf,x),t=this; this.g(y);
		let tr=t._convert_url_to_obj(remarketingPing);
		t.sm.cq(tr.host,"www.youtube.com");
		let [r,...p]=split_string(tr.pathname,"/"); t.sm.cq(r,"");
		t.sm.cq(p[0],"pagead"); t.sm.cq(p[1],"viewthroughconversion");
		let np=this.sm.parse_number_template(p[2]);
		if(this.view_conversion_info.has(np)) return;
		let sp=this.parse_url_search_params(tr.search);
		let kk=this.get_keys_of(sp);
		console.log(`[${cf}]`,"[keys]",kk.join());
		this.view_conversion_info.set(np,sp);
	}
	/** @public @arg {D_ExternalChannelId} x */
	D_ExternalChannelId(x) {
		const cf="D_ExternalChannelId";
		const {externalChannelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.channelId(externalChannelId);
	}
	/** @private @arg {D_InvalidationId} x */
	D_InvalidationId(x) {
		const cf="D_InvalidationId";
		const {objectSource,objectId,topic,subscribeToGcmTopics,protoCreationTimestampMs,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_num(objectSource);
		console.log(`[${cf}.objectId]`,objectId);
		console.log(`[${cf}.topic]`,topic);
		if(subscribeToGcmTopics!==true) debugger;
		console.log(`[${cf}.protoCreationTimestampMs]`,protoCreationTimestampMs);
	}
	/** @private @arg {D_RunAttestation} x */
	D_RunAttestation(x) {
		const cf="D_RunAttestation";
		const {ids,engagementType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ids,this.D_ExternalChannelId);
		if(engagementType!=="ENGAGEMENT_TYPE_SUBSCRIBE") debugger;
	}
	//#endregion
	//#region New Data methods
	/** @public @arg {D_FeedbackResponseProcessedStatus} x */
	D_FeedbackResponseProcessedStatus(x) {
		const cf="D_FeedbackResponseProcessedStatus";
		const {isProcessed,followUpDialog,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._primitive_of(isProcessed,"boolean");
		this.t(followUpDialog,this.R_DismissalFollowUp);
	}
	//#endregion
	//#region new
	/** @template {C_Continuation} BT @template {BT["continuationCommand"]["request"]} T @arg {BT} x @arg {T} t @returns {x is {continuationCommand:{request:T}}} */
	is_C_Continuation_one(x,t) {return x.continuationCommand.request===t;}
	/** @public @arg {C_Continuation} x */
	C_Continuation(x) {
		if(this.is_C_Continuation_one(x,"CONTINUATION_REQUEST_TYPE_BROWSE")) {
			const [a,b,y]=this.sm.TE_Endpoint_Opt_3("C_Continuation","continuationCommand",x); this.g(y);
			this.t(a,this.M_Browse);
			this.DC_Continuation_Browse(b);
			return;
		}
		if(this.is_C_Continuation_one(x,"CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE")) {
			const [a,b,y]=this.sm.TE_Endpoint_Opt_3("C_Continuation","continuationCommand",x); this.g(y);
			this.t(a,this.M_Next);
			this.DC_Continuation_ReelWatchSeq(b);
			return;
		}
		if(this.is_C_Continuation_one(x,"CONTINUATION_REQUEST_TYPE_WATCH_NEXT")) {
			const [a,b,y]=this.sm.TE_Endpoint_Opt_3("C_Continuation","continuationCommand",x); this.g(y);
			this.t(a,this.M_Next);
			this.DC_Continuation_WatchNext(b);
			return;
		}
		debugger;
	}
	/** @public @arg {DC_Continuation} x */
	DC_Continuation(x) {
		if("continuationCommand" in x) debugger;
		const cf="DC_Continuation";
		switch(x.request) {
			default: debugger; break;
			case "CONTINUATION_REQUEST_TYPE_BROWSE": {
				if("command" in x) {return this.y(this,cf,"command",this.DC_Continuation_Omit(cf,x),this.C_ShowReloadUi);}
				return this.g(this.DC_Continuation_Omit(cf,x));
			}
			case "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE": return this.g(this.DC_Continuation_Omit(cf,x));
			case "CONTINUATION_REQUEST_TYPE_WATCH_NEXT": {
				if("command" in x) {return this.y(this,cf,"command",this.DC_Continuation_Omit(cf,x),this.C_ShowReloadUi);}
				return this.g(this.DC_Continuation_Omit(cf,x));
			}
		}
	}
	/** @private @arg {C_ShowReloadUi} x */
	C_ShowReloadUi(x) {
		const cf="C_ShowReloadUi";
		const {clickTrackingParams,showReloadUiCommand: a,...y}=this.s(cf,x); this.g(y);//#destructure
		this.sm.clickTrackingParams(clickTrackingParams);
		this.DC_ShowReloadUi(a);
	}
	/** @private @arg {DC_ShowReloadUi} x */
	DC_ShowReloadUi(x) {this.y(this,"DC_ShowReloadUi","targetId",x,this.D_UiTargetId);}
	/** @type {D_UiTargetId[]} */
	reload_ui_target_id_arr=[];
	/** @arg {D_UiTargetId} x */
	D_UiTargetId(x) {
		if(this.sm.is_yt_uuid(x)) return;
		switch(x) {
			default: if(!this.reload_ui_target_id_arr.includes(x)) {this.reload_ui_target_id_arr.push(x); debugger;} break;
			case "comments-section":
			case "browse-feedFEwhat_to_watch": case "watch-next-feed": case "engagement-panel-comments-section":
		}
	}
	/** @template {{}} T @arg {{}} x @arg {()=>T|null} wx @returns {asserts x is T} */
	assert_is_omit_key(x,wx) {x; wx;}
	/** @private @template {DC_Continuation} T @arg {"DC_Continuation"} cf @arg {T} x @returns {T_OmitKey<T,"token"|"request">} */
	DC_Continuation_Omit(cf,x) {
		const {token,request,...y}=this.s(cf,x);
		switch(request) {
			default: debugger; break;
			case "CONTINUATION_REQUEST_TYPE_BROWSE": this.sm.params("continuation_request.browse.token",token); break;
			case "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE": this.sm.params("continuation_request.reel_watch_sequence.token",token); break;
			case "CONTINUATION_REQUEST_TYPE_WATCH_NEXT": this.sm.params("continuation_request.watch_next.token",token); break;
		};
		/** @returns {T_OmitKey<T,"token"|"request">|null} */
		function gu() {return null;}
		this.assert_is_omit_key(y,gu);
		return y;
	}
	/** @public @arg {DC_Continuation_Browse} x */
	DC_Continuation_Browse(x) {
		const cf="DC_Continuation_Browse";
		const {token,request,command,...y}=this.s(cf,x); this.g(y);
		this.save_enum(`${cf}.request`,"CONTINUATION_REQUEST_TYPE",request);
		this.sm.params("continuation_request.browse.token",token);
		this.t(command,this.C_ShowReloadUi);
	}
	/** @public @arg {DC_Continuation_ReelWatchSeq} x */
	DC_Continuation_ReelWatchSeq(x) {
		const cf="DC_Continuation_ReelWatchSeq";
		const {token,request,...y}=this.s(cf,x); this.g(y);
		this.save_enum(`${cf}.request`,"CONTINUATION_REQUEST_TYPE",request);
		this.sm.params("continuation_request.reel_watch_sequence.token",token);
	}
	/** @public @arg {DC_Continuation_WatchNext} x */
	DC_Continuation_WatchNext(x) {
		const cf="DC_Continuation_WatchNext";
		const {token,request,command,...y}=this.s(cf,x); this.g(y);
		this.save_enum(`${cf}.request`,"CONTINUATION_REQUEST_TYPE",request);
		this.sm.params("continuation_request.watch_next.token",token);
		this.t(command,this.C_ShowReloadUi);
	}
	/** @protected @arg {M_Browse} x */
	M_Browse(x) {this.T_WCM("M_Browse",x,x => this.GM_Browse(x));}
	/** @protected @arg {M_Next} x */
	M_Next(x) {this.T_WCM("M_Next",x,x => this.GM_Next(x));}
	/** @public @arg {R_EmojiPicker} x */
	R_EmojiPicker(x) {this.H_("emojiPickerRenderer",x,this.D_EmojiPicker);}
	/** @private @arg {D_EmojiPicker} x */
	D_EmojiPicker(x) {
		const cf="D_EmojiPicker";
		const {id,categories,categoryButtons,searchPlaceholderText,searchNoResultsText,pickSkinToneText,trackingParams,clearSearchLabel,skinToneGenericLabel,skinToneLightLabel,skinToneMediumLightLabel,skinToneMediumLabel,skinToneMediumDarkLabel,skinToneDarkLabel,...y}=this.s(cf,x); this.g(y);
		if(id!=="emoji") debugger;
		this.z(categories,x => {
			if("emojiPickerCategoryRenderer" in x) return this.R_EmojiPickerCategory(x);
			x.emojiPickerUpsellCategoryRenderer;
		});
		this.z(categoryButtons,this.R_EmojiPickerCategoryButton);
		this.sm.G_Text(searchPlaceholderText);
		this.sm.G_Text(searchNoResultsText);
		this.sm.G_Text(pickSkinToneText);
		this.z([clearSearchLabel,skinToneGenericLabel,skinToneLightLabel,skinToneMediumLightLabel,skinToneMediumLabel,skinToneMediumDarkLabel,skinToneDarkLabel],x => this.sm.a_primitive_str(x));
	}
	/** @private @arg {R_EmojiPickerCategory} x */
	R_EmojiPickerCategory(x) {this.H_("emojiPickerCategoryRenderer",x,this.D_EmojiPickerCategory);}
	/** @private @arg {D_EmojiPickerCategory} x */
	D_EmojiPickerCategory(x) {
		if(x.categoryType==="CATEGORY_TYPE_GLOBAL") {
			const cf="D_EmojiPickerCategory:Global";
			const {categoryId,title,emojiIds,trackingParams,categoryType,...y}=this.s(cf,x); this.g(y);
			if(!this.sm.str_starts_with(categoryId,"UC")) debugger;
			this.sm.G_Text(title);
			this.z(emojiIds,x => {
				let [channel_id,parsed_emoji]=this.sm.parse_emoji_id(x);
				this.sm.channelId(channel_id);
				this.save_string(`${categoryId}.emojiId`,parsed_emoji);
			});
			this.sm.channelId(categoryId);
			this.sm.trackingParams(trackingParams);
			return;
		}
		const cf="D_EmojiPickerCategory";
		const {categoryId,title,emojiIds,trackingParams,imageLoadingLazy,categoryType,...y}=this.s(cf,x); this.g(y);
		switch(categoryId) {
			default: debugger; break;
			case "people": case "nature": case "food": case "travel": case "activities": case "objects": case "symbols":
		}
		this.sm.G_Text(title);
		this.z(emojiIds,x => {
			this.save_string(`${categoryId}.emojiId`,x);
		});
		this.sm.trackingParams(trackingParams);
		if(imageLoadingLazy!==true) debugger;
		if(categoryType!=="CATEGORY_TYPE_UNICODE") debugger;
	}
	/** @private @arg {D_EmojiPickerCategoryButton} x @returns {x is {categoryId: T_IdTemplate<"UC",D_UserIdStr>}} */
	is_D_EmojiPickerCategoryButton_ForChannel(x) {return this.sm.str_starts_with(x.categoryId,"UC");}
	/** @private @arg {R_EmojiPickerCategoryButton} x */
	R_EmojiPickerCategoryButton(x) {this.H_("emojiPickerCategoryButtonRenderer",x,this.D_EmojiPickerCategoryButton);}
	/** @private @arg {D_EmojiPickerCategoryButton} x */
	D_EmojiPickerCategoryButton(x) {
		if("targetId" in x) {
			const cf="D_EmojiPickerCategoryButton:targetId";
			const {categoryId,icon,tooltip,accessibility,targetId,...y}=this.s(cf,x); this.g(y);
			switch(categoryId) {
				default: debugger; break;
				case "people":
			}
			this.sm.T_Icon(`${cf}:icon`,icon);
			if(tooltip!=="People") debugger;
			this.sm.D_Accessibility(accessibility);
			if(targetId!=="emoji-picker-category-button-people") debugger;
			return;
		}
		if(this.is_D_EmojiPickerCategoryButton_ForChannel(x)) {
			const cf="D_EmojiPickerCategoryButton:ForChannel";
			const {categoryId,icon,tooltip,accessibility,...y}=this.s(cf,x); this.g(y);
			this.sm.channelId(categoryId);
			this.sm.T_Icon(`${cf}:icon`,icon);
			switch(tooltip) {
				default: debugger; break;
				case "Custom emoji":
				case "YouTube":
			}
			this.sm.D_Accessibility(accessibility);
			return;
		}
		const cf="D_EmojiPickerCategoryButton";
		const {categoryId,icon,tooltip,accessibility,...y}=this.s(cf,x); this.g(y);
		switch(categoryId) {
			default: debugger; break;
			case "nature": case "food": case "travel": case "activities": case "objects": case "symbols":
		}
		this.sm.T_Icon(`${cf}:icon`,icon);
		switch(tooltip) {
			default: debugger; break;
			case "Nature": case "Food": case "Travel": case "Activities": case "Objects": case "Symbols":
		}
		this.sm.D_Accessibility(accessibility);
	}
	/** @public @arg {TA_Continuation<"engagement-panel-comments-section", G_CommentsSection>} x */
	A_CommentsSectionContinuation_2(x) {
		const cf="A_CommentsSectionContinuation";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.targetId(cf,targetId);
		this.z(continuationItems,x => {
			const cf="G_CommentsSection";
			if("commentThreadRenderer" in x) return this.sm.R_CommentThread(x);
			if("continuationItemRenderer" in x) return this.sm.R_ContinuationItem(x);
			x===""; this.sm.codegen_typedef(cf,x);
		});
	}
	/** @public @arg {R_AuthorCommentBadge} x */
	R_AuthorCommentBadge(x) {this.H_("authorCommentBadgeRenderer",x,this.D_AuthorCommentBadge);}
	/** @private @arg {D_AuthorCommentBadge} x */
	D_AuthorCommentBadge(x) {
		const cf="D_AuthorCommentBadge";
		const {icon,color,authorText,authorEndpoint,iconTooltip,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
	}
	/** @public @arg {E_PerformCommentAction} x */
	E_PerformCommentAction(x) {this.TE_Endpoint_3_v2("performCommentActionEndpoint",x,this.M_PerformCommentAction,this.DE_PerformCommentAction);}
	/** @private @arg {M_PerformCommentAction} x */
	M_PerformCommentAction(x) {this.T_WCM("M_PerformCommentAction",x,this.GM_PerformCommentAction);}
	/** @private @arg {DE_PerformCommentAction} x */
	DE_PerformCommentAction(x) {
		const cf="DE_PerformCommentAction";
		const {action,clientActions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.params("perform_comment.action",action);
		this.z(clientActions,this.A_UpdateCommentVote);
	}
	/** @private @arg {A_UpdateCommentVote} x */
	A_UpdateCommentVote(x) {let [a,y]=this.sm.TE_Endpoint_2("A_UpdateCommentVote","updateCommentVoteAction",x); this.g(y); this.AD_UpdateCommentVote(a);}
	/** @private @arg {AD_UpdateCommentVote} x */
	AD_UpdateCommentVote(x) {
		const cf="AD_UpdateCommentVote";
		const {voteCount,voteStatus,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(voteCount,this.sm.G_Text);
		this.save_string(`${cf}.voteStatus`,voteStatus);
		switch(voteStatus) {
			case "LIKE":
		}
	}
	/** @public @arg {E_CreateCommentReplyDialog} x */
	E_CreateCommentReplyDialog(x) {this.TE_Endpoint_3_v2("createCommentReplyDialogEndpoint",x,this.M_CreateCommentReplyDialog,this.DE_CreateCommentReplyDialog);}
	/** @private @arg {M_CreateCommentReplyDialog} x */
	M_CreateCommentReplyDialog(x) {this.T_WCM("M_CreateCommentReplyDialog",x,this.GM_CreateCommentReplyDialog);}
	/** @private @arg {GM_CreateCommentReply} x */
	GM_CreateCommentReply(x) {this.sm.T_GM("GM_CreateCommentReply",x,x => this.sm.cq(x,"/youtubei/v1/comment/create_comment_reply"));}
	/** @private @arg {GM_CreateCommentReplyDialog} x */
	GM_CreateCommentReplyDialog(x) {this.D_IgnoreNavigation(x);}
	/** @public @arg {R_SponsorCommentBadge} x */
	R_SponsorCommentBadge(x) {this.H_("sponsorCommentBadgeRenderer",x,this.D_SponsorCommentBadge);}
	/** @private @arg {D_SponsorCommentBadge} x */
	D_SponsorCommentBadge(x) {
		const cf="D_SponsorCommentBadge";
		const {customBadge,tooltip,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.D_Thumbnail(customBadge);
		this.sm.a_primitive_str(tooltip);
	}
	/** @private @arg {D_IgnoreNavigation} x */
	D_IgnoreNavigation(x) {this.y(this,"D_IgnoreNavigation","ignoreNavigation",x,x => this.sm.cq(x,true));}
	/** @private @arg {DE_CreateCommentReplyDialog} x */
	DE_CreateCommentReplyDialog(x) {
		const cf="DE_CreateCommentReplyDialog";
		const {dialog,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_CommentReplyDialog(dialog);
	}
	/** @private @arg {R_CommentReplyDialog} x */
	R_CommentReplyDialog(x) {this.H_("commentReplyDialogRenderer",x,this.D_CommentReplyDialog);}
	/** @private @arg {D_CommentReplyDialog} x */
	D_CommentReplyDialog(x) {
		const cf="D_CommentReplyDialog";
		const {replyButton,cancelButton,authorThumbnail,editableText,placeholderText,errorMessage,emojiButton,emojiPicker,aadcGuidelinesStateEntityKey,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xm.R_Button(replyButton);
		this.xm.R_Button(cancelButton);
		this.sm.D_Thumbnail(authorThumbnail);
		this.t(editableText,this.sm.G_Text);
		this.sm.G_Text(placeholderText);
		this.sm.G_Text(errorMessage);
		this.xm.R_Button(emojiButton);
		this.R_EmojiPicker(emojiPicker);
		this.sm.params("aadc_guidelines_state.entity.key",aadcGuidelinesStateEntityKey);
	}
	/** @public @arg {E_CreateCommentReply} x */
	E_CreateCommentReply(x) {this.TE_Endpoint_3_v2("createCommentReplyEndpoint",x,this.M_CreateCommentReply,this.DE_CreateCommentReply);}
	/** @private @arg {M_CreateCommentReply} x */
	M_CreateCommentReply(x) {this.T_WCM("M_CreateCommentReply",x,this.GM_CreateCommentReply);}
	/** @private @arg {DE_CreateCommentReply} x */
	DE_CreateCommentReply(x) {this.y(this,"DE_CreateCommentReply","createReplyParams",x,x => this.sm.params("create_reply.params",x));}
	/** @public @arg {R_VideoInfoCardContent} x */
	R_VideoInfoCardContent(x) {this.H_("videoInfoCardContentRenderer",x,this.D_VideoInfoCardContent);}
	/** @private @arg {D_VideoInfoCardContent} x */
	D_VideoInfoCardContent(x) {
		const cf="D_VideoInfoCardContent";
		const {videoThumbnail,lengthString,videoTitle,channelName,viewCountText,action,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.sm.D_Thumbnail(videoThumbnail);
		this.sm.G_Text(lengthString);
		this.sm.G_Text(videoTitle);
		this.sm.G_Text(channelName);
		this.sm.G_Text(viewCountText);
		this.sm.E_Watch(action);
		this.sm.trackingParams(trackingParams);
	}
	/** @public @arg {R_SimpleCardContent} x */
	R_SimpleCardContent(x) {this.H_("simpleCardContentRenderer",x,this.D_SimpleCardContent);}
	/** @private @arg {D_SimpleCardContent} x */
	D_SimpleCardContent(x) {
		const cf="D_SimpleCardContent";
		const {image,title,actionButton,trackingParams,displayDomain,showLinkIcon,callToAction,command,...y}=this.s(cf,x); this.g(y);
		this.sm.D_Thumbnail(image);
		this.sm.G_Text(title);
		this.R_SimpleCardButton(actionButton);
		this.sm.trackingParams(trackingParams);
		this.sm.G_Text(displayDomain);
		this.sm.cq(showLinkIcon,true);
		this.sm.G_Text(callToAction);
		if(command.urlEndpoint) this.xm.E_Url(command);
		else debugger;
	}
	/** @private @arg {R_SimpleCardButton} x */
	R_SimpleCardButton(x) {this.H_("simpleCardButtonRenderer",x,this.g);}
	/** @public @arg {R_ReelPlayerOverlay} x */
	R_ReelPlayerOverlay(x) {this.H_("reelPlayerOverlayRenderer",x,this.D_ReelPlayerOverlay);}
	/** @private @arg {D_ReelPlayerOverlay} x */
	D_ReelPlayerOverlay(x) {
		const cf="D_ReelPlayerOverlay";
		const {likeButton,reelPlayerHeaderSupportedRenderers,menu,nextItemButton,prevItemButton,subscribeButtonRenderer,style,viewCommentsButton,videoInteractions,...u}=this.s(cf,x);/*#destructure_partial*/
		this.t(likeButton,this.sm.R_LikeButton);
		this.t(reelPlayerHeaderSupportedRenderers,this.R_ReelPlayerHeader);
		this.t(menu,this.sm.R_Menu);
		this.t(nextItemButton,this.xm.R_Button);
		this.t(prevItemButton,this.xm.R_Button);
		this.t(subscribeButtonRenderer,this.xm.R_SubscribeButton);
		if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.t(viewCommentsButton,this.xm.R_Button);
		this.t(videoInteractions,this.g);
		const {trackingParams,reelPlayerNavigationModel,shareButton,pivotButton,multimixAttributionLabel,badge,...y}=u; this.g(y);/*#destructure_done*/
		this.sm.trackingParams(trackingParams);
		{const x2=reelPlayerNavigationModel; this.t(x2,this.sm.wg(x2,"REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED"));}
		this.t(shareButton,this.xm.R_Button);
		this.t(pivotButton,this.R_PivotButton);
		this.t(multimixAttributionLabel,this.R_ReelMultimixAttributionLabel);
		this.t(badge,this.sm.RMD_Badge);
	}
	/** @use_import D_ReelPlayerOverlay @public @arg {R_ReelPlayerHeader} x */
	R_ReelPlayerHeader(x) {this.H_("reelPlayerHeaderRenderer",x,this.D_ReelPlayerHeader);}
	/** @private @arg {D_ReelPlayerHeader} x */
	D_ReelPlayerHeader(x) {
		const cf="D_ReelPlayerHeader";
		const {reelTitleText,timestampText,channelNavigationEndpoint,channelTitleText,channelThumbnail,trackingParams,accessibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(reelTitleText);
		this.sm.G_Text(timestampText);
		this.sm.E_VE3611(channelNavigationEndpoint);
		this.sm.G_Text(channelTitleText);
		this.sm.D_Thumbnail(channelThumbnail);
		this.sm.trackingParams(trackingParams);
		this.sm.D_Accessibility(accessibility);
	}
	/** @use_import D_ReelPlayerOverlay @public @arg {R_ReelMultimixAttributionLabel} x */
	R_ReelMultimixAttributionLabel(x) {this.H_("reelMultimixAttributionLabelRenderer",x,this.D_ReelMultimixAttributionLabel);}
	/** @private @arg {D_ReelMultimixAttributionLabel} x */
	D_ReelMultimixAttributionLabel(x) {
		const cf="D_ReelMultimixAttributionLabel";
		const {icon,title,command,a11yLabel,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.sm.T_Icon(cf,icon);
		this.sm.G_Text(title);
		if(!command.watchEndpoint) debugger;
		this.sm.E_Watch(command);
		this.sm.a_primitive_str(a11yLabel);
		this.sm.trackingParams(trackingParams);
	}
	/** @use_import D_ReelPlayerOverlay @public @arg {R_PivotButton} x */
	R_PivotButton(x) {this.H_("pivotButtonRenderer",x,this.D_PivotButton);}
	/** @private @arg {D_PivotButton} x */
	D_PivotButton(x) {
		const cf="D_PivotButton";
		const {thumbnail,onClickCommand,trackingParams,contentDescription,soundAttributionTitle,backgroundColor,icon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(thumbnail,this.sm.D_Thumbnail);
		this.t(onClickCommand,x => {
			if("addToToastAction" in x) return this.sm.A_AddToToast(x);
			if(this.sm.is_TE_VE(x,3611)) return this.sm.E_VE3611(x);
			x;
		});
		if(trackingParams) this.sm.trackingParams(trackingParams);
		this.t(contentDescription,this.sm.G_Text);
		this.t(soundAttributionTitle,this.sm.G_Text);
		this.t(backgroundColor,x => {
			switch(x) {
				default: debugger; break;
				case "THEME_ATTRIBUTE_OVERLAY_BACKGROUND_MEDIUM":
			}
		});
	}
	//#endregion
}
export_(exports => {exports.Support_Renderer=Support_Renderer;});
class ForService_XMethods extends BaseService {
	/** @private @arg {R_VoiceSearchDialog} x */
	R_VoiceSearchDialog(x) {this.H_("voiceSearchDialogRenderer",x,this.D_VoiceSearchDialog);}
	/** @private @arg {D_VoiceSearchDialog} x */
	D_VoiceSearchDialog(x) {
		const cf="D_VoiceSearchDialog";
		const {trackingParams,exitButton,...y}=this.s(cf,x);
		this.sm.trackingParams(trackingParams);
		this.xm.R_Button(exitButton);
		let u=Object.entries(y);
		for(let x of u) {
			let c=x[1];
			if("runs" in c) {
				this.sm.G_Text(c);
				continue;
			}
		}
	}
	/** @protected @arg {E_SignalService_SendPost} x */
	E_SignalService_SendPost(x) {const [a,b]=this.sm.T_SE_Signal("E_SignalService_SendPost",x); this.sm.M_SendPost(a); this.G_ClientSignal(b);}
	/** @public @arg {G_ClientSignal} x */
	G_ClientSignal(x) {
		const cf="G_ClientSignal";
		let {signal,actions,...y}=this.s(cf,x); this.g(y);
		this.save_string(`${cf}.signal`,signal);
		this.z(actions,this.G_ClientSignal_Item);
	}
	/** @arg {G_ClientSignal_Item} x */
	G_ClientSignal_Item(x) {
		const cf="G_ClientSignal_Item"; this.sm.k(cf,x);
		if("openPopupAction" in x) return this.S_Client_Popup(x);
		if("showEngagementPanelEndpoint" in x) return this.E_ShowEngagementPanel(x);
		if("sendFeedbackAction" in x) return this.A_SendFeedback(x);
		if("signalAction" in x) return this.A_Signal(x);
		if("addToPlaylistCommand" in x) return this.sm.C_AddToPlaylist(x);
		this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<Popup_ClientSignal>>} x */
	S_Client_Popup(x) {
		const cf="S_Client_Popup";
		const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.clickTrackingParams(clickTrackingParams);
		this.S_Client_OpenPopupAction(openPopupAction);
	}
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<any>>['openPopupAction']} x */
	S_Client_OpenPopupAction(x) {
		const cf="S_VoiceSearchPopup_Dialog";
		switch(x.popupType) {
			default: debugger; break;
			case "DIALOG": {
				const {popup,popupType,beReused,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.t(beReused,x => this.sm.cq(x,true));
				if(!popup.confirmDialogRenderer) {this.sm.codegen_typedef(cf,x); break;}
				this.sm.R_ConfirmDialog(popup);
			} break;
			case "TOAST": {
				const {popup,popupType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(!popup.notificationActionRenderer) {this.sm.codegen_typedef(cf,x); break;}
				this.sm.RA_Notification(popup);
			} break;
			case "TOP_ALIGNED_DIALOG": {
				const {popup,popupType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(!popup.voiceSearchDialogRenderer) {this.sm.codegen_typedef(cf,x); break;}
				this.R_VoiceSearchDialog(popup);
			} break;
		}
	}
	/** @private @arg {A_SendFeedback} x */
	A_SendFeedback(x) {let [a,b]=this.sm.TE_Endpoint_2("A_SendFeedback","sendFeedbackAction",x); this.g(b); this.AD_SendFeedback(a);}
	/** @private @arg {E_ShowEngagementPanel} x */
	E_ShowEngagementPanel(x) {let [a,b]=this.sm.TE_Endpoint_2("E_ShowEngagementPanel","showEngagementPanelEndpoint",x); this.g(b); this.DE_ShowEngagementPanel(a);}
	/** @private @arg {DE_ShowEngagementPanel} x */
	DE_ShowEngagementPanel(x) {
		const cf="D_ShowEngagementPanel";
		const {panelIdentifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {A_Signal} x */
	A_Signal(x) {let [a,y]=this.sm.TE_Endpoint_2("A_Signal","signalAction",x); this.g(y); this.AD_Signal(a);}
	/** @public @template {{}} T @arg {CF_TA_OpenPopup} cf @arg {TA_OpenPopup<T>} x */
	TA_OpenPopup(cf,x) {
		/** @type {TA_OpenPopup<unknown>} */
		let xp=x;
		const {clickTrackingParams,openPopupAction: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.clickTrackingParams(clickTrackingParams);
		/** @type {G_OpenPopup_All["openPopupAction"]|G_Popup_All|{}|null|undefined} */
		let ax=xp.openPopupAction;
		if(ax&&"popupType" in ax&&"popup" in ax) {
			switch(ax.popupType) {
				default: debugger; ax===""; break;
				case "DIALOG": {
					let x1=ax.popup;
					if("confirmDialogRenderer" in x1) {this.sm.R_ConfirmDialog(x1); break;}
					if("unifiedSharePanelRenderer" in x1) {this.sm.R_UnifiedSharePanel(x1); break;}
					if("fancyDismissibleDialogRenderer" in x1) {this.sm.R_FancyDismissibleDialog(x1); break;}
					debugger;
				} break;
				case "TOAST": {
					let x1=ax.popup;
					if("notificationActionRenderer" in x1) {this.sm.RA_Notification(x1); break;}
					debugger;
				} break;
				case "TOP_ALIGNED_DIALOG": {
					let x1=ax.popup;
					if("voiceSearchDialogRenderer" in x1) {this.R_VoiceSearchDialog(x1); break;}
					debugger;
				} break;
				case "DROPDOWN": {
					let x1=ax.popup;
					if("menuPopupRenderer" in x1) {this.sm.R_MenuPopup(x1); break;}
					let a_menu=x1.multiPageMenuRenderer;
					if(!a_menu) return a;
					switch(a_menu.style) {
						default: debugger; break;
						case "MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT": break;
						case "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS": break;
						case "MULTI_PAGE_MENU_STYLE_TYPE_SYSTEM": break;
					}
				} break;
			}
		}
		return a;
	}
	/** @public @arg {CF_GE_ResponseReceived} cf @arg {GE_ResponseReceived} x */
	GE_ResponseReceived(cf,x) {
		this.save_keys(`${cf}.response_endpoint`,x);
		if("signalServiceEndpoint" in x) return this.xm.E_SignalService_SendPost(x);
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.sm.C_AdsControlFlowOpportunityReceived(x);
		if("changeKeyedMarkersVisibilityCommand" in x) return this.sm.C_ChangeKeyedMarkersVisibility(x);
		if("loadMarkersCommand" in x) return this.sm.C_LoadMarkers(x);
		if("reloadContinuationItemsCommand" in x) return this.sm.C_ReloadContinuationItems(x);
		if("appendContinuationItemsAction" in x) return this.sm.A_AppendContinuationItems(x);
		debugger;
	}
	/** @private @arg {D_ToggleButton_ToggledSrvEP} x */
	D_ToggleButton_ToggledSrvEP(x) {
		const cf="D_ToggleButton_ToggledSrvEP"; this.sm.k(cf,x);
		if("performCommentActionEndpoint" in x) return this.xr.E_PerformCommentAction(x);
		if("likeEndpoint" in x) return this.sm.E_Like(x);
		if("signalServiceEndpoint" in x) return this.xm.E_SignalService_SendPost(x);
		if("commandExecutorCommand" in x) return this.sm.C_CommandExecutor(x);
		if("removeUpcomingEventReminderEndpoint" in x) return this.sm.E_RemoveUpcomingEventReminder(x);
		x===""; debugger;
	}
	/** @private @arg {D_ToggleButton_DefaultSrvEP} x */
	D_ToggleButton_DefaultSrvEP(x) {
		const cf="D_ToggleButton_DefaultSrvEP"; this.sm.k(cf,x);
		if("performCommentActionEndpoint" in x) return this.xr.E_PerformCommentAction(x);
		if("repeatChapterCommand" in x) return this.sm.C_RepeatChapter(x);
		if("commandExecutorCommand" in x) return this.sm.C_CommandExecutor(x);
		if("signalServiceEndpoint" in x) return this.xm.E_SignalService_SendPost(x);
		if("addUpcomingEventReminderEndpoint" in x) return this.sm.E_AddUpcomingEventReminder(x);
		x===""; debugger;
	}
	/** @public @arg {R_SubscribeButton} x */
	R_SubscribeButton(x) {this.H_("subscribeButtonRenderer",x,this.D_SubscribeButton);}
	/** @private @arg {D_SubscribeButton} x */
	D_SubscribeButton(x) {
		const cf="D_SubscribeButton";
		const {enabled,buttonText,subscribed,type,channelId,trackingParams,showPreferences,...y1}=this.s(cf,x);
		this.sm.a_primitive_bool(enabled);
		this.t(buttonText,this.sm.G_Text);
		this.t(subscribed,this.sm.a_primitive_bool);
		this.t(type,x => this.sm.cq(x,"FREE"));
		this.t(channelId,this.sm.channelId);
		if(trackingParams) this.sm.trackingParams(trackingParams);
		this.t(showPreferences,this.sm.a_primitive_bool);
		let [p1,o1]=this.sm.unwrap_prefix(y1,"subscribed");
		this.sm.D_SubscribeButton_SubscribedPrefix(p1);
		let [p2,o2]=this.sm.unwrap_prefix(o1,"unsubscribed");
		this.sm.D_SubscribeButton_UnsubscribedPrefix(p2);
		let [p3,o3]=this.sm.unwrap_prefix(o2,"subscribe");
		this.sm.D_SubscribeButton_SubscribePrefix(p3);
		let [p4,{...o4}]=this.sm.unwrap_prefix(o3,"unsubscribe");
		this.sm.D_SubscribeButton_UnsubscribePrefix(p4);
		const {onSubscribeEndpoints,onUnsubscribeEndpoints,targetId,notificationPreferenceButton,...y2}=o4;
		this.tz(onSubscribeEndpoints,this.xm.E_Subscribe);
		this.tz(onUnsubscribeEndpoints,this.xm.E_SignalService_SendPost);
		this.t(targetId,x => this.sm.cq(x,"watch-subscribe"));
		this.t(notificationPreferenceButton,this.sm.R_SubscriptionNotificationToggleButton);
		const {serviceEndpoints,...y}=y2; this.g(y);
		this.tz(serviceEndpoints,x => {
			if("subscribeEndpoint" in x) return this.xm.E_Subscribe(x);
			if("signalServiceEndpoint" in x) return this.xm.E_SignalService_SendPost(x);
			debugger;
		});
	}
	/** @private @arg {D_Button_SE} x */
	D_Button_SE(x) {
		const cf="D_Button_SE";
		if("signalServiceEndpoint" in x) return this.xm.E_SignalService_SendPost(x);
		if("ypcGetOffersEndpoint" in x) return this.xm.E_YpcGetOffers(x);
		if("shareEntityServiceEndpoint" in x) return this.sm.E_ShareEntityService(x);
		if("unsubscribeEndpoint" in x) return this.xm.E_Unsubscribe(x);
		if("createCommentEndpoint" in x) return this.xm.E_CreateComment(x);
		if("getPdgBuyFlowCommand" in x) return this.sm.C_GetPdgBuyFlow(x);
		if("createCommentReplyEndpoint" in x) return this.xr.E_CreateCommentReply(x);
		x===""; this.sm.GEN(cf,x);
	}
	/**
	 * @private @template {D_ThumbnailOverlayToggleButton} T @arg {"D_ThumbnailOverlayToggleButton"} cf @arg {T} x
	 * @returns {[p1,p2,o2]}
	 * */
	D_ThumbnailOverlayToggleButton_Omit(cf,x) {
		this.sm.k(cf,x);
		let [p1,{...o1}]=this.sm.unwrap_prefix(x,"toggled");
		let [p2,{trackingParams,...o2}]=this.sm.unwrap_prefix(o1,"untoggled");
		this.sm.trackingParams(trackingParams);
		return [p1,p2,o2];
	}
	/** @private @arg {R_ThumbnailOverlayToggleButton} x */
	R_ThumbnailOverlayToggleButton(x) {this.H_("thumbnailOverlayToggleButtonRenderer",x,this.D_ThumbnailOverlayToggleButton);}
	/** @private @arg {D_ThumbnailOverlayToggleButton} x */
	D_ThumbnailOverlayToggleButton(x) {
		const cf="D_ThumbnailOverlayToggleButton";
		if("toggledServiceEndpoint" in x) {
			const [o1,o2,{isToggled,...y}]=this.D_ThumbnailOverlayToggleButton_Omit(cf,x); this.g(y);
			this.sm.cq(isToggled,false);
			this.D_ThumbnailOverlayToggleButton_ToggledPrefix_1(o1);
			this.D_ThumbnailOverlayToggleButton_UntoggledPrefix_1(o2);
			return;
		}
		const [o1,o2,y]=this.D_ThumbnailOverlayToggleButton_Omit(cf,x); this.g(y);
		this.D_ThumbnailOverlayToggleButton_ToggledPrefix_2(o1);
		this.D_ThumbnailOverlayToggleButton_UntoggledPrefix_2(o2);
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1,"untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_1";
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Watch Later") debugger;
		this.sm.E_PlaylistEdit(serviceEndpoint);
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2,"toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix";
		const {accessibility,icon,tooltip,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Added") debugger;
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1,"toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix";
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Added") debugger;
		this.sm.E_PlaylistEdit(serviceEndpoint);
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2,"untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_2";
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Add to queue") debugger;
		this.xm.E_SignalService_SendPost(serviceEndpoint);
	}
	/** @private @arg {AD_Signal} x */
	AD_Signal(x) {
		const cf="AD_Signal";
		const {signal,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(signal) {
			default: debugger; break;
			case "ENABLE_CHROME_NOTIFICATIONS": case "HELP": case "HISTORY_BACK": case "HISTORY_FORWARD": case "SKIP_NAVIGATION": case "TOGGLE_TRANSCRIPT_TIMESTAMPS":
		}
	}
	/** @private @arg {AD_SendFeedback} x */
	AD_SendFeedback(x) {const cf="AD_SendFeedback",{bucket,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/ if(bucket!=="Kevlar") debugger;}
	/** @public @arg {R_Button} x */
	R_Button(x) {this.H_("buttonRenderer",x,this.D_Button);}
	/** @private @arg {D_Button_targetId} x */
	D_Button_targetId(x) {
		let cf="D_Button_targetId";
		switch(x) {
			default: debugger; x===""; break;
			case "watch-supervod-button":
			case "clip-info-button":
			case "create-clip-button-action-bar":
			case "sponsorships-button":
		}
		this.sm.targetId(cf,x);
	}
	/** @private @arg {D_Button_NavEP} x */
	D_Button_NavEP(x) {
		const cf="D_Button_NavEP";
		if("shareEntityServiceEndpoint" in x) return this.sm.E_ShareEntityService(x);
		if("browseEndpoint" in x) {
			if(this.sm.is_TE_VE(x,23462)) return this.sm.E_VE23462(x);
		}
		if("watchEndpoint" in x) return this.sm.E_Watch(x);
		if("urlEndpoint" in x) return this.xm.E_Url(x);
		if("openPopupAction" in x) return this.xr.A_FancyDismissibleDialog(x);
		x.createCommentReplyDialogEndpoint;
		if("createCommentReplyDialogEndpoint" in x) return this.xr.E_CreateCommentReplyDialog(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {D_Button} x */
	D_Button(x) {
		const cf="D_Button";
		const {style,size,isDisabled,serviceEndpoint,text,icon,navigationEndpoint,accessibility,tooltip,trackingParams,hint,iconPosition,accessibilityData,targetId,command,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(hint,this.sm.R_Hint);
		this.t(iconPosition,x => this.save_enum(cf,"BUTTON_ICON_POSITION_TYPE",x));
		this.t(targetId,this.D_Button_targetId);
		this.t(serviceEndpoint,this.D_Button_SE);
		this.t(style,x => this.save_string(`${cf}.style`,x));
		this.t(isDisabled,this.sm.a_primitive_bool);
		this.t(text,this.sm.G_Text);
		this.t(icon,x => this.T_Icon(`${cf}.icon`,x));
		this.t(navigationEndpoint,this.D_Button_NavEP);
		this.t(accessibility,this.sm.D_Label);
		this.t(tooltip,x => this.sm.a_primitive_str(x));
		this.t(trackingParams,x => this.sm.trackingParams(x));
		this.t(accessibilityData,this.sm.D_Accessibility);
		this.t(command,this.GC_Button);
	}
	/** @public @arg {G_ThumbnailOverlayItem} x */
	G_ThumbnailOverlayItem(x) {
		const cf="G_ThumbnailOverlayItem";
		if("thumbnailOverlayBottomPanelRenderer" in x) return this.R_ThumbnailOverlayBottomPanel(x);
		if("thumbnailOverlayEndorsementRenderer" in x) return this.R_ThumbnailOverlayEndorsement(x);
		if("thumbnailOverlayHoverTextRenderer" in x) return this.R_ThumbnailOverlayHoverText(x);
		if("thumbnailOverlayInlineUnplayableRenderer" in x) return this.R_ThumbnailOverlayInlineUnplayable(x);
		if("thumbnailOverlayLoadingPreviewRenderer" in x) return this.R_ThumbnailOverlayLoadingPreview(x);
		if("thumbnailOverlayNowPlayingRenderer" in x) return this.R_ThumbnailOverlayNowPlaying(x);
		if("thumbnailOverlayResumePlaybackRenderer" in x) return this.R_ThumbnailOverlayResumePlayback(x);
		if("thumbnailOverlaySidePanelRenderer" in x) return this.R_ThumbnailOverlaySidePanel(x);
		if("thumbnailOverlayTimeStatusRenderer" in x) return this.R_ThumbnailOverlayTimeStatus(x);
		if("thumbnailOverlayToggleButtonRenderer" in x) return this.R_ThumbnailOverlayToggleButton(x);
		this.sm.codegen_typedef(`ThumbnailOverlay$${cf}`,x);
	}
	/** @protected @arg {R_HeroPlaylistThumbnail} x */
	R_HeroPlaylistThumbnail(x) {this.H_("heroPlaylistThumbnailRenderer",x,this.D_HeroPlaylistThumbnail);}
	/** @private @arg {D_HeroPlaylistThumbnail} x */
	D_HeroPlaylistThumbnail(x) {
		const cf="D_HeroPlaylistThumbnail";
		const {thumbnail,maxRatio,trackingParams,onTap,thumbnailOverlays,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.D_Thumbnail(thumbnail);
		if(this.sm.num_to_string(maxRatio)!=="0.5625") debugger;
		this.sm.trackingParams(trackingParams);
		this.sm.E_Watch(onTap);
		this.G_ThumbnailOverlayItem(thumbnailOverlays);
	}
	/** @public @arg {R_EndScreenVideo} x */
	R_EndScreenVideo(x) {this.H_("endScreenVideoRenderer",x,this.D_EndScreenVideo);}
	/** @private @arg {D_EndScreenVideo} x */
	D_EndScreenVideo(x) {
		const cf="D_EndScreenVideo";
		const {videoId,shortViewCountText,shortBylineText,thumbnail,thumbnailOverlays,title,trackingParams,lengthInSeconds,lengthText,publishedTimeText,navigationEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.a_primitive_str(videoId);
		this.sm.G_Text(shortViewCountText);
		this.sm.G_Text(shortBylineText);
		this.sm.D_Thumbnail(thumbnail);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		this.sm.G_Text(title);
		this.sm.trackingParams(trackingParams);
		this.t(lengthInSeconds,this.sm.a_primitive_num);
		this.t(lengthText,this.sm.G_Text);
		this.sm.G_Text(publishedTimeText);
		x: {
			let x=navigationEndpoint;
			if("watchEndpoint" in x) {this.sm.E_Watch(x); break x;}
			if(!x.reelWatchEndpoint) debugger;
		}
	}
	/** @public @arg {CF_D_Menu_Omit} cf @template {{thumbnailOverlays:G_ThumbnailOverlayItem[]}} T @arg {T} x */
	D_Omit_ThumbnailOverlay(cf,x) {
		const {thumbnailOverlays,...y}=this.s(cf,x);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		return y;
	}
	/** @public @arg {R_PlaylistPanelVideo} x */
	R_PlaylistPanelVideo(x) {this.H_("playlistPanelVideoRenderer",x,this.D_PlaylistPanelVideo);}
	/** @private @arg {D_PlaylistPanelVideo} x */
	D_PlaylistPanelVideo(x) {
		const cf="D_PlaylistPanelVideo";
		const {thumbnail,thumbnailOverlays,title,trackingParams,videoId,playlistSetVideoId,darkColorPalette,lightColorPalette,longBylineText,shortBylineText,selected,lengthText,menu,navigationEndpoint,...y}=this.s(cf,x);/*#destructure_off*/
		this.sm.D_Thumbnail(thumbnail);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		this.sm.G_Text(title);
		this.sm.trackingParams(trackingParams);
		this.sm.videoId(videoId);
		this.sm.a_primitive_str(playlistSetVideoId);
		this.D_DarkColorPalette(cf,darkColorPalette);
		this.D_LightColorPalette(cf,lightColorPalette);
		this.sm.G_Text(longBylineText);
		this.sm.G_Text(shortBylineText);
		this.a_primitive_bool(selected);
		this.sm.G_Text(lengthText);
		this.sm.R_Menu(menu);
		this.sm.E_Watch(navigationEndpoint);
		if("indexText" in y) return this.y(this,cf,"indexText",y,this.sm.G_Text);
		let kl=this.get_keys_of(y).length;
		if(kl>0) {
			this.sm.codegen_typedef(`${cf}:omit`,y);
		}
		this.g(y);
	}
	/** @public @arg {R_ToggleButton} x */
	R_ToggleButton(x) {this.H_("toggleButtonRenderer",x,this.D_ToggleButton);}
	/** @private @arg {D_ToggleButton} x */
	D_ToggleButton(x) {
		const cf="D_ToggleButton";
		const {style,isToggled,isDisabled,defaultIcon,defaultText,defaultServiceEndpoint,toggledText,toggledServiceEndpoint,...u}=this.s(cf,x);
		this.t(style,x => this.save_string(`${cf}.style`,x.styleType));
		this.t(isToggled,this.a_primitive_bool);
		this.t(isDisabled,x => this.cq(x,false));
		this.t(defaultIcon,x => this.save_string(`${cf}.defaultIcon.type`,x.iconType));
		this.t(defaultText,this.sm.G_Text);
		this.t(defaultServiceEndpoint,this.D_ToggleButton_DefaultSrvEP);
		this.t(toggledText,this.sm.G_Text);
		this.t(toggledServiceEndpoint,this.D_ToggleButton_ToggledSrvEP);
		const {accessibility,trackingParams,defaultTooltip,toggledTooltip,toggledStyle,accessibilityData,toggleButtonSupportedData,targetId,...u2}=u;/*#destructure_done*/
		this.t(accessibility,this.sm.D_Label);
		this.sm.trackingParams(trackingParams);
		this.t(toggledStyle,x => this.save_string(`${cf}.toggledStyle.type`,x.styleType));
		this.t(defaultTooltip,x => this.add_string_to_map(cf,"defaultTooltip",x));
		this.t(toggledTooltip,x => this.add_string_to_map(cf,"toggledTooltip",x));
		this.t(accessibilityData,this.sm.D_Accessibility);
		this.t(targetId,x => {
			switch(x) {
				default: debugger; break;
				case "watch-dislike": case "watch-like":
			}
		});
		const {size,toggledAccessibilityData,...y}=u2; this.g(y);
		this.t(size,x => this.cq(x.sizeType,"SIZE_DEFAULT"));
		this.t(toggledAccessibilityData,this.sm.D_Accessibility);
	}
	/** @private @arg {CF_add_string_to_map} cf @arg {"defaultTooltip"|"toggledTooltip"|"accessibilityData.accessibilityData.label"} k_arg @arg {string} x */
	add_string_to_map(cf,k_arg,x) {
		/** @type {`${typeof cf}::${typeof k_arg}`} */
		let k=`${cf}::${k_arg}`;
		let group_arr=this.strings_map.get(cf);
		if(!group_arr) this.strings_map.set(cf,group_arr=[]);
		let group_entry=group_arr.find(e => e[0]===k);
		x: {
			if(!group_entry) break x;
			if(group_entry[1].includes(x)) return;
			group_entry[1].push(x);
		}
		group_arr.push([k,[x]]);
	}
	/** @private @arg {E_Unsubscribe} x */
	E_Unsubscribe(x) {const [a,b,y]=this.sm.TE_Endpoint_3("E_Unsubscribe","unsubscribeEndpoint",x); this.g(y); this.DE_Unsubscribe(b); this.M_Unsubscribe(a);}
	/** @private @arg {DE_Unsubscribe} x */
	DE_Unsubscribe(x) {
		const cf="DE_Unsubscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(channelIds,this.sm.channelId);
		this.params("unsubscribe.params",params);
	}
	/** @private @arg {E_CreateComment} x */
	E_CreateComment(x) {const [a,b,y]=this.sm.TE_Endpoint_3("E_CreateComment","createCommentEndpoint",x); this.g(y); this.DE_CreateComment(b); this.M_CreateComment(a);}
	/** @private @arg {E_Subscribe} x */
	E_Subscribe(x) {const [a,b,y]=this.sm.TE_Endpoint_3("E_Subscribe","subscribeEndpoint",x); this.g(y); this.M_Subscribe(a); this.DE_Subscribe(b);}
	/** @private @arg {DE_Subscribe} x */
	DE_Subscribe(x) {
		const cf="DE_Subscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(channelIds,this.sm.channelId);
		this.params("subscribe.params",params);
	}
	/** @private @arg {M_Subscribe} x */
	M_Subscribe(x) {this.T_WCM("M_Subscribe",x,this.GM_Subscribe);}
	/** @private @arg {R_ThumbnailOverlayBottomPanel} x */
	R_ThumbnailOverlayBottomPanel(x) {this.H_("thumbnailOverlayBottomPanelRenderer",x,this.D_ThumbnailOverlayBottomPanel);}
	/** @private @arg {R_ThumbnailOverlayEndorsement} x */
	R_ThumbnailOverlayEndorsement(x) {this.H_("thumbnailOverlayEndorsementRenderer",x,this.D_ThumbnailOverlayEndorsement);}
	/** @private @arg {R_ThumbnailOverlayHoverText} x */
	R_ThumbnailOverlayHoverText(x) {this.H_("thumbnailOverlayHoverTextRenderer",x,this.D_ThumbnailOverlayHoverText);}
	/** @private @arg {R_ThumbnailOverlayInlineUnplayable} x */
	R_ThumbnailOverlayInlineUnplayable(x) {this.H_("thumbnailOverlayInlineUnplayableRenderer",x,this.D_ThumbnailOverlayInlineUnplayable);}
	/** @private @arg {R_ThumbnailOverlayLoadingPreview} x */
	R_ThumbnailOverlayLoadingPreview(x) {this.H_("thumbnailOverlayLoadingPreviewRenderer",x,this.D_ThumbnailOverlayLoadingPreview);}
	/** @private @arg {R_ThumbnailOverlayNowPlaying} x */
	R_ThumbnailOverlayNowPlaying(x) {this.H_("thumbnailOverlayNowPlayingRenderer",x,this.D_ThumbnailOverlayNowPlaying);}
	/** @private @arg {D_ThumbnailOverlayNowPlaying} x */
	D_ThumbnailOverlayNowPlaying(x) {const cf="D_ThumbnailOverlayNowPlaying"; this.y(this,cf,"text",x,this.sm.G_Text);}
	/** @private @arg {R_ThumbnailOverlayResumePlayback} x */
	R_ThumbnailOverlayResumePlayback(x) {this.H_("thumbnailOverlayResumePlaybackRenderer",x,this.D_ThumbnailOverlayResumePlayback);}
	/** @private @arg {R_ThumbnailOverlaySidePanel} x */
	R_ThumbnailOverlaySidePanel(x) {this.H_("thumbnailOverlaySidePanelRenderer",x,this.D_ThumbnailOverlaySidePanel);}
	/** @private @arg {R_ThumbnailOverlayTimeStatus} x */
	R_ThumbnailOverlayTimeStatus(x) {this.H_("thumbnailOverlayTimeStatusRenderer",x,this.D_ThumbnailOverlayTimeStatus);}
	/** @private @arg {D_ThumbnailOverlayResumePlayback} x */
	D_ThumbnailOverlayResumePlayback(x) {this.y(this,"D_ThumbnailOverlayResumePlayback","percentDurationWatched",x,x => this.save_number("resume_playback.percentDurationWatched",x));}
	/** @private @arg {D_ThumbnailOverlayTimeStatus} x */
	D_ThumbnailOverlayTimeStatus(x) {
		const cf="D_ThumbnailOverlayTimeStatus";
		const {style,text,...y}=this.s(cf,x);
		switch(style) {
			default: debugger; break;
			case "DEFAULT":
			case "LIVE":
			case "SHORTS":
			case "UPCOMING":
		}
		if("icon" in y) {
			const {icon,...u}=this.s(cf,y); this.g(u);/*#destructure_done*/
			switch(icon.iconType) {
				default: debugger; break;
				case "LIVE":
				case "YOUTUBE_SHORTS_FILL_NO_TRIANGLE_RED_16":
			}
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_ThumbnailOverlaySidePanel} x */
	D_ThumbnailOverlaySidePanel(x) {
		const cf="D_ThumbnailOverlaySidePanel";
		const {text,icon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(text);
		let store=this.icon_types_map.get(cf);
		if(!store) return;
		const {known,unknown}=store;
		let missing=this.sm.T_Icon_AnyOf("D_Icon_ThumbnailOverlaySidePanel",icon,known);
		if(missing) this.sm.onMissingIcon(cf,icon,x,known,unknown);
	}
	/** @private @arg {D_ThumbnailOverlayBottomPanel} x */
	D_ThumbnailOverlayBottomPanel(x) {this.y(this,"D_ThumbnailOverlayBottomPanel","icon",x,this.D_MixIcon);}
	/** @private @arg {D_ThumbnailOverlayEndorsement} x */
	D_ThumbnailOverlayEndorsement(x) {
		const cf="D_ThumbnailOverlayEndorsement";
		const {text,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(text);
		this.sm.trackingParams(trackingParams);
	}
	/** @private @arg {D_ThumbnailOverlayInlineUnplayable} x */
	D_ThumbnailOverlayInlineUnplayable(x) {
		const cf="D_ThumbnailOverlayInlineUnplayable";
		const {text,icon,...y}=this.s(cf,x); this.g(y);
		this.sm.G_Text(text);
		this.ceq(icon.iconType,"PLAY_DISABLED");
	}
	/** @private @arg {D_ThumbnailOverlayHoverText} x */
	D_ThumbnailOverlayHoverText(x) {
		const cf="D_ThumbnailOverlayHoverText";
		const {text,icon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(text);
		if(icon.iconType!=="PLAY_ALL") debugger;
	}
	/** @private @arg {DE_CreateComment} x */
	DE_CreateComment(x) {this.TD_Params("DE_CreateComment","create_comment.params","createCommentParams",x);}
	/** @private @arg {E_YpcGetOffers} x */
	E_YpcGetOffers(x) {const cf="E_YpcGetOffers",[a,b,y]=this.sm.TE_Endpoint_3(cf,"ypcGetOffersEndpoint",x); this.g(y); this.M_YpcGetOffers(a); this.DE_YpcGetOffers(b);}
	/** @private @arg {DE_YpcGetOffers} x */
	DE_YpcGetOffers(x) {this.D_Params("DE_YpcGetOffers","ypc_get_offers.params",x);}
	/** @private @arg {T_Icon<"MIX">} x */
	D_MixIcon(x) {this.T_Icon("D_MixIcon",x);}
	/** @private @arg {M_YpcGetOffers} x */
	M_YpcGetOffers(x) {this.T_WCM("M_YpcGetOffers",x,this.GM_YpcGetOffers);}
	/** @private @arg {M_CreateComment} x */
	M_CreateComment(x) {this.T_WCM("M_CreateComment",x,this.GM_CreateComment);}
	/** @private @arg {M_Unsubscribe} x */
	M_Unsubscribe(x) {this.T_WCM("M_Unsubscribe",x,this.GM_Unsubscribe);}
	/** @private @arg {GM_YpcGetOffers} x */
	GM_YpcGetOffers(x) {this.T_GM("GM_YpcGetOffers",x,x => this.ceq(x,"/youtubei/v1/ypc/get_offers"));}
	/** @private @arg {GM_CreateComment} x */
	GM_CreateComment(x) {this.T_GM("GM_CreateComment",x,x => this.ceq(x,"/youtubei/v1/comment/create_comment"));}
	/** @private @arg {GM_Subscribe} x */
	GM_Subscribe(x) {this.T_GM("GM_Subscribe",x,x => this.ceq(x,"/youtubei/v1/subscription/subscribe"));}
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H_("feedTabbedHeaderRenderer",x,this.D_FeedTabbedHeader);}
	/** @private @arg {D_FeedTabbedHeader} x */
	D_FeedTabbedHeader(x) {
		const cf="D_FeedTabbedHeader";
		const {title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.G_Text(title);
	}
	/** @public @arg {G_BrowseHeader} x */
	G_BrowseHeader(x) {
		const cf="G_BrowseHeader";
		if("feedTabbedHeaderRenderer" in x) return this.R_FeedTabbedHeader(x);
		if("c4TabbedHeaderRenderer" in x) return this.xr.R_C4TabbedHeader(x);
		if("playlistHeaderRenderer" in x) return this.xr.R_PlaylistHeader(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {this.H_("musicThumbnailRenderer",x,this.D_MusicThumbnail);}
	/** @private @arg {D_MusicThumbnail} x */
	D_MusicThumbnail(x) {
		const cf="D_MusicThumbnail";
		const {trackingParams: a,thumbnail,thumbnailCrop,thumbnailScale,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.trackingParams(a);
		this.sm.D_Thumbnail(thumbnail);
		if(thumbnailCrop!=="MUSIC_THUMBNAIL_CROP_UNSPECIFIED") debugger;
		if(thumbnailScale!=="MUSIC_THUMBNAIL_SCALE_UNSPECIFIED") debugger;
	}
	/** @public @arg {G_Browse_MD} x */
	G_Browse_MD(x) {
		const cf="G_Browse_MD";
		if("channelMetadataRenderer" in x) return this.xr.R_Channel_MD(x);
		if("playlistMetadataRenderer" in x) return this.xr.R_Playlist_MD(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_BrowseSidebar} x */
	G_BrowseSidebar(x) {
		const cf="G_BrowseSidebar";
		if("settingsSidebarRenderer" in x) return this.xr.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.xr.R_PlaylistSidebar(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {let [a,y]=this.sm.TE_Endpoint_2("C_ResetChannelUnreadCount","resetChannelUnreadCountCommand",x); this.g(y); this.DC_ResetChannelUnreadCount(a);}
	/** @private @arg {DC_ResetChannelUnreadCount} x */
	DC_ResetChannelUnreadCount(x) {
		const cf="DC_ResetChannelUnreadCount";
		const {channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.channelId(channelId);
	}
	/** @public @arg {GA_ResponseReceived} x */
	GA_ResponseReceived(x) {
		const cf="GA_ResponseReceived";
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.sm.C_AdsControlFlowOpportunityReceived(x);
		if("appendContinuationItemsAction" in x) return this.sm.A_AppendContinuationItems(x);
		if("reloadContinuationItemsCommand" in x) return this.sm.C_ReloadContinuationItems(x);
		if("resetChannelUnreadCountCommand" in x) return this.sm.C_ResetChannelUnreadCount(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @public @arg {G_BrowseContents} x */
	G_BrowseContents(x) {
		const cf="G_BrowseContents";
		if("twoColumnBrowseResultsRenderer" in x) return this.xm.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.sm.R_FeedFilterChipBar(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {G_DC_SectionList_BrowseFeed_ChannelFeatured} x */
	DC_SectionList_BrowseFeed_ChannelFeatured(x) {
		let b_info=this.sm.is_browse_feedUC(x);
		if(!b_info[0]) {
			debugger;
			return;
		}
		let [,bp]=b_info;
		if(bp[0]===2) {
			let [,sa,,last_part]=bp;
			console.log("target_id.last_part",last_part);
			if(this.sm.str_starts_with_rx(sa,"UC")) {
				let floc=sa.indexOf("featured");
				if(floc<0) {debugger; return;}
				let s1=sa.slice(0,floc);
				let s2=sa.slice(floc);
				console.log("[RichGrid.targetId]",x.targetId);
				console.log("[target_id_parse]",s1,s2);
			}
			return;
		}
		let [,,channelId,last_part]=bp;
		switch(last_part) {
			default: debugger; break;
			case "featured": case "search":
		}
		this.sm.channelId(channelId);
	}
	/** @private @arg {DC_SectionList_BrowseFeed_History} x */
	D_SectionList_BrowseFeed_History(x) {
		const cf="D_SectionList_BrowseFeed_History";
		const {contents,trackingParams,header,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,x => {
			if("itemSectionRenderer" in x) return this.TR_SectionListItem_3_Empty(x);
			if("continuationItemRenderer" in x) return this.sm.R_ContinuationItem(x);
			if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
			if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		});
		this.R_TextHeader(header);
		this.trackingParams(trackingParams);
		if(targetId!=="browse-feedFEhistory") debugger;
	}
	/** @private @arg {DC_SectionList_BrowseFeed_Subscriptions} x */
	D_SectionList_BrowseFeed_Subscriptions(x) {
		const cf="D_SectionList_BrowseFeed_Subscriptions";
		const {contents,trackingParams,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,x => {
			if("itemSectionRenderer" in x) return this.TR_SectionListItem_3_Empty(x);
			if("continuationItemRenderer" in x) return this.sm.R_ContinuationItem(x);
			if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
			if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		});
		this.trackingParams(trackingParams);
		if(targetId!=="browse-feedFEsubscriptions") debugger;
	}
	/** @private @arg {DC_SectionList_SearchFeed} x */
	DC_SectionList_SearchFeed(x) {
		const cf="DC_SectionList_SearchFeed";
		const {trackingParams,targetId,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		if(targetId!=="search-feed") debugger;
		this.z(contents,this.TR_SectionListItem_3_Empty);
	}
	/** @public @arg {RC_SectionList} x */
	RC_SectionList(x) {this.H_("sectionListContinuation",x,this.GD_RC_SectionList);}
	/** @public @arg {GD_RC_SectionList} x */
	GD_RC_SectionList(x) {
		const cf="GD_RC_SectionList";
		if("targetId" in x) {
			switch(x.targetId) {
				default: return this.DC_SectionList_BrowseFeed_ChannelFeatured(x);
				case "browse-feedFEhistory": return this.D_SectionList_BrowseFeed_History(x);
				case "browse-feedFEsubscriptions": return this.D_SectionList_BrowseFeed_Subscriptions(x);
				case "search-feed": return this.DC_SectionList_SearchFeed(x);
			}
		}
		if("contents" in x) {
			return;
		}
		if("disablePullToRefresh" in x) {
			const {trackingParams,disablePullToRefresh,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.trackingParams(trackingParams);
			if(disablePullToRefresh!==true) debugger;
			return;
		}
		debugger;
	}
	/** @public @arg {R_SectionList} x */
	R_SectionList(x) {this.H_("sectionListRenderer",x,this.GD_RC_SectionList);}
	/** @private @arg {R_ExpandableTab} x */
	R_ExpandableTab(x) {this.H_("expandableTabRenderer",x,this.D_ExpandableTab);}
	/** @private @arg {D_ExpandableTab} x */
	D_ExpandableTab(x) {
		const cf="D_ExpandableTab";
		if(x.selected) {
			const {endpoint,title,selected,expandedText,content,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.sm.E_VE3611(endpoint);
			this.a_primitive_str(title);
			this.a_primitive_bool(selected);
			this.t(expandedText,this.a_primitive_str);
			return this.t(content,this.R_SectionList);
		}
		const {endpoint,title,selected,...y}=this.s(cf,x);/*#destructure_later*/
		this.sm.E_VE3611(endpoint);
		this.a_primitive_str(title);
		this.a_primitive_bool(selected);
		if("expandedText" in y) {
			const {expandedText,...y1}=y; this.g(y1);
			return this.t(expandedText,this.a_primitive_str);
		}
		this.g(y);
	}
	/** @private @arg {SI_VE139722_EngagementPanel} x */
	SI_VE139722_EngagementPanel(x) {
		const cf="SI_VE139722_EngagementPanel";
		const {content,header,veType: {},targetId,visibility,loggingDirectives,continuationService,identifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_SectionList(content);
		this.t(header,this.R_EngagementPanelTitleHeader);
		if(targetId!=="engagement-panel-comments-section") debugger;
		this.sm.targetId(cf,targetId);
		if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
		this.D_LoggingDirectives(loggingDirectives);
		if(continuationService!=="ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE") debugger;
		if(!identifier) debugger;
		let a1=this.GT_ShortsSurfaceIdentifier(identifier);
		if(a1!=="shorts-comments-panel") debugger;
	}
	/** @private @arg {SI_VE76278_EngagementPanel} x */
	SI_VE76278_EngagementPanel(x) {
		const cf="SI_VE76278_EngagementPanel";
		const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=this.s(cf,x);
		if(panelIdentifier!=="comment-item-section") debugger;
		this.R_EngagementPanelTitleHeader(header);
		this.R_SectionList(content);
		if(targetId!=="engagement-panel-comments-section") debugger;
		this.sm.targetId(cf,targetId);
		if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
		this.D_LoggingDirectives(loggingDirectives);
		if("identifier" in y) {
			this.force_parse_identifier("SI_VE76278_Identifier",y);
			return;
		}
		this.g(y);
	}
	/** @public @arg {R_EngagementPanelSectionList} x */
	R_EngagementPanelSectionList(x) {this.H_("engagementPanelSectionListRenderer",x,this.D_EngagementPanelSectionList);}
	/** @private @arg {D_EngagementPanelSectionList} x */
	D_EngagementPanelSectionList(x) {
		const cf="D_EngagementPanelSectionList"; this.ks(cf,x);
		if("veType" in x) {
			switch(x.veType) {
				default: debugger; break;
				case 76278: return this.SI_VE76278_EngagementPanel(x);
				case 99999: return this.SI_VE99999_EngagementPanel(x);
				case 126250: return this.SI_VE126250_EngagementPanel(x);
				case 124975: return this.SI_VE124975_EngagementPanel(x);
				case 139722: return this.SI_VE139722_EngagementPanel(x);
			}
			return;
		}
		if("targetId" in x) return this.G_SI_DB_EngagementPanel(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {G_SI_DB_EngagementPanel} x */
	G_SI_DB_EngagementPanel(x) {
		const cf="DB_SI_EngagementPanel";
		switch(x.targetId) {
			default: x===""; debugger; break;
			case "engagement-panel-ads": return this.sm.SI_DB_EngagementPanel_Ads(x);
			case "engagement-panel-clip-create":/*GE*/{
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,onShowCommands,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(panelIdentifier!=="engagement-panel-clip-create") debugger;
				this.sm.R_EngagementPanelTitleHeader(header);
				this.sm.R_ClipSection(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.sm.D_LoggingDirectives(loggingDirectives);
				this.z(onShowCommands,this.G_EngagementPanelSectionShowCommands);
			} break;
			case "engagement-panel-macro-markers-description-chapters":/*GE*/{
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(panelIdentifier!=="engagement-panel-macro-markers-description-chapters") debugger;
				this.sm.R_EngagementPanelTitleHeader(header);
				this.xr.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.sm.D_LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-macro-markers-auto-chapters":/*GE*/{
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(panelIdentifier!=="engagement-panel-macro-markers-auto-chapters") debugger;
				this.sm.R_EngagementPanelTitleHeader(header);
				this.xr.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.sm.D_LoggingDirectives(loggingDirectives);
			} break;
		}
	}
	/** @private @arg {SI_VE99999_EngagementPanel} x */
	SI_VE99999_EngagementPanel(x) {
		const cf="SI_VE99999_EngagementPanel";
		const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(panelIdentifier!=="shopping_panel_for_entry_point_5") debugger;
		this.R_EngagementPanelTitleHeader(header);
		this.R_ProductList(content);
		if(targetId!=="shopping_panel_for_entry_point_5") debugger;
		this.sm.targetId(cf,targetId);
		if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {SI_VE126250_EngagementPanel} x */
	SI_VE126250_EngagementPanel(x) {
		const cf="SI_VE126250_EngagementPanel";
		const {panelIdentifier,header,content,veType: {},targetId,visibility,onShowCommands,loggingDirectives,...y}=this.s(cf,x);
		if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
		this.R_EngagementPanelTitleHeader(header);
		this.sm.R_ContinuationItem(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
		this.sm.targetId(cf,targetId);
		if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
		this.D_LoggingDirectives(loggingDirectives);
		if("identifier" in y) {
			this.force_parse_identifier("SI_VE126250_Identifier",y);
			return;
		}
		this.g(y);
	}
	/** @private @arg {SI_VE124975_EngagementPanel} x */
	SI_VE124975_EngagementPanel(x) {
		const cf="SI_VE124975_EngagementPanel";
		const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,identifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(panelIdentifier&&panelIdentifier!=="engagement-panel-structured-description") debugger;
		this.sm.R_EngagementPanelTitleHeader(header);
		this.xr.R_StructuredDescriptionContent(content);
		if(targetId!=="engagement-panel-structured-description") debugger;
		this.sm.targetId(cf,targetId);
		if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
		this.sm.D_LoggingDirectives(loggingDirectives);
		if(identifier) {
			let a1=this.sm.GT_ShortsSurfaceIdentifier(identifier);
			if(a1!=="engagement-panel-structured-description") debugger;
		}
	}
	/** @public @arg {R_TwoColumnBrowseResults} x */
	R_TwoColumnBrowseResults(x) {this.H_("twoColumnBrowseResultsRenderer",x,this.D_TwoColumnBrowseResults);}
	/** @private @arg {D_TwoColumnBrowseResults} x */
	D_TwoColumnBrowseResults(x) {
		const cf="D_TwoColumnBrowseResults";
		const {tabs,secondaryContents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,this.RG_Result);
		this.t(secondaryContents,this.G_SecondaryContents);
	}
	/** @private @arg {RG_Result} x */
	RG_Result(x) {
		const cf="RG_Result";
		if("tabRenderer" in x) return this.x.get("x_EventInput").R_Tab(x);
		if("expandableTabRenderer" in x) return this.R_ExpandableTab(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_EngagementPanelSectionShowCommands} x */
	G_EngagementPanelSectionShowCommands(x) {
		const cf="G_EngagementPanelSectionShowCommands";
		if("changeEngagementPanelVisibilityAction" in x) return this.sm.A_ChangeEngagementPanelVisibility(x);
		if("showEngagementPanelScrimAction" in x) return this.sm.A_ShowEngagementPanelScrim(x);
		if("scrollToEngagementPanelCommand" in x) return this.sm.C_ScrollToEngagementPanel(x);
		x===""; this.sm.codegen_typedef(cf,x);
	}
	/** @private @arg {G_SecondaryContents} x */
	G_SecondaryContents(x) {
		const cf="G_SecondaryContents";
		if("profileColumnRenderer" in x) return this.R_ProfileColumn(x);
		if("browseFeedActionsRenderer" in x) return this.R_BrowseFeedActions(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_BrowseFeedActions} x */
	R_BrowseFeedActions(x) {this.H_("browseFeedActionsRenderer",x,this.D_BrowseFeedActions);}
	/** @private @arg {D_BrowseFeedActions} x */
	D_BrowseFeedActions(x) {this.H_("contents",x,x => this.z(x,this.G_BrowseFeedContent));}
	/** @private @arg {G_BrowseFeedContent} x */
	G_BrowseFeedContent(x) {
		const cf="G_BrowseFeedContent";
		if("searchBoxRenderer" in x) return this.sm.R_SearchBox(x);
		if("subFeedSelectorRenderer" in x) return this.sm.R_SubFeedSelector(x);
		if("buttonRenderer" in x) return this.xm.R_Button(x);
		if("compactLinkRenderer" in x) return this.sm.R_CompactLink(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_ProfileColumn} x */
	R_ProfileColumn(x) {this.H_("profileColumnRenderer",x,this.D_ProfileColumn);}
	/** @private @arg {D_ProfileColumn} x */
	D_ProfileColumn(x) {this.z(this.sm.T_Items("D_ProfileColumn",x),this.G_ProfileColumnItem);}
	/** @private @arg {G_ProfileColumnItem} x */
	G_ProfileColumnItem(x) {
		const cf="G_ProfileColumnItem";
		if("profileColumnStatsRenderer" in x) return this.sm.R_ProfileColumnStats(x);
		if("profileColumnUserInfoRenderer" in x) return this.sm.R_ProfileColumnUserInfo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {E_Upload} x */
	E_VE83769_Upload(x) {const [a,b,y]=this.sm.TE_Endpoint_3("E_VE83769_Upload","uploadEndpoint",x); this.g(y); this.M_Url(a); this.B_Hack(b);}
	/** @public @arg {E_SignalNavigation} x */
	E_SignalNavigation(x) {const [a,b,y]=this.sm.TE_Endpoint_3("E_SignalNavigation","signalNavigationEndpoint",x); this.g(y); this.M_Url(a); this.DE_SignalNavigation(b);}
	/** @public @arg {E_Url} x */
	E_Url(x) {
		const [a,b,{loggingUrls,...y}]=this.sm.TE_Endpoint_3("E_Url","urlEndpoint",x); this.g(y);
		this.M_Url(a); this.DE_Url(b); this.tz(loggingUrls,this.DU_BaseUrl);
	}
	/** @public @arg {M_Url} x */
	M_Url(x) {this.T_WCM("M_Url",x,this.GM_Url);}
	/** @private @arg {GM_Url} x */
	GM_Url(x) {
		const cf="GM_Url";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_UNKNOWN") debugger;
		this.sm.rootVe(rootVe,83769);
	}
	/** @public @arg {NonNullable<E_Url["loggingUrls"]>[number]} x */
	DU_BaseUrl(x) {
		const cf="DU_BaseUrl";
		const {baseUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DU_Url(baseUrl);
	}
	/** @private @arg {NonNullable<E_Url["loggingUrls"]>[number]["baseUrl"]} x */
	DU_Url(x) {
		this.DU_UrlParse(this._convert_url_to_obj(x));
		(x => {
			if(x.host!=="www.youtube.com") debugger;
			if(x.pathname!=="/pagead/paralleladinteraction") debugger;
			let pa1=this.split_str(x.search,"?");
			let pa=this.split_str(pa1[1],"&"); pa;
			let {ai,sigh,cid,ad_mt,acvw,gv,nb,label,...y}=this.parse_url_search_params(x.search); this.g(y);
		})(this._convert_url_to_obj(x));
	}
	/** @arg {{host:"www.youtube.com",pathname:"/pagead/paralleladinteraction",search:`?ai=${string}&sigh=${string}&cid=${string}&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]&nb=%5BNB%5D&label=video_click_to_advertiser_site`}} x */
	DU_UrlParse(x) {
		const cf="DU_UrlParse";
		this.save_string(`${cf}.host`,x.host);
		if(x.pathname!=="/pagead/paralleladinteraction") debugger; this.save_string(`${cf}.pathname`,x.pathname);
		this.DU_UrlParams(this.parse_url_search_params(x.search));
	}
	/** @private @arg {DE_Url} x */
	DE_Url(x) {
		const cf="DE_VE83769_Url";
		const {url,...u}=this.s(cf,x);/*#destructure_later*/
		this.GM_E_VE83769_Url_TargetUrlType(url);
		if("nofollow" in u&&"target" in u) {
			const {target,nofollow,...y}=u; this.g(y); /*#destructure_done*/
			if(target!=="TARGET_NEW_WINDOW") debugger;
			if(nofollow!==true) debugger;
			return;
		}
		if("nofollow" in u) {
			const {nofollow,...y}=u; this.g(y);/*#destructure_done*/
			if(nofollow!==true) debugger;
			return;
		}
		if("target" in u) {
			const {target,...y}=u; this.g(y); /*#destructure_done*/
			if(target!=="TARGET_NEW_WINDOW") debugger;
			return;
		}
		if("grwOpenInOverride" in u) {
			let x=this.ws("grwOpenInOverride",u);
			this.save_enum(`${cf}.grwOpenInOverride`,"GRW_OPEN_IN_OVERRIDE",x);
			return;
		}
		this.g(u);
	}
	/** @private @arg {DE_Url['url']|`https://studio.youtube.com/channel/UC${string}`} x */
	GM_E_VE83769_Url_TargetUrlType(x) {
		const rp="https://www.youtube.com/redirect?";
		if(this.str_starts_with_rx(rp,x)) {
			/** @type {GU_VE83769_Url_Redirect} */
			let arg_x=as(x);
			return this.GU_YoutubeUrlRedirect(arg_x);
		}
		let sp=this._convert_url_to_obj(x);
		if(this.str_starts_with_rx("https://",sp.href)) {return;}
		this.xm.GU_Url(sp.href);
	}
	/** @private @arg {GU_VE83769_Url} x */
	GU_Url(x) {
		if(this.str_starts_with_rx("/",x)) {
			switch(x) {
				default: x===""; debugger; break;
				case "/upload": break;
			}
			return;
		}
		if(this.str_starts_with_rx("https://www.youtube.com/redirect?",x)) return;
		if(this.str_starts_with_rx("https://youtube.com",x)) {
			let up=this._convert_url_to_obj(x);
			this.ht.parse_url_alt("GU_Url",up.pathname);
			return;
		}
		this.GU_Url_Obj(x);
		const hn_yt_studio="https://studio.youtube.com";
		const hn_yt_music="https://music.youtube.com";
		const hn_yt_kids="https://www.youtubekids.com";
		const hn_yt_tv="https://tv.youtube.com";
		if(this.str_starts_with_rx(hn_yt_studio,x)) return;
		if(this.str_starts_with_rx(hn_yt_music,x)) return;
		if(this.str_starts_with_rx(hn_yt_kids,x)) return;
		if(this.str_starts_with_rx(hn_yt_tv,x)) return;
		if(this.str_starts_with_rx("https://www.google.com",x)) return;
		if(this.str_starts_with_rx("https://myactivity.google.com",x)) return;
		if(this.str_starts_with_rx("https://support.google.com",x)) return;
		if(this.str_starts_with_rx("https://www.googleadservices.com",x)) return;
		if(this.str_starts_with_rx("https://googleads.g.doubleclick.net",x)) return;
		x;
	}
	/** @private @arg {Extract<GU_VE83769_Url,`https://${string}`>} x */
	GU_Url_Obj(x) {
		let up=this._convert_url_to_obj(x);
		/** @template {string} T @arg {{host:T}} u */
		function get_host(u) {return u.host;}
		switch(up.host) {
			case "googleads.g.doubleclick.net": return;
			case "music.youtube.com": return this.handle_yt_music_url(up.href);
			case "myaccount.google.com": return;
			case "myactivity.google.com": return;
			case "studio.youtube.com": return this.D_YtStudio_Url(up.href);
			case "support.google.com": return;
			case "tv.youtube.com": return;
			case "www.google.com": return;
			case "www.googleadservices.com": return;
			case "www.youtube.com": return this.GU_FullYoutubeUrl(up.href);
			case "www.youtubekids.com": return this.D_YoutubeKidsUrl(up.href);
			case "youtube.com": return;
			default: get_host(up)===""; debugger; break;
		}
	}
	/** @public @template {string} T @arg {T_BaseUrl<T>} x @arg {(this:this,x:T)=>void} f */
	T_BaseUrl(x,f) {
		const cf="T_BaseUrl";
		const {baseUrl,elapsedMediaTimeSeconds,...y}=this.s(cf,x); this.g(y);
		f.call(this,baseUrl);
		this.t(elapsedMediaTimeSeconds,x => this.sm.a_primitive_num(x));
	}
	/** @public @arg {D_PlaybackTracking} x */
	D_PlaybackTracking(x) {
		const cf="D_PlaybackTracking"; this.sm.k(cf,x);
		let [a,u]=this.sm.unwrap_prefix(x,"videostats");
		{
			const {defaultFlushIntervalSeconds,delayplayUrl,playbackUrl,scheduledFlushWalltimeSeconds,watchtimeUrl,...y}=a; this.g(y);
		}
		const {atrUrl,ptrackingUrl,qoeUrl,youtubeRemarketingUrl,...y}=u; this.g(y);
		this.D_UrlAndElapsedMediaTime(atrUrl,x => this.sm.a_primitive_str(x));
		this.T_BaseUrl(ptrackingUrl,x => this.sm.a_primitive_str(x));
		this.T_BaseUrl(qoeUrl,x => this.sm.a_primitive_str(x));
		this.t(youtubeRemarketingUrl,x => this.T_BaseUrl(x,this.sm.a_primitive_str));
	}
	/** @template T @private @arg {D_UrlAndElapsedMediaTime<T>} x @arg {(this:this,x:T)=>void} f */
	D_UrlAndElapsedMediaTime(x,f) {
		const cf="D_UrlAndElapsedMediaTime";
		const {baseUrl,elapsedMediaTimeSeconds,...y}=this.s(cf,x); this.g(y);
		f.call(this,baseUrl);
		this.sm.a_primitive_num(elapsedMediaTimeSeconds);
	}
	/** @private @arg {D_ActiveView} x */
	D_ActiveView(x) {
		const cf="D_ActiveView";
		const {viewableCommands,endOfSessionCommands,regexUriMacroValidator,...y}=this.s(cf,x); this.g(y);
		this.z(viewableCommands,this.sm.E_Pinging);
		this.z(endOfSessionCommands,this.sm.E_Pinging);
		this.sm.D_EmptyMap(regexUriMacroValidator);
	}
	/** @public @arg {E_Pinging} x */
	E_Pinging(x) {
		const cf="E_Pinging";
		const {clickTrackingParams,loggingUrls,pingingEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.B_Hack(pingingEndpoint);
		this.z(loggingUrls,x => this.T_BaseUrl(x,x => {
			let pr=this._convert_url_to_obj(x);
			switch(pr.host) {
				case "pagead2.googlesyndication.com": {
					if(pr.pathname!=="/pcs/activeview") debugger;
					const {xai,sai,sig,cid,acvw,...y}=this.parse_url_search_params(pr.search); this.g(y);
				} break;
				case "googleads.g.doubleclick.net": {
					if(pr.pathname!=="/pagead/interaction/") debugger;
					let {ai,sigh,label,...y}=this.parse_url_search_params(pr.search); this.g(y);
					if(label!=="noop_tap") debugger;
				} break;
				default: debugger; break;
			};
		}));
	}
	/** @public @arg {R_ClientForecastingAd} x */
	R_ClientForecastingAd(x) {this.H_("clientForecastingAdRenderer",x,this.D_ClientForecastingAd);}
	/** @private @arg {D_ClientForecastingAd} x */
	D_ClientForecastingAd(x) {
		const cf="D_ClientForecastingAd";
		const {impressionUrls,...y}=this.s(cf,x); this.g(y);
		this.z(impressionUrls,x => this.T_BaseUrl(x,x => {
			this.parser.parse_url(`${cf}.impressionUrl`,x);
		}));
	}
	/** @private @arg {D_ImpressionCommand} x */
	D_ImpressionCommand(x) {
		const cf="D_ImpressionCommand";
		const {clickTrackingParams,loggingUrls,pingingEndpoint,...y}=this.s(cf,x); this.g(y);
		this.sm.clickTrackingParams(clickTrackingParams);
		this.z(loggingUrls,x => this.T_BaseUrl(x,x => this.parser.parse_url(`${cf}:LoggingUrlItem`,x)));
		this.B_Hack(pingingEndpoint);
	}
	/** @public @arg {R_PromotedSparklesWeb} x */
	R_PromotedSparklesWeb(x) {this.H_("promotedSparklesWebRenderer",x,this.D_PromotedSparklesWeb);}
	/** @private @arg {D_PromotedSparklesWeb} x */
	D_PromotedSparklesWeb(x) {
		const cf="D_PromotedSparklesWeb";
		const {thumbnail,icon,title,description,websiteText,actionButton,navigationEndpoint,impressionCommands,noopTapEndpoints,menu,activeView,trackingParams,clickLocationTargets,adBadge,...y}=this.s(cf,x); this.g(y);
		this.sm.D_Thumbnail(thumbnail);
		this.sm.T_Icon(`${cf}:icon`,icon);
		this.sm.G_Text(title);
		this.sm.G_Text(description);
		this.sm.G_Text(websiteText);
		this.xm.R_Button(actionButton);
		this.xm.E_Url(navigationEndpoint);
		this.z(impressionCommands,this.D_ImpressionCommand);
		this.tz(noopTapEndpoints,this.sm.E_Pinging);
		this.sm.R_Menu(menu);
		this.t(activeView,this.D_ActiveView);
		this.sm.trackingParams(trackingParams);
		this.z(clickLocationTargets,this.D_ClickLocationTarget);
		this.t(adBadge,this.sm.RMD_Badge);
	}
	/** @private @arg {D_ClickLocationTarget} x */
	D_ClickLocationTarget(x) {
		const cf="D_ClickLocationTarget";
		const {location,code,behaviorType,...y}=this.s(cf,x); this.g(y);
		this.save_enum(cf,"PROMOTED_SPARKLES_CLICK_LOCATION",location);
		this.save_number(`${cf}.code`,code);
		this.save_enum(cf,"PROMOTED_SPARKLES_CLICK_BEHAVIOR_TYPE",behaviorType);
	}
	/** @private @arg {DE_SignalNavigation} x */
	DE_SignalNavigation(x) {
		const cf="DE_SignalNavigation",a=this.sm.T_Signal(cf,x);
		switch(a) {
			default: this.cg.codegen_case(`${cf}.signal`,a); break;
			case "CHANNEL_SWITCHER":
			case "LIVE_CONTROL_ROOM":
		}
	}
	/** @public @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {this.H_("playlistHeaderRenderer",x,this.D_PlaylistHeader);}
	/** @private @arg {D_PlaylistHeader} x */
	D_PlaylistHeader(x) {
		const cf="D_PlaylistHeader";
		const {playButton,playlistHeaderBanner,playlistId,privacy,shufflePlayButton,trackingParams,editableDetails,editorEndpoint,isEditable,ownerEndpoint,serviceEndpoints,moreActionsMenu,title,numVideosText,descriptionTapText,descriptionText,onDescriptionTap,shareData,stats,briefStats,byline,ownerText,viewCountText,cinematicContainer,...y}=this.s(cf,x);
		this.xm.R_Button(playButton);
		this.xm.R_HeroPlaylistThumbnail(playlistHeaderBanner);
		this.sm.playlistId(playlistId);
		this.save_string(`${cf}.privacy`,privacy);
		this.xm.R_Button(shufflePlayButton);
		this.sm.trackingParams(trackingParams);
		this.sm.D_EditableDetails(editableDetails);
		this.t(editorEndpoint,this.sm.E_PlaylistEditor);
		this.sm.a_primitive_bool(isEditable);
		this.sm.E_VE3611(ownerEndpoint);
		this.z(serviceEndpoints,x => {
			if("playlistEditEndpoint" in x) return this.sm.E_PlaylistEdit(x);
			if("deletePlaylistEndpoint" in x) return this.sm.E_PlaylistDelete(x);
			this.sm.codegen_typedef("EF_PlaylistHeader",x,false);
		});
		this.sm.R_Menu(moreActionsMenu);
		this.sm.G_Text(title);
		this.sm.G_Text(numVideosText);
		this.t(descriptionTapText,this.sm.G_Text);
		this.g(descriptionText);
		this.A_FancyDismissibleDialog(onDescriptionTap);
		this.sm.D_CanShare(shareData);
		this.z(stats,this.sm.G_Text);
		this.z(briefStats,this.sm.G_Text);
		this.z(byline,this.sm.R_PlaylistByline);
		this.sm.G_Text(ownerText);
		this.sm.G_Text(viewCountText);
		this.sm.R_CinematicContainer(cinematicContainer);
		const {shareButton,titleForm,descriptionForm,privacyForm,...y1}=y; this.g(y1);
		this.t(shareButton,this.xm.R_Button);
		this.t(titleForm,this.R_InlineForm);
		this.t(descriptionForm,this.R_InlineForm);
		this.t(privacyForm,this.R_DropdownFormField);
	}
}
export_(exports => {exports.ForService_XMethods=ForService_XMethods;});
