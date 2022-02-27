import InstructionTypeBox from "./types/vm/box/InstructionTypeBox";
import {InstructionType} from "./types/vm/instruction/mod";
import Box from "./types/vm/box/Box";
import IndexBox from "./types/vm/box/IndexBox";
import NewableFunctionBox from "./types/vm/box/NewableFunctionBox";
import StackVMBox from "./types/vm/box/StackVMBox";
import WindowBox from "./types/vm/box/WindowBox";
import IAutoBuy from "types/IAutoBuy";
import {AutoBuyState} from "./types/AutoBuyState";
import {SymbolRef} from "./types/SymbolRef";
import {next_debug_id} from "./types/next_debug_id";
import {AbstractBox} from "./types/AbstractBox";
import {AutoBuy} from "./types/AutoBuy";
import {ProxyHandlers} from "./types/ProxyHandlers";
import {ScriptStateHost} from "./types/ScriptStateHost";
import {find_all_scripts_using_string_apis} from "./types/find_all_scripts_using_string_apis";
import {DocumentWriteList} from "./types/DocumentWriteList";
import {UniqueIdGenerator} from "./types/UniqueIdGenerator";
import {move_timers_to_worker_promise_executor} from "types/move_timers_to_worker_promise_executor";
import {TimerApi} from "types/TimerApi";

