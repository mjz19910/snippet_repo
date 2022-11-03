import {ArrayBox} from "box/ArrayBox.js";
import {AsyncFunctionBox} from "box/AsyncFunctionBox.js";
import {Box} from "box/Box.js";
import {CSSStyleSheetBox} from "box/CSSStyleSheetBox.js";
import {CSSStyleSheetConstructorBox} from "box/CSSStyleSheetConstructorBox.js";
import {EmptyArrayBox} from "box/EmptyArrayBox.js";
import {Primitives} from "box/Primitives.js";
import {InstructionTypeArrayBox} from "box/InstructionTypeArrayBox.js";
import {InstructionTypeBox} from "box/InstructionTypeBox.js";
import {NewableInstancePack} from "box/NewableInstancePack.js";
import {NoArgsType} from "box/NoArgsType.js";
import {NodeBox} from "box/NodeBox.js";
import {ObjectBox} from "box/ObjectBox.js";
import {StackVMBox} from "box/StackVMBox.js";
import {VoidBox} from "box/VoidBox.js";
import {WindowBox} from "box/WindowBox.js";
import {throw_bad_error} from "ecma_262/lexer/test/throw_bad_error.js";
import {DomInstructionType} from "vm/dom_instruction/DomInstructionType.js";
import {DomTaggedPack} from "vm/dom_instruction/DomTaggedPack.js";
import {Append} from "vm/instruction/Append.js";
import {Cast} from "vm/instruction/Cast.js";
import {Breakpoint} from "vm/instruction/debug/Breakpoint.js";
import {Call} from "vm/instruction/general/Call.js";
import {Construct} from "vm/instruction/general/Construct.js";
import {Get} from "vm/instruction/general/Get.js";
import {Return} from "vm/instruction/general/Return.js";
import {InstructionOpcodesList} from "vm/instruction/InstructionOpcodesList.js";
import {InstructionType} from "vm/instruction/InstructionType.js";
import {Je} from "vm/instruction/jump/Je.js";
import {Jump} from "vm/instruction/jump/Jump.js";
import {ModifyOperand} from "vm/instruction/ModifyOperand.js";
import {Nop} from "vm/instruction/Nop.js";
import {PushWindowObject} from "vm/instruction/push/WindowObject.js";
import {Drop} from "vm/instruction/stack/Drop.js";
import {Dup} from "vm/instruction/stack/Dup.js";
import {Push} from "vm/instruction/stack/Push.js";
import {Halt} from "vm/instruction/turing/Halt.js";
import {VMBlockTrace} from "vm/instruction/vm/VMBlockTrace.js";
import {VMPushIP} from "vm/instruction/vm/VMPushIP.js";
import {VMPushSelf} from "vm/instruction/vm/VMPushSelf.js";
import {StackVMFlags} from "vm/StackVMFlags.js";
import {StackTraceType} from "./StackTraceType.js";
import {DomExecDescription} from "./typedef.js";
import {WithId} from "./WithId.js";
import {DocumentBox} from "box/DocumentBox.js";

// ==UserScript==
// @name			rebuild the universe auto
// @namespace		http://tampermonkey.net/
// @version			0.3
// @description		rebuildtheuniverse.com automation
// @author			You
// @match			http://rebuildtheuniverse.com/?type=real
// @match			http://rebuildtheuniverse.com/?type=mjz_version
// @match			http://rebuildtheuniverse.com
// @match			https://rebuildtheuniverse.com/?type=real
// @match			https://rebuildtheuniverse.com/?type=mjz_version
// @match			https://rebuildtheuniverse.com
// @match			https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/
// @match			https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=inject
// @match			https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=mjz_version
// @match			https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=real
// @run-at			document-start
// @grant			none
// ==/UserScript==


console=window.console;

const AUDIO_ELEMENT_VOLUME=0.58;
const AudioMuted=true;

const AutoBuyMulModifierFactor=1;
const AutoBuyRatioDiv=4;

const LOG_LEVEL_CRIT=1;
const LOG_LEVEL_ERROR=2;
const LOG_LEVEL_WARN=3;
const LOG_LEVEL_NOTICE=4;
const LOG_LEVEL_INFO=5;
const LOG_LEVEL_DEBUG=6;
const LOG_LEVEL_TRACE=7;

