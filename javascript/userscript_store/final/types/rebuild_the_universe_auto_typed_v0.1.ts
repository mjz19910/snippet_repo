import {InstructionType} from "types/vm/instruction/mod";
import {IndexedFnBox} from "types/vm/box/IndexedFunctionBox";
import InstructionTypeArrayBox from "types/vm/box/InstructionTypeArrayBox";
import {StackVM} from "types/StackVM";
import {IBox} from "types/vm/box/IBox";
import GlobalThisBox from "types/vm/box/GlobalThisBox";
import ArrayBox from "types/vm/box/ArrayBox";
import {IndexBox} from "types/vm/index_access/IndexBox";
import {StackVMBox} from "types/vm/box/StackVMBox";
import WindowBox from "types/vm/box/WindowBox";
import {DocumentWriteList} from "./DocumentWriteList";
import {UniqueIdGenerator} from "./UniqueIdGenerator";
import {PromiseExecutorHandle} from "./PromiseExecutorHandle";
import {TimerApiInfo} from "./TimerApiInfo";
import {worker_code_function} from "./worker_code_function";
import {WorkerState} from "./WorkerState";
import {ApiMapData} from "./ApiMapData";
import {MapObject} from "./MapObject";
import {TimerState} from "./TimerState";
import {FirstStr} from "./FirstStr";
import {RemoveFirstStr} from "./RemoveFirstStr";
import {AnyOfStr} from "./AnyOfStr";
const defaultExport={};
export default defaultExport;
export type TimerTypeTag = 1 | 2;
export const TIMER_SINGLE = 1;
export const TIMER_REPEATING = 2;
export const TIMER_TAG_COUNT = 3;
const AUDIO_ELEMENT_VOLUME = 0.58;
const cint_arr: any[] = [];
export function timer_nop() {}
type AnyOfArr<T extends any[]> = T extends [infer U, ...infer X] ? X extends [] ? U : U | AnyOfArr<X> : never;

type AnyOf<T> = T extends any[] ? AnyOfArr<T> : T extends string ? AnyOfStr<T> : never;

type FirstArr<T extends any[]> = T extends [infer U, ...any[]] ? U : [];
type RemoveFirst<T extends any[]> = T extends [any, ...infer U] ? U : [];
type ReverseStr<U extends string> = U extends '' ? '' : `${ReverseStr<RemoveFirstStr<U>>}${FirstStr<U>}`;
type ReverseArr<U extends any[]> = U extends [] ? [] : [...ReverseArr<RemoveFirst<U>>, FirstArr<U>];
type Reverse<T> = T extends any[] ? ReverseArr<T> : T extends string ? ReverseStr<T> : never;

