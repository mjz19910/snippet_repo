// ==UserScript==
// @name         global DebugAPI userscript
// @namespace    http://tampermonkey.net/
// @version      0.3.2
// @description  global DebugAPI userscript snippet from https://github.com/mjz19910/snippet_repo/blob/master/javascript/userscript_store/DebugAPI.user.js
// @author       @mjz19910
// @match        https://*/*
// @match        http://*/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mjz19910/snippet_repo/master/javascript/userscript_store/DebugAPI.meta.js
// @downloadURL  https://raw.githubusercontent.com/mjz19910/snippet_repo/master/javascript/userscript_store/DebugAPI.user.js
// ==/UserScript==
/* Copyright 2019-2022 @mjz19910 */
/* eslint-disable no-undef */

/** @type {typeof window['g_api']} */
let g_api=window.g_api??{};
window.g_api=g_api;
class IterExtensions {
	static init() {
		let map=new Map;
		let val_iter=map.values();
		let proto=Object.getPrototypeOf(val_iter);
		proto.map=function(/** @type {(arg0: any) => any} */ func) {
			let t=this;
			function next() {
				let iter=t.next();
				if(iter.done) return iter;
				iter.value=func(iter.value);
				return iter;
			}
			return {
				next,
				[Symbol.iterator]() {
					return this;
				}
			};
		};
	}
}
g_api.IterExtensions=IterExtensions;
IterExtensions.init();
/**
 * @param {boolean} include_uninteresting
 */
function getPlaybackRateMap(include_uninteresting) {
	let progress_map=new Map;
	if(include_uninteresting) {
		let elem_list=document.querySelectorAll("ytd-compact-video-renderer:has(#overlays:not(* > #progress))");
		elem_list.length>0&&progress_map.set("none",[...elem_list]);
	}
	let sel=(/**@type {string}*/e) => `ytd-compact-video-renderer:has(#progress[style="width: ${e}%;"])`;
	for(let i=0;i<=100;i++) {
		if(!include_uninteresting&&i===100) continue;
		let elem=document.querySelectorAll(sel(i.toString()));
		if(elem.length==1) {
			progress_map.set("some:"+i,[...elem]);
		} else if(elem.length>0) {
			progress_map.set("some:"+i,[...elem]);
		}
	}; return progress_map;
};
g_api.getPlaybackRateMap=getPlaybackRateMap;
class CreateObjURLCache {
	/** @readonly */
	static originalScope={
		createObjectURL: URL.createObjectURL,
		revokeObjectURL: URL.revokeObjectURL,
	};
	/**
	 * @type {[(Blob | MediaSource)[], string, boolean][]}
	 */
	static expired=[];
	/**@type {Map<string, [(Blob | MediaSource)[], string, boolean]>} */
	static cache=new Map;
	static enable() {
		this.update_scope(this.getScope());
	}
	static disable() {
		this.update_scope(this.originalScope);
	}
	/**
	 * @param {CreateObjURLCache.originalScope} scope
	 */
	static update_scope(scope) {
		URL.createObjectURL=scope.createObjectURL;
		URL.revokeObjectURL=scope.revokeObjectURL;
	}
	static getScope() {
		let base=this.originalScope;
		/**@type {CreateObjURLCache.originalScope} */
		let scope={createObjectURL,revokeObjectURL};
		return scope;
		/**
		 * @param {[Blob | MediaSource]} args
		 */
		function createObjectURL(...args) {
			let ret=base.createObjectURL(...args);
			CreateObjURLCache.cache.set(ret,[args,ret,true]);
			return ret;
		}
		/**
		 * @param {[string]} args
		 */
		function revokeObjectURL(...args) {
			let key=args[0];
			let cache_value=CreateObjURLCache.cache.get(key);
			CreateObjURLCache.cache.delete(key);
			if(cache_value) {
				CreateObjURLCache.expired.push(cache_value);
			}
			let ret=base.revokeObjectURL(...args);
			return ret;
		}
	}
}
g_api.CreateObjURLCache=CreateObjURLCache;
CreateObjURLCache.enable();

/**@template T */
class WMap {
	/**
	 * @param {Map<number, Map<number, Repeat<T>>>} map
	 */
	constructor(map) {
		this.value=map;
	}
}

/** @template T */
class Repeat {
	/**
	 * @template T
	 * @arg {Map<number, Map<number, Repeat<T>>>} mp
	 * @arg {{}} item
	 * @param {number} off
	 */
	static get_with(mp,item,off) {
		throw new Error("Method not implemented.");
	}
	/**@type {Repeat<null>} */
	static N=new Repeat(null,0);
	/**@type {Map<string, Map<number, Repeat<string>>>} */
	static map=new Map;
	/**@type {Map<number, Map<number, Repeat<number>>>} */
	static map_num=new Map;
	/**@type {Map<symbol, <T>()=>WMap<T>>} */
	map_instance=new Map;
	/**
	 * @template {ST} U
	 * @template {InstanceType<U>} V
	 * @arg {U} constructor_key
	 * @arg {V} _
	 * @returns {Map<number, Map<number, Repeat<V>>>}
	 * */
	get_map_T(constructor_key,_) {
		let res=Repeat.N.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<number, Map<number, Repeat<V>>>} */
			let map=new Map;
			Repeat.N.map_instance.set(constructor_key.type,() => new WMap(map));
			return map;
		}
		/**@type {WMap<V>} */
		let map=res();
		return map.value;
	}
	/**
	 * @template {ST} U
	 * @template {InstanceType<U>} V
	 * @arg {Repeat<null>} rep_null
	 * @arg {U} constructor_key
	 * @arg {number} key
	 * @returns {boolean}
	 * */
	has_map_T(constructor_key,rep_null,key) {
		let res=rep_null.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<number, Map<number, Repeat<V>>>} */
			let map=new Map;
			rep_null.map_instance.set(constructor_key.type,() => new WMap(map));
			return false;
		}
		/**@type {WMap<V>} */
		let map=res();
		return map.value.has(key);
	}
	/**
	 * @param {string} value
	 * @param {number} times
	 * @returns {Repeat<string>}
	 */
	static get(value,times) {
		if(!this.map.has(value)) {
			this.map.set(value,new Map);
		}
		let tm_map=this.map.get(value);
		if(!tm_map) throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep) throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/**
	 * @param {number} value
	 * @param {number} times
	 */
	static get_num(value,times) {
		if(!this.map_num.has(value)) {
			this.map_num.set(value,new Map);
		}
		let tm_map=this.map_num.get(value);
		if(!tm_map) throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep) throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/**
	 * @param {T} value
	 * @param {number} times
	 */
	constructor(value,times) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}

