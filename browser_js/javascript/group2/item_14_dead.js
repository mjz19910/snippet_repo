/* --- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_14_dead.js
*/
class JsonReplacerState_DeadItem14Code {
	/** @type {CacheItemType[]} */
	json_cache = [];
	/** @protected @arg {any} item @returns {DataItemReturn} */
	stringify_each(item) {
		if (this.json_cache.includes(item)) {
			return ["TAG::cache_item", this.json_cache.indexOf(item)];
		}
		let data_res = this.try_json_stringify(item, true);
		let replace_res = new InputObjBox;
		do_json_replace(replace_res, ["cache", this.json_cache]);
		if (data_res === null) {
			return ["TAG::null", null];
		}
		if (typeof data_res === 'object' && data_res[0] === "TAG::error") {
			debugger; return ["TAG::null", null];
		}
		return data_res;
	}
	/** @type {JsonInputType[]} */
	object_store = [];
	/** @type {Map<unknown,[number,string]>} */
	parent_map = new Map;
	/** @type {{}|null} */
	input_obj = null;
	/** @type {Node[]} */
	dom_nodes = [];
	/** @type {VueVnode[]} */
	vnodes = [];
	/** @protected @arg {string} k @arg {JsonInputType|null} x */
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
		if (overflow_state.ran_out_of_stack) {
			return overflow_state.stack_limit_json_result;
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
		const { json_cache: cache } = this;
		if (cache.includes(x)) {
			return `TYPE::Store.cache[${cache.indexOf(x)}]`;
		}
		if (cache_map.has(k)) {
			cache_map.get(k)?.push(x);
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
				// debugger;
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
	json_stringify_count = 0;
	is_crash_testing = false;
	/** @type {Map<JsonInputType,string>} */
	json_result_cache = new Map;
	/** @type {InputObjBox[]} */
	index_box_store = [];
	/** @type {Map<number,IndexBoxMap[keyof IndexBoxMap]>} */
	index_tag_map = new Map;
	/** @private @arg {JsonInputType} x @returns {DataItemReturn|null} */
	try_json_stringify(x, first = false) {
		this.json_stringify_count++;
		if (this.json_stringify_count % 64 === 0) {
			let space = this.do_has_stack_space(4096);
			console.log("[stack_left]", space);
			if (space < 9500) {
				{
					debugger;
				}
				let os = overflow_state;
				os.ran_out_of_stack = true;
				let stack_exhausted_msg = `RangeError: Ran of stack space, ${space} frames left`;
				os.ran_out_of_stack_args = [JSON.stringify({
					_tag: "Error",
					args: stack_exhausted_msg
				})];
				os.stack_limit_json_result = ["TAG::error", ...os.ran_out_of_stack_args];
				throw new AggregateError(["TAG::error", ...os.ran_out_of_stack_args], "JsonParse: StackExhausted");
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
			let res_box = new InputObjBox;
			let index = this.index_box_store.push(res_box) - 1;
			let tagged_val = this.tag_obj(index, "InputObjBox");
			this.index_tag_map.set(index, {
				_inner_tag: "InputObjBox",
				value: tagged_val
			});
			return ["TAG::stringify_result", json_result, tagged_val];
		} catch (e) {
			if (e instanceof RangeError) {
				return ["TAG::stringify_range_error", e];
			}
			if (e instanceof AggregateError) {
				if (e.message === "JsonParse: StackExhausted") {
					if (was_crash_testing) {
						throw e;
					}
					debugger; throw e;
				}
				debugger;
			}
			if (J_Rep.stringify_failed_obj.includes(x)) {
				return ["TAG::stringify_seen_failed_obj", J_Rep.stringify_failed_obj.indexOf(x)];
			}
			J_Rep.stringify_failed_obj.push(x);
			if (was_crash_testing) {
				throw e;
			}
			console.log("swallowing error", e);
			return ["TAG::stringify_failed"];
		} finally {
			this.is_crash_testing = was_crash_testing;
		}
		return null;
	}
	/** @template T @template {string} U @arg {T} x @arg {U} tag @returns {T&{_tag:U}} */
	tag_obj(x, tag) {
		/** @arg {T} _ @returns {asserts _ is T&{_tag:U}} */
		let assert_assume_true = _ => void 0;
		/** @template {{}} T @arg {{v:"a";t:T}|{v:"b";t:T&{_tag:U}}} x @arg {U} _v @returns {x is {v:"b";t:T&{_tag:U}}} */
		let object_remove_optional = (x, _v) => "_tag" in x.t;
		/** @template {{_tag?:unknown}} T @arg {T} x @arg {U} v @returns {x is T&{_tag:U}} */
		let object_use_eq = (x, v) => x._tag === v;
		if (typeof x === "object" || typeof x === "function") {
			if (x === null) {
				assert_assume_true(x);
				return x;
			}
			if ("_tag" in x) {
				if (object_use_eq(x, tag)) {
					return x;
				}
				/** @type {T&{}} */
				let y1 = x;
				/** @type {T&{_tag?:U}} */
				let y2 = y1;
				y2._tag = tag;
				/** @type {T&{}} */
				let y3 = y2;
				if (object_use_eq(y3, tag)) {
					return y3;
				}
				throw new Error("Failed to set, probably trying to set the tag property [\"_tag\"] but that property is readonly");
			}
			/** @arg {T&{}} x @arg {"a"} v @returns {{v:"a",t:(T&{})}|{v:"b",t:(T&{_tag:U})}} */
			function gy(x, v = "a", t = x) {
				return {
					v,
					t
				};
			}
			/** @type {{v:"a",t:(T&{})}|{v:"b",t:(T&{_tag:U})}} */
			let y = gy(x);
			if (object_remove_optional(y, tag)) {
				y.t._tag = tag;
				return y.t;
			}
		}
		assert_assume_true(x);
		return x;
	}
	/** @arg {number} start @returns {StackLimitReturn} */
	get_stack_limits(start, target = start / 2) {
		target = Math.pow(2, Math.log2(target) | 0)
		let requested_target = target;
		let requested_start = start;
		let initial_start = start;
		let hit_known = false;
		let last_known_zero = start
			, last_known_miss = start
			, max_known = 0
			, min_known = 0xffff;
		function reset_known() {
			last_known_zero = requested_start;
			last_known_miss = requested_start;
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
	/** @arg {StackLimitReturn} limits_obj */
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
	/** @private @arg {number} limit_guess */
	do_has_stack_space(limit_guess) {
		if (overflow_state.last_stack_space !== null) { }
		let limits_1 = this.get_stack_limits(limit_guess);
		this.log_limits(limits_1);
		if (!limits_1.zero) {
			debugger; throw new Error();
		}
		if (!limits_1.last_crash) {
			debugger; throw new Error();
		}
		let n_start = limits_1.zero - limits_1.min;
		let limits_2 = this.get_stack_limits(n_start, 4);
		this.log_limits(limits_2);
		let near_checks = this.get_final_stack_space(limits_2.start, -5, 5);
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
		overflow_state.last_stack_space = result;
		return result;
	}
	/** @arg {number} num @arg {number} start @returns {[number,number]} */
	has_stack_space(num, start) {
		if (num === 0)
			return [num, start];
		return this.has_stack_space(num - 1, start);
	}
	/** @arg {number} target_stack @returns {[number, number]} */
	check_stack_overflow(target_stack) {
		try {
			return this.has_stack_space(target_stack, target_stack);
		} catch {
			return [-1, target_stack];
		}
	}
	/** @arg {number} start @arg {number} lower @arg {number} upper @returns {[number, number][]} */
	get_final_stack_space(start, lower, upper) {
		/** @type {[number, number][]} */
		let near_checks = [];
		let inc = Math.max(1, (upper / 32 | 0));
		for (let i = lower; i < upper; i += inc) {
			let check = this.check_stack_overflow(start + i);
			near_checks.push(check);
		}
		return near_checks;
	}
	/** @arg {[number,number][]} stk_sp_arr */
	is_containing_stack_limit(stk_sp_arr) {
		return stk_sp_arr.findIndex(e => e[0] === 0) > -1 && stk_sp_arr.findIndex(e => e[0] === -1) > -1;
	}
	clone() {
		let new_state = new JsonReplacerState_DeadItem14Code;
		new_state.prepare_with_previous(this);
		return new_state;
	}
	/** @type {this[]} */
	result_history = [];
	/** @arg {this} other */
	add_to_history(other) {
		if (this.result_history.includes(other))
			return;
		this.result_history.push(other);
	}
	/** @arg {this} other */
	prepare_with_previous(other) {
		other.add_to_history(this);
		const { is_crash_testing, json_cache: cache, json_result_cache } = other;
		this.is_crash_testing = is_crash_testing;
		this.json_cache = cache;
		this.json_result_cache = json_result_cache;
	}
}