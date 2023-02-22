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

const {do_export,as,split_string_once,split_string,split_string_once_ex,split_string_once_last,ApiBase,ApiBase2,as_any}=require("./YtPlugin_Base.user");
const {ServiceMethods}=require("./YTPlugin_ServiceMethods.user");

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
class TypedefGenerator extends ServiceMethods {
	/** @arg {D_TypedefGenerator_Popup} x */
	D_TypedefGenerator_Popup(x) {
		const cf="popup_dialog"; cf; this.k(cf,x);
		let x1=this.unpack_popup_dialog(x);
		if(!x1[0]) {debugger; return null;}
		let dialog=x1[1];
		return this.D_TypedefGenerator_Popup_R(dialog);
	}
	/** @arg {D_TypedefGenerator_Popup_R} x */
	D_TypedefGenerator_Popup_R(x) {
		const cf="R_ConfirmDialog"; cf; this.k(cf,x);
		if("confirmDialogRenderer" in x) return "TYPE::Popup_ConfirmDialog";
		if("fancyDismissibleDialogRenderer" in x) return "TYPE::Popup_DismissibleDialog";
		return null;
	}
}
/** @private @template T */
class BitmapResult {
	/** @constructor @public @arg {T[]} map_arr @arg {string} bitmap */
	constructor(map_arr,bitmap) {
		this.map_arr=map_arr;
		this.bitmap=bitmap;
	}
}
/** @template {string|number|boolean} T @template {StoreContentStr} U */
class StoreDescription extends ApiBase2 {
	/** @type {Map<string,number>} */
	key_index=new Map;
	/** @type {[string, make_item_group<T>][]} */
	data=[];
	/** @type {[string, make_item_group<T>][]} */
	new_data=[];
	/** @arg {StoreGetType<T>} type @arg {U} content @arg {()=>void} data_update_callback */
	constructor(type,content,data_update_callback) {
		super();
		this.type=type;
		this.content=content;
		this.data_update_callback=data_update_callback;
	}
	/** @arg {string} k @arg {make_item_group<T>} x */
	add_data_to_index(k,x) {
		let new_len=this.data.push([k,x]);
		this.key_index.set(k,new_len-1);
	}
	/** @arg {string} k @arg {make_item_group<T>} x */
	push_new_data(k,x) {
		this.new_data.push([k,x]);
		this.add_data_to_index(k,x);
		this.data_update_callback();
	}
	/** @arg {T_BoxedStore<T,B_BoxedStoreTypeofToType[T_GetTypeof<T>]>} item */
	load_data(item) {
		let {id: k,value: x}=item;
		let idx=this.new_data.findIndex(v => v[0]===item.id);
		if(idx<0) return;
		this.new_data.splice(idx);
		this.add_data_to_index(k,x);
	}
	/** @arg {string} k @arg {make_item_group<T>} x */
	save_data(k,x) {
		if(this.includes_key(k)) {
			let idx=this.key_index.get(k);
			if(idx===void 0) throw new Error();
			let item=this.data[idx];
			let item_container=item[1];
			if(item_container[0]==="many"&&x[0]==="arr") {
				let [,item_many]=item_container;
				if(item_many.findIndex(item_arr => this.eq_keys(item_arr,x[1]))>-1) return;
				item_many.push(x[1]);
				this.push_new_data(k,item_container);
				return;
			}
			if(item_container[0]==="arr"&&x[0]==="arr") {
				let [,item_arr]=item_container;
				if(this.eq_keys(item_arr,x[1])) return;
				this.push_new_data(k,["many",[item_container[1],x[1]]]);
				return;
			}
			if(item_container[0]==="arr"&&x[0]==="one") {
				let [,item_arr]=item_container;
				if(item_arr.includes(x[1])) return;
				item_arr.push(x[1]);
				this.push_new_data(k,item_container);
				return;
			}
			if(item_container[0]==="one"&&x[0]==="one") {
				let [,item_value]=item_container;
				if(item_value===x[1]) return;
				this.push_new_data(k,["arr",[item_container[1],x[1]]]);
				return;
			}
			debugger;
			return;
		}
		this.push_new_data(k,x);
	}
	/** @api @public @this {StoreDescription<string,"keys">} @template {{}} T @arg {string} k @arg {T|undefined} obj */
	save_keys(k,obj) {
		if(!obj) {debugger; return;}
		if(typeof obj!=="object") {
			this.save_data(`${k}.type`,["one",typeof obj]);
			return;
		}
		if(obj instanceof Array) {
			this.save_data(`${k}.instance`,["one","array"]);
			return;
		}
		let keys=this.get_keys_of(obj);
		/** @type {make_arr_t<string>} */
		let x=["arr",keys];
		return this.save_data(k,x);
	}
	/** @arg {string} k */
	get_seen_string_item_store(k) {
		let idx=this.key_index.get(k);
		if(idx) return this.data[idx];
		idx=this.data.findIndex(e => e[0]===k);
		if(idx<0) return this.add_to_index(k,["arr",[]]);
		this.key_index.set(k,idx);
		return this.data[idx];
	}
	/** @arg {string} k @arg {make_item_group<T>} x */
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
}
export_(exports => {exports.StoreDescription=StoreDescription;});
class StoreData {
	/** @arg {()=>void} data_update_callback */
	constructor(data_update_callback) {
		this.data_update_callback=data_update_callback;
		/** @type {StoreDescription<boolean,"boolean">} */
		this.bool_store=new StoreDescription("boolean","boolean",data_update_callback);
		/** @type {StoreDescription<number,"number">} */
		this.number_store=new StoreDescription("number","number",data_update_callback);
		/** @type {StoreDescription<number,"root_visual_element">} */
		this.ve_store=new StoreDescription("number","root_visual_element",data_update_callback);
		/** @type {StoreDescription<string,"string">} */
		this.string_store=new StoreDescription("string","string",data_update_callback);
		/** @type {StoreDescription<string,"keys">} */
		this.keys_store=new StoreDescription("string","keys",data_update_callback);
	}
	get_changed_stores() {
		/** @type {("bool"|"string"|"keys"|"number"|"ve")[]} */
		let changed=[];
		if(this.bool_store.new_data.length>0) changed.push("bool");
		if(this.keys_store.new_data.length>0) changed.push("keys");
		if(this.number_store.new_data.length>0) changed.push("number");
		if(this.string_store.new_data.length>0) changed.push("string");
		if(this.ve_store.new_data.length>0) changed.push("ve");
		return changed;
	}
}
export_(exports => {exports.StoreData=StoreData;});
class LocalStorageSeenDatabase extends ServiceMethods {
	/** @arg {string} key */
	get_store_keys(key) {return this.data_store.string_store.data.find(e => e[0]===key);}
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
	data_store=new StoreData(() => {
		this.onDataChange();
	});
	idb=(() => {
		if(!this.x) {
			this.addOnServicesListener(() => {
				this.idb=this.x.get("indexed_db");
			});
			return as_any({});
		}
		return this.x.get("indexed_db");
	})();
	/** @api @public @arg {string} k @arg {["one",boolean]} x */
	save_boolean(k,x) {return this.data_store.bool_store.save_data(k,x);}
	/** @api @public @arg {string} k @arg {make_item_group<number>} x */
	save_number(k,x) {return this.data_store.number_store.save_data(k,x);}
	/** @api @public @arg {number} x */
	save_root_visual_element(x) {return this.data_store.ve_store.save_data("ve_element",["one",x]);}
	/** @api @public @template {{}} T @arg {string} k @arg {T|undefined} x */
	save_keys_impl(k,x) {return this.data_store.keys_store.save_keys(k,x);}
	/** @no_mod @type {number|null|Nullable<{}>} */
	#idle_id=null;
	onDataChange() {
		if(this.#idle_id!==null) return;
		this.is_ready=false;
		this.#idle_id=requestIdleCallback(async () => {
			const version=this.indexed_db_version;
			try {
				await this.idb.load_database(this.data_store,version);
			} catch(err) {
				console.log("load_database failed",err);
				return;
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
	/** @public @template {string|number} T @arg {string} ns @arg {number} idx @arg {StoreDescription<T,"string"|"keys">} store */
	show_strings_bitmap(ns,idx,store) {
		debugger;
		let f=true;
		if(f) return;
		let p=store.data[idx];
		if(store.type!=="string") return;
		if(!p) return;
		let k=p[0];
		let cur=p[1];
		switch(cur[0]) {
			default: debugger; break;
			case "one": debugger; break;
			case "many": {
				let src_data=cur[1];
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
				let bitmap_src=cur[1];
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
	num_bitmap_console() {
		let gg=this.data_store.number_store.data.find(e => e[0]==="P_tracking_params.f1");
		if(!gg) return;
		let g1=gg[1];
		if(g1[0]!=="arr") return;
		let sr=g1[1].slice().sort((a,b) => a-b);
		this.save_number_arr("arr.P_tracking_params.f1",sr);
		let bm=this.generate_bitmap_num(g1[1]).bitmap;
		this.save_string("bitmap.P_tracking_params.f1",bm.split("!").map((e,u) => [u,e].join("$")).join(","));
		this.data_store.string_store.data.find(e => e[0]==="bitmap.P_tracking_params.f1")?.[1]?.[1];
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
	generate_bitmap_num_raw(src) {
		let map_arr=[...new Set([...src])].sort((a,b) => a-b);
		let zz=map_arr.at(-1)??0;
		let ta=new Array(zz+1).fill(0);
		src.forEach(e => {ta[e]=1;});
		let bs=ta.join("");
		return new BitmapResult(map_arr,bs);
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
		let gg=yt_plugin.ds.data_store.number_store.data.find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		if(gg[1][0]!=="arr") return;
		gg[1][1].sort((a,b) => a-b);
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
		let bm=yt_plugin.ds.generate_bitmap_num_raw_fill(g1[1],1).bitmap;
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
	console_code_2() {"0:0!1:1".split("!").map(e => e.split(":").map(e => parseInt(e,10))).map((e,i) => [...e,i]).sort(([,a],[,b]) => a-b).map(([a,b,i]) => `${b}$${i}$${a}`);}
	/** @private @arg {number[]} bitmap_src */
	generate_bitmap_num(bitmap_src) {
		let {map_arr,bitmap}=this.generate_bitmap_num_raw(bitmap_src);
		let bitmap_rle=this.rle_enc(bitmap);
		return new BitmapResult(map_arr,bitmap_rle);
	}
}
export_(exports => {
	exports.TypedefGenerator=TypedefGenerator;
	exports.LocalStorageSeenDatabase=LocalStorageSeenDatabase;
	exports.OnePropertyObjArray=OnePropertyObjArray;
});
//#endregion
class Support_RS_Player extends ServiceMethods {
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
		this.t(playbackTracking,this.D_PlaybackTracking);
		this.t(videoDetails,x => this.ht.D_VideoDetails(x));
		this.t(playerConfig,x => this.ht.D_PlayerConfig(x));
		this.t(storyboards,this.G_PlayerStoryboards);
		this.t(microformat,this.R_PlayerMicroformat);
		this.t(cards,this.R_CardCollection);
		this.trackingParams(trackingParams);
		this.t(attestation,this.R_PlayerAttestation);
		this.t(videoQualityPromoSupportedRenderers,this.R_VideoQualityPromo);
		this.t(captions,this.R_PlayerCaptionsTracklist);
		this.tz(adPlacements,x => {
			if("adPlacementRenderer" in x) return this.R_AdPlacement(x);
			let ka=this.get_keys_of(x);
			if(ka.length!==0) debugger;
		});
		this.t(frameworkUpdates,this.D_FrameworkUpdates);
		this.t(endscreen,this.R_Endscreen);
		this.t(paidContentOverlay,this.R_PaidContentOverlay);
		this.tz(annotations,x => {
			if(!x.playerAnnotationsExpandedRenderer) debugger;
			this.R_PlayerAnnotationsExpanded(x);
		});
		this.t(cacheMetadata,this.D_Cache_MD);
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
		this.G_Text(text);
		if(durationMs!=="10000") debugger;
		this.ht.E_VE83769_Url(navigationEndpoint);
		this.T_Icon(cf,icon);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {G_PlayerStoryboards} x */
	G_PlayerStoryboards(x) {
		const cf="G_PlayerStoryboards"; this.k(cf,x);
		if("playerStoryboardSpecRenderer" in x) return;
		if("playerLiveStoryboardSpecRenderer" in x) return;
		this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_CaptionTrackItem} x */
	D_CaptionTrackItem(x) {
		const cf="D_CaptionTrackItem";
		const {baseUrl,name,vssId,languageCode,kind,isTranslatable,...y}=this.s(cf,x); this.g(y);
		{
			let x=baseUrl;
			let x1=split_string_once(x,"?");
			if(x1[0]!=="https://www.youtube.com/api/timedtext") debugger;
			let {...rx}=this.parse_url_search_params(x1[1]);
			this.xr.D_TimedTextApi(rx);
		}
		this.G_Text(name);
		this.save_string(`${cf}.vssId`,vssId);
		this.save_string(`${cf}.languageCode`,languageCode);
		this.t(kind,x => this.save_string(`${cf}.kind`,x));
		if(isTranslatable!==true) debugger;
	}
	/** @private @arg {D_AudioTrackItem} x */
	D_AudioTrackItem(x) {
		const cf="D_AudioTrackItem";
		if("defaultCaptionTrackIndex" in x) {
			const {captionTrackIndices,defaultCaptionTrackIndex,visibility,hasDefaultTrack,captionsInitialState,...y}=this.s(cf,x); this.g(y);
			this.z(captionTrackIndices,this.a_primitive_num);
			this.a_primitive_num(defaultCaptionTrackIndex);
			this.ceq(visibility,"UNKNOWN");
			this.ceq(hasDefaultTrack,true);
			if(captionsInitialState!=="CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED") debugger;
			return;
		}
		const {captionTrackIndices,...y}=this.s(cf,x); this.g(y);
		this.z(captionTrackIndices,this.a_primitive_num);
	}
	/** @private @arg {D_TranslationLanguage} x */
	D_TranslationLanguage(x) {
		const cf="D_TranslationLanguage";
		const {languageCode,languageName,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(languageCode);
		this.G_Text(languageName);
	}
	/** @private @arg {D_Endscreen} x */
	D_Endscreen(x) {
		const cf="D_Endscreen";
		const {elements,startMs,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.z(elements,this.R_EndscreenElement);
		this.t(startMs,this.a_primitive_str);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlayabilityStatus} x */
	D_PlayabilityStatus(x) {
		const cf="D_PlayabilityStatus";
		const {status,playableInEmbed,offlineability,miniplayer,contextParams,...y}=this.s(cf,x); this.g(y);
		if(status!=="OK") debugger;
		this.a_primitive_bool(playableInEmbed);
		this.t(offlineability,this.R_Button);
		this.t(miniplayer,this.R_Miniplayer);
		let ctx=atob(contextParams);
		this.params("playability_status.context_params",ctx);
	}
	/** @private @arg {D_PlayerAnnotationsExpanded} x */
	D_PlayerAnnotationsExpanded(x) {
		const cf="D_PlayerAnnotationsExpanded"; this.k(cf,x);
		const {featuredChannel,allowSwipeDismiss,annotationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_FeaturedChannel(featuredChannel);
		this.parse_uuid(annotationId);
		this.a_primitive_bool(allowSwipeDismiss);
	}
	/** @private @arg {D_HeartbeatParams} x */
	D_HeartbeatParams(x) {
		const cf="D_HeartbeatParams";
		const {intervalMilliseconds,softFailOnError,heartbeatServerData,...y}=this.s(cf,x); this.g(y);
		this.save_string(`${cf}.intervalMilliseconds`,intervalMilliseconds);
		this.ceq(softFailOnError,false);
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
		let params_tag=this.B_TagObj(gutParams);
		// cSpell:ignoreRegExp /\\\\4061\\\\ytpwmpu/
		if(params_tag!=="\\4061\\ytpwmpu") debugger;
		this.ceq(showCompanion,true);
		this.ceq(showInstream,true);
		this.ceq(useGut,true);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[${cf}.next_key] [${ka.shift()}]`);
		}
	}
	/** @private @arg {D_PlayerMicroformat} x */
	D_PlayerMicroformat(x) {
		const cf="D_PlayerMicroformat";
		const {thumbnail,embed,title,description,lengthSeconds,ownerProfileUrl,externalChannelId,isFamilySafe,availableCountries,isUnlisted,hasYpcMetadata,viewCount,category,publishDate,ownerChannelName,liveBroadcastDetails,uploadDate,learningResource,...y}=this.s(cf,x); this.g(y);
		this.D_Thumbnail(thumbnail);
		this.t(embed,this.D_MicroformatEmbed);
		this.G_Text(title);
		this.t(description,this.G_Text);
		this.a_primitive_str(lengthSeconds);
		this.parser.parse_url(cf,ownerProfileUrl);
		this.D_ChannelId(externalChannelId);
		this.a_primitive_bool(isFamilySafe);
		this.z(availableCountries,this.a_primitive_str);
		this.a_primitive_bool(isUnlisted);
		this.a_primitive_bool(hasYpcMetadata);
		this.a_primitive_str(viewCount);
		this.D_VideoCategory(category);
		this.a_primitive_str(publishDate);
		this.a_primitive_str(ownerChannelName);
		this.t(liveBroadcastDetails,this.D_LiveBroadcastDetails);
		this.a_primitive_str(uploadDate);
		this.t(learningResource,this.D_LearningResource);
	}
	/** @private @arg {D_AdPlacement} x */
	D_AdPlacement(x) {
		const cf="D_AdPlacement";
		const {config,renderer,...y}=this.s(cf,x); this.g(y);
		this.R_AdPlacementConfig(config);
		this.G_AdPlacementRendererItem(renderer);
	}
	/** @private @arg {D_PlaybackTracking} x */
	D_PlaybackTracking(x) {
		const cf="D_PlaybackTracking"; this.k(cf,x);
		let [a,u]=this.unwrap_prefix(x,"videostats");
		{
			const {defaultFlushIntervalSeconds,delayplayUrl,playbackUrl,scheduledFlushWalltimeSeconds,watchtimeUrl,...y}=a; this.g(y);
		}
		const {atrUrl,ptrackingUrl,qoeUrl,youtubeRemarketingUrl,...y}=u; this.g(y);
		this.D_UrlAndElapsedMediaTime(atrUrl,this.a_primitive_str);
		this.T_BaseUrl(ptrackingUrl,this.a_primitive_str);
		this.T_BaseUrl(qoeUrl,this.a_primitive_str);
		this.t(youtubeRemarketingUrl,x => this.T_BaseUrl(x,this.a_primitive_str));
	}
	/** @private @arg {D_PlayerCaptionsTracklist} x */
	D_PlayerCaptionsTracklist(x) {
		const cf="D_PlayerCaptionsTracklist";
		const {captionTracks,audioTracks,translationLanguages,defaultAudioTrackIndex,openTranscriptCommand,...y}=this.s(cf,x); this.g(y);
		this.z(captionTracks,this.D_CaptionTrackItem);
		this.z(audioTracks,this.D_AudioTrackItem);
		this.z(translationLanguages,this.D_TranslationLanguage);
		this.a_primitive_num(defaultAudioTrackIndex);
		this.t(openTranscriptCommand,x => {
			if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
			debugger;
		});
	}
	/** @private @arg {D_VideoQualityPromo} x */
	D_VideoQualityPromo(x) {
		const cf="D_VideoQualityPromo";
		const {triggerCriteria,text,endpoint,trackingParams,snackbar,...y}=this.s(cf,x); this.g(y);
		this.D_TriggerCriteria(triggerCriteria);
		this.G_Text(text);
		this.ht.E_VE83769_Url(endpoint);
		this.trackingParams(trackingParams);
		this.RA_Notification(snackbar);
	}
	/** @private @arg {D_PlayerAttestation} x */
	D_PlayerAttestation(x) {
		const cf="D_PlayerAttestation";
		const {challenge,botguardData,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(challenge);
		this.D_Botguard(botguardData);
	}
	/** @private @arg {DD_Streaming} x */
	DD_Streaming(x) {
		const cf="DD_Streaming";
		const {expiresInSeconds,adaptiveFormats,formats,probeUrl,...y}=this.s(cf,x); this.g(y);
		this.parse_number_template(expiresInSeconds);
		this.z(adaptiveFormats,this.D_AdaptiveFormatItem);
		this.z(formats,this.D_FormatItem);
		this.t(probeUrl,x => this.parser.parse_url(cf,x));
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
		this.ceq(hideCueRangeMarker,true);
	}
	/** @private @arg {D_TriggerCriteria} x */
	D_TriggerCriteria(x) {
		const cf="D_TriggerCriteria";
		const {connectionWhitelist,joinLatencySeconds,rebufferTimeSeconds,watchTimeWindowSeconds,refractorySeconds,...y}=this.s(cf,x); this.g(y);
		if(connectionWhitelist.length!==1) debugger;
		this.ceq(connectionWhitelist[0],"WIFI");
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
		this.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.a_primitive_str(mimeType);
		this.a_primitive_num(bitrate);
		this.t(width,this.a_primitive_num);
		this.t(height,this.a_primitive_num);
		this.a_primitive_str(lastModified);
		this.t(contentLength,this.a_primitive_str);
		this.a_primitive_str(quality);
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,this.a_primitive_str);
		if(projectionType!=="RECTANGULAR") debugger;
		this.t(averageBitrate,this.a_primitive_num);
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.a_primitive_str(approxDurationMs);
		this.t(audioSampleRate,this.D_AudioSampleRate);
		this.t(audioChannels,x => {if(x!==2) debugger;});
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
		const {xtags,...y}=u; this.g(y);
		this.t(xtags,x => this.params("format_item.xtags",x));
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
		const cf="D_FeaturedChannel"; this.k(cf,x);
		const {startTimeMs,endTimeMs,watermark,trackingParams,navigationEndpoint,channelName,subscribeButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([startTimeMs,endTimeMs],this.a_primitive_str);
		this.D_Thumbnail(watermark);
		this.trackingParams(trackingParams);
		x: {
			let x2=navigationEndpoint;
			if(this.is_TE_VE(x2,3611)) {this.E_VE3611(x2); break x;}
			debugger;
		}
		this.a_primitive_str(channelName);
		this.R_SubscribeButton(subscribeButton);
	}
	/** @template T @private @arg {D_UrlAndElapsedMediaTime<T>} x @arg {(this:this,x:T)=>void} f */
	D_UrlAndElapsedMediaTime(x,f) {
		const cf="D_UrlAndElapsedMediaTime";
		const {baseUrl,elapsedMediaTimeSeconds,...y}=this.s(cf,x); this.g(y);
		f.call(this,baseUrl);
		this.a_primitive_num(elapsedMediaTimeSeconds);
	}
	/** @private @arg {D_Botguard} x */
	D_Botguard(x) {
		const cf="D_Botguard";
		const {program,interpreterSafeUrl,serverEnvironment,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(program);
		let interpreterUrl=this.UrlWrappedValueT(interpreterSafeUrl);
		this.a_primitive_str(interpreterUrl);
		this.save_number_one(`${cf}.serverEnvironment`,serverEnvironment);
	}
	/** @private @arg {D_CardCollection} x */
	D_CardCollection(x) {
		const cf="D_CardCollection";
		const {cards,headerText,icon,closeButton,trackingParams,allowTeaserDismiss,logIconVisibilityUpdates,...y}=this.s(cf,x); this.g(y);
		this.z(cards,this.R_Card);
		this.G_Text(headerText);
		this.R_InfoCardIcon(icon);
		this.R_InfoCardIcon(closeButton);
		this.trackingParams(trackingParams);
		this.ceq(allowTeaserDismiss,true);
		this.ceq(logIconVisibilityUpdates,true);
	}
	/** @private @arg {D_MicroformatEmbed} x */
	D_MicroformatEmbed(x) {
		const cf="D_CardCollection";
		const {iframeUrl,flashUrl,width,height,flashSecureUrl,...y}=this.s(cf,x); this.g(y);
		this.parser.parse_url(cf,iframeUrl);
		this.parser.parse_url(cf,flashUrl);
		this.save_number_one(`${cf}.width`,width);
		this.save_number_one(`${cf}.height`,height);
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
		this.a_primitive_bool(isLiveNow);
		this.a_primitive_str(startTimestamp);
		if("endTimestamp" in y) {
			const {endTimestamp,...y1}=y; this.g(y1);
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_AdaptiveFormatItem} x */
	D_AdaptiveFormatItem(x) {
		const cf="D_AdaptiveFormatItem";
		const {itag,url,mimeType,bitrate,width,height,initRange,indexRange,lastModified,contentLength,quality,xtags,fps,qualityLabel,projectionType,audioTrack,averageBitrate,colorInfo,highReplication,audioQuality,approxDurationMs,audioSampleRate,audioChannels,loudnessDb,signatureCipher,...y}=this.s(cf,x); this.g(y);
		this.t(audioTrack,this.D_AudioTrack);
		this.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.a_primitive_str(mimeType);
		this.a_primitive_num(bitrate);
		this.t(width,this.a_primitive_num);
		this.t(height,this.a_primitive_num);
		this.D_Range(initRange);
		this.D_Range(indexRange);
		this.a_primitive_str(lastModified);
		this.a_primitive_str(contentLength);
		this.a_primitive_str(quality);
		this.t(xtags,x => this.params("adaptive_format_item.xtags",x));
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,this.a_primitive_str);
		if(projectionType!=="RECTANGULAR") debugger;
		this.t(averageBitrate,this.a_primitive_num);
		this.t(colorInfo,this.D_FormatColorInfo);
		this.t(highReplication,x => {if(x!==true) debugger;});
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.a_primitive_str(approxDurationMs);
		this.t(audioSampleRate,this.D_AudioSampleRate);
		this.t(audioChannels,x => {
			if(x!==2) debugger;
		});
		this.t(loudnessDb,this.a_primitive_num);
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
	}
	/** @private @arg {R_Card} x */
	R_Card(x) {this.H_("cardRenderer",x,this.D_Card);}
	/** @private @arg {R_InfoCardIcon} x */
	R_InfoCardIcon(x) {this.H_("infoCardIconRenderer",x,this.D_InfoCardIcon);}
	/** @private @arg {"D_AdaptiveFormatItem"|"D_FormatItem"} cf @arg {D_FormatItem_signatureCipher} x */
	D_Format_signatureCipher(cf,x) {
		/** @type {`${cf}:signatureCipher`} */
		const cf1=`${cf}:signatureCipher`;
		let {s: {},sp,url,...y}=this.parse_url_search_params(x); this.g(y);
		switch(sp) {
			default: debugger; break;
			case "sig": break;
		}
		this.parser.parse_url(cf1,url);
	}
	/** @private @arg {D_FormatColorInfo} x */
	D_FormatColorInfo(x) {
		const cf="D_Range";
		const {primaries,transferCharacteristics,matrixCoefficients,...y}=this.s(cf,x); this.g(y);
		switch(primaries) {
			default: debugger; break;
			case void 0:
			case "COLOR_PRIMARIES_BT709":
		}
		switch(transferCharacteristics) {
			default: debugger; break;
			case "COLOR_TRANSFER_CHARACTERISTICS_BT709":
		}
		switch(matrixCoefficients) {
			default: debugger; break;
			case void 0:
			case "COLOR_MATRIX_COEFFICIENTS_BT709":
		}
	}
	/** @private @arg {D_FormatFps} x */
	D_FormatFps(x) {
		const cf="D_FormatFps";
		this.save_number_one(cf,x);
	}
	/** @private @arg {D_Range} x */
	D_Range(x) {
		const cf="D_Range";
		const {start,end,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(start);
		this.a_primitive_str(end);
	}
	/** @private @arg {D_AdTimeOffset} x */
	D_AdTimeOffset(x) {
		const cf="D_AdTimeOffset";
		const {offsetStartMilliseconds,offsetEndMilliseconds,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(offsetStartMilliseconds);
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
		this.D_Thumbnail(image);
		this.t(playlistLength,this.G_Text);
		this.t(icon,this.D_Thumbnail);
		this.a_primitive_num(left);
		this.a_primitive_num(width);
		this.a_primitive_num(top);
		this.a_primitive_num(aspectRatio);
		this.a_primitive_str(startMs);
		this.a_primitive_str(endMs);
		this.G_Text(title);
		this.G_Text(metadata);
		this.t(callToAction,this.G_Text);
		this.t(dismiss,this.G_Text);
		this.D_EndscreenElement_EP(endpoint);
		this.t(subscribersText,this.G_Text);
		this.t(hovercardButton,this.R_SubscribeButton);
		this.trackingParams(trackingParams);
		this.t(isSubscribe,x => this.ceq(x,true));
		this.a_primitive_str(id);
		this.tz(thumbnailOverlays,this.G_ThumbnailOverlayItem);
	}
	/** @private @arg {D_AudioTrack} x */
	D_AudioTrack(x) {
		const cf="D_AudioTrack";
		const {displayName,id,audioIsDefault,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(displayName);
		this.save_string(`${cf}.id`,id);
		this.ceq(audioIsDefault,false);
	}
	/** @private @arg {D_Card} x */
	D_Card(x) {
		const cf="D_Card";
		const {teaser,content,cueRanges,icon,trackingParams,cardId,feature,...y}=this.s(cf,x); this.g(y);
		this.R_SimpleCardTeaser(teaser);
		this.t_cf(`${cf}$content`,content,(cf,x) => {
			if("collaboratorInfoCardContentRenderer" in x) return this.R_CollaboratorInfoCardContent(x);
			if("playlistInfoCardContentRenderer" in x) return this.R_PlaylistInfoCardContent(x);
			this.codegen_typedef(cf,x);
		});
		this.z(cueRanges,this.D_CueRangeItem);
		this.trackingParams(trackingParams);
		this.t(cardId,this.a_primitive_str);
		this.t(feature,x => {
			if(x!=="cards") debugger;
		});
	}
	/** @private @arg {R_PlaylistInfoCardContent} x */
	R_PlaylistInfoCardContent(x) {this.H_("playlistInfoCardContentRenderer",x,this.D_PlaylistInfoCardContent);}
	/** @private @arg {D_PlaylistInfoCardContent} x */
	D_PlaylistInfoCardContent(x) {x;}
	/** @private @arg {R_CollaboratorInfoCardContent} x */
	R_CollaboratorInfoCardContent(x) {this.H_("collaboratorInfoCardContentRenderer",x,this.D_CollaboratorInfoCardContent);}
	/** @private @arg {D_CollaboratorInfoCardContent} x */
	D_CollaboratorInfoCardContent(x) {x;}
	/** @private @arg {D_TrackingParams} x */
	D_InfoCardIcon(x) {this.D_TrackingParams("D_InfoCardIcon",x);}
	/** @private @arg {R_SimpleCardTeaser} x */
	R_SimpleCardTeaser(x) {this.H_("simpleCardTeaserRenderer",x,this.D_SimpleCardTeaser);}
	/** @arg {`${number}`} x */
	_bd=x => this.mb(this.parse_number_template,this.m(x));
	/** @arg {`${number}`} x */
	_pn=x => this.mb(this.a_primitive_num,this._bd(x));
	/** @arg {string} cf @arg {M_Optional<number>} x */
	_ns=(cf,x) => this.mb(x => this.save_number_one(cf,x),x);
	/** @arg {string} cf @arg {string} k @arg {`${number}`} x */
	_ns_cf(cf,k,x) {this._ns(`${cf}.${k}`,this._bd(x));}
	get ns() {return this._ns.bind(this);}
	get bd() {return this._bd.bind(this);}
	get pn() {return this._pn.bind(this);}
	get nsf() {return this._ns_cf.bind(this);}
	/** @private @arg {D_CueRangeItem} x */
	D_CueRangeItem(x) {
		const cf="D_CueRangeItem";
		const {startCardActiveMs,endCardActiveMs,teaserDurationMs,iconAfterTeaserMs,...y}=this.s(cf,x); this.g(y);
		let {pn,nsf,exact_arr: a}=this;
		this.z([startCardActiveMs,endCardActiveMs],pn);
		this.z([a("teaserDurationMs",teaserDurationMs),a("iconAfterTeaserMs",endCardActiveMs)],x => nsf(cf,x[0],x[1]));
	}
	/** @private @arg {D_SimpleCardTeaser} x */
	D_SimpleCardTeaser(x) {
		const cf="D_SimpleCardTeaser";
		const {message,trackingParams,prominent,logVisibilityUpdates,onTapCommand,...y}=this.s(cf,x); this.g(y);
		this.G_Text(message);
		this.trackingParams(trackingParams);
		this.ceq(prominent,true);
		this.ceq(logVisibilityUpdates,true);
		this.t(onTapCommand,this.A_ChangeEngagementPanelVisibility);
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
class Support_RS_WatchPage extends ServiceMethods {
	/** @public @arg {G_RS_WatchPage} x */
	RS_WatchPage(x) {
		const cf="R_WatchPage"; this.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: return this.RS_VE3832_Page_Watch(x);
			default: debugger; return;
		}
		this.RS_Page_Watch(x);
	}
	/** @private @arg {RS_VE3832_Page_Watch} x */
	RS_VE3832_Page_Watch(x) {
		const cf="R_WatchPage_VE3832"; this.k(cf,x);
		const {page: {},rootVe,url,endpoint,preconnect,playerResponse,response,csn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(rootVe!==3832) debugger;
		let wp_params=this.ht.D_WatchPageUrl(cf,url);
		wp_params&&this.save_keys(`VE3832.${cf}.wp_params`,wp_params);
		this.E_Watch(endpoint);
		if(preconnect!==void 0) this.ht.parse_preconnect_arr(preconnect);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.x.get("x_RS_Watch").RS_Watch(response);
		this.t(csn,x => this.D_VeCsn(x));
	}
	/** @private @arg {RS_Page_Watch} x */
	RS_Page_Watch(x) {
		const cf="RS_Page_Watch"; this.k(cf,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Watch(endpoint);
		this.x.get("x_RS_Watch").RS_Watch(response);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		let wp_params=this.ht.D_WatchPageUrl(cf,url);
		wp_params&&this.save_keys(`${cf}.wp_params`,wp_params);
		this.t(previousCsn,x => this.D_VeCsn(x,true));
	}
}
class Support_RS_Watch extends ServiceMethods {
	/** @public @arg {RS_Watch} x */
	RS_Watch(x) {
		const cf="RS_Watch";
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.R_TwoColumnWatchNextResults(contents);
		this.E_Watch(currentVideoEndpoint);
		this.trackingParams(trackingParams);
		this.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => this.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,x => this.R_EngagementPanelSectionList(x));
		this.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,x => this.R_CinematicContainer(x));
		this.D_FrameworkUpdates(frameworkUpdates);
	}
}
class Support_RS_Page_Browse extends ServiceMethods {
	/** @public @arg {RS_Page_Browse} x */
	RS_Page_Browse(x) {
		const cf="RS_Page_Browse";
		if("rootVe" in x) {
			switch(x.rootVe) {
				case 3854: {
					const {rootVe,expirationTime,...y}=this.RS_Page_Browse_Omit(cf,x); this.g(y);
					this._primitive_of(expirationTime,"number");
					this.save_number_one(`${cf}.rootVe`,rootVe);
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
class Support_RS_Browse extends ServiceMethods {
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
				if(jk==="header,trackingParams,onResponseReceivedActions") break x;
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
		this.RC_ResponseContext(responseContext);
		this.t(header,this.G_BrowseHeader);
		this.trackingParams(trackingParams);
		this.tz(onResponseReceivedActions,this.GA_ResponseReceived);
		this.tz_cf(cf,onResponseReceivedEndpoints,this.GE_ResponseReceived);
		this.t(contents,this.G_BrowseContents);
		this.t(topbar,this.R_DesktopTopbar);
		this.t(frameworkUpdates,this.R_EntityBatchUpdate);
		this.t(sidebar,this.G_BrowseSidebar);
		this.tz(observedStateTags,this.B_StateTag);
		this.t(cacheMetadata,this.D_Cache_MD);
		this.t(metadata,this.G_Browse_MD);
		this.t(microformat,this.R_Microformat);
		this.t(maxAgeStoreSeconds,x => this._primitive_of(x,"number"));
		this.t(background,this.R_MusicThumbnail);
		this.t(continuationContents,this.RC_SectionList);
		this.tz_cf(cf,alerts,this.RS_Playlist_AlertItem);
	}
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H_("feedTabbedHeaderRenderer",x,this.D_FeedTabbedHeader);}
	/** @private @arg {D_FeedTabbedHeader} x */
	D_FeedTabbedHeader(x) {
		const cf="D_FeedTabbedHeader";
		const {title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
	}
	/** @private @arg {G_BrowseHeader} x */
	G_BrowseHeader(x) {
		const cf="G_BrowseHeader";
		if("feedTabbedHeaderRenderer" in x) return this.R_FeedTabbedHeader(x);
		if("c4TabbedHeaderRenderer" in x) return this.xr.R_C4TabbedHeader(x);
		if("playlistHeaderRenderer" in x) return this.xr.R_PlaylistHeader(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {this.H_("musicThumbnailRenderer",x,this.D_MusicThumbnail);}
	/** @private @arg {D_MusicThumbnail} x */
	D_MusicThumbnail(x) {
		const cf="D_MusicThumbnail";
		const {trackingParams: a,thumbnail,thumbnailCrop,thumbnailScale,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(a);
		this.D_Thumbnail(thumbnail);
		if(thumbnailCrop!=="MUSIC_THUMBNAIL_CROP_UNSPECIFIED") debugger;
		if(thumbnailScale!=="MUSIC_THUMBNAIL_SCALE_UNSPECIFIED") debugger;
	}
	/** @private @arg {G_Browse_MD} x */
	G_Browse_MD(x) {
		const cf="G_Browse_MD";
		if("channelMetadataRenderer" in x) return this.xr.R_Channel_MD(x);
		if("playlistMetadataRenderer" in x) return this.xr.R_Playlist_MD(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_BrowseSidebar} x */
	G_BrowseSidebar(x) {
		const cf="G_BrowseSidebar";
		if("settingsSidebarRenderer" in x) return this.xr.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.xr.R_PlaylistSidebar(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {let [a,y]=this.TE_Endpoint_2("C_ResetChannelUnreadCount","resetChannelUnreadCountCommand",x); this.g(y); this.DC_ResetChannelUnreadCount(a);}
	/** @private @arg {DC_ResetChannelUnreadCount} x */
	DC_ResetChannelUnreadCount(x) {
		const cf="DC_ResetChannelUnreadCount";
		const {channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(channelId);
	}
	/** @private @arg {GA_ResponseReceived} x */
	GA_ResponseReceived(x) {
		const cf="GA_ResponseReceived";
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		if("appendContinuationItemsAction" in x) return this.A_AppendContinuationItems(x);
		if("reloadContinuationItemsCommand" in x) return this.C_ReloadContinuationItems(x);
		if("resetChannelUnreadCountCommand" in x) return this.C_ResetChannelUnreadCount(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_BrowseContents} x */
	G_BrowseContents(x) {
		const cf="G_BrowseContents";
		if("twoColumnBrowseResultsRenderer" in x) return this.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {RC_SectionList} x */
	RC_SectionList(x) {this.H_("sectionListContinuation",x,this.GD_RC_SectionList);}
}
class Support_GenericApi extends ServiceMethods {
	// //#region TODO
	/** @private @arg {Popup_NotificationMenu} x */
	D_NotificationMenu_Popup(x) {
		const cf="D_NotificationMenu_Popup";
		const {popupType: a,popup: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(a!=="DROPDOWN") {this.codegen_typedef(cf,x); return null;}
		return b;
	}
	//#endregion
	/** @public @arg {Response} response @arg {G_ResponseTypes} x */
	G_ResponseTypes(response,x) {
		const cf="G_ResponseTypes"; this.ks(cf,x);
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
		this.RC_ResponseContext(v.data.responseContext);
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
			case "reel.reel_item_watch": return this.ht.RSW_ReelItem(x.data);
			case "reel.reel_watch_sequence": return this.ht.RS_ReelWatchSequence(x.data);
			case "share.get_share_panel": return this.ht.RSG_SharePanel(x.data);
			case "subscription.subscribe": return this.ht.RS_Subscribe(x.data);
			case "subscription.unsubscribe": return this.ht.RS_Unsubscribe(x.data);
			case "search": return this.ht.RS_Search(x.data);
			case "updated_metadata": return this.ht.RSU_M(x.data);
			case "pdg.get_pdg_buy_flow": return this.ht.RSG_PdgBuyFlow(x.data);
			default: debugger; return g(x);
		}
	}
	/** @private @arg {RSG_AddToPlaylist} x */
	RSG_AddToPlaylist(x) {
		const cf="RS_GetAddToPlaylist";
		const {responseContext: {},contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_AddToPlaylist);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSB_EditPlaylist} x */
	RSB_EditPlaylist(x) {
		const cf="RSB_EditPlaylist";
		const {responseContext: {},status,actions,playlistEditResults,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="STATUS_SUCCEEDED") debugger;
		let [r]=this.z(actions,x => {
			if("refreshPlaylistCommand" in x) return this.C_RefreshPlaylist(x);
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
		});
		this.z(r,a => a);
		this.z(playlistEditResults,this.g);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSG_NotificationMenu} x */
	RSG_NotificationMenu(x) {
		const cf="RSG_NotificationMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let [ar]=this.z(actions,this.RSG_NotificationMenu_Action);
		let [u2]=this.z(ar,this.D_NotificationMenu_Popup);
		let [u3]=this.z(u2,x => this.TR_MultiPageMenu("D_NotificationMenu_PopupItemMenu",x));
		this.z(u3,this.D_NotificationMenu_PopupItem);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSM_ChannelPreference} x */
	RSM_ChannelPreference(x) {
		const cf="RSM_ChannelPreference";
		const {responseContext,actions,trackingParams,frameworkUpdates,channelId,newNotificationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		let [u1]=this.z(actions,x => {
			if(!x.openPopupAction) debugger;
			let a=this.TA_OpenPopup(cf,x);
			return this.T_OpenPopup_Toast(a);
		});
		this.z(u1,this.RA_Notification);
		this.trackingParams(trackingParams);
		this.R_EntityBatchUpdate(frameworkUpdates);
		this.D_ChannelId(channelId);
		this.R_SubscriptionNotificationToggleButton(newNotificationButton);
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
		if(unseenCount!==void 0) this.a_primitive_num(unseenCount);
	}
	/** @private @arg {A_NotificationMenuPopup} x */
	RSG_NotificationMenu_Action(x) {
		const cf="RSG_NotificationMenu_Action";
		if("openPopupAction" in x) return this.TA_OpenPopup("RSG_NotificationMenu_Action",x);
		x===""; this.codegen_typedef(cf,x);
		return null;
	}
	/** @private @arg {AU_NotificationsUnseenCount} x */
	AU_NotificationsUnseenCount(x) {let [a,y]=this.TE_Endpoint_2("AU_NotificationsUnseenCount","updateNotificationsUnseenCountAction",x); this.g(y); this.AD_UpdateNotificationsUnseenCount(a);}
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
		this.a_primitive_str(handlerData);
		this.a_primitive_num(unseenCount);
		this.a_primitive_num(timeoutMs);
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
		this.R_CompactLink(openCreateLink);
		this.R_TextInputFormField(nameInput);
		this.R_Dropdown(privacyInput);
		this.R_Button(createAction);
		this.E_CreatePlaylistService(serviceEndpoint);
	}
	/** @private @arg {R_PlaylistAddToOption} x */
	R_PlaylistAddToOption(x) {this.H_("playlistAddToOptionRenderer",x,this.D_PlaylistAddToOption);}
	/** @private @arg {C_RefreshPlaylist} x */
	C_RefreshPlaylist(x) {let [a,y]=this.TE_Endpoint_2("C_RefreshPlaylist","refreshPlaylistCommand",x); this.g(y); this.g(a);}
	/** @private @arg {D_NotificationMenu_Popup_SectionItem} x */
	D_NotificationMenu_Popup_SectionItem(x) {
		const cf="D_NotificationMenu_Popup_SectionItem";
		if("multiPageMenuNotificationSectionRenderer" in x) return this.R_MP_MenuNotificationSection(x);
		x===""; this.codegen_typedef(cf,x);
		return null;
	}
	/** @private @arg {D_PopupItemMenu} x */
	D_NotificationMenu_PopupItem(x) {
		const cf="D_NotificationMenu_PopupItem";
		const {header,sections,style,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._R_SimpleMenuHeader(header);
		this.z(sections,this.D_NotificationMenu_Popup_SectionItem);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlaylistAddToOption} x */
	D_PlaylistAddToOption(x) {
		const cf="D_PlaylistAddToOption";
		const {playlistId,title,privacy,containsSelectedVideos,privacyIcon,addToPlaylistServiceEndpoint,removeFromPlaylistServiceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.playlistId(playlistId);
		this.G_Text(title);
		switch(privacy) {
			default: debugger; break;
			case "PRIVATE":
			case "UNLISTED":
			case "PUBLIC":
		}
		this.ceq(containsSelectedVideos,"NONE");
		this.ceq(privacyIcon.iconType,"PRIVACY_PRIVATE");
		this.E_PlaylistEdit(addToPlaylistServiceEndpoint);
		this.E_PlaylistEdit(removeFromPlaylistServiceEndpoint);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {R_SimpleMenuHeader} x */
	_R_SimpleMenuHeader(x) {this.H_("simpleMenuHeaderRenderer",x,this.D_SimpleMenuHeader);}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {
		const cf="D_SimpleMenuHeader";
		const {title,buttons,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(buttons,this.R_Button);
	}
	/** @private @arg {R_TextInputFormField} x */
	R_TextInputFormField(x) {this.H_("textInputFormFieldRenderer",x,this.D_TextInputFormField);}
	/** @private @arg {D_TextInputFormField} x */
	D_TextInputFormField(x) {
		const cf="D_TextInputFormField";
		const {label,maxCharacterLimit,placeholderText,validValueRegexp,invalidValueErrorMessage,required,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(label);
		if(maxCharacterLimit!==150) debugger;
		this.a_primitive_str(placeholderText);
		if(validValueRegexp!=="[^<>]*") debugger;
		this.G_Text(invalidValueErrorMessage);
		this.ceq(required,true);
	}
	/** @private @arg {R_Dropdown} x */
	R_Dropdown(x) {this.H_("dropdownRenderer",x,this.D_Dropdown);}
	/** @private @arg {D_Dropdown_Privacy} x */
	D_Dropdown(x) {
		const cf="D_Dropdown";
		const {entries,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entries,this.R_PrivacyDropdownItem);
		if(label!=="Privacy") debugger;
	}
	/** @private @arg {R_MP_MenuNotificationSection} x */
	R_MP_MenuNotificationSection(x) {this.H_("multiPageMenuNotificationSectionRenderer",x,this.D_MP_MenuNotificationSection);}
	/** @private @arg {D_MP_MenuNotificationSection} x */
	D_MP_MenuNotificationSection(x) {
		const cf="D_MP_MenuNotificationSection";
		const {trackingParams,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z(items,this.GR_MP_MenuNotificationSection_Item);
	}
	/** @private @arg {R_PrivacyDropdownItem} x */
	R_PrivacyDropdownItem(x) {this.H_("privacyDropdownItemRenderer",x,this.D_PrivacyDropdownItem);}
	/** @private @arg {D_PrivacyDropdownItem} x */
	D_PrivacyDropdownItem(x) {
		const cf="D_PrivacyDropdownItem";
		const {label,icon,description,int32Value,isSelected,accessibility,...y}=this.s(cf,x); this.g(y);
		this.G_Text(label);
		if(icon.iconType!=="PRIVACY_PUBLIC") debugger;
		this.G_Text(description);
		if(int32Value!==1) debugger;
		if(isSelected!==false) debugger;
		this.D_Label(accessibility);
	}
	/** @private @arg {GR_MP_MenuNotificationSection_Item} x */
	GR_MP_MenuNotificationSection_Item(x) {
		const cf="R_MP_MenuNotificationSection_Item";
		if("notificationRenderer" in x) return this.R_Notification(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_Notification} x */
	R_Notification(x) {this.H_("notificationRenderer",x,this.D_Notification);}
	/** @private @arg {D_Notification} x */
	D_Notification(x) {
		const cf="D_Notification";
		const {trackingParams,thumbnail,videoThumbnail,shortMessage,sentTimeText,navigationEndpoint,read,recordClickEndpoint,contextualMenu,notificationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z([thumbnail,videoThumbnail],this.D_Thumbnail);
		this.z([shortMessage,sentTimeText],this.G_Text);
		if(navigationEndpoint.watchEndpoint) {this.E_Watch(navigationEndpoint);} else {debugger;}
		this._primitive_of(read,"boolean");
		if(recordClickEndpoint.recordNotificationInteractionsEndpoint) {this.E_RecordNotificationInteractions(recordClickEndpoint);}
		this.R_Menu(contextualMenu);
		this.parse_number_template(notificationId);
	}
}
class Support_EventInput extends ServiceMethods {
	/** @private @arg {E_Settings} x */
	E_Settings(x) {
		const cf="E_Settings";
		const {_tag,...y}=this.s(cf,x); this.g(y);
		if(_tag!=="E_Settings") debugger;
	}
	/** @arg {{endpoint:TE_VE<number>}} x @template {number} T @arg {T} t @returns {x is {endpoint:TE_VE<T>}} */
	is_EP_Val(x,t) {return this.is_TE_VE(x.endpoint,t);}
	/** @private @arg {R_PageTypeBrowse["response"]} x */
	R_PageTypeBrowse_Response(x) {
		const cf="R_PageTypeBrowse_Response";
		if("rootVe" in x) {
			switch(x.rootVe) {
				default: debugger; break;
				case 3854: {
					const {rootVe,page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); y;/*#destructure_done*/
					switch(url) {
						default: debugger; switch(url) {
							case "/":
						} break;
						case "/":
					}
				} break;
			}
			return;
		}
		if(this.is_EP_Val(x,3854)) {
			let u=this.RS_Page_Type1(cf,x,{
				page: x => this.ceq(x,"browse"),
				endpoint: x => this.E_VE3854(x),
				response: x => this.x.get("x_RS_Browse").RS_Browse(x),
				/** @arg {R_VE3854_PageType_Browse_Response["url"]} x */
				url(x) {
					switch(x) {
						default: x===""; debugger; switch(x) {
							case "/":
						} break;
						case "/":
					}
				},
				expirationTime: x => this.t(x,this.a_primitive_num),
			});
			if(this.is_empty_obj(u)) return;
			const {graftedVes,csn,...y}=u; this.g(y);
			this.z(graftedVes,this.D_GraftedVeItem);
			this.D_VeCsn(csn);
			return;
		}
		if(this.is_EP_Val(x,6827)) return this.g(this.RS_Page_Type1(cf,x,{
			/** @arg {R_VE6827_PageType_Browse_Response["url"]} url */
			url: (url) => {
				if(this.str_is_search(url)) {
					let up=split_string_once(url,"?");
					switch(up[0]) {
						default: up[0]===""; debugger; switch(up[0]) {
							case "/":
						} break;
						case "/feed/trending": {
							let {bp,...y}=this.parse_url_search_params(up[1]); this.g(y);
							this.params("trending.bp",bp);
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
			/** @arg {R_VE96368_PageType_Browse_Response["url"]} url */
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
	/** @private @arg {R_PageTypeBrowse} x */
	R_PageTypeBrowse(x) {
		const cf="R_PageTypeBrowse";
		if(this.is_EP_Val(x,3854)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.E_VE3854(endpoint);
			this.R_PageTypeBrowse_Response(response);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.a_primitive_num(navigationDoneMs);
			return;
		}
		if(this.is_EP_Val(x,6827)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.R_PageTypeBrowse_Response(response);
			this.E_VE6827(endpoint);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.a_primitive_num(navigationDoneMs);
			return;
		}
		if(this.is_EP_Val(x,96368)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.R_PageTypeBrowse_Response(response);
			this.E_VE96368(endpoint);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.a_primitive_num(navigationDoneMs);
			return;
		}
		debugger;
	}
	/** @private @arg {R_PageTypeChannel} x */
	R_PageTypeChannel(x) {
		const cf="R_PageTypeChannel";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DataResponsePageType(response);
		this.E_VE3611(endpoint);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypePlaylist} x */
	R_PageTypePlaylist(x) {
		const cf="R_PageTypePlaylist";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_VE5754(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeSearch} x */
	R_PageTypeSearch(x) {
		const cf="R_PageTypeSearch";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_VE4724_Search(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeSettings} x */
	R_PageTypeSettings(x) {
		const cf="R_PageTypeSettings";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Settings(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeShorts} x */
	R_PageTypeShorts(x) {
		const cf="R_PageTypeShorts";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.x.get("x_VE37414").E_VE37414_ReelWatch(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeWatch} x */
	R_PageTypeWatch(x) {
		const cf="R_PageTypeWatch";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Watch(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @public @arg {YTNavigateFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const cf="YTNavigateFinishDetail"; this.k(cf,x);
		switch(x.pageType) {
			default: debugger; break;
			case "browse": return this.R_PageTypeBrowse(x);
			case "channel": return this.R_PageTypeChannel(x);
			case "playlist": return this.R_PageTypePlaylist(x);
			case "search": return this.R_PageTypeSearch(x);
			case "settings": return this.R_PageTypeSettings(x);
			case "shorts": return this.R_PageTypeShorts(x);
			case "watch": return this.R_PageTypeWatch(x);
		}
	}
	/** @private @arg {DataResponsePageType} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType";
		this.RC_ResponseContext(x.response.responseContext);
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
		x===""; this.codegen_typedef(cf,x);
	}
	/**
	 * @template {CF_RS_Page_Type1} T_CF @arg {T_CF} cf @template {{page:string,endpoint:any,response:any,url:string,expirationTime?:number}} T @arg {T} x
	 * @arg {T_MakeHandlers<T>} handlers
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
	/** @private @arg {RS_Page_Channel} x */
	RS_Page_Channel(x) {
		const cf="RS_Page_Channel";
		/** @arg {RS_Page_Channel["url"]} url */
		const h_url=url => {
			let [a,u]=split_string_once(url,"/"); this.ceq(a,"");
			let c=split_string_once(u,"/");
			if(c.length===1) {
				return;
			}
			switch(c[0]) {
				case "c": {
					let [d,e]=c;
					this.ceq(d,"c");
					let f=split_string_once(e,"/");
					if(f.length===2) debugger;
					return;
				}
			}
			let [d,e]=c;
			if(!d.startsWith("@")) debugger;
			if(this.str_is_search(e)) {
				let [p,s]=split_string_once(e,"?");
				if(p!=="search") debugger;
				let {query,...y}=this.parse_url_search_params(s); this.g(y);
				this.a_primitive_str(query);
				return;
			}
			switch(e) {
				default: e===""; debugger; break;
				case "search": case "shorts": case "featured":
				case "about": case "videos": case "playlists": case "community": case "channels": case "shorts":
			}
		};
		/** @arg {(typeof x)["endpoint"]} x */
		let h_ep=x => {
			if(this.is_TE_VE(x,3611)) return this.E_VE3611(x);
			debugger;
		};
		/** @arg {(typeof x)["response"]} x */
		let h_rs=x => this.ht.RS_Channel(x);
		/** @arg {(typeof x)["expirationTime"]} x */
		let h_et=x => this.a_primitive_num(x);
		/** @type {T_MakeHandlers<typeof x>} */
		const h_d={
			page: x => this.ceq(x,"channel"),
			endpoint: h_ep,
			response: h_rs,
		};
		if(!this.is_EP_Val(x,3611)) debugger;
		if("previousCsn" in x) {
			/** @type {T_MakeHandlers<typeof x>} */
			const handlers={...h_d,url: h_url,expirationTime: h_et};
			let {previousCsn,...u1}=this.RS_Page_Type1(cf,x,handlers); this.g(u1);
			this.D_VeCsn(previousCsn,true);
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
			if(rootVe!==3611) debugger;
			this.t(csn,this.D_VeCsn);
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
			this.t(csn,this.D_VeCsn);
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
		if(this.is_not_empty_obj(y)) debugger;
	}
	/** @private @arg {G_RS_Page_Playlist} x */
	G_RS_Page_Playlist(x) {
		const cf="R_PlaylistPage";
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(page!=="playlist") debugger;
		this.E_VE5754(endpoint);
		this.RS_Playlist(response);
		this.a_primitive_str(url);
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
	/** @private @arg {G_RS_Page_Settings} x */
	G_RS_Page_Settings(x) {
		const cf="R_SettingsPage";
		if("rootVe" in x) return this.RS_VE23462_Page_Settings(x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		debugger;
		this.RS_Settings(response);
		this.a_primitive_str(url);
	}
	/** @private @arg {G_RS_Page_Shorts} x */
	G_RS_Page_Shorts(x) {
		const cf="RS_ShortsPage";
		if("rootVe" in x) return this.RS_VE37414_Shorts(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,previousCsn,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="shorts") debugger;
		this.x.get("x_VE37414").E_VE37414_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.t(reelWatchSequenceResponse,x => this.ht.RS_ReelWatchSequence(x));
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(previousCsn,x => this.D_VeCsn(x,true));
		this.t(cachedReelWatchSequenceResponse,x => this.ht.RS_ReelWatchSequence(x));
	}
	/** @private @arg {RS_Page_Search} x */
	RS_Page_Search(x) {
		const cf="RS_SearchPage";
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="search") debugger;
		this.E_VE4724_Search(endpoint);
		this.ht.RS_Search(response);
		if(!this.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @private @arg {D_GraftedVeItem} x */
	D_GraftedVeItem(x) {
		const cf="D_GraftedVeItem";
		const {veData,csn,...y}=this.s(cf,x); this.g(y);
		this.D_VeCsn(csn);
	}
	/** @private @arg {RS_VE23462_Page_Settings} x */
	RS_VE23462_Page_Settings(x) {
		const cf="Settings_VE23462";
		const {page,endpoint,response,url,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		debugger;
		this.RS_Settings(response);
		this.a_primitive_str(url);
		if(rootVe!==23462) debugger;
	}
	/** @private @arg {RS_VE37414_Shorts} x */
	RS_VE37414_Shorts(x) {
		const cf="Shorts_VE37414";
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(rootVe!==37414) debugger;
		if(page!=="shorts") debugger;
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.x.get("x_VE37414").E_VE37414_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.t(reelWatchSequenceResponse,x => this.ht.RS_ReelWatchSequence(x));
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		if(!cachedReelWatchSequenceResponse) debugger;
		this.ht.RS_ReelWatchSequence(cachedReelWatchSequenceResponse);
	}
	/** @private @arg {RS_Reel} x */
	RS_Reel(x) {
		const cf="RS_Reel";
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(trackingParams);
		this.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {this.z(engagementPanels,this.R_EngagementPanelSectionList);}
	}
	/** @private @arg {RS_Playlist} x */
	RS_Playlist(x) {
		const cf="RS_Playlist";
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.xr.R_PlaylistHeader(header);
		this.tz_cf(cf,alerts,this.RS_Playlist_AlertItem);
		this.xr.R_Playlist_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.R_Microformat(microformat);
		this.xr.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {RS_Settings} x */
	RS_Settings(x) {
		const cf="RS_Settings";
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.xr.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D_Tab_WhatToWatch} x */
	D_Tab_WhatToWatch(x) {
		const {selected,content,tabIdentifier: {},trackingParams,...y}=this.s("D_Tab_WhatToWatch",x); this.g(y);
		this.ceq(selected,true);
		this.ht.R_RichGrid(content);
		this.trackingParams(trackingParams);
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
				default: this.codegen_typedef(`${cf}_${ux.tabIdentifier}`,x,false); break;
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
			this.ht.R_MusicQueue(content);
			this.trackingParams(trackingParams);
			return;
		}
		x: {
			if(!("endpoint" in x)) break x;
			/** @type {`${typeof cf}_WithEndpoint`} */
			const cf2=`${cf}_WithEndpoint`;
			const {endpoint,title,trackingParams,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
			y: {
				if(this.is_TE_VE(endpoint,3611)) {this.E_VE3611(endpoint); break y;}
				debugger;
			}
			this.trackingParams(trackingParams);
			this.save_string(`${cf2}.title`,title);
		}
	}
	/** @private @arg {D_Tab_History} x */
	D_Tab_History(x) {
		const cf="D_Tab_History";
		const {selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);
		if(selected!==true) debugger;
		if(!content.sectionListRenderer) debugger;
		this.R_SectionList(content);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_Tab_Subscriptions} x */
	D_Tab_Subscriptions(x) {
		const cf="D_Tab_Subscriptions";
		const {endpoint,selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.D_Tab_Subscriptions_EP(endpoint);
		this.ceq(selected,true);
		this.R_SectionList(content);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {Extract<D_Tab,{tabIdentifier:"FEsubscriptions"}>["endpoint"]} x */
	D_Tab_Subscriptions_EP(x) {
		const cf="D_Tab_Subscriptions_EP";
		if(this.is_TE_VE(x,96368)) return this.E_VE96368(x);
		x===""; this.codegen_typedef(cf,x);
	}
}
class Support_VE extends ServiceMethods {
	/** @public @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {this.H_("vssLoggingContext",x,this.D_VssLoggingContext);}
	/** @public @arg {D_VssLoggingContext} x */
	D_VssLoggingContext(x) {
		const cf="D_VssLoggingContext";
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("logging_context.serialized_context_data",serializedContextData);
	}
}
class Support_VE37414 extends ServiceMethods {
	/** @private @arg {D_SerializedContextData} x */
	D_QoeLoggingContext(x) {
		const cf="D_QoeLoggingContext";
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("logging_context.serialized_context_data",serializedContextData);
	}
	/** @private @arg {DE_ReelWatch} x */
	DE_VE37414_ReelWatch(x) {
		const cf="DE_ReelWatch";
		if("videoId" in x) {
			const {videoId,playerParams,thumbnail,overlay,params,loggingContext,sequenceProvider,sequenceParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.t(videoId,this.videoId);
			this.params("reel.player_params",playerParams);
			this.t(thumbnail,this.D_Thumbnail);
			this.R_ReelPlayerOverlay(overlay);
			this.params("reel.params",params);
			if(loggingContext) {
				this.x.get("x_VE").D_VssLoggingContext(loggingContext.vssLoggingContext);
				this.D_QoeLoggingContext(loggingContext.qoeLoggingContext);
			}
			this.t(sequenceProvider,x => this.ceq(x,"REEL_WATCH_SEQUENCE_PROVIDER_RPC"));
			this.t(sequenceParams,x => this.params("reel.sequence_params",x));
			return;
		}
		if("inputType" in x) {
			const {playerParams,overlay,params,sequenceProvider,inputType,loggingContext,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.params("reel.player_params",playerParams);
			this.R_ReelPlayerOverlay(overlay);
			this.params("reel.params",params);
			this.t(sequenceProvider,x => {if(x!=="REEL_WATCH_SEQUENCE_PROVIDER_RPC") debugger;});
			this.t(inputType,x => {if(x!=="REEL_WATCH_INPUT_TYPE_SEEDLESS") debugger;});
			if(loggingContext) {
				this.x.get("x_VE").D_VssLoggingContext(loggingContext.vssLoggingContext);
				this.D_QoeLoggingContext(loggingContext.qoeLoggingContext);
			}
			return;
		}
		this.g(x);
	}
	/** @public @arg {E_VE37414_ReelWatch} x */
	E_VE37414_ReelWatch(x) {const [a,b,y]=this.TE_Endpoint_3("E_VE37414_ReelWatch","reelWatchEndpoint",x); this.g(y); this.M_VE37414(a); this.DE_VE37414_ReelWatch(b);}
	/** @public @arg {M_VE37414} x */
	M_VE37414(x) {this.T_WCM("M_VE37414",x,this.GM_VE37414);}
	/** @public @arg {GM_VE37414} x @returns {`VE${rootVe}`} */
	GM_VE37414(x) {
		const cf="GM_VE37414_WC";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			if(url==="/shorts/") break x;
			let up=split_string_once(url,"/");
			let [p1,p2]=up; if(p1!=="") debugger;
			let u2=split_string_once(p2,"/");
			let [p3,p4]=u2; if(p3!=="shorts") debugger;
			this.videoId(p4);
		}
		if(webPageType!=="WEB_PAGE_TYPE_SHORTS") debugger;
		if(rootVe!==37414) debugger;
		return `VE${rootVe}`;
	}
}
/** @arg {typeof Support_Renderer} _class */
function export_Renderer(_class) {
	export_(exports => {exports.Support_Renderer=_class;});
}
class Support_Renderer extends ServiceMethods {
	static {export_Renderer(this);}
	//#region data members
	/** @type {Map<number,object>} */
	view_conversion_info=new Map;
	//#endregion
	/** @public @arg {R_SettingsSidebar} x */
	R_SettingsSidebar(x) {this.H_("settingsSidebarRenderer",x,this.D_SettingsSidebar);}
	/** @private @arg {D_SettingsSidebar} x */
	D_SettingsSidebar(x) {
		const cf="D_SettingsSidebar";
		const {title,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(items,this.R_CompactLink);
	}
	/** @public @arg {R_PlaylistSidebar} x */
	R_PlaylistSidebar(x) {this.H_("playlistSidebarRenderer",x,this.D_PlaylistSidebar);}
	/** @private @arg {R_PlaylistSidebarPrimaryInfo} x */
	R_PlaylistSidebarPrimaryInfo(x) {this.H_("playlistSidebarPrimaryInfoRenderer",x,this.D_PlaylistSidebarPrimaryInfo);}
	/** @private @arg {D_PlaylistSidebarPrimaryInfo} x */
	D_PlaylistSidebarPrimaryInfo(x) {
		const cf="D_PlaylistSidebarPrimaryInfo";
		const {thumbnailRenderer,title,stats,menu,navigationEndpoint,badges,description,showMoreText,titleForm,descriptionForm,privacyForm,...y}=this.D_Omit_ThumbnailOverlay(cf,x); this.g(y);
		this.R_PlaylistVideoThumbnail(thumbnailRenderer);
		this.t(title,this.G_Text);
		this.z(stats,this.G_Text);
		this.R_Menu(menu);
		this.E_Watch(navigationEndpoint);
		this.tz(badges,this.RMD_Badge);
		this.tg(description);
		this.G_Text(showMoreText);
		this.t(titleForm,this.R_InlineForm);
		this.t(descriptionForm,this.R_InlineForm);
		this.t(privacyForm,this.R_DropdownFormField);
	}
	/** @public @arg {R_PdgBuyFlow} x */
	R_PdgBuyFlow(x) {this.H_("pdgBuyFlowRenderer",x,this.D_PdgBuyFlow);}
	/** @private @arg {R_SuperVodBuyFlowContent} x */
	R_SuperVodBuyFlowContent(x) {this.H_("superVodBuyFlowContentRenderer",x,this.D_SuperVodBuyFlowContent);}
	/** @private @arg {R_PdgColorSlider} x */
	R_PdgColorSlider(x) {this.H_("pdgColorSliderRenderer",x,this.D_PdgColorSlider);}
	/** @private @arg {R_PdgCommentPreview} x */
	R_PdgCommentPreview(x) {this.H_("pdgCommentPreviewRenderer",x,this.D_PdgCommentPreview);}
	/** @private @arg {R_PdgBuyFlowHeader} x */
	R_PdgBuyFlowHeader(x) {this.H_("pdgBuyFlowHeaderRenderer",x,this.D_PdgBuyFlowHeader);}
	/** @private @arg {R_SingleColumnMusicWatchNextResults} x */
	R_SingleColumnMusicWatchNextResults(x) {this.H_("singleColumnMusicWatchNextResultsRenderer",x,this.R_Tabbed);}
	/** @private @arg {R_Tabbed} x */
	R_Tabbed(x) {this.H_("tabbedRenderer",x,this.R_WatchNextTabbedResults);}
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
			this.a_primitive_str(a);
		} else {
			const {identifier,serializedTemplateConfig: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			let idp=split_string_once(identifier,"|");
			if(idp[0]!=="bottom_sheet_list_option.eml") debugger;
			this.a_primitive_str(a);
		}
	}
	/** @public @arg {R_Transcript} x */
	R_Transcript(x) {this.H_("transcriptRenderer",x,this.D_Transcript);}
	/** @private @arg {D_Transcript} x */
	D_Transcript(x) {
		const cf="D_Transcript";
		const {trackingParams,content: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.R_TranscriptSearchPanel(a);
	}
	/** @public @arg {R_TwoColumnSearchResults} x */
	R_TwoColumnSearchResults(x) {this.H_("twoColumnSearchResultsRenderer",x,this.D_TwoColumnSearchResults);}
	/** @private @arg {D_TwoColumnSearchResults} x */
	D_TwoColumnSearchResults(x) {this.H_("primaryContents",x,this.R_SectionList);}
	/** @private @arg {R_TranscriptSegmentList} x */
	R_TranscriptSegmentList(x) {this.H_("transcriptSegmentListRenderer",x,this.D_TranscriptSegmentList);}
	/** @private @arg {D_TranscriptSegmentList} x */
	D_TranscriptSegmentList(x) {
		const cf="D_TranscriptSegmentList";
		const {initialSegments,noResultLabel,retryLabel,touchCaptionsEnabled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(initialSegments,this.R_TranscriptSegment);
		this.G_Text(noResultLabel);
		this.G_Text(retryLabel);
		this.a_primitive_bool(touchCaptionsEnabled);
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
		this.trackingParams(trackingParams);
		if(targetId!=="engagement-panel-searchable-transcript-search-panel") debugger;
	}
	/** @private @arg {R_TranscriptSegment} x */
	R_TranscriptSegment(x) {this.H_("transcriptSegmentRenderer",x,this.D_TranscriptSegment);}
	/** @private @arg {D_TranscriptSegment} x */
	D_TranscriptSegment(x) {
		const cf="D_TranscriptSegment";
		const {startMs,endMs,snippet,startTimeText,trackingParams,accessibility,targetId,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(startMs);
		this.a_primitive_str(endMs);
		this.G_Text(snippet);
		this.G_Text(startTimeText);
		this.trackingParams(trackingParams);
		this.D_Accessibility(accessibility);
		this.t(targetId,x => this.save_string(`${cf}.targetId`,x));
	}
	/** @private @arg {D_TranscriptFooter} x */
	D_TranscriptFooter(x) {this.H_("languageMenu",x,this.R_SortFilterSubMenu);}
	/** @public @arg {D_TimedTextApi} x */
	D_TimedTextApi(x) {
		const cf="D_TimedTextApi";
		let {v,caps,xoaf,xoadf,xosf,hl,ip,ipbits,expire,signature,sparams,key,kind,lang,...y}=this.s(cf,x); this.g(y);
		this.videoId(v);
		caps&&this.save_string(`${cf}.caps`,caps);
		this.save_string(`${cf}.xoaf`,xoaf);
		xoadf&&this.save_string(`${cf}.xoadf`,xoadf);
		xosf&&this.save_string(`${cf}.xosf`,xosf);
		this.save_string(`${cf}.hl`,hl);
		this.save_string(`${cf}.ip`,ip);
		this.save_string(`${cf}.ipbits`,ipbits);
		let e_num=this.parse_number_template(expire);
		if(Number.isNaN(e_num)) debugger;
		this.a_primitive_num(e_num);
		this.ht.parse_signature(signature);
		this.save_string(`${cf}.sparams`,sparams);
		this.save_string(`${cf}.key`,key);
		kind&&this.save_string(`${cf}.kind`,kind);
		this.save_string(`${cf}.lang`,lang);
	}
	/** @private @arg {R_WatchNextTabbedResults} x */
	R_WatchNextTabbedResults(x) {this.H_("watchNextTabbedResultsRenderer",x,this.D_WatchNextTabbedResults);}
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
			this.E_VE3611(navigationEndpoint);
			this.D_Thumbnail(thumbnail);
			this.D_LiveBroadcastingBadge(badges);
			this.trackingParams(trackingParams);
			this.G_Text(formattedTitle);
			this.D_Accessibility(accessibility);
			this.R_GuideEntryData(entryData);
			switch(presentationStyle) {
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT":
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NONE": break;
				default: console.log(`[D_GuideEntry_PresentationType]\n\n\ncase"${presentationStyle}":`); break;
			}
			return;
		}
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {"D_GuideEntry"} cf @arg {Extract<D_GuideEntry,{targetId:any;}>|D_GuideEntry_OfflineDownloadEntry|D_GuideEntry_VideoLibrary} x */
	D_GuideEntry_WithTargetId(cf,x) {
		const {navigationEndpoint,icon,targetId,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
		{
			let x2=navigationEndpoint;
			if(this.is_TE_VE(x2,6827)) return this.E_VE6827(x2);
			if(this.is_TE_VE(x2,42352)) return this.E_VE42352(x2);
			debugger;
		}
		if(icon.iconType!=="VIDEO_LIBRARY_WHITE") debugger;
		this.T_Icon_AnyOf("D_GuideEntry_Icon",icon,["OFFLINE_DOWNLOAD","VIDEO_LIBRARY_WHITE"]);
		this.D_GuideEntry_TargetId(targetId);
		if(isPrimary!==true) debugger;
	}
	/** @private @arg {"D_GuideEntry"} cf1 @arg {D_GuideEntry} x */
	D_GuideEntry_WithIcon(cf1,x) {
		const cf2="D_GuideEntry_WithIcon";
		if("entryData" in x) {
			if("icon" in x) {
				const {navigationEndpoint,icon,entryData,...y}=this.D_GuideEntry_Omit(cf1,x); this.g(y);
				this.E_VE5754(navigationEndpoint);
				switch(icon.iconType) {
					default: icon===""; this.codegen_typedef(cf1,x); break;
					case "LIKES_PLAYLIST": case "PLAYLISTS":
				}
				return this.R_GuideEntryData(entryData);
			}
			const {...u}=this.D_GuideEntry_Omit(cf1,x);
			const {entryData,navigationEndpoint,thumbnail,badges,presentationStyle,...y}=this.s(cf2,u); this.g(y);/*#destructure_done*/
			this.R_GuideEntryData(entryData);
			if(!navigationEndpoint.browseEndpoint) debugger;
			if(presentationStyle!=="GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT") debugger;
			this.D_Thumbnail(thumbnail);
			this.D_LiveBroadcastingBadge(badges);
			return;
		}
		if("navigationEndpoint" in x) return this.D_GuideEntry_WithNavEP(cf1,x);
		if("isPrimary" in x) return this.D_GuideEntry_WithPrimary(cf1,x);
		if("serviceEndpoint" in x) {
			const {accessibility,formattedTitle,icon,serviceEndpoint,trackingParams,...y}=this.s(cf1,x); this.g(y);
			this.D_Accessibility(accessibility);
			this.G_Text(formattedTitle);
			let is_not_in_set=this.T_Icon_AnyOf("D_GuideEntry_WithIcon:icon",icon,this.D_GuideEntry_IconType.WithIcon);
			if(is_not_in_set) this.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithIcon,this.D_GuideEntry_MissingIconType);
			/** @type {`${cf2}.SE_Signal`} */
			const cf3=`${cf2}.SE_Signal`;
			let [a,b]=this.T_SE_Signal(cf3,serviceEndpoint);
			this.M_SendPost(a);
			this.G_ClientSignal(b);
			this.trackingParams(trackingParams);
			return;
		}
		if("icon" in x&&"trackingParams" in x&&"formattedTitle" in x&&"accessibility" in x) {
			const {icon,trackingParams,formattedTitle,accessibility,...y}=this.s(cf1,x); this.g(y);
			this.D_Accessibility(accessibility);
			this.trackingParams(trackingParams);
			this.G_Text(formattedTitle);
			this.D_Accessibility(accessibility);
			return;
		}
		this.codegen_typedef(cf1,x);
	}
	/** @private @template {Extract<D_GuideEntry,{accessibility:any}>} T @arg {CF_D_GuideEntry} cf @arg {T} x */
	D_GuideEntry_Omit(cf,x) {
		const {accessibility,formattedTitle,trackingParams,...y}=this.s(cf,x);
		this.D_Accessibility(accessibility);
		this.G_Text(formattedTitle);
		this.trackingParams(trackingParams);
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
			if(this.is_TE_VE(navigationEndpoint,3854)) {
				this.E_VE3854(navigationEndpoint);
			} else if(this.is_TE_VE(navigationEndpoint,96368)) {
				this.E_VE96368(navigationEndpoint);
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
				if(this.is_TE_VE(x2,3611)) return this.E_VE3611(x2);
				if(this.is_TE_VE(x2,5754)) return this.E_VE5754(x2);
				if(this.is_TE_VE(x2,6827)) return this.E_VE6827(x2);
				if(this.is_TE_VE(x2,11487)) return this.E_VE11487(x2);
				if(this.is_TE_VE(x2,23462)) return this.E_VE23462(x2);
				x2; debugger;
				break x;
			}
			if("urlEndpoint" in x2) {
				this.ht.E_VE83769_Url(x2);
				break x;
			}
			debugger;
		}
		let is_not_in_set=this.T_Icon_AnyOf("D_GuideEntry_WithNavEP:icon",icon,this.D_GuideEntry_IconType.WithNavEP);
		if(is_not_in_set) this.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithNavEP,this.D_GuideEntry_MissingIconType);
		{
			let x2=navigationEndpoint;
			if("urlEndpoint" in x2) return this.ht.E_VE83769_Url(x2);
			if("browseEndpoint" in x2) {
				if(this.is_TE_VE(x2,6827)) return this.E_VE6827(x2);
				if(this.is_TE_VE(x2,5754)) return this.E_VE5754(x2);
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
		this.parse_guide_entry_id(guideEntryId);
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
		this.G_Text(title);
		this.z(contents,this.R_RichItem);
		this.trackingParams(trackingParams);
		this.R_Menu(menu);
		this.R_Button(showMoreButton);
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
		this.G_Text(responseText);
		if(defaultStateIcon.iconType!=="STAR_BORDER") debugger;
		if(onStateIcon.iconType!=="STAR") debugger;
		this.ht.C_FollowUp(followUpCommand);
		this.g(responseEndpoint);
		this.trackingParams(trackingParams);
		this.a_primitive_bool(checked);
		this.a_primitive_bool(selected);
	}
	/** @arg {R_RatingSurvey} x */
	R_RatingSurvey(x) {this.H_("ratingSurveyRenderer",x,this.D_RatingSurvey);}
	/** @private @arg {D_RatingSurvey} x */
	D_RatingSurvey(x) {
		const cf="D_ExpandableSurveyResponse";
		const {ratings,trackingParams,notSureButton,undoButton,notSureEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ratings,x => this.xr.R_RatingSurveyOption(x));
		this.trackingParams(trackingParams);
		this.R_Button(notSureButton);
		this.R_Button(undoButton);
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
	R_Message(x) {this.H_("messageRenderer",x,this.g);}
	/** @private @arg {D_LiveBroadcastingBadge} x */
	D_LiveBroadcastingBadge(x) {
		const cf="D_LiveBroadcastingBadge";
		const {liveBroadcasting,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(liveBroadcasting);
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
		this.trackingParams(trackingParams);
	}
	/** @public @arg {R_LiveChatPlaceholderItem} x */
	R_LiveChatPlaceholderItem(x) {this.H_("liveChatPlaceholderItemRenderer",x,this.D_LiveChatPlaceholderItem);}
	/** @public @arg {D_LiveChatPlaceholderItem} x */
	D_LiveChatPlaceholderItem(x) {
		const cf="D_LiveChatPlaceholderItem";
		const {id,timestampUsec,...y}=this.s(cf,x); this.g(y);
		console.log(`${cf}.id`,id);
		let u_seconds=this.parse_number_template(timestampUsec);
		this.a_primitive_num(u_seconds);
	}
	/** @public @arg {R_LiveChatTextMessage} x */
	R_LiveChatTextMessage(x) {this.H_("liveChatTextMessageRenderer",x,this.D_LiveChatTextMessage);}
	/** @public @arg {D_LiveChatTextMessage} x */
	D_LiveChatTextMessage(x) {
		const cf="D_LiveChatTextMessage";
		const {message,authorName,authorPhoto,contextMenuEndpoint,id,authorBadges,timestampUsec,authorExternalChannelId,contextMenuAccessibility,timestampText,...y}=this.s(cf,x); this.g(y);
		this.G_Text(message);
		console.log(`${cf}.id`,id);
	}
	/** @public @arg {D_LiveChatEmoji} x */
	D_LiveChatEmoji(x) {
		const cf="D_LiveChatEmoji";
		const {isLocked,...y}=this.D_CustomEmoji_Omit(cf,x); this.g(y);
		this.a_primitive_bool(isLocked);
	}
	/** @private @arg {R_ChannelSwitcherHeader} x */
	R_ChannelSwitcherHeader(x) {this.H_("channelSwitcherHeaderRenderer",x,this.D_ChannelSwitcherHeader);}
	/** @private @arg {D_ChannelSwitcherPage} x */
	D_ChannelSwitcherPage(x) {
		const cf="D_ChannelSwitcherPage";
		const {header,targetId,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ChannelSwitcherHeader(header);
		this.ceq(targetId,"ceq");
		this.z(contents,this.G_ChannelSwitcherContent);
	}
	/** @private @arg {D_ChannelSwitcherHeader} x */
	D_ChannelSwitcherHeader(x) {
		const cf="D_ChannelSwitcherHeader";
		const {title,button,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.R_Button(button);
	}
	/** @private @arg {D_ChipColorPalette} x */
	D_ChipColorPalette(x) {const cf="D_ChipColorPalette"; this.codegen_typedef(cf,x); this.GEN(cf,x);}
	/** @private @arg {D_Channel_MD} x */
	D_Channel_MD(x) {
		const cf="D_Channel_MD";
		const {title,description,androidDeepLink,iosAppindexingLink,isFamilySafe,facebookProfileId,externalId,androidAppindexingLink,availableCountryCodes,avatar,rssUrl,keywords,ownerUrls,channelUrl,vanityChannelUrl,...u}=this.s(cf,x);
		this.t(facebookProfileId,this.a_primitive_str);
		this.a_primitive_str(title);
		this.a_primitive_str(description);
		this.a_primitive_str(androidDeepLink);
		this.a_primitive_str(iosAppindexingLink);
		this.ceq(isFamilySafe,true);
		this.a_primitive_str(externalId);
		this.a_primitive_str(androidAppindexingLink);
		this.z(availableCountryCodes,this.a_primitive_str);
		this.D_Thumbnail(avatar);
		this.a_primitive_str(rssUrl);
		this.a_primitive_str(keywords);
		if(ownerUrls.length!==1) debugger;
		let ur=this.tr_url_to_obj(ownerUrls[0]);
		this.ceq(this.str_starts_with_rx("/@",ur.pathname),true);
		this.a_primitive_str(channelUrl);
		this.a_primitive_str(vanityChannelUrl);
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
		this.codegen_typedef(`${cf}.dismissalEndpoint`,dismissalEndpoint);
		this.G_Text(title);
		this.G_Text(subtitle);
		this.R_CompactVideo(inlineContent);
		this.xr.R_ExpandableSurveyResponse(response);
		this.trackingParams(trackingParams);
		this.G_Text(dismissalText);
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
		this.trackingParams(trackingParams);
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
		this.C_Innertube(onTap);
	}
	/** @arg {R_ProfilePageHeaderTitleViewModel} x */
	R_ProfilePageHeaderTitleViewModel(x) {this.H_("profilePageHeaderTitleViewModel",x,this.D_ProfilePageHeaderTitle);}
	/** @private @arg {D_ProfilePageHeaderTitle} x */
	D_ProfilePageHeaderTitle(x) {this.y("D_ProfilePageHeaderTitle","title",x,this.D_ProfilePageHeaderTitle_Content);}
	/** @private @arg {D_ProfilePageHeaderTitle_Content} x */
	D_ProfilePageHeaderTitle_Content(x) {this.y("D_ProfilePageHeaderTitle_Content","content",x,this.a_primitive_str);}
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
		this.R_Button(submitButton);
		this.trackingParams(trackingParams);
	}
	/** @arg {R_AutomixPreviewVideo} x */
	R_AutomixPreviewVideo(x) {this.H_("automixPreviewVideoRenderer",x,this.g);}
	/** @public @arg {D_AttBgChallenge} x */
	D_AttBgChallenge(x) {
		const cf="D_AttBgChallenge";
		const {interpreterUrl,interpreterHash,program,globalName,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(interpreterUrl,a => {
			let uw=this.UrlWrappedValueT(a);
			this.a_primitive_str(uw);
		});
		this.a_primitive_str(interpreterHash);
		this.a_primitive_str(program);
		if(globalName!=="trayride") debugger;
	}
	/** @public @arg {D_AudioConfig} x */
	D_AudioConfig(x) {
		const cf="D_AudioConfig";
		const {loudnessDb,perceptualLoudnessDb,enablePerFormatLoudness,...y}=this.s(cf,x); this.g(y);
		this.t(loudnessDb,this.a_primitive_num);
		this.t(perceptualLoudnessDb,this.a_primitive_num);
		this.t(enablePerFormatLoudness,this.a_primitive_bool);
	}
	/** @public @arg {R_DynamicReadaheadConfig} x */
	R_DynamicReadaheadConfig(x) {this.H_("dynamicReadaheadConfig",x,this.D_DynamicReadaheadConfig);}
	/** @public @arg {D_DynamicReadaheadConfig} x */
	D_DynamicReadaheadConfig(x) {
		const cf="D_DynamicReadaheadConfig";
		const {maxReadAheadMediaTimeMs,minReadAheadMediaTimeMs,readAheadGrowthRateMs,...y}=this.s(cf,x); this.g(y);
		this.ceq(maxReadAheadMediaTimeMs,120000);
		this.ceq(minReadAheadMediaTimeMs,15000);
		this.ceq(readAheadGrowthRateMs,1000);
	}
	/** @private @arg {R_PdgCommentChip} x */
	R_PdgCommentChip(x) {this.H_("pdgCommentChipRenderer",x,this.D_PdgCommentChip);}
	/** @public @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {this.H_("playlistHeaderRenderer",x,this.D_PlaylistHeader);}
	/** @private @arg {D_PlaylistHeader} x */
	D_PlaylistHeader(x) {
		const cf="D_PlaylistHeader";
		const {playButton,playlistHeaderBanner,playlistId,privacy,shufflePlayButton,trackingParams,editableDetails,editorEndpoint,isEditable,ownerEndpoint,serviceEndpoints,moreActionsMenu,title,numVideosText,descriptionTapText,descriptionText,onDescriptionTap,shareData,stats,briefStats,byline,ownerText,viewCountText,cinematicContainer,...y}=this.s(cf,x);
		this.R_Button(playButton);
		this.R_HeroPlaylistThumbnail(playlistHeaderBanner);
		this.playlistId(playlistId);
		this.save_string(`${cf}.privacy`,privacy);
		this.R_Button(shufflePlayButton);
		this.trackingParams(trackingParams);
		this.D_EditableDetails(editableDetails);
		this.t(editorEndpoint,this.E_PlaylistEditor);
		this.a_primitive_bool(isEditable);
		this.E_VE3611(ownerEndpoint);
		this.z(serviceEndpoints,x => {
			if("playlistEditEndpoint" in x) return this.E_PlaylistEdit(x);
			if("deletePlaylistEndpoint" in x) return this.E_PlaylistDelete(x);
			this.codegen_typedef("EF_PlaylistHeader",x,false);
		});
		this.R_Menu(moreActionsMenu);
		this.G_Text(title);
		this.G_Text(numVideosText);
		this.t(descriptionTapText,this.G_Text);
		this.g(descriptionText);
		this.TA_OpenPopup("A_FancyDismissibleDialog",onDescriptionTap);
		this.D_CanShare(shareData);
		this.z(stats,this.G_Text);
		this.z(briefStats,this.G_Text);
		this.z(byline,this.R_PlaylistByline);
		this.G_Text(ownerText);
		this.G_Text(viewCountText);
		this.R_CinematicContainer(cinematicContainer);
		const {shareButton,titleForm,descriptionForm,privacyForm,...y1}=y; this.g(y1);
		this.t(shareButton,this.R_Button);
		this.t(titleForm,this.R_InlineForm);
		this.t(descriptionForm,this.R_InlineForm);
		this.t(privacyForm,this.R_DropdownFormField);
	}
	/** @public @arg {R_InlineForm} x */
	R_InlineForm(x) {this.H_("inlineFormRenderer",x,this.D_InlineForm);}
	/** @public @arg {D_InlineForm} x */
	D_InlineForm(x) {
		const cf="D_InlineForm";
		const {formField,editButton,saveButton,cancelButton,textDisplayed,style,...y}=this.s(cf,x); this.g(y);
		this.R_TextInputFormField(formField);
		this.R_Button(editButton);
		this.R_Button(saveButton);
		this.R_Button(cancelButton);
		this.G_Text(textDisplayed);
		this.cq(style,"INLINE_FORM_STYLE_TITLE");
		this.save_enum(cf,"INLINE_FORM_STYLE",style);
	}
	/** @public @arg {R_TextInputFormField} x */
	R_TextInputFormField(x) {this.H_("textInputFormFieldRenderer",x,this.D_TextInputFormField);}
	/** @public @arg {D_TextInputFormField} x */
	D_TextInputFormField(x) {
		const cf="D_TextInputFormField";
		const {label,maxCharacterLimit,placeholderText,validValueRegexp,invalidValueErrorMessage,required,...y}=this.s(cf,x); this.g(y);
		this.G_Text(label);
		this.cq(maxCharacterLimit,150);
		this.a_primitive_str(placeholderText);
		this.cq(validValueRegexp,"[^<>]*");
		this.G_Text(invalidValueErrorMessage);
		this.cq(required,true);
	}
	/** @public @arg {R_DropdownFormField} x */
	R_DropdownFormField(x) {this.H_("dropdownFormFieldRenderer",x,this.D_DropdownFormField);}
	/** @public @arg {D_DropdownFormField} x */
	D_DropdownFormField(x) {
		const cf="D_DropdownFormField";
		const {dropdown,key,onChange,...y}=this.s(cf,x); this.g(y);
		this.R_Dropdown(dropdown);
		this.cq(key,"playlistEditEndpoint.actions.0.playlistPrivacy");
		let kp=split_string(key,".");
		this.cq(kp[0],"playlistEditEndpoint");
		this.E_PlaylistEdit(onChange);
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
		this.a_primitive_str(label);
	}
	/** @public @arg {R_PrivacyDropdownItem} x */
	R_PrivacyDropdownItem(x) {this.H_("privacyDropdownItemRenderer",x,this.D_PrivacyDropdownItem);}
	/** @public @arg {D_PrivacyDropdownItem} x */
	D_PrivacyDropdownItem(x) {
		const cf="D_PrivacyDropdownItem";
		const {label,icon,description,int32Value,isSelected,accessibility,...y}=this.s(cf,x); this.g(y);
		this.G_Text(label);
		this.T_Icon(cf,icon);
		this.G_Text(description);
		switch(int32Value) {
			default: debugger; break;
			case 1: break;
		}
		this.cq(isSelected,false);
		this.D_Label(accessibility);
	}
	/** @public @arg {R_C4TabbedHeader} x */
	R_C4TabbedHeader(x) {this.H_("c4TabbedHeaderRenderer",x,this.D_C4TabbedHeader);}
	/** @private @arg {D_C4TabbedHeader} x */
	D_C4TabbedHeader(x) {
		const cf="D_C4TabbedHeader";
		const {channelId,title,navigationEndpoint,avatar,banner,badges,headerLinks,subscribeButton,subscriberCountText,tvBanner,mobileBanner,trackingParams,sponsorButton,channelHandleText,videosCountText,...u}=this.s(cf,x);
		this.D_ChannelId(channelId);
		this.a_primitive_str(title);
		this.E_VE3611(navigationEndpoint);
		this.D_Thumbnail(avatar);
		this.D_Thumbnail(banner);
		this.tz(badges,this.RMD_Badge);
		this.R_ChannelHeaderLinks(headerLinks);
		this.R_SubscribeButton(subscribeButton);
		this.G_Text(subscriberCountText);
		this.D_Thumbnail(tvBanner);
		this.D_Thumbnail(mobileBanner);
		this.trackingParams(trackingParams);
		this.t(sponsorButton,this.R_Button);
		this.G_Text(channelHandleText);
		this.G_Text(videosCountText);
		const {visitTracking,...y}=u; this.g(y);
		this.t(visitTracking,this.D_RemarketingPing);
	}
	/** @public @arg {R_ActiveAccountHeader} x */
	R_ActiveAccountHeader(x) {this.H_("activeAccountHeaderRenderer",x,this.D_ActiveAccountHeader);}
	/** @private @arg {D_ActiveAccountHeader} x */
	D_ActiveAccountHeader(x) {x;}
	/** @private @arg {G_ChannelSwitcherContent} x */
	G_ChannelSwitcherContent(x) {
		const cf="G_ChannelSwitcherContent";
		if("buttonRenderer" in x) return this.R_Button(x);
		if("accountItem" in x) return this.ht.A_AccountItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {G_PlaylistSidebarItem} x */
	G_PlaylistSidebarItem(x) {
		const cf="G_PlaylistSidebarItem";
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {G_NextContents} x */
	G_NextContents(x) {
		const cf="G_NextContents";
		if("twoColumnWatchNextResults" in x) return this.R_TwoColumnWatchNextResults(x);
		if("singleColumnMusicWatchNextResultsRenderer" in x) return this.R_SingleColumnMusicWatchNextResults(x);
		x===""; this.codegen_typedef(cf,x);
		x===0;
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
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {G_ChatItem} x */
	G_ChatItem(x) {
		const cf="G_ChatItem";
		if("liveChatTextMessageRenderer" in x) return this.R_LiveChatTextMessage(x);
		if("liveChatPlaceholderItemRenderer" in x) return this.R_LiveChatPlaceholderItem(x);
		if("liveChatViewerEngagementMessageRenderer" in x) return this.R_LiveChatViewerEngagementMessage(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_PdgBuyFlow} x */
	D_PdgBuyFlow(x) {
		const cf="D_PdgBuyFlow";
		const {header,content,trackingParams,onCloseCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_PdgBuyFlowHeader(header);
		this.z(content,x => {
			if(!x.superVodBuyFlowContentRenderer) debugger;
			return this.R_SuperVodBuyFlowContent(x);
		});
		this.trackingParams(trackingParams);
		if("getSurveyCommand" in onCloseCommand) return this.C_GetSurvey(onCloseCommand);
		{debugger;}
	}
	/** @private @arg {D_PlaylistSidebar} x */
	D_PlaylistSidebar(x) {
		const cf="D_PlaylistSidebar";
		const {items,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_PlaylistSidebarItem);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlaylistSidebarSecondaryInfo} x */
	D_PlaylistSidebarSecondaryInfo(x) {this.H_("videoOwner",x,this.R_VideoOwner);}
	/** @private @arg {D_PdgBuyFlowHeader} x */
	D_PdgBuyFlowHeader(x) {
		const cf="D_PdgBuyFlowHeader";
		const {text,helpButton,dismissButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.R_Button(helpButton);
		this.R_Button(dismissButton);
	}
	/** @private @arg {D_SuperVodBuyFlowContent} x */
	D_SuperVodBuyFlowContent(x) {
		const cf="D_SuperVodBuyFlowContent";
		const {description,buyButton,trackingParams,commentPreview,disclaimerText,colorSlider,defaultPriceTier,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([description,disclaimerText],this.G_Text);
		this.R_Button(buyButton);
		this.trackingParams(trackingParams);
		this.R_PdgCommentPreview(commentPreview);
		this.R_PdgColorSlider(colorSlider);
		console.log("defaultPriceTier",defaultPriceTier);
		this.ht.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {D_PdgColorSlider} x */
	D_PdgColorSlider(x) {
		const cf="D_PdgColorSlider";
		const {notches,superThanksSelectedTierEntity,maxTierValue,minTierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(notches,this.D_NotchesItem);
		this.ht.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
		this.G_Text(maxTierValue);
		this.G_Text(minTierValue);
	}
	/** @private @arg {D_NotchesItem} x */
	D_NotchesItem(x) {
		const cf="NotchesItem";
		const {linearGradientCssStyle,knobColorArgb,purchaseCommand,tierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(linearGradientCssStyle) {debugger;}
		if(knobColorArgb!==4280191205) debugger;
		this.ht.E_YpcGetCart(purchaseCommand);
		this.G_Text(tierValue);
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
		this.trackingParams(trackingParams);
		this.t(formattedTitle,this.G_Text);
		if(!this.eq_keys(handlerDatas,["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"])) debugger;
	}
	/** @private @arg {D_GuideSection} x */
	D_GuideSection(x) {
		const cf="D_GuideSection";
		const {items,trackingParams,formattedTitle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(trackingParams);
		this.t(formattedTitle,this.G_Text);
	}
	/** @private @arg {D_GuideCollapsibleSectionEntry} x */
	D_GuideCollapsibleSectionEntry(x) {
		const cf="D_GuideCollapsibleSectionEntry";
		const {headerEntry,expanderIcon,collapserIcon,sectionItems,handlerDatas,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_GuideEntry(headerEntry);
		this.T_Icon("D_Guide_ExpandIcon",expanderIcon);
		this.T_Icon("D_Guide_CollapseIcon",collapserIcon);
		this.z(sectionItems,this.G_GuideSectionItem);
		if(handlerDatas[0]!=="GUIDE_ACTION_ADD_TO_PLAYLISTS") debugger;
		if(handlerDatas[1]!=="GUIDE_ACTION_REMOVE_FROM_PLAYLISTS") debugger;
		if(handlerDatas.length!==2) debugger;
	}
	/** @private @arg {D_ResourceStatusInResponseCheck} x */
	D_ResourceStatusInResponseCheck(x) {
		const cf="D_ResourceStatusInResponseCheckData";
		const {serverBuildLabel,resourceStatuses: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(serverBuildLabel);
		this.z(a,this.D_ElementResourceStatus);
	}
	/** @private @arg {D_ElementResourceStatus} x */
	D_ElementResourceStatus(x) {
		const cf="D_ElementResourceStatus";
		const {identifier,status,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		this.a_primitive_str(identifier);
	}
	/** @private @arg {D_PlaylistVideoThumbnail} x */
	D_PlaylistVideoThumbnail(x) {
		const cf="D_PlaylistVideoThumbnail";
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_Playlist_MD} x */
	D_Playlist_MD(x) {
		const cf="D_Playlist_MD";
		const {title,iosAppindexingLink,androidAppindexingLink,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.a_primitive_str(iosAppindexingLink);
		this.a_primitive_str(androidAppindexingLink);
	}
	/** @private @arg {D_PdgCommentPreview} x */
	D_PdgCommentPreview(x) {
		const cf="D_PdgCommentPreview";
		const {title,authorThumbnail,authorText,commentOptionRenderers,defaultCommentText,editButton,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.D_Thumbnail(authorThumbnail);
		this.G_Text(authorText);
		this.z(commentOptionRenderers,this.R_PdgCommentOption);
		this.G_Text(defaultCommentText);
		this.R_Button(editButton);
		this.ht.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {D_PdgCommentOption} x */
	D_PdgCommentOption(x) {
		const cf="D_PdgCommentOption";
		const {commentText,chipRenderer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(commentText);
		this.R_PdgCommentChip(chipRenderer);
	}
	/** @private @arg {D_PdgCommentChip} x */
	D_PdgCommentChip(x) {
		const cf="D_PdgCommentChip";
		const {chipText,chipColorPalette,chipIcon,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.G_Text(chipText);
		this.D_ChipColorPalette(chipColorPalette);
		if(chipIcon.iconType!=="FILL_DOLLAR_SIGN_HEART_12") debugger;
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_RemarketingPing} x */
	D_RemarketingPing(x) {
		const cf="D_RemarketingPing",{remarketingPing,...y}=this.s(cf,x),t=this; this.g(y);
		let tr=t.tr_url_to_obj(remarketingPing);
		t.cq(tr.host,"www.youtube.com");
		let [r,...p]=split_string(tr.pathname,"/"); t.cq(r,"");
		t.cq(p[0],"pagead"); t.cq(p[1],"viewthroughconversion");
		let np=this.parse_number_template(p[2]);
		if(this.view_conversion_info.has(np)) return;
		let sp=this.parse_url_search_params(tr.search);
		let kk=this.get_keys_of(sp);
		console.log(`[${cf}]`,"[keys]",kk.join());
		this.view_conversion_info.set(np,sp);
	}
	/** @private @arg {D_WatchNextTabbedResults} x */
	D_WatchNextTabbedResults(x) {
		const cf="D_WatchNextTabbedResults";
		const {tabs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,x => this.x.get("x_EventInput").R_Tab(x));
	}
}
export_(exports => {
	exports.Support_RS_Player=Support_RS_Player;
	exports.Support_RS_WatchPage=Support_RS_WatchPage;
	exports.Support_RS_Watch=Support_RS_Watch;
	exports.Support_RS_Page_Browse=Support_RS_Page_Browse;
	exports.Support_RS_Browse=Support_RS_Browse;
	exports.Support_GenericApi=Support_GenericApi;
	exports.Support_EventInput=Support_EventInput;
	exports.Support_VE37414=Support_VE37414;
	exports.Support_VE=Support_VE;
});