export {};
'use strict';
export const TIMER_SINGLE = 1;
export const TIMER_REPEATING = 2;
export const TIMER_TAG_COUNT = 3;
export const AUDIO_ELEMENT_VOLUME = 0.58;
const cint_arr: string[] = [];
//spell:disable
const WorkerAsyncMessage = 1;
type WorkerAsyncMessageTy = typeof WorkerAsyncMessage;
export const TimeoutFireS = 101;
type TimeoutFireSTy = typeof TimeoutFireS;
const TimeoutFireR = 102;
type TimeoutFireRTy = typeof TimeoutFireR;
const WorkerUpdateMessageHandler = 201;
export type WorkerUpdateMessageHandlerTy = typeof WorkerUpdateMessageHandler;
export const TimeoutMessageR = 202;
export type TimeoutMessageRTy = typeof TimeoutMessageR;
export const TimeoutSetS = 203;
export type TimeoutSetSTy = typeof TimeoutSetS;
export const TimeoutSetR = 204;
export type TimeoutSetRTy = typeof TimeoutSetR;
export const TimeoutClearS = 205;
export type TimeoutClearSTy = typeof TimeoutClearS;
export const TimeoutClearR = 206;
export type TimeoutClearRTy = typeof TimeoutClearR;
const TimeoutClearA = 207;
type TimeoutClearATy = typeof TimeoutClearA;
export const WorkerDestroyMessage = 300;
type WorkerDestroyMessageTy = typeof WorkerDestroyMessage;
export const WorkerUpdateMessageHandlerReply = 301;
type WorkerUpdateMessageHandlerReplyTy = typeof WorkerUpdateMessageHandlerReply;
export const WorkerReadyReply = 302;
type WorkerReadyReplyTy = typeof WorkerReadyReply;
export const ReplySetSingle = 303;
type ReplySetSingleTy = typeof ReplySetSingle;
export const ReplySetRepeating = 304;
type ReplySetRepeatingTy = typeof ReplySetRepeating;
export const ReplyClearSingle = 305;
type ReplyClearSingleTy = typeof ReplyClearSingle;
export const ReplyClearRepeating = 306;
type ReplyClearRepeatingTy = typeof ReplyClearRepeating;
const ReplyClearAny = 307;
type ReplyClearAnyTy = typeof ReplyClearAny;
export const ReplyMessage1 = 401;
type ReplyMessage1Ty = typeof ReplyMessage1;
export const ReplyMessage2 = 402;
type ReplyMessage2Ty = typeof ReplyMessage2;
export const ReplyFromWorker = 500;
type ReplyFromWorkerTy = typeof ReplyFromWorker;
const ReplyToWorker = 600;
export type ReplyToWorkerTy = typeof ReplyToWorker;
const TimeoutSingleReply = 700;
export type TimeoutSingleReplyTy = typeof TimeoutSingleReply;
const TimeoutRepeatingReply = 701;
export type TimeoutRepeatingReplyTy = typeof TimeoutRepeatingReply;
export const TimeoutSetTypes = 1001;
export type TimeoutSetTypesTy = typeof TimeoutSetTypes;
export const TimeoutSetStringS = "setTimeout";
export const TimeoutSetStringR = "setInterval";
export const TimeoutClearStringS = "clearTimeout";
export const TimeoutClearStringR = "clearInterval";
export type WorkerReplyTypesTy = {
	single: TimeoutSingleReplyTy;
	repeating: TimeoutRepeatingReplyTy;
};
type ReplyClearTypes = {
	single: ReplyClearSingleTy;
	repeating: ReplyClearRepeatingTy;
	any: ReplyClearAnyTy;
};
type ReplySetTypes = {
	single: ReplySetSingleTy;
	repeating: ReplySetRepeatingTy;
};
export type TimeoutFireInfoTy = {
	single: TimeoutFireSTy;
	repeating: TimeoutFireRTy;
};
type TimeoutSetInfoTy = {
	single: TimeoutSetSTy;
	repeating: TimeoutSetRTy;
};
type TimeoutClearInfoTy = {
	single: TimeoutClearSTy;
	repeating: TimeoutClearRTy;
	any: TimeoutClearATy;
};
export type TimeoutWorkerTypesTy = {
	reply: WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerTy;
	ready: TimeoutMessageRTy;
	set: TimeoutSetInfoTy;
	clear: TimeoutClearInfoTy;
	set_types: TimeoutSetTypesTy;
};
export type TimerMessageTypesTy = {
	async: WorkerAsyncMessageTy;
	reply: ReplyTypes;
	fire: TimeoutFireInfoTy;
	worker: TimeoutWorkerTypesTy;
};
export type TimeoutSetStringsTy = {
	single: typeof TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR;
};
export type TimeoutClearStringsTy = {
	single: typeof TimeoutClearStringS;
	repeating: typeof TimeoutClearStringR;
};
type VarRef = {
	var: string;
};
type RefVarInfo = {
	t: number;
	v: VarRef;
};
export type RefVarMsg = {
	t: number;
	v: RefVarInfo;
};
type NumInfo = {
	t: number;
	v: number;
};
export type NumInfoMsg = {
	t: number;
	v: NumInfo;
};
export type NoDataMsg = {
	t: number;
};
export type LocalOrRemoteIdVarType = {
	var: 'local_id' | 'remote_id';
};
export type MakeReplyDataType = {
	t: number;
	v: LocalOrRemoteIdVarType | number;
};
class WorkerFireReplyTypes implements WorkerReplyTypesTy {
	single: TimeoutSingleReplyTy = TimeoutSingleReply
	repeating: TimeoutRepeatingReplyTy = TimeoutRepeatingReply
}
class WorkerReplyTypes {
	fire = new WorkerFireReplyTypes;
}
class ReplySetMessages implements ReplySetTypes {
	single: ReplySetSingleTy = ReplySetSingle
	repeating: ReplySetRepeatingTy = ReplySetRepeating
};
class ReplyClearMessages implements ReplyClearTypes {
	single: ReplyClearSingleTy = ReplyClearSingle
	repeating: ReplyClearRepeatingTy = ReplyClearRepeating
	any: ReplyClearAnyTy = ReplyClearAny
}
class ReplyTypes {
	msg1: ReplyMessage1Ty = ReplyMessage1;
	msg2: ReplyMessage2Ty = ReplyMessage2;
	from_worker: ReplyFromWorkerTy = ReplyFromWorker;
	to_worker: ReplyToWorkerTy = ReplyToWorker;
	destroy_worker: WorkerDestroyMessageTy = WorkerDestroyMessage;
	update_handler: WorkerUpdateMessageHandlerReplyTy = WorkerUpdateMessageHandlerReply;
	ready: WorkerReadyReplyTy = WorkerReadyReply;
	set = new ReplySetMessages;
	clear = new ReplyClearMessages;
}
export class MakeReplyData {
	t: number;
	v: MakeReplyDataType;
	constructor(reply: number, info: number, from: LocalOrRemoteIdVarType | number, {}) {
		this.t = reply;
		this.v = {
			t: info,
			v: from
		};
	}
}
export class TimeoutSetStrings implements TimeoutSetStringsTy {
	single: typeof TimeoutSetStringS = TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR = TimeoutSetStringR;
}
class TimeoutSetInfo implements TimeoutSetInfoTy {
	single: TimeoutSetSTy = TimeoutSetS
	repeating: TimeoutSetRTy = TimeoutSetR;
}
class TimeoutClearInfo implements TimeoutClearInfoTy {
	single: TimeoutClearSTy = TimeoutClearS;
	repeating: TimeoutClearRTy = TimeoutClearR;
	any: TimeoutClearATy = TimeoutClearA;
}
class TimeoutWorkerTypes implements TimeoutWorkerTypesTy {
	reply: WorkerReplyTypes = new WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy = WorkerUpdateMessageHandler;
	ready: TimeoutMessageRTy = TimeoutMessageR;
	set: TimeoutSetInfo = new TimeoutSetInfo;
	clear: TimeoutClearInfo = new TimeoutClearInfo;
	set_types: TimeoutSetTypesTy = TimeoutSetTypes;
}
class TimeoutFireInfo implements TimeoutFireInfoTy {
	single: TimeoutFireSTy = TimeoutFireS;
	repeating: TimeoutFireRTy = TimeoutFireR;
}
export type ReplyTypesTy = {
	msg1: ReplyMessage1Ty;
	msg2: ReplyMessage2Ty;
	from_worker: ReplyFromWorkerTy;
	to_worker: ReplyToWorkerTy;
	destroy_worker: WorkerDestroyMessageTy;
	update_handler: WorkerUpdateMessageHandlerReplyTy;
	ready: WorkerReadyReplyTy;
	set: ReplySetMessages;
	clear: ReplyClearMessages;
}
export class TimerMessageTypes implements TimerMessageTypesTy {
	async: WorkerAsyncMessageTy = WorkerAsyncMessage;
	reply: ReplyTypesTy = new ReplyTypes;
	fire: TimeoutFireInfoTy = new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy = new TimeoutWorkerTypes;
}
export class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS = TimeoutClearStringS;
	repeating: typeof TimeoutClearStringR = TimeoutClearStringR;
}
let g_timer_api = new TimerApi;
export let message_types = g_timer_api.msg_types;
export var is_in_ignored_from_src_fn = {flag:false};
export var is_in_userscript_fn = {flag:false};
export var is_in_userscript = {flag:true};
export let cur_event_fns: (CallableFunction | NewableFunction)[] = [];
void find_all_scripts_using_string_apis;
export type AnyFunction = CallableFunction | NewableFunction | Function | Object;
export type RegIdFunction = {reg_id: number} & AnyFunction;
const [weak_scripts, register_obj_with_registry] = find_all_scripts_using_string_apis();
void register_obj_with_registry;
type NullableItem<T> = T | null;
export type Nullable2dArray<T> = NullableItem<T[]>[];
export type DocumentWriteFn = (...text: string[]) => void;

