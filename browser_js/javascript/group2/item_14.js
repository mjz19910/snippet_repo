/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14.js
*/
/** @type {Map<string,JsonInputType[]>} */
const cache_map = new Map;
/** @arg {CacheItemType} e @returns {e is HTMLDivElement} */
let get_div_elements = (e) => e instanceof HTMLDivElement;
function main() {
	store_window("__JsonReplacer_cache_map", cache_map);
}
/** @template T @arg {string} key @arg {T} obj */
function store_window(key, obj) {
	/** @type {{}} */
	let win = window;
	/** @type {{[x: string]: T;}} */
	let w2 = win;
	if (w2[key])
		return w2[key];
	w2[key] = obj;
	return obj;
}
class LogGenerator {
	log_str = "";
	/** @type {J_Rep[]} */
	log_args = [];
	reset([str, args] = ["", []]) {
		this.log_str = str;
		/** @type {any[]} */
		this.log_args = args;
	}
	/** @arg {[string, never[]] | undefined} [cap_state] */
	new_gen(cap_state) {
		this.reset(cap_state);
		return this;
	}
	state_id() {
		this.log_str += "[state_id=%o]";
		debugger;
	}
	get_log_args() {
		return [this.log_str, ...this.log_args];
	}
	capture() {
		return [this.log_str, this.log_args.slice()];
	}
}
//#region basic
/** @private @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function as(e, x = e) {
	return x;
}
//#endregion
//#region string manipulation
/** @private @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {Split<X,string extends S?",":S>} */
function split_string(x, s = as(",")) {
	if (!x) {
		debugger;
	}
	let r = x.split(s);
	return as(r);
}
//#endregion
/** @template T @arg {T|null} x @returns {x is T} */
let is_non_null = x => x !== null;
/** @template T @arg {(T|null)[]} x @returns {x is T[]} */
function is_filter_out_null(x) {
	return x.every(x => is_non_null(x));
}
// ~~~~~~~~~~~~~~~~~~~~~ Typed Functions ~~~~~~~~~~~~~~~~~~~~~
/** @template {EntriesType} ARR_T @arg {ARR_T} arr @returns {EntriesToObject<ARR_T>} */
function createTypedObjectFromEntries(arr) {
	let fe = Object.fromEntries(arr);
	/** @type {EntriesToObject<ARR_T>} */
	return as(fe);
}
class H_Iter {
	/** @type {number[]} */
	done_ids = [];
	/** @template {keyof T} T_K @template {T[T_K]} T_V @template {object|Map<M_K,M_V>} T @arg {[T_K,T_V]} v @returns {[T_K,T_V]|null} @template M_V,M_K @arg {[string,Map<M_K,M_V>][]} json_result_cache_arr */
	obj_ent_rep(v, json_result_cache_arr) {
		const [k, x] = v;
		if (x === null)
			return null;
		if (typeof x !== "object")
			return v;
		if (x instanceof Map) {
			if (x.size <= 0) {
				return null;
			}
			if (k === "json_result_cache") {
				/** @arg {[M_K,M_V]} arg0 @returns {[M_K,M_V]} */
				let filter_map_entries = ([k, x]) => [k, filter_json(x)];
				/** @type {[M_K,M_V][]} */
				let map_entries_arr = [...x.entries()];
				let mk_map = new Map(map_entries_arr.map(filter_map_entries));
				/** @type {[string,Map<M_K,M_V>]} */
				let entry = [k, mk_map];
				json_result_cache_arr.push(entry);
			}
		}
		if (x instanceof Array && x.length <= 0)
			return null;
		let x1 = Object.entries(x);
		if (x1.length <= 0)
			return null;
		return v;
	}
}
/** @arg {any[]} range_arr @arg {any} start @arg {any} end */
function add_range_item(range_arr, start, end) {
	if (start === end) {
		range_arr.push([start]);
	} else {
		range_arr.push([start, end]);
	}
}
/** @arg {string | any[]} arr */
function to_range(arr) {
	if (arr.length < 1)
		return [];
	let cur = arr[0];
	let cur_start = cur;
	/** @type {string | any[]} */
	let res = [];
	let cur_n = 0;
	cur_n;
	for (let x of arr) {
		if (x === arr[0] && res.length === 0)
			continue;
		if (x === cur + 1) {
			cur_n++;
			cur = x;
			continue;
		}
		add_range_item(res, cur_start, cur);
		cur = x;
		cur_start = x;
		cur_n = 0;
	}
	add_range_item(res, cur_start, cur);
	return res;
}
/** @arg {any[]} x */
function reduce_arr_flat(x) {
	return x.reduce((acc, cur) => acc.concat(cur), []);
}
/** @arg {Map<string, JsonInputType[]>} map */
function show_cache_map(map) {
	let cm_info = [...map.entries()].map(([k, x]) => ["\n", `[${k}]`, ...x]);
	let r_cm_info = cm_info.reduce((acc, cur) => acc.concat(cur), []);
	console.log("-- [cache_map] --\n" + "%o\n".repeat(r_cm_info.length), ...r_cm_info);
}
/** @arg {{}} x */
function Z_len_k(x) {
	return Object.keys(x).length;
}
const log_gen = new LogGenerator;
class InputObjBox {
	/** @type {DataItemReturn[]} */
	return_items = [];
}
const overflow_state = new class {
	ran_out_of_stack = false;
	/** @type {[string]|null} */
	ran_out_of_stack_args = null;
	/** @type {["TAG::error",string]|null} */
	stack_limit_json_result = null;
	/** @type {number|null} */
	last_stack_space = null;
}
/** @type {number[]} */
let done_ids = [];
class J_Rep {
	/** @type {any[][]} */
	static all_cache = [];
	/** @type {Map<any, any>[]} */
	static all_cache_map = [];
	static {
		store_window("__JsonReplacer_cache_map", cache_map);
	}
	static _next_id = 0;
	static get next_id() {
		return J_Rep._next_id++;
	}
	get_id() {
		if (this.id)
			return this.id;
		let id = J_Rep.next_id;
		this.id = id;
		return id;
	}
	/** @returns {asserts this is {id:number}} */
	init_id() {
		this.id ??= J_Rep.next_id;
	}
	/** @type {{}|null} */
	input_obj = null;
	/** @type {number|null} */
	id = null;
	/** @type {Node[]} */
	dom_nodes = [];
	json_result_cache = new Map;
	/** @type {CacheItemType[]} */
	json_cache = [];
	/** @type {VueVnode[]} */
	vnodes = [];
	/** @type {VueApp|null} */
	vue_app = null;
	/** @type {JsonInputType[]} */
	object_store = [];
	/** @type {Map<unknown,[number,string]>} */
	parent_map = new Map;
	/** @type {this[]} */
	result_history = [];
	constructor() {
		let nt = new.target;
		nt.all_cache.push(this.json_cache);
	}
	static show_cache_map() {
		show_cache_map(cache_map);
	}
	json_stringify_count = 0;
	/** @type {InputObjBox[]} */
	index_box_store = [];
	/** @type {Map<number,IndexBoxMap[keyof IndexBoxMap]>} */
	index_tag_map = new Map;
	/** @type {JsonInputType[]} */
	static stringify_failed_obj = [];
	is_crash_testing = false;
	/** @arg {this} other */
	prepare_self(other) {
		this.prepare_with_previous(other)
	}
	get break_debugger() {
		{
			debugger
		}
		return;
	}
	clone() {
		let new_state = new J_Rep;
		new_state.prepare_with_previous(this);
		return new_state;
	}
	/** @arg {this} other */
	prepare_with_previous(other) {
		other.add_to_history(this);
		const { is_crash_testing, json_cache: cache, json_result_cache } = other;
		this.is_crash_testing = is_crash_testing;
		this.json_cache = cache;
		this.json_result_cache = json_result_cache;
	}
	/** @arg {string} x @returns {["TAG::parsed_json", DataParsable]} */
	json_parser(x) {
		/** @type {DataParsable} */
		let parse_res = JSON.parse(x, (...r_args) => this.json_reviver(r_args));
		console.log(parse_res);
		return ["TAG::parsed_json", parse_res];
	}
	/** @arg {any} x @returns {["TAG::null", null]} */
	json_reviver(x) {
		x;
		console.log("revive", x);
		return ["TAG::null", null];
	}
	/** @arg {this} other */
	add_to_history(other) {
		if (this.result_history.includes(other))
			return;
		this.result_history.push(other);
	}
	/** @typedef {{}} TaggedJsonHistory */
	/** @type {TaggedJsonHistory[]} */
	history_acc = [];
	/** @arg {["TAG::json_result_history",J_Rep[]][]} arg0 */
	untag_history_acc([first, ...rest]) {
		return rest.reduce((pv, [, cur]) => pv.concat(cur), first[1]);
	}
	/** @arg {TaggedJsonHistory[]} history_acc_arr */
	iterate_accumulated_history(history_acc_arr) {
		/** @type {J_Rep[]} */
		let history_items = [];
		for (let tagged_item of history_acc_arr) {
			console.log(tagged_item);
			debugger;
		}
		let results = [];
		for (let history of history_items) {
			done_ids = [];
			let prev_stack = stack;
			stack = [["TAG::old_stack", history]];
			let ret = history_iter();
			if (ret === null) {
				return [false, results, [history]];
			}
			results.push(res);
			prev_stack.push(["TAG::stack", [{
				id: J_Rep.next_id,
				items: stack
			}]]);
			stack = prev_stack;
		}
		return [true, results];
	}
	static create() {
		return new this;
	}
}
/** @type {JsonInputType[]} */
const json_cache = [];
//#region on_data_item
/** @arg {["cache", CacheItemType]|["store_object",JsonInputType]|["cache_index_and_arr",CacheIndexWithArr]} x */
function on_run_request(x) {
	switch (x[0]) {
		case "cache":
			break;
		case "store_object":
			break;
		case "cache_index_and_arr":
			debugger; return null;
	}
	return on_run_with_object_type(x[1]);
}
function run_json_replace() {
	let doc_child = document.body.firstElementChild;
	if (!doc_child)
		throw new Error("No firstElement of document.body");
	let run_result = on_run_request(["store_object", doc_child]);
	if (!run_result) {
		debugger; return;
	}
	debugger;
	// arr.forEach(arr_iter_func);
	let log_args = history_iter();
	if (log_args === null)
		return;
	console.log(...log_args);
}
let do_join_str = () => join_string(["\n", "%o"], "");
/** @arg {JsonHistoryType[]} hist */
function log_history_items(hist) {
	let log_items = hist.map(h_map);
	/** @type {"%o"[]} */
	let log_place = ["%o"];
	log_place.length = log_items.length;
	log_place.fill("%o");
	let log_str = log_place.map(do_join_str).flat().join("");
	return ["-- [result_history] --" + log_str, ...log_items];
}
const history_acc = [];
/** @type {{}[]} */
const done_history_items = [];
/** @typedef {["TAG::stack", JsonHistoryType[]]|["TAG::old_stack",J_Rep]} JsonStackType */
/** @type {JsonStackType[]} */
let stack = [];
function history_iter() {
	if (stack.length === 0) {
		return [];
	}
	let all_history_arr = [];
	while (stack.length > 0) {
		let x = stack.shift();
		if (!x) {
			break;
		}
		if (done_history_items.includes(x)) {
			continue;
		}
		done_history_items.push(x);
		all_history_arr.push(x);
		if (done_history_items.length > 12) {
			return [];
		}
		console.log("start iter", done_history_items.length);
		let inner_arr = iter_history_result();
		history_acc.push(["TAG::json_result_history:iter_res", inner_arr]);
	}
	let log_args = log_history_items(target_history);
	let log_range = to_range(done_ids);
	console.log("[done_ids] " + log_range.map(e => e.length === 2 ? "%o-%o" : "%o").join(", "), ...log_range.flat());
	return log_args;
}
let json_replace_count = 0;
/** @arg {InputObjBox} res_box @arg {DataItemReturn} x */
function do_json_replace(res_box, x) {
	json_replace_count++;
	console.log(x);
	if (J_Rep.stringify_failed_obj.length > 0) {
		console.log("failed to stringify the following objects");
		for (let failed_obj of J_Rep.stringify_failed_obj) {
			console.log("[failed_object]", failed_obj);
			let ek = Object.keys(failed_obj);
			if (ek.length > 0) {
				console.log("[failed_object_keys]", ek);
			} else {
				console.log("[failed_object_no_keys]");
				debugger;
			}
		}
	}
	res_box.return_items.push(x);
}
/** @template {object} T @arg {T} x @returns {[boolean,T]} */
function h_map(x) {
	let x1 = Object.entries(x);
	/** @type {{}} */
	let x1a = x1;
	/** @type {ObjectEntries<T>} */
	let x1e = as(x1a);
	let x2 = x1e.map(do_map);
	let x3 = x2.filter(is_non_null);
	if (!is_filter_out_null(x3))
		return [false, x];
	let x4 = createTypedObjectFromEntries(x3);
	let x4w = createTypedObjectFromEntries(x1e);
	x4w;
	let entries_len = Object.entries(x4).length;
	if (entries_len > 0) {
		/** @type {T|{}} */
		let x5 = x4;
		/** @arg {typeof x5} _ @returns {asserts _ is T} */
		let assert_assume_true = _ => void 0;
		assert_assume_true(x5);
		return [true, x5];
	}
	return [false, x];
}
/** @arg {unknown} json_data */
function filter_json(json_data) {
	if (!json_data)
		return json_data;
	if (typeof json_data !== "string")
		return json_data;
	let p = () => JSON.parse(json_data);
	if (json_data.startsWith("[]"[0]))
		return p();
	if (json_data.startsWith("{}"[0]))
		return p();
	console.log("probably not json", json_data);
	return json_data;
}
/** @template T @arg {ObjectEntries<T>[number]} v */
function do_map(v) {
	const [k, x] = v;
	if (x === null)
		return null;
	if (typeof x !== "object")
		return v;
	if (x instanceof Map) {
		/** @type {Map<string,{test:string}>} */
		let x_map = x;
		if (x_map.size <= 0) {
			return null;
		}
		/** @type {[string,Map<M_K,M_V>][]} */
		let json_result_cache_arr = [];
		/** @typedef {keyof typeof x_map} M_K */
		/** @typedef {typeof x_map[M_K]} M_V */
		if (k === "json_result_cache") {
			/** @arg {[keyof typeof x_map,M_V]} arg0 @returns {[M_K,M_V]} */
			let filter_map_entries = ([k, x]) => [k, filter_json(x)];
			/** @type {[M_K,M_V][]} */
			let map_entries_arr = [...x.entries()];
			let mk_map = new Map(map_entries_arr.map(filter_map_entries));
			/** @type {[string,Map<M_K,M_V>]} */
			let entry = [k, mk_map];
			json_result_cache_arr.push(entry);
		}
	}
	if (x instanceof Array && x.length <= 0)
		return null;
	let x1 = Object.entries(x);
	if (x1.length <= 0)
		return null;
	return v;
}
/** @type {JsonHistoryType[]} */
let target_history = [];
/** @type {{}|null} */
let input_obj;
/** @type {Map<string,{}>} */
let json_result_cache = new Map;
/** @type {CacheIndexWithArr[]} */
let object_store = [];
/** @type {JsonHistoryType[]} */
const result_history = [];
let object_store_info = null;
function iter_history_result() {
	let history = result_history.slice();
	let x1 = history.map((x) => x.id);
	let x2 = input_obj;
	let nh = filter_arr(history, target_history);
	let rc = json_result_cache;
	let cv = [...rc.keys()];
	if (cv.length === 1 && cv[0] === x2) {
		let k = rc.get(x2);
		rc.delete(x2);
		if (k !== void 0) {
			rc.set("TAG::input_obj", k);
		}
	}
	nh.map(h_map).forEach(([is_omitted, x]) => is_omitted ? 0 : result_history.push(x));
	/** @type {JsonInputType[]} */
	let new_cache_arr = [];
	for (let cache_item of json_cache) {
		if (json_cache.includes(cache_item))
			continue;
		json_cache.push(cache_item);
		new_cache_arr.push(cache_item);
	}
	let cache = [];
	for (let obj of new_cache_arr) {
		let ret = on_run_request(["cache", obj]);
		if (ret !== null) {
			cache.push(ret);
		}
	}
	if (object_store) {
		object_store_info = object_store.map(x => on_run_request(["cache_index_and_arr", x]));
	} else {
		console.log("no object_store");
	}
	/** @type {IterHistoryResult} */
	let ret = {
		cache,
		object_store,
		result_history,
		x1,
	};
	return ret;
	/** @template T @arg {T[]} x @arg {T[]} o_arr */
	function filter_arr(x, o_arr) {
		return x.filter((x) => !o_arr.includes(x));
	}
}
/** @type {VueApp|null} */
let vue_app = null;
/** @type {VueVnode[]} */
let vnodes = [];
/** @type {Node[]} */
let dom_nodes = [];
/** @arg {JsonInputType} x */
function on_run_with_object_type(x) {
	let res = new InputObjBox;
	/** @arg {DataItemReturn} d */
	let do_json_replace_ = (d) => do_json_replace(res, d);
	if (x instanceof Element) {
		do_json_replace_(["EVENT::input", x]);
	} else {
		debugger;
	}
	if (x !== null && !json_cache.includes(x)) {
		json_cache.push(x);
	}
	if (vue_app !== null) {
		do_json_replace_(["EVENT::vue_app", vue_app]);
	}
	if (vnodes.length > 0) {
		do_json_replace_(["EVENT::vnodes", vnodes]);
	}
	if (dom_nodes.length > 0) {
		do_json_replace_(["EVENT::dom_nodes", dom_nodes]);
	}
	if (json_cache.length > 0) {
		do_json_replace_(["EVENT::json_cache", json_cache]);
	}
	let cache_index = -1;
	if (x !== null) {
		cache_index = json_cache.indexOf(x);
	}
	/** @type {CacheIndexWithArr} */
	let ret_obj = {
		cache_index,
	};
	return ret_obj;
}
/** @arg {CacheItemType[]} arr @arg {(v: CacheItemType)=>v is HTMLDivElement} fn @returns {HTMLDivElement[]}  */
function filter_array_type(arr, fn) {
	let out = [];
	for (let i of arr) {
		if (fn(i)) {
			out.push(i);
		}
	}
	return out;
}
/** @arg {["CONTENT::cache",HTMLDivElement[]][]} vnode_arr */
function on_data_z(vnode_arr) {
	console.log(vnode_arr);
	debugger;
	// vnode_arr.forEach(x => on_data_item(["TAG::vnode", x]));
}
/** @arg {InputObjBoxItem[]} x */
function arr_iter_func(x) {
	console.log(x);
	debugger;
	// let c = x[0];
	// if (c[0] === "CONTENT::cache") {
	// 	let inner_items = c[1];
	// 	let div_elements = filter_array_type(inner_items, get_div_elements);
	// 	on_data_z([["CONTENT::cache", div_elements]])
	// } else {
	// 	debugger;
	// }
}
/** @arg {{}} x @arg {number} i */
function unpack_data_item_vnode_2(x, i) {
	console.log("should unpack [index=%o]", i, x);
	x;
	i;
	return null;
}
/** @arg {["TAG::vnode", {__tag:"vnode";}]} x @returns {["TAG::failed", null]} */
function on_data_item(x) {
	console.log("TODO: unknown_tag_section", x);
	return ["TAG::failed", null];
}
/** @template {string} T @arg {T} tag @arg {CacheItemType} x @returns {[`TAG::${T}`, CacheItemType]} */
function prepare_obj(tag, x) {
	return [`TAG::${tag}`, x];
}
/** @arg {number} idx @arg {["TAG::cache_item", number]} data */
function on_tag_cache_item(idx, data) {
	let from_cache = json_cache[data[1]];
	let res_box = new InputObjBox;
	do_json_replace(res_box, ["TYPE::JsonInputType", from_cache]);
	let first_result = res_box.return_items[0];
	debugger;
	log_gen.new_gen();
	log_gen.state_id();
	let id_log = log_gen.capture();
	console.log(id_log);
	// if (typeof inner_arr[0] === "string") {
	// 	inner_arr[0] = JSON.parse(inner_arr[0]);
	// }
	first_result;
	return log_data_result("json_data", idx, ["TYPE::DataItemReturn", first_result]);
}
/** @template {DataItemReturn} T @arg {string} section @arg {any} i @arg {T} data_result */
function log_data_result(section, i, data_result) {
	console.log(`--- [%s[%s]] ---\n%s %o`, section, i, data_result);
	return data_result;
}
/** @protected @template {string[]} X @arg {X} x @template {string} S @arg {S} s @returns {Join<X,S>} */
function join_string(x, s) {
	if (!x) {
		debugger;
	}
	let r = x.join(s);
	return as(r);
}
//#endregion
run_json_replace();
