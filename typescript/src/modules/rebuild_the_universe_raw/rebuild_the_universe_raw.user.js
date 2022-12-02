// ==UserScript==
// @name		rebuild the universe
// @namespace	http://tampermonkey.net/
// @version		4.2.0
// @description	rebuildtheuniverse.com automation
// @author		You
// @match		http://rebuildtheuniverse.com/?type=real
// @match		http://rebuildtheuniverse.com/?type=mjz_version
// @match		http://rebuildtheuniverse.com
// @match		https://rebuildtheuniverse.com/?type=real
// @match		https://rebuildtheuniverse.com/?type=mjz_version
// @match		https://rebuildtheuniverse.com
// @match		https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/
// @match		https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=inject
// @match		https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=mjz_version
// @match		https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=real
// @run-at		document-start
// @grant		none
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/typescript/src/modules/rebuild_the_universe_raw/rebuild_the_universe_raw.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/typescript/src/modules/rebuild_the_universe_raw/rebuild_the_universe_raw.user.js
// ==/UserScript==
/* eslint-disable no-undef,no-lone-blocks,no-eval */

function fetch_all_images() {
	return Promise.all(arUnit.slice(0,-1).map(e => "images/"+e[11]).map(async e => {
		try {
			let f=await fetch(e);
			let t=await f.text();
			return t.length;
		} catch(e) {
			return e;
		}
	}));
}
fetch_all_images;

function fetch_all_images_full() {
	return arrayNames.map(e => e.indexOf('cat')>-1? 'cats-eye-nebula':e).map(e => "imagesFull/"+e.replace(/\s+/g,'-')+".jpg").map(e => fetch(e));
}
fetch_all_images_full;

function fetch_all_specs() {
	return allspec.map((_e,i) => "specs/"+(i+1)+".jpg").map(e => fetch(e));
}
fetch_all_specs;

// tampermonkey is overwriting the console...
// grab it from window.console
console=window.console;

const AUDIO_ELEMENT_VOLUME=0.58;
const AudioMuted=true;

const AutoBuyMulModifierFactor=1;
const AutoBuyRatioDiv=1;
const calcPres_target_percent=1;

const LOG_LEVEL_CRIT=1;
const LOG_LEVEL_ERROR=2;
const LOG_LEVEL_WARN=3;
const LOG_LEVEL_NOTICE=4;
const LOG_LEVEL_INFO=5;
const LOG_LEVEL_DEBUG=6;
const LOG_LEVEL_TRACE=7;

