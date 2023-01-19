import {Base64Binary} from "./yt_json_types/Base64Binary";
import {MyReader} from "./yt_json_types/MyReader";
const decoder=new TextDecoder();
const base64_dec=new Base64Binary();
let no_storage_access=false;
try {
	localStorage.setItem("test","test_value");
	let r=localStorage.getItem("test");
	if(r!=="test_value") no_storage_access=true;
} catch {
	no_storage_access=true;
}
export class KnownDataSaver {
	/** @template {{}} T @arg {T} obj @returns {MaybeKeysArray<T>} */
	get_keys_of(obj) {
		if(!obj) {
			debugger;
		}
		let rq=Object.keys(obj);
		/** @private @type {any} */
		let ra=rq;
		return ra;
	}
	constructor() {
		this.#load_data();
		this.#store_data();
	}
	/** @private @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {SplitOnce<S,D>} */
	split_string_once(s,d=as(",")) {
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
	/** @type {{[x:string]:{arr:any[],set(o:{}):void}}} */
	save_key_objs={};
	do_save_keys_obj=false;
	/** @public @template {{}} T @arg {`[${string}]`} k @arg {T|undefined} x */
	save_keys(k,x) {
		if(!x) {debugger; return;}
		let ki=this.split_string_once(this.split_string_once(k,"[")[1],"]")[0];
		if(this.do_save_keys_obj) {
			if(!(ki in this.save_key_objs)) this.save_key_objs[ki]={
				arr: [],
				/** @arg {{}} o */
				set(o) {this.arr.push(o);}
			};
			this.save_key_objs[ki]?.set(x);
		}
		if(typeof x!=="object") return this.save_string(`[${ki}.type]`,typeof x);
		if(x instanceof Array) return this.save_string(`[${ki}.type]`,"array");
		let keys=this.get_keys_of(x);
		let ret=this.save_string(k,keys.join());
		if(ret&&"actions" in x) debugger;
		return ret;
	}
	/** @arg {string} str @returns {Partial<ReturnType<KnownDataSaver["pull_data"]>>} */
	#parse_data(str) {
		return JSON.parse(str);
	}
	#store_data() {
		let data=this.pull_data();
		for(let v=0;v<data.seen_numbers.length;v++) {
			const j=data.seen_numbers[v];
			const [_n,[_k,c]]=j;
			for(let i=0;i<c.length;i++) {
				if(c[i]===null) {
					c.splice(i,1);
					i--;
				}
			}
		}
		let json_str=JSON.stringify(data);
		this.#save_local_storage(json_str);
	}
	#load_data() {
		if(this.#loaded_from_storage) return;
		let json_str=this.#get_local_storage();
		if(json_str) {
			let ret=this.#parse_data(json_str);
			this.#push_data_to_parent(ret);
			this.#loaded_from_storage=true;
		}
	}
	pull_data() {
		return {
			seen_root_visual_elements: this.#seen_root_visual_elements,
			seen_strings: this.#seen_strings,
			seen_numbers: this.#seen_numbers,
			seen_booleans: this.#seen_booleans,
		};
	}
	get_debug_data() {
		return {
			strings_key_index_map: this.#strings_key_index_map,
		};
	}
	/** @arg {string} seen_data */
	#save_local_storage(seen_data) {
		if(no_storage_access) {
			this.#seen_data_json_str=seen_data;
			return;
		}
		localStorage.seen_data=seen_data;
	}
	#get_local_storage() {
		if(no_storage_access) return this.#seen_data_json_str;
		return localStorage.getItem("seen_data");
	}
	/** @arg {Partial<ReturnType<KnownDataSaver["pull_data"]>>} x */
	#push_data_to_parent(x) {
		if(x.seen_root_visual_elements) {
			this.#seen_root_visual_elements=x.seen_root_visual_elements;
		}
		if(x.seen_strings) {
			this.#seen_strings=x.seen_strings;
		}
		if(x.seen_booleans) {
			this.#seen_booleans=x.seen_booleans;
		}
		if(x.seen_numbers) {
			this.#seen_numbers=x.seen_numbers;
		}
	}
	/** @type {string|null} */
	#seen_data_json_str=null;
	#loaded_from_storage=false;
	/** @type {number[]} */
	#seen_root_visual_elements=[];
	/** @type {[string,["one",string[]]|["many",string[][]]][]} */
	#seen_strings=[];
	/** @type {[string,["one",number[]]|["many",number[][]]][]} */
	#seen_numbers=[];
	/** @type {[string,{t:boolean;f:boolean}][]} */
	#seen_booleans=[];
	/** @type {number|null|Nullable<{}>} */
	#idle_id=null;
	#onDataChange() {
		if(this.#idle_id!==null) return;
		this.#idle_id=requestIdleCallback(() => {
			this.#idle_id=null;
			this.#store_data();
		});
	}
	/** @type {{[x:string]:number}} */
	#strings_key_index_map={};
	/** @arg {string} key */
	#get_seen_string_item(key) {
		let index=this.#strings_key_index_map[key];
		if(index) return this.#seen_strings[index];
		index=this.#seen_strings.findIndex(e => e[0]===key);
		if(index<0) return;
		this.#strings_key_index_map[key]=index;
		return this.#seen_strings[index];
	}
	/** @protected @template {string|number} U @template {U[]} T @arg {T} src @arg {T} target */
	eq_keys(src,target) {
		if(src.length!==target.length) return false;
		for(let i=0;i<src.length;i++) {
			let a=src[i];
			if(!target.includes(a)) return false;
		}
		return true;
	}
	/** @type {[string,string|string[]][]} */
	#new_strings=[];
	/** @arg {`[${string}]`} k_arg @arg {string|string[]} x */
	save_string(k_arg,x) {
		if(x===void 0) {debugger; return;}
		let k=this.split_string_once(this.split_string_once(k_arg,"[")[1],"]")[0];
		let was_known=true;
		/** @private @type {["one", string[]]|["many",string[][]]} */
		let cur;
		let p=this.#get_seen_string_item(k);
		if(!p) {
			p=[k,cur=["one",[]]];
			let nk=this.#seen_strings.push(p)-1;
			this.#strings_key_index_map[k]=nk;
		} else {
			cur=p[1];
		}
		if(x instanceof Array) {
			let target=p[1];
			if(target[0]==="one") {
				let inner=target[1].map(e => [e]);
				target=["many",inner];
				p[1]=target;
			}
			let found=target[1].find(e => this.eq_keys(e,x));
			if(!found) {
				was_known=false;
				target[1].push(x);
			}
		} else {
			if(cur[0]==="one") {
				if(!cur[1].includes(x)) {
					was_known=false;
					cur[1].push(x);
				}
			} else if(cur[0]==="many") {
				let res=cur[1].find(([e,...r]) => !r.length&&e===x);
				if(!res) {
					was_known=false;
					cur[1].push([x]);
				}
			}
		}
		if(was_known) return false;
		this.#new_strings.push([k,x]);
		this.#onDataChange();
		console.log("store_str [%s] %o",k,x);
		let idx=this.#seen_strings.indexOf(p);
		if(idx<0) {debugger; return;}
		this.show_strings_bitmap(idx);
		return true;
	}
	/** @arg {number} idx */
	show_strings_bitmap(idx) {
		let p=this.#seen_strings[idx];
		if(!p) return;
		let k=p[0];
		let cur=p[1];
		if(cur[0]==="many") {
			let src_data=cur[1];
			let max_len=src_data.map(e => e.length).reduce((a,b) => Math.max(a,b));
			for(let bitmap_src_idx=0;bitmap_src_idx<max_len;bitmap_src_idx++) {
				let bitmap_src=src_data.filter(e => bitmap_src_idx<e.length).map(e => e[bitmap_src_idx]);
				let {bitmap,index_map}=this.generate_bitmap(bitmap_src);
				console.log(` --------- [store["${k}"][${bitmap_src_idx}]] --------- `);
				console.log(index_map.map(e => `"${e}"`).join(","));
				console.log(bitmap);
			}
			return;
		} else {
			let bitmap_src=cur[1];
			let linear_map=bitmap_src.every(e => !e.includes(","));
			if(linear_map) {
				console.log(` --------- [${k}] --------- `);
				console.log(bitmap_src.join(","));
				return;
			}
			let {bitmap,index_map}=this.generate_bitmap(bitmap_src);
			console.log(` --------- [${k}] --------- `);
			console.log(index_map.join(","));
			console.log(bitmap);
		}
	}
	/** @arg {string[]} bitmap_src */
	generate_bitmap(bitmap_src) {
		let index_map=[...new Set([...bitmap_src.map(e => e.split(",")).flat()])];
		let bitmap="\n"+bitmap_src.map(e => e.split(",").map(e => index_map.indexOf(e))).map(e => {
			let ta=new Array(index_map.length).fill(0);
			for(let x of e) ta[x]=1;
			return ta.join("");
		}).sort((a,b) => b.split("0").length-a.split("0").length).join("\n")+"\n";
		return {
			index_map,
			bitmap
		};
	}
	/** @type {[string,number|number[]][]} */
	#new_numbers=[];
	/** @public @arg {`[${string}]`} key @arg {number|number[]} x */
	save_number(key,x) {
		if(x===void 0) {debugger; return;}
		let k=this.split_string_once(this.split_string_once(key,"[")[1],"]")[0];
		let was_known=true;
		/** @private @type {["one", number[]]|["many",number[][]]} */
		let cur;
		let p=this.#seen_numbers.find(e => e[0]===k);
		if(!p) {
			cur=["one",[]];
			p=[k,cur];
			this.#seen_numbers.push(p);
		} else {
			cur=p[1];
		}
		if(x instanceof Array) {
			let target=p[1];
			if(target[0]==="one") {
				let inner=target[1].map(e => [e]);
				target=["many",inner];
				p[1]=target;
			}
			let found=target[1].find(e => this.eq_keys(e,x));
			if(!found) {
				was_known=false;
				target[1].push(x);
			}
		} else {
			if(cur[0]==="one") {
				if(!cur[1].includes(x)) {
					was_known=false;
					cur[1].push(x);
				}
			} else if(cur[0]==="many") {
				let res=cur[1].find(([e,...r]) => !r.length&&e===x);
				if(!res) {
					was_known=false;
					cur[1].push([x]);
				}
			}
		}
		if(was_known) return;
		this.#new_numbers.push([k,x]);
		this.#onDataChange();
		console.log("store_num [%s]",k,x);
	}
	/** @type {[string,{t:boolean;f:boolean}][]} */
	#new_booleans=[];
	/** @public @arg {string} key @arg {boolean} bool */
	save_boolean(key,bool) {
		let krc=this.#seen_booleans.find(e => e[0]===key);
		if(!krc) {
			krc=[key,{t: false,f: false}];
			this.#seen_booleans.push(krc);
		}
		let [,kc]=krc;
		if(bool) {
			if(!kc.t) {
				console.log(key,bool);
			}
			kc.t=true;
		} else {
			if(!kc.f) {
				console.log(key,bool);
			}
			kc.f=true;
		}
		this.#new_booleans.push([key,kc]);
		this.#onDataChange();
	}
	/** @type {number[]} */
	#new_root_visual_elements=[];
	/** @public @arg {number} x */
	save_root_visual_element(x) {
		if(x===void 0) {
			debugger;
			return;
		}
		if(this.#seen_root_visual_elements.includes(x)) return;
		console.log("store [root_visual_element]",x);
		this.#seen_root_visual_elements.push(x);
		this.#new_root_visual_elements.push(x);
		this.#onDataChange();
	}
}
export class Snippet_0_tmp {
	/** @public @arg {string} x */
	trackingParams(x) {
		this.primitive_of(x,"string");
	}
	/** @private @template T @arg {NonNullable<T>} x @arg {TypeOfType<T>} y */
	primitive_of(x,y) {
		if(typeof x!==y) debugger;
	}
	/** @public @arg {string} x */
	clickTrackingParams(x) {
		this.primitive_of(x,"string");
	}
	/** @private @arg {string} x */
	decode_url_b64(x) {
		x=x.replaceAll("_","/").replaceAll("-","+");
		return base64_dec.decodeByteArray(x);
	}
	/** @public @arg {string} x */
	parse_endpoint_params(x) {
		let arr=this.decode_url_b64(x);
		let reader=new MyReader(arr);
		let res=reader.try_read_any();
		if(!res) return;
		const [f0]=res;
		if(f0[0]!=="child") {
			console.log(f0);
			return;
		}
		console.log(...res);
		let [,field_id,data]=f0;
		reader.pos=data.byteOffset;
		let more=reader.try_read_any(data.byteLength);
		if(more&&!more.find(e => e[0]==="error")) {
			const [f0]=more;
			console.log(
				"parsed_endpoint_param field_id=%o result(%o)={message}",
				field_id,data.length
			);
			console.log("{message}",f0);
		} else {
			console.log(
				"parsed_endpoint_param field_id=%o result(%o)=\"%s\"",
				field_id,data.length,decoder.decode(data)
			);
		}
	}
	/** @private @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {SplitOnce<S,D>} */
	split_string_once(s,d=this.as(",")) {
		if(s==="") {
			/** @type {[]} */
			let r=[];
			/** @type {any} */
			let q=r;
			return this.as(q);
		}
		let i=s.indexOf(d);
		if(i===-1) {
			/** @type {[S]} */
			let r=[s];
			/** @type {any} */
			let q=r;
			return this.as(q);
		}
		let a=s.slice(0,i);
		let b=s.slice(i+d.length);
		/** @type {[string,string]} */
		let r=[a,b];
		/** @type {any} */
		let q=r;
		return this.as(q);
	}
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} sep @returns {SplitOnce<T,U>[number]|null} */
	drop_separator(x,sep) {
		let v=this.split_string_once(x,sep);
		if(v[0]) return v[0];
		return v[1]??null;
	}
	/** @arg {string} key @arg {string|string[]} x */
	save_string(key,x) {
		key; x;
	}
	/** @public @arg {unknown} x @arg {string|null} r */
	generate_typedef(x,r=null) {
		x; r;
	}
	/** @public @template {[string,null,string]} T @template {`${T[0]}-${string}-${T[2]}`} U @arg {T} ns_arr @arg {U} s */
	save_enum_path(ns_arr,s) {
		// ["", "-artists-row-state-id"]
		let n1=this.split_string_once(s,ns_arr[0]);
		if(!n1[1]) throw new Error();
		let n2=this.drop_separator(n1[1],"-");
		if(!n2) throw new Error();
		let n3=this.drop_separator(this.split_string_once(n2,ns_arr[2])[0],"-");
		if(!n3) throw new Error();
		this.save_string(`ELEMENT::${ns_arr[0]}::@::${ns_arr[2]}`,n3);
	}
	/** @public @arg {unknown} x @arg {string|null} r */
	generate_renderer(x,r) {
		throw new AggregateError(["this.#generate_renderer(x,r);",x,r]);
	}
	/** @private @template {{}} T @arg {T} obj @returns {MaybeKeysArray<T>} */
	get_keys_of(obj) {
		if(!obj) {
			debugger;
		}
		let rq=Object.keys(obj);
		/** @type {any} */
		let ra=rq;
		return ra;
	}
	/** @public @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
	as(e,x=e) {
		return x;
	}
	/** @private @template {{}} T @arg {Maybe<T>} x @returns {x is T} */
	maybe_has_value(x) {
		return Object.keys(x).length>0;
	}
	/** @protected @template {{}} T @arg {Maybe<T>} x @arg {(x:T)=>void} f */
	maybe(x,f) {
		if(!this.maybe_has_value(x)) return;
		f(x);
	}
	/** @protected @template {string} T @arg {T} t @returns {ParseUrlSearchParams<T>} */
	make_search_params(t) {
		let sp=new URLSearchParams(t);
		return this.as(Object.fromEntries(sp.entries()));
	}
	/** @protected @template {{}} T @arg {{} extends T?MaybeKeysArray<T> extends []?T:never:never} x */
	g(x) {
		let keys=this.get_keys_of(x);
		if(!keys.length) return;
		console.log("[empty_object] [%s]",keys.join());
		debugger;
	}
	/** @public @template {{}} U @arg {U[]} x @arg {(this:this,x:U,i:number)=>void} y  */
	z(x,y) {
		if(x===void 0) {debugger; return;}
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			y.call(this,a,i);
		}
	}
	/** @public @template {{}} T @arg {T|undefined} x @arg {(this:this,v:T[MaybeKeysArray<T>[number]],k: MaybeKeysArray<T>[number])=>void} y */
	w(x,y) {
		if(x===void 0) return;
		let keys=this.get_keys_of(x);
		if(keys.length===0) {
			debugger;
			return;
		}
		for(let k of keys) {
			y.call(this,x[k],k);
		}
	}
	/** @protected @template {{}} T @arg {ContentsArrayTemplate<T>} x @arg {(this:this,x:T)=>void} f */
	w1(x,f) {
		const {contents: a,...y}=x; this.g(y);
		this.z(a,f);
	}
	/** @protected @template {{}} T @arg {{items:T[]}} x @arg {(this:this,x:T)=>void} f */
	w2(x,f) {
		const {items: a,...y}=x; this.g(y);
		this.z(a,f);
	}
	/** @protected @template {{}} T @arg {{contents:T}} x @arg {(this:this,x:T)=>void} f */
	w3(x,f) {
		f.call(this,x.contents);
	}
	/** @arg {{}} x */
	log_new_typedef(x) {
		let td,rn;
		td=this.generate_typedef(x,"InfoRowData");
		console.log(td);
		td=this.generate_typedef(x,"CLA");
		rn=this.generate_renderer(x,"VideoDescriptionMusicSectionData");
		console.log(rn);
	}
	/** @arg {MyReader} reader @arg {DecTypeNum[]} results */
	unpack_children_reader_result(reader,results) {
		/** @type {DecTypeNum[]} */
		let out=[];
		for(let item of results) {
			switch(item[0]) {
				case "child": {
					let buffer=item[2];
					reader.pos=buffer.byteOffset;
					let res=reader.try_read_any(buffer.byteLength);
					if(!res) {out.push(item); break;}
					let unpack=this.unpack_children_reader_result(reader,res);
					if(!unpack) {out.push(item); break;}
					out.push(["struct",item[1],unpack]);
				} break;
				case "info": break;
				default: out.push(item); break;
				case "error": return null;
			}
		}
		return out;
	}
	/** @public @template {number} T  @arg {T} a @arg {T} b */
	float_cmp(a,b) {
		let epsilon=0.0000001;
		let table=[
			a>(b-epsilon),
			a<(b-epsilon),
			a>(b+epsilon),
			a<(b+epsilon),
			b>(a-epsilon),
			b<(a-epsilon),
			b>(a+epsilon),
			b<(a+epsilon),
		];
		table;
		if(a>(b-epsilon)&&a<(b+epsilon)) return true;
		return false;
	}
	/** @public @template {string} T @template {`${T}_${string}`} U @arg {T} ns @arg {U} x @returns {SplitOnce<SplitOnce<U,T>[1],"_">[1]} */
	parse_enum(ns,x) {
		let r=this.split_string_once(x,ns);
		if(!r[1]) throw new Error("Invalid enum");
		let q=this.split_string_once(r[1],"_");
		return q[1];
	}
	/** @public @template {{}} T @arg {CommandsTemplate<T>} x @arg {(x:T)=>void} f */
	CommandsTemplate(x,f) {
		this.z(x.commands,f);
	}
	/** @public @arg {string} x */
	decode_url_b64_proto_obj(x) {
		x=x.replaceAll("_","/").replaceAll("-","+");
		let ba=base64_dec.decodeByteArray(x);
		let reader=new MyReader(ba);
		return reader.try_read_any();
	}
	/** @public @template T @arg {T|undefined} val @returns {T} */
	non_null(val) {
		if(val===void 0) throw new Error();
		return val;
	}
	/** @type {<T extends string[],U extends string[]>(k:string[] extends T?never:T,r:U)=>Exclude<T[number],U[number]>[]} */
	filter_out_keys(keys,to_remove) {
		to_remove=this.as(to_remove.slice());
		/** @type {Exclude<typeof keys[number],typeof to_remove[number]>[]} */
		let ok_e=[];
		for(let i=0;i<keys.length;i++) {
			if(to_remove.includes(keys[i])) {
				let rm_i=to_remove.indexOf(keys[i]);
				to_remove.splice(rm_i,1);
				continue;
			}
			ok_e.push(this.as(keys[i]));
		}
		return ok_e;
	}
	/** @template {string} C @template {string} U @template {Split<C,",">[number]} _V @template {_V extends U?U[]:never} T @arg {T} ok_3 @arg {Split<C,","> extends U[]?C:never} arg1 */
	has_keys(ok_3,arg1) {
		return this.eq_keys(ok_3,arg1.split(","));
	}
	/** @private @template {string|number} U @template {U[]} T @arg {T} src @arg {T} target */
	eq_keys(src,target) {
		if(src.length!==target.length) return false;
		for(let i=0;i<src.length;i++) {
			let a=src[i];
			if(!target.includes(a)) return false;
		}
		return true;
	}
	ds=new KnownDataSaver;
	/** @public @type {this['ds']['save_keys']} @arg {`[${string}]`} k @arg {{}|undefined} x */
	save_keys(k,x) {
		this.ds.save_keys(k,x);
	}
	/** @arg {ProfileColumnRenderer} x */
	ProfileColumnRenderer(x) {
		this.save_keys("[ProfileColumnRenderer]",x);
		const {profileColumnRenderer,...y}=x; this.g(y);
		this.ProfileColumnData(profileColumnRenderer);
	}
	/** @arg {ProfileColumnData} x */
	ProfileColumnData(x) {
		this.save_keys("[ProfileColumnData]",x);
		const {items,...y}=x; this.g(y);
		this.z(items,this.ProfileColumnItem);
	}
	/** @arg {ProfileColumnItem} x */
	ProfileColumnItem(x) {
		if("profileColumnUserInfoRenderer" in x) return this.ProfileColumnUserInfoRenderer(x);
		if("profileColumnStatsRenderer" in x) return this.ProfileColumnStatsRenderer(x);
		debugger;
	}
	/** @arg {ProfileColumnUserInfoRenderer} x */
	ProfileColumnUserInfoRenderer(x) {
		this.save_keys("[ProfileColumnUserInfoRenderer]",x);
		const {profileColumnUserInfoRenderer,...y}=x; this.g(y);
	}
	/** @arg {ProfileColumnStatsRenderer} x */
	ProfileColumnStatsRenderer(x) {
		this.save_keys("[ProfileColumnStatsRenderer]",x);
		const {profileColumnStatsRenderer,...y}=x; this.g(y);
	}
	/** @arg {HotkeyDialog} x */
	HotkeyDialog(x) {
		this.save_keys("[HotkeyDialog]",x);
		const {...y}=x; this.g(y);
	}
	//#region dispatch_in_progress
	//#endregion
}