export type MessageTimeoutFireS = {
	t: TimeoutFireSTy;
	v: never;
};
type MessageWorkerDestroyMessage = {
	t: WorkerDestroyMessageTy;
	v: never;
};
type MessageReplyMessage1 = {
	t: ReplyMessage1Ty;
	v: never;
};
type MessageReplyMessage2 = {
	t: ReplyMessage2Ty;
	v: never;
};
type MessageWorkerUpdateMessageHandlerReply = {
	t: WorkerUpdateMessageHandlerReplyTy;
	v: WorkerUpdateMessageHandlerTy;
};
type MessageReplyFromWorkerData = {
	t: never;
	v: never;
};
type MessageReplyFromWorker = {
	t: ReplyFromWorkerTy;
	v: MessageReplyFromWorkerData;
};
export type MessageTypesForWorkerReplies = MessageReplyFromWorker | MessageReplyMessage2 | MessageReplyMessage1 | MessageWorkerDestroyMessage | MessageTimeoutFireS;
type MessageWorkerReadyReply = {
	t: WorkerReadyReplyTy;
	v: TimeoutMessageRTy;
};
type MessageReplySetSingle = {
	t: ReplySetSingleTy;
	v: never;
};
type MessageReplySetRepeating = {
	t: ReplySetRepeatingTy;
	v: never;
};
type MessageReplyClearSingle = {
	t: ReplyClearSingleTy;
	v: never;
};
type MessageReplyClearRepeating = {
	t: ReplyClearRepeatingTy;
	v: never;
};
export type MessageTimeoutClearS = {
	t: TimeoutClearSTy;
	v: number;
};
export type MessageTimeoutClearR = {
	t: TimeoutClearRTy;
	v: number;
}

export type DispatchMessageType = MessageTimeoutClearR | MessageTimeoutClearS | MessageReplyClearRepeating | MessageReplyClearSingle | MessageReplySetRepeating | MessageReplySetSingle | MessageWorkerReadyReply | MessageWorkerUpdateMessageHandlerReply | MessageReplyMessage2 | MessageReplyMessage1 | MessageReplyFromWorkerData;
export type MessageTimeoutClearA = {
	t: TimeoutClearATy;
	v: number;
};
export type MessageTimeoutSingleReply = {
	t: TimeoutSingleReplyTy;
	v: number;
};
type SetSingleMessageData = {
	t: number;
	v: number;
};
type SetRepeatingMessageData = {
	t: number;
	v: number;
}
export type MessageTimeoutSetS = {
	t: TimeoutSetSTy;
	v: SetSingleMessageData;
};
export type MessageTimeoutSetR = {
	t: TimeoutSetRTy;
	v: SetRepeatingMessageData;
}
function timer_nop() {}
export type TimerTag = 1 | 2;
export type SetMessageData = {
	t: number;
	v: number;
};