let local_logging_level=3;
let LogErrorAsConsoleError=false;
let logger_updated=false;
/** @arg {number} level @arg {string} format_str @arg {any[]} args */
function append_console_message(level,format_str,...args) {
	if(!logger_updated) update_logger_vars();
	let level_str=human_log_level(level);
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
	logger_updated=false;
}
/** @arg {number} level*/
function human_log_level(level) {
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
/** @arg {number} level @arg {string} format_str @arg {any[]} args */
function log_if(level,format_str,...args) {
	update_logger_vars();
	if(level>local_logging_level) return;
	append_console_message(level,format_str,...args);
}
function update_logger_vars() {
	logger_updated=true;
	if(sessionStorage["LogErrorAsConsoleError"]) {
		LogErrorAsConsoleError=sessionStorage["LogErrorAsConsoleError"]==='true';
	}
	if(sessionStorage["LoggingLevel"]) {
		local_logging_level=parseInt(sessionStorage["LoggingLevel"],10);
	}
}
function trigger_debug_breakpoint() {
	debugger;
}
class CSSStyleSheetConstructorBoxImpl {
	/** @type {"constructor_box"} */
	type="constructor_box";
	/** @type {"javascript"} */
	from="javascript";
	/** @type {"CSSStyleSheet"} */
	instance_type="CSSStyleSheet";
	/** @type {"CSSStyleSheet"} */
	constructor_type="CSSStyleSheet";
	/** @arg {'function'|'object'} to_match */
	as_type(to_match) {
		if(typeof this.value===to_match) {
			return this;
		}
		return null;
	}
	/** @arg {StackVMImpl} _vm @arg {string} key */
	on_get(_vm,key) {
		console.log('get','CSSStyleSheetConstructorBox',key);
	}
	factory() {
		return new CSSStyleSheetBoxImpl(new this.value);
	}
	/** @arg {typeof CSSStyleSheet} value */
	constructor(value) {
		this.value=value;
	}
}
/** @typedef {import("../../box/CSSStyleSheetBox.js").CSSStyleSheetBox} CSSStyleSheetBox_CJS */
/** @implements {CSSStyleSheetBox_CJS} */
class CSSStyleSheetBoxImpl {
	/** @readonly */
	type="CSSStyleSheetBox";
	/** @readonly */
	next_member="instance_type";
	/** @readonly */
	instance_type="CSSStyleSheet";
	/** @arg {'object'|'function'} to_match */
	as_type(to_match) {
		if(to_match==='object') return this;
		return null;
	}
	/** @type {CSSStyleSheet} */
	value;
	/** @arg {CSSStyleSheet} value */
	constructor(value) {
		this.value=value;
	}
}
/** @typedef {import("../../box/StackVMBox.js").StackVMBox} StackVMBox_CJS */
/** @implements {StackVMBox_CJS} */
class StackVMBoxImpl {
	/** @type {"custom_box"} */
	type="custom_box";
	/** @type {"StackVM"} */
	box_type="StackVM";
	/**
	 * @param {string} to_match
	 */
	as_type(to_match) {
		if(typeof this.value===to_match) {
			return this;
		}
		return null;
	}
	/** @type {StackVMImpl} */
	value;
	/** @arg {StackVMImpl} value */
	constructor(value) {
		this.value=value;
	}
}
/** @typedef {import("../../box/WindowBox.js").WindowBox} WindowBox_CJS */
/** @implements {WindowBox_CJS} */
class WindowBoxImpl {
	/** @type {"object_box"} */
	type="object_box";
	extension=null;
	/** @type {"Window"} */
	inner_type="Window";
	/**
	 * @param {string} to_match
	 */
	as_type(to_match) {
		if(typeof this.value===to_match) {
			return this;
		}
		return null;
	}
	/** @type {Window} */
	value;
	/** @arg {Window} value */
	constructor(value) {
		this.value=value;
	}
}
/** @typedef {import("../../box/ObjectBox.js").ObjectBox} ObjectBox_CJS */
/** @implements {ObjectBox_CJS} */
class ObjectBoxImpl {
	/** @readonly */
	type="object_box";
	/** @readonly */
	inner_type="object";
	/** @readonly */
	extension="null";
	/**
	 * @param {string} to_match
	 */
	as_type(to_match) {
		if(typeof this.value===to_match) {
			return this;
		}
		return null;
	}
	/** @type {{}} */
	value;
	/** @arg {{}} value */
	constructor(value) {
		this.value=value;
	}
}

/** @template T */
class NewableInstancePackImpl {
	/** @arg {new (...a: Box_CJS[]) => T} box_value @arg {Box_CJS[]} construct_args @returns {Box_CJS} */
	make_box(box_value,construct_args) {
		box_value; construct_args;
		return new VoidBoxImpl;
	}
}

class NewableFunctionBoxImpl {
	/** @arg {NewableInstancePackImpl<{}>} factory_value @arg {new (...a: Box_CJS[]) => {}} class_value */
	constructor(factory_value,class_value) {
		this.factory_value=factory_value;
		this.class_value=class_value;
	}
	/** @arg {StackVMImpl} _vm @arg {string} key */
	on_get(_vm,key) {
		console.log('get','newable function',this.factory_value,this.class_value,key);
	}
}

class InstructionImplBase {}

class PromiseBoxImpl {
	/** @readonly */
	type="promise_box";
	/**
	 * @type {any}
	 */
	inner_type;
	/**
	 * @type {any}
	 */
	await_type;
	/**
	 * @param {any} _to_match
	 */
	as_type(_to_match) {
		return this;
	}
	/** @param {Promise<Box_CJS>} value */
	constructor(value) {
		this.value=value;
	}
}
class InstructionCallImpl extends InstructionImplBase {
	/** @type {'call'} */
	type='call';
	/** @type {boolean} */
	debug=false;
	/** @arg {StackVMImpl} vm @arg {Box_CJS} fn_box @arg {Box_CJS} target_this @arg {Box_CJS[]} arg_arr */
	handle_as_fn_box(vm,fn_box,target_this,arg_arr) {
		if('return_type' in fn_box&&fn_box.return_type=='promise_box') {
			return this.handle_as_fn_to_promise(vm,fn_box.value,target_this,arg_arr);
		} else if('return_type' in fn_box&&fn_box.return_type==="null") {
			console.log('fixme: make a type for this',fn_box);
			return this.handle_as_fn(vm,fn_box.value,target_this,arg_arr);
		} else {
			console.log('unexpected box value',fn_box);
			throw new Error("Unexpected function box type");
		}
	}
	/** @arg {Box_CJS} object_box @returns {{}|Function|StackVMImpl|null} */
	unbox_obj(object_box) {
		if(object_box===null) return null;
		const {type,...left_to_unbox}=object_box;
		if(object_box.type==='object_box') {
			const {type,value,...rest}=object_box;
			if(Object.keys(rest).length>0) {
				console.log('other enumerable on box',rest);
			}
			return value;
		}
		if(object_box.type==='instance_box') {
			const {type,value,instance_type,...rest}=object_box;
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
			console.log('unbox custom_box',{type,box_type},rest);
			throw new Error("1");
		}
		console.log('unbox',type,left_to_unbox);
		throw new Error("1");
	}
	/** @arg {Box_CJS[]} arg_arr */
	unbox_arr(arg_arr) {
		/** @type {({} | Function | StackVMImpl | null)[]} */
		let arr=[];
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
	/** @arg {StackVMImpl} vm @arg {(...a: Box_CJS[]) => Box_CJS} fn_value @arg {Box_CJS} target_this @arg {Box_CJS[]} arg_arr */
	handle_as_fn(vm,fn_value,target_this,arg_arr) {
		let real_this=this.unbox_obj(target_this);
		let ret=fn_value.apply(real_this,arg_arr);
		vm.stack.push(ret);
	}
	/** @arg {StackVMImpl} vm @arg {Box_CJS} fn_obj @arg {Box_CJS} target_this @arg {Box_CJS[]} arg_arr */
	handle_as_obj(vm,fn_obj,target_this,arg_arr) {
		if(!fn_obj) {
			throw new Error("Unreachable (type of value is not 'function')");
		}
		if(fn_obj.type==="function_box") {
			if(fn_obj.return_type==="null") {
				return this.handle_as_fn(vm,fn_obj.value,target_this,arg_arr);
			}
		} else if(fn_obj.type=="constructor_box") {
			throw new Error("Unexpected constructor");
		}
		else {
			throw new Error("Unreachable (type of value is never)");
		}
	}
	/** @arg {StackVMImpl} vm @arg {(...a: Box_CJS[]) => Promise<Box_CJS>} fn_value @arg {Box_CJS} target_this @arg {Box_CJS[]} arg_arr */
	handle_as_fn_to_promise(vm,fn_value,target_this,arg_arr) {
		let real_this=this.unbox_obj(target_this);
		let ret=fn_value.apply(real_this,arg_arr);
		vm.stack.push(new PromiseBoxImpl(ret));
	}
	/** @arg {import("../../vm/instruction/general/Call.js").Call} instruction @arg {StackVMImpl} vm */
	run(vm,instruction) {
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
			return this.handle_as_fn(vm,value_box,target_this,arg_arr);
		} else if(value_box===null) {
			throw new Error("Invalid");
		} else if(typeof value_box==='object'&&value_box.type==='void') {
			throw new Error("Attempt to call a void value");
		} else {
			if('value' in value_box) {
				console.log('VM: call error value_box not handled',typeof value_box,value_box,value_box.value);
				this.handle_as_obj(vm,value_box,target_this,arg_arr);
			}
			console.log('VM: call invalid value',typeof value_box,value_box);
			throw new Error("Invalid");
		}
	}
}
class InstructionConstructImpl extends InstructionImplBase {
	/** @readonly */
	type="construct";
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/general/Construct.js").Construct} ins */
	run(vm,ins) {
		let number_of_arguments=ins[1];
		if(typeof number_of_arguments!='number') throw new Error("Invalid");
		let [construct_target,...construct_arr]=vm.pop_arg_count(number_of_arguments);
		const a=construct_target;
		if(typeof a!='object') throw new Error("Invalid");
		if(a===null) throw new Error("Invalid");
		if(a.type!='constructor_box') throw new Error("Invalid");
		if(a.instance_type==="unknown") {
			let obj=a.factory(...construct_arr);
			vm.stack.push(obj);
		} else if(a.instance_type==='CSSStyleSheet') {
			/** @type {{s:[options?: CSSStyleSheetInit | undefined], valid_count:1}|{s:[], valid_count:0}} */
			let valid_args={
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
			vm.stack.push(new CSSStyleSheetBoxImpl(obj));
		}
		log_if(LOG_LEVEL_INFO,"",ins,...vm.stack.slice(vm.stack.length-number_of_arguments));
	}
}
class InstructionCastImpl extends InstructionImplBase {
	/** @type {'cast'} */
	type='cast';
	debug=false;
	/** @arg {StackVMImpl} vm @arg {'object_index'} cast_source @arg {{value:never}} obj */
	noisy_push_temporary_box(vm,cast_source,obj) {
		void vm;
		console.warn('noisy box',cast_source,obj);
		console.log('inner',obj.value);
	}
	/** @type {(vm:StackVMImpl, cast_source:'object_index', obj:{value:{[x:string]:Box_CJS}})=>void} @arg {StackVMImpl} vm @arg {'object_index'} cast_source */
	push_temporary_box(vm,cast_source,obj) {
		void vm;
		console.warn('push_temporary_box',cast_source,obj);
	}
	/** @arg {StackVMImpl} vm @arg {'object_index'} cast_source @arg {StackVMBox_CJS} obj */
	push_custom_box(vm,cast_source,obj) {
		void vm;
		console.warn('push_custom_box',cast_source,obj);
	}
	/** @arg {StackVMImpl} vm @arg {Box_CJS} obj @arg {'object_index'} cast_source */
	cast_to_type(vm,obj,cast_source) {
		if(obj?.type==='custom_box'&&obj.box_type==='StackVM') {
			return this.push_custom_box(vm,cast_source,obj);
		}
		if(obj?.type==='object_box') {
			if(cast_source==='object_index') {
				console.log(obj);
				// return this.push_box(vm, cast_source, obj.value);
			}
			console.warn('box does not contain a function',obj);
			throw new Error("1");
		}
		if(obj?.type) {
			console.warn('unk box',obj);
			throw new Error("1");
		}
		if(typeof obj!=='object'&&typeof obj!=='function') {
			throw new Error("1");
		}
		if(obj===null) {
			throw new Error("1");
		}
		console.warn('unk obj boxed into temporary_box<object_index>',obj);
	}
	/** @arg {import("../../vm/instruction/Cast.js").Cast} instruction @arg {StackVMImpl} vm */
	run(vm,instruction) {
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
		this.cast_to_type(vm,obj,cast_type);
	}
}
class InstructionJeImpl extends InstructionImplBase {
	/** @type {'je'} */
	type='je';
	/** @arg {import("../../vm/instruction/jump/Je.js").Je} instruction @arg {StackVMImpl} vm */
	run(vm,instruction) {
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
class InstructionJmpImpl extends InstructionImplBase {
	/** @type {'jmp'} */
	type='jmp';
	/** @arg {import("../../vm/instruction/jump/Jump.js").Jump} instruction @arg {StackVMImpl} vm */
	run(vm,instruction) {
		let [,target]=instruction;
		if(typeof target!='number') throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Jump target is out of instructions range");
		}
		vm.instruction_pointer=target;
	}
}
class InstructionModifyOpImpl extends InstructionImplBase {
	/** @type {'modify_operand'} */
	type='modify_operand';
	/** @arg {import("../../vm/instruction/ModifyOperand.js").ModifyOperand} instruction @arg {StackVMImpl} vm */
	run(vm,instruction) {
		let [,target,offset]=instruction;
		if(typeof target!='number') throw new Error("Invalid");
		if(typeof offset!='number') throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Destination is out of instructions range");
		}
		let instruction_1=vm.instructions[target];
		/** @type {[string, ...any[]]} */
		let instruction_modify=instruction_1;
		let value=null;
		if(vm instanceof StackVMImpl) {
			value=vm.stack.pop();
		} else {
			console.info("TODO if instanceof StackVM is not enough");
			throw new Error("Unreachable");
		}
		if(instruction_modify===void 0) throw new Error("Invalid");
		instruction_modify[offset]=value;
		let valid_instruction=StackVMParserImplR.verify_instruction(instruction_modify);
		vm.instructions[target]=valid_instruction;
	}
}
/** @typedef {import("../../box/NumberBox.js").NumberBox} NumberBox_CJS */
/** @implements {NumberBox_CJS} */
class NumberBoxImpl {
	/** @readonly */
	type="number";
	/**
	 * @returns {this | null}
	 * @param {string} target
	 */
	as_type(target) {
		if(typeof this.value===target) {
			return this;
		}
		return null;
	}
	/** @param {number} value */
	constructor(value) {
		this.value=value;
	}
}
class InstructionVMPushIPImpl extends InstructionImplBase {
	/** @type {"vm_push_ip"} */
	type="vm_push_ip";
	/** @arg {import("../../vm/instruction/vm/VMPushIP.js").VMPushIP} _ins @arg {StackVMImpl} vm */
	run(vm,_ins) {
		if(!vm.hasOwnProperty('push')) {
			throw new Error("push_pc requires a stack");
		} else if(vm instanceof StackVMImpl) {
			vm.stack.push(new NumberBoxImpl(vm.instruction_pointer));
		} else {
			console.info('TODO: add instanceof check to push_pc');
			throw new Error("Property missing or invalid");
		}
	}
}
class InstructionPushImpl extends InstructionImplBase {
	/** @type {'push'} */
	type='push';
	/** @arg {import("../../vm/instruction/stack/Push.js").Push} instruction @arg {StackVMImpl} vm */
	run(vm,instruction) {
		for(let i=0;i<instruction.length-1;i++) {
			let item=instruction[i];
			if(item==="push") throw new Error("Unreachable");
			vm.stack.push(item);
		}
	}
}
class InstructionDupImpl extends InstructionImplBase {
	/** @type {'dup'} */
	type='dup';
	/** @arg {import("../../vm/instruction/stack/Dup.js").Dup} _ins @arg {StackVMImpl} vm */
	run(vm,_ins) {
		if(vm.stack.length===0) throw new Error("stack underflow");
		let last=vm.stack.at(-1);
		if(!last) throw new Error("Unreachable");
		vm.stack.push(last);
	}
}
class InstructionGetImpl extends InstructionImplBase {
	/** @type {'get'} */
	type='get';
	/** @arg {StackVMImpl} vm @arg {Box_CJS} value_box @arg {string|number} key */
	on_get(vm,value_box,key) {
		if(typeof key!='string') throw new Error("Invalid");
		switch(value_box.type) {
			case 'array_box': {
				if(typeof key==='number') {
					if(value_box.item_type==="Box") {
						let res=value_box.value[key];
						vm.stack.push(res);
						break;
					}
					throw new Error("Unexpected value_box");
				} else {
					key=parseInt(key,10);
					if(Number.isNaN(key)) throw new Error("Failed to parse int");
					if(value_box.item_type==="Box") {
						let res=value_box.value[key];
						vm.stack.push(res);
						break;
					}
					throw new Error("Unexpected value_box");
				}
			}
			case 'constructor_box': {
				switch(value_box.instance_type) {
					case 'CSSStyleSheet': new CSSStyleSheetConstructorBoxImpl(value_box.value).on_get(vm,key); break;
					case "unknown": {
						new NewableFunctionBoxImpl(...value_box.get_construct_arguments());
					} break;
				}
			} break;
			default: console.log('on_get no handler',value_box.type);
		}
	}
	/** @arg {import("../../vm/instruction/general/Get.js").Get} _ins @arg {StackVMImpl} vm */
	run(vm,_ins) {
		let get_key=vm.stack.pop();
		let value_box=vm.stack.pop();
		if(!value_box) throw new Error("Invalid");
		if(typeof get_key!='string') throw new Error("Invalid");
		if(typeof value_box!='object') throw new Error("Invalid");
		this.on_get(vm,value_box,get_key);
		throw new Error("Update types");
	}
}
class InstructionHaltImpl extends InstructionImplBase {
	/** @type {'halt'} */
	type='halt';
	/** @arg {import("../../vm/instruction/turing/Halt.js").Halt} _i @arg {StackVMImpl} vm */
	run(vm,_i) {
		vm.halt();
	}
}
class InstructionReturnImpl extends InstructionImplBase {
	/** @type {'return'} */
	type='return';
	/** @arg {import("../../vm/instruction/general/Return.js").Return} _i @arg {StackVMImpl} vm */
	run(vm,_i) {
		if(vm.stack.length>0) {
			vm.return_value=vm.pop();
		} else {
			throw new Error("Stack underflow on return");
		}
	}
}
class InstructionBreakpointImpl extends InstructionImplBase {
	/** @type {'breakpoint'} */
	type='breakpoint';
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/debug/Breakpoint.js").Breakpoint} _i */
	run(vm,_i) {
		console.log(vm.stack);
		trigger_debug_breakpoint();
	}
}
class InstructionPushVMObjImpl extends InstructionImplBase {
	/** @type {"vm_push_self"} */
	type="vm_push_self";
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/vm/VMPushSelf.js").VMPushSelf} _i */
	run(vm,_i) {
		vm.stack.push(new StackVMBoxImpl(vm));
	}
}
class InstructionPushGlobalObjectImpl extends InstructionImplBase {
	/** @type {'push_global_object'} */
	type='push_global_object';
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/push/WindowObject.js").PushWindowObject} _i */
	run(vm,_i) {
		vm.stack.push(new WindowBoxImpl(window));
	}
}
class InstructionPeekImpl extends InstructionImplBase {
	/** @type {'peek'} */
	type='peek';
	debug=false;
	/** @arg {StackVMImpl} vm @arg {[any, any]} ins */
	run(vm,ins) {
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
/** @typedef {import("../../vm/instruction/InstructionImplObj.js").InstructionImplObj<"append", import("../../vm/instruction/InstructionImpl.js").IAppendImpl, import("../../vm/instruction/Append.js").Append>} IInstructionAppendImplIns */
/** @implements {IInstructionAppendImplIns} */
class InstructionAppendImpl extends InstructionImplBase {
	/** @type {"append"} */
	type="append";
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/Append.js").Append} _i */
	run(vm,_i) {
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
		if(append_obj===null) throw new Error("1");
		if(target===null) throw new Error("1");
		if(!(append_obj.type==='instance_box'&&append_obj.instance_type==='Node')) throw new Error("1");
		if(!(target.type==='instance_box'&&target.instance_type==='Node')) throw new Error("1");
		target.value.appendChild(append_obj.value);
	}
}
class InstructionPushArgsImpl extends InstructionImplBase {
	/** @type {'vm_push_args'} */
	type='vm_push_args';
	/** @arg {StackVMImpl} _vm @arg {never} _i */
	run(_vm,_i) {
		throw new Error("Instruction not supported");
	}
}
class InstructionDropImpl extends InstructionImplBase {
	/** @type {'drop'} */
	type='drop';
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/stack/Drop.js").Drop} _i */
	run(vm,_i) {
		vm.stack.pop();
	}
}
class InstructionVMReturnImpl extends InstructionImplBase {
	/** @type {'vm_return'} */
	type='vm_return';
	debug=false;
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/vm/VMReturn.js").VMReturn} _i */
	run(vm,_i) {
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
class InstructionVMCallImpl extends InstructionImplBase {
	/** @type {'vm_call'} */
	type='vm_call';
	/** @arg {StackVMImpl} vm @arg {import("../../vm/instruction/vm/VMCall.js").VMCall} ins */
	run(vm,ins) {
		if(vm.base_ptr===null) throw new Error("BasePtr was null");
		let prev_base=vm.base_ptr;
		vm.stack.push(new NumberBoxImpl(vm.base_ptr),new NumberBoxImpl(vm.instruction_pointer));
		vm.base_ptr=vm.stack.length;
		vm.jump_instruction_pointer=ins[1];
		console.log('vm vm_call',ins[1],'stk',vm.base_ptr,prev_base,vm.stack.slice());
	}
}
class VMFlags {
	equal=false;
}
class InstructionNopImpl extends InstructionImplBase {
	/** @type {'nop'} */
	type='nop';
	/** @arg {StackVMImpl} _vm @arg {import("../../vm/instruction/Nop.js").Nop} _a */
	run(_vm,_a) {
	}
}
class InstructionBlockTraceImpl extends InstructionImplBase {
	/** @type {'vm_block_trace'} */
	type='vm_block_trace';
	/** @arg {StackVMImpl} _vm @arg {import("../../vm/instruction/vm/VMBlockTrace.js").VMBlockTrace} _i */
	run(_vm,_i) {
	}
}
const instruction_descriptor_arr=[
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
instruction_descriptor_arr;
/**
 * @typedef {import("../../vm/instruction/InstructionType.js").InstructionType} InstructionType_CJS
 * @typedef {import("../../box/Box.js").Box} Box_CJS
 * @typedef {import("../../vm/StackVM.js").StackVM} StackVM_CJS
*/
/** @implements {StackVM_CJS} */
class StackVMImpl {
	/** @type {Box_CJS} */
	return_value;
	/** @type {number|null} */
	jump_instruction_pointer;
	/** @type {number|null} */
	base_ptr;
	/** @type {Box_CJS[]} */
	stack;
	/** @arg {InstructionType_CJS[]} instructions */
	constructor(instructions) {
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.running=false;
		/** @type {Box_CJS[]} */
		this.stack=[];
		this.return_value=new VoidBoxImpl;
		this.jump_instruction_pointer=null;
		this.base_ptr=null;
		this.frame_size=2;
		this.flags=new VMFlags;
	}
	pop() {
		let value=this.stack.pop();
		if(!value) throw 1;
		return value;
	}
	/**
	 * @param {import("../../box/Box.js").Box} value
	 */
	push(value) {
		this.stack.push(value);
	}
	/**
	 * @param {number} distance
	 */
	peek_at(distance) {
		return this.stack.at(-1-distance);
	}
	/** @arg {number} operand_number_of_arguments */
	pop_arg_count(operand_number_of_arguments) {
		let arguments_arr=[];
		let arg_count=operand_number_of_arguments;
		for(let i=0;i<arg_count;i++) {
			if(this.stack.length<=0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			arguments_arr.unshift(this.pop());
		}
		return arguments_arr;
	}
	reset() {
		this.running=false;
		this.instruction_pointer=0;
		this.jump_instruction_pointer=null;
		this.base_ptr=null;
		this.return_value=new VoidBoxImpl;
		this.stack.length=0;
	}
	/** @arg {number} value */
	is_in_instructions(value) {
		return value>=0&&value<this.instructions.length;
	}
	halt() {
		this.running=false;
	}
	/** @arg {InstructionType_CJS} instruction */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			case 'append': break;
		}
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
class EventHandlerVMDispatchImplR extends StackVMImpl {
	/** @arg {InstructionType_CJS[]} instructions @arg {any} target_obj */
	constructor(instructions,target_obj) {
		try {
			super(instructions);
			this.target_obj=target_obj;
		} catch(e) {
			console.log('EventHandlerVMDispatch constructor error',e);
		}
	}
	/** @override @arg {Box_CJS[]} args_arr */
	run(...args_arr) {
		try {
			this.args_arr=args_arr;
			return super.run();
		} catch(e) {
			console.log('EventHandlerVMDispatch run error',e);
			throw new Error("Run error");
		}
	}
	/** @arg {Event} event */
	handleEvent(event) {
		this.reset();
		this.run(new ObjectBoxImpl(event));
	}
}
class StringBoxImpl {
	/** @readonly */
	type="string";
	/**
	 * @param {string} target
	 */
	as_type(target) {
		if(target==="string") {
			return this;
		}
		return null;
	}
	/**
	 * @param {string} string
	 */
	constructor(string) {
		this.value=string;
	}
}
class StackVMParserImplR {
	static match_regex=/(.+?)(;|$)/gm;
	/** @arg {string[] | number[]} cur @arg {number} arg_loc*/
	static parse_int_arg(cur,arg_loc) {
		let cur_item=cur[arg_loc];
		if(typeof cur_item=='string') {
			let arg=cur_item;
			if(arg[3]==='()'[0]&&arg.at(-1)==="()"[1]) {
				let str_int=arg.slice(4,-1);
				cur[arg_loc]=parseInt(str_int,10);
			}
		}
	}
	/** @arg {string | string[]} str @arg {any[]} format_list */
	static parse_string_with_format_ident(str,format_list) {
		let format_index=str.indexOf('%');
		let format_type=str[format_index+1];
		switch(format_type) {
			case 'o':
				return format_list.shift();
			default:
				console.assert(false,"Assertion failed: %s",'unsupported format spec %'+format_type);
		}
	}
	/** @arg {any[]} cur @arg {any[]} format_list */
	static parse_current_instruction(cur,format_list) {
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
	/** @arg {string[]} m */
	static raw_parse_handle_regexp_match(m) {
		let iter=m[1].trim();
		if(iter.startsWith("//")) return null;
		while(iter.startsWith("/*")) {
			let j=iter.indexOf("*/");
			iter=iter.slice(j+2).trim();
		}
		if(!iter) return null;
		return iter.split(",");
	}
	/** @arg {string} string */
	static parse_string_into_raw_instruction_stream(string) {
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
	/** @arg {string} string @arg {any[]} format_list */
	static parse_instruction_stream_from_string(string,format_list) {
		let raw_instructions=this.parse_string_into_raw_instruction_stream(string);
		for(let i=0;i<raw_instructions.length;i++) {
			let raw_instruction=raw_instructions[i];
			this.parse_current_instruction(raw_instruction,format_list);
		}
		let instructions=this.verify_raw_instructions(raw_instructions); return instructions;
	}
	/** @arg {string[]} instruction @returns {InstructionType_CJS}*/
	static verify_instruction(instruction) {
		let num_to_parse=instruction.length;
		/** @type {InstructionType_CJS|null} */
		let ret=null;
		switch(instruction[0]) {
			case 'push': {
				num_to_parse=0;
				const [,...push_operands]=instruction;
				let real_push_ops=push_operands.map(e => new StringBoxImpl(e));
				ret=[instruction[0],...real_push_ops];
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
				if(num_to_parse>0) throw new Error("Assertion failed: cast operand `"+m_arg+"` is invalid");
			} break;
			case 'drop':/*opcode parse*/
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
				ret=[instruction[0]];
			} break;
			default: throw new Error("Verify: Unexpected opcode, opcode was `"+instruction[0]+"`");
		}
		if(num_to_parse>0) throw new Error("Typechecking failure, data left when processing raw instruction stream");
		if(ret!==null) {
			return ret;
		}
		throw new Error("Unreachable");
	}
	/** @arg {string[][]} raw_instructions @return {InstructionType_CJS[]} */
	static verify_raw_instructions(raw_instructions) {
		/** @type{InstructionType_CJS[]}*/
		const instructions=[];
		for(let i=0;i<raw_instructions.length;i++) {
			instructions.push(this.verify_instruction(raw_instructions[i]));
		}
		return instructions;
	}
}
class DocumentWriteListImpl_1 {
	/** @type {any[]} */
	list;
	constructor() {
		this.list=[];
		this.attached=false;
		this.end_symbol=Symbol(void 0);
		this.document_write=null;
		this.attached_document=null;
		this.document_write_proxy=null;
	}
	/** @arg {(...text: string[]) => void} target @arg {Document} thisArg @arg {string[]} argArray */
	write(target,thisArg,argArray) {
		console.assert(target===this.document_write);
		console.assert(thisArg===this.attached_document);
		this.list.push(argArray,null);
	}
	/** @arg {Document} document */
	attach_proxy(document) {
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
			/** @arg {(...text: string[]) => void} target @arg {Document} thisArg @arg {string[]} argArray */
			apply(target,thisArg,argArray) {
				this.other.write(target,thisArg,argArray);
			}
		};
		this.document_write_proxy=new Proxy(document.write,proxy_handler);
		document.write=this.document_write_proxy;
	}
	/** @arg {boolean} should_try_to_destroy */
	destroy(should_try_to_destroy=false) {
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
				/** @type {any} */
				let any_var=doc_var;
				/** @type {Document['write']} */
				let vv=any_var;
				doc_1.write=vv;
				return true;
			}
			return false;
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
		return false;
	}
}
class UniqueIdGenerator {
	constructor() {
		this.m_current=-1;
	}
	/** @arg {number} current_value */
	set_current(current_value) {
		this.m_current=current_value;
	}
	current() {
		return this.m_current;
	}
	next() {
		return this.m_current++;
	}
}
UniqueIdGenerator;
class NamedIdGenerator {
	constructor() {
		this.state_map=new Map;
	}
	/** @arg {string} name */
	current_named(name) {
		let val=this.state_map.get(name);
		if(val) {
			return val;
		} else {
			return 0;
		}
	}
	/** @arg {string} name */
	next_named(name) {
		if(this.state_map.has(name)) {
			let cur=this.state_map.get(name)+1;
			this.state_map.set(name,cur);
			return cur;
		} else {
			this.state_map.set(name,1);
			return 1;
		};
	}
}
class EventHandlerDispatch {
	/** @arg {{[x:string]:any}} target_obj @arg {string} target_name */
	constructor(target_obj,target_name) {
		this.target_obj=target_obj;
		this.target_name=target_name;
	}
	/** @arg {any} event */
	handleEvent(event) {
		this.target_obj[this.target_name](event);
	}
}
class CompressionStatsCalculator {
	constructor() {
		/** @type {number[]} */
		this.hit_counts=[];
		/** @type {string[]} */
		this.cache=[];
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	/** @arg {number} index */
	add_hit(index) {
		if(!this.map_values()[index]) {
			this.map_values()[index]=1;
		} else this.map_values()[index]++;
	}
	/** @arg {string} key */
	add_item(key) {
		let index=this.map_keys().indexOf(key);
		if(index==-1) index=this.map_keys().push(key)-1;
		else this.add_hit(index);
	}
	reset() {
		this.map_keys().length=0;
		this.map_values().length=0;
	}
	/** @arg {any[]} arr @arg {number} win_size */
	calc_compression_stats(arr,win_size) {
		this.reset();
		for(let i=0;i<arr.length;i++) {
			if(i+win_size<arr.length) {
				this.add_item(arr.slice(i,i+win_size).join(","));
			}
		}
		return to_tuple_arr(this.map_keys(),this.map_values()).filter((e) => e[1]!==void 0);
	}
	/** @arg {any[]} stats_arr @arg {any[]} arr @arg {number} win_size */
	calc_for_stats_window_size(stats_arr,arr,win_size) {
		stats_arr[win_size-1]=this.calc_compression_stats(arr,win_size);
	}
	/** @arg {any[]} stats_arr @arg {any[]} arr @arg {number} index */
	calc_for_stats_index(stats_arr,arr,index) {
		stats_arr[index]=this.calc_compression_stats(arr,index+1);
	}
}
class BaseCompression {
	/** @arg {string | any[]} src @arg {string | any[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @arg {string | any[]} src @arg {string | any[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[boolean, string[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[boolean, string[]]} */
	decompress_result(src,dst) {
		if(this.did_decompress(src,dst)) return [true,dst];
		return [false,dst];
	}
}
class MulCompression extends BaseCompression {
	constructor() {
		super();
		this.stats_calculator=new CompressionStatsCalculator;
		/** @type {any[]} */
		this.compression_stats=[];
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
	/** @arg {string[]} arr */
	try_decompress(arr) {
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
	/** @arg {string[]} arr */
	compress_array(arr) {
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
	/** @arg {AutoBuyStateImplR | AutoBuyImpl | null} obj @arg {()=>void} callback */
	constructor(obj,callback) {
		this.m_once=true;
		this.m_obj=obj;
		this.m_callback=callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
class IntervalTarget {
	/** @arg {any} obj @arg {any} callback */
	constructor(obj,callback) {
		this.m_once=false;
		this.m_obj=obj;
		this.m_callback=callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
class PromiseTimeoutTarget {
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
	/** @arg {any} accept @arg {any} reject */
	promise_executor(accept,reject) {
		this.m_promise_accept=accept;
		this.m_promise_reject=reject;
		this.m_callback=this.on_result.bind(this);
	}
	/** @arg {any} value */
	on_result(value=void 0) {
		if(!this.m_promise_accept) throw new Error("Missing promise accept handler");
		this.m_promise_accept(value);
		this.reset();
	}
	/** @arg {Error} error */
	on_error(error) {
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
	/** @override */
	wait() {
		return super.wait();
	}
}
class BaseNode {
	constructor() {
		this.m_parent=null;
	}
	/** @arg {any} parent */
	set_parent(parent) {
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
	/** @arg {number} id */
	constructor(id) {
		super();
		this.m_id=id;
	}
	/** @override */
	destroy() {
		if(this.m_id!==null) clearTimeout(this.m_id);
		super.destroy();
	}
}
class IntervalIdNode extends BaseNode {
	/** @arg {ReturnType<typeof setInterval>} id */
	constructor(id) {
		super();
		this.m_id=id;
	}
	/** @override */
	destroy() {
		if(this.m_id!==null) clearInterval(this.m_id);
		super.destroy();
	}
}
class IntervalTargetFn {
	/** @arg {any} callback @arg {number} timeout */
	constructor(callback,timeout) {
		this.m_callback=callback;
		this.timeout=timeout;
	}
	fire() {
		this.m_callback();
	}
}
class TimeoutNode extends BaseNode {
	constructor(timeout=0) {
		super();
		this.m_timeout=timeout;
		this.m_id=null;
		this.m_target=null;
	}
	timeout() {
		return this.m_timeout;
	}
	/** @arg {any} target */
	set_target(target) {
		this.m_target=target;
	}
	set() {
		this.m_id=setTimeout(this.run.bind(this),this.m_timeout);
	}
	/** @arg {{} | null} target */
	start(target) {
		if(!target) throw new Error("No target");
		this.m_target=target;
		this.set();
	}
	/** @override */
	run() {
		if(this.m_target) this.m_target.fire();
		this.m_id=null;
		this.remove();
	}
	/** @override */
	destroy() {
		if(this.m_id!==null) clearTimeout(this.m_id);
	}
}
class IntervalNode extends BaseNode {
	/** @arg {CallableFunction} target_fn */
	constructor(target_fn,timeout=0) {
		super();
		this.m_target_fn=target_fn;
		this.m_timeout=timeout;
		this.id=null;
	}
	set() {
		this.id=setInterval(this.run.bind(this),this.m_timeout);
	}
	/** @arg {{} | null} target */
	start(target=null) {
		if(target) {
			this.m_target=target;
		} else {
			this.m_target=new IntervalTargetFn(this.m_target_fn,this.m_timeout);
		}
		this.set();
	}
	/** @override */
	destroy() {
		if(this.id!==null) clearInterval(this.id);
	}
}
class AsyncTimeoutNode extends TimeoutNode {
	/** @arg {{wait():Promise<any>;destroy():void}} target */
	async start_async(target) {
		if(!target) throw new Error("unable to start_async without anything to wait for");
		log_if(LOG_LEVEL_INFO,'start_async');
		this.m_target=target;
		this.set();
		let promise=this.m_target.wait();
		log_if(LOG_LEVEL_INFO,'p',promise);
		await promise;
	}
	/** @override */
	set() {
		log_if(LOG_LEVEL_INFO,'set',this);
		super.set();
	}
	/** @override */
	run() {
		log_if(LOG_LEVEL_INFO,'run',this);
		return super.run();
	}
	/** @override */
	destroy() {
		if(this.m_target) this.m_target.destroy();
		super.destroy();
	}
}
class IntervalIdNodeRef extends IntervalIdNode {
	/** @arg {ReturnType<typeof setInterval>} interval_id @arg {() => void} destroy_cb */
	constructor(interval_id,destroy_cb) {
		super(interval_id);
		this.destroy_callback=destroy_cb;
	}
	/** @override */
	destroy() {
		this.destroy_callback();
		super.destroy();
	}
}
class AsyncNodeRootImplR {
	constructor() {
		/** @type {BaseNode[]} */
		this.children=[];
	}
	/** @arg {()=>void} target_fn @arg {number | undefined} timeout */
	set(target_fn,timeout,repeat=false) {
		let node;
		if(repeat) {
			node=new TimeoutNode(timeout);
			node.start(new TimeoutTarget(null,target_fn));
		} else {
			node=new IntervalNode(target_fn,timeout);
			node.start(new IntervalTarget(null,target_fn));
		}
	}
	/** @arg {number} timeout_id */
	append_raw_timeout(timeout_id) {
		this.append_child(new TimeoutIdNode(timeout_id));
	}
	/**
	 * @param {ReturnType<typeof setInterval>} timeout_id
	 */
	append_raw_interval(timeout_id) {
		this.append_child(new IntervalIdNode(timeout_id));
	}
	/** @arg {BaseNode} record */
	append_child(record) {
		record.remove();
		record.set_parent(this);
		this.children.push(record);
	}
	/** @arg {BaseNode} record */
	remove_child(record) {
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
	/** @type {number} */
	size;
	/** @type {number} */
	history_size;
	/** @type {number} */
	time_start;
	/** @type {number} */
	duration;
	constructor() {
		this.size=0;
		this.history_size=0;
		this.time_start=0;
		this.duration=0;
	}
}
class AverageRatio {
	// @AverageRatio
	/** @arg {string} type @arg {RatioOptions} options */
	constructor(type,options) {
		this.type=type;
		/** @type {number[]} */
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
	/** @arg {AverageRatioRoot} avg @arg {number} time_now */
	do_history_update(avg,time_now) {
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
	/** @arg {number} value */
	add_to_ratio(value,avg_window=this.size) {
		if(this.value===null) {
			this.value=value;
			return;
		}
		this.value=(this.value*(avg_window-1)+value)/avg_window;
	}
	/** @arg {number} size */
	set_history_size(size) {
		this.history_size=size;
	}
	get_average() {
		if(this.value===null) return 0;
		return this.value;
	}
}
class AverageRatioRoot {
	constructor() {
		/** @type {Map<string, AverageRatio>} */
		this.map=new Map;
		/** @type {string[]} */
		this.keys=[];
		/** @type {AverageRatio[]} */
		this.values=[];
	}
	/** @arg {string} key */
	get_average(key) {
		let ratio_calc=this.map.get(key);
		if(!ratio_calc) throw new Error("Ratio not found: "+key);
		return ratio_calc.get_average();
	}
	/** @type {(key:string, value:AverageRatio)=>void} */
	set_ratio(key,value) {
		this.keys.push(key);
		this.values.push(value);
		this.map.set(key,value);
	}
	/** @arg {AverageRatio} value_obj */
	next(value_obj) {
		let idx=this.values.indexOf(value_obj);
		if(idx<this.values.length) {
			return this.values[idx+1];
		}
		return null;
	}
	/** @arg {number} value */
	push(value) {
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
const named_sym_gen=new NamedIdGenerator;
/** @type {WeakRef<{sym:symbol}>[]}*/
const debug_id_syms=[];
/** @type {(v:string)=>symbol} */
function labeled_sym(name) {
	const id=named_sym_gen.next_named(name);
	const sym=Symbol(`${name}@${id}`);
	debug_id_syms.push(new WeakRef({sym}));
	return sym;
}
class DataLoaderImplR {
	/**
	 * @param {string} value
	 */
	static int_parser(value) {
		return parseInt(value,10);
	}
	/** @arg {Storage} storage */
	constructor(storage) {
		this.storage=storage;
	}
	/**
	 * @param {string} key
	 */
	getItem(key) {
		return this.storage.getItem(key);
	}
	/** @arg {string} key @returns {[true,string[]]|[false,null]} */
	load_str_arr(key) {
		let data=this.getItem(key);
		if(data===null) return [false,data];
		return [true,this.default_split(data)];
	}
	/**@arg {string} key @returns {[true,number[]]|[false,null]} */
	load_int_arr(key) {
		let storage_data=this.getItem(key);
		if(storage_data===null) return [false,storage_data];
		return [true,this.parse_int_arr(storage_data)];
	}
	/** @arg {string} string */
	default_split(string) {
		return string.split(",");
	}
	/** @arg {string} data */
	parse_int_arr(data) {
		return this.default_split(data).map(DataLoaderImplR.int_parser);
	}
}
/** @typedef {import("../../box/VoidBox.js").VoidBox} VoidBox_CJS */
/** @implements {VoidBox_CJS} */
class VoidBoxImpl {
	/** @type {"void"} */
	type="void";
	value=void 0;
	extension=null;
	as_type() {
		return null;
	}
}
class AutoBuyStateImplR {
	/** @arg {AsyncNodeRootImplR} root */
	constructor(root) {
		this.root_node=root;
		this.debug=false;
		/** @type {number[]} */
		this.arr=[];
		this.ratio=0;
		this.last_ratio=0;
		this.compressor_stats=[];
		this.arr_max_len=5*60;
		this.val=1;
		this.total_mul=1;
		this.ratio_mode=0;
		this.total_cycle_count_change=0;
		this.locked_cycle_count=0;
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
		this.ratio_types=['10sec','1min','5min','30min','3hour'];
		let ratio_duration=[10*1000,60*1000,5*60*1000,30*60*1000,3*60*60*1000];
		let ratio_counts=[80,6,5,6,6];
		/** @arg {number[]} arr @arg {number} i */
		function mul_3(arr,i) {
			let [a,b=1,c=10]=arr.slice(i);
			return a*b*c*4;
		}
		//@AverageRatio
		/** @arg {AutoBuyStateImplR} state @arg {number} i @arg {number} now_start */
		function create_ratio(state,i,now_start) {
			if(!state.ratio_types) throw 1;
			let obj=new AverageRatio(state.ratio_types[i],{
				size: ratio_counts[i],
				history_size: mul_3(ratio_counts,i),
				time_start: now_start,
				duration: ratio_duration[i],
			});
			if(state.ratio_types[i]==='1min') obj.set_history_size(7200);
			state.avg.set_ratio(state.ratio_types[i],obj);
		}
		let now_start=performance.now();
		for(let i=0;i<5;i++) {
			create_ratio(this,i,now_start);
		}
		this.prev_atomepersecond=window.atomepersecond;
		this.is_init_complete=true;
	}
	calc_ratio() {
		if(!this.ratio_types) throw 1;
		return this.avg.get_average(this.ratio_types[1]);
	}
	/** @arg {number} value */
	append_value(value) {
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
				// do_update=true;
				log_if(LOG_LEVEL_INFO,'ratio cycle lcc=%o',this.locked_cycle_count);
			}
		} else {
			do_update=true;
		}
		if(!do_update) return;
		this.total_mul=1;
		this.total_cycle_count_change=0;
		let did_update=this.rep_update_ratio_mode(true);
		/*let should_notify=did_update;
			while(did_update){
				did_update=this.rep_update_ratio_mode(false);
			}*/
		if(did_update) {
			this.log_on_update_ratio_mode_notify();
		}
	}
	/** @arg {boolean} do_lock */
	rep_update_ratio_mode(do_lock) {
		let mode_ratio_up=this.ratio_mode*.1+.1;
		let mode_ratio_down=this.ratio_mode*.1-.4;
		if(this.ratio>(mode_ratio_up+.4)) return this.on_increase_ratio(do_lock,2);
		if(this.ratio<mode_ratio_down) return this.on_decrease_ratio(do_lock);
		if(this.ratio>mode_ratio_up) return this.on_increase_ratio(do_lock);
		return false;
	}
	/** @arg {boolean} do_lock */
	on_decrease_ratio(do_lock,mul=1) {
		this.total_mul*=mul;
		this.on_ratio_change(do_lock,-1,300*mul);
		return true;
	}
	/** @arg {boolean} do_lock */
	on_increase_ratio(do_lock,mul=1) {
		this.total_mul*=mul;
		this.on_ratio_change(do_lock,1,100*mul);
		return true;
	}
	/** @arg {boolean} do_lock @arg {number} dir_num @arg {number} lock_for */
	on_ratio_change(do_lock,dir_num,lock_for) {
		if(do_lock) {
			this.do_ratio_lock(do_lock,dir_num,lock_for);
		} else {
			this.do_ratio_lock(do_lock,dir_num,lock_for);
		}
		this.on_cycle_count_change(lock_for);
	}
	/** @arg {number} lock_for */
	on_cycle_count_change(lock_for) {
		this.total_cycle_count_change+=lock_for;
	}
	/** @arg {boolean} _do_lock @arg {number} mode_change_direction @arg {number} num_of_cycles */
	do_ratio_lock(_do_lock,mode_change_direction,num_of_cycles) {
		this.ratio_mode+=mode_change_direction;
		this.locked_cycle_count+=num_of_cycles;
	}
	/**
	 * @param {number} num
	 */
	calc_near_val(num) {
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
		if(real_val<0.9) return;
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
		// this.div=Math.log2(window.prestige)*AutoBuyRatioDiv;
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
		this.val*=AutoBuyMulModifierFactor;
		this.append_value(this.val);
		this.update_ratio_mode();
	}
	/** @arg {string} time_played_str */
	on_game_reset_finish(time_played_str) {
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
		let prev_hist=sessionStorage["history"];
		/** @type {string[]} */
		let data_arr;
		xx: if(prev_hist&&prev_hist.startsWith(json_tag)) {
			let hist_data=prev_hist.slice(json_tag.length);
			while(hist_data[0]==='@') {
				hist_data=hist_data.slice(1);
			}
			data_arr=hist_data.split("|");
			data_arr.push(json_hist);
		} else {
			data_arr=[json_hist];
		}
		sessionStorage["history"]=`${json_tag}@${data_arr.join("|")}`;
		let time_played_data=sessionStorage["time_played_hist"];
		/** @type {(string|null)[]} */
		let time_played_arr=data_arr.map(() => null);
		if(time_played_data) {
			let stored_arr=JSON.parse(time_played_data);
			for(let i=0;i<stored_arr.length;i++) {
				time_played_arr[i]=stored_arr[i];
			}
			time_played_arr[data_arr.length-1]=time_played_str;
		} else {
			time_played_arr=[time_played_str];
		}
		sessionStorage["time_played_hist"]=JSON.stringify(time_played_arr);
	}
	reset() {
		this.ratio*=0.75;
		for(var i=0;i<this.arr.length;i++) {
			this.arr[i]*=0.75;
		}
	}
}
class AsyncAutoBuy {
	/** @arg {AutoBuyImpl} parent */
	constructor(parent) {
		this.parent=parent;
		this.unit_upgradeable_trigger=30;
	}
	get timeout_ms() {
		debugger;
		return this.parent.timeout_ms;
	}
	/** @arg {boolean} no_wait */
	async do_start_main_async(no_wait) {
		if(!no_wait) await this.next_timeout_async(this.parent.timeout_ms,'A');
		await this.main_async();
	}
	async maybe_async_reset() {
		let loss_rate=await this.parent.unit_promote_start();
		if(this.parent.maybe_run_reset()) return [true,loss_rate];
		return [false,loss_rate];
	}
	async do_special_async() {
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
	async rare_faster_async() {
		this.parent.timeout_inc(1.002);
		await this.next_timeout_async(this.parent.timeout_ms,'<');
		await this.do_special_async();
	}
	async faster_timeout_async() {
		this.parent.timeout_inc();
		await this.next_timeout_async(this.parent.timeout_ms,'+');
	}
	async slower_timeout_async() {
		this.parent.timeout_dec();
		await this.next_timeout_async(this.parent.timeout_ms,'-');
	}
	async main_async() {
		const log_ic=false;
		const log_tm=false;
		log_ic;
		log_tm;
		if(this.main_running) {
			throw new Error("Already running");
		}
		this.main_running=true;
		try {
			run_loop: while(this.main_running) {
				for(this.parent.iter_count=0;;) {
					// 30
					this.unit_upgradeable_trigger=30;
					if(this.parent.timeout_ms&&this.parent.timeout_ms>3*60*1000) {
						this.unit_upgradeable_trigger=8;
					}
					if(this.parent.unit_upgradable_count>this.unit_upgradeable_trigger) {
						this.parent.unit_upgradable_count=0;
						await this.rare_faster_async();
					}
					let [quit,loss_rate]=await this.maybe_async_reset();
					if(quit) break run_loop;
					if(loss_rate==0) {
						await this.faster_timeout_async();
					} else {
						await this.slower_timeout_async();
					}
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
		this.fast_unit_running=true;
		let count=0;
		while(this.fast_unit_running) {
			await this.parent.unit_promote_start();
			if(this.parent.pre_total==window.totalAtome) break;
			this.parent.do_fast_unit_step_change();
			await this.next_timeout_async(this.parent.round(this.parent.timeout_ms/2),':');
			count++;
			if(count>(this.unit_upgradeable_trigger*16)) break;
		}
		window.bonusAll();
		this.fast_unit_running=false;
		this.parent.do_fast_unit_change();
		await this.next_timeout_async(this.parent.timeout_ms,'$');
	}
	/** @arg {number} timeout @arg {string} char */
	async next_timeout_async(timeout,char,silent=false) {
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

class AutoBuyImpl {
	constructor() {
		this.root_node=new AsyncNodeRootImplR;
		this.with_async=new AsyncAutoBuy(this);
		this.timeout_ms=0;
		this.iter_count=0;
		this.epoch_len=0;
		this.background_audio=null;
		this.state_history_arr=null;
		this.skip_save=false;
		this.has_real_time=false;
		/** @type {([1,number]|[2,number])[]} */
		this.cint_arr=[];
		this.local_data_loader=new DataLoaderImplR(localStorage);
		this.state=new AutoBuyStateImplR(this.root_node);
		this.debug=this.state.debug;
		this.compressor=new MulCompression;
		let history_loaded=this.local_data_loader.load_str_arr('auto_buy_history_str');
		if(history_loaded[0]) {
			this.state_history_arr=history_loaded[1];
		} else {
			this.state_history_arr=["S"];
		}
		this.epoch_start_time=Date.now();
		this.original_map=new Map;
		/** @type {Map<string, (Node|string)>} */
		this.dom_map=new Map;
		/** @type {string[]} */
		this.debug_arr=[];
		this.flags=new Set();
		try {
			this.check_for_symbols();
		} catch(e) {
			console.log(e);
		}
		let timeout_arr_load=this.local_data_loader.load_int_arr('auto_buy_timeout_str');
		if(timeout_arr_load[0]) {
			this.timeout_arr=timeout_arr_load[1];
		} else {
			this.timeout_arr=[30];
			this.timeout_arr.length=16;
			let data_len=1;
			while(data_len<this.timeout_arr.length) {
				this.timeout_arr.copyWithin(data_len,0);
				data_len*=2;
			}
		}
	}
	/**
	 * @param {number} log_level
	 * @param {string} format_str
	 * @param {string[]} args
	 */
	test_log(log_level,format_str,...args) {
		if(args.length>0) {
			args.unshift("test:");
		} else {
			args.unshift("test");
		}
		log_if(log_level,format_str,...args);
	}
	/** @arg {{ [x: string]: any; }} sym_indexed_this @arg {{ sym: any; }} val */
	symbols_iter(sym_indexed_this,val) {
		if(!sym_indexed_this[val.sym]) return;
		let obj=sym_indexed_this[val.sym];
		if(!obj.split) return;
		let str=sym_indexed_this[val.sym];
		let arr=str.split(",");
		let trimmed=arr.map((/** @type {string} */ e) => e.trim());
		this.debug_arr.push(...trimmed);
	}
	check_for_symbols() {
		/** @type {any} */
		let this_as_any=this;
		/** @type {{[x:symbol]:string}} */
		let sym_indexed_this=this_as_any;
		for(let i=0;i<debug_id_syms.length;i++) {
			let val=debug_id_syms[i].deref();
			if(val) this.symbols_iter(sym_indexed_this,val);
		}
	}
	pre_init() {
		let audio_element=document.querySelector("#background_audio");
		if(!audio_element) throw new Error("Missing element querySelector('#background_audio')");
		if(!(audio_element instanceof HTMLAudioElement)) throw new Error("querySelector('#background_audio') is not an instance of HTMLAudioElement");
		this.background_audio=audio_element;
		this.background_audio.onloadeddata=null;
		this.background_audio.volume=AUDIO_ELEMENT_VOLUME;
		this.async_pre_init().then(() => {
			log_if(LOG_LEVEL_INFO,'pre_init done');
		}); this.dom_pre_init();
	}
	async async_pre_init() {
		if(!this.background_audio) throw new Error("1");
		if(!(this.background_audio instanceof HTMLAudioElement)) throw new Error("1");
		x: try {
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
			// (vm_self as object_index) "target_obj"
			get;
			// (vm_self as object_index).target_obj
			// .. -> (vm_self.target_obj named target_obj)
			// .. -> target_obj
			cast,object_index;
			// <object_index>target_obj
			push,background_audio;
			// <object_index>target_obj "background_audio"
			get;
			// (<object_index>target_obj)["background_audio"]
			// .. -> (target_obj.background_audio named background_audio)
			// .. -> background_audio
			dup;
			// background_audio background_audio
			cast,object_index;
			// background_audio (background_audio as object_index)
			push,play;
			// background_audio (background_audio as object_index) "play"
			get;
			// background_audio (background_audio as object_index)["play"]
			// target_obj background_audio .. -> background_audio.play
			cast,vm_function;
			// background_audio (background_audio.play as vm_function)
			// .. -> call(background_audio, (background_audio.play as vm_function))
			// .. -> background_audio.play()
			call,int(2);
			// (return is Promise<void> named playback_promise)
			dup;
			// playback_promise playback_promise
			cast,object_index;
			// playback_promise (playback_promise as object_index)
			push,then;
			// playback_promise (playback_promise as object_index) "then"
			get;
			// playback_promise playback_promise.then
			cast,vm_function;
			// playback_promise (playback_promise.then as vm_function)
			push,%o;
			// playback_promise (playback_promise.then as vm_function) arg1
			push,%o;
			// playback_promise (playback_promise.then as vm_function) arg1 arg2
			// .. -> call<4>(playback_promise, (playback_promise.then as vm_function), arg1, arg2)
			// .. -> playback_promise.then(arg1, arg2)
			call,int(4);
			// (return is Promise<void>)
			drop;
			// [none]
			push_global_object;
			// window
			dup;
			// window window
			cast,object_index;
			// window (window as object_index)
			push,removeEventListener;
			// window (window as object_index) "removeEventListener"
			get;
			// window (window as object_index)["removeEventListener"]
			// window .. -> window.removeEventListener
			cast,vm_function;
			// window (window.removeEventListener as vm_function)
			push,click;
			// window (window.removeEventListener as vm_function) "click"
			vm_push_self;
			// window (window.removeEventListener as vm_function) "click" vm_self
			// .. -> call<4>(window, window.removeEventListener, "click", vm_self)
			// .. -> window.removeEventListener("click", vm_self)
			call,int(4);
			// (return is vm_self)
			drop;
			// [none]
			vm_return;
			`;
		let instructions=StackVMParserImplR.parse_instruction_stream_from_string(raw_instructions,[
			function() {
				// LOG_LEVEL_INFO
				log_if(LOG_LEVEL_ERROR,'play success');
			},
			/** @arg {any} err */
			function(err) {
				log_if(LOG_LEVEL_ERROR,err);
			}
		]);
		try {
			let t=this;
			let handler_new={
				handleEvent() {
					this.run().then(() => {
						log_if(LOG_LEVEL_INFO,'play success');
					},function(err) {
						log_if(LOG_LEVEL_ERROR,err);
					});
					window.removeEventListener('click',this);
				},
				async run() {
					if(!t.background_audio) throw 1;
					await t.background_audio.play();
				}
			};
			window.addEventListener('click',handler_new);
			return;
			let handler=new EventHandlerVMDispatchImplR(instructions,this);
			window.addEventListener('click',handler);
		} catch(e) {
			console.log('error when setting up EventHandlerVMDispatch',e);
		}
	}
	save_state_history_arr() {
		if(this.skip_save) return;
		localStorage["auto_buy_history_str"]=this.state_history_arr.join(",");
	}
	/** @arg {string} forced_action */
	get_timeout_arr_data(forced_action) {
		if(forced_action=="RESET") return this.timeout_arr.map((/** @type {number} */ e) => ~~(e/4)).join(",");
		return this.timeout_arr.join(",");
	}
	save_timeout_arr() {
		let forced_action,action_count;
		let action_data=localStorage["auto_buy_forced_action"];
		if(action_data) [forced_action,action_count]=action_data.split(",");
		localStorage["auto_buy_timeout_str"]=this.get_timeout_arr_data(forced_action);
		if(action_count!==void 0) {
			action_count=parseInt(action_count);
			if(Number.isFinite(action_count)) {
				if(action_count>0) {
					localStorage["auto_buy_forced_action"]=[forced_action,action_count-1];
				} else if(forced_action!=="NONE") {
					localStorage["auto_buy_forced_action"]="NONE,0";
				}
			}
		}
	}
	dom_pre_init() {
		const css_display_style=`
		#state_log>div {
			width:max-content;
		}
		#state_log {
			top:0px;
			width:30px;
			position:fixed;
			z-index:101;
			font-family:monospace;
			font-size:22px;
			color:lightgray;
		}`;
		/**
		 * @param {any} obj
		 * @param {HTMLElement} parent
		 * @param {string} tag_name
		 * @param {string} id
		 * @param {string | undefined} [content]
		 */
		function create_element(obj,parent,tag_name,id,content) {
			let ele=document.createElement(tag_name);
			ele.id=id;
			obj.dom_map.set(id,ele);
			if(content!==void 0) {
				ele.innerHTML=content;
			}
			parent.append(ele);
			return ele;
		}
		let state_log=create_element(this,document.body,"div","state_log");
		create_element(this,state_log,"div","history","?3");
		create_element(this,state_log,"div","timeout_element","0");
		create_element(this,state_log,"div","hours_played","0.000 hours");
		create_element(this,state_log,"div","ratio",0..toFixed(2)+"%");
		create_element(this,state_log,"div","ratio_change",0..toExponential(3));
		let sheet=new CSSStyleSheet;
		sheet.replace(css_display_style).then(e => {
			this.adopt_styles(e);
		});
	}
	/** @arg {CSSStyleSheet[]} styles */
	adopt_styles(...styles) {
		let dom_styles=document.adoptedStyleSheets;
		document.adoptedStyleSheets=[...dom_styles,...styles];
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
		/** @type {any} */
		let this_any=this;
		if(window.g_auto_buy&&window.g_auto_buy!==this_any) {
			window.g_auto_buy.destroy();
		}
		window.g_auto_buy=this_any;
	}
	destroy() {
		this.root_node.destroy();
		for(let i=0;i<this.cint_arr.length;i+=2) {
			let cint_item=this.cint_arr[i];
			switch(cint_item[0]) {
				case 1: clearTimeout(cint_item[1]); break;
				case 2: clearInterval(cint_item[1]); break;
				default: console.assert(false,'cant destroy cint item (%o)',cint_item); break;
			}
		}
	}
	update_timeout_element() {
		if(this.timeout_ms) {
			let element=this.dom_map.get('timeout_element');
			if(element instanceof HTMLElement) {
				let acc=2;// 0;
				element.innerText=this.get_millis_as_pretty_str(this.timeout_ms,acc);
			}
		}
	}
	/** @arg {string | number} value @arg {string} pad_char @arg {number} char_num */
	do_zero_pad(value,pad_char,char_num) {
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
	/** @arg {number} timeout_milli @arg {number} milli_acc */
	get_millis_as_pretty_str(timeout_milli,milli_acc) {
		const number_stringify_debug=false;
		let time_arr=[];
		let float_milliseconds=timeout_milli%1000;
		let milli_len=4+milli_acc;
		if(milli_acc===0) {
			milli_len=3+milli_acc;
		}
		if(number_stringify_debug) {
			debugger;
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
	/** @arg {number} hours_num */
	get_hours_num_as_pretty_str(hours_num) {
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
			// console.log(float_milliseconds, float_milliseconds - 1000);
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
		let float_hours=((window.timeplayed/30)/60);
		let time_played_str=this.get_hours_num_as_pretty_str(float_hours);
		let hours_played_e=this.dom_map.get('hours_played');
		if(hours_played_e instanceof HTMLElement) hours_played_e.innerText=time_played_str;
		this.dom_map.set('time_played_str',time_played_str);
	}
	update_ratio_element() {
		let ratio=this.dom_map.get('ratio');
		if(!ratio) return;
		if(!(ratio instanceof HTMLElement)) return;
		ratio.innerText=(this.state.ratio*100).toFixed(2)+"%";
	}
	update_ratio_change_element() {
		let last_ratio=this.state.last_ratio*100;
		let cur_ratio=this.state.ratio*100;
		let ratio_diff=cur_ratio-last_ratio;
		let char_value="+";
		if(ratio_diff<0) char_value='';
		let ratio_change=this.dom_map.get('ratio_change');
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
		let disabled=false;
		if(disabled) return;
		//spell:words secondinterval
		if(window.secondinterval!==void 0) clearInterval(window.secondinterval);
		let time_base=performance.now();
		let interval_id=setInterval(function() {
			let real_time=performance.now();
			let time_diff=real_time-time_base;
			time_base=real_time;
			let real_rate=time_diff/2000;
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
		this.root_node.append_raw_interval(setInterval(function() {
			let doc=window.doc;
			let rounding=window.rounding;
			let totalAtome=window.totalAtome;
			let timeplayed=window.timeplayed;
			let calcPres=window.calcPres;
			doc.title=rounding(totalAtome,false,1).toString()+" atoms";
			//spell:words atomsaccu presnbr
			let atomsaccu_e=doc.getElementById('atomsaccu');
			if(atomsaccu_e) atomsaccu_e.innerHTML=rounding(window.atomsaccu,false,0);
			let timeplayed_e=doc.getElementById('timeplayed');
			if(timeplayed_e) timeplayed_e.innerHTML=(Math.round(timeplayed/30)/60).toFixed(2)+" hours";
			let presnbr_e=doc.getElementById('presnbr');
			if(presnbr_e) presnbr_e.innerHTML="<br>"+(calcPres()*100).toFixed(0)+" % APS boost";
		},2000));
	}
	replace_timeplayed_timer() {
		this.set_secondinterval();
		this.set_timeplayed_update_interval();
	}
	// spell:words constel2
	edit_fns() {
		// lightreset();
		let original_code="&& a != encrypt('Py')";
		let temp=window.lightreset.toString().replace(
			original_code,
			original_code+" "+
			"&& a != encrypt('noti') "+
			"&& a != encrypt('pace') "+
			"&& a != 'constel2'"
		);
		/** @type {any} */
		let temp_function=new Function(
			temp.substring(
				temp.indexOf('{')+1,
				temp.lastIndexOf('}')
			)
		);
		window.lightreset=temp_function;
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
		localStorage["auto_buy_history_str"]="R";
	}
	/** @arg {string} value */
	state_history_append(value,silent=false) {
		this.epoch_len++;
		if(silent) {
			log_if(LOG_LEVEL_DEBUG,'state_history_append_tag silent item',value);
			return;
		}
		if(!value) throw new Error("Invalid state append requested");
		let last=this.state_history_arr.at(-1);
		this.state_history_arr.push(value);
		this.state_history_arr=this.compressor.compress_array(this.state_history_arr);
		this.update_history_element();
		if(this.state.debug) console.log('history append',last,value);
		log_if(LOG_LEVEL_INFO,'state_history_append_tag item',value);
		while(this.state_history_arr.length>2000) this.state_history_arr.shift();
	}
	/** @arg {Event} _event */
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
			this.timeout_ms*=0.9;
		} else {
			this.timeout_ms=2;
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
		};
		const avg=total/this.timeout_arr.length;
		log_if(LOG_LEVEL_DEBUG,"timeout_avg",avg);
		return [min,avg,max];
	}
	/** @type {number[]} */
	large_diff=[];
	calc_timeout_ms() {
		// debugger;
		while(this.timeout_arr.length>60) this.timeout_arr.shift();
		let max=0;
		let total=0;
		for(var i=0;i<this.timeout_arr.length;i++) {
			total+=this.timeout_arr[i];
			max=Math.max(this.timeout_arr[i],max);
		};
		const val=total/this.timeout_arr.length;
		let num=val;// max / val;
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
		if(val<=1) {
			debugger;
		}
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
	do_fast_unit_step_change() {
		this.do_timeout_dec([1.006],40);
	}
	do_fast_unit_change() {
		this.do_timeout_dec([1.006],40);
	}
	timeout_dec() {
		this.do_timeout_dec([1.005],30);
	}
	timeout_inc(pow2=1.004) {
		this.do_timeout_inc([1.004,pow2],70);
	}
	unit_upgradable_count=0;
	async unit_promote_start() {
		this.timeout_ms=this.calc_timeout_ms();
		this.pre_total=window.totalAtome;
		await do_auto_unit_promote();
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
	/** @arg {number} pow_base @arg {number} pow_num @arg {number} div */
	get_timeout_change(pow_base,pow_num,div) {
		if(!this.timeout_ms) throw new Error("Invalid");
		let pow_res=Math.pow(pow_base,pow_num);
		let res=this.timeout_ms*pow_res;
		return res/div;
	}
	/** @arg {number} change */
	update_timeout_inc(change) {
		if(window.__testing__) {
			return;
		}
		if(!this.timeout_ms) throw new Error("Invalid");
		let value=this.round(this.timeout_ms+change);
		log_if(LOG_LEVEL_INFO,'update_timeout_inc_tag inc',this.timeout_ms,value-this.timeout_ms);
		this.timeout_arr.push(value);
	}
	/** @arg {number} change */
	update_timeout_dec(change) {
		if(window.__testing__) {
			return;
		}
		if(!this.timeout_ms) throw new Error("Invalid");
		let value=this.round(this.timeout_ms-change);
		if(value<25) value=25;
		log_if(LOG_LEVEL_INFO,'update_timeout_dec_tag dec',this.timeout_ms,this.timeout_ms-value);
		this.timeout_arr.push(value);
	}
	/** @arg {number} value */
	round(value) {
		return value;
		// return ~~value;
	}
	/** @arg {number[]} pow_terms @arg {number} div */
	do_timeout_dec(pow_terms,div) {
		let change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		log_if(LOG_LEVEL_DEBUG,"do_timeout_dec_tag dec timeout_change",change);
		this.update_timeout_dec(change+1);
	}
	/** @arg {number[]} pow_terms @arg {number} div */
	do_timeout_inc(pow_terms,div) {
		let iter_term=Math.pow(pow_terms[1],this.iter_count);
		let change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		log_if(LOG_LEVEL_DEBUG,"do_timeout_inc_tag inc timeout_change",'change',change,'pow',pow_terms[1],'^',this.iter_count,'->',iter_term);
		this.update_timeout_inc(change*iter_term+1);
	}
	/** @arg {string} msg @arg {Error} err */
	next_timeout_async_err_log(msg,err) {
		console.log(msg,err);
	}
	/** @arg {number | undefined} timeout @arg {string} char */
	[labeled_sym("next_timeout_async")](timeout,char) {
		console.log('next_timeout_async',char,timeout);
		let err=new Error;
		this.next_timeout_async_err_log('next_timeout_async stk',err);
	}
	/** @arg {()=>void} trg_fn @arg {number} timeout @arg {string} char */
	next_timeout(trg_fn,timeout,char,silent=false) {
		let node=new TimeoutNode(timeout);
		this.root_node.append_child(node);
		node.start(new TimeoutTarget(this,trg_fn));
		if(!silent) {
			this.timeout_ms=timeout;
			this.update_timeout_element();
		}
		this.state_history_append(char,silent);
	}
	/** @arg {{ done: any; cost: number; }} special_buyable */
	is_special_done(special_buyable) {
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
		// count+=+(this.timeout_ms > 30*1000);
		count+=+(this.state.ratio>1);
		//count+=+this.is_epoch_over();
		count+=+(this.state.locked_cycle_count<=0);
		count+=+(calcPres()*100>calcPres_target_percent);
		switch(count) {
			case 0:
			case 1:
			case 2:
			case 3:
				break;
			default: console.log('maybe_run_reset count',count);
		}
		if(
			this.state.ratio>1&&
			// this.is_epoch_over() &&
			// this.state.locked_cycle_count <= 0 &&
			calcPres()*100>calcPres_target_percent
		) {
			this.do_game_reset();
			return true;
		}
		return false;
	}
	do_game_reset() {
		if(!this.timeout_ms) {
			this.timeout_ms=300;
		}
		// this.game_reset_step_1
		this.next_timeout(this.game_reset_finish,this.round(this.timeout_ms/3),'1R');
		this.on_repeat_r();
	}
	do_audio_mute_toggle() {
		if(!AudioMuted) {
			// this.background_audio.muted=!this.background_audio.muted;
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
	/** @arg {string} time_played */
	dispatch_on_game_reset_finish(time_played) {
		this.state.on_game_reset_finish(time_played);
		this.on_game_reset_finish(time_played);
	}
	/** @arg {string} time_played */
	on_game_reset_finish(time_played) {
		console.info('fire lightreset at %s',time_played);
		let prestige_acc=10000;
		let real_val=calcPres()*100;
		let [_real,num,exponent]=this.state.calc_near_val(real_val);
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
/**
 * @param {number} delay
 */
function wait(delay) {
	return new Promise(function(a) {
		setTimeout(a,delay);
	});
}
/**
 * @param {number} id
 */
async function tonext_async(id) {
	var next=Find_ToNext(id);
	if(arUnit[id][16]||arUnit[id][8]=="quantum foam") {
		for(var y=0;y<next;y++) {
			await wait(40);
			mainCalc(id);
		}
	}
}
tonext_async;
async function do_auto_unit_promote() {
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
	if(maxed[res]) {
		for(var y=0;y<100;y++) {
			await wait(0);
			mainCalc(res);
		}
	} else {
		tonext(res);
	}
}
const auto_buy_obj=new AutoBuyImpl;
/** @type {<T, U>(a:T[], b:U[])=>[T, U][]} */
function to_tuple_arr(keys,values) {
	/** @type {[typeof keys[0], typeof values[0]][]} */
	let ret=[];
	for(let i=0;i<keys.length;i++) {
		let k=keys[i];
		let v=values[i];
		/** @type {[typeof k, typeof v]} */
		let item=[k,v];
		ret.push(item);
	}
	return ret;
}
/** @arg {string[]} arr @arg {number} rem_target_len */
function array_sample_end(arr,rem_target_len) {
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
/** @arg {any[]} arr */
function char_len_of(arr) {
	return arr.reduce((a,b) => a+b.length,0)+arr.length;
}
function lightreset_inject() {
	window.g_auto_buy.state_history_clear_for_reset();
	window.g_auto_buy.skip_save=true;
	window.addEventListener('unload',function() {
		window.g_auto_buy.skip_save=false;
		localStorage["long_wait"]=12000;
	});
	let original=window.g_auto_buy.original_map.get('lightreset');
	if(!original) {
		alert('unable to light reset game');
		throw new Error("Missing original lightreset");
	}
	original();
}
/** @arg {number} that */
function specialclick_inject(that) {
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
		(that<74)? seeUnit(that+1):seeUnit(that-1);
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
/** @arg {typeof $} value */
function got_jquery(value) {
	Object.defineProperty(window,'$',{
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
	use_jquery();
}
function use_jquery() {
	let jq=window.$;
	if(!jq) return;
	if(typeof jq!='function') return;
	let res=jq('head');
	let r_proto=Object.getPrototypeOf(res);
	r_proto.lazyload=function(/** @type {any} */ ..._a) {};
	return jq;
}
function proxy_jquery() {
	let val=use_jquery();
	set_jq_proxy(val);
}
/** @arg {typeof $ | undefined} value */
function set_jq_proxy(value) {
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
/** @arg {HTMLScriptElement} node */
function remove_html_nodes(node) {
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
	constelOff();
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
/** @arg {HTMLScriptElement} elm */
function dom_add_elm_filter(elm) {
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
/** @arg {(value: any) => void} promise_accept */
function do_load_fire_promise(promise_accept) {
	if(document.firstChild) {
		document.firstChild.remove();
	}
	promise_accept(null);
}
function page_url_no_protocol() {
	return location.href.slice(location.protocol.length);
}
/** @arg {PopStateEvent} e */
function popstate_event_handler(e) {
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
	constructor() {
		/** @type {MutationObserver|null} */
		this.observer=null;
	}
	disconnect() {
		if(!this.observer) return;
		this.observer.disconnect();
	}
}
class DetachedMutationObserver extends BaseMutationObserver {
	/** @arg {Node} target */
	constructor(target) {
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
	/** @type {(_mutations: MutationRecord[], observer: MutationObserver)=>void} */
	callback(_mutations,observer) {
		observer.disconnect();
	}
}
class LoadMutationObserver extends BaseMutationObserver {
	/** @arg {Node} target @arg {(mut_vec: MutationRecord[], mut_observer: MutationObserver) => void} callback */
	constructor(target,callback) {
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
	/** @type {MutationCallback} */
	callback(mutations,observer) {
		this.m_callback(mutations,observer);
		observer.disconnect();
	}
}
/** @type {BaseMutationObserver[]} */
let mut_observers=[];
window.g_mut_observers=mut_observers;
/** @type {(node: Node, child: Node | null)=>boolean}*/
function insert_before_enabled(node,child) {
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
		/** @arg {[Node, Node]} parameters */
		apply(target,thisValue,parameters) {
			if(insert_before_enabled(...parameters)) {
				return Reflect.apply(target,thisValue,parameters);
			}
			return null;
		}
	});
	let document_write_list=new DocumentWriteListImpl_1;
	document_write_list.attach_proxy(document);
	document_write_list.document_write_proxy;
	/** @type {any} */
	let any_wl=document_write_list;
	window.document_write_list=any_wl;
	document.stop=function() {};
	function nop_timeout() {
		console.log('nop timeout');
		return -1;
	}
	let real_st=setTimeout;
	let real_si=setInterval;
	/** @type {any} */
	let any_nop=nop_timeout;
	window.setTimeout=any_nop;
	window.setInterval=any_nop;
	/** @arg {any[]} v */
	function no_aev(...v) {
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
				if(localStorage["justReset"]==='true') {
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
		/** @type {any[]} */
		let arr=[];
		/** @type {any} */
		let any_cur=arr;
		window.adsbygoogle=any_cur;
		window.adsbygoogle.op=window.adsbygoogle.push;
		window.adsbygoogle.push=function(e) {
			// console.log('ads by google push');
			let cs=document.currentScript;
			/** @type {Element|null} */
			let ls=null;
			if(!cs) return;
			let prev=cs.previousElementSibling;
			if(prev&&prev instanceof HTMLElement&&prev.dataset["adSlot"]) {
				let ad_slot=cs.previousElementSibling;
				if(prev.previousElementSibling) ls=prev.previousElementSibling;
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
			/** @type {HTMLScriptElement[]} */
			let added_scripts=[];
			/** @type {HTMLScriptElement[]} */
			let removed_scripts=[];
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
setInterval(function() {
	console.clear();
},15*60*1000);
