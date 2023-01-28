/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14.js
*/
/** @template T @arg {T[]} x @arg {T[]} o_arr */
function filter_arr(x, o_arr) {
	return x.filter((x) => !o_arr.includes(x));
}
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
/** @type {JsonOutputBox[]} */
const index_box_store = [];
class JsonOutputBox {
	/** @type {DataItemReturn[]} */
	output_arr = [];
	/** @type {Map<JsonInputType,number>} */
	cache_index_map = new Map;
	get_log_self_args() {
		let log_self_info = this.get_self_for_logging();
		if (log_self_info[0] < 1) return;
		return ["-- [JsonOutputBox] --\n%o", this.get_self_for_logging()]
	}
	/** @private @returns {[number,Partial<this>]} */
	get_self_for_logging() {
		/** @type {Partial<this>} */
		let out = {};
		let out_size = 0;
		for (let k of Object.keys(this)) {
			/** @type {keyof this&string} */
			let rk = as(k);
			let ck = this[rk];
			if (ck instanceof Map) {
				if (ck.size <= 0)
					continue;
				out[rk] = ck;
				out_size++;
				continue;
			}
			if (ck instanceof Array) {
				if (ck.length <= 0)
					continue;
				out[rk] = ck;
				out_size++;
				continue;
			}
			debugger;
		}
		return [out_size, out];
	}
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
}
/** @type {JsonInputType[]} */
const json_cache = [];
//#region on_data_item
/** @arg {JsonOutputBox} res @arg {["cache", CacheItemType]|["store_object",JsonInputType]|["cache_index_and_arr",CacheIndexWithArr]} x */
function on_run_request(res, x) {
	switch (x[0]) {
		case "cache":
			break;
		case "store_object":
			break;
		case "cache_index_and_arr":
			debugger; return null;
	}
	return init_json_event_sys_with_obj(res, x[1]);
}
function main_start_json_replace() {
	let res = new JsonOutputBox;
	let doc_child = document.body.firstElementChild;
	if (!doc_child)
		throw new Error("No firstElement of document.body");
	init_json_event_sys_with_obj(res, doc_child);

	let history_res = new JsonOutputBox;
	let log_args = history_iter(history_res);
	console.log(...log_args);
	console.log(...res.get_log_self_args());
	console.log(...history_res.get_log_self_args());
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
/** @arg {JsonOutputBox} out_res */
function history_iter(out_res) {
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
		let inner_arr = iter_history_result(out_res);
		history_acc.push(["TAG::json_result_history:iter_res", inner_arr]);
	}
	let log_args = log_history_items(target_history);
	let log_range = to_range(done_ids);
	console.log("[done_ids] " + log_range.map(e => e.length === 2 ? "%o-%o" : "%o").join(", "), ...log_range.flat());
	return log_args;
}
let json_replace_count = 0;
/** @type {{}[]} */
const stringify_failed_obj = [];
/** @arg {DataItemReturn} x */
function invert_tag(x) {
	return x[1];
}
/** @arg {DataItemReturn} x */
function do_json_replace_on_iterate_cmd(x) {
	/** @type {["JSON::Data", x[0], string][]} */
	let res = [];
	if (!(x[1] instanceof Array))
		return res;
	for (let u of x[1]) {
		res.push(["JSON::Data", x[0], JSON.stringify(u, json_replacer, "\t")]);
	}
	return res;
}
/** @type {PendingCommandItem[]} */
let pending_commands = [];
/** @arg {DataItemReturn} x */
function do_json_replace_on_input(x) {
	/** @type {string[]} */
	let res = [];
	switch (x[0]) {
		case "COMMAND::unpack":
			{
				let unpack = x[1];
				let [s] = unpack;
				for (let u of unpack[1]) {
					false && console.log("[COMMAND::unpack] [%s]", s, u);
					/** @type {UnpackUnitCommand} */
					let pk = as(["COMMAND::unpack_unit", [s, u]]);
					pending_commands.push(["unit", pk]);
				}
				return res;
			}
		case "TYPE::DBG_What":
		case "TYPE::DataItemReturn":
		case "EVENT::input":
		case "EVENT::vnodes":
		case "EVENT::dom_nodes":
		case "EVENT::json_cache":
		case "RESULT::handle_json_event":
		case "EVENT::vue_app":
		default:
			debugger;
			res.push(JSON.stringify(x, json_replacer, "\t"));
			return res;
	}
}
/** @arg {DataItemReturn} x */
function handle_json_event(x) {
	let ret;
	switch (x[0]) {
		case "EVENT::input":
		case "EVENT::json_cache":
			false && console.log("- [%s] -\n%o", x[0], x[1]);
			ret = do_json_replace_on_input(["COMMAND::unpack", x[1]]);
			break;
		case "EVENT::vnodes":
		case "EVENT::dom_nodes":
		case "RESULT::handle_json_event":
		case "TYPE::DataItemReturn":
		case "EVENT::vue_app":
			console.log("- [%s] -\n%o", x[0], x[1]);
			ret = do_json_replace_on_input(["COMMAND::unpack", x[1]]);
			break;
		case "TYPE::DBG_What":
		case "COMMAND::unpack":
		default:
			console.log("- [%s] -\n%o", x[0], x[1]);
			ret = do_json_replace_on_input(x);
			break;
	}
	for (let command of pending_commands) {
		let [tag, cmd] = command;
		tag === "unpack";
		switch (cmd[0]) {
			case "COMMAND::unpack": handle_json_unpack_cmd(cmd); break;
			case "COMMAND::unpack_unit": handle_json_unpack_unit_cmd(cmd); break;
		}
	}
	pending_commands.length = 0;
	return ret;
}
/** @arg {UnpackCommand} x */
function handle_json_unpack_cmd(x) {
	console.log("unpack cmd run pending", x);
}
/** @arg {UnpackUnitCommand} x */
function handle_json_unpack_unit_cmd(x) {
	console.log("unpack unit cmd run pending", x);
}
/** @arg {JsonOutputBox} res_box @arg {DataItemReturn} x */
function init_json_event_sys(res_box, x) {
	json_replace_count++;
	let res = handle_json_event(x);
	if (res.length > 0) {
		res_box.output_arr.push(["RESULT::handle_json_event", ["string", res]]);
	}
	if (stringify_failed_obj.length > 0) {
		console.log("failed to stringify the following objects");
		for (let failed_obj of stringify_failed_obj) {
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
/** @type {{value:{has_value:false}|{has_value:true;value:unknown;}}} */
const input_obj = {
	value: {
		has_value: false
	}
};
/** @type {Map<string,{}>} */
let json_result_cache = new Map;
/** @type {{}[]} */
let object_store = [];
/** @type {JsonHistoryType[]} */
const result_history = [];
let object_store_info = null;
/** @arg {JsonOutputBox} out_res */
function iter_history_result(out_res) {
	let history = result_history.slice();
	let x1 = history.map((x) => x.id);
	if (!input_obj.value.has_value) {
		return;
	}
	let x2 = input_obj.value.value;
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
	for (let obj of new_cache_arr) {
		on_run_request(out_res, ["cache", obj]);
	}
	let ret = {
		object_store,
		result_history,
		x1,
	};
	return ret;
}
/** @type {{value:VueApp|null}} */
const vue_app = {
	value: null
};
/** @type {VueVnode[]} */
const vnodes = [];
/** @type {Node[]} */
const dom_nodes = [];
/** @type {Map<unknown,[number,string]>} */
const parent_map = new Map;
/** @arg {string} _k @arg {JsonInputType|null} x */
function json_replace_array(_k, x) {
	if (input_obj.value.has_value && input_obj.value.value instanceof Array && input_obj.value.value.includes(x)) {
		return x;
	}
	return x;
}
/** @arg {JsonInputType} x @returns {x is VueVnode} */
function is_vue_vnode(x) {
	return !!(typeof x === 'object' && "component" in x && x.component?.vnode);
}
/** @arg {string} k @arg {JsonInputType|null} x */
function json_replacer(k, x) {
	if (typeof x === "function")
		return null;
	if (typeof x === "string")
		return x;
	if (typeof x !== "object")
		return x;
	if (x === null)
		return x;
	if (x instanceof Array) {
		return json_replace_array(k, x);
	}
	if (overflow_state.ran_out_of_stack) {
		return overflow_state.stack_limit_json_result;
	}
	if (!object_store.includes(x)) {
		object_store.push(x);
		let mi = object_store.indexOf(x);
		parent_map.set(x, [mi, k]);
	}
	if (k === "") {
		input_obj.value = {
			has_value: true,
			value: x,
		};
		return x;
	}
	if (input_obj instanceof Array) { }
	if (x instanceof Node) {
		if (!dom_nodes.includes(x))
			dom_nodes.push(x);
		let obj_index = dom_nodes.indexOf(x);
		return `TYPE::Store.dom_nodes[${obj_index}]`;
	}
	if (json_cache.includes(x)) {
		return `TYPE::Store.cache[${json_cache.indexOf(x)}]`;
	}
	if (cache_map.has(k)) {
		cache_map.get(k)?.push(x);
	} else {
		cache_map.set(k, [x]);
	}
	if (!json_cache.includes(x)) {
		json_cache.push(x);
	}
	if (is_vue_vnode(x)) {
		if (!vnodes.includes(x))
			vnodes.push(x);
		return `TYPE::Store.vnodes[${vnodes.indexOf(x)}]`;
	}
	if (x?._container === input_obj) {
		return `TYPE:: Store.cache[${json_cache.indexOf(x)}]`;
	}
	if (x?.__vue_app__) {
		vue_app.value = x.__vue_app__;
		return `TYPE::VueApp`;
	}
	return `TYPE:: Store.cache[${json_cache.indexOf(x)}]`;
}
/** @arg {JsonOutputBox} res @arg {JsonInputType} x */
function init_json_event_sys_with_obj(res, x) {
	/** @arg {DataItemReturn} d */
	let do_json_replace_ = (d) => init_json_event_sys(res, d);
	if (x instanceof Element) {
		do_json_replace_(["EVENT::input", ["Element", [x]]]);
	} else {
		debugger;
	}
	if (x !== null && !json_cache.includes(x)) {
		json_cache.push(x);
	}
	if (vue_app.value !== null) {
		do_json_replace_(["EVENT::vue_app", ["VueApp", [vue_app.value]]]);
	}
	if (vnodes.length > 0) {
		do_json_replace_(["EVENT::vnodes", ["VueVnode", vnodes]]);
	}
	if (dom_nodes.length > 0) {
		do_json_replace_(["EVENT::dom_nodes", ["Node", dom_nodes]]);
	}
	if (json_cache.length > 0) {
		do_json_replace_(["EVENT::json_cache", ["JsonInputType", json_cache]]);
	}
	let cache_index = -1;
	if (x !== null) {
		cache_index = json_cache.indexOf(x);
	}
	res.cache_index_map.set(x, cache_index);
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
main_start_json_replace();