let seen_elements = new WeakSet;
function remove_bad_dom_script_element_callback(e: HTMLScriptElement) {
	if(seen_elements.has(e)) return;
	seen_elements.add(e);
	if(!e.src) return;
	if(e.src.includes("analytics.js") && e.src.includes("google")) {
		e.remove();
		return;
	}
	if(e.src.includes("platform.js")) {
		e.remove();
		return;
	}
	//spell:disable-next-line
	if(e.src.indexOf("opentracker") > -1) {
		e.remove();
		return;
	}
	//spell:disable-next-line
	if(e.src.includes("pagead/js/adsbygoogle.js")) {
		e.remove();
		return;
	}
	if(new URL(e.src).origin != location.origin) return;
	if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1) {
		e.remove();
		return;
	}
}
function remove_bad_dom_script_element() {
	Array.prototype.forEach.call(document.querySelectorAll("script"), remove_bad_dom_script_element_callback);
};
export class EventHandlerDispatch<T> {
	target_obj: T;
	target_fn;
	constructor(target_obj: T, target_fn: (this: T, event: Event) => void) {
		this.target_obj = target_obj;
		this.target_fn = target_fn;
	}
	do_handle_event(event: Event) {
		this.target_fn.call(this.target_obj, event);
	}
	handleEvent(v: Event) {
		this.do_handle_event(v);
	}
}
abstract class AbstractVM {
	abstract execute_instruction(instruction: InstructionType): void;
	abstract run(): Box;
}
class BaseVMCreate extends AbstractVM {
	flags: Map<string, boolean>;
	instructions;
	instruction_pointer;
	running;
	constructor(instructions: InstructionType[]) {
		super();
		this.flags = new Map;
		this.instructions = instructions;
		this.instruction_pointer = 0;
		this.running = false;
	}
	reset() {
		this.instruction_pointer = 0;
		this.running = false;
	}
	is_in_instructions(value: number) {
		return value >= 0 && value < this.instructions.length;
	}
	execute_instruction(instruction:InstructionType) {
		switch(instruction[0]) {
			default: {
				console.info('Unknown opcode', instruction[0]);
				throw new Error('Halt: bad opcode (' + instruction[0] + ')');
			}
			case 'je': {
				let [, target] = instruction;
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				if(this.flags.get('equal')) {
					this.instruction_pointer = target;
				}
			} break;
			case 'jmp': {
				let [, target] = instruction;
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				this.instruction_pointer = target;
			} break;
			case 'halt'/*Running*/: this.running = false; break;
		}
	}
	run(): Box {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let instruction = this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			this.instruction_pointer++;
		}
		return null;
	}
}
function trigger_debug_breakpoint() {
	debugger;
}
const local_logging_level = 3;
export function l_log_if(level: number, ...args: any[]) {
	if(level <= local_logging_level) {
		console.log(...args);
	}
}
const LOG_LEVEL_ERROR = 1;
void LOG_LEVEL_ERROR;
export const LOG_LEVEL_WARN = 2;
const LOG_LEVEL_INFO = 3;
void LOG_LEVEL_INFO;
export const LOG_LEVEL_VERBOSE = 4;
const LOG_LEVEL_TRACE = 5;
void LOG_LEVEL_TRACE;
export class BaseStackVM extends BaseVMCreate {
	stack: Box[];
	return_value: Box;
	constructor(instructions: InstructionType[]) {
		super(instructions);
		this.stack = [];
		this.return_value = void 0;
	}
	reset() {
		super.reset();
		this.stack.length = 0;
		this.return_value = void 0;
	}
	push(value: Box) {
		this.stack.push(value);
	}
	pop(): Box {
		if(this.stack.length === 0) {
			throw new Error("stack underflow");
		}
		let pop_value = this.stack.pop();
		return pop_value;
	}
	pop_arg_count(operand_number_of_arguments: any) {
		let arguments_arr = [];
		let arg_count = operand_number_of_arguments;
		for(let i = 0;i < arg_count;i++) {
			if(this.stack.length <= 0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			arguments_arr.unshift(this.pop());
		}
		return arguments_arr;
	}
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'push'/*Stack*/: {
				for(let i = 0;i < instruction.length-1;i++) {
					let item = instruction[i+1];
					this.push(item);
				}
			} break;
			case 'drop'/*Stack*/: this.pop(); break;
			case 'get'/*Object*/: {
				let target_name = this.pop();
				if(target_name === void 0) break;
				let target_obj = this.pop();
				if(target_obj === void 0) break;
				if(typeof target_obj != 'object') break;
				if(typeof target_name != 'string') break;
				if(target_obj instanceof IndexBox) {
					this.push(target_obj.value[target_name]);
				}
			} break;
			case 'call'/*Call*/: {
				let number_of_arguments = instruction[1];
				if(number_of_arguments === void 0) return;
				if(typeof number_of_arguments != 'number') return;
				if(number_of_arguments <= 1) {
					throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
				}
				let [target_this, target_fn, ...arg_arr] = this.pop_arg_count(number_of_arguments);
				if(!(target_fn instanceof Function)) break;
				let ret = target_fn.apply(target_this, arg_arr);
				this.push(ret);
			} break;
			case 'construct'/*Construct*/: {
				let number_of_arguments = instruction[1];
				if(typeof number_of_arguments != 'number') return;
				let [construct_target, ...construct_arr] = this.pop_arg_count(number_of_arguments);
				if(construct_target instanceof Function) {
					let obj = new (<any>construct_target)(...construct_arr);
					this.push(obj);
				} else if(construct_target instanceof NewableFunctionBox) {
					let obj=construct_target.factory(...construct_arr);
					this.push(obj);
				} else {
					console.assert(false, 'try to construct non function');
					debugger;
				}
				l_log_if(LOG_LEVEL_VERBOSE, instruction, ...this.stack.slice(this.stack.length - number_of_arguments));
			} break;
			case 'return'/*Call*/:
				let ret = this.pop();
				this.return_value = ret;
				break;
			case 'modify_operand': {
				let [, target, offset] = instruction;
				if(typeof offset != 'number') return;
				if(typeof target === 'number') {
					if(this.is_in_instructions(target)) {
						throw new Error("RangeError: Destination is out of instructions range");
					}
					let instruction_modify = new InstructionTypeBox(this.instructions[target]);
					let value = this.pop();
					if(typeof value === 'string') {
						instruction_modify.value[offset] = value;
					}
					let verify_state: [number] = [instruction_modify.value.length];
					let out_ins: string[] = [];
					for(let i = 0;i < instruction_modify.value.length;i++) {
						let cur = instruction_modify.value[i];
						if(typeof cur === 'string') {
							out_ins.push(cur);
						} else {
							console.log('need type for', cur);
						}
					}
					let valid_instruction = SimpleStackVMParser.verify_instruction(out_ins, verify_state);
					this.instructions[target] = valid_instruction;
					console.log('new verify state', verify_state);
					console.assert(verify_state[0] === 0, "not all of the operands typechecked");
				}
			} break;
			case 'push_pc': {
				this.push(this.instruction_pointer);
			} break;
			default: super.execute_instruction(instruction); break;
		}
	}
	run(): Box {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let instruction = this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			this.instruction_pointer++;
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
class SimpleStackVM<T> extends BaseStackVM {
	args_vec: (T extends Array<T> ? T : [T]) | null;
	constructor(instructions: any) {
		super(instructions);
		this.args_vec = null;
	}
	reset() {
		super.reset();
		this.args_vec = null;
	}
	execute_instruction_raw(instruction:InstructionType) {
		switch(instruction[0]) {
			case 'this'/*Special*/: this.push(new StackVMBox(this)); break;
			// TODO: if you ever use this on a worker, change
			// it to use globalThis...
			case 'global'/*Special*/: this.push(new WindowBox(window)); break;
			case 'breakpoint'/*Debug*/: trigger_debug_breakpoint(); break;
			case 'call'/*Call*/: {
				// TODO: Fix the other code to use the call handling from
				// the base class
				// Currently we support applying functions
				// this is closer to what you expect, not to just get
				// the name of a member to call
				let number_of_arguments = instruction[1];
				let [target_obj, target_name, ...arg_arr] = this.pop_arg_count(number_of_arguments);
				if(typeof target_name == 'string') {
					switch(typeof target_obj){
						case 'object':
							if(target_obj === null)throw new Error("Call null func");
							switch(target_obj.type){
								case 'array_box':throw new Error("Call not a function");
								case 'constructor_box':{
									// are you sure, you just called a constructor! (the correct way)
									let ret=target_obj.factory(...arg_arr);
									this.push(ret);
								}
								case 'custom_box':{
									let ret=target_obj.as_type('function');
									ret;
								} break;
							}
					}
				}
			} break;
			default: super.execute_instruction(instruction); break;
		}
	}
	run(...run_arguments: T extends T[] ? T : [T]) {
		this.args_vec = run_arguments;
		return super.run();
	}
}
type FormattableTypes = string | (() => void) | ((err: Box) => void);
export class SimpleStackVMParser {
	/**@arg {string[] | number[]} cur @arg {number} arg_loc*/
	static parse_int_arg(cur_item: string | number) {
		if(typeof cur_item == 'string') {
			let arg = cur_item;
			if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
				let str_int = arg.slice(4, -1);
				return parseInt(str_int, 10);
			}
		}
	}
	static parse_string_with_format_ident(str: string, format_list: FormattableTypes[]) {
		let format_index = str.indexOf('%');
		let format_type = str[format_index + 1];
		switch(format_type) {
			case 'o':
				let obj = format_list.shift();
				if(!obj) throw new Error("Format list underflow");
				return obj;
			default:
				console.log("%s", 'unsupported format spec %' + format_type);
		}
	}
	static parse_current_instruction(cur: (number | string | ((err: Box) => void))[], format_list: FormattableTypes[]) {
		let arg_loc = 1;
		let arg = cur[arg_loc];
		while(arg) {
			if(typeof arg != 'string') {
				arg_loc++;
				arg = cur[arg_loc];
				continue;
			}
			if(arg.slice(0, 3) === 'int') {
				let int_res = this.parse_int_arg(arg);
				if(!int_res) throw new Error("Failed to parse int");
				cur[arg_loc] = int_res;
			}
			if(arg.includes('%')) {
				let res = this.parse_string_with_format_ident(arg, format_list);
				if(!res) throw new Error("Failed to parse format ident");
				cur[arg_loc] = res;
			}
			arg_loc++;
			arg = cur[arg_loc];
		}
	}
	static raw_parse_handle_regexp_match(m: string[]) {
		let iter = m[1].trim();
		if(iter.startsWith("//")) return [];
		while(iter.startsWith("/*")) {
			let j = iter.indexOf("*/");
			iter = iter.slice(j + 2).trim();
		}
		if(!iter) return [];
		return iter.split(",");
	}
	static match_regex: RegExp;
	static parse_string_into_raw_instruction_stream(string: string): string[][] {
		const parser_max_match_iter = 390;
		let parts: RegExpExecArray | null, arr: string[][] = [], i = 0;
		do {
			parts = this.match_regex.exec(string);
			if(!parts) break;
			let res = this.raw_parse_handle_regexp_match(parts);
			if(res) arr.push(res);
		} while(parts && i++ < parser_max_match_iter);
		if(parts) console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);
		return arr;
	}
	static parse_instruction_stream_from_string(string: string, format_list: FormattableTypes[]) {
		let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
		for(let i = 0;i < raw_instructions.length;i++) {
			let raw_instruction = raw_instructions[i];
			this.parse_current_instruction(raw_instruction, format_list);
		}
		let instructions = this.verify_raw_instructions(raw_instructions); return instructions;
	}
	static verify_instruction(instruction: string[], left: [number]): InstructionType {
		const [m_opcode, ...m_operands] = instruction;
		switch(m_opcode) {
			// variable argument count
			case 'push':
				left[0] = 0;
				return [m_opcode, ...m_operands];
			case 'call'/*1 argument*/:
				left[0] -= 2;
				if(typeof m_operands[0] === 'number' && Number.isFinite(m_operands[0])) return [m_opcode, m_operands[0]];
				else {
					console.info("Can't verify that call instruction is valid, argument (%o) is not a number or not finite", m_operands[0]);
					throw new Error("TypeError: Invalid argument");
				}
			case 'drop':
			case 'get':
			case 'return':
			case 'halt':
			case 'push_args':
			case 'this':
			case 'global':
			case 'breakpoint'/*opcode*/:
				left[0]--;
				return [m_opcode];
			default:
				console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_operands);
				throw new Error("Unexpected opcode");
		}
	}
	static verify_raw_instructions(raw_instructions: string[][]): InstructionType[] {
		const instructions: InstructionType[] = [];
		for(let i = 0;i < raw_instructions.length;i++) {
			const instruction = raw_instructions[i];
			const left: [number] = [instruction.length];
			const valid_instruction = this.verify_instruction(instruction, left);
			instructions.push(valid_instruction);
			if(left[0] > 0) throw new Error("Typechecking failure, data left when processing raw instruction stream");
		}
		return instructions;
	}
}
SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
export class EventHandlerVMDispatch extends SimpleStackVM<Event> {
	target_obj;
	constructor(instructions: InstructionType[], target_obj: IAutoBuy) {
		super(instructions);
		this.target_obj = target_obj;
	}
	handleEvent(event: Event) {
		this.reset();
		this.run(event);
	}
}
class CompressionStatsCalculator {
	hit_counts: number[];
	cache: string[];
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
		if(!this.hit_counts[index]) {
			this.hit_counts[index] = 1;
		} else this.hit_counts[index]++;
	}
	add_item(key: string) {
		let index = this.cache.indexOf(key)
		if(index == -1) index = this.cache.push(key);
		else this.add_hit(index);
	}
	reset() {
		this.cache.length = 0;
		this.hit_counts.length = 0;
	}
	calc_compression_stats(arr: string[], win_size: number): string[][] {
		this.reset();
		for(let i = 0;i < arr.length;i++) {
			if(i + win_size < arr.length) {
				this.add_item(arr.slice(i, i + win_size).join(","));
			}
		}
		let mk = this.map_keys();
		let mv = this.map_values();
		let tuple_of = to_tuple_arr(mk, mv);
		return tuple_of.filter((e) => e[1] !== void 0);
	}
	calc_for_stats_window_size(stats_arr: string[][][], arr: string[], win_size: number) {
		stats_arr[win_size - 1] = this.calc_compression_stats(arr, win_size);
	}
	calc_for_stats_index(stats_arr: string[][][], arr: string[], index: number) {
		stats_arr[index] = this.calc_compression_stats(arr, index + 1);
	}
}
class BaseCompression {
	did_compress(src: string[], dst: string[]) {
		return dst.length < src.length;
	}
	did_decompress(src: string[], dst: string[]) {
		return dst.length > src.length;
	}
	compress_result(src: string[], dst: string[]) {
		if(this.did_compress(src, dst)) return [true, dst];
		return [false, src];
	}
	decompress_result(src: string[], dst: string[]): [res: boolean, dst: string[]] {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src, dst)) return [true, dst];
		return [false, dst];
	}
}
export class MulCompression extends BaseCompression {
	stats_calculator;
	compression_stats: never[][];
	constructor() {
		super();
		this.stats_calculator = new CompressionStatsCalculator;
		this.compression_stats = [];
	}
	try_compress(arr: string[]) {
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
						continue;
					}
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr, ret);
	}
	try_decompress(arr: string[]): [res: boolean, dst: string[]] {
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
	compress_array(arr: string[]) {
		let success, res;
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
		[success, res] = this.try_compress(arr);
		if(success) return res;
		return arr;
	}
}
function calc_ratio(arr: number[]) {
	let ratio_acc = 0;
	for(let i = 0;i < arr.length;i++)ratio_acc += arr[i];
	// don't divide by zero
	if(ratio_acc === 0) return 0;
	return ratio_acc / arr.length;
}
console.assert(calc_ratio([0, 0]) === 0, "calc ratio of array full of zeros does not divide by zero");
export class AverageRatio {
	arr
	history: number[]
	count
	len
	history_len
	weight
	human_duration
	// @AverageRatio
	constructor(max_len: number, max_history_len: number, weight: number, human_duration: string, initial_arr: number[] = []) {
		this.arr = initial_arr;
		this.history = [];
		this.count = 0;
		this.len = max_len;
		this.history_len = max_history_len;
		this.weight = weight;
		this.human_duration = human_duration;
	}
	add(value: number, from_prev: boolean, debug = false) {
		if(from_prev) {
			if(debug) console.log("ratio add", this.human_duration, (value * 100).toFixed(5));
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
class AbstractTarget {
	fire() {
		throw new Error("Attempt to call an abstract class");
	}
}
type TimeoutTargetObjects = IAutoBuy | AutoBuyState;
type CallbackType1 = () => void;
type CallbackType2 = (this: TimeoutTargetObjects) => void;
type TimeoutTargetCallbackType = CallbackType2 | CallbackType1;
export class TimeoutTarget extends AbstractTarget {
	once;
	obj;
	callback;
	description;
	constructor(obj: TimeoutTargetObjects, callback: TimeoutTargetCallbackType, description: string) {
		super();
		this.once = true;
		this.obj = obj
		this.callback = callback;
		this.description = description;
	}
	fire() {
		this.callback.call(this.obj);
	}
}
class IntervalTarget extends AbstractTarget {
	once;
	obj;
	callback;
	description;
	constructor(obj: never, callback: () => void, description: never) {
		super();
		this.once = false;
		this.obj = obj
		this.callback = callback;
		this.description = description;
	}
	fire() {
		this.callback.call(this.obj);
	}
}
void IntervalTarget;
export type PromiseExecutorRejectCallback = (reason?: any) => void;

class PromiseTimeoutTarget {
	description;
	m_promise: Promise<void> | null;
	constructor(description: string) {
		this.description = description;
		this.promise_accept = null;
		this.callback = null;
		this.m_promise = new Promise(this.promise_executor.bind(this));
	}
	get_promise() {
		return this.m_promise;
	}
	promise_accept: ((value: void | PromiseLike<void>) => void) | null;
	callback: ((value: void | PromiseLike<void>) => void) | null;
	promise_executor(accept: (value: void | PromiseLike<void>) => void, reject: PromiseExecutorRejectCallback) {
		void reject;
		this.promise_accept = accept;
		this.callback = this.on_result.bind(this);
	}
	on_result(value: void | PromiseLike<void>) {
		this.m_promise = null;
		if(this.promise_accept) this.promise_accept(value);
	}
	fire() {
		let callback = this.callback;
		if(callback) callback();
	}
}
export class AsyncTimeoutTarget extends PromiseTimeoutTarget {
	wait() {
		return this.get_promise();
	}
}
type BaseNodeParent = {
	remove_child(v: BaseNode): void;
};

class BaseNode {
	parent: BaseNodeParent | null;
	constructor() {
		this.parent = null;
	}
	set_parent(parent: BaseNodeParent | null) {
		this.parent = parent;
	}
	remove() {
		if(this.parent) this.parent.remove_child(this);
	}
	run() {
		// do nothing
	}
	destroy() {
		this.remove();
	}
}
class BaseTimeoutNode extends BaseNode {
	timeout;
	constructor(timeout: number | undefined) {
		super();
		this.timeout = timeout;
	}
	get_timeout() {
		return this.timeout;
	}
}
class TimeoutIdNode extends BaseTimeoutNode {
	id: number | null;
	m_is_timeout: boolean;
	constructor(id: number | null = null, is_timeout_flag: boolean) {
		super(void 0);
		this.id = id;
		this.m_is_timeout = is_timeout_flag;
	}
}
class TimeoutNode extends BaseTimeoutNode {
	id: number | null | undefined;
	target: AbstractTarget | null;
	constructor(timeout = 0) {
		super(timeout);
		this.id = null;
		this.target = null;
	}
	set_target(target: any) {
		this.target = target;
	}
	set() {
		this.id = setInterval(this.run.bind(this), this.timeout);
	}
	start(target: AbstractTarget | null | undefined) {
		if(target) this.target = target;
		this.set();
	}
	run() {
		this.id = null;
		this.remove();
	}
	destroy() {
		if(this.id !== null) clearTimeout(this.id);
	}
}
class IntervalNode extends BaseTimeoutNode {
	id: number | null | undefined;
	target: AbstractTarget | null;
	constructor(timeout = 0) {
		super(timeout);
		this.id = null;
		this.target = null;
	}
	set() {
		this.id = setInterval(this.run.bind(this), this.timeout);
	}
	set_target(target: any): void {
		this.target = target;
	}
	start(target: AbstractTarget | null) {
		if(target) this.set_target(target);
		this.set();
	}
	destroy() {
		if(this.id !== null) clearInterval(this.id);
	}
}
export class AsyncTimeoutNode extends TimeoutNode {
	run() {
		super.run();
		if(this.target) this.target.fire();
	}
	start_async(target: AsyncTimeoutTarget | null) {
		if(target) {
			this.target = target;
			this.set();
			return target.wait();
		}
		throw new Error("unable to start_async without anything to wait for");
	}
}
export class AsyncNodeRoot {
	children: BaseNode[];
	constructor() {
		this.children = [];
	}
	set(target_fn: () => void, timeout: number, repeat = false) {
		let node: TimeoutNode | IntervalNode;
		if(repeat) {
			node = new TimeoutNode(timeout);
		} else {
			node = new IntervalNode(timeout);
		}
		this.append_child(node);
		node.start({
			fire() {
				target_fn();
			}
		});
	}
	append_raw(timeout_id: number, is_timeout_id: boolean) {
		this.append_child(new TimeoutIdNode(timeout_id, is_timeout_id));
	}
	append_child(record: BaseNode): void {
		record.remove();
		record.set_parent(this);
		this.children.push(record);
	}
	remove_child(record: BaseNode) {
		let index = this.children.indexOf(record);
		this.children.splice(index, 1);
		record.set_parent(null);
	}
	destroy() {
		let item = this.children.shift();
		if(!item) return;
		do {
			console.log('timer destroy', item);
			item.destroy();
			item = this.children.shift();
		} while(item);
	}
}
export class AverageRatioRoot {
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
		if(ratio_calc) return ratio_calc.can_average();
	}
	get_average(key: string) {
		let ratio_calc = this.map.get(key);
		if(ratio_calc) return ratio_calc.get_average();
		return 0;
	}
	push_ratio([key, ratio_obj]: [key: string, ratio_obj: AverageRatio]) {
		this.ordered_keys.push(key);
		this.map.set(key, ratio_obj);
	}
	push(value: number) {
		let cur = this.map.get(this.ordered_keys[0]);
		if(!cur) return;
		let res = cur.add(value, true, false);
		for(let i = 1;i < this.ordered_keys.length;i++) {
			let debug = false;
			let key = this.ordered_keys[i];
			cur = this.map.get(key);
			if(!cur) continue;
			let prev = this.map.get(this.ordered_keys[i - 1]);
			if(!prev) continue;
			if(key === '30min') debug = true;
			res = cur.add(prev.get_average(), res, debug);
		}
	}
}
export const debug_id_gen = new UniqueIdGenerator;
export const debug_id_syms: WeakRef<SymbolRef>[] = [];
void next_debug_id;
void AbstractBox;
const auto_buy_obj = new AutoBuy;
function map_to_tuple(this: never, e: string, i: string | number) {
	return [e, this[i]];
}
function to_tuple_arr(keys: string[], values: number[]) {
	return keys.map(map_to_tuple, values);
}
function promise_set_timeout(timeout: number | undefined, a: TimerHandler) {
	setTimeout(a, timeout);
}
function do_async_wait(timeout: never) {
	return new Promise(promise_set_timeout.bind(null, timeout));
}
void do_async_wait;
export function array_sample_end(arr: string[], rem_target_len: number) {
	arr = arr.slice(-300);
	let rem_len = char_len_of(arr);
	while(rem_len > rem_target_len) {
		let cur = arr.shift();
		if(!cur) break;
		rem_len -= cur.length + 1;
	}
	return arr;
}
function char_len_of(arr: string[]) {
	return arr.reduce((a: number, b: string) => a + b.length, 0) + arr.length;
}
export function lightreset_inject() {
	window.g_auto_buy.state_history_clear_for_reset();
	window.g_auto_buy.skip_save = true;
	window.addEventListener('unload', function() {
		window.g_auto_buy.skip_save = false;
		localStorage.auto_buy_timeout_str = "300,300,300,300";
		localStorage.long_wait = (6000 * 2);
	});
	let original = window.g_auto_buy.original_map.get('lightreset');
	if(original) original();
}
export function specialclick_inject(that: number) {
	if(window.allspec[that].done == undefined) window.allspec[that].done = false;
	if(window.allspec[that].cost <= window.totalAtome && window.allspec[that].done == false) {
		let specialsbought_e = window.doc.getElementById('specialsbought');
		let atomsinvest_e = window.doc.getElementById('atomsinvest');
		if(!specialsbought_e || !atomsinvest_e) throw new Error("Invalid");
		specialsbought_e.innerText = window.rounding(++window.specialsbought, false, 0);
		if(that == 74) {
		}
		window.atomsinvest += window.allspec[that].cost;
		atomsinvest_e.innerText = window.rounding(window.atomsinvest, false, 0);
		window.allspec[that].done = true;
		window.totalAtome -= window.allspec[that].cost;
		var diff1 = window.calcDiff(that);
		for(var a in window.arUnit[that][17]) window.arUnit[that][17][a] *= 100;
		window.arUnit[that][5] *= 100;
		var spec_aps = 0;
		if(window.arUnit[that][4] > 0) {
			spec_aps = (window.calcDiff(that) - diff1);
			window.atomepersecond += spec_aps;
		}
		//spell:ignore noti plurials
		if(window.noti) window.gritter('Power-up !', window.toTitleCase(window.plurials(window.arrayNames[that])) + " X100 APS", null, "+" + window.rounding(spec_aps, false, 0) + " APS", "");
		//spell:ignore updateprogress
		window.updateprogress(that);
		$('#spec' + that).remove();
		(that < 74) ? window.seeUnit(that + 1) : window.seeUnit(that - 1);
		window.seeUnit(that);
		//spell:ignore checkspec
		window.checkspec();
		//spell:ignore achiSpec
		window.achiSpec();
	}
}
void ProxyHandlers;
function reload_if_def(obj: {[x: string]: any;}, key: string | number) {
	if(obj[key]) {
		location.reload();
		document.body.innerHTML = "";
		document.head.innerHTML = "";
		document.documentElement.innerHTML = "";
		return true;
	}
	return false;
}
function got_jquery(value: any) {
	Object.defineProperty(window, '$', {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
	use_jquery();
}
function use_jquery() {
	let jq = window.$;
	if(!jq) return;
	let res = jq('head');
	let r_proto = Object.getPrototypeOf(res);
	r_proto.lazyload = function(...a: any) {}
	return jq;
}
void reload_if_def;
function proxy_jquery() {
	let val = use_jquery();
	Object.defineProperty(window, '$', {
		get() {
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
function pace_finish_proxy_apply(func: Function, this_v: any, args: ArrayLike<any>) {
	auto_buy_obj.init();
	window.Pace.bar.finish = func;
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
function remove_cint_item(cint_arr: any[], cint_item: undefined) {
	let idx = cint_arr.indexOf(cint_item);
	cint_arr.splice(idx, 1);
}
function wait_for_game_data(cint_item = null) {
	if(cint_item) {
		remove_cint_item(cint_arr, cint_item);
	}
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		let cint_item = [0, -1];
		let cint = setTimeout(wait_for_game_data, 0, cint_item);
		cint_item[1] = cint;
		cint_arr.push(cint_item.join(","));
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
function dom_add_elm_filter(elm: HTMLScriptElement | null) {
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
	let adsbygoogle = window.adsbygoogle;
	let new_arr = [] as unknown as {op: any; push(v: number): void;};
	window.adsbygoogle = new_arr;
	adsbygoogle.op = adsbygoogle.push;
	adsbygoogle.push = function(e: any) {
		adsbygoogle.op(e);
		remove_bad_dom_script_element();
	};
	var prev_node_prototype_insertBefore = Node.prototype.insertBefore;
	document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
	Node.prototype.insertBefore = (<any>function <T extends Node>(this: T, node: T, child: Node | null, ...rest: []) {
		console.assert(rest.length === 0, "unexpected arguments for overwritten Node.prototype.insertBefore");
		let should_insert_1, should_insert_2;
		if(node instanceof HTMLScriptElement) {
			should_insert_1 = dom_add_elm_filter(node);
		}
		if(child instanceof HTMLScriptElement) {
			should_insert_2 = dom_add_elm_filter(child);
		}
		if(!should_insert_1 || !should_insert_2) return node;
		return prev_node_prototype_insertBefore.call(this, node, child);
	})
	remove_bad_dom_script_element();
	window.on_on_timers_moved_first = true;
	let move_timers_to_worker = new Promise(move_timers_to_worker_promise_executor);
	move_timers_to_worker.then(on_timers_moved);
	setTimeout(remove_bad_dom_script_element, 0);
	window.document_write_list = new DocumentWriteList;
	window.document_write_list.attach_proxy(document);
	document.stop = function() {};
}
main();
ScriptStateHost.event_target.dispatchEvent({type: 'userscript', state: 'done'});