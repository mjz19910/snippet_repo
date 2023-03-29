/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14.js
*/
"use strict";

const {as}=require("../../api/as");

/** @template T @arg {T[]} x @arg {T[]} o_arr */
function intersect_array_get_added(x,o_arr) {
	return x.filter((x) => !o_arr.includes(x));
}
/** @type {Map<string,JsonInputType[]>} */
const cache_map=new Map;
/** @arg {CacheItemType} e @returns {e is HTMLDivElement} */
let get_div_elements=(e) => e instanceof HTMLDivElement;
/** @param {(arg0:typeof exports) => void} fn */
function export_(fn) {
	/** @type {any} */
	let any_obj={};
	fn(any_obj);
}
export_(exports => exports.get_div_elements=get_div_elements);
function main() {
	store_window("__JsonReplacer_cache_map",cache_map);
}
export_(exports => exports.item_14_main=main);
/** @template T @arg {string} key @arg {T} obj */
function store_window(key,obj) {
	/** @type {{}} */
	let win=window;
	/** @type {{[x: string]: T;}} */
	let w2=win;
	if(w2[key])
		return w2[key];
	w2[key]=obj;
	return obj;
}
//#region string manipulation
/** @private @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {Split<X,string extends S?",":S>} */
function split_string(x,s=as(",")) {
	if(!x) {
		debugger;
	}
	let r=x.split(s);
	return as(r);
}
export_(exports => exports.split_string=split_string);
//#endregion
/** @template T @arg {T|null} x @returns {x is T} */
let is_non_null=x => x!==null;
/** @template T @arg {(T|null)[]} x @returns {x is T[]} */
function is_filter_out_null(x) {
	return x.every(x => is_non_null(x));
}
// ~~~~~~~~~~~~~~~~~~~~~ Typed Functions ~~~~~~~~~~~~~~~~~~~~~
/** @template {EntriesType} ARR_T @arg {ARR_T} arr @returns {EntriesToObject<ARR_T>} */
function createTypedObjectFromEntries(arr) {
	let fe=Object.fromEntries(arr);
	/** @type {EntriesToObject<ARR_T>} */
	return as(fe);
}
class H_Iter {
	/** @template {keyof T} T_K @template {T[T_K]} T_V @template {object|Map<M_K,M_V>} T @arg {[T_K,T_V]} v @returns {[T_K,T_V]|null} @template M_V,M_K @arg {[string,Map<M_K,M_V>][]} json_result_cache_arr */
	obj_ent_rep(v,json_result_cache_arr) {
		const [k,x]=v;
		if(x===null)
			return null;
		if(typeof x!=="object")
			return v;
		if(x instanceof Map) {
			if(x.size<=0) {
				return null;
			}
			if(k==="json_result_cache") {
				/** @arg {[M_K,M_V]} arg0 @returns {[M_K,M_V]} */
				let filter_map_entries=([k,x]) => [k,filter_json(x)];
				/** @type {[M_K,M_V][]} */
				let map_entries_arr=[...x.entries()];
				let mk_map=new Map(map_entries_arr.map(filter_map_entries));
				/** @type {[string,Map<M_K,M_V>]} */
				let entry=[k,mk_map];
				json_result_cache_arr.push(entry);
			}
		}
		if(x instanceof Array&&x.length<=0)
			return null;
		let x1=Object.entries(x);
		if(x1.length<=0)
			return null;
		return v;
	}
}
export_(exports => exports.H_Iter=H_Iter);
/** @arg {any[]} range_arr @arg {any} start @arg {any} end */
function add_range_item(range_arr,start,end) {
	if(start===end) {
		range_arr.push([start]);
	} else {
		range_arr.push([start,end]);
	}
}
/** @arg {string | any[]} arr */
function to_range(arr) {
	if(arr.length<1)
		return [];
	let cur=arr[0];
	let cur_start=cur;
	/** @type {string | any[]} */
	let res=[];
	let cur_n=0;
	cur_n;
	for(let x of arr) {
		if(x===arr[0]&&res.length===0)
			continue;
		if(x===cur+1) {
			cur_n++;
			cur=x;
			continue;
		}
		add_range_item(res,cur_start,cur);
		cur=x;
		cur_start=x;
		cur_n=0;
	}
	add_range_item(res,cur_start,cur);
	return res;
}
/** @arg {any[]} x */
function reduce_arr_flat(x) {
	return x.reduce((acc,cur) => acc.concat(cur),[]);
}
export_(exports => exports.reduce_arr_flat=reduce_arr_flat);
/** @arg {Map<string, JsonInputType[]>} map */
function show_cache_map(map) {
	let cm_info=[...map.entries()].map(([k,x]) => ["\n",`[${k}]`,...x]);
	let r_cm_info=cm_info.reduce((acc,cur) => acc.concat(cur),[]);
	console.log("-- [cache_map] --\n"+"%o\n".repeat(r_cm_info.length),...r_cm_info);
}
export_(exports => exports.show_cache_map=show_cache_map);
/** @arg {{}} x */
function Z_len_k(x) {
	return get_keys_of(x).length;
}
export_(exports => exports.Z_len_k=Z_len_k);
/** @protected @template {{}} T @arg {T} obj @returns {T_DistributedKeysOf<T>} */
function get_keys_of(obj) {
	if(!obj) {
		debugger;
	}
	let rq=Object.keys(obj);
	/** @private @type {any} */
	let ra=rq;
	return ra;
}
export_(exports => exports.get_keys_of=get_keys_of);
/** @type {JsonOutputBox[]} */
const index_box_store=[];
export_(exports => exports.index_box_store=index_box_store);
class JsonOutputData {
	/** @type {DataItemReturn[]} */
	output_arr=[];
	/** @type {Map<JsonInputType,number>} */
	cache_index_map=new Map;

}
class JsonOutputBox {
	data=new JsonOutputData;
	get output_arr() {
		return this.data.output_arr;
	}
	get cache_index_map() {
		return this.data.cache_index_map;
	}
	reset() {
		this.output_arr.length=0;
		this.cache_index_map.clear();
		return this;
	}
	/** @arg {"results"|"results_history"} sub_section */
	get_log_self_args(sub_section) {
		let log_self_info=this.get_self_for_logging();
		if(log_self_info.size<1)
			return null;
		return [`-- [JsonOutputBox] [${sub_section}] --\n%o`,log_self_info.out];
	}
	/** @typedef {{out:Partial<JsonOutputData>,size:number}} OutState */
	/** @private @template {keyof JsonOutputData} K @arg {OutState} x @arg {K} k @arg {JsonOutputData[K]} v */
	add_to_output(x,k,v) {
		x.out[k]=v;
		x.size++;
	}
	/** @private @returns {OutState} */
	get_self_for_logging() {
		let out_state={
			out: {},
			size: 0,
		};
		for(let k of get_keys_of(this.data)) {
			switch(k) {
				case "cache_index_map":
					{
						let ck=this[k];
						if(ck.size<=0)
							continue;
						this.add_to_output(out_state,k,ck);
					}
					break;
				case "output_arr":
					{
						let ck=this[k];
						if(ck.length<=0)
							continue;
						this.add_to_output(out_state,k,ck);
					}
					break;
				default:
					k==="";
					debugger;
			}
		}
		return out_state;
	}
}
export_(exports => exports.JsonOutputBox=JsonOutputBox);
const overflow_state=new class {
	ran_out_of_stack=false;
	/** @type {[string]|null} */
	ran_out_of_stack_args=null;
	/** @type {["TAG::error",string]|null} */
	stack_limit_json_result=null;
	/** @type {number|null} */
	last_stack_space=null;
};
/** @type {number[]} */
/** @type {JsonInputType[]} */
const json_cache_arr=[];
//#region on_data_item
/** @arg {JsonOutputBox} res @arg {["cache", CacheItemType]|["store_object",JsonInputType]|["cache_index_and_arr",CacheIndexWithArr]} x */
function on_run_request(res,x) {
	switch(x[0]) {
		case "cache":
			break;
		case "store_object":
			break;
		case "cache_index_and_arr":
			debugger; return null;
	}
	return init_json_event_sys_with_obj(res,x[1]);
}
let json_output=new JsonOutputBox;
let history_output=new JsonOutputBox;
let next_id=0;
function main_start_json_replace() {
	let res=json_output.reset();
	let doc_child=document.body.firstElementChild;
	if(!doc_child)
		throw new Error("No firstElement of document.body");
	init_json_event_sys_with_obj(res,doc_child);
	/** @type {JsonHistoryType} */
	let x1={
		id: next_id++,
		items: [res],
	};
	/** @type {JsonStackType} */
	let new_item=["TAG::stack",x1];
	stack.push(new_item);
	let history_res=history_output.reset();
	history_iter(history_res);
	let res_log=res.get_log_self_args("results");
	if(res_log) {
		console.log(...res_log);
	}
	let history_log=history_res.get_log_self_args("results_history");
	if(history_log) {
		console.log(...history_log);
	}
}
let do_join_str=() => join_string(["\n","%o"],"");
export_(exports => exports.do_join_str=do_join_str);
/** @type {["TAG::result_data",HistoryResultData][]} */
const result_data_arr=[];
export_(exports => exports.result_data_arr=result_data_arr);
/** @type {{}[]} */
const done_history_items=[];
/** @type {number[]} */
let started_id_arr=[];
/** @typedef {["TAG::stack", JsonHistoryType]} JsonStackType */
/** @type {JsonStackType[]} */
let stack=[];
/** @arg {JsonOutputBox} out_res @arg {JsonHistoryType} item */
function history_iter_iter_stack_tag(out_res,item) {
	started_id_arr.push(item.id);
	console.log("start iter",item.id);
	let result_data=HistoryResultData.make(item.items[0]);
	if(!result_data)
		return;
	out_res.output_arr.push(["TAG::result_data",result_data]);
}
/** @arg {JsonOutputBox} out_res */
function history_iter(out_res) {
	if(stack.length===0) {
		return;
	}
	let all_history_arr=[];
	while(stack.length>0) {
		let x=stack.shift();
		if(!x) {
			break;
		}
		if(done_history_items.includes(x)) {
			continue;
		}
		done_history_items.push(x);
		all_history_arr.push(x);
		if(done_history_items.length>12) {
			return;
		}
		let stack_item=x;
		switch(stack_item[0]) {
			default: debugger; break;
			case "TAG::stack":
				history_iter_iter_stack_tag(out_res,stack_item[1]);
		}
	}
	let log_range=to_range(started_id_arr);
	console.log("[done_ids] "+log_range.map(e => e.length===2? "%o-%o":"%o").join(", "),...log_range.flat());
}
/** @type {{}[]} */
const stringify_failed_obj=[];
/** @arg {DataItemReturn} x */
function invert_tag(x) {
	return x[1];
}
export_(exports => exports.invert_tag=invert_tag);
/** @arg {DataItemReturn} x */
function do_json_replace_on_iterate_cmd(x) {
	/** @type {["JSON::Data", x[0], string][]} */
	let res=[];
	if(!(x[1] instanceof Array))
		return res;
	for(let u of x[1]) {
		res.push(["JSON::Data",x[0],JSON.stringify(u,json_replacer,"\t")]);
	}
	return res;
}
export_(exports => exports.do_json_replace_on_iterate_cmd=do_json_replace_on_iterate_cmd);
/** @type {PendingCommandItem[]} */
let pending_commands=[];
/** @arg {DataItemReturnAlt} x */
function dispatch_json_event(x) {
	/** @type {string[]} */
	let res=[];
	switch(x[0]) {
		case "COMMAND::unpack:1":
			{
				let unpack=x[1];
				if(unpack[0]==="handle_result") {
					return res;
				}
				let [s]=unpack;
				for(let u of unpack[1]) {
					false&&console.log("[COMMAND::unpack] [%s]",s,u);
					/** @type {UnpackUnitCommand} */
					let pk=as(["COMMAND::unpack_unit",[s,u]]);
					pending_commands.push(["unit",pk]);
				}
				return res;
			}
		case "TYPE::DBG_What:1":
			{
				console.log("[DBG_What]",x[1]);
				return res;
			}
		case "TYPE::DataItemReturn:1":
		case "EVENT::input:1":
		case "EVENT::vnodes:1":
		case "EVENT::dom_nodes:1":
		case "EVENT::json_cache:1":
		case "RESULT::handle_json_event:1":
		case "EVENT::vue_app:1":
		default:
			let arr=json_stringify_with_cache(["JSON::event",x]);
			res.push(...arr[1]);
			return res;
	}
}
/** @template {[any]} T @template {["JSON::data",T]|["JSON::pack",UnpackUnitArgs]|["JSON::event",DataItemReturnAlt]} A @arg {A} x @returns {["T",[string]]|["U",string[]]} */
function json_stringify_with_cache(x) {
	switch(x[0]) {
		default: x[0]===""; debugger; return ["U",[]];
		case "JSON::data":
			{
				let item=x[1];
				let obj_keys=get_keys_of(x[1]);
				console.log("[json_data_keys]",obj_keys.join());
				if(item.length!==1) {
					debugger;
					return ["U",[]];
				}
				let str=JSON.stringify(item[0],json_replacer,"\t");
				return ["T",[str]];
			}
		case "JSON::pack":
			let item=x[1];
			switch(item[0]) {
				case "Node":
					{
						let x=item;
						let node=x[1];
						/** @typedef {ChromeDomNode} N_Node */
						/** @type {(keyof (N_Node extends infer U extends N_Node?{[R in keyof U as U[R] extends (NumRange<1,12>|16|32|((...v:any[])=>any))?never:R]:U[R]}:never))[]} */
						let nk=as(get_keys_of(Object.getPrototypeOf(node)));
						let fk=nk[0];
						switch(fk) {
							case "wholeText":
								break;
							default:
								debugger; break;
						}
						switch(node.nodeType) {
							default:
								debugger; break;
							case 3:
								break;
						}
						/** @type {NumRange<3,3>} */
						let nr=as(node.nodeType);
						/** @type {NodeContentInfo} */
						let node_content_info=["CONTENT::Node",node.nodeName,nr,node.nodeValue];
						node;
						console.log("[pack.%s] [json_cache_node_info]",x[0],node_content_info);
						return ["U",[JSON.stringify(node_content_info,json_replacer,"\t")]];
					}
				case "string":
				case "JsonInputType":
				case "Element":
				case "VueApp":
				case "DataItemReturn":
				case "VueVnode":
					{
						let x=item;
						let obj_keys=get_keys_of(x[1]);
						console.log("[pack.%s] [json_cache_keys_info]",x[0],obj_keys.join());
						console.log("[pack.%s] [json_cache_with_cache_info]",x[0],x[1]);
						return ["U",[JSON.stringify(x[1],json_replacer,"\t")]];
					}
				case "any":
					{
						let x=item;
						console.log("[json_cache_any_info] [stringify_any]",x[0],x[1]);
						return ["U",[JSON.stringify(x[1],json_replacer,"\t")]];
					}
			}
		case "JSON::event":
			return ["U",[JSON.stringify(x[1],json_replacer,"\t")]];
	}
}
/** @arg {UnpackCommand} x @returns {string[]} */
function handle_json_unpack_cmd(x) {
	console.log("unpack cmd run pending",x);
	debugger; return json_stringify_with_cache(["JSON::pack",["any",x[1]]])[1];
}
/** @arg {UnpackUnitCommand} x @returns {string[]} */
function handle_json_unpack_unit_cmd(x) {
	if(x[0]!=="COMMAND::unpack_unit") {
		debugger; return [];
	}
	return json_stringify_with_cache(["JSON::pack",x[1]])[1];
}
let processing_commands=false;
/** @arg {DataItemReturn} x @returns {[string[],string[]]} */
function handle_json_event(x) {
	let ret;
	switch(x[0]) {
		case "EVENT::input":
		case "EVENT::json_cache":
			{
				// [handle_json_event_silent_info]
				let [xk,xv]=x
					,[xk1,xv1]=xv;
				false&&console.log("- [%s] [%s] -"+xv1.slice().map(() => "\n%o").join(""),xk,xk1,...xv1);
				ret=dispatch_json_event(["COMMAND::unpack:1",x[1]]);
				break;
			}
		case "EVENT::vnodes":
		case "EVENT::dom_nodes":
		case "EVENT::vue_app":
		case "TYPE::DataItemReturn":
			{
				// [handle_json_event_info]
				let [xk,xv]=x
					,[xk1,xv1]=xv;
				console.log("- [%s] [%s] -"+xv1.slice().map(() => "\n%o").join(""),xk,xk1,...xv1);
				ret=dispatch_json_event(["COMMAND::unpack:1",xv]);
				break;
			}
		case "COMMAND::unpack_unit":
		case "COMMAND::unpack":
		case "TYPE::DBG_What":
			console.log("- [%s] -\n%o",x[0],x[1]);
			ret=dispatch_json_event(["TYPE::wrap:1",x]);
			break;
		default:
			debugger; console.log("- [%s] -\n%o",x[0],x[1]);
			ret=dispatch_json_event(["TYPE::wrap:1",x]);
			break;
		case "RESULT::handle_json_event": case "TAG::result_data":
			throw new Error();
	}
	let process_ret=process_commands();
	return [ret,process_ret];
}
function process_commands() {
	if(processing_commands)
		return [];
	processing_commands=true;
	let command_result_arr=[];
	let in_process_arr=pending_commands.slice();
	for(let command of in_process_arr) {
		let [tag,cmd]=command;
		if(tag!=="unit") {
			debugger;
		}
		let cmd_res;
		switch(cmd[0]) {
			case "COMMAND::unpack":
				cmd_res=handle_json_unpack_cmd(cmd);
				break;
			case "COMMAND::unpack_unit":
				cmd_res=handle_json_unpack_unit_cmd(cmd);
				break;
		}
		if(cmd_res.length===1) {
			command_result_arr.push(...cmd_res);
		}
	}
	for(let done of in_process_arr) {
		let rm_idx=pending_commands.indexOf(done);
		if(rm_idx<0) {
			debugger; throw 1;
		}
		pending_commands.splice(rm_idx,1);
	}
	processing_commands=false;
	return command_result_arr;
}
let json_replace_count=0;
export_(exports => {
	exports.json_replace_count={
		get value() {
			return json_replace_count;
		},
		set value(value) {
			json_replace_count=value;
		}
	};
});
/** @arg {JsonOutputBox} res_box @arg {DataItemReturn} x */
function init_json_event_sys(res_box,x) {
	json_replace_count++;
	let res=handle_json_event(x);
	if(res.length>0) {
		res_box.output_arr.push(["RESULT::handle_json_event",["handle_result",{
			[Symbol.toStringTag]: x[0]
		},res]]);
	}
	if(stringify_failed_obj.length>0) {
		console.log("failed to stringify the following objects");
		for(let failed_obj of stringify_failed_obj) {
			console.log("[failed_object]",failed_obj);
			let ek=get_keys_of(failed_obj);
			if(ek.length>0) {
				console.log("[failed_object_keys]",ek);
			} else {
				console.log("[failed_object_no_keys]");
				debugger;
			}
		}
	}
}
/** @template {object} T @arg {T} x @returns {[boolean,T]} */
function map_add_is_omitted(x) {
	let x1=Object.entries(x);
	/** @type {{}} */
	let x1a=x1;
	/** @type {ObjectEntries<T>} */
	let x1e=as(x1a);
	let x2=x1e.map(do_map);
	let x3=x2.filter(is_non_null);
	if(!is_filter_out_null(x3))
		return [false,x];
	let x4=createTypedObjectFromEntries(x3);
	let x4w=createTypedObjectFromEntries(x1e);
	x4w;
	let entries_len=Object.entries(x4).length;
	if(entries_len>0) {
		/** @type {T|{}} */
		let x5=x4;
		/** @arg {typeof x5} _ @returns {asserts _ is T} */
		let assert_assume_true=_ => void 0;
		assert_assume_true(x5);
		return [true,x5];
	}
	return [false,x];
}
/** @arg {unknown} json_data */
function filter_json(json_data) {
	if(!json_data)
		return json_data;
	if(typeof json_data!=="string")
		return json_data;
	let p=() => JSON.parse(json_data);
	if(json_data.startsWith("[]"[0]))
		return p();
	if(json_data.startsWith("{}"[0]))
		return p();
	console.log("probably not json",json_data);
	return json_data;
}
/** @template T @arg {ObjectEntries<T>[number]} v */
function do_map(v) {
	const [k,x]=v;
	if(x===null)
		return null;
	if(typeof x!=="object")
		return v;
	if(x instanceof Map) {
		/** @type {Map<string,{test:string}>} */
		let x_map=x;
		if(x_map.size<=0) {
			return null;
		}
		/** @type {[string,Map<M_K,M_V>][]} */
		let json_result_cache_arr=[];
		/** @typedef {keyof typeof x_map} M_K */
		/** @typedef {typeof x_map[M_K]} M_V */
		if(k==="json_result_cache") {
			/** @arg {[keyof typeof x_map,M_V]} arg0 @returns {[M_K,M_V]} */
			let filter_map_entries=([k,x]) => [k,filter_json(x)];
			/** @type {[M_K,M_V][]} */
			let map_entries_arr=[...x.entries()];
			let mk_map=new Map(map_entries_arr.map(filter_map_entries));
			/** @type {[string,Map<M_K,M_V>]} */
			let entry=[k,mk_map];
			json_result_cache_arr.push(entry);
		}
	}
	if(x instanceof Array&&x.length<=0)
		return null;
	let x1=Object.entries(x);
	if(x1.length<=0)
		return null;
	return v;
}
/** @type {{value:{has_value:false}|{has_value:true;value:unknown;}}} */
const input_obj={
	value: {
		has_value: false
	}
};
/** @type {Map<string,{}>} */
let json_cache_map=new Map;
/** @type {JsonInputType[]} */
let object_store=[];
/** @type {JsonHistoryType[]} */
const result_history=[];
class HistoryResultData {
	object_store;
	/** @type {JsonHistoryType[]} */
	result_history;
	/** @type {number[]} */
	history_item_id_arr;
	/** @arg {JsonInputType[]} object_store @arg {JsonHistoryType[]} result_history @arg {number[]} history_item_id_arr  */
	constructor(object_store,result_history,history_item_id_arr) {
		this.object_store=object_store;
		this.result_history=result_history;
		this.history_item_id_arr=history_item_id_arr;
	}
	/** @type {["DATA::from_json", JsonInputType][]}  */
	json_obj_store=[];
	/** @arg {JsonOutputBox} res */
	static make(res) {
		let history=result_history.slice();
		let history_item_id_arr=history.map((x) => x.id);
		if(!input_obj.value.has_value) {
			return null;
		}
		let input_value=input_obj.value.value;
		let history_new_intersection=intersect_array_get_added(history,result_history);
		let cv=[...json_cache_map.keys()];
		if(cv.length===1&&cv[0]===input_value) {
			let k=json_cache_map.get(input_value);
			json_cache_map.delete(input_value);
			if(k!==void 0) {
				json_cache_map.set("TAG::input_obj",k);
			}
		}
		history_new_intersection.map(map_add_is_omitted).forEach(([is_omitted,x]) => is_omitted? 0:result_history.push(x));
		/** @type {JsonInputType[]} */
		let new_cache_arr=[];
		for(let cache_item of json_cache_arr) {
			if(json_cache_arr.includes(cache_item))
				continue;
			json_cache_arr.push(cache_item);
			new_cache_arr.push(cache_item);
		}
		for(let obj of new_cache_arr) {
			on_run_request(res,["cache",obj]);
		}
		let this_=new HistoryResultData(object_store,result_history,history_item_id_arr);
		this_.add_json_obj_store();
		return this_;
	}
	add_json_obj_store() {
		let obj_store=this.object_store;
		for(let i=0;i<obj_store.length;i++) {
			this.json_obj_store[i]=this.reconstitute(obj_store[i]);
		}
	}
	/** @template {{}|{__failed:true}} T @arg {T} obj @returns {["DATA::from_json",T]} */
	reconstitute(obj) {
		let out=json_stringify_with_cache(["JSON::data",[obj]]);
		/** @type {string[]} */
		let item=out[1];
		/** @type {T[]} */
		let result=[];
		for(let str of item) {
			let val=JSON.parse(str);
			result.push(val);
		}
		if(result.length===1) {
			return ["DATA::from_json",result[0]];
		}
		debugger;
		/** @type {T|{}} */
		let empty_ret=as({__failed: true});
		return ["DATA::from_json",as(empty_ret)];
	}
}
export_(exports => exports.HistoryResultData=HistoryResultData);
/** @type {{value:VueApp|null}} */
const vue_app={
	value: null
};
/** @type {VueVnode[]} */
const vnodes=[];
/** @type {Node[]} */
const dom_nodes=[];
/** @type {Map<unknown,[number,string]>} */
const parent_map=new Map;
/** @arg {JsonInputType} x @returns {x is VueVnode} */
function is_vue_vnode(x) {
	return !!(typeof x==='object'&&"component" in x&&x.component?.vnode);
}
//#region Json replacer
/** @arg {string} _k @arg {JsonInputType|null} x */
function json_replace_array(_k,x) {
	if(input_obj.value.has_value&&input_obj.value.value instanceof Array&&input_obj.value.value.includes(x)) {
		return x;
	}
	return x;
}
/** @arg {string} k @arg {JsonInputType|null} x */
function json_replacer(k,x) {
	if(typeof x==="function")
		return null;
	if(typeof x==="string")
		return x;
	if(typeof x!=="object")
		return x;
	if(x===null)
		return x;
	if(x instanceof Array) {
		return json_replace_array(k,x);
	}
	if(overflow_state.ran_out_of_stack) {
		return overflow_state.stack_limit_json_result;
	}
	if(!object_store.includes(x)) {
		object_store.push(x);
		let mi=object_store.indexOf(x);
		parent_map.set(x,[mi,k]);
	}
	if(k==="") {
		input_obj.value={
			has_value: true,
			value: x,
		};
		return x;
	}
	if(x instanceof Node) {
		if(!dom_nodes.includes(x))
			dom_nodes.push(x);
		let obj_index=dom_nodes.indexOf(x);
		return `TYPE::Store.dom_nodes[${obj_index}]`;
	}
	if(json_cache_arr.includes(x)) {
		return `TYPE::Store.cache[${json_cache_arr.indexOf(x)}]`;
	}
	if(!json_cache_arr.includes(x)) {
		json_cache_arr.push(x);
	}
	if(cache_map.has(k)) {
		cache_map.get(k)?.push(x);
	} else {
		cache_map.set(k,[x]);
	}
	if(x?._container===input_obj) {
		return `TYPE:: Store.cache[${json_cache_arr.indexOf(x)}]`;
	}
	if(x?.__vue_app__) {
		vue_app.value=x.__vue_app__;
		return `TYPE::VueApp`;
	}
	if(is_vue_vnode(x)) {
		if(!vnodes.includes(x))
			vnodes.push(x);
		return `TYPE::Store.vnodes[${vnodes.indexOf(x)}]`;
	}
	return `TYPE:: Store.cache[${json_cache_arr.indexOf(x)}]`;
}
//#endregion
/** @arg {JsonOutputBox} res @arg {JsonInputType} x */
function init_json_event_sys_with_obj(res,x) {
	/** @arg {DataItemReturn} d */
	let do_json_replace_=(d) => init_json_event_sys(res,d);
	if(x instanceof Element) {
		do_json_replace_(["EVENT::input",["Element",[x]]]);
	} else {
		debugger;
	}
	if(vue_app.value!==null) {
		do_json_replace_(["EVENT::vue_app",["VueApp",[vue_app.value]]]);
	}
	if(vnodes.length>0) {
		do_json_replace_(["EVENT::vnodes",["VueVnode",vnodes]]);
	}
	if(dom_nodes.length>0) {
		do_json_replace_(["EVENT::dom_nodes",["Node",dom_nodes]]);
	}
	if(json_cache_arr.length>0) {
		do_json_replace_(["EVENT::json_cache",["JsonInputType",json_cache_arr]]);
	}
	if(x!==null&&!json_cache_arr.includes(x)) {
		json_cache_arr.push(x);
	}
	let cache_index=-1;
	if(x!==null) {
		cache_index=json_cache_arr.indexOf(x);
	}
	res.cache_index_map.set(x,cache_index);
}
/** @protected @template {string[]} X @arg {X} x @template {string} S @arg {S} s @returns {Join<X,S>} */
function join_string(x,s) {
	if(!x) {
		debugger;
	}
	let r=x.join(s);
	return as(r);
}
//#endregion
main_start_json_replace();
