import {AUDIO_ELEMENT_VOLUME, LOG_LEVEL_ERROR, LOG_LEVEL_INFO} from "types/constants.js";
import {AsyncAutoBuy} from "./AsyncAutoBuy";
import {AsyncNodeRoot} from "../AsyncNodeRoot";
import {AsyncPromiseBoxImpl} from "../AsyncPromiseBoxImpl";
import {AutoBuyState} from "../AutoBuyState";
import {AudioMuted} from "../const.js";
import {CSSStyleSheetBox} from "../CSSStyleSheetBox";
import {CSSStyleSheetConstructorBoxImpl} from "../CSSStyleSheetConstructorBoxImpl";
import {DataLoader} from "../DataLoader";
import {DomBuilderVM} from "../DomBuilderVM";
import {EventHandlerDispatch} from "../EventHandlerDispatch";
import {EventHandlerVMDispatch} from "../EventHandlerVMDispatch";
import {IntervalIdNodeRef} from "../IntervalIdNodeRef";
import {labeled_sym} from "../labeled_sym";
import {l_log_if} from "../l_log_if";
import {MulCompression} from "../MulCompression";
import {next_debug_id} from "../next_debug_id";
import {PromiseBox} from "../PromiseBox";
import {SimpleStackVMParser} from "../SimpleStackVMParser";
import {throw_invalid_error} from "../throw_invalid_error";
import {TimeoutNode} from "../TimeoutNode";
import {TimeoutTarget} from "../TimeoutTarget";
import {debug_id_syms} from "../rebuild_the_universe_auto_v0.2";
import {specialclick_inject} from "../specialclick_inject";
import {lightreset_inject} from "../lightreset_inject";
import {array_sample_end} from "../array_sample_end";
import {do_auto_unit_promote} from "../do_auto_unit_promote";