g_api.Repeat=Repeat;
class CompressRepeated {
	/** @template T @param {T[]} src @param {(T|Repeat<T>)[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @param {T[]} src @param {(T|Repeat<T>)[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @param {string[]} src @param {(string|Repeat<string>)[]} dst @returns {[boolean, (string|Repeat<string>)[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @param {(string | Repeat<string>)[]} src @param {string[]} dst @returns {[boolean, string[]]} */
	decompress_result(src,dst) {
		if(this.did_decompress(src,dst)) return [true,dst];
		return [false,dst];
	}
	/**
	 * @param {string | any[]} arr
	 */
	static can_compress_items(arr) {
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(typeof item!=='string') return false;
			if(item.match(/[a-zA-Z]/)===null) return false;
		}
		return true;
	}
	/** @param {string[]} arr */
	try_compress(arr) {
		/**@type {(string|Repeat<string>)[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length&&item===arr[i+1]) {
				let off=0;
				while(item===arr[i+off+1]) off++;
				if(off>0) {
					let rep_count=off+1;
					ret.push(Repeat.get(item,rep_count));
					i+=off;
					continue;
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr,ret);
	}
	/** @param {(string | Repeat<string>)[]} arr */
	try_decompress(arr) {
		/**@type {string[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(!item) continue;
			if(item instanceof Repeat) {
				let {value,times}=item;
				for(let j=0;j<times;j++)ret.push(value);
				continue;
			}
			ret.push(item);
		}
		return this.decompress_result(arr,ret);
	}
	/** @param {string[]} arr */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		{
			let [success,res]=this.try_compress(arr);
			this.try_decompress(res);
			if(success) return res;
		}
		return arr;
	}
}
g_api.CompressRepeated=CompressRepeated;
/**@template T */
class W {
	/**@arg {T} val */
	constructor(val) {
		this.val=val;
	}
}
/**@type {<T, U>(a:T[], b:U[])=>[T, U][]} */
function to_tuple_arr(keys,values) {
	/**@type {[typeof keys[0], typeof values[0]][]} */
	let ret=[];
	for(let i=0;i<keys.length;i++) {
		let k=keys[i];
		let v=values[i];
		/**@type {[typeof k, typeof v]} */
		let item=[k,v];
		ret.push(item);
	}
	return ret;
}
g_api.to_tuple_arr=to_tuple_arr;
/** @param {any[]} arr @param {number} index @param {number} value */
function range_matches(arr,value,index) {
	for(let i=index;i<arr.length;i++) {
		if(arr[i]!==value) return false;
	}
	return true;
}
class BaseCompression {
	/** @template T,U @arg {T[]} src @arg {U[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @arg {T[]} src @arg {T[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst @returns {[true, U[]] | [false, T[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[res: boolean,dst: string[]]} */
	decompress_result(src,dst) {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst];
		return [false,dst];
	}
}

class MulCompression extends BaseCompression {
	/**
	 * @param {TU<string, number>[]} arr
	 * @returns {DualR}
	 * @todo (MulCompression,try_compress_dual)
	 */
	try_compress_dual(arr) {
		/**@type {TX<string, number>[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				if(item===arr[i+1]) {
					let off=1;
					while(item===arr[i+off]) {
						off++;
					}
					if(off>1) {
						switch(item[0]) {
							case 'T': ret.push(['T',Repeat.get(item[1],off)]); break;
							case 'U': ret.push(['U',Repeat.get_num(item[1],off)]); break;
						}
						i+=off-1;
						continue;
					}
				}
			}
			ret.push(item);
		}
		if(this.did_compress(arr,ret))
			return [true,ret];
		return [false,arr];
	}
	/**
	 * @template {ST} U
	 * @template {InstanceType<U>} T
	 * @arg {U} c_k
	 * @arg {T[]} arr
	 * @returns {[true, X<T>[]]|[false,T[]]} */
	try_compress_T(c_k,arr) {
		/**@type {X<T>[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				if(item===arr[i+1]) {
					let off=1;
					while(item===arr[i+off]) {
						off++;
					}
					if(off>1) {
						let mp=Repeat.N.get_map_T(c_k,item);
						Repeat.get_with(mp,item,off);
						ret.push(new Repeat(item,off));
						i+=off-1;
						continue;
					}
				}
			}
			ret.push(item);
		}
		return this.compress_result_T(c_k,arr,ret);
	}

	/**
	 * @template {InstanceType<U>} T
	 * @template {abstract new (...args: any) => any} U
	 * @arg {U} _
	 * @arg {T[]} arr
	 * @arg {X<T>[]} ret
	 * @returns {[true, X<T>[]]|[false,T[]]} */
	compress_result_T(_,arr,ret) {
		if(this.did_compress(arr,ret)) return [true,ret];
		return [false,arr];
	}
	/** @arg {string[]} arr */
	try_compress(arr) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				if(item===arr[i+1]) {
					let off=1;
					while(item===arr[i+off]) {
						off++;
					}
					if(off>1) {
						ret.push(`${item}${off}`);
						i+=off-1;
						continue;
					}
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr,ret);
	}
	/**@arg {string[]} arr @returns {[res: boolean,dst: string[]]} */
	try_decompress(arr) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				let [item_type,num_data]=[item[0],item.slice(1)];
				let parsed=parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j=0;j<parsed;j++)
						ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr,ret);
	}
	/**@arg {string[]} arr */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success)
			arr=res;
		for(let i=0;i<4;i++) {
			stats_calculator_info.stats_calculator.calc_for_stats_index(stats_calculator_info.compression_stats,arr,i);
			let ls=stats_calculator_info.compression_stats[i];
			if(ls.length>0) {
				continue;
			}
			break;
		}
		let res_1=this.try_compress(arr);
		if(res_1[0])
			return res_1[1];
		return arr;
	}
}