export class Timer {
	id_generator;
	m_remote_id_to_main_state_map;
	m_api_map: MapObject<ApiMapData>;
	weak_worker_state: WeakRef<WorkerState> | null;
	m_api_info: Partial<TimerApiInfo>;
	base_id: number;
	constructor(api_info: Partial<TimerApiInfo>) {
		this.m_remote_id_to_main_state_map = new Map;
		this.weak_worker_state = null;
		this.m_api_map = new Map<keyof ApiMapData, ApiMapData[keyof ApiMapData]>() as MapObject<ApiMapData>;
		this.m_api_info = api_info;
		if(api_info.set_single)
			this.m_api_map.set(api_info.set_single, window[api_info.set_single]);
		if(api_info.set_repeating) this.m_api_map.set(api_info.set_repeating, window[api_info.set_repeating]);
		if(api_info.clear_single) this.m_api_map.set(api_info.clear_single, window[api_info.clear_single]);
		if(api_info.clear_repeating) this.m_api_map.set(api_info.clear_repeating, window[api_info.clear_repeating]);
		if(api_info.set_single && api_info.clear_single) {
			this.base_id = window[api_info.set_single](timer_nop);
			window[api_info.clear_single](this.base_id);
		} else if(api_info.set_repeating && api_info.clear_repeating) {
			this.base_id = window[api_info.set_repeating](timer_nop);
			window[api_info.clear_repeating](this.base_id);
		} else {
			console.info('Timer ids not linked with underlying api');
			this.base_id = 1;
		}
		this.id_generator = new UniqueIdGenerator(this.base_id);
	}
	set_worker_state(worker_state_value: WorkerState) {
		this.weak_worker_state = new WeakRef(worker_state_value);
	}
	// If you cause any side effects, please
	// wrap this call in try{}finally{} and
	// revert all side effects...
	verify_timer_type_tag(type_tag: TimerTypeTag) {
		if(!this.validate_timer_type_tag(type_tag)) {
			throw new Error("Verify failed in Timer.verify_timer_type_tag");
		}
	}
	verify_timer_state(main_state: TimerState, remote_id: number) {
		if(!this.validate_timer_state(main_state)) {
			if(!this.weak_worker_state) throw new Error("Invalid state");
			let worker_state = this.weak_worker_state.deref();
			if(!worker_state) throw new Error("Invalid state");
			if(this.m_api_info.clear_any_msg_id) {
				worker_state.postMessage({
					t: this.m_api_info.clear_any_msg_id,
					v: remote_id
				});
			} else {
				throw new Error("Verify failed in Timer.verify_timer_state");
			}
		}
	}
	validate_timer_type_tag(type_tag: TimerTypeTag) {
		if(type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT) {
			console.assert(false, "Assertion failure in Timer.validate_timer_type_tag: type_tag=%o is out of range");
			console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
			return false;
		}
		return true;
	}
	validate_timer_state(main_state: {type: TimerTypeTag}) {
		return this.validate_timer_type_tag(main_state.type);
	}
	fire(type: TimerTypeTag, remote_id: any) {
		let main_state = this.get_main_state_by_id(remote_id);
		if(!main_state) {
			this.force_clear(type, remote_id);
			return;
		}
		if(main_state.active) {
			main_state.target_function.apply(null, main_state.target_arguments);
		}
		if(type === TIMER_SINGLE) {
			main_state.active = false;
			this.clear(type, remote_id);
		}
	}
	set(type: TimerTypeTag, target_function: any, delay: number, target_arguments: any[]) {
		let remote_id = this.id_generator.next();
		let is_repeating = false;
		this.verify_timer_type_tag(type);
		if(type === TIMER_REPEATING) {
			is_repeating = true;
		}
		if(delay < 0) delay = 0;
		let main_state = {
			active: true,
			type: type,
			repeat: is_repeating,
			target_function,
			target_arguments,
			delay
		};
		this.store_main_state_by_id(remote_id, main_state);
		if(!this.m_api_info.set_single_msg_id) throw new Error("Invalid state");
		if(!this.m_api_info.set_repeating_msg_id) throw new Error("Invalid state");
		if(!this.weak_worker_state) throw new Error("Invalid state");
		let worker_state = this.weak_worker_state.deref();
		if(!worker_state) throw new Error("Invalid state");
		let types: [0, 203, 204] = [0, 203, 204];
		let do_set_message_id: AnyOfArr<typeof types> = 0;
		if(type === TIMER_SINGLE) do_set_message_id = this.m_api_info.set_single_msg_id;
		if(type === TIMER_REPEATING) do_set_message_id = this.m_api_info.set_repeating_msg_id;
		if(do_set_message_id === 0) throw new Error("Invalid state");
		worker_state.postMessage({
			t: do_set_message_id,
			v: {
				t: remote_id,
				v: delay
			}
		});
		if(type === TIMER_REPEATING) {
			worker_state.postMessage({
				t: this.m_api_info.set_repeating_msg_id,
				v: {
					t: remote_id,
					v: delay
				}
			});
		}

		return remote_id;
	}
	is_main_state_stored_by_id(remote_id: any) {
		return this.m_remote_id_to_main_state_map.has(remote_id);
	}
	get_main_state_by_id(remote_id: number) {
		let main_state = this.m_remote_id_to_main_state_map.get(remote_id);
		if(!main_state) return null;
		this.verify_timer_state(main_state, remote_id);
		return main_state;
	}
	store_main_state_by_id(remote_id: number, main_state: {active: boolean; type: any; repeat: boolean; target_function: any; target_arguments: any; delay: any;}) {
		this.m_remote_id_to_main_state_map.set(remote_id, main_state);
	}
	delete_main_state_by_id(remote_id: any) {
		this.m_remote_id_to_main_state_map.delete(remote_id);
	}
	main_state_entries() {
		return this.m_remote_id_to_main_state_map.entries();
	}
	on_result(timer_result_msg: {t: 205 | 206; v: number;}) {
		let timer_result_msg_id = timer_result_msg.t;
		switch(timer_result_msg_id) {
			case 205: {
				let remote_id = timer_result_msg.v;
				this.delete_main_state_by_id(remote_id);
				break;
			}
			case 206: {
				let remote_id = timer_result_msg.v;
				this.delete_main_state_by_id(remote_id);
				break;
			}
			default:
				console.log(timer_result_msg);
				debugger;
		}
	}
	force_clear(type: TimerTypeTag, remote_id: any) {
		this.verify_timer_type_tag(type);
		if(!this.weak_worker_state) throw new Error("Invalid state");
		let worker_state = this.weak_worker_state.deref();
		let main_state = this.get_main_state_by_id(remote_id);
		if(main_state.active) {
			return this.clear(type, remote_id);
		}
		// we have to trust the user, go ahead and send the message
		// anyway (this can technically send structured cloneable objects)
		if(!worker_state) throw new Error("Invalid state");
		if(!this.m_api_info.clear_single_msg_id) throw new Error("Invalid state");
		if(!this.m_api_info.clear_repeating_msg_id) throw new Error("Invalid state");
		if(type === TIMER_SINGLE) {
			worker_state.postMessage({
				t: this.m_api_info.clear_single_msg_id,
				v: remote_id
			});
		} else if(type === TIMER_REPEATING) {
			worker_state.postMessage({
				t: this.m_api_info.clear_repeating_msg_id,
				v: remote_id
			});
		}
	}
	clear(type: TimerTypeTag, remote_id: number) {
		this.verify_timer_type_tag(type);
		let main_state = this.get_main_state_by_id(remote_id);
		if(!main_state) return;
		if(!this.weak_worker_state) throw new Error("Invalid state");
		if(!this.m_api_info.clear_single_msg_id) throw new Error("Invalid state");
		if(!this.m_api_info.clear_repeating_msg_id) throw new Error("Invalid state");
		if(main_state.active) {
			let worker_state = this.weak_worker_state.deref();
			if(!worker_state) throw new Error("Invalid state");
			if(main_state.type === TIMER_SINGLE) {
				worker_state.postMessage({
					t: this.m_api_info.clear_single_msg_id,
					v: remote_id
				});
			} else if(main_state.type === TIMER_REPEATING) {
				worker_state.postMessage({
					t: this.m_api_info.clear_repeating_msg_id,
					v: remote_id
				});
			}
			main_state.active = false;
		}
	}
	destroy() {
		let api_info = this.m_api_info;
		let api_map = this.m_api_map;
		if(api_info.set_single) window[api_info.set_single] = api_map.get(api_info.set_single);
		if(api_info.set_repeating) window[api_info.set_repeating] = api_map.get(api_info.set_repeating);
		if(api_info.clear_single) window[api_info.clear_single] = api_map.get(api_info.clear_single);
		if(api_info.clear_repeating) window[api_info.clear_repeating] = api_map.get(api_info.clear_repeating);
		for(var timer_map_entry of this.main_state_entries()) {
			const [, main_state] = timer_map_entry;
			if(main_state.type === TIMER_SINGLE) {
				// if the timer might get reset when calling the function while
				// the timer functions are reset to the underlying api
				main_state.target_function.apply(null, main_state.target_arguments);
			}
		}
		this.m_api_map.clear();
	}
}
class VerifyError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "VerifyError";
	}
}
function VERIFY(assert_result: boolean, assert_message: string) {
	if(!assert_result) {
		throw new VerifyError(assert_message);
	}
}
function move_timers_to_worker_promise_executor(
	executor_accept: (value: WorkerState | null) => void,
	executor_reject: (reason?: any) => void
) {
	if(globalThis.hasOwnProperty('remote_worker_state')) {
		postMessage({
			t: 300
		});
		executor_accept(null);
		return;
	}
	if(WorkerState.maybe_delete_old_global_state()) return null;
	worker_code_function(function(verify_obj) {
		VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_SINGLE constant matches");
		VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_REPEATING constant matches");
		VERIFY(verify_obj.TIMER_TAG_COUNT === TIMER_TAG_COUNT, "TIMER_TAG_COUNT constant matches");
		VERIFY(Object.keys(verify_obj).length === 3, "keys(verify_obj).length is expected value");
		return;
	});
	const worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()", "\n//# sourceURL=$__.0"]);
	let timer = new Timer({
		set_single_msg_id: 203,
		set_repeating_msg_id: 204,
		clear_single_msg_id: 205,
		clear_repeating_msg_id: 206,
		set_single: "setTimeout",
		clear_single: "clearTimeout",
		set_repeating: "setInterval",
		clear_repeating: "clearInterval"
	});
	let executor_handle = new PromiseExecutorHandle<WorkerState>(executor_accept, executor_reject);
	const worker_state = new WorkerState(worker_code_blob, timer, executor_handle);
	const weak_worker_state = new WeakRef(worker_state);
	const setTimeout_global = setTimeout;
	/**@type {typeof setTimeout} */
	function remoteSetTimeout(handler: TimerHandler, timeout = 0, ...target_arguments: any[]) {
		if(!worker_state) {
			window.setTimeout = setTimeout_global;
			console.log('lost worker_state in timer');
			return setTimeout_global(handler, timeout, ...target_arguments);
		}
		return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_arguments);
	}
	const clearTimeout_global = clearTimeout;
	/**@type {typeof clearTimeout} */
	function remoteClearTimeout(id?: number | undefined): void {
		if(!worker_state) {
			window.clearTimeout = clearTimeout_global;
			console.log('lost worker_state in timer');
			return clearTimeout_global(id);
		}
		if(id !== void 0) worker_state.timer.clear(TIMER_SINGLE, id);
	}
	const setInterval_global = setInterval;
	/**@type {typeof setInterval} */
	function remoteSetInterval(handler: TimerHandler, timeout = 0, ...target_arguments: any[]) {
		if(!worker_state) {
			window.setInterval = setInterval_global;
			console.log('lost worker_state in timer');
			return setInterval_global(handler, timeout, ...target_arguments);
		}
		return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_arguments);
	}
	const clearInterval_global = clearInterval;
	/**@type {typeof clearInterval} */
	function remoteClearInterval(id?: number) {
		if(!worker_state) {
			window.clearInterval = clearInterval_global;
			console.log('lost worker_state in timer');
			return clearInterval_global(id);
		}
		if(id !== void 0) worker_state.timer.clear(TIMER_REPEATING, id);
	}
	window.setTimeout = remoteSetTimeout;
	window.setInterval = remoteSetInterval;
	window.clearTimeout = remoteClearTimeout;
	window.clearInterval = remoteClearInterval;
	return {
		get() {
			return weak_worker_state.deref();
		}
	};
}
function remove_bad_dom_script_element() {
	function remove_element_callback(e: {src: string | string[] | URL; remove: () => void;}) {
		if(!e.src) return;
		if(e.src instanceof URL) {
			if(e.src.origin != location.origin) return;
			if(e.src.pathname.indexOf("ads") > -1 || e.src.pathname.indexOf("track") > -1) {
				e.remove();
			}
			return;
		}
		if(typeof e.src === 'string') {
			if(new URL(e.src).origin != location.origin) return;
			if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1) {
				e.remove();
			}
		}
	}
	Array.prototype.forEach.call(document.querySelectorAll("script"), remove_element_callback);
};