export class AutoBuy {
	async_compress() {
		this.state_history_arr = this.compressor.compress_array(this.state_history_arr);
		this.update_history_element();
	}
	constructor() {
		this.root_node = new AsyncNodeRoot;
		this.with_async = new AsyncAutoBuy(this);
		this.timeout_ms = 0; this.iter_count = 0; this.epoch_len = 0;
		this.background_audio = null; this.state_history_arr = null;
		this.skip_save = false; this.has_real_time = false;
		/**
		 * @type {number[]}
		 */
		this.cint_arr = [];
		this.local_data_loader = new DataLoader(localStorage);
		this.state = new AutoBuyState(this.root_node);
		this.debug = this.state.debug;
		this.compressor = new MulCompression;
		this.state_history_arr = this.local_data_loader.load_str_arr('auto_buy_history_str', ["S"]);
		this.epoch_start_time = Date.now();
		this.original_map = new Map;
		/**@type {Map<string, (Node|string)>} */
		this.dom_map = new Map;
		this.debug_arr = [];
		this.flags = new Set();
		/**@type {any} */
		let this_as_any = this;
		/**@type {{[x:symbol]:string}} */
		let sym_indexed_this = this_as_any;
		for(let i = 0; i < debug_id_syms.length; i++) {
			let val = debug_id_syms[i].deref();
			if(val && sym_indexed_this[val.sym])
				this.debug_arr.push(...sym_indexed_this[val.sym].split(",").map(e => e.trim()));
		}
		this.timeout_arr = this.local_data_loader.load_int_arr_cb('auto_buy_timeout_str', _e => {
			let src = [300];
			src.length = 16;
			let data_len = 1;
			while(data_len < src.length) {
				src.copyWithin(data_len, 0);
				data_len *= 2;
			}
			return src;
		});
	}
	pre_init() {
		this.background_audio = document.querySelector("#background_audio");
		if(!this.background_audio)
			throw new Error("Missing element querySelector('#background_audio')");
		if(this.background_audio instanceof HTMLAudioElement) {
			this.background_audio.onloadeddata = null;
			this.background_audio.volume = AUDIO_ELEMENT_VOLUME;
		} else {
			throw new Error("querySelector('#background_audio') is not an instance of HTMLAudioElement");
		}
		this.async_pre_init().then(() => {
			l_log_if(LOG_LEVEL_INFO, 'pre_init done');
		}); this.dom_pre_init();
	}
	async async_pre_init() {
		if(!this.background_audio)
			throw 1;
		if(!(this.background_audio instanceof HTMLAudioElement))
			throw 1;
		x: try {
			return await this.background_audio.play();
		} catch(e) {
			l_log_if(LOG_LEVEL_INFO, "failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
		}
		let raw_instructions = `
			this;
			cast_object,object_index;
			push,target_obj;
			get;
			cast_object,object_index;
			push,background_audio;
			get;
			cast_object,callable_index;
			push,play;
			call,int(2);
			cast_object,callable_index;
			push,then;
			push,%o;
			push,%o;
			call,int(4);
			drop;
			global;
			cast_object,callable_index;
			push,removeEventListener;
			push,click;
			this;
			call,int(4);
			drop`;
		let instructions = SimpleStackVMParser.parse_instruction_stream_from_string(raw_instructions, [
			function() {
				// LOG_LEVEL_INFO
				l_log_if(LOG_LEVEL_ERROR, 'play success');
			},
			/**@arg {any} err */
			function(err) {
				l_log_if(LOG_LEVEL_ERROR, err);
			}
		]);
		let handler = new EventHandlerVMDispatch(instructions, this);
		window.addEventListener('click', handler);
	}
	save_state_history_arr() {
		if(this.skip_save)
			return;
		localStorage.auto_buy_history_str = this.state_history_arr.join(",");
	}
	/**
	 * @param {string} forced_action
	 */
	get_timeout_arr_data(forced_action) {
		if(forced_action == "RESET")
			return this.timeout_arr.map((/** @type {number} */ e) => ~~(e / 4)).join(",");
		return this.timeout_arr.join(",");
	}
	save_timeout_arr() {
		let forced_action, action_count;
		let action_data = localStorage.auto_buy_forced_action;
		if(action_data)
			[forced_action, action_count] = action_data.split(",");
		localStorage.auto_buy_timeout_str = this.get_timeout_arr_data(forced_action);
		if(action_count !== void 0) {
			action_count = parseInt(action_count);
			if(Number.isFinite(action_count)) {
				if(action_count > 0) {
					localStorage.auto_buy_forced_action = [forced_action, action_count - 1];
				} else if(forced_action !== "NONE") {
					localStorage.auto_buy_forced_action = "NONE,0";
				}
			}
		}
	}
	dom_pre_init() {
		class DocumentBox {
			/**@type {"document_box"} */
			type = "document_box";
			/**
			 * @param {'function'|'object'} s
			 */
			as_type(s) {
				if(typeof this.value === s)
					return this;
				return null;
			}
			/**
			 * @param {Document} value
			 */
			constructor(value) {
				this.value = value;
			}
		}
		const css_display_style = `#state_log>div{width:max-content}#state_log{top:0px;width:30px;position:fixed;z-index:101;font-family:monospace;font-size:22px;color:lightgray}`;
		/**@type {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[]} */
		let create_state_log_arr = [
			[0, 'push', new DocumentBox(document), 'body'],
			[0, 'get'],
			[1, 'dom_filter', 'create', 'div', 'state_log', {id: 'state_log'}],
			[1, 'dup'],
			[1, 'append']
		];
		/**
		 * @this {AutoBuy}
		 * */
		async function css_promise_runner(/** @type {import("types/vm/box/Box.js").Box[]} */ ...styles_promise_arr) {
			/**@type {Promise<import("types/vm/box/Box.js").Box>[]} */
			let css_arr = [];
			for(let i = 0; i < styles_promise_arr.length; i++) {
				let cur = styles_promise_arr[i];
				l_log_if(LOG_LEVEL_INFO, 'css run', cur);
				if(typeof cur != 'object')
					continue;
				if(cur === null)
					continue;
				if(cur.type != 'promise_box')
					continue;
				if(cur.await_type === 'Box') {
					css_arr.push(cur.value);
				}
			}
			/*@Hack: wait for any promise to settle*/
			const e = await Promise.allSettled(css_arr);
			/**@type {PromiseFulfilledResult<import("types/vm/box/Box.js").Box>[]} */
			let fulfilled_res = [];
			/**@type {PromiseRejectedResult[]} */
			let rejected_res = [];
			for(let i = 0; i < e.length; i++) {
				let cur = e[i];
				if(cur.status === 'fulfilled') {
					fulfilled_res.push(cur);
				} else {
					rejected_res.push(cur);
				}
			}
			let res = fulfilled_res.map(e_1 => e_1.value);
			/**@type {CSSStyleSheet[]} */
			let css_arr2 = [];
			for(let i = 0; i < res.length; i++) {
				let cur = res[i];
				l_log_if(LOG_LEVEL_INFO, 'css ss', cur);
				if(typeof cur != 'object')
					continue;
				if(cur === null)
					continue;
				if(cur.type != 'instance_box')
					continue;
				if(cur.instance_type != "CSSStyleSheet")
					continue;
				css_arr2.push(cur.value);
			}
			l_log_if(LOG_LEVEL_INFO, 'promise res2', css_arr2);
			this.adopt_styles(...css_arr2);
			if(rejected_res.length > 0) {
				l_log_if(LOG_LEVEL_ERROR, 'promise failure...', ...rejected_res);
			}
		}
		let bound_this = this;
		class VoidPromiseBoxImpl {
			/**@type {"promise_box"} */
			type = "promise_box";
			/**@type {"Promise<void>"} */
			inner_type = "Promise<void>";
			return_type = null;
			/**@type {void} */
			await_type;
			/**@type {"void_type"} */
			promise_return_type_special = "void_type";
			/**@arg {"function"} type */
			as_type(type) {
				if(typeof this.value === type)
					return this;
				return null;
			}
			/**@arg {any} value */
			constructor(value) {
				this.await_type = void 0;
				this.value = value;
			}
		}
		/**@type {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[]} */
		let make_css_arr = [
			[
				0, 'push', null,
				new AsyncPromiseBoxImpl(function(/** @type {import("types/vm/box/Box.js").Box[]} */ ...a) {
					l_log_if(LOG_LEVEL_INFO, 'void input', a);
					let ret = css_promise_runner.call(bound_this, ...a);
					l_log_if(LOG_LEVEL_INFO, 'void out', ret);
					return new VoidPromiseBoxImpl(ret);
				})
			],
			[
				0, 'dom_filter', 'new', new CSSStyleSheetConstructorBoxImpl(CSSStyleSheet), [],
				(/** @type {CSSStyleSheet} */ obj, /** @type {string} */ str) => obj.replace(str),
				[css_display_style]
			],
			[0, 'call', 3],
			/*drop the promise*/
			[0, 'drop']
		];
		/**@type {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[]} */
		let dom_arr_part_mid = [
			[2, 'dom_filter','create', 'div', 'history', "?3"],
			[2, 'append'],
			[2, 'dom_filter','create', 'div', 'timeout_element', "0"],
			[2, 'append'],
			[2, 'dom_filter','create', 'div', 'hours_played', "0.000 hours"],
			[2, 'append'],
			[2, 'dom_filter','create', 'div', 'ratio', 0..toFixed(2) + "%"],
			[2, 'append'],
			[2, 'dom_filter','create', 'div', 'ratio_change', 0..toExponential(3)],
			[2, 'append'],
			[1, 'drop'],
			[0, 'drop'],
		];
		/**@type {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[]} */
		let raw_dom_arr = [
			...create_state_log_arr,
			...dom_arr_part_mid,
			...make_css_arr
		];
		this.build_dom_from_desc(raw_dom_arr, this.dom_map);
	}
	/**
	 * @param {CSSStyleSheet[]} styles
	 */
	adopt_styles(...styles) {
		let dom_styles = document.adoptedStyleSheets;
		document.adoptedStyleSheets = [...dom_styles, ...styles];
	}
	/**
	 * @arg {(a:CSSStyleSheet, b:string)=>Promise<CSSStyleSheet>} callback
	 * @arg {[CSSStyleSheet, string]} a
	*/
	use_boxed_style_sheet(callback, ...a) {
		let ret = callback(...a);
		let r2 = ret.then(function(v) {
			return new CSSStyleSheetBox(v);
		});
		let res = new PromiseBox(r2);
		return res;
	}
	/**@typedef {[number, ...import("types/vm/instruction/mod").InstructionType]} InstructionWithDepth */
	/**
	 * @param {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[]} raw_arr
	 */
	build_dom_from_desc(raw_arr, trg_map = new Map) {
		/**@type {InstructionWithDepth[]} */
		let stack = [];
		let map = trg_map;
		for(let i = 0; i < raw_arr.length; i++) {
			let cur_item = raw_arr[i];
			// let [depth, action, ...args] = cur_item;
			switch(cur_item[1]) {
				//case 'new': {
				//	const [depth, , class_box, construct_arg_arr, callback, arg_arr] = cur_item;
				//	let fn_box = new FunctionBoxImpl(
				//		/**
				//		 * @arg {AutoBuy} obj
				//		 * @arg {(obj: CSSStyleSheet, str: string) => Promise<CSSStyleSheet>} callback
				//		 * @arg {Box} a
				//		 * @arg {Box} b */
				//		function(obj, callback, a, b) {
				//			if(typeof b === 'string' &&
				//				a && typeof a === 'object' &&
				//				a.type === 'instance_box' &&
				//				a.instance_type === 'CSSStyleSheet') {
				//				return obj.use_boxed_style_sheet(callback, a.value, b);
				//			}
				//			throw 1;
				//		}.bind(null, this, callback)
				//	);
				//	stack.push(
				//		[cur_item[0], 'push', null, fn_box, ...construct_arg_arr, class_box],
				//		[cur_item[0], 'construct', 1 + construct_arg_arr.length],
				//		[depth, 'push', ...arg_arr],
				//		[depth, 'call', 3 + arg_arr.length]
				//	);
				//} break;
				//case 'create': {
				//	const [depth, , element_type, name, content] = cur_item;
				//	let cur_element = document.createElement(element_type);
				//	if(typeof content == 'string')
				//		cur_element.innerText = content;
				//	else if(typeof content == 'object' && content.id) {
				//		let dom_id = content.id;
				//		if(typeof dom_id === 'string') {
				//			cur_element.id = dom_id;
				//		}
				//	} else {
				//		l_log_if(LOG_LEVEL_ERROR, 'bad typeof == %s for content in build_dom; content=%o', typeof content, content);
				//		l_log_if(LOG_LEVEL_TRACE, "Info: case 'create' args are", element_type, name);
				//	}
				//	map.set(name, cur_element);
				//	stack.push([depth, "push", new NodeBoxImpl('create', cur_element)]);
				//} break;
				case 'append': {
					let depth = cur_item[0];
					stack.push([depth, "peek", 0]);
					stack.push(cur_item);
				} break;
				case 'get':
				case 'dup':
				case 'breakpoint':
				case 'drop':
				case 'call':
				/*push the item*/
				case 'push': stack.push(cur_item); break;
				default: {
					/**@type {any} */
					let any_cur = cur_item;
					if(!(any_cur instanceof Array))
						throw 1;
					const [, action] = any_cur;
					l_log_if(LOG_LEVEL_ERROR, 'might need to handle', action);
					debugger;
				} break;
			}
			if(this.debug_arr.includes('build_dom_from_desc'))
				console.log('es', stack.at(-1));
		}
		let instructions = this.parse_dom_stack(stack);
		let builder_vm = new DomBuilderVM(instructions);
		builder_vm.run();
	}
	/**
	 * @param {string} tag
	 * @param {(string | number | any[])[]} log_args
	 */
	log_if(tag, ...log_args) {
		if(this.debug_arr.includes(tag)) {
			console.log(...log_args);
		}
	}
	/**
	 * @param {string} tag
	 */
	get_logging_level(tag, level = LOG_LEVEL_INFO) {
		if(this.debug_arr.includes(tag)) {
			return level - 1;
		}
		return level;
	}
	get [next_debug_id()]() {
		return '';
	}
	/**
	 * @arg {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType} value
	 * @arg {number} stack_ptr
	 * @arg {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[][]} stack
	 * */
	push_instruction_group(stack, stack_ptr, value) {
		let instructions_at = stack[stack_ptr];
		if(instructions_at) {
			instructions_at.push(value);
		} else {
			stack[stack_ptr] = [value];
		}
	}
	/** @arg {InstructionWithDepth[]} input_instructions @returns {import("types/vm/instruction/mod").InstructionType[]} */
	parse_dom_stack(input_instructions) {
		const double_indirect_error_str = "Double indirect vm_call is hard to prove to the typechecker";
		/**@type {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[][]} */
		let stack = [];
		/**@type {number[]} */
		let depths = [];
		for(let i = 0; i < input_instructions.length; i++) {
			let cur = input_instructions[i];
			const [cur_depth, ...cur_instruction] = cur;
			//this.push_instruction_group(stack, cur_depth, cur_instruction);
			//const prev_depth = depths.at(-1);
			//if(prev_depth != cur_depth && prev_depth) {
			//	if(cur_depth > prev_depth) {
			//		let instructions_at = stack[prev_depth];
			//		if(!instructions_at)
			//			throw new Error("");
			//		let ins_start_item = instructions_at[0];
			//		if(ins_start_item[0] === 'vm_call_at')
			//			throw new Error(double_indirect_error_str);
			//		this.push_instruction_group(stack, prev_depth - 1, ['vm_call_at', ins_start_item]);
			//	}
			//}
			//depths.push(cur_depth);
		}
		/**@type {import("types/vm/instruction/vm/VMBlockTrace.js").DomInstructionType[]} */
		let flat_stack = [];
		/**@type {import("types/vm/instruction/mod").InstructionType[]} */
		let instructions = [];
		for(let i = 0; i < stack.length; i++) {
			let cur_instructions = stack[i];
			if(!cur_instructions)
				continue;
			flat_stack.push(...cur_instructions);
			flat_stack.push([1, "vm_return"]);
		}
		for(let i = 0; i < flat_stack.length; i++) {
			let instruction = flat_stack[i];
			if(instruction[1] === 'vm_block_trace' && instruction[2] === 'call' && instruction[3]) {
				let idx = flat_stack.indexOf(instruction[3][0]);
				instructions.push(['vm_call', idx]);
				continue;
			}
			switch(instruction[1]){
				case 'marker':
				case 'vm_call_at':
				case 'dom_filter':break;
				default:{let [, ...rest]=instruction;instructions.push(rest);} break;
			}
		}
		console.log('parse_dom_stack', stack, depths, instructions);
		return instructions;
	}
	init_dom() {
		const font_size_px = 22;
		let t = this;
		this.state_history_arr_max_len = Math.floor(document.body.getClientRects()[0].width / (font_size_px * 0.55) / 2.1);
		let history = this.dom_map.get('history');
		if(history && typeof history == 'object')
			history.addEventListener('click', new EventHandlerDispatch(this, 'history_element_click_handler'));
		let ratio = this.dom_map.get('ratio');
		if(ratio && typeof ratio == 'object') {
			ratio.addEventListener('click', function() {
				t.state.reset();
			});
		}
		let state_log = this.dom_map.get('state_log');
		if(state_log instanceof HTMLElement)
			state_log.style.fontSize = font_size_px + "px";
		window.addEventListener('unload', function() {
			t.save_state_history_arr();
			t.save_timeout_arr();
		});
	}
	global_init() {
		if(window.g_auto_buy && window.g_auto_buy !== this) {
			window.g_auto_buy.destroy();
		}
		window.g_auto_buy = this;
	}
	destroy() {
		this.root_node.destroy();
		for(let i = 0; i < this.cint_arr.length; i += 2) {
			let cint_item = this.cint_arr[i];
			switch(cint_item[0]) {
				case 1: clearTimeout(cint_item[1]); break;
				case 2: clearInterval(cint_item[1]); break;
				default: console.assert(false, 'cant destroy cint item (%o)', cint_item); break;
			}
		}
	}
	update_timeout_element() {
		if(this.timeout_ms) {
			let element = this.dom_map.get('timeout_element');
			if(element instanceof HTMLElement) {
				element.innerText = this.get_millis_as_pretty_str(this.round(this.timeout_ms), 0); // (this.timeout_avg()[1]);
			}
		}
	}
	/**
	 * @param {string | number} value
	 * @param {string} pad_char
	 * @param {number} char_num
	 */
	do_zero_pad(value, pad_char, char_num) {
		let string;
		if(typeof value === 'number') {
			string = value.toString();
		} else {
			string = value;
		}
		while(string.length < char_num) {
			string = pad_char + string;
		}
		return string;
	}
	/**
	 * @param {number} timeout_milli
	 * @param {number | undefined} milli_acc
	 */
	get_millis_as_pretty_str(timeout_milli, milli_acc) {
		let time_arr = [];
		let float_milliseconds = timeout_milli % 1000;
		let milli_len = 6;
		if(milli_acc === 0) {
			milli_len = 3;
		}
		time_arr[3] = this.do_zero_pad(float_milliseconds.toFixed(milli_acc), '0', milli_len);
		timeout_milli -= float_milliseconds;
		timeout_milli /= 1000;
		let int_seconds = timeout_milli % 60;
		time_arr[2] = this.do_zero_pad(int_seconds, '0', 2);
		timeout_milli -= int_seconds;
		timeout_milli /= 60;
		let int_minutes = timeout_milli % 60;
		time_arr[1] = this.do_zero_pad(int_minutes, '0', 2);
		timeout_milli -= int_minutes;
		timeout_milli /= 60;
		let int_hours = timeout_milli;
		time_arr[0] = this.do_zero_pad(int_hours, '0', 2);
		int_hours === 0 && (time_arr.shift(), int_minutes === 0 && (time_arr.shift(), int_seconds === 0 && time_arr.shift()));
		switch(time_arr.length) {
			case 1:
				return time_arr[0] + 'ms';
			case 2:
				return time_arr[0] + '.' + time_arr[1];
			case 3:
				return time_arr.slice(0, 2).join(":") + '.' + time_arr[2];
			case 4:
				return time_arr.slice(0, 3).join(":") + '.' + time_arr[3];
		}
		return time_arr.join(":");
	}
	/**
	 * @param {number} hours_num
	 */
	get_hours_num_as_pretty_str(hours_num) {
		let int_hours = ~~hours_num;
		let time_arr = [];
		time_arr[0] = this.do_zero_pad(int_hours, '0', 2);
		let float_minutes = (hours_num - int_hours) * 60;
		let int_minutes = ~~float_minutes;
		time_arr[1] = this.do_zero_pad(int_minutes, '0', 2);
		let float_seconds = (float_minutes - int_minutes) * 60;
		let int_seconds = ~~float_seconds;
		time_arr[2] = this.do_zero_pad(int_seconds, '0', 2);
		let float_milliseconds = (float_seconds - int_seconds) * 1000;
		let float_milli_from_prev = float_milliseconds - 1000;
		if(float_milliseconds > 100 && float_milliseconds < 900) {
			this.has_real_time = true;
		}
		x: if(this.has_real_time) {}
		else if(float_milliseconds < 3e-9 && float_milliseconds > -3e-9) {}
		else if(float_milli_from_prev < 3e-9 && float_milli_from_prev > -3e-9) {}
		else {
			break x;
			// console.log(float_milliseconds, float_milliseconds - 1000);
		}
		let int_milliseconds = ~~float_milliseconds;
		if(int_milliseconds >= 1000) {
			int_milliseconds -= 1000;
			int_seconds++;
			if(int_seconds >= 60) {
				int_seconds = 0;
				int_minutes++;
				if(int_minutes >= 60) {
					int_minutes = 0;
					int_hours++;
					time_arr[0] = this.do_zero_pad(int_hours, '0', 2);
					console.log('sec+ min+ hour+');
				} else {
					console.log('sec+ min+');
				}
				time_arr[1] = this.do_zero_pad(int_minutes, '0', 2);
			} else {
				console.log('sec+');
			}
			time_arr[2] = this.do_zero_pad(int_seconds, '0', 2);
		}
		time_arr[3] = this.do_zero_pad(int_milliseconds, '0', 3);
		int_hours === 0 && (time_arr.shift(), int_minutes === 0 && (time_arr.shift(), int_seconds === 0 && time_arr.shift()));
		switch(time_arr.length) {
			case 1:
				return time_arr[0] + 'ms';
			case 2:
				return time_arr[0] + '.' + time_arr[1];
			case 3:
				return time_arr.slice(0, 2).join(":") + '.' + time_arr[2];
			case 4:
				return time_arr.slice(0, 3).join(":") + '.' + time_arr[3];
		}
		return time_arr.join(":");
	}
	update_hours_played() {
		let float_hours = ((window.timeplayed / 30) / 60);
		let time_played_str = this.get_hours_num_as_pretty_str(float_hours);
		let hours_played_e = this.dom_map.get('hours_played');
		if(hours_played_e instanceof HTMLElement)
			hours_played_e.innerText = time_played_str;
		this.dom_map.set('time_played_str', time_played_str);
	}
	update_ratio_element() {
		let ratio = this.dom_map.get('ratio');
		if(!ratio)
			return;
		if(!(ratio instanceof HTMLElement))
			return;
		ratio.innerText = (this.state.ratio * 100).toFixed(2) + "%";
	}
	update_ratio_change_element() {
		let last_ratio = this.state.last_ratio * 100;
		let cur_ratio = this.state.ratio * 100;
		let ratio_diff = cur_ratio - last_ratio;
		let char_value = "+";
		if(ratio_diff < 0)
			char_value = '';
		let ratio_change = this.dom_map.get('ratio_change');
		if(ratio_change && ratio_change instanceof HTMLElement)
			ratio_change.innerText = char_value + ratio_diff.toExponential(3);
	}
	update_history_element() {
		let history = this.dom_map.get('history');
		if(history && history instanceof HTMLElement) {
			let sample_len = this.state_history_arr_max_len;
			if(!sample_len)
				return;
			let end_sample = array_sample_end(this.state_history_arr, sample_len).join(" ");
			history.innerText = end_sample;
		}
	}
	next_update() {
		if(this.flags.has('do_reset_dom')) {
			this.flags.delete('do_reset_dom');
			return;
		}
		this.set_update_timeout();
	}
	set_update_timeout() {
		this.next_timeout(this.update, 125, 'update', true);
	}
	update() {
		this.state.update();
		// spell:words timeplayed
		this.update_hours_played();
		this.update_timeout_element();
		this.update_ratio_element();
		this.update_ratio_change_element();
		this.next_update();
	}
	update_async() {
	}
	init() {
		this.next_timeout(this.init_impl, 200, 'init', true);
	}
	set_secondinterval() {
		let disabled = false;
		if(disabled)
			return;
		//spell:words secondinterval
		if(window.secondinterval !== void 0)
			clearInterval(window.secondinterval);
		let rate = 66 / 2000;
		let time_base = performance.now();
		let interval_id = setInterval(function() {
			let real_time = performance.now();
			let time_diff = real_time - time_base;
			time_base = real_time;
			let real_rate = time_diff / 2000;
			// we lost some time here, the diff was too large (got a 10 hours playtime from putting my pc to sleep)
			if(time_diff > 2000) {
				// assume a max of 2 seconds passed
				window.timeplayed++;
				return;
			}
			window.timeplayed += real_rate;
		}, 66);
		window.secondinterval = interval_id;
		this.root_node.append_child(new IntervalIdNodeRef(interval_id, function() {
			window.secondinterval = void 0;
		}));
	}
	set_timeplayed_update_interval() {
		this.root_node.append_raw(setInterval(function() {
			let doc = window.doc;
			let rounding = window.rounding;
			let totalAtome = window.totalAtome;
			let timeplayed = window.timeplayed;
			let calcPres = window.calcPres;
			doc.title = rounding(totalAtome, false, 1).toString() + " atoms";
			//spell:words atomsaccu presnbr
			let atomsaccu_e = doc.getElementById('atomsaccu');
			if(atomsaccu_e)
				atomsaccu_e.innerHTML = rounding(window.atomsaccu, false, 0);
			let timeplayed_e = doc.getElementById('timeplayed');
			if(timeplayed_e)
				timeplayed_e.innerHTML = (Math.round(timeplayed / 30) / 60).toFixed(2) + " hours";
			let presnbr_e = doc.getElementById('presnbr');
			if(presnbr_e)
				presnbr_e.innerHTML = "<br>" + (calcPres() * 100).toFixed(0) + " % APS boost";
		}, 2000), false);
	}
	replace_timeplayed_timer() {
		this.set_secondinterval();
		this.set_timeplayed_update_interval();
	}
	init_impl() {
		this.global_init();
		this.init_dom();
		this.state.init();
		this.next_update();
		this.main();
		this.original_map.set('lightreset', window.lightreset);
		window.lightreset = lightreset_inject;
		window.specialclick = specialclick_inject;
		if(window.secondinterval) {
			this.replace_timeplayed_timer();
		}
	}
	state_history_clear_for_reset() {
		this.state_history_arr = ["R"];
		localStorage.auto_buy_history_str = "R";
	}
	/**
	 * @param {string} value
	 */
	state_history_append(value, silent = false) {
		this.epoch_len++;
		if(silent)
			return;
		if(!value)
			throw new Error("Invalid state append requested");
		let last = this.state_history_arr.at(-1);
		this.state_history_arr.push(value);
		if(this.state.debug)
			console.log('history append', last, value);
		while(this.state_history_arr.length > 120)
			this.state_history_arr.shift();
		Promise.resolve().then(this.async_compress.bind(this));
	}
	/**
	 * @param {Event} _event
	 */
	history_element_click_handler(_event) {
		this.root_node.destroy();
		this.set_update_timeout();
		this.set_auto_buy_timeout();
		// we destroyed the node this was attached to,
		// replace it again (it was there, we destroyed it, now please put it back)
		this.set_timeplayed_update_interval();
	}
	set_auto_buy_timeout() {
		if(this.timeout_ms) {
			this.timeout_ms = ~~(this.timeout_ms * 0.9);
		} else {
			this.timeout_ms = 25;
		}
		this.start_main_async(true);
	}
	timeout_avg() {
		let first = this.timeout_arr[0];
		let min = first;
		let max = first;
		let total = 0;
		for(var i = 0; i < this.timeout_arr.length; i++) {
			let cur = this.timeout_arr[i];
			total += cur;
			if(cur > max) {
				max = cur;
			}
			if(cur < min) {
				min = cur;
			}
		};
		const avg = total / this.timeout_arr.length;
		return [min, avg, max];
	}
	/**
	 * @type {number[]}
	 */
	large_diff = [];
	calc_timeout_ms() {
		while(this.timeout_arr.length > 60)
			this.timeout_arr.shift();
		let max = 0;
		let total = 0;
		for(var i = 0; i < this.timeout_arr.length; i++) {
			total += this.timeout_arr[i];
			max = Math.max(this.timeout_arr[i], max);
		};
		const val = total / this.timeout_arr.length;
		let num = val; // max / val;
		this.last_value ??= num;
		let diff = this.last_value - num;
		this.last_value = num;
		this.large_diff.push(num);
		let sorted_diff_arr = this.large_diff.map(e => e - num).sort((a, b) => a - b);
		let diff_want_mul = 1;
		let diff_cur = diff;
		while(diff_cur > -1 && diff_cur < 1 && diff_want_mul < 1e18) {
			diff_cur *= 10;
			diff_want_mul *= 10;
		}
		diff_want_mul *= 1000;
		let zero_idx = sorted_diff_arr.indexOf(0);
		let zs = zero_idx - 8;
		let z_loss = 0;
		if(zs < 0) {
			z_loss = zs * -1;
			zs = 0;
		}
		let ez_log = sorted_diff_arr.map(e => {
			if(e === 0)
				return e;
			return this.round(e * diff_want_mul);
		});
		l_log_if(LOG_LEVEL_INFO, 'calc_timeout_ms sorted_diff index', zero_idx, 'diff is', this.round(diff * diff_want_mul) / diff_want_mul);
		l_log_if(LOG_LEVEL_INFO, 'calc_timeout_ms l_diff %o %o\n%o', ez_log.slice(0, 8), ez_log.slice(-8), ez_log.slice(zs, zero_idx + z_loss + 8));
		return this.round(val);
	}
	is_epoch_over() {
		let epoch_diff = Date.now() - this.epoch_start_time;
		return epoch_diff > 60 * 5 * 1000;
	}
	start_main_async(no_wait = false) {
		return this.with_async.do_start_main_async(no_wait).then(_e => {}, e => {
			console.log('err', e);
			console.log('canceled main_async');
		});
	}
	main() {
		console.log('start main_async');
		this.timeout_ms = this.calc_timeout_ms();
		this.start_main_async();
	}
	do_large_decrease() {
		this.do_timeout_dec([1.005], 60); // 60
	}
	do_normal_decrease() {
		this.do_timeout_dec([1.004], 80); // 80
	}
	do_rare_begin_change() {
		this.do_timeout_inc([1.008, 1.03], 10);
	}
	unit_upgradable_count = 0;
	unit_promote_start() {
		let totalAtome = window.totalAtome;
		this.timeout_ms = this.calc_timeout_ms();
		this.pre_total = totalAtome;
		this.do_unit_promote();
		let money_diff = this.pre_total - totalAtome;
		let loss_rate = money_diff / this.pre_total;
		if(this.pre_total != totalAtome) {
			this.unit_upgradable_count++;
		}
		if(this.pre_total != totalAtome && this.debug) {
			let log_args = [];
			let percent_change = (loss_rate * 100).toFixed(5);
			let money_str = totalAtome.toExponential(3);
			log_args.push(this.iter_count);
			log_args.push(percent_change);
			log_args.push(money_str);
			console.log(...log_args);
		}
		this.iter_count += 1;
		return loss_rate;
	}
	do_fast_unit_step_change() {
		this.do_timeout_dec([1.006], 10);
	}
	do_fast_unit_change() {
		this.do_timeout_dec([1.006], 10);
	}
	/**
	 * @param {number} pow_base
	 * @param {number} pow_num
	 * @param {number} div
	 */
	get_timeout_change(pow_base, pow_num, div) {
		if(!this.timeout_ms)
			throw throw_invalid_error();
		let pow_res = Math.pow(pow_base, pow_num);
		let res = this.timeout_ms * pow_res;
		return res / div;
	}
	/**
	 * @param {number} change
	 */
	update_timeout_inc(change) {
		if(window.__testing__) {
			return;
		}
		if(!this.timeout_ms)
			throw throw_invalid_error();
		let value = this.round(this.timeout_ms + change);
		l_log_if(LOG_LEVEL_INFO, 'inc', this.timeout_ms, value - this.timeout_ms);
		this.timeout_arr.push(value);
	}
	/**
	 * @param {number} change
	 */
	update_timeout_dec(change) {
		if(window.__testing__) {
			return;
		}
		if(!this.timeout_ms)
			throw throw_invalid_error();
		let value = this.round(this.timeout_ms - change);
		if(value < 25)
			value = 25;
		l_log_if(LOG_LEVEL_INFO, 'dec', this.timeout_ms, this.timeout_ms - value);
		this.timeout_arr.push(value);
	}
	/**
	 * @param {number} value
	 */
	round(value) {
		return ~~value;
	}
	/**
	 * @param {number[]} pow_terms
	 * @param {number} div
	 */
	do_timeout_dec(pow_terms, div) {
		let change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_timeout_dec(change);
	}
	/**
	 * @param {number[]} pow_terms
	 * @param {number} div
	 */
	do_timeout_inc(pow_terms, div) {
		let iter_term = Math.pow(pow_terms[1], this.iter_count);
		let change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_timeout_inc(change * iter_term);
	}
	/**
	 * @param {string} msg
	 * @param {Error} err
	 */
	next_timeout_async_err_log(msg, err) {
		/**@type {{stack:string}} */
		let stack_trace = {stack: "Error\n    at <anonymous>"};
		if(err.stack === void 0)
			Error.captureStackTrace(stack_trace);
		let err_stack_tmp = null;
		if(err.stack)
			err_stack_tmp = err.stack;
		else
			err_stack_tmp = stack_trace.stack;
		let err_stack = err_stack_tmp.split("\n").slice(1);
		/**
		 * @param {string} str
		 */
		function rm(str) {
			if(err_stack.length === 0)
				return false;
			if(err_stack[0].includes(str)) {
				err_stack = err_stack.slice(1);
				return true;
			}
			return false;
		}
		while(true) {
			if(rm("at AutoBuy.next_timeout_async"))
				continue;
			if(rm("at AutoBuy.large_decrease_async"))
				continue;
			if(rm("at AutoBuy.normal_decrease_async"))
				continue;
			if(rm("at AutoBuy.faster_timeout_async"))
				continue;
			if(rm("at AutoBuy.main_async"))
				continue;
			break;
		}
		if(err_stack.length > 0) {
			console.log("%s\n%s", msg, err_stack.map(e => {
				if(e.slice(0, 4) == '    ')
					e = e.slice(4);
				if(e.slice(0, 3) == 'at ')
					e = e.slice(3);
				return e;
			}).join("\n"));
		}
	}
	/**
	 * @param {number | undefined} timeout
	 * @param {string} char
	 */
	[labeled_sym("next_timeout_async")](timeout, char) {
		console.log('next_timeout_async', char, timeout);
		let err = new Error;
		this.next_timeout_async_err_log('next_timeout_async stk', err);
	}
	/**@type {number|undefined} */
	timeout_ms;
	/**
	 * @param {()=>void} trg_fn
	 * @param {number | undefined} timeout
	 * @param {string} char
	 */
	next_timeout(trg_fn, timeout, char, silent = false) {
		let node = new TimeoutNode(timeout);
		this.root_node.append_child(node);
		node.start(new TimeoutTarget(this, trg_fn));
		if(!silent) {
			this.timeout_ms = timeout;
			this.update_timeout_element();
		}
		this.state_history_append(char, silent);
	}
	do_unit_promote() {
		do_auto_unit_promote();
	}
	/**
	 * @param {{ done: any; cost: number; }} special_buyable
	 */
	is_special_done(special_buyable) {
		return !special_buyable.done && special_buyable.cost < window.totalAtome;
	}
	next_special() {
		return window.allspec.findIndex(this.is_special_done);
	}
	do_special() {
		let ret = false;
		for(let index = this.next_special(); ; index = this.next_special()) {
			if(index > -1) {
				window.specialclick(index);
				ret = true;
			} else
				break;
		}
		return ret;
	}
	maybe_run_reset() {
		if(!this.timeout_ms)
			return false;
		let count = 0;
		count += +(this.timeout_ms > 30 * 1000);
		count += +(this.state.ratio > 1);
		count += +this.is_epoch_over();
		count += +(this.state.locked_cycle_count < 100);
		switch(count) {
			case 0:
			case 1:
			case 2:
			case 3:
				break;
			default: console.log('maybe_run_reset count', count);
		}
		if(this.state.ratio > 1 && this.is_epoch_over() && this.state.locked_cycle_count < 100) {
			this.do_game_reset();
			return true;
		}
		return false;
	}
	do_game_reset() {
		if(!this.timeout_ms) {
			this.timeout_ms = 300;
		};
		this.next_timeout(this.game_reset_step_1, this.round(this.timeout_ms / 3), '1R');
		this.on_repeat_r();
	}
	do_audio_mute_toggle() {
		if(!AudioMuted) {
			window.mute();
		}
	}
	game_reset_step_1() {
		this.do_audio_mute_toggle();
		this.next_timeout(this.game_reset_step_2, 60 * 5 * 1000, '2R');
	}
	game_reset_step_2() {
		this.do_audio_mute_toggle();
		this.next_timeout(this.game_reset_finish, 60 * 5 * 1000, '3R');
	}
	game_reset_finish() {
		this.update_hours_played();
		let str = this.dom_map.get("time_played_str");
		if(typeof str == 'string') {
			this.dispatch_on_game_reset_finish(str);
		} else {
			this.dispatch_on_game_reset_finish("0.000");
		}
	}
	/**@arg {string} time_played */
	dispatch_on_game_reset_finish(time_played) {
		this.state.on_game_reset_finish(time_played);
		this.on_game_reset_finish(time_played);
	}
	/**@arg {string} time_played */
	on_game_reset_finish(time_played) {
		console.info('fire lightreset at %s', time_played);
		window.lightreset();
	}
	on_repeat_r() {
		this.next_timeout(this.on_repeat_r, 1 * 1000, 'r');
	}
}