let local_logging_level=3;
let LogErrorAsConsoleError=false;
function append_console_message(level: number,format_str: string,...args: any[]) {
	update_logger_vars();
	const level_str=human_log_level(level);
	if(level_str!=='unknown') {
		format_str="[%s] "+format_str;
	} else {
		format_str="[%o:%s] "+format_str;
	}
	if(level>=LOG_LEVEL_ERROR) {
		if(LogErrorAsConsoleError) {
			console.error(format_str,level_str,...args);
		} else {
			console.info(format_str,level_str,...args);
		}
	} else if(level===LOG_LEVEL_WARN) {
		console.warn(format_str,level_str,...args);
	} else if(level===LOG_LEVEL_NOTICE) {
		console.log(format_str,level_str,...args);
	} else if(level_str==='unknown') {
		console.info(format_str,level,level_str,...args);
	} else {
		console.info(format_str,level_str,...args);
	}
	// i ignore debug messages to avoid 20k timeout took too long messages
	// trace includes a stack trace, not what i want
}
function human_log_level(level: number) {
	switch(level) {
		case LOG_LEVEL_CRIT: return 'crit';
		case LOG_LEVEL_ERROR: return 'error';
		case LOG_LEVEL_WARN: return 'warn';
		case LOG_LEVEL_NOTICE: return 'notice';
		case LOG_LEVEL_INFO: return 'info';
		case LOG_LEVEL_DEBUG: return 'debug';
		case LOG_LEVEL_TRACE: return 'trace';
		default: return 'unknown';
	}
}
function log_if(level: number,format_str: string,...args: any[]) {
	if(level>local_logging_level) return;
	append_console_message(level,format_str,...args);
}
function update_logger_vars() {
	if(sessionStorage.LogErrorAsConsoleError) {
		LogErrorAsConsoleError=sessionStorage.LogErrorAsConsoleError==='true';
	}
	if(sessionStorage.LoggingLevel) {
		local_logging_level=parseInt(sessionStorage.LoggingLevel,10);
	}
}
function trigger_debug_breakpoint() {
	debugger;
}
class CSSStyleSheetConstructorBoxImpl implements CSSStyleSheetConstructorBox {
	type: "constructor_box"="constructor_box";
	arguments: '[options?: CSSStyleSheetInit | undefined]';
	args_type: NoArgsType;
	m_verify_name: 'CSSStyleSheetConstructorBox';
	from: "javascript"="javascript";
	instance_type: "CSSStyleSheet"="CSSStyleSheet";
	constructor_type: "CSSStyleSheet"="CSSStyleSheet";
	value: typeof CSSStyleSheet;
	constructor(value: typeof CSSStyleSheet) {
		this.arguments='[options?: CSSStyleSheetInit | undefined]';
		this.args_type=new NoArgsType;
		this.m_verify_name='CSSStyleSheetConstructorBox';
		this.value=value;
	}
	verify_name(name: "CSSStyleSheetConstructorBox"): boolean {
		return this.m_verify_name==='CSSStyleSheetConstructorBox'&&name==='CSSStyleSheetConstructorBox';
	}
	as_type(input_typeof: string): this|null {
		switch(typeof this.value) {
			case "bigint": return input_typeof==="bigint"? this:null;
			case "boolean": return input_typeof==="boolean"? this:null;
			case "function": return input_typeof==="function"? this:null;
			case "number": return input_typeof==="number"? this:null;
			case "object": return input_typeof==="object"? this:null;
			case "string": return input_typeof==="string"? this:null;
			case "symbol": return input_typeof==="symbol"? this:null;
			case "undefined": return input_typeof==="undefined"? this:null;
		}
	}
	on_get(_vm: StackVM,key: string) {
		console.log('get','CSSStyleSheetConstructorBox',key);
	}
	factory() {
		return new CSSStyleSheetBoxImpl(new this.value);
	}
}
class CSSStyleSheetBoxImpl implements CSSStyleSheetBox {
	type: "instance_box";
	m_verify_name: "CSSStyleSheetBox";
	instance_type: "CSSStyleSheet";
	value: CSSStyleSheet;
	constructor(value: CSSStyleSheet) {
		this.type='instance_box';
		this.m_verify_name='CSSStyleSheetBox';
		this.instance_type='CSSStyleSheet';
		this.value=value;
	}
	verify_name(name: "CSSStyleSheetBox"): boolean {
		return this.m_verify_name==='CSSStyleSheetBox'&&name==='CSSStyleSheetBox';
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
class PromiseBoxImpl {
	type: "promise_box";
	await_type: "Box";
	inner_type: "Promise<Box>";
	value: Promise<Box>;
	constructor(value: Promise<Box>) {
		this.type='promise_box';
		this.await_type='Box';
		this.inner_type='Promise<Box>';
		this.value=value;
	}
	as_type(input_typeof: string): [true,this]|[false,null] {
		return typeof this.value===input_typeof? [true,this]:[false,null];
	}
}
class StackVMBoxImpl implements StackVMBox {
	type: "custom_box";
	box_type: "StackVM";
	m_verify_name: "StackVMBox";
	value: StackVM;
	constructor(value: StackVM) {
		this.type='custom_box';
		this.box_type='StackVM';
		this.m_verify_name='StackVMBox';
		this.value=value;
	}
	verify_name(name: "StackVMBox") {
		return this.m_verify_name==='StackVMBox'&&name==='StackVMBox';
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
class WindowBoxImpl implements WindowBox {
	type: "object_box";
	extension: null;
	inner_type: "Window";
	m_verify_name: "WindowBox";
	value: Window;
	constructor(value: Window) {
		this.type='object_box';
		this.extension=null;
		this.inner_type='Window';
		this.m_verify_name='WindowBox';
		this.value=value;
	}
	verify_name(name: "WindowBox") {
		return this.m_verify_name==='WindowBox'&&name==='WindowBox';
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
class ObjectBoxImpl implements ObjectBox {
	type: "object_box";
	m_verify_name: "ObjectBox";
	inner_type: "Record<never, never>";
	extension=null;
	value: Record<never,never>;
	constructor(value: Record<never,never>) {
		this.type='object_box';
		this.m_verify_name='ObjectBox';
		this.inner_type='Record<never, never>';
		this.extension=null;
		this.value=value;
	}
	verify_name(name: "ObjectBox"): boolean {
		return this.m_verify_name==='ObjectBox'&&name==='ObjectBox';
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
class NewableFunctionBoxImpl {
	value: NewableInstancePack<{}>;
	class_value: new (...a: Box[]) => {};
	constructor(factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {}) {
		this.value=factory_value;
		this.class_value=class_value;
	}
	on_get(_vm: StackVM,key: string) {
		console.log('get','newable function',this.value,key);
	}
	factory(...args: Box[]) {
		return this.value(this.class_value,args);
	}
}
class InstructionCallImpl {
	type: 'call';
	constructor() {
		this.type='call';
	}
	debug: boolean=false;
	handle_as_fn_box(vm: StackVM,fn_box: Box,target_this: Box,arg_arr: Box[]) {
		if(typeof fn_box!='object') {
			throw new Error("Bad");
		}
		if(fn_box===null) {
			throw new Error("Bad");
		}
		if(typeof target_this!='object') {
			throw new Error("Bad");
		}
		if(target_this===null) {
			throw new Error("Bad");
		}
		if('return_type' in fn_box) {
			if(fn_box.return_type=='promise_box') {
				return this.handle_as_fn_impl_promise_box(vm,fn_box.value,target_this,arg_arr);
			} else if(fn_box.return_type===null) {
				console.log('fixme: make a type for this',fn_box);
				return this.handle_as_fn_impl_box(vm,fn_box.value,target_this,arg_arr);
			}
		} else {
			console.log('unexpected box value',fn_box);
			throw new Error("Unexpected function box type");
		}
	}
	unbox_obj(object_box: Exclude<Box,Primitives>): {}|Function|StackVM|null {
		if(object_box===null) return null;
		if(object_box.type==='object_box') {
			const {type,value,...rest}=object_box;
			if(Object.keys(rest).length>0) {
				console.log('other enumerable on box',rest);
			}
			return value;
		}
		if(object_box.type==='instance_box') {
			const {type,value,...rest}=object_box;
			if(Object.keys(rest).length>0) {
				console.log('other enumerable on box',rest);
			}
			return value;
		}
		if(object_box.type==='custom_box') {
			const {type,value,box_type,...rest}=object_box;
			if(box_type==='StackVM') {
				return value;
			}
			if(Object.keys(rest).length>0) {
				console.log('other enumerable on box',rest);
			}
			console.log('unbox custom_box',{type,box_type},rest);
			throw 1;
		}
		console.log('unbox',object_box);
		throw 1;
	}
	unbox_arr(arg_arr: Box[]) {
		let arr: ({}|Function|StackVM|Primitives|null)[]=[];
		for(let i=0;i<arg_arr.length;i++) {
			let cur=arg_arr[i];
			if(typeof cur==='string') {
				arr.push(cur);
			} else if(typeof cur==='function') {
				arr.push(cur);
			} else if(typeof cur==='object') {
				let cur_value=this.unbox_obj(cur);
				arr.push(cur_value);
			} else {
				console.log('unbox_arr item non object',cur);
				arr.push(cur);
			}
		}
		return arr;
	}
	handle_as_fn_impl_promise_box(vm: StackVM,fn_value: (...a: Box[]) => Promise<Box>,target_this: Exclude<Box,Primitives>,arg_arr: Box[]) {
		let real_this=this.unbox_obj(target_this);
		let ret=fn_value.apply(real_this,arg_arr);
		let ret_box: {type: 'temporary_box'; source: 'call'; extension: null; value: any;}={
			type: 'temporary_box',
			source: 'call',
			extension: null,
			value: ret
		};
		vm.stack.push(ret_box as unknown as Box);
	}
	handle_as_fn_impl_box(vm: StackVM,fn_value: (...a: Box[]) => Box,target_this: Exclude<Box,Primitives>,arg_arr: Box[]) {
		let real_this=this.unbox_obj(target_this);
		let ret=fn_value.apply(real_this,arg_arr);
		let ret_box: {type: 'temporary_box'; source: 'call'; extension: null; value: any;}={
			type: 'temporary_box',
			source: 'call',
			extension: null,
			value: ret
		};
		vm.stack.push(ret_box as unknown as Box);
	}
	handle_as_obj(vm: StackVM,fn_obj: Exclude<Box,Primitives|null>,target_this: Exclude<Box,Primitives>,arg_arr: Box[]) {
		let raw_fn=fn_obj.as_type('function');
		if(!raw_fn) {
			throw new Error("Unreachable (type of value is not 'function')");
		} else if(raw_fn.type==='function_box') {
			if(raw_fn.return_type===null) {
				return this.handle_as_fn_impl_box(vm,raw_fn.value,target_this,arg_arr);
			}
		} else if(raw_fn.type=='constructor_box') {
			throw new Error("Unexpected constructor");
		} else {
			throw new Error("Unreachable (type of value is never)");
		}
	}
	run(vm: StackVM,instruction: Call) {
		let number_of_arguments=instruction[1];
		if(typeof number_of_arguments!='number') throw new Error("Invalid");
		if(number_of_arguments<=1) {
			throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
		}
		let [target_this,value_box,...arg_arr]=vm.pop_arg_count(number_of_arguments);
		if(typeof target_this!=='object') {
			throw new Error("Need to box into js objects to use as this object");
		}
		if(this.debug) {
			console.log('VM: call',target_this,'fn box',value_box,arg_arr);
		}
		if(value_box===void 0) {
			console.info('VM Error: Processing call instruction',instruction,target_this,value_box,arg_arr);
			throw new Error("Tried to call undefined");
		}
		if(typeof value_box==='string') {
			console.info('VM Error: Processing call instruction',instruction,target_this,value_box,arg_arr);
			throw new Error("Tried to call a string(your asm code is outdated)");
		}
		if(typeof value_box==='function') {
			if(this.debug) console.log('function is not boxed',value_box);
			return this.handle_as_fn_impl_promise_box(vm,value_box,target_this,arg_arr);
		} else if(value_box===null) {
			throw new Error("Invalid");
		} else if(typeof value_box==='object'&&value_box.type==='void') {
			throw new Error("Attempt to call a void value");
		} else {
			if(typeof value_box==='object') {
				console.log('VM: call error value_box not handled',typeof value_box,value_box,value_box.value);
				this.handle_as_obj(vm,value_box,target_this,arg_arr);
			}
			console.log('VM: call invalid value',typeof value_box,value_box);
			throw new Error("Invalid");
		}
	}

}
class InstructionConstructImpl {
	type: 'construct';
	constructor() {
		this.type='construct';
	}
	run(vm: StackVM,ins: Construct) {
		let number_of_arguments=ins[1];
		if(typeof number_of_arguments!='number') throw new Error("Invalid");
		let [construct_target,...construct_arr]=vm.pop_arg_count(number_of_arguments);
		const a=construct_target;
		if(typeof a!='object') throw new Error("Invalid");
		if(a===null) throw new Error("Invalid");
		if(a.type!='constructor_box') throw new Error("Invalid");
		if(a.instance_type===null) {
			let obj=a.factory(...construct_arr);
			vm.stack.push(obj);
		} else if(a.instance_type==='CSSStyleSheet') {
			let valid_args: {s: [options?: CSSStyleSheetInit|undefined],valid_count: 1;}|{s: [],valid_count: 0;}={
				s: [],
				valid_count: 0
			};
			for(let i=0;i<construct_arr.length;i++) {
				let val=construct_arr[i];
				if(typeof val!='object') continue;
				if(val===null) continue;
				if(val.type!='shape_box') continue;
				valid_args={
					s: [val.value],
					valid_count: 1
				};
			}
			let obj=new a.value(...valid_args.s);
			vm.stack.push(new CSSStyleSheetBoxImpl(obj) as unknown as Box);
		}
		log_if(LOG_LEVEL_INFO,"",ins,...vm.stack.slice(vm.stack.length-number_of_arguments));
	}
}
class InstructionCastImpl {
	type: 'cast';
	debug: boolean;
	constructor() {
		this.type='cast';
		this.debug=false;
	}
	cast_to_type(vm: StackVM,obj: Exclude<Box,Primitives>) {
		if(obj?.type==='custom_box'&&obj.box_type==='StackVM') {
			throw new Error("TODO: cast to type");
		}
		if(obj?.type==='object_box') {
			console.warn('box does not contain a function',obj);
			throw 1;
		}
		if(obj?.type) {
			console.warn('unk box',obj);
			throw 1;
		}
		if(typeof obj!=='object'&&typeof obj!=='function') {
			throw 1;
		}
		if(obj===null) {
			throw 1;
		}
		console.warn('unk obj boxed into temporary_box<object_index>',obj);
	}
	run(vm: StackVM,instruction: Cast) {
		let obj=vm.stack.pop();
		if(!obj) throw new Error("Invalid");
		if(this.debug) {
			console.log('VM: cast',instruction[1],obj);
		}
		if(typeof obj!='object') throw new Error("Invalid");
		switch(instruction[1]) {
			case 'object_index': break;
			default: throw new Error("Missing cast to "+instruction[1]);
		}
		let cast_type=instruction[1];
		if(cast_type!=='object_index') {
			throw new Error(`Unsupported operation: Cast(${cast_type})`);
		}
		this.cast_to_type(vm,obj);
	}
}
class InstructionJeImpl {
	type: 'je';
	constructor() {
		this.type='je';
	}
	run(vm: StackVM,instruction: Je) {
		let [,target]=instruction;
		if(typeof target!='number') throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Jump target is out of instructions range");
		}
		if(vm.flags.equal) {
			vm.instruction_pointer=target;
		}
	}
}
class InstructionJmpImpl {
	type: 'jmp';
	constructor() {
		this.type='jmp';
	}
	run(vm: StackVM,instruction: Jump) {
		let [,target]=instruction;
		if(typeof target!='number') throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Jump target is out of instructions range");
		}
		vm.instruction_pointer=target;
	}
}
class InstructionModifyOpImpl {
	type: 'modify_operand';
	constructor() {
		this.type='modify_operand';
	}
	run(vm: StackVM,instruction: ModifyOperand) {
		let [,target,offset]=instruction;
		if(typeof target!='number') throw new Error("Invalid");
		if(typeof offset!='number') throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Destination is out of instructions range");
		}
		let instruction_1=vm.instructions[target];
		let instruction_modify: [string,...any[]]=instruction_1;
		let value=null;
		if(vm instanceof StackVM) {
			value=vm.stack.pop();
		} else {
			console.info("TODO if instanceof StackVM is not enough");
			throw new Error("Unreachable");
		}
		if(instruction_modify===void 0) throw new Error("Invalid");
		instruction_modify[offset]=value;
		let valid_instruction=StackVMParser.verify_instruction(instruction_modify);
		vm.instructions[target]=valid_instruction;
	}
}
class InstructionVMPushIPImpl {
	type: "vm_push_ip";
	constructor() {
		this.type='vm_push_ip';
	}
	run(vm: StackVM,_ins: VMPushIP) {
		if(!vm.hasOwnProperty('push')) {
			throw new Error("push_pc requires a stack");
		} else if(vm instanceof StackVM) {
			vm.stack.push(vm.instruction_pointer);
		} else {
			console.info('TODO: add instanceof check to push_pc');
			throw new Error("Property missing or invalid");
		}
	}
}
class InstructionPushImpl {
	type: 'push';
	constructor() {
		this.type='push';
	}
	run(vm: StackVM,instruction: Push) {
		for(let i=0;i<instruction.length-1;i++) {
			let item=instruction[i+1];
			vm.stack.push(item);
		}
	}
}
class InstructionDupImpl {
	type: 'dup';
	constructor() {
		this.type='dup';
	}
	run(vm: StackVM,_ins: Dup) {
		if(vm.stack.length===0) throw new Error("stack underflow");
		vm.stack.push(vm.stack.at(-1));
	}
}
function use_never_type(value: never) {
	console.log('used never type',value);
}
class InstructionGetImpl {
	type: 'get';

	constructor() {
		this.type='get';
	}

	on_get(vm: StackVM,value_box: Exclude<Box,Primitives|null>,key: string|number) {
		switch(value_box.type) {
			case 'array_box': {
				if(typeof key==='number') {
					this.array_box_handle_num(value_box,key,vm);
					return;
				} else {
					let key_alt=parseInt(key,10);
					if(Number.isNaN(key_alt)) throw new Error("Failed to parse int");
					this.array_box_handle_num(value_box,key_alt,vm);
					return;
				}
			}
			case 'constructor_box': {
				switch(value_box.instance_type) {
					case 'CSSStyleSheet':
						if(typeof key!='string') throw new Error("Bad");
						new CSSStyleSheetConstructorBoxImpl(value_box.value).on_get(vm,key);
						break;
					case null: {
						new NewableFunctionBoxImpl(value_box.value,value_box.class_value);
					} break;
				}
			} break;
			default: console.log('on_get no handler',value_box.type);
		}
	}

	array_box_handle_num(value_box: EmptyArrayBox|ArrayBox|InstructionTypeArrayBox,key: number,vm: StackVM) {
		switch(value_box.item_type) {
			case 'Box': {
				let res=value_box.value[key];
				vm.stack.push(res);
			} break;
			case 'instruction_type[]': {
				let res=value_box.value[key];
				vm.stack.push(new InstructionTypeBox(res));
			} break;
			case null: {
				let verify_type: 'EmptyArrayBox'=value_box.m_verify_name;
				if(verify_type!=='EmptyArrayBox') {
					use_never_type(verify_type);
				}
				let res=value_box.value[key];
				vm.stack.push(res);
			}
		}
	}

	run(vm: StackVM,_ins: Get) {
		let get_key=vm.stack.pop();
		let value_box=vm.stack.pop();
		if(!value_box) throw new Error("Invalid");
		if(typeof get_key!='string') throw new Error("Invalid");
		if(typeof value_box!='object') throw new Error("Invalid");
		this.on_get(vm,value_box,get_key);
		throw new Error("Update types");
	}
}
class InstructionHaltImpl {
	type: 'halt'='halt';
	run(vm: StackVM,_i: Halt) {
		vm.halt();
	}
}
class InstructionReturnImpl {
	type: 'return'='return';
	run(vm: StackVM,_i: Return) {
		if(vm.stack.length>0) {
			vm.return_value=vm.stack.pop();
		} else {
			throw new Error("Stack underflow on return");
		}
	}
}
class InstructionBreakpointImpl {
	type: 'breakpoint'='breakpoint';
	run(vm: StackVM,_i: Breakpoint) {
		console.log(vm.stack);
		trigger_debug_breakpoint();
	}
}
class InstructionPushVMObjImpl {
	type: "vm_push_self"="vm_push_self";
	run(vm: StackVM,_i: VMPushSelf) {
		vm.stack.push(new StackVMBoxImpl(vm));
	}
}
class InstructionPushGlobalObjectImpl {
	type: 'push_global_object'='push_global_object';
	run(vm: StackVM,_i: PushWindowObject) {
		vm.stack.push(new WindowBoxImpl(window));
	}
}
class InstructionPeekImpl {
	type: 'peek'='peek';
	debug=false;
	run(vm: StackVM,ins: [any,any]) {
		let [,distance]=ins;
		let base_ptr=vm.base_ptr;
		if(base_ptr===null) base_ptr=0;
		if(typeof vm.frame_size!=='number') {
			console.log('vm',vm);
			throw new Error("Require frame size");
		}
		let offset=base_ptr-distance-vm.frame_size-1;
		let at=vm.stack[offset];
		vm.stack.push(at);
		if(this.debug) console.log('VM: peek',ins,'value',at,'index',offset,vm.stack.length-offset);
	}
}
class InstructionAppendImpl {
	type: "append"="append";
	run(vm: StackVM,_i: Append) {
		if(vm.stack.length<=0) {
			throw new Error('stack underflow');
		}
		let target=vm.stack.pop();
		if(vm.stack.length<=0) {
			throw new Error('stack underflow');
		}
		let append_obj=vm.stack.pop();
		if(typeof append_obj!='object') throw new Error("Element to append not object");
		if(typeof target!='object') {
			console.log(target,append_obj,vm.stack.slice());
			throw new Error("Element target not object");
		}
		if(append_obj===null) throw 1;
		if(target===null) throw 1;
		if(append_obj.type==='instance_box'&&append_obj.m_verify_name==='InstructionTypeBox') throw 1;
		if(!(append_obj.type==='instance_box'&&append_obj.instance_type==='Node')) throw 1;
		if(target.type==='instance_box'&&target.m_verify_name==='InstructionTypeBox') throw 1;
		if(!(target.type==='instance_box'&&target.instance_type==='Node')) throw 1;
		if(append_obj.from!=='create') console.warn('append_obj not user created',append_obj);
		target.value.appendChild(append_obj.value);
	}
}
class InstructionPushArgsImpl {
	type: 'vm_push_args'='vm_push_args';
	run(_vm: StackVM,_i: never) {
		throw new Error("Instruction not supported");
	}
}
class InstructionDropImpl {
	type: 'drop'='drop';
	run(vm: StackVM,_i: Drop) {
		vm.stack.pop();
	}
}
class InstructionVMReturnImpl {
	type: 'vm_return'='vm_return';
	debug=false;
	run(vm: StackVM,_i: Return) {
		let start_stack=vm.stack.slice();
		if(vm.base_ptr===null) {
			vm.running=false;
			return;
		}
		if(vm.base_ptr!=vm.stack.length) {
			console.log('TODO: support returning values');
			vm.stack.length=vm.base_ptr;
		}
		let ip=vm.stack.pop();
		let bp=vm.stack.pop();
		if(typeof ip!='number') throw new Error("Invalid stack frame");
		if(typeof bp!='number') throw new Error("Invalid stack frame");
		vm.instruction_pointer=ip;
		vm.base_ptr=bp;
		if(this.debug) console.log('vm return',vm.base_ptr,start_stack,vm.stack.slice());
	}
}
class InstructionVMCallImpl {
	type: 'vm_call'='vm_call';
	run(vm: StackVM,ins: Call) {
		let prev_base=vm.base_ptr;
		vm.stack.push(vm.base_ptr,vm.instruction_pointer);
		vm.base_ptr=vm.stack.length;
		vm.jump_instruction_pointer=ins[1];
		console.log('vm vm_call',ins[1],'stk',vm.base_ptr,prev_base,vm.stack.slice());
	}
}
class InstructionNopImpl {
	type: 'nop'='nop';
	run(_vm: StackVM,_a: Nop) {}
}
class InstructionBlockTraceImpl {
	type: 'vm_block_trace'='vm_block_trace';
	run(_vm: StackVM,_i: VMBlockTrace) {
	}
}
type InstructionList=[
	['append',typeof InstructionAppendImpl],
	['breakpoint',typeof InstructionBreakpointImpl],
	['call',typeof InstructionCallImpl],
	['cast',typeof InstructionCastImpl],
	['construct',typeof InstructionConstructImpl],
	['drop',typeof InstructionDropImpl],
	['dup',typeof InstructionDupImpl],
	['get',typeof InstructionGetImpl],
	['halt',typeof InstructionHaltImpl],
	['je',typeof InstructionJeImpl],
	['jmp',typeof InstructionJmpImpl],
	['modify_operand',typeof InstructionModifyOpImpl],
	['nop',typeof InstructionNopImpl],
	['peek',typeof InstructionPeekImpl],
	['push_global_object',typeof InstructionPushGlobalObjectImpl],
	['push',typeof InstructionPushImpl],
	['return',typeof InstructionReturnImpl],
	['vm_block_trace',typeof InstructionBlockTraceImpl],
	['vm_call',typeof InstructionVMCallImpl],
	['vm_push_args',typeof InstructionPushArgsImpl],
	['vm_push_ip',typeof InstructionVMPushIPImpl],
	['vm_push_self',typeof InstructionPushVMObjImpl],
	['vm_return',typeof InstructionVMReturnImpl],
];
const instruction_descriptor_arr: InstructionList=[
	['append',InstructionAppendImpl],
	['breakpoint',InstructionBreakpointImpl],
	['call',InstructionCallImpl],
	['cast',InstructionCastImpl],
	['construct',InstructionConstructImpl],
	['drop',InstructionDropImpl],
	['dup',InstructionDupImpl],
	['get',InstructionGetImpl],
	['halt',InstructionHaltImpl],
	['je',InstructionJeImpl],
	['jmp',InstructionJmpImpl],
	['modify_operand',InstructionModifyOpImpl],
	['nop',InstructionNopImpl],
	['peek',InstructionPeekImpl],
	['push_global_object',InstructionPushGlobalObjectImpl],
	['push',InstructionPushImpl],
	['return',InstructionReturnImpl],
	['vm_block_trace',InstructionBlockTraceImpl],
	['vm_call',InstructionVMCallImpl],
	['vm_push_args',InstructionPushArgsImpl],
	['vm_push_ip',InstructionVMPushIPImpl],
	['vm_push_self',InstructionPushVMObjImpl],
	['vm_return',InstructionVMReturnImpl],
];
class StackVM {
	return_value: Box;
	jump_instruction_pointer: number|null;
	base_ptr: number|null;
	stack: Box[];
	instructions: InstructionType[];
	instruction_pointer: number;
	running: boolean;
	flags: any;
	frame_size: any;
	instruction_map_obj: {};
	create_instruction_map(instruction_desc_arr: InstructionList) {
		let obj={};
		for(let i=0;i<instruction_desc_arr.length;i++) {
			let cur=instruction_desc_arr[i];
			let obj_value=obj as unknown as {[x: string]: any;};
			obj_value[cur[0]]=new cur[1];
		}
		return obj;
	}
	constructor(instructions: InstructionType[]) {
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.running=false;
		this.stack=[];
		this.return_value=void 0;
		this.jump_instruction_pointer=null;
		this.base_ptr=null;
		this.frame_size=2;
		this.flags=new StackVMFlags;
		this.instruction_map_obj=this.create_instruction_map(instruction_descriptor_arr);
	}
	push(value: Box) {
		this.stack.push(value);
	}
	pop() {
		return this.stack.pop();
	}
	peek_at(distance: number) {
		return this.stack.at(-1-distance);
	}
	pop_arg_count(operand_number_of_arguments: number) {
		let arguments_arr=[];
		let arg_count=operand_number_of_arguments;
		for(let i=0;i<arg_count;i++) {
			if(this.stack.length<=0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			arguments_arr.unshift(this.stack.pop());
		}
		return arguments_arr;
	}
	reset() {
		this.running=false;
		this.instruction_pointer=0;
		this.jump_instruction_pointer=null;
		this.base_ptr=null;
		this.return_value=void 0;
		this.stack.length=0;
	}
	is_in_instructions(value: number) {
		return value>=0&&value<this.instructions.length;
	}
	execute_backup_vm_push_ip() {
		this.push.call(this,this.instruction_pointer);
	}
	halt() {
		this.running=false;
	}
	get_instruction(opcode: InstructionOpcodesList[number]) {
		let any_map: any=this.instruction_map_obj;
		return any_map[opcode];
	}
	execute_instruction(instruction: InstructionType) {
		let run=this.get_instruction(instruction[0]);
		run.run(this,instruction);
	}
	run() {
		this.running=true;
		while(this.instruction_pointer<this.instructions.length) {
			let instruction=this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			if(!this.running) break;
			if(this.jump_instruction_pointer===null) this.instruction_pointer++;
			else {
				if(this.is_in_instructions(this.jump_instruction_pointer)) {
					this.instruction_pointer=this.jump_instruction_pointer;
				} else {
					console.error("seg fault, jump target out of range");
					throw new Error("Segmentation fault");
				}
				this.jump_instruction_pointer=null;
			}
			if(this.instruction_pointer>=this.instructions.length) {
				console.log('ins len',this.instructions.length,this.instructions.slice(-8));
				throw new Error("Fell off end of instruction stream");
			}
		}
		if(this.stack.length!==0) {
			console.log('stack',this.stack);
			console.assert(false,"stack length is not zero, unhandled data on stack");
		}
		return this.return_value;
	}
}
class EventHandlerVMDispatch extends StackVM {
	target_obj: any;
	args_arr: Box[]|null;
	constructor(instructions: InstructionType[],target_obj: any) {
		super(instructions);
		this.target_obj=target_obj;
		this.args_arr=null;
	}
	run(...args_arr: Box[]) {
		try {
			this.args_arr=args_arr;
			return super.run();
		} catch(e) {
			console.log('EventHandlerVMDispatch run error',e);
		}
	}
	handleEvent(event: Event) {
		this.reset();
		this.run(new ObjectBoxImpl(event));
	}
}
class StackVMParser {
	static match_regex=/(.+?)(;|$)/gm;
	static parse_int_arg(cur: string[]|number[],arg_loc: number) {
		let cur_item=cur[arg_loc];
		if(typeof cur_item=='string') {
			let arg=cur_item;
			if(arg[3]==='()'[0]&&arg.at(-1)==="()"[1]) {
				let str_int=arg.slice(4,-1);
				cur[arg_loc]=parseInt(str_int,10);
			}
		}
	}
	static parse_string_with_format_ident(str: string|string[],format_list: any[]) {
		let format_index=str.indexOf('%');
		let format_type=str[format_index+1];
		switch(format_type) {
			case 'o':
				return format_list.shift();
			default:
				console.assert(false,"Assertion failed: %s",'unsupported format spec %'+format_type);
		}
	}
	static parse_current_instruction(cur: any[],format_list: any[]) {
		let arg_loc=1;
		let arg=cur[arg_loc];
		while(arg) {
			if(arg.slice(0,3)==='int') this.parse_int_arg(cur,arg_loc);
			if(arg.includes('%')) {
				let res=this.parse_string_with_format_ident(arg,format_list);
				cur[arg_loc]=res;
			}
			arg_loc++;
			arg=cur[arg_loc];
		}
	}
	static raw_parse_handle_regexp_match(m: string[]) {
		let iter=m[1].trim();
		if(iter.startsWith("//")) return null;
		while(iter.startsWith("/*")) {
			let j=iter.indexOf("*/");
			iter=iter.slice(j+2).trim();
		}
		if(!iter) return null;
		return iter.split(",");
	}
	static parse_string_into_raw_instruction_stream(string: string) {
		const parser_max_match_iter=300; let parts,arr=[],i=0;
		do {
			let saved_last=this.match_regex.lastIndex;
			let sub_str=string.slice(this.match_regex.lastIndex);
			let trimmed_str=sub_str.trim();
			let diff_len=sub_str.length-trimmed_str.length;
			if(trimmed_str.startsWith("//")) {
				let com_end=trimmed_str.indexOf("\n");
				if(com_end>-1) {
					this.match_regex.lastIndex=saved_last+diff_len+trimmed_str.indexOf("\n");
				}
			}
			parts=this.match_regex.exec(string);
			if(!parts) break;
			let res=this.raw_parse_handle_regexp_match(parts);
			if(res) arr.push(res);
		} while(parts&&i++<parser_max_match_iter);
		if(parts) console.assert(false,'StackVM Parser: Iteration limit exceeded (limit=%o)',parser_max_match_iter);
		return arr;
	}
	static parse_instruction_stream_from_string(string: string,format_list: any[]) {
		let raw_instructions=this.parse_string_into_raw_instruction_stream(string);
		for(let i=0;i<raw_instructions.length;i++) {
			let raw_instruction=raw_instructions[i];
			this.parse_current_instruction(raw_instruction,format_list);
		}
		let instructions=this.verify_raw_instructions(raw_instructions); return instructions;
	}
	static verify_instruction(instruction: string[]): InstructionType {
		let num_to_parse=instruction.length;
		let ret: InstructionType|null=null;
		switch(instruction[0]) {
			case 'push': {
				num_to_parse=0;
				const [,...push_operands]=instruction;
				ret=[instruction[0],...push_operands];
			} break;
			case 'call'/*1 argument*/: {
				if(typeof instruction[1]==='number'&&Number.isFinite(instruction[1])) {
					num_to_parse-=2;
					ret=[instruction[0],instruction[1]];
				} else {
					console.info("Operand is",instruction[1]);
					throw new Error("Invalid operand");
				}
			} break;
			case 'cast': {
				let m_arg=instruction[1];
				switch(m_arg) {
					case 'object_index':
					case 'vm_function':
						num_to_parse-=2;
						ret=[instruction[0],m_arg];
				}
				if(num_to_parse===0) break;
				throw new Error("Assertion failed: cast operand `"+m_arg+"` is invalid");
			}
			case 'drop':
			case 'dup':
			case 'get':
			case 'return':
			case 'halt':
			case 'vm_push_args':
			case 'vm_push_self':
			case 'push_window_object':
			case 'breakpoint':
			case 'vm_return': {
				num_to_parse--;
				let v_2=instruction[0];
				let v_1: InstructionType[0]=v_2;
				let val: InstructionType=[v_1];
				ret=val;
			} break;
			default: throw new Error("Verify: Unexpected opcode, opcode was `"+instruction[0]+"`");
		}
		if(num_to_parse>0) throw new Error("Typechecking failure, data left when processing raw instruction stream");
		if(ret!==null) {
			return ret;
		}
		throw new Error("Unreachable");
	}
	static verify_raw_instructions(raw_instructions: string[][]): InstructionType[] {
		const instructions: InstructionType[]=[];
		for(let i=0;i<raw_instructions.length;i++) {
			instructions.push(this.verify_instruction(raw_instructions[i]));
		}
		return instructions;
	}
}
class DocumentWriteList {
	list: (string[]|null)[];
	attached: boolean;
	end_symbol: symbol;
	document_write: ((...text: string[]) => void)|null;
	attached_document: Document|null;
	document_write_proxy: ((...text: string[]) => void)|null;
	constructor() {
		this.list=[];
		this.attached=false;
		this.end_symbol=Symbol(void 0);
		this.document_write=null;
		this.attached_document=null;
		this.document_write_proxy=null;
	}
	write(target: (...text: string[]) => void,thisArg: Document,argArray: string[]) {
		console.assert(target===this.document_write);
		console.assert(thisArg===this.attached_document);
		this.list.push(argArray,null);
	}
	attach_proxy(document: Document) {
		if(this.attached) {
			let was_destroyed=this.destroy(true);
			if(!was_destroyed) {
				throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
			}
		}
		this.attached_document=document;
		this.document_write=document.write;
		let proxy_handler={
			other: this,
			apply(target: (...text: string[]) => void,thisArg: Document,argArray: string[]) {
				this.other.write(target,thisArg,argArray);
			}
		};
		this.document_write_proxy=new Proxy(document.write,proxy_handler);
		document.write=this.document_write_proxy;
	}
	destroy(should_try_to_destroy: boolean=false) {
		if(this.attached_document&&this.document_write_proxy) {
			console.assert(this.attached_document.write===this.document_write_proxy);
			if(this.attached_document.write!==this.document_write_proxy) {
				if(should_try_to_destroy) {
					return false;
				}
				throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
			}
			let doc_1=this.attached_document;
			if(doc_1&&this.document_write) {
				let doc_var=this.document_write;
				let any_var: any=doc_var;
				let vv: Document['write']=any_var;
				doc_1.write=vv;
			}
		}
		if(this.document_write_proxy) {
			this.document_write_proxy=null;
		}
		if(this.document_write) {
			this.document_write=null;
		}
		if(this.attached_document) {
			this.attached_document=null;
		}
		if(should_try_to_destroy) {
			return true;
		}
	}
}
class UniqueIdGenerator {
	m_current: number;
	constructor() {
		this.m_current=-1;
	}
	set_current(current_value: number) {
		this.m_current=current_value;
	}
	current() {
		return this.m_current;
	}
	next() {
		return this.m_current++;
	}
}
class NamedIdGenerator {
	state_map: Map<any,any>;
	constructor() {
		this.state_map=new Map;
	}
	current_named(name: string) {
		let val=this.state_map.get(name);
		if(val) {
			return val;
		} else {
			return 0;
		}
	}

	next_named(name: string) {
		if(this.state_map.has(name)) {
			let cur=this.state_map.get(name)+1;
			this.state_map.set(name,cur);
			return cur;
		} else {
			this.state_map.set(name,1);
			return 1;
		}
	}
}
class EventHandlerDispatch {
	target_obj: {[x: string]: any;};
	target_name: string;
	constructor(target_obj: {[x: string]: any;},target_name: string) {
		this.target_obj=target_obj;
		this.target_name=target_name;
	}
	handleEvent(event: any) {
		this.target_obj[this.target_name](event);
	}
}
class CompressionStatsCalculator {
	hit_counts: number[];
	cache: string[];
	constructor() {
		this.hit_counts=[];
		this.cache=[];
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	add_hit(index: number) {
		if(!this.map_values()[index]) {
			this.map_values()[index]=1;
		} else this.map_values()[index]++;
	}
	add_item(key: string) {
		let index=this.map_keys().indexOf(key);
		if(index==-1) index=this.map_keys().push(key)-1;
		else this.add_hit(index);
	}
	reset() {
		this.map_keys().length=0;
		this.map_values().length=0;
	}
	calc_compression_stats(arr: any[],win_size: number) {
		this.reset();
		for(let i=0;i<arr.length;i++) {
			if(i+win_size<arr.length) {
				this.add_item(arr.slice(i,i+win_size).join(","));
			}
		}
		return to_tuple_arr(this.map_keys(),this.map_values()).filter((e) => e[1]!==void 0);
	}
	calc_for_stats_window_size(stats_arr: any[],arr: any[],win_size: number) {
		stats_arr[win_size-1]=this.calc_compression_stats(arr,win_size);
	}
	calc_for_stats_index(stats_arr: any[],arr: any[],index: number) {
		stats_arr[index]=this.calc_compression_stats(arr,index+1);
	}
}
class BaseCompression {
	did_compress(src: string|any[],dst: string|any[]) {
		return dst.length<src.length;
	}
	did_decompress(src: string|any[],dst: string|any[]) {
		return dst.length>src.length;
	}
	compress_result(src: string[],dst: string[]): [boolean,string[]] {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	decompress_result(src: string[],dst: string[]): [boolean,string[]] {
		if(this.did_decompress(src,dst)) return [true,dst];
		return [false,dst];
	}
}
class MulCompression extends BaseCompression {
	stats_calculator: CompressionStatsCalculator;
	compression_stats: any[];
	constructor() {
		super();
		this.stats_calculator=new CompressionStatsCalculator;
		this.compression_stats=[];
	}
	try_compress(arr: string[]) {
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
		return this.compress_result(arr,ret);
	}
	try_decompress(arr: string[]) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(!item) continue;
			let [item_type,num_data]=[item[0],item.slice(1)];
			let parsed=parseInt(num_data);
			if(!Number.isNaN(parsed)) {
				for(let j=0;j<parsed;j++)ret.push(item_type);
				continue;
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr,ret);
	}
	compress_array(arr: string[]) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		for(let i=0;i<4;i++) {
			this.stats_calculator.calc_for_stats_index(this.compression_stats,arr,i);
			let ls=this.compression_stats[i];
			if(ls.length>0) {
				continue;
			}
			break;
		}
		[success,res]=this.try_compress(arr);
		if(success) return res;
		return arr;
	}
}
window.MulCompression=MulCompression;
class TimeoutTarget {
	m_once: boolean;
	m_obj: AutoBuyState|AutoBuy|null;
	m_callback: () => void;
	constructor(obj: AutoBuyState|AutoBuy|null,callback: () => void) {
		this.m_once=true;
		this.m_obj=obj;
		this.m_callback=callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
class IntervalTarget {
	m_once: boolean;
	m_obj: any;
	m_callback: any;
	constructor(obj: any,callback: any) {
		this.m_once=false;
		this.m_obj=obj;
		this.m_callback=callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
class PromiseTimeoutTarget {
	m_promise_accept: ((value: any) => void)|null;
	m_promise_reject: ((reason?: any) => void)|null;
	m_promise: Promise<any>|null;
	m_callback: ((value?: any) => void)|null;
	m_active: boolean;
	constructor() {
		this.m_promise_accept=null;
		this.m_promise_reject=null;
		this.m_promise=null;
		this.m_callback=null;
		this.m_active=false;
	}
	wait() {
		if(this.m_promise) return this.m_promise;
		this.m_promise=new Promise(this.promise_executor.bind(this));
		this.m_active=true;
		return this.m_promise;
	}
	promise_executor(accept: (value: any) => void,reject: (reason?: any) => void) {
		this.m_promise_accept=accept;
		this.m_promise_reject=reject;
		this.m_callback=this.on_result.bind(this);
	}
	on_result(value: any=void 0) {
		if(!this.m_promise_accept) throw new Error("Missing promise accept handler");
		this.m_promise_accept(value);
		this.reset();
	}
	on_error(error: Error) {
		if(!this.m_promise_reject) throw new Error("Missing promise accept handler");
		this.m_promise_reject(error);
		this.reset();
	}
	reset() {
		this.m_promise_accept=null;
		this.m_promise_reject=null;
		this.m_promise=null;
		this.m_callback=null;
		this.m_active=false;
	}
	fire() {
		if(this.m_callback) this.m_callback();
	}
	destroy() {
		if(this.m_active) this.on_error(new Error("Destroyed"));
	}
}
class AsyncTimeoutTarget extends PromiseTimeoutTarget {
	wait() {
		return super.wait();
	}
}
class BaseNode {
	m_parent: any|null;
	constructor() {
		this.m_parent=null;
	}
	set_parent(parent: any) {
		this.m_parent=parent;
	}
	run() {
		// do nothing
	}
	remove() {
		if(this.m_parent) this.m_parent.remove_child(this);
	}
	destroy() {
		this.remove();
	}
}
class TimeoutIdNode extends BaseNode {
	m_id: ReturnType<typeof setTimeout>;
	constructor(id: ReturnType<typeof setTimeout>) {
		super();
		this.m_id=id;
	}
	destroy() {
		if(this.m_id!==null) clearTimeout(this.m_id);
		super.destroy();
	}
}
class IntervalIdNode extends BaseNode {
	m_id: ReturnType<typeof setTimeout>;
	constructor(id: ReturnType<typeof setTimeout>) {
		super();
		this.m_id=id;
	}
	destroy() {
		if(this.m_id!==null) clearInterval(this.m_id);
		super.destroy();
	}
}
class IntervalTargetFn {
	m_callback: any;
	timeout: number;
	constructor(callback: any,timeout: number) {
		this.m_callback=callback;
		this.timeout=timeout;
	}
	fire() {
		this.m_callback();
	}
}
type TimeoutTargetType1={
	fire(): void;
};

class TimeoutNode extends BaseNode {
	m_timeout: number;
	m_id: ReturnType<typeof setTimeout>|null;
	m_target: TimeoutTargetType1|null;
	constructor(timeout=0) {
		super();
		this.m_timeout=timeout;
		this.m_id=null;
		this.m_target=null;
	}
	timeout() {
		return this.m_timeout;
	}
	set_target(target: any) {
		this.m_target=target;
	}
	set() {
		this.m_id=setTimeout(this.run.bind(this),this.m_timeout);
	}
	start(target: TimeoutTargetType1|null) {
		if(!target) throw new Error("No target");
		this.m_target=target;
		this.set();
	}
	run() {
		if(this.m_target) this.m_target.fire();
		this.m_id=null;
		this.remove();
	}
	destroy() {
		if(this.m_id!==null) clearTimeout(this.m_id);
	}
}
class IntervalNode extends BaseNode {
	m_target_fn: CallableFunction;
	m_timeout: number;
	m_id: ReturnType<typeof setTimeout>|null;
	m_target: TimeoutTargetType1|null;
	constructor(target_fn: CallableFunction,timeout=0) {
		super();
		this.m_target_fn=target_fn;
		this.m_timeout=timeout;
		this.m_target=null;
		this.m_id=null;
	}
	set() {
		this.m_id=setInterval(this.run.bind(this),this.m_timeout);
	}
	start(target: TimeoutTargetType1|null=null) {
		if(target) {
			this.m_target=target;
		} else {
			this.m_target=new IntervalTargetFn(this.m_target_fn,this.m_timeout);
		}
		this.set();
	}
	destroy() {
		if(this.m_id!==null) clearInterval(this.m_id);
	}
}
type AsyncTimeoutTarget1={
	wait(): Promise<any>;
	fire(): void;
	destroy(): void;
};

class AsyncTimeoutNode extends BaseNode {
	m_timeout: number;
	m_id: ReturnType<typeof setTimeout>|null;
	m_target: AsyncTimeoutTarget1|null;
	constructor(timeout=0) {
		super();
		this.m_timeout=timeout;
		this.m_id=null;
		this.m_target=null;
	}
	timeout() {
		return this.m_timeout;
	}
	set_target(target: any) {
		this.m_target=target;
	}
	start(target: AsyncTimeoutTarget1|null) {
		if(!target) throw new Error("No target");
		this.m_target=target;
		this.set();
	}
	destroy() {
		if(this.m_id!==null) clearTimeout(this.m_id);
		if(this.m_target) this.m_target.destroy();
	}
	async start_async(target: AsyncTimeoutTarget1) {
		if(!target) throw new Error("unable to start_async without anything to wait for");
		log_if(LOG_LEVEL_INFO,'start_async');
		this.m_target=target;
		this.set();
		let promise=this.m_target.wait();
		log_if(LOG_LEVEL_INFO,'p',promise);
		await promise;
	}
	set() {
		log_if(LOG_LEVEL_INFO,'set',this);
		this.m_id=setTimeout(this.run.bind(this),this.m_timeout);
	}
	run() {
		log_if(LOG_LEVEL_INFO,'run',this);
		if(this.m_target) this.m_target.fire();
		this.m_id=null;
		this.remove();
	}
}
class IntervalIdNodeRef extends IntervalIdNode {
	destroy_callback: () => void;
	constructor(interval_id: ReturnType<typeof setTimeout>,destroy_cb: () => void) {
		super(interval_id);
		this.destroy_callback=destroy_cb;
	}
	destroy() {
		this.destroy_callback();
		super.destroy();
	}
}
class AsyncNodeRoot {
	children: BaseNode[];
	constructor() {
		this.children=[];
	}
	set(target_fn: () => void,timeout: number|undefined,repeat=false) {
		let node;
		if(repeat) {
			node=new TimeoutNode(timeout);
			node.start(new TimeoutTarget(null,target_fn));
		} else {
			node=new IntervalNode(target_fn,timeout);
			node.start(new IntervalTarget(null,target_fn));
		}
	}
	append_raw(timeout_id: ReturnType<typeof setTimeout>,once=true) {
		if(once) {
			this.append_child(new TimeoutIdNode(timeout_id));
		} else {
			this.append_child(new IntervalIdNode(timeout_id));
		}
	}
	append_child(record: BaseNode) {
		record.remove();
		record.set_parent(this);
		this.children.push(record);
	}
	remove_child(record: BaseNode) {
		let index=this.children.indexOf(record);
		this.children.splice(index,1);
		record.set_parent(null);
	}
	destroy() {
		let item=this.children.shift();
		if(!item) return;
		do {
			console.info('timer destroy',item);
			item.destroy();
			item=this.children.shift();
		} while(item);
	}
}
class RatioOptions {
	size: number;
	history_size: number;
	time_start: number;
	duration: number;
	constructor() {
		this.size=0;
		this.history_size=0;
		this.time_start=0;
		this.duration=0;
	}
}
class AverageRatio {
	type: string;
	history: number[];
	count: number;
	value: number;
	size: number;
	duration: number;
	time_start: number;
	time_cur_start: number;
	time_cur: number;
	gen_count: number;
	history_size: number;
	// @AverageRatio
	constructor(type: string,options: RatioOptions) {
		this.type=type;
		this.history=[];
		this.count=0;
		this.value=0;
		this.size=options.size;
		this.duration=options.duration;
		this.time_start=options.time_start;
		this.time_cur_start=0;
		this.time_cur=0;
		this.gen_count=0;
		this.history_size=options.history_size;
	}
	do_history_update(avg: AverageRatioRoot,time_now: number) {
		if(this.value===null) return;
		this.count++;
		this.time_cur=time_now-this.time_start-this.time_cur_start;
		if(this.time_cur>this.duration) {
			this.time_cur_start+=this.duration;
			this.time_cur-=this.duration;
			this.count=0;
			this.gen_count++;
			this.history.unshift(this.value);
			if(this.history.length>this.history_size) this.history.pop();
			let next=avg.next(this);
			if(next) next.do_history_update(avg,time_now);
		}
	}
	add_to_ratio(value: number,avg_window=this.size) {
		if(this.value===null) {
			this.value=value;
			return;
		}
		this.value=(this.value*(avg_window-1)+value)/avg_window;
	}
	set_history_size(size: number) {
		this.history_size=size;
	}
	get_average() {
		if(this.value===null) return 0;
		return this.value;
	}
}
class AverageRatioRoot {
	map: Map<string,AverageRatio>;
	keys: string[];
	values: AverageRatio[];
	constructor() {
		this.map=new Map;
		this.keys=[];
		this.values=[];
	}
	get_average(key: string) {
		let ratio_calc=this.map.get(key);
		if(!ratio_calc) throw new Error("Ratio not found: "+key);
		return ratio_calc.get_average();
	}
	set_ratio(key: string,value: AverageRatio): void {
		this.keys.push(key);
		this.values.push(value);
		this.map.set(key,value);
	}
	next(value_obj: AverageRatio) {
		let idx=this.values.indexOf(value_obj);
		if(idx<this.values.length) {
			return this.values[idx+1];
		}
		return null;
	}
	push(value: number) {
		let cur=this.map.get(this.keys[0]);
		if(!cur) throw new Error("Invalid");
		let cur_size=cur.size;
		let time_now=performance.now();
		cur.do_history_update(this,time_now);
		cur.add_to_ratio(value);
		for(let i=1;i<this.keys.length;i++) {
			let key=this.keys[i];
			cur=this.map.get(key);
			if(!cur) throw new Error("Invalid");
			cur_size*=cur.size;
			cur.add_to_ratio(value,cur_size);
		}
	}
}
class AutoBuyState {
	root_node: AsyncNodeRoot;
	debug: boolean;
	arr: number[];
	ratio: number;
	last_ratio: number;
	compressor_stats: number[];
	arr_max_len: number;
	val: number;
	total_mul: number;
	ratio_mode: number;
	total_cycle_count_change: number;
	locked_cycle_count: number;
	is_init_complete: boolean;
	avg: AverageRatioRoot;
	prev_atomepersecond?: number;
	div?: number;
	constructor(root: AsyncNodeRoot) {
		this.root_node=root;
		this.debug=false;
		this.arr=[];
		this.ratio=0;
		this.last_ratio=0;
		this.compressor_stats=[];
		this.arr_max_len=5*60;
		this.val=1;
		this.total_mul=1;
		this.ratio_mode=0;
		this.total_cycle_count_change=0;
		this.locked_cycle_count=50;
		this.is_init_complete=false;
		this.avg=new AverageRatioRoot;
	}
	init() {
		if(window.atomepersecond===0) {
			let node=new TimeoutNode(0);
			this.root_node.append_child(node);
			node.start(new TimeoutTarget(this,this.init));
			return;
		}
		this.val=window.totalAtome/window.atomepersecond;
		let rep_val=this.val/(100*4*window.prestige);
		if(Number.isFinite(rep_val)) {
			for(let i=0;i<8;i++) {
				this.arr.push(rep_val*.75);
			}
		} else {
			rep_val=0.75;
		}
		let ratio_types=['10sec','1min','5min','30min','3hour'];
		let ratio_duration=[10*1000,60*1000,5*60*1000,30*60*1000,3*60*60*1000];
		let ratio_counts=[80,6,5,6,6];
		function mul_3(arr: number[],i: number) {
			let [a,b=1,c=10]=arr.slice(i);
			return a*b*c*4;
		}
		//@AverageRatio
		function create_ratio(target_obj: AverageRatioRoot,i: number,now_start: number) {
			let obj=new AverageRatio(ratio_types[i],{
				size: ratio_counts[i],
				history_size: mul_3(ratio_counts,i),
				time_start: now_start,
				duration: ratio_duration[i],
			});
			if(ratio_types[i]==='1min') obj.set_history_size(7200);
			target_obj.set_ratio(ratio_types[i],obj);
		}
		let now_start=performance.now();
		for(let i=0;i<5;i++) {
			create_ratio(this.avg,i,now_start);
		}
		this.prev_atomepersecond=window.atomepersecond;
		this.is_init_complete=true;
	}
	calc_ratio() {
		return this.avg.get_average('30min');
	}
	append_value(value: number) {
		if(!Number.isFinite(value)) {
			console.assert(false,'value is not finite');
		}
		this.arr.unshift(value);
		this.avg.push(value);
		while(this.arr.length>this.arr_max_len) {
			this.arr.pop();
		}
		let new_ratio=this.calc_ratio();
		if(!Number.isFinite(new_ratio)) {
			console.assert(false,'ratio result is not finite');
		}
		this.last_ratio=this.ratio;
		this.ratio=new_ratio;
	}
	update_ratio_mode() {
		let do_update=false;
		if(this.locked_cycle_count>0) {
			this.locked_cycle_count--;
			if(this.locked_cycle_count%100==0) {
				// do_update=true
				log_if(LOG_LEVEL_INFO,'ratio cycle lcc=%o',this.locked_cycle_count);
			}
		} else {
			do_update=true;
		}
		if(!do_update) return;
		this.total_mul=1;
		this.total_cycle_count_change=0;
		let did_update=this.rep_update_ratio_mode(true);
		let should_notify=did_update;
		while(did_update) {
			did_update=this.rep_update_ratio_mode(false);
		}
		if(should_notify) {
			this.finalize_locked_cycle_count();
			this.log_on_update_ratio_mode_notify();
		}
	}
	rep_update_ratio_mode(do_lock: boolean) {
		let mode_ratio_up=this.ratio_mode*.1+.1;
		let mode_ratio_down=this.ratio_mode*.1-.4;
		if(this.ratio>(mode_ratio_up+.4)) return this.on_increase_ratio(do_lock,2);
		if(this.ratio<mode_ratio_down) return this.on_decrease_ratio(do_lock);
		if(this.ratio>mode_ratio_up) return this.on_increase_ratio(do_lock);
		return false;
	}
	on_decrease_ratio(do_lock: boolean,mul=1) {
		this.total_mul*=mul;
		this.on_ratio_change(do_lock,-1,1_000*mul);
		return true;
	}
	on_increase_ratio(do_lock: boolean,mul=1) {
		this.total_mul*=mul;
		this.on_ratio_change(do_lock,1,500*mul);
		return true;
	}
	on_ratio_change(do_lock: boolean,dir_num: number,lock_for: number) {
		if(do_lock) {
			this.do_ratio_lock(do_lock,dir_num,lock_for);
		} else {
			this.do_ratio_lock(do_lock,dir_num,lock_for);
		}
		this.on_cycle_count_change(lock_for);
	}
	on_cycle_count_change(lock_for: number) {
		this.total_cycle_count_change+=lock_for;
	}
	finalize_locked_cycle_count() {
		let rem_val=this.locked_cycle_count%100;
		this.locked_cycle_count-=rem_val;
	}
	do_ratio_lock(_do_lock: boolean,mode_change_direction: number,num_of_cycles: number) {
		this.ratio_mode+=mode_change_direction;
		this.locked_cycle_count+=num_of_cycles;
	}
	get_mul_modifier() {
		switch(this.ratio_mode) {
			case 0: return AutoBuyMulModifierFactor+2;
			case 1: return AutoBuyMulModifierFactor+1;
			default: return AutoBuyMulModifierFactor;
		}
	}
	calc_near_val(num: number) {
		let exp=0;
		if(num<1||num>10) {
			while(num<1) {
				num*=10;
				exp--;
			}
			while(num>10) {
				num/=10;
				exp++;
			}
		}
		return [num,exp];
	}
	log_on_update_ratio_mode_notify() {
		log_if(LOG_LEVEL_INFO,'update_ratio_mode_tag mode=%o total_mul=%o cycle_change=%o',this.ratio_mode,this.total_mul,this.total_cycle_count_change);
		const near_avg='30min';
		let real_val=this.avg.get_average(near_avg);
		let [num,exponent]=this.calc_near_val(real_val);
		if(real_val>0.1&&real_val<0.9) return;
		if(exponent<2&&exponent>-3) {
			log_if(LOG_LEVEL_ERROR,'update_ratio_mode_tag -exp avg:%s=%o lcc=%o',near_avg,(~~(real_val*100000))/100000,this.locked_cycle_count);
		} else {
			log_if(LOG_LEVEL_ERROR,'update_ratio_mode_tag +exp avg:%s=(%o,%o) lcc=%o',near_avg,(~~(num*10000))/10000,exponent,this.locked_cycle_count);
		}
	}
	update_not_ready() {
		let node=new TimeoutNode(80);
		this.root_node.append_child(node);
		node.start(new TimeoutTarget(this,this.update));
	}
	update() {
		let not_ready=false;
		if(!not_ready) if(typeof window.prestige=='undefined') not_ready=true;
		if(!not_ready) if(window.totalAtome<100||window.atomepersecond<100) not_ready=true;
		if(not_ready) {
			this.update_not_ready();
			return;
		}
		// this.div=Math.log2(window.prestige)*AutoBuyRatioDiv
		this.div=AutoBuyRatioDiv;
		this.val=Math.log2(window.totalAtome/window.atomepersecond)/this.div;
		if(!Number.isFinite(this.val)) {
			this.val=1e-16;
			this.update_not_ready();
			return;
		}
		if(this.val<1e-16) {
			this.val=1e-16;
		}
		this.val*=this.get_mul_modifier();
		this.append_value(this.val);
		this.update_ratio_mode();
	}
	on_game_reset_finish(time_played_str: string) {
		let history_arr_1=this.avg.values[0].history.slice().reverse();
		let history_item=history_arr_1[0];
		let history_div_num=6*5*6;
		let history_arr_2=history_arr_1.map(value => {
			history_item*=history_div_num-1;
			history_item+=value;
			history_item/=history_div_num;
			return (history_item*100).toFixed(1);
		});
		let json_hist=JSON.stringify(history_arr_2);
		let json_tag="JSON_HIST";
		let prev_hist=sessionStorage.history;
		let data_arr: string[];
		if(prev_hist&&prev_hist.startsWith(json_tag)) {
			let hist_data=prev_hist.slice(json_tag.length);
			while(hist_data[0]==='@') {
				hist_data=hist_data.slice(1);
			}
			data_arr=hist_data.split("|");
			data_arr.push(json_hist);
		} else {
			data_arr=[json_hist];
		}
		sessionStorage.history=`${json_tag}@${data_arr.join("|")}`;
		let time_played_data=sessionStorage.time_played_hist;
		let time_played_arr: (null|string)[]=data_arr.map(() => null);
		if(time_played_data) {
			let stored_arr=JSON.parse(time_played_data);
			for(let i=0;i<stored_arr.length;i++) {
				time_played_arr[i]=stored_arr[i];
			}
			time_played_arr[data_arr.length-1]=time_played_str;
		} else {
			time_played_arr=[time_played_str];
		}
		sessionStorage.time_played_hist=JSON.stringify(time_played_arr);
	}
	reset() {
		this.ratio*=0.75;
		for(var i=0;i<this.arr.length;i++) {
			this.arr[i]*=0.75;
		}
	}
}
const named_sym_gen=new NamedIdGenerator;
const debug_id_syms: WeakRef<{sym: symbol;}>[]=[];
function labeled_sym(name: string): symbol {
	const id=named_sym_gen.next_named(name);
	const sym=Symbol(`${name}@${id}`);
	debug_id_syms.push(new WeakRef({sym}));
	return sym;
}
class NodeBoxImpl implements NodeBox {
	readonly type="instance_box";
	readonly m_verify_name='NodeBox';
	readonly instance_type='Node';
	readonly from="create";
	value: Node;
	constructor(value: Node) {
		this.value=value;
	}
	verify_name(name: "NodeBox"): boolean {
		return this.m_verify_name==='NodeBox'&&name==='NodeBox';
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
function int_parser(value: string): number {
	return parseInt(value,10);
}
class DataLoader {
	store: Storage;
	constructor(storage: Storage) {
		this.store=storage;
	}
	load_str_arr(key: string,def_value: string[]) {
		let data=this.store.getItem(key);
		if(data===null)
			return def_value;
		return data.split(",");
	}
	load_int_arr(key: string,def_value: any,storage_data=this.store.getItem(key)) {
		if(storage_data===null)
			return def_value;
		return this.parse_int_arr(storage_data);
	}
	load_int_arr_cb(key: string,def_factory: () => number[],storage_data=this.store.getItem(key)) {
		if(storage_data===null)
			return def_factory();
		return this.parse_int_arr(storage_data);
	}
	default_split(string: string) {
		return string.split(",");
	}
	parse_int_arr(data: string) {
		return this.default_split(data).map(int_parser);
	}
}
class AsyncAutoBuy {
	parent: AutoBuy;
	unit_upgradeable_trigger: number;
	main_running: any;
	fast_unit_running: boolean;
	constructor(parent: AutoBuy) {
		this.parent=parent;
		this.unit_upgradeable_trigger=30;
		this.fast_unit_running=false;
	}
	get timeout_ms() {
		debugger;
		return this.parent.timeout_ms;
	}
	async do_start_main_async(no_wait: boolean) {
		if(!no_wait) await this.next_timeout_async(this.parent.timeout_ms,'A');
		await this.main_async();
	}
	async maybe_async_reset() {
		let loss_rate=this.parent.unit_promote_start();
		if(this.parent.maybe_run_reset()) return [true,loss_rate];
		return [false,loss_rate];
	}
	async initial_special_async() {
		await this.next_timeout_async(this.parent.timeout_ms,'>');
		let in_special=true;
		while(in_special) {
			if(this.parent.do_special()) {
				await this.next_timeout_async(this.parent.timeout_ms,'^');
				continue;
			} else {
				in_special=false;
			}
		}
		await this.next_timeout_async(this.parent.timeout_ms,'#');
		window.bonusAll();
		await this.fast_unit_async();
	}
	async rare_begin_async() {
		this.parent.do_rare_begin_change();
		await this.next_timeout_async(this.parent.timeout_ms,'<');
		await this.initial_special_async();
	}
	async faster_timeout_async() {
		this.parent.do_timeout_inc([1.006,1.005],4);
		await this.next_timeout_async(this.parent.timeout_ms,'+');
	}
	async normal_decrease_async() {
		this.parent.do_normal_decrease();
		await this.next_timeout_async(this.parent.timeout_ms,'-');
	}
	async large_decrease_async() {
		this.parent.do_large_decrease();
		await this.next_timeout_async(this.parent.timeout_ms,'!');
	}
	async main_async() {
		if(this.main_running) {
			throw new Error("Already running");
		}
		this.main_running=true;
		try {
			run_loop: while(this.main_running) {
				for(this.parent.iter_count=0;;) {
					this.unit_upgradeable_trigger=30;
					if(this.parent.timeout_ms&&this.parent.timeout_ms>3*60*1000) {
						this.unit_upgradeable_trigger=8;
					}
					if(this.parent.unit_upgradable_count>this.unit_upgradeable_trigger) {
						this.parent.unit_upgradable_count=0;
						await this.rare_begin_async();
					}
					if(this.parent.iter_count<6) await this.normal_decrease_async();
					else await this.large_decrease_async();
					let [quit,loss_rate]=await this.maybe_async_reset();
					if(quit) break run_loop;
					if(loss_rate>0.08) continue;
					if(this.parent.pre_total==window.totalAtome) break;
				}
				await this.faster_timeout_async();
			}
			this.main_running=false;
		} finally {
			this.main_running=false;
		}
		if(this.main_running) {
			console.log('no finally');
			this.main_running=false;
		}
	}
	async fast_unit_async() {
		if(!this.parent.timeout_ms)
			throw new Error("no timeout_ms");
		this.fast_unit_running=true;
		let count=0;
		while(this.fast_unit_running) {
			this.parent.unit_promote_start();
			if(this.parent.pre_total==window.totalAtome) break;
			this.parent.do_fast_unit_step_change();
			await this.next_timeout_async(~~(this.parent.timeout_ms/2),':');
			count++;
			if(count>(this.unit_upgradeable_trigger/2)) break;
		}
		window.bonusAll();
		this.fast_unit_running=false;
		this.parent.do_fast_unit_change();
		await this.next_timeout_async(this.parent.timeout_ms,'$');
	}
	async next_timeout_async(timeout: number|undefined,char: string,silent=false) {
		let node=new AsyncTimeoutNode(timeout);
		this.parent.root_node.append_child(node);
		if(!silent) {
			this.parent.timeout_ms=timeout;
			this.parent.update_timeout_element();
		}
		this.parent.state_history_append(char,silent);
		await node.start_async(new AsyncTimeoutTarget);
	}
}
class DocumentBoxImpl implements DocumentBox {
	type: "document_box";
	m_verify_name: "DocumentBox";
	value: Document;
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
	verify_name(name: "DocumentBox"): boolean {
		return this.m_verify_name===name&&name==="DocumentBox";
	}
	constructor(value: Document) {
		this.type='document_box';
		this.m_verify_name='DocumentBox';
		this.value=value;
	}
}
class AsyncFunctionBoxImpl implements AsyncFunctionBox {
	type: 'function_box';
	return_type: 'promise_box';
	await_type: 'Box';
	value: (...a: Box[]) => Promise<Box>;
	m_verify_name: "AsyncFunctionBox";
	verify_name(name: "AsyncFunctionBox"): boolean {
		return this.m_verify_name==='AsyncFunctionBox'&&name==='AsyncFunctionBox';
	}
	wrap_call(): Box {
		throw 1;
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
	constructor(value: (...a: Box[]) => Promise<Box>) {
		this.type='function_box';
		this.return_type='promise_box';
		this.await_type='Box';
		this.m_verify_name='AsyncFunctionBox';
		this.value=value;
	}
}
class VoidBoxImpl implements VoidBox {
	type: "void";
	extension: null;
	m_verify_name: "VoidBox";
	value: undefined;
	constructor() {
		this.type='void';
		this.extension=null;
		this.m_verify_name='VoidBox';
		this.value=void 0;
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
	verify_name(name: "VoidBox"): boolean {
		return this.m_verify_name==='VoidBox'&&name==='VoidBox';
	}
}
class AutoBuy {
	debug_arr: any;
	root_node: AsyncNodeRoot;
	with_async: AsyncAutoBuy;
	iter_count: number;
	epoch_len: number;
	background_audio: HTMLAudioElement|null;
	state_history_arr: string[];
	skip_save: boolean;
	has_real_time: boolean;
	local_data_loader: DataLoader;
	state: AutoBuyState;
	debug: any;
	compressor: MulCompression;
	epoch_start_time: number;
	original_map: Map<any,any>;
	dom_map: Map<any,any>;
	flags: Set<unknown>;
	timeout_arr: any;
	state_history_arr_max_len: number;
	last_value: number;
	pre_total: number;
	use_event_vm: boolean;
	constructor() {
		this.root_node=new AsyncNodeRoot;
		this.with_async=new AsyncAutoBuy(this);
		this.timeout_ms=0;
		this.iter_count=0;
		this.epoch_len=0;
		this.background_audio=null;
		this.skip_save=false;
		this.has_real_time=false;
		this.local_data_loader=new DataLoader(localStorage);
		this.state=new AutoBuyState(this.root_node);
		this.debug=this.state.debug;
		this.compressor=new MulCompression;
		this.state_history_arr=this.local_data_loader.load_str_arr('auto_buy_history_str',["S"]);
		this.epoch_start_time=Date.now();
		this.original_map=new Map;
		this.dom_map=new Map;
		this.debug_arr=[];
		this.flags=new Set();
		try {
			this.check_for_symbols();
		} catch(e) {
			console.log(e);
		}
		this.timeout_arr=this.local_data_loader.load_int_arr_cb('auto_buy_timeout_str',() => {
			let src=[300];
			src.length=16;
			let data_len=1;
			while(data_len<src.length) {
				src.copyWithin(data_len,0);
				data_len*=2;
			}
			return src;
		});
		this.state_history_arr_max_len=0;
		this.last_value=0;
		this.pre_total=0;
		this.use_event_vm=false;
	}
	test_log(log_level: number,format_str: string,...args: any[]) {
		if(args.length>0) {
			args.unshift("test:");
		} else {
			args.unshift("test");
		}
		log_if(log_level,format_str,...args);
	}
	iterate_symbols(sym_indexed_this: {[x: string]: any;},val: {sym: any;}) {
		if(!sym_indexed_this[val.sym]) return;
		let obj=sym_indexed_this[val.sym];
		if(!obj.split) return;
		let str=sym_indexed_this[val.sym];
		let arr=str.split(",");
		let trimmed=arr.map((e: string) => e.trim());
		this.debug_arr.push(...trimmed);
	}
	check_for_symbols() {
		let this_as_any: any=this;
		let sym_indexed_this: {[x: symbol]: string;}=this_as_any;
		for(let i=0;i<debug_id_syms.length;i++) {
			let val=debug_id_syms[i].deref();
			if(val) this.iterate_symbols(sym_indexed_this,val);
		}
	}
	pre_init() {
		this.background_audio=document.querySelector("#background_audio");
		if(!this.background_audio) throw new Error("Missing element querySelector('#background_audio')");
		if(this.background_audio instanceof HTMLAudioElement) {
			this.background_audio.onloadeddata=null;
			this.background_audio.volume=AUDIO_ELEMENT_VOLUME;
		} else {
			throw new Error("querySelector('#background_audio') is not an instance of HTMLAudioElement");
		}
		this.async_pre_init().then(() => {
			log_if(LOG_LEVEL_INFO,'pre_init done');
		});
		this.dom_pre_init();
	}
	async async_pre_init() {
		if(!this.background_audio) throw 1;
		if(!(this.background_audio instanceof HTMLAudioElement)) throw 1;
		try {
			return await this.background_audio.play();
		} catch(e) {
			log_if(LOG_LEVEL_INFO,"failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
		}
		let raw_instructions=`
			// [none]
			vm_push_self;
			// vm_self
			cast,object_index;
			// vm_self as object_index
			push,target_obj;
			// vm_self target_obj
			get;
			// vm_self.target_obj
			dup;
			// vm_self.target_obj * 2
			cast,object_index;
			// vm_self.target_obj target_obj<object_index>
			push,background_audio;
			// vm_self.target_obj <object_index>target_obj "background_audio"
			get;
			// vm_self.target_obj target_obj.background_audio
			dup;
			// vm_self.target_obj target_obj.background_audio * 2
			cast,object_index;
			// vm_self.target_obj target_obj.background_audio <object_index>background_audio
			push,play;
			// vm_self.target_obj target_obj.background_audio <object_index>background_audio "play"
			get;
			// vm_self.target_obj target_obj.background_audio background_audio.play
			cast,vm_function;
			// vm_self.target_obj target_obj.background_audio (background_audio.play as vm_function)
			call,int(2);
			// want to "swap;drop;" here
			// vm_self.target_obj Promise<void>
			dup;
			// vm_self.target_obj Promise<void> * 2
			cast,object_index;
			// vm_self.target_obj Promise<void> <object_index>(Promise<void>)
			push,then;
			// vm_self.target_obj Promise<void> <object_index>(Promise<void>) "then"
			get;
			// vm_self.target_obj Promise<void> (Promise<void>).then
			cast,vm_function;
			// vm_self.target_obj Promise<void> ((Promise<void>).then as vm_function)
			push,%o;
			// vm_self.target_obj Promise<void> ((Promise<void>).then as vm_function) arg1
			push,%o;
			// vm_self.target_obj Promise<void> ((Promise<void>).then as vm_function) arg1 arg2
			call,int(4);
			// vm_self.target_obj Promise<void>
			drop;
			// vm_self.target_obj
			drop;
			// [none]
			push_global_object;
			// window
			dup;
			// window * 2
			cast,object_index;
			// window <object_index>window
			push,removeEventListener;
			// window <object_index>window "removeEventListener"
			get;
			// window window.removeEventListener
			cast,vm_function;
			// window (window.removeEventListener as vm_function)
			push,click;
			// window (window.removeEventListener as vm_function) "click"
			vm_push_self;
			// window (window.removeEventListener as vm_function) "click" vm_self
			call,int(4);
			// vm_self
			drop;
			// [none]
			vm_return;
			`;
		let instructions=StackVMParser.parse_instruction_stream_from_string(raw_instructions,[
			function() {
				log_if(LOG_LEVEL_ERROR,'play success');
			},
			function(err: any) {
				log_if(LOG_LEVEL_ERROR,err);
			}
		]);
		try {
			let t=this;
			let event_handler={
				handleEvent() {
					this.run().then(() => {
						log_if(LOG_LEVEL_INFO,'play success');
					},function(err) {
						log_if(LOG_LEVEL_ERROR,err);
					});
					window.removeEventListener('click',this);
				},
				async run() {
					if(!t.background_audio) throw new Error("Bad");
					await t.background_audio.play();
				}
			};
			if(!this.use_event_vm) {
				window.addEventListener('click',event_handler);
			} else {
				let handler=new EventHandlerVMDispatch(instructions,this);
				window.addEventListener('click',handler);
			}
		} catch(e) {
			console.log('error when setting up EventHandlerVMDispatch',e);
		}
	}
	save_state_history_arr() {
		if(this.skip_save) return;
		localStorage.auto_buy_history_str=this.state_history_arr.join(",");
	}
	get_timeout_arr_data(forced_action: string) {
		if(forced_action=="RESET") return this.timeout_arr.map((e: number) => ~~(e/4)).join(",");
		return this.timeout_arr.join(",");
	}
	save_timeout_arr() {
		let forced_action,action_count;
		let action_data=localStorage.auto_buy_forced_action;
		if(action_data) [forced_action,action_count]=action_data.split(",");
		localStorage.auto_buy_timeout_str=this.get_timeout_arr_data(forced_action);
		if(action_count!==void 0) {
			action_count=parseInt(action_count);
			if(Number.isFinite(action_count)) {
				if(action_count>0) {
					localStorage.auto_buy_forced_action=[forced_action,action_count-1];
				} else if(forced_action!=="NONE") {
					localStorage.auto_buy_forced_action="NONE,0";
				}
			}
		}
	}
	dom_pre_init() {
		const css_display_style=`#state_log>div{width:max-content}#state_log{top:0px;width:30px;position:fixed;z-index:101;font-family:monospace;font-size:22px;color:lightgray}`;
		let create_state_log_arr: DomExecDescription[]=[
			[0,'push',new DocumentBoxImpl(document),'body'],
			[0,'get'],
			[1,'create_id','div','state_log'],
			[1,'dup'],
			[1,'append']
		];
		function replace_css_style(obj: CSSStyleSheet,str: string) {
			return obj.replace(str);
		}
		async function css_promise_runner(this: AutoBuy,...box_arr: Box[]) {
			let promise_arr: Promise<Box>[]=[];
			for(let i=0;i<box_arr.length;i++) {
				let cur=box_arr[i];
				if(typeof cur!='object') continue;
				if(cur===null) continue;
				if(cur.type!='promise_box') continue;
				if(cur.await_type==='Box') {
					promise_arr.push(cur.value);
				}
			}
			const promise_settle_arr=await Promise.allSettled(promise_arr);
			let fulfilled_res_arr: PromiseFulfilledResult<Box>[]=[];
			let rejected_res: PromiseRejectedResult[]=[];
			for(let i=0;i<promise_settle_arr.length;i++) {
				let cur=promise_settle_arr[i];
				if(cur.status==='fulfilled') {
					fulfilled_res_arr.push(cur);
				} else {
					rejected_res.push(cur);
				}
			}
			let promise_res_arr=fulfilled_res_arr.map(e_1 => e_1.value);
			let unbox_arr: CSSStyleSheet[]=[];
			for(let i=0;i<promise_res_arr.length;i++) {
				let cur=promise_res_arr[i];
				if(typeof cur!='object') continue;
				if(cur===null) continue;
				if(cur.type!='instance_box') continue;
				if(cur.instance_type!="CSSStyleSheet") continue;
				unbox_arr.push(cur.value);
			}
			if(rejected_res.length>0) {
				console.log('css settle error',rejected_res,'res',unbox_arr);
			} else {
				console.log('css settle',unbox_arr);
			}
			this.adopt_styles(...unbox_arr);
		}
		async function add_css_style_sheet(...a: Box[]) {
			let ret=css_promise_runner.call(bound_this,...a);
			await ret;
			return new VoidBoxImpl;
		}
		let bound_this=this;
		let make_css_arr: DomExecDescription[]=[
			[0,'push',null,new AsyncFunctionBoxImpl(add_css_style_sheet)],
			[
				0,'new',new CSSStyleSheetConstructorBoxImpl(CSSStyleSheet),[],
				replace_css_style,
				[css_display_style]
			],
			[0,'call',3],
			/*drop the promise*/
			[0,'drop']
		];
		let raw_dom_arr: DomExecDescription[]=[
			...create_state_log_arr,
			[2,'create','div','history',"?3"],
			[2,'append'],
			[2,'create','div','timeout_element',"0"],
			[2,'append'],
			[2,'create','div','hours_played',"0.000 hours"],
			[2,'append'],
			[2,'create','div','ratio',0..toFixed(2)+"%"],
			[2,'append'],
			[2,'create','div','ratio_change',0..toExponential(3)],
			[2,'append'],
			[1,'drop'],
			[0,'drop'],
			...make_css_arr
		];
		this.build_dom_from_desc(raw_dom_arr,this.dom_map);
	}
	adopt_styles(...styles: CSSStyleSheet[]) {
		let dom_styles=document.adoptedStyleSheets;
		document.adoptedStyleSheets=[...dom_styles,...styles];
	}
	use_boxed_style_sheet(callback: (a: CSSStyleSheet,b: string) => Promise<CSSStyleSheet>,...a: Box[]) {
		let extracted_values: {
			v: []; t: 0;
		}|{
			v: [CSSStyleSheet]; t: 1;
		}|{
			v: [CSSStyleSheet,string]; t: 2;
		}={
			v: [],
			t: 0
		};
		for(let i=0;i<a.length;i++) {
			let v=a[i];
			switch(typeof v) {
				default:
					console.assert(false,'Assertion need to handle `case "%s":`',typeof v);
					break;
				case 'object':
					if(v===null) break;
					if(v.type==='instance_box'&&v.instance_type==='CSSStyleSheet') {
						extracted_values={
							v: [v.value],
							t: 1
						};
					}
					if(v instanceof CSSStyleSheet) {
						// it already got converted to a value for us
						extracted_values={
							v: [v],
							t: 1
						};
					}
					break;
				case 'string':
					if(extracted_values.t===1) {
						extracted_values={
							v: [extracted_values.v[0],v],
							t: 2
						};
					}
			}
		}
		if(extracted_values&&extracted_values.t===2) {
			let ret=callback(...extracted_values.v);
			let r2=ret.then(function(v) {
				return new CSSStyleSheetBoxImpl(v);
			});
			let res=new PromiseBoxImpl(r2);
			return res;
		}
	}
	build_dom_from_desc(raw_arr: DomExecDescription[],trg_map=new Map) {
		let stack: DomExecDescription[]=[];
		let map=trg_map;
		for(let i=0;i<raw_arr.length;i++) {
			let cur_item=raw_arr[i];
			switch(cur_item[1]) {
				case 'get': {
					stack.push(cur_item);
				} break;
				case 'new': {
				} break;
				case 'create': {
					const [depth,,element_type,name,content]=cur_item;
					let cur_element=document.createElement(element_type);
					if(typeof content=='string') cur_element.innerText=content;
					else if(typeof content=='object'&&(content as WithId).id) {
						let dom_id=(content as WithId).id;
						if(typeof dom_id==='string') {
							cur_element.id=dom_id;
						}
					} else {
						log_if(LOG_LEVEL_ERROR,'bad typeof == %s for content in build_dom; content=%o',typeof content,content);
						log_if(LOG_LEVEL_TRACE,"Info: case 'create' args are",element_type,name);
					}
					map.set(name,cur_element);
					stack.push([depth,"push",new NodeBoxImpl(cur_element)]);
				} break;
				case 'append': {
					let depth=cur_item[0];
					// peek at the value on the top of the previous frame
					stack.push([depth,"peek",0]);
					stack.push(cur_item);
				} break;
				case 'dup': case 'breakpoint': case 'drop': case 'call':/*push the item*/case 'push': stack.push(cur_item); break;
				default: {
					let any_cur: any=cur_item;
					if(!(any_cur instanceof Array)) throw 1;
					const [,action]=any_cur;
					log_if(LOG_LEVEL_ERROR,'might need to handle',action);
					debugger;
				} break;
			}
			if(this.debug_arr.includes('build_dom_from_desc')) console.log('es',stack.at(-1));
		}
	}
	push_instruction_group(ins_arr_map: (DomInstructionType[]|null)[],instruction: DomInstructionType) {
		let [stack_ptr]=instruction;
		if(!ins_arr_map[stack_ptr]) ins_arr_map[stack_ptr]=[];
		let stack_loc=ins_arr_map[stack_ptr];
		if(stack_loc!==null) stack_loc.push(instruction);
	}
	parse_dom_stack(input_instructions: DomInstructionType[]): InstructionType[] {
		let depth_ins_map: DomInstructionType[][]=[];
		let ins_arr_map: (DomInstructionType[]|null)[]=[];
		let depths: number[]=[];
		for(let i=0;i<input_instructions.length;i++) {
			let cur=input_instructions[i];
			const [cur_depth,...cur_instruction]=cur;
			const prev_depth=depths.at(-1);
			if(!prev_depth) {
				continue;
			}
			if(prev_depth!=cur_depth) {
				console.log('vm_dom_1',prev_depth,'->',cur_depth);
				pd: if(cur_depth>prev_depth) {
					let instructions_at_1=ins_arr_map[prev_depth];
					let ins_dep_at_1=depth_ins_map[prev_depth];
					if(!instructions_at_1) break pd;
					if(!ins_dep_at_1) break pd;
					let ins_item_1=instructions_at_1[0];
					let ins_dep_item_1=ins_dep_at_1[0];
					while(ins_item_1[1]==='vm_block_trace'&&ins_item_1[3]) {
						let src_ty=ins_item_1[3];
						ins_item_1=(src_ty as any)[0];
						console.log(ins_dep_item_1);
						debugger;
					}
					console.log('vm_1','dep',prev_depth,'in idx',input_instructions.indexOf(ins_dep_item_1));
					let target_depth=prev_depth-1;
					if(target_depth<0) {
						break pd;
					}
					depth_ins_map[target_depth]??=[];
					if(depth_ins_map[target_depth].length>0) {
						depth_ins_map[target_depth].push([target_depth,'vm_block_trace','begin',null]);
						this.push_instruction_group(ins_arr_map,[target_depth,'vm_block_trace','begin',null]);
					}
					if(ins_item_1===null) {} else {
						depth_ins_map[target_depth].push([target_depth,'vm_block_trace','begin',[ins_item_1] as any]);
						this.push_instruction_group(ins_arr_map,[target_depth,'vm_block_trace','begin',[ins_item_1] as any]);
					}
				} else {
					let ins_item: DomInstructionType|null=null;
					let ins_dep_item_2: DomInstructionType|null=null;
					let instructions_at_2=ins_arr_map[prev_depth];
					let ins_dep_at_2=depth_ins_map[prev_depth];
					if(!instructions_at_2) break pd;
					ins_item=instructions_at_2[0];
					ins_dep_item_2=ins_dep_at_2[0];
					while(
						ins_item&&ins_item[1]==='vm_block_trace'&&ins_item[2]==='call'&&ins_item[3]&&
						ins_dep_item_2&&ins_dep_item_2[1]==='vm_block_trace'&&ins_dep_item_2[3]
					) {
						ins_item=ins_item[3];
						switch(ins_dep_item_2[2]) {
							case 'begin': ins_dep_item_2=ins_dep_item_2[3]; break;
							case 'block': throw new Error("Bad");
							case 'call': {
								if(ins_dep_item_2[3]===null) throw new Error("Bad");
								ins_dep_item_2=ins_dep_item_2[3];
							} break;
							case 'tagged': {
								let tag_pack: DomTaggedPack=ins_dep_item_2[3];
								if(ins_dep_item_2[3]===null) throw new Error("Bad");
								switch(tag_pack[0]) {
									case 'dom': ins_dep_item_2=tag_pack[1]; break;
									case 'dom_mem': throw new Error("Bad");
									case 'vm': throw new Error("Bad");
								}
							}
						}
						debugger;
					}
					if(ins_dep_item_2!==null) {
						console.log('vm_2','dep',prev_depth,'in idx',input_instructions.indexOf(ins_dep_item_2));
					}
					let target_depth=prev_depth-1;
					if(target_depth<0) {
						break pd;
					}
					depth_ins_map[target_depth]??=[];
					if(depth_ins_map[target_depth].length>0) {
						depth_ins_map[target_depth].push([target_depth,'vm_block_trace','begin',null]);
						this.push_instruction_group(ins_arr_map,[target_depth,'vm_block_trace','begin',null]);
					}
					depth_ins_map[target_depth].push([target_depth,'vm_block_trace','call',ins_item]);
					this.push_instruction_group(ins_arr_map,[target_depth,'vm_block_trace','call',ins_item]);
				}
			}
			depth_ins_map[cur_depth]??=[];
			depth_ins_map[cur_depth].push(cur);
			let instructions_at=ins_arr_map[cur_depth];
			if(instructions_at) {
				instructions_at.push([cur_depth,...cur_instruction]);
			} else {
				ins_arr_map[cur_depth]=[[cur_depth,...cur_instruction]];
			}
			depths.push(cur_depth);
		}
		let flat_with_depths: DomInstructionType[]=[];
		let flat_stack: DomInstructionType[]|null=[];
		let instructions: InstructionType[]=[];
		for(let i=0;i<depth_ins_map.length;i++) {
			let cur_instructions=ins_arr_map[i];
			let cur_ins_with_depths=depth_ins_map[i];
			if(!cur_ins_with_depths) continue;
			if(!cur_instructions) continue;
			flat_with_depths.push(...cur_ins_with_depths);
			flat_with_depths.push([i,"vm_return"]);
			flat_stack.push(...cur_instructions);
			flat_stack.push([i,"vm_return"]);
		}
		function is_marker_dep_ins(ins: DomInstructionType) {
			return ins[1]==='marker';
		}
		let flat_ins: DomInstructionType[]=[];
		let flat_dep_ins: DomInstructionType[]=[];
		let flat_all_ins: DomInstructionType[]=[];
		for(let i=0;i<flat_stack.length;i++) {
			let ins=flat_stack[i];
			let dep_ins=flat_with_depths[i];
			if(ins[1]!==dep_ins[1]) console.assert(false,ins,dep_ins);
			if(ins[1]==='vm_block_trace') {
				flat_ins.push(ins);
				flat_dep_ins.push(ins);
				flat_all_ins.push(dep_ins);
				continue;
			}
			flat_all_ins.push(dep_ins);
			if(!is_marker_dep_ins(dep_ins)) flat_dep_ins.push(dep_ins);
			if(!is_marker_dep_ins(ins)) flat_ins.push(ins);
		}
		let flat_ins_dep_2=[];
		for(let i=0;i<flat_ins.length;i++) {
			let ins=flat_ins[i];
			let dep_ins=flat_dep_ins[i];
			if(ins[1]==='vm_call_at') {
				let ix=ins[2];
				if(ix[0]==='dom') {
					let idx=flat_ins.indexOf(ix[1]);
					instructions.push(['vm_call',idx]);
				} else {
				}
			}
			if(ins[1]==='vm_block_trace'&&dep_ins[1]==='vm_block_trace'&&ins[2]==='call'&&dep_ins[2]==='call') {
				if(!ins[3]) throw 1;
				if(!dep_ins[3]) throw 1;
				let idx=flat_ins.indexOf(ins[3]);
				let dep_idx=flat_dep_ins.indexOf(dep_ins[3]);
				flat_ins_dep_2.push([dep_ins[0],'vm_block_trace','block',dep_idx]);
				instructions.push(['vm_block_trace','block',dep_ins[0],idx]);
			}
			flat_ins_dep_2.push(dep_ins);
			if(!is_marker_dep_ins(ins)) {
				switch(ins[1]) {
					case 'push': instructions.push([ins[1],...ins.slice(2)]); break;
					case 'marker': break;
					case 'vm_call_at': break;
					case 'vm_call': instructions.push([ins[1],ins[2]]); break;
					case 'call': instructions.push([ins[1],ins[2]]); break;
					case "cast": instructions.push([ins[1],ins[2]]); break;
					case "construct": instructions.push([ins[1],ins[2]]); break;
					case "je": instructions.push([ins[1],ins[2]]); break;
					case "jmp": instructions.push([ins[1],ins[2]]); break;
					case "peek": instructions.push([ins[1],ins[2]]); break;
					case "vm_block_trace": {
						switch(ins[2]) {
							case 'begin': instructions.push([ins[1],ins[2],ins[3]]); break;
							case 'block': instructions.push([ins[1],ins[2],ins[3],ins[4]]); break;
							case 'call': instructions.push([ins[1],ins[2],ins[3]]); break;
							case 'tagged': instructions.push([ins[1],ins[2],ins[3]]); break;
							case 'tagged_begin': instructions.push([ins[1],ins[2],ins[3]]); break;
							case 'tagged_call': instructions.push([ins[1],ins[2],ins[3]]); break;
						}
					} break;
					case 'modify_operand': instructions.push([ins[1],ins[2],ins[3]]); break;
					case 'append': instructions.push([ins[1]]); break;
					case 'breakpoint': instructions.push([ins[1]]); break;
					case 'get': instructions.push([ins[1]]); break;
					case 'drop': instructions.push([ins[1]]); break;
					case 'dup': instructions.push([ins[1]]); break;
					case 'halt': instructions.push([ins[1]]); break;
					case 'nop': instructions.push([ins[1]]); break;
					case 'return': instructions.push([ins[1]]); break;
					case 'vm_push_args': instructions.push([ins[1]]); break;
					case 'vm_push_ip': instructions.push([ins[1]]); break;
					case 'vm_push_self': instructions.push([ins[1]]); break;
					case 'vm_return': instructions.push([ins[1]]); break;
					case 'push_window_object': instructions.push([ins[1]]); break;
					case 'dom_filter': throw_bad_error(ins);
					case 'create_id': throw_bad_error(ins);
					case 'create': throw_bad_error(ins);
					default: let v: never=ins; v; throw new Error("assert");
				}
			}
			if(dep_ins[1]==='vm_block_trace'&&dep_ins[2]==='tagged') {
				let dx=dep_ins[3];
				if(dx&&dx[0]=='dom') {
					let dep_idx=flat_dep_ins.indexOf(dx[1]);
					flat_ins_dep_2.push([dep_ins[0],'vm_block_trace','call',dep_idx]);
				}
			}
		}
		console.log('parse_dom_stack instructions',flat_ins_dep_2,instructions);
		return instructions;
	}
	init_dom() {
		const font_size_px=22;
		let t=this;
		this.state_history_arr_max_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);
		let history=this.dom_map.get('history');
		if(history&&typeof history=='object') history.addEventListener('click',new EventHandlerDispatch(this,'history_element_click_handler'));
		let ratio=this.dom_map.get('ratio');
		if(ratio&&typeof ratio=='object') {
			ratio.addEventListener('click',function() {
				t.state.reset();
			});
		}
		let state_log=this.dom_map.get('state_log');
		if(state_log instanceof HTMLElement) state_log.style.fontSize=font_size_px+"px";
		window.addEventListener('unload',function() {
			t.save_state_history_arr();
			t.save_timeout_arr();
		});
	}
	global_init() {
		if(window.g_auto_buy) {
			window.g_auto_buy.destroy();
		}
		window.g_auto_buy=this as unknown as (Window['g_auto_buy']);
	}
	destroy() {
		this.root_node.destroy();
	}
	update_timeout_element() {
		if(this.timeout_ms) {
			let element=this.dom_map.get('timeout_element');
			if(element instanceof HTMLElement) {
				element.innerText=this.get_millis_as_pretty_str(this.round(this.timeout_ms),0);
			}
		}
	}
	do_zero_pad(value: string|number,pad_char: string,char_num: number) {
		let string;
		if(typeof value==='number') {
			string=value.toString();
		} else {
			string=value;
		}
		while(string.length<char_num) {
			string=pad_char+string;
		}
		return string;
	}
	get_millis_as_pretty_str(timeout_milli: number,milli_acc: number|undefined) {
		let time_arr=[];
		let float_milliseconds=timeout_milli%1000;
		let milli_len=6;
		if(milli_acc===0) {
			milli_len=3;
		}
		time_arr[3]=this.do_zero_pad(float_milliseconds.toFixed(milli_acc),'0',milli_len);
		timeout_milli-=float_milliseconds;
		timeout_milli/=1000;
		let int_seconds=timeout_milli%60;
		time_arr[2]=this.do_zero_pad(int_seconds,'0',2);
		timeout_milli-=int_seconds;
		timeout_milli/=60;
		let int_minutes=timeout_milli%60;
		time_arr[1]=this.do_zero_pad(int_minutes,'0',2);
		timeout_milli-=int_minutes;
		timeout_milli/=60;
		let int_hours=timeout_milli;
		time_arr[0]=this.do_zero_pad(int_hours,'0',2);
		int_hours===0&&(time_arr.shift(),int_minutes===0&&(time_arr.shift(),int_seconds===0&&time_arr.shift()));
		switch(time_arr.length) {
			case 1:
				return time_arr[0]+'ms';
			case 2:
				return time_arr[0]+'.'+time_arr[1];
			case 3:
				return time_arr.slice(0,2).join(":")+'.'+time_arr[2];
			case 4:
				return time_arr.slice(0,3).join(":")+'.'+time_arr[3];
		}
		return time_arr.join(":");
	}
	get_hours_num_as_pretty_str(hours_num: number) {
		let int_hours=~~hours_num;
		let time_arr=[];
		time_arr[0]=this.do_zero_pad(int_hours,'0',2);
		let float_minutes=(hours_num-int_hours)*60;
		let int_minutes=~~float_minutes;
		time_arr[1]=this.do_zero_pad(int_minutes,'0',2);
		let float_seconds=(float_minutes-int_minutes)*60;
		let int_seconds=~~float_seconds;
		time_arr[2]=this.do_zero_pad(int_seconds,'0',2);
		let float_milliseconds=(float_seconds-int_seconds)*1000;
		let float_milli_from_prev=float_milliseconds-1000;
		if(float_milliseconds>100&&float_milliseconds<900) {
			this.has_real_time=true;
		}
		x: if(this.has_real_time) {}
		else if(float_milliseconds<3e-9&&float_milliseconds>-3e-9) {}
		else if(float_milli_from_prev<3e-9&&float_milli_from_prev>-3e-9) {}
		else {
			break x;
			// console.log(float_milliseconds, float_milliseconds - 1000)
		}
		let int_milliseconds=~~float_milliseconds;
		if(int_milliseconds>=1000) {
			int_milliseconds-=1000;
			int_seconds++;
			if(int_seconds>=60) {
				int_seconds=0;
				int_minutes++;
				if(int_minutes>=60) {
					int_minutes=0;
					int_hours++;
					time_arr[0]=this.do_zero_pad(int_hours,'0',2);
					console.log('sec+ min+ hour+');
				} else {
					console.log('sec+ min+');
				}
				time_arr[1]=this.do_zero_pad(int_minutes,'0',2);
			} else {
				console.log('sec+');
			}
			time_arr[2]=this.do_zero_pad(int_seconds,'0',2);
		}
		time_arr[3]=this.do_zero_pad(int_milliseconds,'0',3);
		int_hours===0&&(time_arr.shift(),int_minutes===0&&(time_arr.shift(),int_seconds===0&&time_arr.shift()));
		switch(time_arr.length) {
			case 1:
				return time_arr[0]+'ms';
			case 2:
				return time_arr[0]+'.'+time_arr[1];
			case 3:
				return time_arr.slice(0,2).join(":")+'.'+time_arr[2];
			case 4:
				return time_arr.slice(0,3).join(":")+'.'+time_arr[3];
		}
		return time_arr.join(":");
	}
	update_hours_played() {
		const float_hours=((window.timeplayed/30)/60);
		const time_played_str=this.get_hours_num_as_pretty_str(float_hours);
		const hours_played_e=this.dom_map.get('hours_played');
		if(hours_played_e instanceof HTMLElement) hours_played_e.innerText=time_played_str;
		this.dom_map.set('time_played_str',time_played_str);
	}
	update_ratio_element() {
		const ratio=this.dom_map.get('ratio');
		if(!ratio) return;
		if(!(ratio instanceof HTMLElement)) return;
		ratio.innerText=(this.state.ratio*100).toFixed(2)+"%";
	}
	update_ratio_change_element() {
		const last_ratio=this.state.last_ratio*100;
		const cur_ratio=this.state.ratio*100;
		const ratio_diff=cur_ratio-last_ratio;
		let char_value="+";
		if(ratio_diff<0) char_value='';
		const ratio_change=this.dom_map.get('ratio_change');
		if(ratio_change&&ratio_change instanceof HTMLElement) ratio_change.innerText=char_value+ratio_diff.toExponential(3);
	}
	update_history_element() {
		let history=this.dom_map.get('history');
		if(history&&history instanceof HTMLElement) {
			let sample_len=this.state_history_arr_max_len;
			if(!sample_len) return;
			let end_sample=array_sample_end(this.state_history_arr,sample_len).join(" ");
			history.innerText=end_sample;
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
		this.next_timeout(this.update,125,'update',true);
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
		this.next_timeout(this.init_impl,200,'init',true);
	}
	set_secondinterval() {
		const disabled=false;
		if(disabled) return;
		//spell:words secondinterval
		if(window.secondinterval!==void 0) clearInterval(window.secondinterval);
		let time_base=performance.now();
		const interval_id=setInterval(function() {
			const real_time=performance.now();
			const time_diff=real_time-time_base;
			time_base=real_time;
			const real_rate=time_diff/2000;
			// we lost some time here, the diff was too large (got a 10 hours playtime from putting my pc to sleep)
			if(time_diff>2000) {
				// assume a max of 2 seconds passed
				window.timeplayed++;
				return;
			}
			window.timeplayed+=real_rate;
		},66);
		window.secondinterval=interval_id;
		this.root_node.append_child(new IntervalIdNodeRef(interval_id,function() {
			window.secondinterval=void 0;
		}));
	}
	set_timeplayed_update_interval() {
		this.root_node.append_raw(setInterval(function() {
			const doc=window.doc;
			const rounding=window.rounding;
			const totalAtome=window.totalAtome;
			const timeplayed=window.timeplayed;
			const calcPres=window.calcPres;
			doc.title=rounding(totalAtome,false,1).toString()+" atoms";
			//spell:words atomsaccu presnbr
			let atomsaccu_e=doc.getElementById('atomsaccu');
			if(atomsaccu_e) atomsaccu_e.innerHTML=rounding(window.atomsaccu,false,0);
			let timeplayed_e=doc.getElementById('timeplayed');
			if(timeplayed_e) timeplayed_e.innerHTML=(Math.round(timeplayed/30)/60).toFixed(2)+" hours";
			let presnbr_e=doc.getElementById('presnbr');
			if(presnbr_e) presnbr_e.innerHTML="<br>"+(calcPres()*100).toFixed(0)+" % APS boost";
		},2000),false);
	}
	replace_timeplayed_timer() {
		this.set_secondinterval();
		this.set_timeplayed_update_interval();
	}
	edit_fns() {
		// lightreset()
		// spell:words constel2
		let temp=window.lightreset.toString().replace("&& a != encrypt('Py')","&& a != encrypt('Py') && a != 'constel2'");
		let function_replace=new Function(temp.substring(temp.indexOf('{')+1,temp.lastIndexOf('}')));
		window.lightreset=function_replace as () => void;
	}
	init_impl() {
		this.init_dom();
		this.state.init();
		this.next_update();
		this.main();
		this.edit_fns();
		this.original_map.set('lightreset',window.lightreset);
		window.lightreset=lightreset_inject;
		window.specialclick=specialclick_inject;
		if(window.secondinterval) {
			this.replace_timeplayed_timer();
		}
	}
	state_history_clear_for_reset() {
		this.state_history_arr=["R"];
		localStorage.auto_buy_history_str="R";
	}
	state_history_append(value: string,silent=false) {
		this.epoch_len++;
		if(silent) return;
		if(!value) throw new Error("Invalid state append requested");
		let last=this.state_history_arr.at(-1);
		this.state_history_arr.push(value);
		this.state_history_arr=this.compressor.compress_array(this.state_history_arr);
		this.update_history_element();
		if(this.state.debug) console.log('history append',last,value);
		while(this.state_history_arr.length>2000) this.state_history_arr.shift();
	}
	history_element_click_handler(_event: Event) {
		this.root_node.destroy();
		this.set_update_timeout();
		this.set_auto_buy_timeout();
		// we destroyed the node this was attached to,
		// replace it again (it was there, we destroyed it, now please put it back)
		this.set_timeplayed_update_interval();
	}
	set_auto_buy_timeout() {
		if(this.timeout_ms) {
			this.timeout_ms=~~(this.timeout_ms*0.9);
		} else {
			this.timeout_ms=25;
		}
		this.start_main_async(true);
	}
	timeout_avg() {
		let first=this.timeout_arr[0];
		let min=first;
		let max=first;
		let total=0;
		for(var i=0;i<this.timeout_arr.length;i++) {
			let cur=this.timeout_arr[i];
			total+=cur;
			if(cur>max) {
				max=cur;
			}
			if(cur<min) {
				min=cur;
			}
		}
		const avg=total/this.timeout_arr.length;
		return [min,avg,max];
	}
	large_diff: number[]=[];
	calc_timeout_ms() {
		while(this.timeout_arr.length>60) this.timeout_arr.shift();
		let max=0;
		let total=0;
		for(var i=0;i<this.timeout_arr.length;i++) {
			total+=this.timeout_arr[i];
			max=Math.max(this.timeout_arr[i],max);
		}
		const val=total/this.timeout_arr.length;
		let num=val;
		this.last_value??=num;
		let diff=this.last_value-num;
		this.last_value=num;
		this.large_diff.push(num);
		let sorted_diff_arr=this.large_diff.map(e => e-num).sort((a,b) => a-b);
		let diff_want_mul=1;
		let diff_cur=diff;
		while(diff_cur>-1&&diff_cur<1&&diff_want_mul<1e18) {
			diff_cur*=10;
			diff_want_mul*=10;
		}
		diff_want_mul*=1000;
		let zero_idx=sorted_diff_arr.indexOf(0);
		let zs=zero_idx-8;
		let z_loss=0;
		if(zs<0) {
			z_loss=zs*-1;
			zs=0;
		}
		let ez_log=sorted_diff_arr.map(e => {
			if(e===0) return e;
			return this.round(e*diff_want_mul);
		});
		log_if(LOG_LEVEL_INFO,'calc_timeout_ms sorted_diff index',zero_idx,'diff is',this.round(diff*diff_want_mul)/diff_want_mul);
		log_if(LOG_LEVEL_INFO,'calc_timeout_ms l_diff %o %o\n%o',ez_log.slice(0,8),ez_log.slice(-8),ez_log.slice(zs,zero_idx+z_loss+8));
		return this.round(val);
	}
	is_epoch_over() {
		let epoch_diff=Date.now()-this.epoch_start_time;
		return epoch_diff>60*5*1000;
	}
	start_main_async(no_wait=false) {
		return this.with_async.do_start_main_async(no_wait).then(_e => {},e => {
			console.log('err',e);
			console.log('canceled main_async');
		});
	}
	main() {
		console.log('start main_async');
		this.timeout_ms=this.calc_timeout_ms();
		this.start_main_async();
	}
	do_large_decrease() {
		this.do_timeout_dec([1.005],60);// 60
	}
	do_normal_decrease() {
		this.do_timeout_dec([1.004],80);// 80
	}
	do_rare_begin_change() {
		this.do_timeout_inc([1.008,1.03],10);
	}
	unit_upgradable_count=0;
	unit_promote_start() {
		this.timeout_ms=this.calc_timeout_ms();
		this.pre_total=window.totalAtome;
		this.do_unit_promote();
		let money_diff=this.pre_total-window.totalAtome;
		let loss_rate=money_diff/this.pre_total;
		if(this.pre_total!=window.totalAtome) {
			this.unit_upgradable_count++;
		}
		if(this.pre_total!=window.totalAtome&&this.debug) {
			let log_args=[];
			let percent_change=(loss_rate*100).toFixed(5);
			let money_str=window.totalAtome.toExponential(3);
			log_args.push(this.iter_count);
			log_args.push(percent_change);
			log_args.push(money_str);
			console.log(...log_args);
		}
		this.iter_count+=1;
		return loss_rate;
	}
	do_fast_unit_step_change() {
		this.do_timeout_dec([1.006],10);
	}
	do_fast_unit_change() {
		this.do_timeout_dec([1.006],10);
	}
	get_timeout_change(pow_base: number,pow_num: number,div: number) {
		if(!this.timeout_ms) throw new Error("Invalid");
		let pow_res=Math.pow(pow_base,pow_num);
		let res=this.timeout_ms*pow_res;
		return res/div;
	}
	update_timeout_inc(change: number) {
		if(window.__testing__) {
			return;
		}
		if(!this.timeout_ms) throw new Error("Invalid");
		let value=this.round(this.timeout_ms+change);
		log_if(LOG_LEVEL_INFO,'inc',this.timeout_ms,value-this.timeout_ms);
		this.timeout_arr.push(value);
	}
	update_timeout_dec(change: number) {
		if(window.__testing__) {
			return;
		}
		if(!this.timeout_ms) throw new Error("Invalid");
		let value=this.round(this.timeout_ms-change);
		if(value<25) value=25;
		log_if(LOG_LEVEL_INFO,'dec',this.timeout_ms,this.timeout_ms-value);
		this.timeout_arr.push(value);
	}
	round(value: number) {
		return ~~value;
	}
	do_timeout_dec(pow_terms: number[],div: number) {
		let change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		this.update_timeout_dec(change);
	}
	do_timeout_inc(pow_terms: number[],div: number) {
		let iter_term=Math.pow(pow_terms[1],this.iter_count);
		let change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		this.update_timeout_inc(change*iter_term);
	}
	next_timeout_async_err_log(msg: string,err: Error) {
		let stack_trace: StackTraceType={stack: "Error\n    at <anonymous>"};
		if(err.stack===void 0) Error.captureStackTrace(stack_trace);
		let err_stack_tmp=null;
		if(err.stack) err_stack_tmp=err.stack;
		else err_stack_tmp=stack_trace.stack;
		let err_stack=err_stack_tmp.split("\n").slice(1);
		function rm(str: string) {
			if(err_stack.length===0) return false;
			if(err_stack[0].includes(str)) {
				err_stack=err_stack.slice(1);
				return true;
			}
			return false;
		}
		while(true) {
			if(rm("at AutoBuy.next_timeout_async")) continue;
			if(rm("at AutoBuy.large_decrease_async")) continue;
			if(rm("at AutoBuy.normal_decrease_async")) continue;
			if(rm("at AutoBuy.faster_timeout_async")) continue;
			if(rm("at AutoBuy.main_async")) continue;
			break;
		}
		if(err_stack.length>0) {
			console.log("%s\n%s",msg,err_stack.map(e => {
				if(e.slice(0,4)=='    ') e=e.slice(4);
				if(e.slice(0,3)=='at ') e=e.slice(3);
				return e;
			}).join("\n"));
		}
	}
	[labeled_sym("next_timeout_async")](timeout: number|undefined,char: string) {
		console.log('next_timeout_async',char,timeout);
		let err=new Error;
		this.next_timeout_async_err_log('next_timeout_async stk',err);
	}
	timeout_ms?: number;
	next_timeout(trg_fn: () => void,timeout: number|undefined,char: string,silent=false) {
		let node=new TimeoutNode(timeout);
		this.root_node.append_child(node);
		node.start(new TimeoutTarget(this,trg_fn));
		if(!silent) {
			this.timeout_ms=timeout;
			this.update_timeout_element();
		}
		this.state_history_append(char,silent);
	}
	do_unit_promote() {
		do_auto_unit_promote();
	}
	is_special_done(special_buyable: {done: any; cost: number;}) {
		return !special_buyable.done&&special_buyable.cost<window.totalAtome;
	}
	next_special() {
		return window.allspec.findIndex(this.is_special_done);
	}
	do_special() {
		let ret=false;
		for(let index=this.next_special();;index=this.next_special()) {
			if(index>-1) {
				window.specialclick(index);
				ret=true;
			} else break;
		}
		return ret;
	}
	maybe_run_reset() {
		if(!this.timeout_ms) return false;
		let count=0;
		count+=+(this.timeout_ms>30*1000);
		count+=+(this.state.ratio>1);
		count+=+this.is_epoch_over();
		count+=+(this.state.locked_cycle_count<100);
		switch(count) {
			case 0:
			case 1:
			case 2:
			case 3:
				break;
			default: console.log('maybe_run_reset count',count);
		}
		if(this.state.ratio>1&&this.is_epoch_over()&&this.state.locked_cycle_count<100) {
			this.do_game_reset();
			return true;
		}
		return false;
	}
	do_game_reset() {
		if(!this.timeout_ms) {
			this.timeout_ms=300;
		}
		this.next_timeout(this.game_reset_step_1,this.round(this.timeout_ms/3),'1R');
		this.on_repeat_r();
	}
	do_audio_mute_toggle() {
		if(!AudioMuted) {
			if(this.background_audio) {
				this.background_audio.muted=!this.background_audio.muted;
			}
			window.mute();
		}
	}
	game_reset_step_1() {
		this.do_audio_mute_toggle();
		// 60*5*1000
		this.next_timeout(this.game_reset_step_2,15*1000,'2R');
	}
	game_reset_step_2() {
		this.do_audio_mute_toggle();
		// 60*5*1000
		this.next_timeout(this.game_reset_finish,15*1000,'3R');
	}
	game_reset_finish() {
		this.update_hours_played();
		let str=this.dom_map.get("time_played_str");
		if(typeof str=='string') {
			this.dispatch_on_game_reset_finish(str);
		} else {
			this.dispatch_on_game_reset_finish("0.000");
		}
	}
	dispatch_on_game_reset_finish(time_played: string) {
		this.state.on_game_reset_finish(time_played);
		this.on_game_reset_finish(time_played);
	}
	on_game_reset_finish(time_played: string) {
		console.info('fire lightreset at %s',time_played);
		let prestige_acc=10000;
		let real_val=window.calcPres()*100;
		let [,num,exponent]=this.state.calc_near_val(real_val);
		let near_val=(~~(num*prestige_acc))/prestige_acc;
		if(exponent<=-2||exponent>=2) {
			console.info('p_calc_1:expected prestige (%o,%o)%%',near_val,exponent);
		} else {
			console.info('p_calc_2:expected prestige %o%%',(~~(real_val*prestige_acc))/prestige_acc);
		}
		window.lightreset();
	}
	on_repeat_r() {
		this.next_timeout(this.on_repeat_r,1*1000,'r');
	}
}
function do_auto_unit_promote() {
	let do_unit_see=false;
	let arUnit=window.arUnit;
	let Get_Unit_Type=window.Get_Unit_Type;
	let getUnitPromoCost=window.getUnitPromoCost;
	let Find_ToNext=window.Find_ToNext;
	let totalAtome=window.totalAtome;
	let _targets=window._targets;
	let _targets_achi=window._targets_achi;
	let totalAchi=window.totalAchi;
	let mainCalc=window.mainCalc;
	let tonext=window.tonext;
	var out=[],maxed=[];
	for(var k=0;k<arUnit.length;k++) {
		var afford=false;
		if(arUnit[k][16]==true||k==0) {
			var type=Get_Unit_Type(k);
			var tmp=getUnitPromoCost(k);
			var cost=tmp;
			var next=Find_ToNext(k);
			if(next<0) maxed[k]=true;
			for(var i=1;i<=100;i++) {
				if(totalAtome>=cost) {
					tmp=tmp+(tmp*arUnit[k][3])/100;
					var tar=(arUnit[k][4]*1)+i;
					var a=_targets.indexOf(tar);
					var reduction=1;
					ib: if(a>-1&&tar<=1000) {
						for(var k2 in type[2]) if(type[2][k2]!=k&&arUnit[type[2][k2]][4]<tar) break ib;
						var c=_targets_achi.indexOf(totalAchi()+1);
						if(c>-1) reduction*=(1-((c+1)*0.01));
						reduction*=1-((a+1)*0.01);
					}
					tmp*=reduction;
					cost+=tmp;
				} else break;
				if(i==next||(maxed[k]&&i==100)) afford=true;
			}
			if(afford) out[k]=true; else out[k]=false;
		}
	}
	let res=out.lastIndexOf(true);
	if(res<0) return;
	if(do_unit_see) window.seeUnit(res);
	if(maxed[res]) for(var y=0;y<100;y++)mainCalc(res); else tonext(res);
}
const auto_buy_obj=new AutoBuy;
function to_tuple_arr<T,U>(keys: T[],values: U[]): [T,U][] {
	let ret: [T,U][]=[];
	for(let i=0;i<keys.length;i++) {
		let k=keys[i];
		let v=values[i];
		let item: [T,U]=[k,v];
		ret.push(item);
	}
	return ret;
}
function array_sample_end(arr: string[],rem_target_len: number) {
	arr=arr.slice(-300);
	let rem_len=char_len_of(arr);
	while(rem_len>rem_target_len) {
		if(!arr.length) break;
		let val=arr.shift();
		if(val===void 0) continue;
		rem_len-=val.length+1;
	}
	return arr;
}
function char_len_of(arr: any[]) {
	return arr.reduce((a,b) => a+b.length,0)+arr.length;
}
function lightreset_inject() {
	window.g_auto_buy.state_history_clear_for_reset();
	window.g_auto_buy.skip_save=true;
	window.addEventListener('unload',function() {
		window.g_auto_buy.skip_save=false;
		localStorage.auto_buy_timeout_str="300,300,300,300";
		localStorage.long_wait=12000;
	});
	let original=window.g_auto_buy.original_map.get('lightreset');
	if(!original) {
		alert('unable to light reset game');
		throw new Error("Missing original lightreset");
	}
	original();
}
function specialclick_inject(that: number) {
	let allspec=window.allspec;
	let totalAtome=window.totalAtome;
	let atomsinvest=window.atomsinvest;
	let doc=window.doc;
	let gritter=window.gritter;
	let specialsbought=window.specialsbought,noti=window.noti;
	let rounding=window.rounding,calcDiff=window.calcDiff,arUnit=window.arUnit,atomepersecond=window.atomepersecond;
	let arrayNames=window.arrayNames,plurials=window.plurials,toTitleCase=window.toTitleCase;
	let updateprogress=window.updateprogress,seeUnit=window.seeUnit,checkspec=window.checkspec,achiSpec=window.achiSpec;
	if(allspec[that].done==undefined) allspec[that].done=false;
	if(allspec[that].cost<=totalAtome&&allspec[that].done==false) {
		let specialsbought_e=doc.getElementById('specialsbought');
		if(specialsbought_e) specialsbought_e.innerText=rounding(++specialsbought,false,0);
		if(that==74) {
		}
		atomsinvest+=allspec[that].cost;
		let atomsinvest_e=doc.getElementById("atomsinvest");
		if(atomsinvest_e) atomsinvest_e.innerText=rounding(atomsinvest,false,0);
		allspec[that].done=true;
		totalAtome-=allspec[that].cost;
		var diff1=calcDiff(that);
		for(var a in arUnit[that][17]) arUnit[that][17][a]*=100;
		arUnit[that][5]*=100;
		var spec_aps=0;
		if(arUnit[that][4]>0) {
			spec_aps=(calcDiff(that)-diff1);
			atomepersecond+=spec_aps;
		}
		//spell:ignore noti plurials
		if(noti) gritter('Power-up !',toTitleCase(plurials(arrayNames[that]))+" X100 APS",null,"+"+rounding(spec_aps,false,0)+" APS","");
		//spell:ignore updateprogress
		updateprogress(that);
		$('#spec'+that).remove();
		if(that<74) {
			seeUnit(that+1);
		} else {
			seeUnit(that-1);
		}
		seeUnit(that);
		//spell:ignore checkspec
		checkspec();
		//spell:ignore achiSpec
		achiSpec();
	}
	window.totalAtome=totalAtome;
	window.atomsinvest=atomsinvest;
	window.atomepersecond=atomepersecond;
	window.specialsbought=specialsbought;
}
function got_jquery(value: typeof $) {
	Object.defineProperty(window,'$',{
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
	use_jquery();
}
function use_jquery() {
	let jq: typeof $=window.$;
	if(!jq) return;
	if(typeof jq!='function') return;
	let res=jq('head');
	let r_proto=Object.getPrototypeOf(res);
	r_proto.lazyload=function(..._a: any[]) {};
	return jq;
}
function proxy_jquery() {
	let val=use_jquery();
	set_jq_proxy(val);
}
function set_jq_proxy(value: typeof $|undefined) {
	let s_value=value;
	Object.defineProperty(window,'$',{
		get() {
			return s_value;
		},
		set(value) {
			s_value=value;
			got_jquery(value);
			return true;
		},
		enumerable: true,
		configurable: true
	});
}
let seen_elements=new WeakSet;
function remove_html_nodes(node: HTMLScriptElement) {
	if(seen_elements.has(node)) return;
	seen_elements.add(node);
	if(!node.src) return;
	if(node.src.includes("analytics.js")&&node.src.includes("google")) return node.remove();
	if(node.src.includes("platform.js")) return node.remove();
	//spell:disable-next-line
	if(node.src.indexOf("opentracker")>-1) return node.remove();
	//spell:disable-next-line
	if(node.src.includes("pagead/js/adsbygoogle.js")) return node.remove();
	if(node.src.includes("/js/platform.js")) return node.remove();
	if(new URL(node.src).origin!=location.origin) return;
	if(node.src.indexOf("ads")>-1||node.src.indexOf("track")>-1) return node.remove();
}
function do_dom_filter() {
	Array.prototype.forEach.call(document.querySelectorAll("script"),remove_html_nodes);
}
function on_game_data_set() {
	log_if(LOG_LEVEL_INFO,'game data init');
	do_dom_filter();
	auto_buy_obj.pre_init();
	setTimeout(auto_buy_obj.init.bind(auto_buy_obj),300);
	window.constelOff();
}
function wait_for_game_data() {
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		setTimeout(wait_for_game_data,0);
	}
}
function action_1() {
	log_if(LOG_LEVEL_INFO,'start wait');
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		wait_for_game_data();
	}
	do_dom_filter();
}
function dom_add_elm_filter(elm: HTMLScriptElement) {
	if(elm&&elm.nodeName==="SCRIPT") {
		if(!elm.src) {
			console.log(elm);
			return true;
		}
		if(elm.src&&new URL(elm.src).origin===location.origin) {
			do_dom_filter();
			return true;
		}
		return false;
	}
	return true;
}
function enable_jquery_proxy_if_needed() {
	let enable_proxy=true;
	if(enable_proxy) {
		proxy_jquery();
	}
}
function do_load_fire_promise(promise_accept: (value: any) => void) {
	if(document.firstChild) {
		document.firstChild.remove();
	}
	promise_accept(null);
}
function page_url_no_protocol() {
	return location.href.slice(location.protocol.length);
}
function popstate_event_handler(e: PopStateEvent) {
	console.log('popstate',e.state,location.href);
	if(e.state===null) {
		let non_proto_url=page_url_no_protocol();
		if(non_proto_url=="//rebuildtheuniverse.com/mjz_version") {
			history.go(-1);
		} else if(non_proto_url=="//rebuildtheuniverse.com/?type=mjz_version") {
			history.go(-1);
		}
	}
	if(e.state) {
	} else {
	}
}
function reset_global_event_handlers() {
	window.onpopstate=popstate_event_handler;
}
class BaseMutationObserver {
	observer: MutationObserver|null;
	constructor() {
		this.observer=null;
	}
	disconnect() {
		if(!this.observer) return;
		this.observer.disconnect();
	}
}
class DetachedMutationObserver extends BaseMutationObserver {
	constructor(target: Node) {
		super();
		let mutationObserver=new MutationObserver(this.callback);
		let options={
			subtree: true,
			childList: true,
			attributes: true,
			attributeOldValue: true,
			characterData: true,
			characterDataOldValue: true,
		};
		mutationObserver.observe(target,options);
		this.observer=mutationObserver;
	}
	callback(_mutations: MutationRecord[],observer: MutationObserver): void {
		observer.disconnect();
	}
}
class LoadMutationObserver extends BaseMutationObserver {
	m_callback: (mut_vec: MutationRecord[],mut_observer: MutationObserver) => void;
	constructor(target: Node,callback: (mut_vec: MutationRecord[],mut_observer: MutationObserver) => void) {
		super();
		this.m_callback=callback;
		let mutationObserver=new MutationObserver(this.callback.bind(this));
		let options={
			childList: true,
			subtree: true
		};
		mutationObserver.observe(target,options);
		this.observer=mutationObserver;
	}
	callback(mutations: Parameters<MutationCallback>[0],observer: Parameters<MutationCallback>[1]) {
		this.m_callback(mutations,observer);
		observer.disconnect();
	}
}
let mut_observers: BaseMutationObserver[]=[];
window.g_mut_observers=mut_observers;
function insert_before_enabled(node: Node,child: Node|null): boolean {
	if(node instanceof HTMLScriptElement) {
		let should_insert_1=dom_add_elm_filter(node);
		if(!should_insert_1) return false;
	}
	if(child instanceof HTMLScriptElement) {
		let should_insert_2=dom_add_elm_filter(child);
		if(!should_insert_2) return false;
	}
	return true;
}
function main() {
	if(location.pathname.match('test')) {
		return;
	}
	reset_global_event_handlers();
	enable_jquery_proxy_if_needed();
	document.addEventListener('onContentLoaded',do_dom_filter);
	Node.prototype.insertBefore=new Proxy(Node.prototype.insertBefore,{
		apply(target,thisValue,parameters: [Node,Node]) {
			if(insert_before_enabled(...parameters)) {
				return Reflect.apply(target,thisValue,parameters);
			}
		}
	});
	let document_write_list=new DocumentWriteList;
	document_write_list.attach_proxy(document);
	document_write_list.document_write_proxy;
	window.document_write_list=document_write_list;
	document.stop=function() {};
	function nop_timeout() {
		console.log('nop timeout');
		return -1;
	}
	let real_st=setTimeout;
	let real_si=setInterval;
	window.setTimeout=nop_timeout as unknown as (typeof setTimeout);
	window.setInterval=nop_timeout as unknown as (typeof setInterval);
	function no_aev(...v: any[]) {
		console.log('aev',v);
	}
	let orig_aev=EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener=no_aev;
	async function do_fetch_load() {
		reset_global_event_handlers();
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		await new Promise(function(a) {
			window.addEventListener('load',function lis() {
				setTimeout(a);
				window.removeEventListener('load',lis);
			});
		});
		reset_global_event_handlers();
		let orig_url=location.href;
		let loc_url=location.origin+location.pathname;
		let prev_state=history.state;
		let next_gen=0;
		if(prev_state&&prev_state.gen) {
			next_gen=prev_state.gen+1;
		}
		let hist_state={
			gen: next_gen
		};
		let skip=true;
		x: {
			if(skip) break x;
			await new Promise(function(a) {
				if(localStorage.justReset==='true') {
					return a(null);
				}
				window.g_do_load=do_load_fire_promise.bind(null,a);
				document.writeln(`<head></head><body><a href onclick="g_do_load()">load with fetch</a></body>`);
				reset_global_event_handlers();
				document.close();
			});
		}
		reset_global_event_handlers();
		history.pushState(hist_state,'',orig_url);
		const rb_html=await (await fetch(loc_url)).text();
		{
			let la=mut_observers.pop();
			if(!la) throw new Error("mut_observers underflow");
			la.disconnect();
		}
		set_jq_proxy(window.$);
		let arr: any[]=[];
		let any_cur: any=arr;
		window.adsbygoogle=any_cur;
		window.adsbygoogle.op=window.adsbygoogle.push;
		window.adsbygoogle.push=function(e) {
			let cs=document.currentScript;
			let ls: Element|null=null;
			let rs: Element|null=null;
			if(!cs) return;
			window.g_cs??=[];
			window.g_cs.push(cs);
			let prev=cs.previousElementSibling;
			if(prev&&prev instanceof HTMLElement&&prev.dataset.adSlot) {
				let ad_slot=cs.previousElementSibling;
				if(prev.previousElementSibling) ls=prev.previousElementSibling;
				if(cs.nextElementSibling) rs=cs.nextElementSibling;
				console.log('cs nextElementSibling',rs);
				if(ad_slot) ad_slot.remove();
				cs.remove();
				while(ls&&ls instanceof HTMLScriptElement&&ls.src&&ls.src.includes("adsbygoogle")) {
					let ls_tmp=ls.previousElementSibling;
					ls.remove();
					ls=ls_tmp;
				}
			}
			window.adsbygoogle.op(e);
			do_dom_filter();
		};
		let rb_html_tmp=rb_html.replace(/https:\/\/apis.google.com\/js\/platform.js/,"");
		//spell:disable-next-line
		rb_html_tmp=rb_html_tmp.replace("//script.opentracker.net/?site=rebuildtheuniverse.com","");
		let rc=0;
		let did_rep=true;
		function on_html_replace() {
			rc++;
			did_rep=true;
			return "";
		}
		//spell:disable-next-line
		let json_rep_1=`"\x3Cscript>\\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\\n  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\\n\\n  ga('create', 'UA-63134422-1', 'auto');\\n  ga('send', 'pageview');\\n\\n\x3C/script>"`;
		let rem_str_1=JSON.parse(json_rep_1);
		while(did_rep) {
			did_rep=false;
			//spell:disable-next-line
			rb_html_tmp=rb_html_tmp.replace("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",on_html_replace);
			if(did_rep) continue;
			rb_html_tmp=rb_html_tmp.replace(rem_str_1,on_html_replace);
		}
		let script_num=[...rb_html_tmp.matchAll(/<\s*script.*?>/g)].length;
		let loaded_scripts_count=0;
		console.log(rc);
		mut_observers.push(new LoadMutationObserver(document,function(mut_vec,mut_observer) {
			let log_data_vec=[];
			log_data_vec.push(mut_vec.length,document.body!=null);
			let added_scripts: HTMLScriptElement[]=[];
			let removed_scripts: HTMLScriptElement[]=[];
			for(let i=0;i<mut_vec.length;i++) {
				let mut_rec=mut_vec[i];
				let add_node_list=mut_rec.addedNodes;
				for(let j=0;j<add_node_list.length;j++) {
					let cur_node=add_node_list[j];
					if(!cur_node) {
						debugger;
						continue;
					}
					if(cur_node instanceof HTMLScriptElement) {
						added_scripts.push(cur_node);
					}
				}
				let remove_node_list=mut_rec.removedNodes;
				for(let j=0;j<remove_node_list.length;j++) {
					let cur_node=remove_node_list[j];
					if(cur_node instanceof HTMLScriptElement) {
						removed_scripts.push(cur_node);
					}
				}
			}
			if(document.body) log_data_vec.push('b',document.body.children.length);
			else log_data_vec.push('h',document.head.children.length);
			log_data_vec.push(document.querySelectorAll("script").length);
			loaded_scripts_count+=added_scripts.length;
			if(loaded_scripts_count>=script_num) {
				log_if(LOG_LEVEL_INFO,'observer script count',loaded_scripts_count,script_num);
				console.info('load observer ',...log_data_vec);
				reset_global_event_handlers();
				mut_observer.disconnect();
			}
		}));
		mut_observers[0].disconnect();
		window.g_page_content={
			request_content: rb_html,
			cur: rb_html_tmp
		};
		reset_global_event_handlers();
		document.writeln(rb_html_tmp);
		reset_global_event_handlers();
		action_1();
		document.close();
		reset_global_event_handlers();
		window.onunload=function() {
			console.info('unload');
		};
		window.onbeforeunload=function() {
			console.info('before unload');
			if(history.state?.gen!==void 0&&history.state.prev===void 0) {
				// https://rebuildtheuniverse.com/mjz_version/
				history.replaceState({prev: history.state,gen: history.state.gen+1},"",orig_url);
			}
		};
	}
	function on_dom_load() {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		document.addEventListener('DOMContentLoaded',function() {
			setTimeout(action_1,300);
		});
	}
	function do_page_replace() {
		mut_observers.push(new DetachedMutationObserver(document));
		document.writeln("");
		reset_global_event_handlers();
		do_fetch_load();
		document.close();
	}
	let page_url=location.href;
	let non_proto_url=page_url_no_protocol();
	if(non_proto_url=="//rebuildtheuniverse.com/mjz_version") {
		do_page_replace();
	} else if(non_proto_url=="//rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(page_url=="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(non_proto_url=="//rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(page_url==="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(page_url==="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=inject") {
		document.stop=function() {};
		on_dom_load();
		document_write_list.destroy();
	} else if(non_proto_url=="//rebuildtheuniverse.com/") {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		document_write_list.destroy();
	} else if(page_url==="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/") {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		document_write_list.destroy();
	} else {
		console.log('handle location pathname',location.pathname);
	}
}
function init() {
	update_logger_vars();
	auto_buy_obj.global_init();
	window.g_log_if=log_if;
}
init();
log_if(LOG_LEVEL_TRACE,'userscript main');
main();
