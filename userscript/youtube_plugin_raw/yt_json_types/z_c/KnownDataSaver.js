import {no_storage_access} from "../snippet_0";

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
			if(!(ki in this.save_key_objs))
				this.save_key_objs[ki]={
					arr: [],
					/** @arg {{}} o */
					set(o) {this.arr.push(o);}
				};
			this.save_key_objs[ki]?.set(x);
		}
		if(typeof x!=="object")
			return this.save_string(`[${ki}.type]`,typeof x);
		if(x instanceof Array)
			return this.save_string(`[${ki}.type]`,"array");
		let keys=this.get_keys_of(x);
		let ret=this.save_string(k,keys.join());
		if(ret&&"actions" in x)
			debugger;
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
		if(this.#loaded_from_storage)
			return;
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
		if(no_storage_access)
			return this.#seen_data_json_str;
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
		if(this.#idle_id!==null)
			return;
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
		if(index)
			return this.#seen_strings[index];
		index=this.#seen_strings.findIndex(e => e[0]===key);
		if(index<0)
			return;
		this.#strings_key_index_map[key]=index;
		return this.#seen_strings[index];
	}
	/** @protected @template {string|number} U @template {U[]} T @arg {T} src @arg {T} target */
	eq_keys(src,target) {
		if(src.length!==target.length)
			return false;
		for(let i=0;i<src.length;i++) {
			let a=src[i];
			if(!target.includes(a))
				return false;
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
		if(was_known)
			return false;
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
		if(!p)
			return;
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
			for(let x of e)
				ta[x]=1;
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
		if(was_known)
			return;
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
		if(this.#seen_root_visual_elements.includes(x))
			return;
		console.log("store [root_visual_element]",x);
		this.#seen_root_visual_elements.push(x);
		this.#new_root_visual_elements.push(x);
		this.#onDataChange();
	}
}