class CompressionStatsCalculator {
	constructor() {
		/** @type {number[]} */
		this.hit_counts=[];
		/** @type {string[]} */
		this.cache=[];
		/**@type {MulCompression} */
		this.compressor=new MulCompression;
	}
	/**@arg {[string, number][][]} stats_arr @arg {string[]} arr @arg {number} index */
	calc_for_stats_index(stats_arr,arr,index) {
		stats_arr[index]=this.calc_compression_stats(arr,index+1);
	}
	/** @param {number} index */
	add_hit(index) {
		if(!this.hit_counts[index]) {
			this.hit_counts[index]=1;
		} else this.hit_counts[index]++;
	}
	/** @param {string} key */
	add_item(key) {
		let index=this.cache.indexOf(key);
		if(index==-1) {
			index=this.cache.push(key)-1;
		}
		this.add_hit(index);
	}
	reset() {
		this.cache.length=0;
		this.hit_counts.length=0;
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	/** @param {string[]} arr @param {number} win_size */
	calc_compression_stats(arr,win_size) {
		this.reset();
		for(let i=0;i<arr.length;i++) {
			if(i+win_size<arr.length) {
				this.add_item(arr.slice(i,i+win_size).join(","));
			}
		}
		let keys=this.map_keys();
		let values=this.map_values();
		return to_tuple_arr(keys,values);
	}
	/**
	 * @template T
	 * @template U
	 * @arg {T[]} arr
	 * @arg {number} range
	 * @arg {U} replacement
	 * @returns {(["T", T]|["U", U])[]}
	 * */
	replace_range(arr,range,replacement) {
		/**@type {(["T", T]|["U", U])[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			if(range_matches(arr,range,i)) {
				i+=1;
				ret.push(['U',replacement]);
				continue;
			}
			let rest=arr[i];
			ret.push(['T',rest]);
		}
		return ret;
	}
	test() {
		/**
		 * @param {any} a
		 * @param {any} c
		 * @param {any} m_require
		 */
		function found_modules(a,c,m_require) {
			void a,c,m_require;
		};
		/**
		 * @param {(this: Function, thisArg: any, ...argArray: any[]) => any} oc
		 * @param {{ (a: any, c: any, m_require: any): void; (arg0: any, arg1: any, arg2: any): void; }} cb
		 */
		function rv(oc,cb) {
			void oc;
			/**@type {any} */
			let fn_call=Function.prototype.call;
			/**@type {{rep?:boolean}} */
			let fn_call_1=fn_call;
			if(fn_call_1.rep) {
				location.reload();
				return;
			}
			var fr=document.createElement("iframe");
			document.head.append(fr);
			if(!fr.contentWindow) throw new Error("No content window");
			let content_window=fr.contentWindow.self;
			var function_proto_call=content_window.Function.prototype.call;
			var function_proto_apply_bound_to_function_proto_call=content_window.Function.prototype.apply.bind(function_proto_call);
			var function_prototype_apply_bound_to_function_prototype_apply=content_window.Function.prototype.apply.bind(content_window.Function.prototype.apply);
			/** @type {string[]} */
			let s_func=[];
			Function.prototype.call=npc;
			/**@this {Function} @arg {any} thisArg @arg {any[]} argArray */
			function npc(thisArg,...argArray) {
				var c;
				switch(argArray.length) {
					case 2:
						if(thisArg===argArray[1]&&argArray[0].exports==thisArg) {
							var ars=Object.entries(argArray[2]).filter(([j,e]) => e instanceof Array);
							var ars_i=ars[0][1].indexOf(this);
							if(ars[0][1].indexOf(this)>-1) {
								console.log("found module array:","require."+ars[0][0]);
								var mods=Object.entries(argArray[2]).filter(([_a,b]) => b.hasOwnProperty(ars_i)&&b[ars_i]===argArray[0]);
								if(mods.length>0) {
									console.log("found module cache:","require."+mods[0][0]);
									cb(ars[0][1],mods[0][1],argArray[2]);
								}
							}
						}
					default:
						c=function_proto_apply_bound_to_function_proto_call(this,[thisArg,...argArray]);
				}
				if(s_func.indexOf(this.toString())==-1) {
					s_func.push(this.toString());
				}
				return c;
			};
			/**
			 * @this {{}}
			 * @param {any} tv
			 * @param {any} r
			 */
			function nac(tv,r) {
				var c;
				c=function_prototype_apply_bound_to_function_prototype_apply(this,[tv,r]);
				if(s_func.indexOf(this.toString())==-1) {
					s_func.push(this.toString());
				}
				return c;
			};
			Function.prototype.apply=nac;
			npc.rep=1;
			window.g_api.s_func=s_func;
			return s_func;
		};
		rv(Function.prototype.call,found_modules);
		void [rv,found_modules];

		let obj={
			arr: [],
		};
		let rep_val=0.03/(100*4*1);
		let res=this.replace_range(obj.arr,rep_val,max_id);
		console.log("compressed",res);
	}
}
g_api.CompressionStatsCalculator=CompressionStatsCalculator;

let stats_calculator_info = {
	stats_calculator:new CompressionStatsCalculator,
	/**@type {[string, number][][]} */
	compression_stats:[],
}

g_api.range_matches=range_matches;
class VV {
	/**
	 * @param {any} callback
	 */
	constructor(callback) {
		this.m_cb=callback;
	}
	compress_main() {this.m_cb();}
}
let compressionStatsCalc=new CompressionStatsCalculator;
/** @param {[unknown, number][]} stats */
function log_stats(stats) {
	console.log(...stats.sort((a,b) => b[1]-a[1]));
}
/**
 * @param {string[]} arr
 * @param {number} calc_win
 */
function sorted_comp_stats(arr,calc_win) {
	let ret=compressionStatsCalc.calc_compression_stats(arr,calc_win);
	ret.sort((a,b) => b[1]-a[1]);
	return ret;
}
/**
 * @param {any[]} arr
 * @param {number} start
 */
function next_chunk(arr,start) {
	let s_arr;
	let last;
	let c_len;
	for(let i=start;i<start+30;i++) {
		if(s_arr) {
			last=s_arr[0][1];
		}
		s_arr=sorted_comp_stats(arr,i);
		if(!last)
			continue;
		let diff=last-s_arr[0][1];
		if(diff===0)
			continue;
		if(diff===1) {
			c_len=i;
			break;
		}
		console.log(s_arr[0],...s_arr.slice(0,8).map(e => e[1]));
	}
	return c_len;
}
/**
 * @type {string[]}
 */
let ids=[];
/**
 * @param {string} value
 */
function get_ids(value) {
	return ids.indexOf(value);
}
/**
 * @param {IValue} obj
 */
function calc_cur(obj) {
	if(!obj.stats_win||obj.arr_str===void 0) return;
	obj.stats=sorted_comp_stats(obj.arr_str,obj.stats_win);
}
/**
 * @param {IValue} obj
 * @param {number} max_id
 */
function calc_next(obj,max_id) {
	if(obj.stats===void 0||(obj.stats!==void 0&&obj.stats.length===0)) {
		return null;
	}
	let f_val=obj.stats[0];
	let rep_val=f_val[1];
	if(!obj.next) {
		return null;
	}
	/**@type {WithId & Partial<IDValueData>} */
	let next=obj;
	next.value=[max_id,'=',rep_val];
	next.log_val=[max_id,'=',f_val[0],f_val[1]];
	if(obj.arr_str===void 0) throw new Error("No arr");
	next.arr_dual=compressionStatsCalc.replace_range(obj.arr_str,rep_val,max_id);
	if(next.arr_str) return null;
	/**@type {DualR} */
	let compress_result=compressionStatsCalc.compressor.try_compress_dual(next.arr_dual);
	if(!compress_result[0]) {
		/**@type {TU<string, number>[]} */
		let res=[];
		for(let i of compress_result[1]) {
			/**@type {TU<string, number>|[]} */
			let res_1=[];
			switch(i[0]) {
				case 'T': if(typeof i[1] === 'string')res_1=[i[0],i[1]]; break;
				case 'U': if(typeof i[1] === 'number')res_1=[i[0],i[1]]; break;
			}
			if(!res_1) {
				throw new Error();
			}
			if(res_1.length) res.push(res_1);
		}
		next.arr_dual=res;
	} else {
		next.arr_dual_x=compress_result[1];
	}
	return compress_result;
}
/**
 * @param {IValue} value
 * @param {IValue} next
 */
function assign_next(value,next) {
	value.next=next;
	return next;
}
/**@implements {IValue} */
class Value {
	/** @param {number} id */
	constructor(id) {
		this.id=id;
	}
}
let max_id=0;
/**
 * @param {IValue} obj
 */
function run_calc(obj) {
	obj.stats_win=2;
	calc_cur(obj);
	if(!obj.stats) {
		return null;
	}
	if(obj.stats.length===0) {
		return null;
	}
	max_id++;
	let br_obj=Object.assign({},obj);
	if(!br_obj.stats_win) {
		return null;
	}
	br_obj.stats_win++;
	calc_cur(br_obj);
	let br_res=calc_next(br_obj,max_id);
	console.log('br_res',br_res);
	let res=calc_next(obj,max_id);
	/**@type {IValue|undefined} */
	let br_next=br_obj.next;
	/**@type {IValue|undefined} */
	let next=obj.next;
	while(true) {
		if(!next||next.arr_str===void 0) {
			break;
		}
		if(!br_next||br_next.arr_str===void 0) {
			break;
		}
		if(obj.stats_win>30) {
			break;
		}
		if(br_next.arr_str.length+1>=next.arr_str.length) {
			break;
		}
		let br_st=br_next.arr_str.length;
		br_obj.stats_win++;
		obj.stats_win++;
		calc_cur(br_obj);
		br_next=assign_next(br_obj,new Value(obj.id+1));
		br_res=calc_next(br_obj,max_id);
		calc_cur(obj);
		next=assign_next(br_obj,new Value(obj.id+1));
		res=calc_next(obj,max_id);
		if(!br_next.arr_str) continue;
		let cd=br_st-br_next.arr_str.length;
		if(cd<=1) break;
	}
	if(!res) {
		return [false,null];
	}
	return [true,res];
}
/* version_list file: group1/sub_a/item-_9.js */
/**
 * @param {{ id?: number; arr_rep?: any; arr?: boolean | string[]; next?: any; }} obj
 */
function flat_obj(obj) {
	let ret=[];
	while(obj.next) {
		let {next}=obj;
		ret.push(obj);
		obj=next;
	}
	ret.push(obj);
	return ret;
}
/**
 * @type {any[]}
 */
let g_obj_arr;
/**
 * @param {string | number} val
 */
function do_decode(val) {
	if(typeof val==='number') {
		let fv=g_obj_arr.slice(1).find(e => e.value[0]===val);
		if(!fv) {
			console.log('not found',val);
			return;
		}
		id_map[val]=fv.value.slice(2);
	} else {
		let fv=g_obj_arr.slice(1).find(e => e.value[0]===val);
		if(!fv) {
			console.log('not found',val);
			return;
		}
		id_map_str.set(val,fv.value.slice(2));
	}
}
/**
 * @param {string | number | Repeat<number>} e
 */
function try_decode(e,deep=true) {
	if(typeof e==='number') {
		if(dr_map[e]) {
			return dr_map[e];
		}
		if(id_map[e]) {
			let res=id_map[e];
			if(!deep) return res;
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			dr_map[e]=dec_res;
			return dec_res;
		}
		if(ids_dec[e]) {
			return ids_dec[e];
		}
	}
	if(e instanceof g_api.Repeat) {
		if(dr_map[e.value]) {
			return dr_map[e.value];
		}
		if(id_map[e.value]) {
			let res=id_map[e.value];
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			let ret=new g_api.Repeat(dec_res,e.times);
			dr_map[e.value]=ret;
			return ret;
		}
		if(ids_dec[e.value]) {
			return new g_api.Repeat(ids_dec[e.value],e.times);
		}
	}
	return null;
}
/**
 * @type {any[]}
 */
let id_map;

/**
 * @type {Map<string, any>}
 */
let id_map_str;
/**
 * @type {any[]}
 */
let ids_dec;
/**
 * @type {(Repeat<string | number>|Repeat<(string | number)[]>|(string | number)[])[]}
 */
let dr_map;
function init_decode() {
	dr_map=[];
	ids_dec=ids.map(e => JSON.parse(e));
	id_map=[];
	id_map_str=new Map;
}
/** @param {string|number} value @returns {string|number} */
function decode_map(value) {
	if(!id_map)
		init_decode();
	/**@type {number} */
	let dec=try_decode(value);
	if(!dec) {
		do_decode(value);
	}
	dec=try_decode(value);
	if(!dec) {
		console.log(value);
	} else {
		return dec;
	}
	return value;
}
/**
 * @type {<T extends {}|{}[]|Map<Mtk, Mtv>,Mtk,Mtv>(v1:T, v2:T)=>boolean} obj_1
 */
function deep_eq(obj_1,obj_2) {
	if(obj_1===obj_2)
		return true;
	if(obj_1 instanceof Array&&obj_2 instanceof Array) {
		if(obj_1.length===obj_2.length) {
			for(let i=0;i<obj_1.length;i++) {
				let cur=obj_1[i];
				let cur_other=obj_2[i];
				if(!deep_eq(cur,cur_other)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	if(Object.getPrototypeOf(obj_1)===Object.prototype) {
		let is_eq=deep_eq(Object.entries(obj_1),Object.entries(obj_2));
		if(is_eq)
			return true;
		return false;
	}
	if(obj_1 instanceof Map&&obj_2 instanceof Map) {
		return deep_eq([...obj_1.entries()],[...obj_2.entries()]);
	}
	throw new Error("Fixme");
}
/**
 * @arg {string[][]} arr_2d
 * @arg {number} key
 * @param {string} value
 */
function make_group_from_item(arr_2d,key,value) {
	arr_2d[key]??=[];
	let arr=arr_2d[key];
	for(let i=0;i<arr.length;i++) {
		if(arr[i]!==value) continue;
		return;
	}
	arr_2d[key].push(value);
}
/**
 * @type {AutoBuy}
 */
let g_auto_buy;
/**
 * @type {string[]}
 */
let src_arr;
function compress_init() {
	dr_map=[];
}
/**
 * @type {string[][]}
 */
let id_groups;
let el_ids;
class NumType {static type=Symbol.for("number");}
function compress_main() {
	compress_init();
	if(g_auto_buy) {
		src_arr=g_auto_buy.compressor.try_decompress(g_auto_buy.state_history_arr)[1];
	} else {
		console.log("TODO: use event_log (can't find it)");
		return;
	}
	ids=[...new Set(src_arr)];
	id_groups=[];
	for(let value of src_arr) {
		make_group_from_item(id_groups,ids.indexOf(value),value);
	}
	el_ids=src_arr.map(get_ids);
	max_id=new Set(el_ids).size;
	let arr=compressionStatsCalc.compressor.try_compress_T(NumType,el_ids);
	/**@type {IValue} */
	let obj_start={
		id: 0,
		arr_rep: el_ids,
	};
	if(arr[0]===true) {
		obj_start.arr_rep_num=arr[1];
	} else if(arr[0]===false) {
		obj_start.arr_num=arr[1];
	}
	for(let i=0,cur=obj_start;i<3000;i++) {
		let comp_res=run_calc(cur);
		if(!cur.stats) throw new Error();
		let obj=cur;
		if(obj.log_val&&comp_res===null) {
			console.log('id:'+obj.id,'[',...obj.log_val,']',obj.stats_win);
		}
		if(cur.stats.length===0) {
			break;
		}
		if(cur.stats[0][1]===1) {
			break;
		}
		if(cur.next) {
			cur=cur.next;
			continue;
		} else {
			break;
		}
	}
	g_obj_arr=flat_obj(obj_start);
}
g_api.compress_main=new VV(compress_main);
class HexRandomDataGenerator {
	constructor() {
		this.random_num=Math.random();
		this.used_bits=0;
		/**@type {{value:number,bit_count:number}|null} */
		this.cur_part={
			value: 0,
			bit_count: 0,
		};
	}
	reset() {
		this.random_num=Math.random();
		this.used_bits=0;
	}
	/**
	 * @param {number} bit_count
	 */
	next(bit_count) {
		let random_size=1<<bit_count;
		let num=~~(this.random_num*random_size);
		this.used_bits+=bit_count;
		this.random_num*=random_size;
		this.random_num-=num;
		return num;
	}
	reset_part() {
		this.cur_part=null;
	}
	/**
	 * @param {number} bit_count
	 */
	next_part(bit_count) {
		let cur_num=this.next(bit_count);
		if(this.used_bits>=48) {
			console.log('before_rng_reset',this.random_num);
			this.reset();
		}
		if(this.cur_part) {
			cur_num+=this.cur_part.value*bit_count;
			bit_count+=this.cur_part.bit_count;
			this.cur_part={
				value: cur_num,
				bit_count,
			};
		} else {
			this.cur_part={
				value: cur_num,
				bit_count: bit_count
			};
		}
	}
	complete() {
		if(!this.cur_part) throw new Error("unable to complete");
		return this.cur_part.value;
	}
	next_byte() {
		let size=1<<8;
		this.reset_part();
		this.next_part(4);
		this.next_part(4);
		let num=this.complete();
		return (size+num).toString(16).slice(1);
	}
}
g_api.HexRandomDataGenerator=HexRandomDataGenerator;
let random_data_generator=new HexRandomDataGenerator;
class EventListenerValue {
	/**
	 * @param {EventListenerOrEventListenerObject|null} callback
	 * @param {boolean | EventListenerOptions} options
	 */
	constructor(callback,options) {
		/**@type {EventListenerOrEventListenerObject|null} */
		this.callback=callback;
		/**@type {boolean | EventListenerOptions} */
		this.options=options;
	}
}
g_api.EventListenerValue=EventListenerValue;
class GenericEvent {
	#default_prevented=false;
	type='unknown';
	/**@param {string} type */
	constructor(type) {
		if(type) {
			this.type=type;
		}
	}
	preventDefault() {
		this.#default_prevented=true;
	}
	get defaultPrevented() {
		return this.#default_prevented;
	}
}
g_api.GenericEvent=GenericEvent;
class GenericDataEvent extends GenericEvent {
	/**
	 * @param {string} type
	 * @param {any} data
	 */
	constructor(type,data) {
		super(type);
		this.data=data;
	}
}
g_api.GenericDataEvent=GenericDataEvent;
class GenericEventTarget {
	constructor() {
		/**@type {Map<string,EventListenerValue[]>} */
		this._events=new Map;
	}
	/**
	 * @param {string} type
	 * @param {EventListenerOrEventListenerObject | null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	addEventListener(type,callback,options) {
		let cur_event_vec=this._events.get(type);
		if(!cur_event_vec) {
			cur_event_vec=[];
			this._events.set(type,cur_event_vec);
		}
		cur_event_vec.push(new EventListenerValue(callback,options));
	}
	/**
	 * @param {string} type
	 * @param {EventListenerOrEventListenerObject|null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	removeEventListener(type,callback,options) {
		let cur_event_vec=this._events.get(type);
		if(!cur_event_vec)
			return;
		if(cur_event_vec.length==0)
			return;
		for(let i=cur_event_vec.length-1;i>=0;i--) {
			let cur=cur_event_vec[i];
			if(cur.callback!==callback)
				continue;
			if(cur.options!==options)
				continue;
			cur.callback=null;
			cur_event_vec.splice(i,1);
		}
	}
	/**
	 * @param {Event} event
	 * @returns {boolean}
	 */
	dispatchEvent(event) {
		let event_type=event.type;
		let cur_event_vec=this._events.get(event_type);
		if(!cur_event_vec)
			return false;
		let cur_event_vec_owned=cur_event_vec.slice();
		let can_handle=false;
		for(let i=0;i<cur_event_vec_owned.length;i++) {
			let cur=cur_event_vec_owned[i];
			let callback=cur.callback;
			if(callback===null)
				continue;
			if(typeof callback==='function') {
				callback(event);
				can_handle=true;
				continue;
			}
			if(callback.handleEvent&&typeof callback.handleEvent==='function') {
				callback.handleEvent(event);
				can_handle=true;
			}
		}
		return can_handle;
	}
}
g_api.GenericEventTarget=GenericEventTarget;
const static_event_target=new GenericEventTarget;
class Dumper {
	/**@type {null} */
	m_dump_value=null;
	/**@arg {null} value */
	dump_value(value) {
		this.m_dump_value=value;
		this.m_dump_value=null;
	}
}
g_api.Dumper=Dumper;
const local_dumper=new Dumper;
class RustSimpleTokenizer {
	constructor() {
		this.index=0;
		this.source=null;
	}
	/**
	 * @param {any} str
	 */
	reset(str) {
		this.index=0;
		this.source=str;
	}
	/**
	 * @param {number} tok_len
	 */
	advance(tok_len) {
		this.index+=tok_len;
	}
	/**
	 * @param {number} char_code
	 */
	is_identifier(char_code) {
		// Regex: /[a-zA-Z_]/
		if(char_code>=0x41&&char_code<=0x5a) {
			return true;
		}
		if(char_code>=0x61&&char_code<=0x7a) {
			return true;
		}
		if(char_code==0x5f)
			return true;
		return false;
	}
	/**
	 * @param {any} char_code
	 */
	is_whitespace(char_code) {
		// Regex: /[ \t\n]/
		switch(char_code) {
			case 0x09:
				return true;
			case 0x0a:
				return true;
			case 0x20:
				return true;
		}
		return false;
	}
	m_separators=["{","}","(",")","<",">"];
	/**
	 * @param {any} char_code
	 */
	is_separator(char_code) {

	}
	/**
	 * @param {any} str
	 */
	str_to_tokens(str) {
		let separator_vec="{}()<>";
		let operator_vec=".,=:";
		let tok_arr=[];
		if(this.source!==str) {
			this.reset(str);
		}
		let parse_enum=[0,1,2,3,4,5,6,7];
		let parse_enum_invalid=parse_enum[0];
		let parse_enum_identifier=parse_enum[1];
		//let parse_enum_keyword=parse_enum[2]
		//let parse_enum_separator=parse_enum[3]
		let parse_enum_operator=parse_enum[4];
		//let parse_enum_literal=parse_enum[5]
		//let parse_enum_comment=parse_enum[6]
		let parse_enum_whitespace=parse_enum[7];
		for(;this.index<this.source.length;) {
			if(this.source[this.index]===':'&&this.source[this.index+1]===':') {
				tok_arr.push([parse_enum_operator,'::']);
				this.advance(2);
				continue;
			}
			let cur_char=this.source[this.index];
			if(separator_vec.includes(cur_char)) {
				tok_arr.push();
				this.advance(1);
				continue;
			}
			if(operator_vec.includes(cur_char)) {
				tok_arr.push([parse_enum_operator,cur_char]);
				this.advance(1);
				continue;
			}
			let cur_char_code=this.source.charCodeAt(this.index);
			if(this.is_identifier(cur_char_code)) {
				let len=1;
				while(this.is_identifier(this.source.charCodeAt(this.index+len))&&this.index+len<this.source.length) {
					len++;
				}
				tok_arr.push([parse_enum_identifier,this.source.slice(this.index,this.index+len)]);
				this.advance(len);
				continue;
			}
			if(this.is_whitespace(cur_char_code)) {
				tok_arr.push([parse_enum_whitespace,cur_char]);
				this.advance(1);
				continue;
			}
			tok_arr.push([parse_enum_invalid,cur_char]);
			this.advance(1);
			continue;
		}
		return tok_arr;
	}
	/**
	 * @param {any[][]} tok_arr
	 */
	into_tt(tok_arr) {
		let parse_enum=[0,1,2,3,4,5,6,7,8,9];
		//let parse_enum_invalid = parse_enum[0]
		//let parse_enum_identifier = parse_enum[1]
		//let parse_enum_keyword = parse_enum[2]
		let parse_enum_separator=parse_enum[3];
		//let parse_enum_operator = parse_enum[4]
		//let parse_enum_literal = parse_enum[5]
		//let parse_enum_comment = parse_enum[6]
		//let parse_enum_whitespace = parse_enum[7]
		let parse_enum_token_tree_item=parse_enum[8];
		let parse_enum_token_tree_body=parse_enum[9];
		let separator_open_vec="{}"[0]+"()"[0]+"<>"[0];
		let separator_close_vec="{}"[1]+"()"[1]+"<>"[1];
		let tt_stack=[];
		/**@type {any[]} */
		let tt_item=[];
		let cur_tt_vec;
		for(let x of tok_arr) {
			if(x[0]!==parse_enum_separator) {
				tt_item.push(x);
				continue;
			}
			let cur=x[1];
			if(separator_open_vec.includes(cur)) {
				tt_stack.push(tt_item);
				tt_item=[parse_enum_token_tree_item,x];
				tt_stack.push(tt_item);
				tt_item=[parse_enum_token_tree_body];
				continue;
			}
			if(separator_close_vec.includes(cur)) {
				if(!tt_stack.length) {
					throw SyntaxError('unbalanced token tree');
				}
				cur_tt_vec=tt_stack.pop();
				if(!cur_tt_vec) throw new Error("token stack underflow");
				cur_tt_vec.push(tt_item);
				cur_tt_vec.push(x);
				{
					let tt_item=tt_stack.pop();
					if(!tt_item) throw new Error("token stack underflow");
					tt_item.push(cur_tt_vec);
				}
				continue;
			}
			tt_item.push(x);
		}
		if(tt_stack.length) {
			throw SyntaxError('unexpected eof');
		}
		return tt_item;
	}
}
g_api.RustSimpleTokenizer=RustSimpleTokenizer;
class RustTokenTreeParser {
	tokenizer=new RustSimpleTokenizer;
	/**
	 * @param {string} str
	 */
	simple_type_info(str) {
		// let iter_index = 0
		this.tokenizer.reset(str);
		let token_vec=this.tokenizer.str_to_tokens(str);
		let tt_root=this.tokenizer.into_tt(token_vec);
		let trg_obj={
			body: tt_root[0]
		};
		return trg_obj;
	}
	result_ok_option_any_example() {
		let simple_type_info_str="{value:Result<_, ()>={discriminant:Result::discriminant=Result::Ok,value:Option<any>={discriminant:Option::discriminant=Option::Some,value=root.value}}}";
		let ret=this.simple_type_info(simple_type_info_str);
		return ret;
	}
}
g_api.RustSimpleParser=RustTokenTreeParser;
class WeakValueRef {
	id=-1;
	/**@arg {number} id */
	constructor(id) {
		this.id=id;
	}
}
g_api.WeakValueRef=WeakValueRef;
class CSSCascade {
	/**
	 * @param {{ sheet: any; }} style_element
	 * @param {any} css_style_variable
	 */
	render_css_variable_from_style_element(style_element,css_style_variable) {
		let style_sheet=style_element.sheet;
		let css_rules=style_sheet.cssRules;
		let css_rules_array=[...css_rules];
		let matching_css_rule=css_rules_array.find((/** @type {{ styleMap: { has: (arg0: any) => any; }; }} */ e) => e.styleMap.has(css_style_variable));
		return matching_css_rule.styleMap.get(css_style_variable);
	}
	/**
	 * @param {any[]} result_acc_vec
	 * @param {any} cssRules
	 * @param {any} find_needle
	 */
	iterate_css_rule_list_for_rule_matches(result_acc_vec,cssRules,find_needle) {
		let as_arr=[...cssRules];
		for(let i=0;i<as_arr.length;i++) {
			if(as_arr[i] instanceof CSSMediaRule) {
				this.iterate_css_rule_list_for_rule_matches(result_acc_vec,as_arr[i].cssRules,find_needle);
				//recursive iterate
			}
			if(this.does_match_selector(as_arr[i],find_needle)) {
				result_acc_vec.push(as_arr[i]);
			}
		}
	}
	/**
	 * @param {{ name: string | any[]; selectorText: string | any[]; }} rule
	 * @param {string} find_needle
	 */
	does_match_selector(rule,find_needle) {
		if(rule instanceof CSSKeyframesRule)
			return rule.name.includes(find_needle);
		if(rule instanceof CSSFontFaceRule)
			return false;
		if(rule instanceof CSSMediaRule) {
			// this rule was already handled recursively
			return false;
		}
		if(rule.selectorText)
			return rule.selectorText.includes(find_needle);
		// the user should figure out if they want this,
		// if not, then report an issue
		return true;
	}
	/**
	 * @param {HTMLStyleElement} element
	 * @param {any} find_needle
	 */
	search_for_matching_css_rule(element,find_needle) {
		/**
		 * @type {never[]}
		 */
		let result_vec=[];
		if(!element.sheet) throw new Error("style element without sheet");
		this.iterate_css_rule_list_for_rule_matches(result_vec,element.sheet.cssRules,find_needle);
		return result_vec;
	}
	/**
	 * @param {any} target_css_selector_needle
	 */
	find_matching_css_rules_in_document(target_css_selector_needle) {
		{
			/**@type {HTMLStyleElement[]} */
			let doc_all=[];
			let doc_query=document.querySelectorAll("style");
			for(let i=0;i<doc_query.length;i++) {
				doc_all.push(doc_query[i]);
			}
			return doc_all.flatMap(e => {
				return this.search_for_matching_css_rule(e,target_css_selector_needle);
			});
		}
	}
	*temp() {
		yield;
	}
}
g_api.CSSCascade=CSSCascade;
class TransportMessageObj {
	/**@type {WeakRef<RemoteOriginConnection>|null} */
	w_connection=null;
	/**@type {number|null|undefined} */
	elevation_id=null;
	/** @type {Window|null} */
	current_target=null;
	/**
	 * @param {any} message_event_response
	 */
	handleEvent(message_event_response) {
		if(this.w_connection&&this.w_connection.deref()==null) {
			console.log('lost connection in handleEvent');
			this.disconnect();
			return;
		}
		this.w_connection&&this.w_connection.deref()?.transport_init_maybe_complete({
			event: message_event_response,
			handler: this
		});
	}
	/**
	 * @param {RemoteOriginConnection} connection
	 */
	construct(connection) {
		this.w_connection=new WeakRef(connection);
	}
	/** @type {ReturnType<typeof setTimeout>|null} */
	timeout_id=null;
	/**
	 * @param {Window} transport_target
	 * @param {number} timeout_ms
	 */
	start(transport_target,timeout_ms) {
		if(!this.w_connection) throw new Error();
		this.elevation_id=this.w_connection.deref()?.elevate_object(this);
		this.connect(transport_target);
		this.timeout_id=setTimeout(() => {
			if(!this.w_connection) throw new Error();
			if(this.w_connection.deref()==null) {
				console.log('lost connection in timeout');
			}
			this.disconnect();
			this.clear();
		},timeout_ms);
	}
	/**
	 * @param {Window} target
	 */
	connect(target) {
		if(this.current_target!==null&&this.current_target!==target)
			this.disconnect();
		this.current_target=target;
		this.current_target.addEventListener('message',this);
	}
	disconnect() {
		if(this.current_target) {
			this.current_target.removeEventListener('message',this);
		}
	}
	clear() {
		if(!this.w_connection) throw new Error();
		if(this.w_connection.deref()==null) {
			console.log('lost connection in clear');
			return;
		}
		if(this.elevation_id===null) throw new Error();
		if(this.elevation_id===void 0) throw new Error();
		this.w_connection.deref()?.clear_elevation_by_id(this.elevation_id);
	}
}
class OriginState {
	/**@readonly*/static window=window;
	/**@readonly*/static top=window.top;
	/**@readonly*/static parent=window.parent;
	/**
	 * @type {Window|null}
	 * @readonly
	 * */
	static opener=window.opener;
	/**
	 * @type {boolean}
	 */
	static is_top;
	/**
	 * @type {boolean}
	 */
	static is_root;
}
g_api.OriginState=OriginState;
class RemoteOriginConnection {
	// @Update on minor version change
	// version 0.3.0 sha1 initial commit
	sha_1_initial="f615a9c";
	constructor() {
		this.max_elevate_id=0;
		/**@type {WeakMap<Window, Window>} */
		this.event_transport_map=new WeakMap;
		this.state=OriginState;
		/**
		 * @type {(WeakRef<any>|null)[]}
		 */
		this.elevated_array=[];
		this.state.is_top=this.state.window===this.state.top;
		this.state.is_root=this.state.opener===null;
		this.setup_root_proxy(this.state.window);
		if(!this.state.is_top)
			this.state.is_root=false;
		if(this.state.opener===null) {
			this.start_root_server();
		} else {
			if(this.state.is_top) {
				this.init_transport_over(this.state.opener,this.state.window);
			}
		}
	}
	/**
	 * @param {Window & typeof globalThis} window
	 */
	setup_root_proxy(window) {
		//TODO
		let todo=true;
		if(!todo) {
			return window;
		}
	}
	/**
	 * @param {Window} post_message_event_transport_target
	 * @param {Window} response_message_event_transport_target
	 */
	init_transport_over(post_message_event_transport_target,response_message_event_transport_target) {
		let channel=new MessageChannel;
		this.port=channel.port2;
		post_message_event_transport_target.postMessage({
			type: "ConnectOverPostMessage",
			data: {
				type: "start",
				source: null,
				port_transfer_vec: null
			}
		},"*",[channel.port1]);
		this.event_transport_map.set(response_message_event_transport_target,post_message_event_transport_target);
		let message_object=new TransportMessageObj;
		message_object.construct(this);
		message_object.start(response_message_event_transport_target,300);
	}
	/**
	 * @param {number} elevated_id
	 */
	clear_elevation_by_id(elevated_id) {
		this.elevated_array[elevated_id]=null;
		//TODO
	}
	max_elevated_id=0;
	/**
	 * @param {any} object
	 */
	elevate_object(object) {
		let elevated_id=this.max_elevated_id++;
		this.elevated_array[elevated_id]=new WeakRef(object);
		return elevated_id;
	}
	/**
	 * @param {any} message_event
	 */
	transport_init_maybe_complete(message_event) {
		//TODO
	}
	start_root_server() {
		//TODO
	}
}
g_api.ConnectToRemoteOrigin=RemoteOriginConnection;
class APIProxyManager {
	/**
	 * @param {LoggingEventTarget} event_handler
	 */
	constructor(event_handler) {
		this.event_handler=event_handler;
	}
	/**
	 * @param {string} message_to_send
	 * @param {()=>void} function_value
	 */
	create_proxy_for_function(message_to_send,function_value) {
		let event_handler=this.event_handler;
		let obj={
			event_handler,
			/**@arg {[target: () => void, thisArg: any, argArray: any[]]} post_message_proxy_spread */
			apply(...post_message_proxy_spread) {
				this.event_handler.dispatchEvent({
					type: message_to_send,
					data: post_message_proxy_spread
				});
				let ret=Reflect.apply(...post_message_proxy_spread);
				return ret;
			}
		};
		return new Proxy(function_value,obj);
	}
	start_postMessage_proxy() {
		/**@type {any} */
		let win_post_message=window.postMessage;
		window.postMessage=this.create_proxy_for_function('postMessage_sent',win_post_message);
	}
}
g_api.APIProxyManager=APIProxyManager;
class LoggingEventTarget {
	dispatchEvent=console.log.bind(console);
}
g_api.LoggingEventTarget=LoggingEventTarget;
const html_parsing_div_element=document.createElement("div");
/**
 * @param {string} html
 */
function parse_html_to_binary_arr(html) {
	html_parsing_div_element.innerHTML=html;
	return Array.prototype.map.call(html_parsing_div_element.textContent,e => e.charCodeAt(0));
}
window.parse_html_to_binary_arr=parse_html_to_binary_arr;
class DebugAPI {
	constructor() {
		let do_postMessage_logging=false;
		if(do_postMessage_logging) {
			this.any_api_logger.start_postMessage_proxy();
		}
	}
	any_api_logger=new APIProxyManager(new LoggingEventTarget);
	next_remote_id=0;
	data_store=new Map;
	event_handler=static_event_target;
	static udp_like_remote_origin_connection=new RemoteOriginConnection();
	static token_tree_parser=new RustTokenTreeParser;
	/**@type {DebugAPI|null} */
	static m_the=null;
	/**@returns {DebugAPI} */
	static the() {
		if(!this.m_the) {
			this.m_the=new this;
		}
		return this.m_the;
	}
	/** @arg {string} key */
	hasData(key) {
		return this.data_store.has(key);
	}
	/** @arg {string} key */
	getData(key) {
		return this.data_store.get(key);
	}
	/** @arg {string} key @arg {any} value */
	setData(key,value) {
		this.data_store.set(key,value);
		return this;
	}
	/** @arg {string} key */
	deleteData(key) {
		return this.data_store.delete(key);
	}
	/**
	 * @param {any} element
	 */
	getEventListeners(element) {
		if(!this.hasData('getEventListeners'))
			throw 1;
		return this.getData('getEventListeners')(element);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {(this: any, ...args: readonly any[]) => any} func
	 * @param {any} name
	 */
	get_event_listener_var_vec_1(debug,undebug,func,name) {
		this.attach(debug,undebug,null);
		/**
		 * @param {(this: any, ...args: readonly any[]) => any} func
		 * @param {any} f_this
		 * @param {readonly any[]} c_args
		 */
		function do_activate(func,f_this,c_args) {
			try {
				return Reflect.apply(func,f_this,c_args);
			} catch {}
		}
		let activate=do_activate.bind(null,func,{},[{
			get target() {
				throw 1;
			}
		}]);
		return this.debuggerGetVar_a(func,activate,name,[]);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {null} getEventListeners
	 */
	attach(debug,undebug,getEventListeners) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug=this.getData('d');
		let obj_undebug=this.getData('u');
		let get_ev_lis=this.getData('getEventListeners');
		if(obj_debug!==debug||obj_undebug!==undebug||get_ev_lis!==getEventListeners) {
			this.setData('d',debug);
			this.setData('u',undebug);
			this.setData('getEventListeners',getEventListeners);
		}
		return this;
	}
	/**
	 * @param {new (...arg0: any[]) => any} class_value
	 * @param {any[]} arg_vec
	 */
	activateClass(class_value,arg_vec) {
		return new class_value(...arg_vec);
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} arg_vec
	 */
	activateApply(function_value,target_obj,arg_vec) {
		return Reflect.apply(function_value,target_obj,arg_vec);
	}
	debuggerBreakpointCode() {
		window.g_api.DebugAPI.the().getData("__k").get=(/** @type {string} */ __v) => {
			if(__v==='__v') {
				return {
					type: 'eval-hidden-var',
					data: null,
				};
			}
			try {
				return {
					type: 'var',
					data: [__v,eval(__v)]
				};
			} catch {
				return {
					type: 'no-var',
					data: null
				};
			}
		};
		if(!window.g_api.DebugAPI.the().clearCurrentBreakpoint()) {
			console.log("failed to clear breakpoint");
		}
		0;
	}
	clearCurrentBreakpoint() {
		let undebug;
		if(undebug=this.getData("u")) {
			undebug(this.current_function_value);
			return true;
		}
		return false;
	}
	/**
	 * @argument {Function} function_value
	 * @returns {string}
	*/
	stringifyFunction(function_value) {
		let function_code=function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code=function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	/**
	 * @param {any} function_value
	 * @param {any} activate
	 * @param {string} var_match
	 * @arg {any} target_obj
	 * @param {any[]} target_activate_args
	 */
	debuggerGetVarArray_a(function_value,activate,var_match,target_obj,target_activate_args) {
		let activate_vec=[target_obj,target_activate_args];
		if(!this.hasData("d")||!this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value!='function') {
			return {
				type: 'argument-error',
				data: null
			};
		}
		let ma=var_match.matchAll(/.-.|./g);
		let sr=[];
		let qs=[...ma].map(e => e[0]);
		for(let j of qs) {
			if(j.length===1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			let fs=j.split('-');
			let sa=fs[0].charCodeAt(0);
			let se=fs[1].charCodeAt(0);
			for(let i=sa;i<=se;i++) {
				sr.push(i);
			}
		}
		let vars_arr=sr.map(e => String.fromCharCode(e));
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value=function_value;
		let breakpoint_code_string=this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr=[];
		{
			rep_arr.push('__v','__v_'+rng_bytes);
			rep_arr.push('__k','__k_'+rng_bytes);
			rep_arr.push('__x','__x_'+rng_bytes);
		}
		let tmp_key='__k';
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i];
				let cur1=rep_arr[i]+1;
				if(tmp_key===cur0) {
					tmp_key=cur1;
				}
				breakpoint_code_string=breakpoint_code_string.replaceAll(cur0,cur1);
			}
		}
		/**@type {{get?:(val:string)=>any}} */
		let tmp_value={};
		this.setData(tmp_key,tmp_value);
		let debug=this.getData('d');
		debug(this.current_function_value,`${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return=activate(function_value,activate_vec);
		let exec_res_arr=[];
		if(tmp_value.get) {
			for(let j of vars_arr) {
				let res=tmp_value.get(j);
				switch(res.type) {
					case 'var':
						exec_res_arr.push(res.data);
						break;
					case 'no-var':
						break;
					case 'eval-hidden-var':
						console.log('can\'t use dynamic eval for var hidden by eval argument "'+j+'"');
				}
			}
		}
		this.deleteData(tmp_key);
		if(exec_res_arr.length) {
			return {
				type: 'data',
				data: {
					result: exec_res_arr,
					return: exec_return
				}
			};
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: exec_return
			}
		};
	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray_c(class_value,target_arg_vec,var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(class_value,this.activateClass,var_match,target_arg_vec[0],target_arg_vec.slice(1));
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray(function_value,target_obj,target_arg_vec,var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(function_value,this.activateApply,var_match,target_obj,target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {(this: any, ...args: readonly any[]) => any} function_value
	 * @param {any} activate
	 * @param {any} var_name
	 * @param {any[]} activate_vec
	 */
	debuggerGetVar_a(function_value,activate,var_name,activate_vec) {
		if(!this.hasData("d")||!this.getData("u")) {
			return {
				/**@type {"invalid-state-error"} */
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value!='function') {
			return {
				/**@type {"argument-error"} */
				type: 'argument-error',
				data: null
			};
		}
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value=function_value;
		let dbg_str_func=this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr=[];
		{
			rep_arr.push('__v','__v_'+rng_bytes);
			rep_arr.push('__k','__k_'+rng_bytes);
			rep_arr.push('__x','__x_'+rng_bytes);
		}
		let map_arr=[dbg_str_func];
		let tmp_key='__k';
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i];
				let cur1=rep_arr[i]+1;
				if(tmp_key===cur0) {
					tmp_key=cur1;
				}
				map_arr[0]=map_arr[0].replaceAll(cur0,cur1);
			}
			dbg_str_func=map_arr[0];
		}
		class DebugInfoValue {
			valid=false;
			/**@arg {string} __v @returns {{type: 'hidden-var',var: string}|{type: 'var',data: [string,any]}|{type: 'no-var', data: null}|null} */
			get(__v) {
				return null;
			}
		}
		let tmp_value=new DebugInfoValue;
		this.setData(tmp_key,tmp_value);
		this.getData('d')(this.current_function_value,`${dbg_str_func}`);
		// ---- Activate ----
		let activate_return=activate(function_value,activate_vec);
		let breakpoint_result=null;
		if(tmp_value.get) {
			breakpoint_result=tmp_value.get(var_name);
		}
		this.deleteData(tmp_key);
		if(breakpoint_result?.type==='var') {
			return {
				/**@type {"data"} */
				type: 'data',
				data: {
					result: breakpoint_result.data,
					return: activate_return
				}
			};
		}
		if(breakpoint_result) {
			return {
				/**@type {"unexpected"} */
				type: 'unexpected',
				data: {
					result: breakpoint_result,
					return: activate_return
				}
			};
		}
		return {
			/**@type {"no-response"} */
			type: 'no-response',
			data: {
				result: null,
				return: activate_return
			}
		};

	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar_c(class_value,target_arg_vec,var_name) {
		if(typeof class_value!='function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVar_a(class_value,this.activateClass,var_name,target_arg_vec);
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar(function_value,target_obj,target_arg_vec,var_name) {
		if(typeof function_value!='function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			let ret=this.debuggerGetVar_a(function_value,this.activateApply,var_name,[target_obj,target_arg_vec]);
			if(ret.type!=='data') throw new Error("Debug fail");
			if(ret.data===null) throw new Error("Debug fail");
			if(ret.data.result===null) throw new Error("Debug fail");
			if(ret.data.result.length>2) return ret.data.result;
			if(!ret.data.result.length) return ret;
			return {
				type: 'debug_data',
				result: ret.data.result[1],
				return: ret.data.return
			};
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
}
g_api.DebugAPI=DebugAPI;
const debug_api=window.g_api.DebugAPI.the();
