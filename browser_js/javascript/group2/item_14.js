/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14.js
*/
class LogGenerator {
	log_str = "";
	/** @type {JsonReplacerState[]} */
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
	/** @arg {JsonReplacerState} id @arg {any[]} args */
	state_id(id, ...args) {
		this.log_str += "[state_id=%o]";
		this.log_args.push(id, ...args);
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
class H_Iter {
	/** @type {number[]} */
	done_ids = [];
	/** @arg {{}} x */
	h_map = x => {
		let x1 = Object.entries(x);
		let x2 = x1.map(this.obj_ent_rep);
		let x3 = x2.filter(is_non_null);
		if (!is_filter_out_null(x3))
			return null;
		let x4 = Object.fromEntries(x3);
		let entries_len = Object.entries(x4).length;
		if (entries_len > 0)
			return x4;
		return null;
	}
		;
	/** @arg {[string,any]} v @returns {[string,any]|[string,Map<any,string>]|null} */
	obj_ent_rep = v => {
		const [k, x] = v;
		if (x === null)
			return null;
		if (typeof x !== "object")
			return v;
		if (x instanceof Map && x.size <= 0)
			return null;
		if (x instanceof Array && x.length <= 0)
			return null;
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
		if (k === "json_result_cache") {
			return [k, new Map([...x.entries()].map(([k, x]) => [k, filter_json(x)]))];
		}
		let x1 = Object.entries(x);
		if (x1.length <= 0)
			return null;
		return v;
	}
		;
	/** @arg {JsonReplacerState} trg */
	constructor(trg) {
		this.stack = trg.result_history.slice();
		this.target_history = trg.result_history;
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
	return x.reduce((/** @type {string | any[]} */
		acc, cur) => acc.concat(cur), []);
}
/** @arg {any[]} map */
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
	/** @type {DataItemReturn[][]} */
	arr = [];
}
const overflow_state = new class {
	ran_out_of_stack = false;
	/** @type {[string]|null} */
	ran_out_of_stack_args = null;
	/** @type {["TAG::error",string]|null} */
	stack_limit_json_result = null;
}
	;
class JsonReplacerState {
	/** @type {any[][]} */
	static all_cache = [];
	/** @type {Map<any, any>[]} */
	static all_cache_map = [];
	static _next_id = 1;
	get next_id() {
		return JsonReplacerState._next_id++;
	}
	get_id() {
		if (this.id)
			return this.id;
		let id = this.next_id;
		this.id = id;
		return id;
	}
	/** @type {{}|null} */
	input_obj = null;
	/** @type {number|null} */
	id = null;
	cache_map = new Map;
	/** @type {Node[]} */
	dom_nodes = [];
	json_result_cache = new Map;
	/** @type {CacheItemType[]} */
	cache = [];
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
	/** @type {string[]} */
	static cache_map = [];
	constructor() {
		let nt = new.target;
		nt.all_cache.push(this.cache);
		nt.all_cache_map.push(this.cache_map);
		this.result_history.push(this);
	}
	static show_cache_map() {
		show_cache_map(this.cache_map);
	}
	json_stringify_count = 0;
	os = overflow_state;
	/** @arg {JsonInputType} x @returns {DataItemReturn|null} */
	try_json_stringify(x, first = false) {
		if (this.os.ran_out_of_stack) {
			return this.os.stack_limit_json_result;
		}
		this.json_stringify_count++;
		if (this.json_stringify_count % 128 === 0) {
			let space = this.do_has_stack_space(4096);
			console.log("[stack_left]", space);
			if (space < 9500) {
				debugger; let os = this.os;
				os.ran_out_of_stack = true;
				let stack_exhausted_msg = `RangeError: Ran of stack space, ${space} frames left`;
				os.ran_out_of_stack_args = [JSON.stringify({
					_tag: "Error",
					args: stack_exhausted_msg
				})];
				os.stack_limit_json_result = ["TAG::error", ...os.ran_out_of_stack_args];
				return os.stack_limit_json_result;
			}
		}
		let was_crash_testing = this.is_crash_testing;
		x: try {
			if (this.is_crash_testing)
				break x;
			this.is_crash_testing = first === false;
			let test_state = this.clone();
			let json_result = JSON.stringify(x, this.json_replacer.bind(test_state), "\t");
			this.json_result_cache.set(x, json_result);
			return ["TAG::stringify_result", json_result, new InputObjBox];
		} catch (e) {
			if (e instanceof RangeError) {
				return ["TAG::stringify_range_error", e];
			}
			if (JsonReplacerState.stringify_failed_obj.includes(x)) {
				return ["TAG::stringify_seen_failed_obj", JsonReplacerState.stringify_failed_obj.indexOf(x)];
			}
			JsonReplacerState.stringify_failed_obj.push(x);
			if (was_crash_testing) {
				throw e;
			}
			console.log("swallowing error", e);
			return "TAG::stringify_failed";
		} finally {
			this.is_crash_testing = was_crash_testing;
		}
		return null;
	}
	/** @type {JsonInputType[]} */
	static stringify_failed_obj = [];
	is_crash_testing = false;
	/** @arg {string} k @arg {JsonInputType|null} x */
	json_replacer(k, x) {
		if (typeof x === "function")
			return null;
		if (typeof x === "string")
			return x;
		if (typeof x !== "object")
			return x;
		if (x === null)
			return x;
		if (x instanceof Array && x[0] === "TAG::error")
			return x;
		if (this.os.ran_out_of_stack) {
			return this.os.stack_limit_json_result;
		}
		let failure_result = this.try_json_stringify(x);
		if (failure_result) {
			return failure_result;
		}
		const { object_store } = this;
		if (!object_store.includes(x)) {
			object_store.push(x);
			let mi = object_store.indexOf(x);
			this.parent_map.set(x, [mi, k]);
		}
		if (k === "") {
			this.input_obj = x;
			return x;
		}
		const { input_obj } = this;
		if (input_obj instanceof Array) {
			if (input_obj.includes(x)) {
				return x;
			}
		}
		if (x instanceof Node) {
			const { dom_nodes } = this;
			if (!dom_nodes.includes(x))
				dom_nodes.push(x);
			let obj_index = dom_nodes.indexOf(x);
			return `TYPE::Store.dom_nodes[${obj_index}]`;
		}
		const { cache } = this;
		if (cache.includes(x)) {
			return `TYPE::Store.cache[${cache.indexOf(x)}]`;
		}
		const { cache_map } = this;
		if (cache_map.has(k)) {
			cache_map.get(k).push(x);
		} else {
			cache_map.set(k, [x]);
		}
		if (!cache.includes(x)) {
			cache.push(x);
		}
		const { vnodes } = this;
		/** @arg {JsonInputType} x @returns {x is VueVnode} */
		function is_vue_vnode(x) {
			return !!(typeof x === 'object' && "component" in x && x.component?.vnode);
		}
		if (!(x instanceof Array) && is_vue_vnode(x)) {
			console.log(x.component?.vnode, x, x === x.component?.vnode);
			if (!vnodes.includes(x))
				vnodes.push(x);
			return `TYPE::Store.vnodes[${vnodes.indexOf(x)}]`;
		}
		let do_vue = false;
		if (!(x instanceof Array) && do_vue) {
			if (x?._container === input_obj) {
				return {
					...x,
					_container: "TYPE::Store.self",
				};
			}
			if (x.__Z_ignore_replacement) {
				this.break_debugger;
				return x;
			}
			if (x?.__vue_app__) {
				this.vue_app = x.__vue_app__;
				return {
					...x,
					__vue_app__: "TYPE::Store.vue_app",
					__Z_ignore_replacement: true,
				};
			}
			return x;
		}
		return `TYPE::Store.cache[${cache.indexOf(x)}]`;
	}
	/** @arg {number} target_stack */
	check_stack_overflow(target_stack) {
		try {
			return this.has_stack_space(target_stack, target_stack);
		} catch {
			return [-1, target_stack];
		}
	}
	/** @arg {number} num @arg {number} start @returns {[number,number]} */
	has_stack_space(num, start) {
		if (num === 0)
			return [num, start];
		return this.has_stack_space(num - 1, start);
	}
	last_stack_space = null;
	/** @arg {any} item @returns {DataItemReturn} */
	stringify_each(item) {
		if (this.cache.includes(item)) {
			return ["TAG::cache_item", this.cache.indexOf(item)];
		}
		let data_res = this.try_json_stringify(item, true);
		let replace_res = new InputObjBox;
		this.do_json_replace(replace_res, ["cache", this.cache]);
		if (data_res === null) {
			return ["TAG::null", null];
		}
		return data_res;
	}
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
	/** @arg {DataItemReturn} obj @returns {DataItemReturn[]} */
	run_internal(obj) {
		if (obj === "TAG::stringify_failed")
			return [];
		let [type, ...arr] = obj;
		/** @type {DataItemReturn[]} */
		let res = [];
		let type_parts = split_string(type, "::");
		if (type_parts[0] !== "CONTENT") {
			this.break_debugger;
			return res;
		}
		for (let x of arr) {
			let ri = this.stringify_each(x);
			res.push(ri);
		}
		return res;
	}
	clone() {
		let new_state = new JsonReplacerState;
		new_state.prepare_with_previous(this);
		return new_state;
	}
	/** @arg {DataItemReturn} x */
	run_json_replacement(x) {
		let new_state = this.clone();
		return new_state.run_json_replacement_with_state(this, x);
	}
	/** @arg {this} other */
	prepare_with_previous(other) {
		const { is_crash_testing, cache, json_result_cache, result_history: other_history } = other;
		if (this.result_history.length !== 1) {
			debugger;
		}
		other_history.push(this.result_history[0]);
		this.is_crash_testing = is_crash_testing;
		this.cache = cache;
		this.json_result_cache = json_result_cache;
		this.result_history = other_history;
	}
	/** @arg {DataItemReturn} x @arg {this} parent */
	run_json_replacement_with_state(parent, x) {
		let new_state = this;
		let this_ = parent;
		let ret = new_state.run_internal(x);
		this_.post_run();
		this_.import_state(new_state);
		return ret;
	}
	/** @arg {JsonReplacerState} x */
	import_state(x) {
		/** @arg {any[]} hist @arg {any} item */
		function add_hist_unique(hist, item) {
			if (hist.includes(item))
				return;
			hist.push(item);
		}
		let rh = this.result_history;
		let oh = x.result_history;
		oh.forEach((x) => add_hist_unique(rh, x));
	}
	/** @template {keyof ContentArgsType} T @arg {InputObjBox} res_box @arg {ContentArgsType[T]} args */
	do_json_replace(res_box, args) {
		if (this.id && this.id > 5)
			return;
		switch (args[0]) {
			case "cache":
				{
					const [c_name, target] = args;
					if (target.length !== 0) {
						let res = this.run_json_replacement([`CONTENT::${c_name}`, target]);
						res_box.arr.push(res);
					}
				}
				break;
			case "empty":
				break;
		}
		if (args[0] !== "cache")
			return;
	}
	/** @template {string} T @arg {T} tag @arg {CacheItemType} x @returns {[`TAG::${T}`, CacheItemType]} */
	prepare_obj(tag, x) {
		return [`TAG::${tag}`, x];
	}
	/** @arg {{}[]} vnode_arr */
	on_data_z(vnode_arr) {
		if (this.id && this.id > 5)
			return;
		let res = vnode_arr.map((x, idx) => this.on_data_item(["TAG::vnode", x], idx), this);
		console.log(res);
	}
	/** @arg {string} section @arg {any} i @arg {["TAG::parsed_json",DataParsable]|["TAG::result",DataItemReturn]} data_result */
	log_data_result(section, i, data_result) {
		console.log(`--- [%s[%s]] ---\n%s %o`, section, i, ...data_result);
	}
	post_run() {
		if (JsonReplacerState.stringify_failed_obj.length > 0) {
			console.log("failed to stringify the following objects");
			for (let failed_obj of JsonReplacerState.stringify_failed_obj) {
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
	/** @arg {any} idx @arg {["TAG::cache_item", number]} data */
	on_tag_cache_item(idx, data) {
		let from_cache = this.cache[data[1]];
		let new_state = this.clone();
		let obj = this.prepare_obj("cache_item_to_log", from_cache);
		let res = new_state.run_json_replacement_with_state(this, obj);
		let { cache_map, dom_nodes, json_result_cache, cache, vnodes, vue_app, input_obj, object_store, parent_map, result_history, id, is_crash_testing, ...os } = new_state;
		let ns_id = this.id;
		Z_len_k(os) > 0 && console.log("[json_data_ex]\n%o", os);
		let first_result = res[0];
		let [inner_type, ...inner_arr] = first_result;
		let skip = true;
		!skip && console.log("[cache_item]", inner_type, data[0]);
		!skip && console.log(new_state);
		log_gen.new_gen();
		log_gen.state_id(new_state, ns_id);
		let id_log = log_gen.capture();
		console.log(id_log);
		!skip && console.log("[state_id=%o]", ns_id, cache_map);
		/** @type {Map<any,any>[]} */
		let cache_map_arr = [];
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
		cache_map_arr = store_window("cache_map_arr", cache_map_arr);
		cache_map_arr.push(cache_map);
		if (typeof inner_arr[0] === "string") {
			inner_arr[0] = JSON.parse(inner_arr[0]);
		}
		this.log_data_result("json_data", idx, ["TAG::result", first_result]);
		return from_cache;
	}
	/** @arg {{}} x @arg {number} i */
	unpack_data_item_vnode_2(x, i) {
		console.log("should unpack [index=%o]", i, x);
		x;
		i;
		return null;
	}
	/** @arg {{}} x @arg {number} i */
	unpack_data_item_todo(x, i) {
		console.log("TODO: [unpack] [index=%o]", i, x);
		x;
		i;
		return null;
	}
	/** @arg {string} x @returns {DataItemReturn} */
	json_parser(x) {
		/** @type {DataParsable} */
		let parse_res = JSON.parse(x, (...r_args) => this.json_reviver(r_args));
		console.log(parse_res);
		return ["TAG::parsed_json", parse_res];
	}
	/** @arg {any} x @returns {DataItemReturn} */
	json_reviver(x) {
		x;
		console.log("revive", x);
		return ["TAG::null", null];
	}
	/** @arg {DataItemReturn} x @arg {any} idx @returns {DataItemReturn} */
	on_data_item(x, idx) {
		if (x === "TAG::stringify_failed")
			return x;
		let xu = x;
		switch (x[0]) {
			default:
				this.break_debugger;
				break;
			case "TAG::data":
				{
					console.log("[data_item::data]", x[1]);
					return ["TAG::empty"];
				}
			case "TAG::cache_item":
				{
					let item = this.on_tag_cache_item(idx, x);
					return ["TAG::cache_item_result", item];
				}
			case "TAG::failed":
				return x;
			case "TAG::vnode_item":
				return ["TAG::failed", null];
			case "TAG::unpack_vnode::1":
				{
					const [, ...data] = x;
					if (data.length === 1)
						return this.on_data_item(["TAG::unpack_vnode::2", data[0]], 0);
					let res = data.map((x, i) => this.unpack_data_item_vnode_2(x, i), this);
					return ["TAG::null_arr", res];
				}
			case "TAG::vnode":
				{
					const [, ...data] = x;
					let unwrap_arr = data.map((x, i) => this.on_data_item(["TAG::unpack_vnode::1", x], i));
					let unpacked = unwrap_arr.map((x, i) => this.on_data_item(["TAG::vnode_inner", x], i));
					/** @type {"test"[]} */
					let ok_res = [];
					for (let item of unpacked) {
						switch (item[0]) {
							case "TAG::vnode_item":
								break;
							default:
								this.break_debugger;
								break;
						}
					}
					return ["TAG::vnode_item", ok_res];
				}
			case "TAG::vnode_inner":
				let res = this.unpack_data_item_todo(x[1], 0);
				return ["TAG::null", res];
			case "TAG::unpack_vnode::2":
				{
					const [, ...data] = x;
					if (data.length === 1)
						return ["TAG::unpack_vnode::2::res", data[0]];
					return ["TAG::unpack_vnode::2::res_arr", data];
				}
			case "TAG::unpack_vnode::2::res":
				return ["TAG::failed", null];
			case "TAG::unpack_vnode::2::res_arr":
				return ["TAG::failed", null];
			case "TAG::stringify_result":
				{
					const [, ...data] = x;
					let data_item = data[0];
					let parsed_item = JSON.parse(data_item, (...r_args) => this.json_reviver(r_args));
					/** @type {["TAG::parsed_json",DataParsable]} */
					let p_res = ["TAG::parsed_json", parsed_item];
					this.log_data_result("vnode", idx, p_res);
					return p_res;
				}
			case "TAG::null_arr":
			case "TAG::null":
			case "CONTENT::empty":
			case "CONTENT::cache":
			case "TAG::bad_array":
			case "TAG::empty":
			case "TAG::parsed_json":
			case "TAG::cache_item_to_log":
			case "TAG::cache_item_result":
			case "TAG::stringify_range_error":
			case "TAG::stringify_seen_failed_obj":
			case "TAG::error":
				console.log("TODO: tag_section", x);
				return ["TAG::failed", null];
		}
		x === "";
		x = xu;
		console.log("TODO: unknown_tag_section", x);
		return ["TAG::failed", null];
	}
	/** @arg {Extract<CacheItemType,{__cache_item:any}>|{}} x */
	on_run_with_cache_type(x) {
		if ("__cache_item" in x)
			return {
				__cache_item: true
			};
		return null;
	}
	/** @arg {JsonInputType} x */
	on_run_with_object_store_type(x) {
		let res = new InputObjBox;
		if (x instanceof Element) {
			this.do_json_replace(res, ["input", x]);
		} else {
			debugger;
		}
		if (x !== null) {
			this.cache.push(x);
		}
		if (this.vue_app !== null) {
			this.do_json_replace(res, ["vue_app", this.vue_app]);
		}
		this.do_json_replace(res, ["vnodes", this.vnodes]);
		this.do_json_replace(res, ["dom_nodes", this.dom_nodes]);
		this.do_json_replace(res, ["cache", this.cache]);
		let cache_index = -1;
		if (x !== null) {
			cache_index = this.cache.indexOf(x);
		}
		let ret_obj = {
			cache_index,
			arr: res.arr,
		};
		return ret_obj;
	}
	/** @arg {["cache", CacheItemType]|["store_object",JsonInputType]} x */
	on_run_request(x) {
		switch (x[0]) {
			case "cache":
				return this.on_run_with_cache_type(x[1]);
			case "store_object":
				return this.on_run_with_object_store_type(x[1]);
			default:
				this.break_debugger;
				throw 1;
		}
	}
	/** @arg {H_Iter} s_ @arg {JsonReplacerState} res_in */
	iter_history_result(s_, res_in) {
		const { target_history: mh } = s_;
		const { cache, object_store, } = res_in;
		let out_ex = {};
		if (!res_in.id)
			res_in.id = res_in.get_id();
		let id = this.get_id();
		out_ex.id = id;
		s_.done_ids.push(res_in.id);
		let history = res_in.result_history.slice();
		let x1 = history.map((x) => x.id);
		out_ex.x1 = x1;
		let x2 = res_in.input_obj;
		let nh = filter_arr(history, mh);
		let rc = res_in.json_result_cache;
		let cv = [...rc.keys()];
		if (cv.length === 1 && cv[0] === x2) {
			let k = rc.get(x2);
			rc.delete(x2);
			rc.set("TAG::input_obj", k);
		}
		out_ex.result_history = nh.map(s_.h_map);
		for (let ci of cache) {
			if (this.cache.includes(ci))
				continue;
			this.cache.push(ci);
		}
		{
			let item = out_ex;
			let self = this;
			const key = "cache";
			item[key] = filter_arr(cache, self[key]);
		}
		if (object_store) {
			out_ex.object_store = object_store.map(x => this.on_run_request(["store_object", x]));
		} else {
			console.log("no object_store");
		}
		out_ex.cache = cache.map((x) => this.on_run_request(["cache", x]));
		return history;
		/** @arg {any[]} x @arg {any[]} o_arr */
		function filter_arr(x, o_arr) {
			return x.filter((x) => !o_arr.includes(x));
		}
	}
	/** @arg {H_Iter} s_ */
	history_iter(s_, recurse = true) {
		const { stack } = s_;
		let all_history_arr = [];
		while (stack.length > 0) {
			let x = stack.shift();
			if (!x)
				break;
			x.id = x.get_id();
			if (s_.done_ids.includes(x.id))
				continue;
			all_history_arr.push(x);
			if (x.id > 2)
				return null;
			console.log("start iter", x.id);
			let inner_arr = this.iter_history_result(s_, x);
			if (inner_arr.length <= 0)
				continue;
			stack.unshift(...inner_arr);
		}
		for (let history of all_history_arr) {
			if (!recurse)
				continue;
			s_.done_ids = [];
			let prev_stack = s_.stack;
			s_.stack = [history];
			let ret = this.history_iter(s_);
			if (ret === null) {
				console.log("failed at", all_history_arr.indexOf(history));
				return null;
			}
			s_.stack = prev_stack;
		}
		/** @arg {any[]} hist */
		function log_history_items(hist) {
			let log_items = hist.map(s_.h_map);
			let log_place = ["%o"];
			log_place.length = log_items.length;
			return ["-- [result_history] --\n" + log_place.join("\n"), ...log_items];
		}
		let log_args = log_history_items(s_.target_history);
		let log_range = to_range(s_.done_ids);
		console.log("[done_ids] " + log_range.map(e => e.length === 2 ? "%o-%o" : "%o").join(", "), ...log_range.flat());
		console.log(...log_args);
		return log_args;
	}
	run() {
		let doc_child = document.body.firstElementChild;
		if (!doc_child)
			throw new Error("No firstElement of document.body");
		let run_result = this.on_run_request(["store_object", doc_child]);
		if (!run_result || "__cache_item" in run_result)
			return;
		let { arr } = run_result;
		let all_vnodes = [];
		for (let item of this.result_history) {
			all_vnodes.push(...item.vnodes);
		}
		arr.forEach(this.on_data_z, this);
		let h_iter_s = new H_Iter(this);
		let cache = this.cache.slice();
		let log_args = this.history_iter(h_iter_s);
		this.cache = cache;
		if (log_args === null)
			return;
		console.log(log_args);
	}
	static create() {
		return new this;
	}
	static create_and_run() {
		let do_create_and_run = true;
		if (!do_create_and_run)
			return;
		this.create().run();

	}
	static {
		this.create_and_run()
	}
	/** @arg {number} start */
	get_stack_limits(start, target = start / 2) {
		target = Math.pow(2, Math.log2(target) | 0)
		let requested_target = target;
		let requested_start = start;
		let initial_start = start;
		let hit_known = false;
		let last_known_zero, last_known_miss, max_known = 0, min_known;
		function reset_known() {
			last_known_zero = null;
			last_known_miss = null;
			max_known = 0;
			min_known = 0xffff;
		}
		reset_known();
		let tries = 0;
		let set_min = true;
		while (target > 1) {
			if (start < 0) {
				debugger; throw new Error();
			}
			let stack_res = this.check_stack_overflow(start);
			tries++;
			if (stack_res[0] === 0) {
				max_known = Math.max(max_known, stack_res[1]);
				min_known = Math.min(min_known, stack_res[1]);
			}
			if (target < 4 && hit_known === false) {
				initial_start *= 2;
				target = initial_start;
				reset_known();
				continue;
			}
			let do_logging = false;
			if (target < 4 && do_logging) {
				console.log(stack_res[0] === 0 ? "up" : "dn", target, stack_res[1]);
			}
			if (stack_res[0] === -1) {
				last_known_miss = start;
				if (set_min) {
					min_known = start;
					set_min = false;
				}
				target = target / 2 | 0;
				if (start - target <= 0) {
					debugger; break;
				}
				start = start - target;
				continue;
			} else if (stack_res[0] === 0) {
				hit_known = true;
				last_known_zero = start;
				target = target * 2 | 0;
				start = start + target;
				continue;
			}
		}
		return {
			target,
			min: min_known,
			required_start: initial_start,
			start: start,
			zero: last_known_zero,
			last_crash: last_known_miss,
			max: max_known,
			tries,
			requested_start,
			requested_target,
		};
	}
	log_limits(limits_obj) {
		let logging = false;
		if (!logging)
			return;
		const { start, target, zero, last_crash, min, max } = limits_obj;
		let calc_start = start - target;
		console.log("call stack overflow known results", [zero, last_crash]);
		console.log("call stack overflow range", [min, max], "diff from start_at", calc_start - min);
		console.log("st", start, target);
	}
	get_final_stack_space(start, lower, upper) {
		let near_checks = [];
		let inc = Math.max(1, (upper / 32 | 0));
		for (let i = lower; i < upper; i += inc) {
			let check = this.check_stack_overflow(start + i);
			near_checks.push(check);
		}
		return near_checks;
	}
	is_containing_stack_limit(stk_sp_arr) {
		return stk_sp_arr.find(e => e[0] === 0) && stk_sp_arr.find(e => e[0] === -1);
	}
	do_has_stack_space(limit_guess) {
		let try_count = 0;
		let space_guess = null;
		if (this.last_stack_space !== null) { }
		let limits_1 = this.get_stack_limits(limit_guess);
		this.log_limits(limits_1);
		let n_start = limits_1.zero - limits_1.min;
		let diff = limits_1.last_crash - limits_1.start;
		let limits_2 = this.get_stack_limits(n_start, 4);
		this.log_limits(limits_2);
		let near_checks = this.get_final_stack_space(limits_2.start, -5, 5);
		let has_stack_limit = near_checks.find(e => e[0] === 0) && near_checks.find(e => e[0] === -1);
		limits_2.target = 32;
		while (!this.is_containing_stack_limit(near_checks)) {
			near_checks = this.get_final_stack_space(limits_2.start, 1, limits_2.target);
			limits_2.target *= 2;
			if (limits_2.target > n_start * 2) {
				console.log("failed to find stack bounds");
				debugger; throw new Error();
			}
		}
		let result = near_checks.filter(e => e[0] !== -1).reduce((acc, v) => Math.min(acc, v[1]), Infinity);
		this.last_stack_space = result;
		return result;
	}
}