class EventHandlerDispatch<T, U> {
	target_obj;
	target_fn;
	constructor(target_obj: U, target_fn: (_event: T) => void) {
		this.target_obj = target_obj;
		this.target_fn = target_fn;
	}
	handleEvent(event: T) {
		this.target_fn.call(this.target_obj, event);
	}
}
class SimpleStackVMParser {
	static match_regex = /(.+?)(;|$)/gm;
	static parse_int_arg(cur: string[] | number[], arg_loc: number) {
		let cur_item = cur[arg_loc];
		if(typeof cur_item == 'string') {
			let arg: string = cur_item;
			if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
				let str_int: string = arg.slice(4, -1);
				cur[arg_loc] = parseInt(str_int, 10);
			}
		}
	}
	static parse_string_with_format_ident(str: string | string[], format_list: any[]) {
		let format_index = str.indexOf('%');
		let format_type = str[format_index + 1];
		switch(format_type) {
			case 'o':
				return format_list.shift();
			default:
				console.log("%s", 'unsupported format spec %' + format_type);
		}
	}
	static parse_current_instruction(cur: any[], format_list: any) {
		let arg_loc = 1;
		let arg = cur[arg_loc];
		while(arg) {
			if(arg.slice(0, 3) === 'int') this.parse_int_arg(cur, arg_loc);
			if(arg.includes('%')) {
				let res = this.parse_string_with_format_ident(arg, format_list);
				cur[arg_loc] = res;
			}
			arg_loc++;
			arg = cur[arg_loc]
		}
	}
	static raw_parse_handle_regexp_match(match_parts: string[]) {
		if(!match_parts) return;
		let str_data = match_parts[1].trim();
		if(str_data.startsWith("//")) return;
		while(str_data.startsWith("/*")) {
			let com_end = str_data.indexOf("*/");
			str_data = str_data.slice(com_end + 2).trim();
		}
		if(!str_data) return;
		return str_data.split(",");

	}
	static parse_string_into_raw_instruction_stream(string: string) {
		const parser_max_match_iter = 300;
		let parts, arr = [], i = 0;
		do {
			parts = this.match_regex.exec(string);
			if(!parts) break;
			let res = this.raw_parse_handle_regexp_match(parts);
			if(res) arr.push(res);
		} while(i++ < parser_max_match_iter);
		if(parts) {
			console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);
		}
		return arr;
	}
	static parse_instruction_stream_from_string(string: string, format_list: ((err: any) => void)[]): InstructionType[] {
		let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
		for(let i = 0;i < raw_instructions.length;i++) {
			let cur = raw_instructions[i];
			this.parse_current_instruction(cur, format_list);
		}
		let instructions = this.verify_raw_instructions(raw_instructions);
		return instructions;
	}
	static cook_instruction(instruction: string[], left: [number]): InstructionType {
		const [m_opcode, ...m_parameters] = instruction;
		switch(m_opcode) {
			// variable argument count
			case 'push':
				left[0] = 0;
				return [m_opcode, ...m_parameters];
			// 2 arguments
			case 'call': {
				if(typeof m_parameters[0] === 'number') {
					left[0] -= 2;
					return [m_opcode, m_parameters[0]];
				} else {
					throw new Error("TypeError: Call argument is not parameter count");
				}
			}
			// one argument
			case 'drop':
			case 'get':
			case 'return':
			case 'halt':
			case 'push_args':
			case 'this':
			case 'global':
			case 'breakpoint':
				left[0]--;
				return [m_opcode];
			default:
				console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_parameters);
				throw new Error("Unexpected opcode when cooking instructions");
		}
	}
	static verify_raw_instructions(raw_instructions: string[][]): InstructionType[] {
		const instructions: InstructionType[] = [];
		for(let i = 0;i < raw_instructions.length;i++) {
			const instruction = raw_instructions[i];
			const left: [number] = [instruction.length];
			const cooked_instruction = this.cook_instruction(instruction, left);
			instructions.push(cooked_instruction);
			if(left[0] > 0) {
				throw new Error("Typechecking failure, data left when processing raw instruction stream");
			}
		}
		return instructions;
	}
}
class SimpleStackVM implements StackVM {
	instructions: InstructionType[];
	stack: IBox[];
	instruction_pointer: number;
	return_value: IBox;
	running: boolean;
	constructor(instructions: InstructionType[]) {
		this.instructions = instructions;
		this.stack = [];
		this.instruction_pointer = 0;
		this.return_value = void 0;
		this.running = false;
	}
	reset() {
		this.stack.length = 0;
		this.instruction_pointer = 0;
		this.return_value = void 0;
		this.running = false;
	}
	push(value: IBox) {
		this.stack.push(value);
	}
	pop() {
		return this.stack.pop();
	}
	pop_arg_count(arg_count:number):IBox[] {
		let ret=[];
		for(let i = 0; i < arg_count; i++) {
			if(this.stack.length <= 0){
				throw new Error('stack underflow in pop_arg_count');
			}
			ret.unshift(this.pop());
		}
		return ret;
	}
	run(...run_arguments: IBox[]) {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let cur_instruction = this.instructions[this.instruction_pointer];
			let [cur_opcode, ...instruction_parameters] = cur_instruction;
			switch(cur_opcode) {
				case 'push'/*Stack*/: {
					for(let i = 1;i < cur_instruction.length;i++) {
						let item = cur_instruction[i];
						if(item instanceof Array){
							this.push(new InstructionTypeArrayBox(item));
						} else {
							this.push(item);
						}
					}
					break;
				}
				case 'drop'/*Stack*/: {
					let drop = this.pop();
					void drop;
					break;
				}
				case 'get'/*Object*/: {
					let name = this.pop();
					if(!name) throw new Error("Invalid");
					let obj = this.pop();
					if(!obj) throw new Error("Invalid");
					if(obj instanceof IndexBox && typeof name === 'string') {
						this.push(obj.value[name]);
					}
					break;
				}
				case 'call'/*Call*/: {
					let number_of_arguments = instruction_parameters[0];
					if(number_of_arguments === void 0) {
						throw new Error("Invalid call operand");
					}
					if(typeof number_of_arguments != 'number') throw new Error("Invalid");
					let arg_arr = [];
					for(let i = 0;i < number_of_arguments;i++) {
						arg_arr.unshift(this.pop());
					}
					let name_to_call = this.pop();
					let target = this.pop();
					if(!target) throw "Bad";
					if(!name_to_call) throw "Bad";
					if(target instanceof IndexedFnBox && typeof name_to_call === 'string') {
						let ret = target.value[name_to_call](...arg_arr);
						switch(typeof ret){
							case 'function':
							case 'object':
								console.log('convert', ret);
								throw new Error("Conversion needed");
							case 'string':case'number':case 'bigint':case 'boolean':case 'symbol':
								this.push(ret);
								break;
							case 'undefined':
								this.push(ret);
								break;
							default:
								console.warn("return value unable to be pushed", ret);
								throw new Error("Can't box return value");
						}
					}
					break;
				}
				case 'return'/*Call*/:this.return_value = this.pop();break;
				case 'halt'/*Running*/:this.running = false;break;
				case 'push_args'/*Special*/:this.push(new ArrayBox(run_arguments));break;
				case 'this'/*Special*/: this.push(new StackVMBox(this));break;
				case 'global'/*Special*/: {
					if(window) this.push(new WindowBox(window));
					else this.push(new GlobalThisBox(globalThis));
					break;
				}
				case 'breakpoint'/*Debug*/: {
					debugger;
					break;
				}
				default/*Debug*/: {
					console.log('unk opcode', cur_opcode);
					throw new Error("halt");
				}
			}
			this.instruction_pointer++;
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
class EventHandlerVMDispatch<T> extends SimpleStackVM {
	target_obj: T;
	constructor(instructions: InstructionType[], target_obj: T) {
		super(instructions);
		this.target_obj = target_obj;
	}
	handleEvent(event: any) {
		this.reset();
		this.run(event);
	}
}
class CompressionStatsCalculator {
	hit_counts: any[];
	cache: any[];
	constructor() {
		this.hit_counts = [];
		this.cache = [];
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	add_hit(index: number) {
		if(!this.map_values()[index]) {
			this.map_values()[index] = 1;
		} else this.map_values()[index]++;
	}
	add_item(key: any) {
		let index = this.map_keys().indexOf(key)
		if(index == -1) index = this.map_keys().push(key);
		else this.add_hit(index);
	}
	reset() {
		this.map_keys().length = 0;
		this.map_values().length = 0;
	}
	calc_compression_stats(arr: any[], win_size: number) {
		this.reset();
		for(let i = 0;i < arr.length;i++) {
			if(i + win_size < arr.length) {
				this.add_item(arr.slice(i, i + win_size).join(","));
			}
		}
		return to_tuple_arr(this.map_keys(), this.map_values()).filter((e: any[]) => e[1] !== void 0);
	}
	calc_for_stats_window_size(stats_arr: any[], arr: any, win_size: number) {
		stats_arr[win_size - 1] = this.calc_compression_stats(arr, win_size);
	}
	calc_for_stats_index(stats_arr: any[], arr: any, index: number) {
		stats_arr[index] = this.calc_compression_stats(arr, index + 1);
	}
}
class BaseCompression {
	did_compress(src: string | any[], dst: string | any[]) {
		return dst.length < src.length;
	}
	did_decompress(src: string | any[], dst: string | any[]) {
		return dst.length > src.length;
	}
	compress_result(src: any, dst: any[]) {
		if(this.did_compress(src, dst)) return [true, dst];
		return [false, src];
	}
	decompress_result(src: any, dst: any[]) {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src, dst)) return [true, dst];
		return [false, dst];
	}
}
class MulCompression extends BaseCompression {
	stats_calculator: CompressionStatsCalculator;
	compression_stats: any[];
	constructor() {
		super();
		this.stats_calculator = new CompressionStatsCalculator;
		this.compression_stats = [];
	}
	try_compress(arr: string | any[]) {
		let ret = [];
		for(let i = 0;i < arr.length;i++) {
			let item = arr[i];
			if(i + 1 < arr.length) {
				if(item === arr[i + 1]) {
					let off = 1;
					while(item === arr[i + off]) {
						off++;
					}
					if(off > 1) {
						ret.push(`${item}${off}`);
						i += off - 1;
					} else {
						ret.push(item);
					}
				} else {
					ret.push(item);
				}
			} else {
				ret.push(item);
			}
		}
		return this.compress_result(arr, ret);
	}
	try_decompress(arr: string | any[]) {
		let ret = [];
		for(let i = 0;i < arr.length;i++) {
			let item = arr[i];
			if(i + 1 < arr.length) {
				let [item_type, num_data] = [item[0], item.slice(1)];
				let parsed = parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j = 0;j < parsed;j++)ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr, ret);
	}
	compress_array(arr: any) {
		let success, res;
		// await async_semaphore.inc(1);
		[success, res] = this.try_decompress(arr);
		if(success) arr = res;
		for(let i = 0;i < 4;i++) {
			this.stats_calculator.calc_for_stats_index(this.compression_stats, arr, i);
			let ls = this.compression_stats[i];
			if(ls.length > 0) {
				continue;
			}
			break;
		}
		// await async_semaphore.dec(1);
		[success, res] = this.try_compress(arr);
		if(success) return res;
		return arr;
	}
}
function calc_ratio(arr: string | any[]) {
	let ratio_acc = 0;
	for(let i = 0;i < arr.length;i++)ratio_acc += arr[i];
	// don't divide by zero
	if(ratio_acc === 0) return 0;
	return ratio_acc / arr.length;
}
console.assert(calc_ratio([0, 0]) === 0, "calc ratio of array full of zeros does not divide by zero");
class AverageRatio {
	arr;
	history: any[];
	count;
	len;
	history_len;
	weight;
	human_duration;
	constructor(max_len: number, max_history_len: number, weight: number, human_duration: string, arr: any[] = []) {
		this.arr = arr;
		this.history = [];
		this.count = 0;
		this.len = max_len;
		this.history_len = max_history_len;
		this.weight = weight;
		this.human_duration = human_duration;
	}
	add(value: number, from_prev: boolean, debug = false) {
		if(from_prev) {
			if(debug) console.log("ratio", this.human_duration, (value * 100).toFixed(5));
			this.arr.unshift(value);
			this.history.unshift(value);
			if(this.history.length > this.history_len) this.history.pop();
			if(this.arr.length > this.len) this.arr.pop();
			this.count++;
			if(this.count > this.len) {
				this.count = 0;
				return true;
			}
		} else {
			this.arr[0] = value;
		}
		return false;
	}
	can_average() {
		return this.arr.length > 1;
	}
	get_average() {
		return calc_ratio(this.arr);
	}
}
class AsyncDelayNode<T, C extends (this: T) => void> {
	root;
	cint: number;
	target_obj: T;
	target_callback: C;
	label: string;
	timeout: number;
	constructor(root: AsyncNodeRoot, target_obj: T, target_callback: C, label: string) {
		this.root = root;
		this.cint = -1;
		this.target_obj = target_obj;
		this.target_callback = target_callback;
		this.label = label;
		this.timeout = 0;
	}
	start() {
		this.root.on_child_start(this);
		this.cint = setTimeout(this.run, this.timeout, this);
	}
	run(): void {
		this.root.on_child_run(this);
		this.target_callback.call(this.target_obj);
	}
}
class AsyncNodeRoot {
	children: any[];
	constructor() {
		this.children = [];
	}
	on_child_start(record: any) {
		this.children.push(record);
	}
	on_child_run(record: any) {
		let index = this.children.indexOf(record);
		this.children.splice(index, 1);
	}
}
class AverageRatioRoot {
	map: Map<string, AverageRatio>;
	ordered_keys: string[];
	constructor() {
		this.map = new Map;
		this.ordered_keys = [];
	}
	set_ordered_keys(ordered_keys: string[]) {
		this.ordered_keys = ordered_keys;
	}
	can_average(key: string) {
		let ratio_calc = this.map.get(key);
		if(!ratio_calc) throw new Error("Missing AverageRatio");
		return ratio_calc.can_average();
	}
	get_average(key: string) {
		let ratio_calc = this.map.get(key);
		if(!ratio_calc) throw new Error("Missing AverageRatio");
		return ratio_calc.get_average();
	}
	push_ratio([key, ratio_obj]: [string, AverageRatio]) {
		this.ordered_keys.push(key);
		this.map.set(key, ratio_obj);
	}
	push(value: any) {
		let cur = this.map.get(this.ordered_keys[0]);
		if(!cur) throw new Error("Missing AverageRatio");
		let res = cur.add(value, true, false);
		for(let i = 1;i < this.ordered_keys.length;i++) {
			let debug = false;
			let key = this.ordered_keys[i];
			cur = this.map.get(key);
			if(!cur) throw new Error("Missing AverageRatio");
			let prev = this.map.get(this.ordered_keys[i - 1]);
			if(key === '5min') debug = true;
			if(!prev) throw new Error("Missing AverageRatio");
			res = cur.add(prev.get_average(), res, debug);
		}
	}
}
export class AutoBuyState {
	debug
	arr: number[]
	ratio
	compressor_stats: any[]
	arr_max_len
	val
	ratio_mode
	locked_cycles
	root_node: AsyncNodeRoot;
	is_init_complete
	constructor(root: AsyncNodeRoot) {
		this.root_node = root;
		this.debug = false;
		this.arr = [];
		this.ratio = 0;
		this.compressor_stats = [];
		this.arr_max_len = 5 * 60;
		this.val = 1;
		this.ratio_mode = 0;
		this.locked_cycles = 0;
		this.is_init_complete = false;
		this.avg = new AverageRatioRoot;
		this.prev_atomepersecond = 0;
		this.ratio_mult = 0;
		this.div = 0;
	}
	avg: AverageRatioRoot;
	prev_atomepersecond: number;
	init(): void {
		if(window.atomepersecond === 0) {
			new AsyncDelayNode(this.root_node, this, this.init, 'not ready AutoBuyState.update').start();
			return;
		}
		this.val = window.totalAtome / window.atomepersecond;
		let rep_val = this.val / (100 * 4 * window.prestige);
		if(Number.isFinite(rep_val)) {
			for(let i = 0;i < 8;i++) {
				this.arr.push(rep_val * .75);
			}
		}
		this.prev_atomepersecond = window.atomepersecond;
		this.avg.push_ratio(['10sec', new AverageRatio(80, 80 * 6, .00, "10 seconds", [1])]);
		this.avg.push_ratio(['1min', new AverageRatio(6, 6 * 5 * 6, .65, "1 minute", [1])]);
		this.avg.push_ratio(['5min', new AverageRatio(5, 5 * 6 * 6, .15, "5 minutes", [1])]);
		this.avg.push_ratio(['30min', new AverageRatio(6, 6 * 6 * 4, .15, "30 minutes", [1])]);
		this.avg.push_ratio(['3hour', new AverageRatio(6, 6 * 4, .05, "3 hours", [1])]);
		this.is_init_complete = true;
	}
	calc_ratio() {
		if(this.avg.can_average('30min')) return this.avg.get_average('30min');
		if(this.avg.can_average('5min')) return this.avg.get_average('5min');
		if(this.avg.can_average('1min')) return this.avg.get_average('1min');
		if(this.avg.can_average('10sec')) return this.avg.get_average('10sec');
		return 0;
	}
	append_value(value: number) {
		if(!Number.isFinite(value)) {
			console.assert(false, 'value is not finite');
			debugger;
		}
		this.arr.unshift(value);
		this.avg.push(value);
		while(this.arr.length > this.arr_max_len) {
			this.arr.pop();
		}
		let new_ratio = this.calc_ratio();
		if(!Number.isFinite(new_ratio)) {
			console.assert(false, 'ratio result is not finite');
			debugger;
		}
		if(new_ratio) this.ratio = new_ratio;
	}
	update_ratio_mode() {
		switch(this.ratio_mode) {
			case 0:
				if(this.ratio > .4) {
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			case 1:
				if(this.ratio < .35) {
					this.ratio_mode--;
					this.locked_cycles = 80 * 3;
				}
				if(this.ratio > .60) {
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			case 2:
				if(this.ratio < .45) {
					this.ratio_mode--;
					this.locked_cycles = 80 * 3;
				}
				if(this.ratio > .85) {
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			case 3:
			default: {
				if(this.ratio < .9) {
					this.ratio_mode--;
					this.locked_cycles = 80 * 3;
				}
				if(this.ratio > 1.5) {
					let offset = this.ratio_mode - 3;
					console.log(offset);
					if(this.ratio_mode > 3) break;
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			}
		}
	}
	get_mul_modifier() {
		switch(this.ratio_mode) {
			case 0: return 8;
			case 1: return 4;
			case 2: return 2;
			case 3: return 1;
			default: {
				// 60*10*8/0.0002 ~= 1;
				return 0.05;
			}
		}
	}
	get_near_val() {
		let log_val = this.avg.get_average('5min');
		let log_mul_count = 0;
		if(log_val < 0.01 || log_val > 1) {
			while(log_val < 0.1) {
				log_val *= 10;
				log_mul_count--;
			}
			while(log_val > 1) {
				log_val /= 10;
				log_mul_count++;
			}
		}
		return [log_val, log_mul_count];
	}
	cycle_log() {
		let [num, exponent] = this.get_near_val();
		console.log('ratio cycle lock %se%o %s%o %s%o', (~~(num * 1000)) / 1000, exponent, 'mode=', this.ratio_mode, 'cc=', this.locked_cycles);
	}
	ratio_mult: number;
	div: number;
	update() {
		this.ratio_mult = window.prestige;
		this.div = 60 * this.ratio_mult * 8;
		if(window.atomepersecond === 0) {
			new AsyncDelayNode(this.root_node, this, this.update, 'not ready AutoBuyState.update').start();
			return;
		}
		this.val = window.totalAtome / window.atomepersecond / this.div;
		if(!Number.isFinite(this.val)) {
			console.log('fail', this.div, window.atomepersecond, window.totalAtome);
			new AsyncDelayNode(this.root_node, this, this.update, 'not ready AutoBuyState.update').start();
			return;
		}
		this.val *= this.get_mul_modifier();
		this.append_value(this.val);
		if(this.locked_cycles > 0) {
			this.locked_cycles--;
		} else {
			this.update_ratio_mode();
			if(this.locked_cycles > 0) this.cycle_log();
		}
	}
	reset() {
		this.ratio *= 0.75;
		for(var i = 0;i < this.arr.length;i++) {
			this.arr[i] *= 0.75;
		}
	}
}
export class AutoBuy {
	delay: number;
	extra: number;
	iter_count: number;
	epoch_len: number;
	background_audio: HTMLAudioElement | null;
	state: AutoBuyState;
	cint_arr: any[];
	skip_save: boolean;
	state_history_arr: string[];
	compressor: MulCompression;
	epoch_start_time: number;
	root_node: AsyncNodeRoot;
	original_map: any;
	constructor() {
		this.root_node = new AsyncNodeRoot;
		this.delay = 0;
		this.extra = 0;
		this.iter_count = 0;
		this.epoch_len = 0;
		this.background_audio = null;
		this.state = new AutoBuyState(this.root_node);
		this.cint_arr = [];
		this.skip_save = false;
		this.state_history_arr = [];
		this.compressor = new MulCompression;
		this.load_state_history_arr(["S"]);
		this.epoch_start_time = Date.now();
		this.delay_arr = [];
		this.display_style_sheet = new CSSStyleSheet;
		this.history_element = document.createElement("div");
		this.delay_element = document.createElement("div");
		this.hours_played_element = document.createElement("div");
		this.percent_ratio_element = document.createElement("div");
		this.percent_ratio_change_element = document.createElement("div");
		this.state_log_element = document.createElement("div");
		this.state_history_arr_max_len = 80;
	}
	pre_init() {
		// find elements
		// find background_audio by id
		this.background_audio = document.querySelector("#background_audio");
		if(!this.background_audio) throw new Error("No background audio");
		// change the audio element's volume, and remove
		// the event listener that will change the volume
		this.background_audio.onloadeddata = null;
		this.background_audio.volume = AUDIO_ELEMENT_VOLUME;
		this.async_pre_init().then(() => {
			console.log('pre_init done');
		});
		this.dom_pre_init();
	}
	async async_pre_init() {
		if(!this.background_audio) throw new Error("No background audio");
		try {
			await this.background_audio.play();
			return;
		} catch(e) {
			console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
		}
		let instructions = SimpleStackVMParser.parse_instruction_stream_from_string(`
		this;push,target_obj;get;push,background_audio;get;push,play;
			call,int(0);
				push,then;
				push,%o;push,%o;
				call,int(2);
			// comments work
			/*-2 +1 multiline too, (not split across lines yet)*/
		drop;
		global;push,removeEventListener;push,click;this;
			call,int(2);
		drop
		`, [function() {console.log('play success')}, function(err: any) {console.log(err)}]);
		let handler = new EventHandlerVMDispatch(instructions, this);
		globalThis.addEventListener('click', handler);
	}
	save_state_history_arr() {
		if(this.skip_save) return;
		localStorage.auto_buy_history_str = this.state_history_arr.join(",");
	}
	load_state_history_arr(arr: string[]) {
		if(localStorage.auto_buy_history_str) arr = localStorage.auto_buy_history_str.split(",");
		this.state_history_arr = arr;
	}
	delay_arr: number[];
	get_delay_arr_data(forced_action: string) {
		if(forced_action == "RESET") return this.delay_arr.map((e: number) => ~~(e / 4)).join(",");
		return this.delay_arr.join(",");
	}
	save_delay_arr() {
		let forced_action, action_count;
		let action_data = localStorage.auto_buy_forced_action;
		if(action_data) [forced_action, action_count] = action_data.split(",");
		localStorage.auto_buy_delay_str = this.get_delay_arr_data(forced_action);
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
	display_style_sheet: CSSStyleSheet;
	history_element: HTMLDivElement;
	delay_element: HTMLDivElement;
	hours_played_element: HTMLDivElement;
	percent_ratio_element: HTMLDivElement;
	percent_ratio_change_element: HTMLDivElement;
	state_log_element: HTMLDivElement;
	dom_pre_init() {
		let style_string = "";
		this.display_style_sheet.replace(`
		#state_log > div {width:max-content}
		#state_log {
			top:0px;width:30px;position:fixed;z-index:101;
			font-family:monospace;font-size:22px;color:lightgray;
		}`);
		this.history_element.innerText = "?3";
		this.delay_element.innerText = "0";
		this.hours_played_element.innerText = "0.000 hours";
		this.percent_ratio_element.innerText = 0..toFixed(2) + "%";
		this.percent_ratio_change_element.innerText = 0..toExponential(3);
		this.state_log_element.id = "state_log";
		this.state_log_element.style = style_string as any as CSSStyleDeclaration;
		this.state_log_element.append(this.history_element);
		this.state_log_element.append(this.delay_element);
		this.state_log_element.append(this.hours_played_element);
		this.state_log_element.append(this.percent_ratio_element);
		this.state_log_element.append(this.percent_ratio_change_element);
		document.body.append(this.state_log_element);
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.display_style_sheet];
	}
	state_history_arr_max_len: number;
	init_dom() {
		const font_size_px = 22;
		let t = this;
		this.state_history_arr_max_len = Math.floor(document.body.getClientRects()[0].width / (font_size_px * 0.55) / 2.1);
		this.history_element.addEventListener('click', new EventHandlerDispatch(this, this.history_element_click_handler));
		this.delay_element.innerText = this.delay_arr[0].toString();
		this.percent_ratio_element.addEventListener('click', function() {
			t.state.reset();
		});
		this.state_log_element.style.fontSize = font_size_px + "px";
		window.addEventListener('unload', function() {
			t.save_state_history_arr();
			t.save_delay_arr();
		});
	}
	global_init() {
		if(window.g_auto_buy && (<any>window).g_auto_buy !== this) window.g_auto_buy.destroy();
		(<any>window).g_auto_buy = this;
	}
	destroy() {
		for(let i = 0;i < this.cint_arr.length;i += 2) {
			let item = this.cint_arr[i];
			if(item[0] === 1) clearTimeout(item[1]);
			else if(item[0] === 2) clearTimeout(item[1]);
			console.log(item);
		}
	}
	parse_single_int(string: string) {
		return parseInt(string);
	}
	default_split(string: string) {
		return string.split(",");
	}
	parse_delay_arr(data: any) {
		return this.default_split(data).map(this.parse_single_int);
	}
	load_delay_arr() {
		let storage_data = localStorage.auto_buy_delay_str;
		if(!storage_data) return Array(12).fill(300);
		return this.parse_delay_arr(storage_data);
	}
	update_dom() {
		this.hours_played_element.innerText = ((window.timeplayed / 30) / 60).toFixed(3) + " hours";
		if(!Number.isFinite(this.state.ratio)) {
			debugger;
		}
		let last_ratio = this.state.ratio * 100;
		this.state.update();
		let cur_ratio = this.state.ratio * 100;
		this.percent_ratio_element.innerText = cur_ratio.toFixed(2) + "%";
		let ratio_diff = cur_ratio - last_ratio;
		let extra_diff_char = "+";
		if(ratio_diff < 0) extra_diff_char = '';
		this.percent_ratio_change_element.innerText = extra_diff_char + ratio_diff.toExponential(3);
		this.history_element.innerText = array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
		// let cint = setTimeout(this.update_dom, 125, this);
		// this.cint_arr.push([1, cint, 'dom update_dom']);
	}
	init() {
		this.delay_arr = this.load_delay_arr();
		// setTimeout(this.delayed_init, 200, this);
	}
	delayed_init() {
		let t = this;

		this.global_init();
		this.init_dom();
		this.state.init();
		this.update_dom();
		this.main();

		let original_lightreset = window.lightreset;
		window.lightreset = lightreset_inject;
		window.specialclick = specialclick_inject;

		function lightreset_inject() {
			t.state_history_clear_for_reset();
			t.skip_save = true;
			window.addEventListener('unload', function() {
				t.skip_save = false;
				localStorage.auto_buy_delay_str = "300,300,300,300";
				localStorage.long_wait = 12000;
			});
			original_lightreset();
		}
	}
	state_history_clear_for_reset() {
		this.state_history_arr = ["R"];
		localStorage.auto_buy_history_str = "R";
	}
	state_history_append(value: string) {
		this.epoch_len++;
		let last = this.state_history_arr.at(-1);
		this.state_history_arr.push(value);
		if(this.state.debug) console.log('history append', last, value);
		while(this.state_history_arr.length > 120) {
			this.state_history_arr.shift();
		}
		function async_compress(self: {state_history_arr: any; compressor: {compress_array: (arg0: any) => any;};}) {
			self.state_history_arr = self.compressor.compress_array(self.state_history_arr);
		}
		Promise.resolve(this).then(async_compress);
	}
	history_element_click_handler(_event: MouseEvent) {
		this.extra = this.calc_delay_extra();
		let cint = setTimeout(this.main, this.extra, this);
		this.cint_arr.push([1, cint]);
		this.delay_element.innerText = this.extra.toString();
		this.state_history_append(">");
	}
	calc_delay_extra() {
		let max;
		while(this.delay_arr.length > 16) {
			this.delay_arr.shift();
		};
		for(var i = 0;i < this.delay_arr.length;i++) {
			this.extra += this.delay_arr[i];
			if(max !== void 0) max = Math.max(this.delay_arr[i], max);
			else max = this.delay_arr[i];
		};
		void max;
		return ~~(this.extra / this.delay_arr.length);
	}
	is_epoch_over() {
		let epoch_diff = Date.now() - this.epoch_start_time;
		if(epoch_diff > 40 * 1000) {
			return true;
		}
		return false;
	}
	main() {
		this.extra = this.calc_delay_extra();
		this.pre_total = window.totalAtome;
		do_auto_unit_promote();
		if(this.state.ratio > 1 && this.is_epoch_over()) return this.reset_delay_init();
		if(this.pre_total != window.totalAtome) return this.step_iter_start();
		this.iter_count = 0;
		this.rare_begin_or_faster_delay();
	}
	step_iter_start() {
		this.iter_count += 1;
		if(this.iter_count > 6) {
			return this.large_decrease();
		} else {
			return this.normal_decrease();
		};
	}
	get_delay_change(pow_base: number, pow_num: number, div: number) {
		let pow_res = Math.pow(pow_base, pow_num);
		let res = this.extra * pow_res;
		return res / div;
	}
	update_delay(change: number, decrease = false) {
		if(window.__testing__) {
			return;
		}
		let value = this.get_updated_delay(change, decrease);
		this.delay = value;
		this.delay_arr.push(value);
	}
	get_updated_delay(change: number, decrease: boolean) {
		let value;
		if(decrease) value = this.extra - change;
		else value = this.extra + change;
		// floor the value
		return ~~value;
	}
	do_delay_dec(pow_terms: [number, number], div: number) {
		let iter_term = Math.pow(pow_terms[1], this.iter_count);
		let delay_change = this.get_delay_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_delay(delay_change * iter_term, true);
		if(this.delay < 25) this.delay = 25;
	}
	do_delay_inc(pow_terms: [number], div: number) {
		let delay_change = this.get_delay_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_delay(delay_change);
	}
	large_decrease() {
		this.do_delay_dec([1.007, 1.05], 10);
		this.next_delay(this.main, this.extra, '!');
	}
	normal_decrease() {
		this.do_delay_dec([1.006, 1.05], 10);
		this.next_delay(this.main, this.extra, '-');
	}
	fast_unit_delay() {
		this.extra = this.calc_delay_extra();
		this.iter_count += 1;
		this.do_delay_dec([1.0065, 1.05], 10);
		this.next_delay(this.fast_unit, this.get_updated_delay(this.extra * 0.1, true), ':');
	}
	next_delay(trg_fn: (this: this) => void, delay: number, char: string) {
		let cint = setTimeout(trg_fn.bind(this), delay);
		this.cint_arr.push([1, cint]);
		this.delay_element.innerText = delay.toString();
		this.state_history_append(char);
	}
	rare_begin_or_faster_delay() {
		if(Math.random() < 0.05) return this.rare_begin();
		this.faster_delay();
	}
	faster_delay() {
		this.do_delay_inc([1.007], 40);
		this.next_delay(this.main, this.extra, '+');
	}
	pre_total: number | undefined;
	fast_unit() {
		this.pre_total = window.totalAtome;
		do_auto_unit_promote();
		if(this.pre_total == window.totalAtome) this.slow_final();
		else this.fast_unit_delay();
	}
	slow_final() {
		this.next_delay(this.main, this.extra, '$');
	}
	bonus() {
		window.bonusAll();
		this.fast_unit_delay();
	}
	special_delay() {
		this.next_delay(this.special, this.extra, '^');
	}
	is_special_done(special_buyable: {done: boolean, cost: number}) {
		return !special_buyable.done && special_buyable.cost < window.totalAtome;
	}
	next_special() {
		return window.allspec.findIndex(this.is_special_done);
	}
	do_special() {
		let ret = false;
		for(let index = this.next_special();;index = this.next_special()) {
			if(index > -1) {
				window.specialclick(index);
				ret = true;
			} else break;
		}
		return ret;
	}
	bonus_delay() {
		this.next_delay(this.bonus, this.extra, '#');
	}
	special() {
		if(this.do_special()) this.special_delay();
		else this.bonus_delay();
	}
	rare_begin() {
		this.do_delay_inc([1.008], 10);
		this.next_delay(this.initial_special, this.extra, '<');
	}
	initial_special() {
		this.next_delay(this.special, this.extra, '>');
	}
	reset_delay_trigger() {
		if(this.background_audio) {
			this.background_audio.muted = !this.background_audio.muted;
		}
		this.next_delay(this.reset_delay_start, 60 * 2 * 1000, 'trigger');
	}
	reset_delay_start() {
		this.next_delay(this.reset_delay_start, 60 * 1000, 'reset_soon');
	}
	reset_delay_run() {
		window.lightreset();
	}
	reset_delay_init() {
		if(this.background_audio) {
			this.background_audio.muted = !this.background_audio.muted;
		}
		this.next_delay(this.reset_delay_start, 60 * 2 * 1000, 'reset_delay');
	}
}
const auto_buy_obj = new AutoBuy;
class DoUnitPromoteExecutor {
	run() {
		var out = [], maxed = [];
		for(var k = 0;k < window.arUnit.length;k++) {
			var afford = false;
			if(window.arUnit[k][16] == true || k == 0) {
				var type = window.Get_Unit_Type(k);
				var tmp = window.getUnitPromoCost(k);
				var cost = tmp;
				var next = window.Find_ToNext(k);
				if(next < 0) {maxed[k] = true};
				for(var i = 1;i <= 100;i++) {
					if(window.totalAtome >= cost) {
						tmp = tmp + (tmp * window.arUnit[k][3]) / 100;
						var tar = (window.arUnit[k][4] * 1) + i;
						var a = window._targets.indexOf(tar);
						var reduction = 1;
						if(a > -1 && tar <= 1000) {
							var b = true;
							for(var k2 in type[2]) {
								var v2 = type[2][k2]
								if(v2 != k && window.arUnit[v2][4] < tar) {
									b = false;
								}
							}
							if(b) {
								var c = window._targets_achi.indexOf(window.totalAchi() + 1);
								if(c > -1) {
									reduction *= (1 - ((c + 1) * 0.01));
								}
								reduction *= 1 - ((a + 1) * 0.01);
							}
						}
						tmp *= reduction;
						cost += tmp;
					} else {
						break
					}
					if(i == next || (maxed[k] && i == 100)) {
						afford = true;
					}
				}
				if(afford) {
					out[k] = true;
				} else {
					out[k] = false;
				}
			}
		}
		let res = out.lastIndexOf(true);
		if(res < 0) {
			return
		}
		if(maxed[res]) {
			for(var y = 0;y < 100;y++) {
				window.mainCalc(res);
			}
		} else {
			window.tonext(res);
		}
	}
}
function do_auto_unit_promote() {
	var out = [], maxed = [];
	for(var k = 0;k < window.arUnit.length;k++) {
		var afford = false;
		if(window.arUnit[k][16] == true || k == 0) {
			var type = window.Get_Unit_Type(k);
			var tmp = window.getUnitPromoCost(k);
			var cost = tmp;
			var next = window.Find_ToNext(k);
			if(next < 0) {maxed[k] = true};
			for(var i = 1;i <= 100;i++) {
				if(window.totalAtome >= cost) {
					tmp = tmp + (tmp * window.arUnit[k][3]) / 100;
					var tar = (window.arUnit[k][4] * 1) + i;
					var a = window._targets.indexOf(tar);
					var reduction = 1;
					if(a > -1 && tar <= 1000) {
						var b = true;
						for(var k2 in type[2]) {
							var v2 = type[2][k2]
							if(v2 != k && window.arUnit[v2][4] < tar) {
								b = false;
							}
						}
						if(b) {
							var c = window._targets_achi.indexOf(window.totalAchi() + 1);
							if(c > -1) {
								reduction *= (1 - ((c + 1) * 0.01));
							}
							reduction *= 1 - ((a + 1) * 0.01);
						}
					}
					tmp *= reduction;
					cost += tmp;
				} else {
					break
				}
				if(i == next || (maxed[k] && i == 100)) {
					afford = true;
				}
			}
			if(afford) {
				out[k] = true;
			} else {
				out[k] = false;
			}
		}
	}
	let res = out.lastIndexOf(true);
	if(res < 0) {
		return
	}
	if(maxed[res]) {
		for(var y = 0;y < 100;y++) {
			window.mainCalc(res);
		}
	} else {
		window.tonext(res);
	}
};
function map_to_tuple(this: any, e: any, i: string | number) {
	return [e, this[i]];
}
function to_tuple_arr(keys: any[], values: any[]) {
	return keys.map(map_to_tuple, values);
}
function do_async_wait(delay: number) {
	function promise_exec(a: TimerHandler) {
		setTimeout(a, delay);
	}
	return new Promise(promise_exec);
}
function array_sample_end(arr: string[], rem_target_len: number) {
	arr = arr.slice(-300);
	let rem_len = char_len_of(arr);
	while(rem_len > rem_target_len) {
		let item = arr.shift();
		if(item !== void 0) rem_len -= item.length + 1;
	}
	return arr;
}
function char_len_of(arr: any[]) {
	return arr.reduce((a: any, b: string | any[]) => a + b.length, 0) + arr.length;
}
//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
function specialclick_inject(that: number) {
	let allspec = window.allspec;
	let doc = window.doc;
	if(allspec[that].done == undefined) allspec[that].done = false;
	if(allspec[that].cost <= window.totalAtome && allspec[that].done == false) {
		let sb = doc.getElementById('specialsbought');
		if(!sb) throw new Error;
		sb.innerText = window.rounding(++window.specialsbought, false, 0);
		if(that == 74) {
		}
		window.atomsinvest += allspec[that].cost;
		let ae = doc.getElementById('atomsinvest');
		if(ae !== void 0 && ae !== null) ae.innerText = window.rounding(window.atomsinvest, false, 0);
		allspec[that].done = true;
		window.totalAtome -= allspec[that].cost;
		var diff1 = window.calcDiff(that);
		for(var a in window.arUnit[that][17]) window.arUnit[that][17][a] *= 100;
		window.arUnit[that][5] *= 100;
		var specaps = 0;
		if(window.arUnit[that][4] > 0) {
			specaps = (window.calcDiff(that) - diff1);
			window.atomepersecond += specaps;
		}
		if(window.noti) window.gritter('Power-up !', window.toTitleCase(window.plurials(window.arrayNames[that])) + " X100 APS", null, "+" + window.rounding(specaps, false, 0) + " APS", "");
		window.updateprogress(that);
		window.$('#spec' + that).remove();
		(that < 74) ? window.seeUnit(that + 1) : window.seeUnit(that - 1);
		window.seeUnit(that);
		window.checkspec();
		window.achiSpec();
	}
}
function on_page_is_loaded() {
	remove_bad_dom_script_element();
	if(window.Pace.bar.progress == 100) {
		auto_buy_obj.init();
	} else {
		let original_pace_bar_finish = window.Pace.bar.finish;
		window.Pace.bar.finish = function() {
			original_pace_bar_finish.call(this);
			auto_buy_obj.init();
		}
	}
}
class ProxyHandlers {
	set_(call_args: any[], from: any) {
		return Reflect.set(call_args[0], call_args[1], call_args[2], call_args[3]);
	}
	get_(call_args: any[], from: any) {
		return Reflect.get(call_args[0], call_args[1], call_args[2]);
	}
	apply_(call_args: any[], from: any) {
		return Reflect.apply(call_args[0], call_args[1], call_args[2]);
	}
	defineProperty_(call_args: any[], from: any) {
		return Reflect.defineProperty(call_args[0], call_args[1], call_args[2]);
	}
	getOwnPropertyDescriptor_(call_args: any[], from: any) {
		return Reflect.getOwnPropertyDescriptor(call_args[0], call_args[1]);
	}
}
class RandomKeepArray extends Array {
	constructor() {
		super();
	}
	push(value: unknown): number {
		let set_index = 0;
		let ret = this.push_at(set_index, value);
		while(this[set_index].length > 50) {
			value = this[set_index].shift();
			if(Math.random() > 0.9) {
				set_index++;
				this.push_at(set_index, value);
				console.log('psp', 1);
				let off = 0;
				while(this[set_index - off].length < 25) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0) continue;
				console.log('psp', 2);
				while(this[set_index - off].length < 40) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0) continue;
				console.log('psp', 3);
				while(this[set_index - off].length < 40) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0) continue;
				console.log('psp', 4);
				while(this[set_index - off].length < 40) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
			}
			if(this[set_index].length <= 50 && set_index > 0) {
				set_index--;
			}
		}
		return ret;
	}
	push_at(index: number, value: any) {
		while(index >= this.length) {
			return super.push([]);
		}
		return this[index].push(value);
	}
	push_va(...a: any[]) {
		return this.push(a);
	}
}
function define_property_value(obj: Window & typeof globalThis, name: PropertyKey, value: any, ...props: undefined[]) {
	let [
		writable = true,
		enumerable = true,
		configurable = true
	] = props;
	Object.defineProperty(obj, name, {
		value,
		writable,
		enumerable,
		configurable
	});
}
function got_jquery(jquery_func: (arg0: string) => any) {
	define_property_value(window, '$', jquery_func);
	let res = jquery_func('head');
	let r_proto = Object.getPrototypeOf(res);
	//cspell:words lazyload
	r_proto.lazyload = function(...a: any) {
		console.log('lazyload', ...a);
	}
	return jquery_func;
}
function reload_if_def(obj: {[x: string]: any;}, key: string | number) {
	if(obj[key]) {
		document.body.innerHTML = "";
		document.head.innerHTML = "";
		debugger;
		setTimeout(() => location.reload());
		return true;
	}
	return false;
}
function proxy_jquery() {
	let val: any;
	if(window.$) {
		let res = window.$('head');
		let r_proto = Object.getPrototypeOf(res);
		r_proto.lazyload = function(...a: any) {
			console.log('lazyload', ...a);
		}
		return;
	}
	Object.defineProperty(window, '$', {
		get() {
			if(val) {
				debugger;
			}
			return val;
		},
		set(value) {
			val = value;
			got_jquery(value);
			return true;
		},
		enumerable: true,
		configurable: true
	});
}
function pace_finish_proxy_apply(func: Function, this_v: any, args: ArrayLike<[]>) {
	auto_buy_obj.init();
	window.Pace.bar.finish = func;
	if(args.length > 0) {
		throw new Error("pace apply used more than the expected arguments");
	}
	return Reflect.apply(func, this_v, args);
}
function on_game_data_set() {
	remove_bad_dom_script_element();
	auto_buy_obj.pre_init();
	if(window.Pace.bar.progress == 100) {
		auto_buy_obj.init();
		return;
	}
	window.Pace.bar.finish = new Proxy(window.Pace.bar.finish, {
		apply: pace_finish_proxy_apply
	});
}
function remove_cint_item(cint_arr: [1 | 2, number, string][], cint_item: [1 | 2, number, string]) {
	let idx = cint_arr.indexOf(cint_item);
	cint_arr.splice(idx, 1);
}
function timer_wait_for_game_data(p_cint_item: [1 | 2, number, string]) {
	remove_cint_item(cint_arr, p_cint_item); WeakRef
	let cint_item = [0, -1];
	let cint = setTimeout(wait_for_game_data, 0, cint_item);
	cint_item[1] = cint;
	cint_arr.push(cint_item);
}
function wait_for_game_data() {
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		let cint_item = [0, -1];
		let cint = setTimeout(timer_wait_for_game_data, 0, cint_item);
		cint_item[1] = cint;
		cint_arr.push(cint_item);
	}
}
function on_timers_moved(timers: any) {
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		wait_for_game_data();
	}
	remove_bad_dom_script_element();
}
function dom_add_elm_filter(elm: HTMLScriptElement) {
	if(elm && elm.nodeName === "SCRIPT") {
		if(!elm.src) {
			console.log(elm);
			return true;
		}
		if(elm.src && new URL(elm.src).origin === location.origin) {
			remove_bad_dom_script_element();
			return true;
		}
		return false;
	}
	return true;
}
function main() {
	let enable_proxy = true;
	window.cint_arr = cint_arr;
	if(enable_proxy) {
		proxy_jquery();
	}
	window.adsbygoogle = [] as any;
	window.adsbygoogle.op = window.adsbygoogle.push;
	window.adsbygoogle.push = function(e: any) {
		window.adsbygoogle.op(e);
		remove_bad_dom_script_element();
	};
	var prev_node_prototype_insertBefore = Node.prototype.insertBefore;
	document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
	let seen_proto: any[] = [];
	Node.prototype.insertBefore = function <T extends Node>(node: T, child: Node | null): T {
		let res, p_res;
		if(node instanceof HTMLScriptElement) {
			let should_insert_1 = dom_add_elm_filter(node);
			if(!should_insert_1) return node;
		}
		if(child instanceof HTMLScriptElement) {
			let should_insert_1 = dom_add_elm_filter(child);
			if(!should_insert_1) return node;
		}
		res = node;
		p_res = Object.getPrototypeOf(res);
		if(!seen_proto.includes(p_res)) {
			seen_proto.push(p_res);
			console.log(res, p_res);
		}
		res = child;
		p_res = Object.getPrototypeOf(res);
		if(!seen_proto.includes(p_res)) {
			seen_proto.push(p_res);
			console.log(res, p_res);
		}
		return prev_node_prototype_insertBefore.call(this, node, child) as T;
	}
	remove_bad_dom_script_element();
	window.on_on_timers_moved_first = true;
	let move_timers_to_worker = new Promise(move_timers_to_worker_promise_executor);
	move_timers_to_worker.then(on_timers_moved);
	setTimeout(remove_bad_dom_script_element, 0);
	window.document_write_list = new DocumentWriteList;
	document.stop = function() {};
}
main();