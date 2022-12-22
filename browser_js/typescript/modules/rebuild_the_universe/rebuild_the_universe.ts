// ==UserScript==
// @name			rebuild the universe auto
// @namespace		http://tampermonkey.net/
// @version			4.0-ts
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

import {CompressDual} from "../DebugApi/types/CompressDual";
import {CompressStateBase} from "../DebugApi/types/CompressStateBase";

export interface AbstractVM {
	halt(): void;
	execute_instruction(instruction: InstructionTypeImpl): void;
	run(): BoxImpl;
}

export abstract class BoxTemplateImpl<T extends string,V> {
	abstract readonly type: T;
	value: V;
	constructor(value: V) {
		this.value=value;
	}
}

export class ArrayBoxImpl extends BoxTemplateImpl<"array_box",BoxImpl[]> {
	readonly type="array_box";
	readonly item_type="Box";
}

export class AsyncFunctionBoxImpl extends BoxTemplateImpl<"function_box",(...a: BoxImpl[]) => Promise<BoxImpl>> {
	readonly type="function_box";
	readonly return_type="promise_box";
	readonly await_type="Box";
	wrap_call(target_this: BoxImpl,...args: BoxImpl[]): BoxImpl {
		let ret=this.value.apply(target_this,args);
		return new PromiseBox(ret);
	}
}
export class BoxWithPropertiesIsBoxImpl extends BoxTemplateImpl<"with_properties",{}> {
	readonly type="with_properties";
	properties: string[];
	constructor(value: BoxWithPropertiesObjTypeImpl<BoxWithPropertiesIsBoxImpl["properties"]>,properties: string[]) {
		super(value);
		this.properties=properties;
	}
}
export type BoxWithPropertiesObjTypeImpl<T extends string[]>={
	[U in T[number]]: BoxImpl
};
export class CSSStyleSheetBoxImpl extends BoxTemplateImpl<"CSSStyleSheetBox",CSSStyleSheet> {
	readonly type="CSSStyleSheetBox";
	readonly next_member="instance_type";
	readonly instance_type="CSSStyleSheet";
}
export interface BoxMakerImpl<TMakerArgs,TBoxRet extends BoxTemplateImpl<string,any>> {
	maker: (
		make_new: (do_box: () => TBoxRet["value"],...a: TMakerArgs[]) => TBoxRet,
		value: FunctionConstructor
	) => TBoxRet;
}
export class CSSStyleSheetConstructorBox extends BoxTemplateImpl<"constructor_box",typeof CSSStyleSheet> {
	readonly type="constructor_box";
	readonly next_member="instance_type";
	readonly instance_type="CSSStyleSheet";
	readonly arguments=[{name: "options",opt: true,value: {types: ["CSSStyleSheetInit","undefined"]}}] as const;
	readonly args_type: [options?: CSSStyleSheetInit|undefined]=[];
	on_get(_vm: StackVMImpl,key: string) {
		console.log("get","CSSStyleSheetConstructorBox",key);
	}
	factory(...arr: BoxImpl[]) {
		let valid_args: [options?: CSSStyleSheetInit|undefined]=[];
		for(let i=0;i<arr.length;i++) {
			let val=arr[i];
			if(val.type!="shape_box") continue;
			if(val.shape!="CSSStyleSheetInit") continue;
			valid_args[0]=val.value;
		}
		let value=this.value;
		let obj: CSSStyleSheet=new value(...valid_args);
		return new CSSStyleSheetBoxImpl(obj);
	}
}

export class CSSStyleSheetInitBox extends BoxTemplateImpl<"shape_box",CSSStyleSheetInit> {
	readonly type="shape_box";
	readonly shape="CSSStyleSheetInit";
	set_property(key: keyof CSSStyleSheetInit,value: string|boolean|MediaListBox|undefined) {
		if(key==="baseURL") {
			if(typeof value=="string") {
				this.value[key]=value;
			} else {
				throw new Error("Invalid value for key "+key);
			}
		} else if(key==="disabled") {
			if(typeof value==="boolean") {
				this.value[key]=value;
			} else {
				throw new Error("Invalid value for key "+key);
			}
		} else if(key==="media") {
			if(typeof value==="object"&&value.instance_type==="MediaList") {
				this.value[key]=value.value;
			} else if(typeof value==="string") {
				this.value[key]=value;
			} else {
				throw new Error("Invalid value for key "+key);
			}
		} else {
			throw new Error("Type shenanigans afoot (You passed a value that should be impossible at runtime)");
		}
	}
}
export class CSSStyleSheetPromiseBox extends BoxTemplateImpl<"promise_box",Promise<CSSStyleSheet>> {
	readonly type="promise_box";
	readonly inner_type="Promise<CSSStyleSheet>";
	readonly await_type="CSSStyleSheet";
}
export class DocumentBox extends BoxTemplateImpl<"document_box",Document> {
	readonly type="document_box";
}
export class EmptyArrayBox extends BoxTemplateImpl<"array_box",[]> {
	readonly type="array_box";
	readonly item_type="none";
	readonly special="Unit";
}
export interface NewableFunctionConstructor {
	make_new: new (...a: BoxImpl[]) => FunctionInstance;
}
export interface FunctionConstructorFactoryImpl {
	factory: (box_value: NewableFunctionConstructor) => FunctionBoxImpl;
}
export class FunctionBoxImpl extends BoxTemplateImpl<"function_box",(...a: BoxImpl[]) => BoxImpl> {
	readonly type="function_box";
	readonly return_type="Box";
	on_get(vm: StackVMImpl,key: string) {
		switch(key) {
			case "toString": {
				let inner_value=this.value[key];
				function bound_executor(this: (...a: BoxImpl[]) => BoxImpl) {
					return new StringBoxImpl(inner_value.call(this));
				}
				let push_value=new FunctionBoxImpl(bound_executor.bind(this.value));
				vm.push(push_value);
			} break;
			case "apply":
			case "call":
			case "bind":
			case "arguments":
			case "caller":
			case "constructor":
			case "length":
			case "name":
		}
	}
}
export class FunctionConstructorBoxImpl {
	readonly type="constructor_box";
	readonly instance_type="Function";
	readonly arguments="string[]";
	readonly return="box";
	readonly instance_factory: FunctionConstructorFactoryImpl;
	readonly value: typeof Function;
	readonly box_maker: BoxMakerImpl<string,FunctionBoxImpl>;
	constructor(
		value: typeof Function,
		instance_factory: FunctionConstructorFactoryImpl,
		box_maker: BoxMakerImpl<string,FunctionBoxImpl>
	) {
		this.value=value;
		this.instance_factory=instance_factory;
		this.box_maker=box_maker;
	}
	on_get(vm: StackVMImpl,key: string) {
		switch(key) {
			case "name": vm.push(new StringBoxImpl(this.value[key])); break;
			case "prototype": {
				let value=new RawBoxImpl({as_interface: this.value[key]},Symbol.for("Function"));
				vm.push(value);
			} break;
			case "length": vm.push(new NumberBoxImpl(this.value[key])); break;
			default: {
				Object.keys(Object.getOwnPropertyDescriptors(this.value)).forEach(e => {
					if(e===key) {
						console.log("case needed for key '"+e+"'");
						vm.push((this.value as any)[e]);
					}
				});
				this.on_get(vm,key);
			}
		}
	}
	verify_arguments(...boxes: BoxImpl[]) {
		if(boxes.length===0) {
			return true;
		}
		if(boxes.length===1&&boxes[0].type==="string") {
			return true;
		}
		return false;
	}
}
export type FunctionInstance=(...a: BoxImpl[]) => BoxImpl;
export class GlobalThisBox extends BoxTemplateImpl<"value_box",typeof globalThis> {
	readonly type="value_box";
	readonly inner_value="globalThis";
}
export type IndexAccess<T>={
	[v: string]: T;
};
export class IndexBox extends BoxTemplateImpl<"object_box",IndexAccess<BoxImpl>> {
	readonly type="object_box";
	readonly like_type="object_box";
	readonly extension="index";
	readonly index_type="Box";
	readonly inner_type="Box";
}
export class InstructionTypeArrayBox extends BoxTemplateImpl<"array_box",InstructionTypeImpl[]> {
	readonly type="array_box";
	readonly next_member="item_type";
	readonly item_type="instruction_type[]";
}
export class InstructionTypeBox extends BoxTemplateImpl<"instance_box",InstructionTypeImpl> {
	readonly type="instance_box";
	readonly instance_type="InstructionType";
}
export class MediaListBox extends BoxTemplateImpl<"instance_box",MediaList> {
	readonly type="instance_box";
	readonly instance_type="MediaList";
}
export class NewableInstancePackBox extends BoxTemplateImpl<"instance_box",NewableInstancePack<{}>> {
	readonly type="instance_box";
	readonly instance_type="NewableInstancePack<{}>";
}

export class NewableFunctionBox {
	readonly type="constructor_box";
	readonly instance_type="unknown";
	readonly arguments="box[]";
	readonly return="box";
	readonly value_name="[factory_value,class_value]";
	value: {factory_value: NewableInstancePack<{}>,class_value: new (...a: BoxImpl[]) => {};};
	constructor(factory_value: NewableInstancePack<{}>,class_value: new (...a: BoxImpl[]) => {}) {
		this.value={factory_value,class_value};
	}
	get_construct_arguments(): [NewableInstancePack<{}>,new (...a: BoxImpl[]) => {}] {
		return [this.value.factory_value,this.value.class_value];
	}
	on_get(vm: StackVMImpl,key: string) {
		switch(key) {
			case 'factory_value': vm.push(new NewableInstancePackBox(this.value.factory_value))
		}
		throw new Error("Method not implemented.");
	}
	factory(...args: BoxImpl[]) {
		return this.value.factory_value.make_box(this.value.class_value,args);
	}
}
export interface NewableInstancePack<T> {
	make_box(box_value: new (...a: BoxImpl[]) => T,construct_args: BoxImpl[]): BoxImpl;
}
export class NewableInstancePackObjectBox extends BoxTemplateImpl<"NewableInstancePack<{}>",NewableInstancePack<{}>> {
	readonly type="NewableInstancePack<{}>";
}
export class NodeBox extends BoxTemplateImpl<"instance_box",Node> {
	readonly type="instance_box";
	readonly instance_type="Node";
}
export class NullBox extends BoxTemplateImpl<"null",null>  {
	readonly type="null";
}
export class NumberBox extends BoxTemplateImpl<"number",number>  {
	readonly type="number";
}
export class ObjectBox extends BoxTemplateImpl<"object_box",{}> {
	readonly type="object_box";
	readonly inner_type="object";
	readonly extension="null";
}
export class PromiseBox extends BoxTemplateImpl<"promise_box",Promise<BoxImpl>> {
	readonly type="promise_box";
	readonly inner_type='Promise<Box>';
	readonly await_type="Box";
}
export class RawBox<T> {
	readonly type="raw_box";
	value: null;
	raw_value: T;
	type_symbol: symbol;
	constructor(value: T,symbol_: symbol) {
		this.value=null;
		this.raw_value=value;
		this.type_symbol=symbol_;
	}
}
export type RawBoxes=RawBox<{as_interface: Function;}>|RawBox<{as_unknown: unknown;}>|RawBox<{as_any: any;}>;
export class RealVoidBox extends BoxTemplateImpl<"real_void",void> {
	readonly type="real_void";
}
export class StackVMBox extends BoxTemplateImpl<"custom_box",StackVMImpl> {
	readonly type="custom_box";
	readonly box_type="StackVM";
}
export class StringBoxImpl extends BoxTemplateImpl<"string",string> implements StringBoxT {
	readonly type="string";
}
export class VoidBoxImpl {
	readonly type="void";
	readonly extension="null";
	value=void 0;
}
export class VoidPromiseBox extends BoxTemplateImpl<"promise_box",Promise<void>> {
	readonly type="promise_box";
	readonly inner_type: 'Promise<void>'='Promise<void>';
	readonly await_type="void";
}
export class WindowBox extends BoxTemplateImpl<"object_box",Window> {
	readonly type="object_box";
	readonly extension=null;
	readonly inner_type="Window";
}
export class DomElementBox {
	readonly type="DomValueBox";
	value: Element;
	constructor(value: Element) {
		this.value=value;
	}
}
export class PromiseFunctionBox {
	readonly type="PromiseFunctionBox";
	value: (...args: BoxImpl[]) => Promise<BoxImpl>;
	constructor(value: (...args: BoxImpl[]) => Promise<BoxImpl>) {
		this.value=value;
	}
}
export type InstructionMapImpl={
	append: ["append"];
	breakpoint: ["breakpoint"];
	call: ["call",number];
	cast: ["cast",CastOperandTarget];
	construct: ["construct",number];
	drop: ["drop"];
	dup: ["dup"];
	get: ["get"];
	halt: ["halt"];
	je: ["je",number];
	jmp: ["jmp",number];
	modify_operand: ["modify_operand",number,number];
	nop: ["nop"];
	peek: ["peek",number];
	push_window_object: ["push_window_object"];
	push: ["push",...BoxImpl[]];
	return: ["return"];
	vm_block_trace: ["vm_block_trace",VMBlockTraceOperand];
	vm_call: ["vm_call",number];
	vm_push_args: ["vm_push_args"];
	vm_push_ip: ["vm_push_ip"];
	vm_push_self: ["vm_push_self"];
	vm_return: ["vm_return"];
	dom_exec: ["dom_exec",number];
	dom_peek: ["dom_peek",number,number];
	dom_new: ["dom_new",typeof CSSStyleSheet,[],AsyncFunctionBoxImpl,[string]];
	dom_get: ["dom_get",string];
	dom_create_element: ["dom_create_element","div",string,string];
	dom_create_element_with_props: ["dom_create_element_with_props","div",string,{id: string;}];
};
export type InstructionTypeImpl=InstructionMapImpl[keyof InstructionMapImpl];
type VMBlockTraceOperand=
	["begin",DomInstructionType|null]|
	["call",DomInstructionType|null]|
	["block",number,number]|
	["tagged",DomTaggedPack|null]|
	["tagged_begin",DomTaggedPack|null]|
	["tagged_call",DomTaggedPack|null];
export type DomTaggedPack=
	["dom",DomInstructionType]|
	["vm",InstructionTypeImpl]|
	["dom_mem",number];
type ArgAny4=[4,any,any,any,any];
export type DomInstructionMapImpl={
	append: [number,"append"];
	breakpoint: [number,"breakpoint"];
	call: [number,"call",number];
	cast: [number,"cast",CastOperandTarget];
	construct: [number,"construct",number];
	create_id: [number,"create_id","div",string];
	create: [number,"create","div",string,string];
	dom_filter: [number,"dom_filter",ArgAny4];
	drop: [number,"drop"];
	dup: [number,"dup"];
	get: [number,"get"];
	halt: [number,"halt"];
	je: [number,"je",number];
	jmp: [number,"jmp",number];
	marker: [number,"marker",null];
	modify_operand: [number,"modify_operand",number,number];
	nop: [number,"nop"];
	peek: [number,"peek",number];
	push_window_object: [number,"push_window_object"];
	push: [number,"push",...BoxImpl[]];
	return: [number,"return"],
	vm_block_trace: [number,"vm_block_trace",VMBlockTraceOperand];
	vm_call_at: [number,"vm_call_at",DomTaggedPack];
	vm_call: [number,"vm_call",number];
	vm_push_args: [number,"vm_push_args"],
	vm_push_ip: [number,"vm_push_ip"],
	vm_push_self: [number,"vm_push_self"],
	vm_return: [number,"vm_return"];
};
export type DomInstructionType=DomInstructionMapImpl[keyof DomInstructionMapImpl];

export type DomTaggedPackImpl=["dom",DomInstructionType]|["vm",InstructionTypeImpl]|["dom_mem",number];

declare global {
	interface Window {
		console: Console;
	}
}
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
	if(level_str!=="unknown") {
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
	} else if(level_str==="unknown") {
		console.info(format_str,level,level_str,...args);
	} else {
		console.info(format_str,level_str,...args);
	}
}

function human_log_level(level: number) {
	switch(level) {
		case LOG_LEVEL_CRIT: return "crit";
		case LOG_LEVEL_ERROR: return "error";
		case LOG_LEVEL_WARN: return "warn";
		case LOG_LEVEL_NOTICE: return "notice";
		case LOG_LEVEL_INFO: return "info";
		case LOG_LEVEL_DEBUG: return "debug";
		case LOG_LEVEL_TRACE: return "trace";
		default: return "unknown";
	}
}

function log_if(level: number,format_str: string,...args: any[]) {
	if(level>local_logging_level) return;
	append_console_message(level,format_str,...args);
}

function update_logger_vars() {
	if(!globalThis.sessionStorage) return;
	if(globalThis.sessionStorage["LogErrorAsConsoleError"]) {
		LogErrorAsConsoleError=sessionStorage["LogErrorAsConsoleError"]==="true";
	}
	if(globalThis.sessionStorage["LoggingLevel"]) {
		local_logging_level=parseInt(sessionStorage["LoggingLevel"],10);
	}
}

function trigger_debug_breakpoint() {
	debugger;
}

class StackVMBoxImpl {
	type: "custom_box";
	box_type: "StackVM";
	value: StackVMImpl;
	constructor(value: StackVMImpl) {
		this.type="custom_box";
		this.box_type="StackVM";
		this.value=value;
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}

class WindowBoxImpl {
	type: "object_box";
	extension: null;
	inner_type: "Window";
	value: Window;
	constructor(value: Window) {
		this.type="object_box";
		this.extension=null;
		this.inner_type="Window";
		this.value=value;
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}

class ObjectBoxImpl {
	type: "object_box";
	inner_type: "object";
	extension: "null";
	value: Record<never,never>;
	constructor(value: Record<never,never>) {
		this.type="object_box";
		this.inner_type="object";
		this.extension="null";
		this.value=value;
	}
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}

class InstructionCallImpl {
	debug: boolean=false;
	type: "call";
	constructor() {
		this.type="call";
	}
	run(vm: StackVMImpl,instruction: InstructionMapImpl[this["type"]]) {
		let number_of_arguments=instruction[1];
		if(typeof number_of_arguments!="number") throw new Error("Invalid");
		if(number_of_arguments<=1) {
			throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
		}
		let [target_this,value_box,...arg_arr]=vm.pop_arg_count(number_of_arguments);
		console.log('TODO: vm_call',target_this,value_box,arg_arr);
	}
}

class InstructionConstructImpl {
	type: "construct";
	constructor() {
		this.type="construct";
	}
	run(vm: StackVMImpl,ins: InstructionMapImpl[this["type"]]) {
		let number_of_arguments=ins[1];
		if(typeof number_of_arguments!="number") throw new Error("Invalid");
		let [construct_target,...construct_arr]=vm.pop_arg_count(number_of_arguments);
		const a=construct_target;
		if(typeof a!="object") throw new Error("Invalid");
		if(a===null) throw new Error("Invalid");
		if(a.type!="constructor_box") throw new Error("Invalid");
		/* if(a.instance_type===null) {
			let obj=a.factory(...construct_arr);
			vm.stack.push(obj);
		} else if(a.instance_type==="CSSStyleSheet") {
			let valid_args: {s: [options?: CSSStyleSheetInit|undefined],valid_count: 1;}|{s: [],valid_count: 0;}={
				s: [],
				valid_count: 0
			};
			for(let i=0;i<construct_arr.length;i++) {
				let val=construct_arr[i];
				if(typeof val!="object") continue;
				if(val===null) continue;
				if(val.type!="shape_box") continue;
				valid_args={
					s: [val.value],
					valid_count: 1
				};
			}
			let obj=new a.value(...valid_args.s);
			vm.stack.push(new CSSStyleSheetBoxImpl(obj) as unknown as Box);
		} */
		log_if(LOG_LEVEL_INFO,"",ins,...vm.stack.slice(vm.stack.length-number_of_arguments),construct_arr);
	}
}

type CastOperandTarget="object_index"|"vm_function"|"object_index_to_function";

type BoxImpl=
	RawBoxes|
	NumberBox|
	StringBoxImpl|
	// function result
	CSSStyleSheetInitBox|
	// array
	EmptyArrayBox|
	ArrayBoxImpl|
	InstructionTypeArrayBox|
	// constructor function
	CSSStyleSheetConstructorBox|
	// function
	FunctionBoxImpl|
	NewableFunctionBox|
	NewableInstancePackBox|
	AsyncFunctionBoxImpl|
	FunctionConstructorBoxImpl|
	// return type
	CSSStyleSheetPromiseBox|
	// global
	GlobalThisBox|
	WindowBox|
	DocumentBox|
	// object instances
	StackVMBox|
	NodeBox|
	CSSStyleSheetBoxImpl|
	MediaListBox|
	// StackVM
	InstructionTypeBox|
	// object
	NullBox|
	IndexBox|
	ObjectBox|
	// promise types
	VoidPromiseBox|
	PromiseBox|
	// No value (Void)
	VoidBoxImpl|
	RealVoidBox|
	// Box with stuff
	BoxWithPropertiesIsBoxImpl|
	// Generic boxes
	NewableInstancePackObjectBox|
	DomElementBox|
	never;


class InstructionCastImpl {
	readonly type="cast";
	debug=false;
	cast_to_type(_vm: StackVMImpl,obj: BoxImpl) {
		if(obj?.type==="custom_box") {
			throw new Error("TODO: custom_box");
		}
		if(obj?.type==="object_box") {
			console.warn('box does not contain a function',obj);
			throw new Error("TODO: object_box");
		}
		if(obj?.type) {
			console.warn('unk box',obj);
			throw new Error("Bad");
		}
		if(typeof obj!=="object"&&typeof obj!=="function") {
			throw new Error("Bad");
		}
		if(obj===null) {
			throw new Error("Bad");
		}
		console.warn('unk obj boxed into temporary_box<object_index>',obj);
	}
	run(vm: StackVMImpl,instruction: InstructionMapImpl[this["type"]]) {
		let obj=vm.stack.pop();
		if(!obj) throw new Error("Invalid");
		if(this.debug) {
			console.log('VM: cast',instruction[1],obj);
		}
		if(typeof obj!="object") throw new Error("Invalid");
		switch(instruction[1]) {
			case "object_index": break;
			default: throw new Error("Missing cast to "+instruction[1]);
		}
		this.cast_to_type(vm,obj);
	}
}

class InstructionJeImpl {
	readonly type="je";
	run(vm: StackVMImpl,instruction: InstructionMapImpl[this["type"]]) {
		let [,target]=instruction;
		if(typeof target!="number") throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Jump target is out of instructions range");
		}
		if(vm.flags.equal) {
			vm.instruction_pointer=target;
		}
	}
}

class InstructionJmpImpl {
	type: "jmp";
	constructor() {
		this.type="jmp";
	}
	run(vm: StackVMImpl,instruction: InstructionMapImpl[this["type"]]) {
		let [,target]=instruction;
		if(typeof target!="number") throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Jump target is out of instructions range");
		}
		vm.instruction_pointer=target;
	}
}

class InstructionModifyOpImpl {
	type: "modify_operand";
	constructor() {
		this.type="modify_operand";
	}
	run(vm: StackVMImpl,instruction: InstructionMapImpl[this["type"]]) {
		let [,target,offset]=instruction;
		if(typeof target!="number") throw new Error("Invalid");
		if(typeof offset!="number") throw new Error("Invalid");
		if(vm.is_in_instructions(target)) {
			throw new Error("RangeError: Destination is out of instructions range");
		}
		let instruction_1=vm.instructions[target];
		let instruction_modify: [string,...any[]]=instruction_1;
		let value: BoxImpl|null=null;
		if(vm instanceof StackVMImpl) {
			value=vm.pop();
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
		this.type="vm_push_ip";
	}
	run(vm: StackVMImpl,_ins: InstructionMapImpl[this["type"]]) {
		if(!vm.hasOwnProperty("push")) {
			throw new Error("push_pc requires a stack");
		} else if(vm instanceof StackVMImpl) {
			vm.stack.push({type: "number",value: vm.instruction_pointer});
		} else {
			console.info('TODO: add instanceof check to push_pc');
			throw new Error("Property missing or invalid");
		}
	}
}

class InstructionPushImpl {
	type: "push";
	constructor() {
		this.type="push";
	}
	run(vm: StackVMImpl,instruction: InstructionMapImpl[this["type"]]) {
		let instruction_: ["push",...BoxImpl[]]=instruction;
		let [,...rest]=instruction_;
		for(let i=0;i<rest.length;i++) {
			let item=rest[i];
			vm.stack.push(item);
		}
	}
}

class InstructionDupImpl {
	type: "dup";
	constructor() {
		this.type="dup";
	}
	run(vm: StackVMImpl,_ins: InstructionMapImpl[this["type"]]) {
		if(vm.stack.length===0) throw new Error("stack underflow");
		let res=vm.stack.at(-1);
		if(!res) throw new Error("bad");
		vm.stack.push(res);
	}
}

class NumberBoxImpl {
	readonly type="number";
	value: number;
	constructor(value: number) {
		this.value=value;
	}
}

class RawBoxImpl<T> {
	readonly type="raw_box";
	value=null;
	raw_value: T;
	type_symbol: symbol;
	constructor(value: T,symbol_: symbol) {
		this.raw_value=value;
		this.type_symbol=symbol_;
	}
}

class InstructionGetImpl {
	type: "get";
	constructor() {
		this.type="get";
	}
	array_box_handle_num(value_box: EmptyArrayBox|ArrayBoxImpl|InstructionTypeArrayBox,key: number,vm: StackVMImpl) {
		switch(value_box.item_type) {
			case "Box": {
				let res=value_box.value[key];
				vm.push(res);
			} break;
			case 'instruction_type[]': {
				let res=value_box.value[key];
				vm.push(new InstructionTypeBox(res));
			} break;
			case "none": {
				let res=value_box.value[key];
				let _n: never=res;
				_n;
				vm.push(new VoidBoxImpl());
			}
		}
	}
	on_get(vm: StackVMImpl,value_box: BoxImpl,key: string|number) {
		switch(value_box.type) {
			case "array_box": {
				if(typeof key==="number") {
					this.array_box_handle_num(value_box,key,vm);
				} else {
					let key_alt=parseInt(key,10);
					if(Number.isNaN(key_alt)) throw new Error("Failed to parse int");
					this.array_box_handle_num(value_box,key_alt,vm);
				}
			} break;
			case "constructor_box": {
				let return_value: {value: BoxImpl;}|null=null;
				switch(typeof key) {
					case "string": {
						switch(value_box.instance_type) {
							case "CSSStyleSheet": {
								if(typeof key!="string") throw new Error("Bad");
								value_box.on_get(vm,key);
							} break;
							case "Function": {
								value_box.on_get(vm,key);
							} break;
							case "unknown": {
								if(typeof key!="string") throw new Error("Bad");
								value_box.on_get(vm,key);
							} break;
						}
					}
				}
				if(return_value===null) {
					throw new Error("TODO");
				}
				vm.push(return_value);
			} break;
			default: console.log('on_get no handler',value_box.type);
		}
	}
	run(vm: StackVMImpl,_ins: InstructionMapImpl[this["type"]]) {
		let get_key=vm.pop();
		let value_box=vm.pop();
		if(get_key.type!="string") throw new Error("Invalid");
		this.on_get(vm,value_box,get_key.value);
	}
}

class InstructionHaltImpl {
	readonly type="halt";
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		vm.halt();
	}
}

class InstructionReturnImpl {
	readonly type="return";
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		if(vm.stack.length>0) {
			vm.return_value=vm.stack.pop()!;
		} else {
			throw new Error("Stack underflow on return");
		}
	}
}

class InstructionBreakpointImpl {
	readonly type="breakpoint";
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		console.log(vm.stack);
		trigger_debug_breakpoint();
	}
}

class InstructionPushVMObjImpl {
	readonly type="vm_push_self";
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		vm.stack.push(new StackVMBoxImpl(vm));
	}
}

class InstructionPushWindowObjectImpl {
	readonly type="push_window_object";
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		vm.stack.push(new WindowBoxImpl(window));
	}
}

class InstructionPeekImpl {
	readonly type="peek";
	debug=false;
	run(vm: StackVMImpl,ins: InstructionMapImpl[this["type"]]) {
		let [,distance]=ins;
		let base_ptr=vm.base_ptr;
		if(base_ptr===null) base_ptr=0;
		if(typeof vm.frame_size!=="number") {
			console.log("vm",vm);
			throw new Error("Require frame size");
		}
		let offset=base_ptr-distance-vm.frame_size-1;
		let at=vm.stack[offset];
		vm.stack.push(at);
		if(this.debug) console.log('VM: peek',ins,"value",at,"index",offset,vm.stack.length-offset);
	}
}

class InstructionAppendImpl {
	readonly type="append";
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		if(vm.stack.length<=0) {
			throw new Error('stack underflow');
		}
		let target=vm.stack.pop();
		if(vm.stack.length<=0) {
			throw new Error('stack underflow');
		}
		let append_obj=vm.stack.pop();
		if(typeof append_obj!="object") throw new Error("Element to append not object");
		if(typeof target!="object") {
			console.log(target,append_obj,vm.stack.slice());
			throw new Error("Element target not object");
		}
		if(append_obj===null) throw new Error("Bad");
		if(target===null) throw new Error("Bad");
		/* if(append_obj.type==="instance_box") throw new Error("Bad");
		if(!(append_obj.type==="instance_box"&&append_obj.instance_type==="Node")) throw new Error("Bad");
		if(target.type==="instance_box") throw new Error("Bad");
		if(!(target.type==="instance_box"&&target.instance_type==="Node")) throw new Error("Bad");
		target.value.appendChild(append_obj.value); */
		throw new Error("TODO");
	}
}

class InstructionPushArgsImpl {
	readonly type="vm_push_args";
	run(_vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		throw new Error("Instruction not supported");
	}
}

class InstructionDropImpl {
	readonly type="drop";
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		vm.stack.pop();
	}
}

class InstructionVMReturnImpl {
	readonly type="vm_return";
	debug=false;
	run(vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {
		let start_stack=vm.stack.slice();
		if(vm.base_ptr!=vm.stack.length) {
			console.log('TODO: support returning values');
			vm.stack.length=vm.base_ptr;
		}
		let ip=vm.stack.pop();
		let bp=vm.stack.pop();
		if(typeof ip!="number") throw new Error("Invalid stack frame");
		if(typeof bp!="number") throw new Error("Invalid stack frame");
		vm.instruction_pointer=ip;
		vm.base_ptr=bp;
		if(this.debug) console.log('vm return',vm.base_ptr,start_stack,vm.stack.slice());
	}
}

class InstructionVMCallImpl {
	readonly type="vm_call";
	run(vm: StackVMImpl,ins: InstructionMapImpl[this["type"]]) {
		let prev_base=vm.base_ptr;
		vm.stack.push({type: "number",value: vm.base_ptr});
		vm.stack.push({type: "number",value: vm.instruction_pointer});
		vm.base_ptr=vm.stack.length;
		vm.jump_instruction_pointer=ins[1];
		console.log('vm vm_call',ins[1],"stk",vm.base_ptr,prev_base,vm.stack.slice());
	}
}

class InstructionNopImpl {
	readonly type="nop";
	run(_vm: StackVMImpl,_a: InstructionMapImpl[this["type"]]) {}
}

class InstructionBlockTraceImpl {
	readonly type="vm_block_trace";
	run(_vm: StackVMImpl,_i: InstructionMapImpl[this["type"]]) {}
}

const InstructionNames=[
	"append",
	"breakpoint",
	"call",
	"cast",
	"construct",
	"drop",
	"dup",
	"get",
	"halt",
	"je",
	"jmp",
	"modify_operand",
	"nop",
	"peek",
	"push_window_object",
	"push",
	"return",
	"vm_block_trace",
	"vm_call",
	"vm_push_args",
	"vm_push_ip",
	"vm_push_self",
	"vm_return",
] as const;

const instruction_class_map={
	"append": InstructionAppendImpl,
	"breakpoint": InstructionBreakpointImpl,
	"call": InstructionCallImpl,
	"cast": InstructionCastImpl,
	"construct": InstructionConstructImpl,
	"drop": InstructionDropImpl,
	"dup": InstructionDupImpl,
	"get": InstructionGetImpl,
	"halt": InstructionHaltImpl,
	"je": InstructionJeImpl,
	"jmp": InstructionJmpImpl,
	"modify_operand": InstructionModifyOpImpl,
	"nop": InstructionNopImpl,
	"peek": InstructionPeekImpl,
	"push_window_object": InstructionPushWindowObjectImpl,
	"push": InstructionPushImpl,
	"return": InstructionReturnImpl,
	"vm_block_trace": InstructionBlockTraceImpl,
	"vm_call": InstructionVMCallImpl,
	"vm_push_args": InstructionPushArgsImpl,
	"vm_push_ip": InstructionVMPushIPImpl,
	"vm_push_self": InstructionPushVMObjImpl,
	"vm_return": InstructionVMReturnImpl,
};

class StackVMFlags {
	equal: boolean;
	constructor() {
		this.equal=false;
	}
}

class StackVMImpl implements AbstractVM {
	return_value: BoxImpl;
	jump_instruction_pointer: number|null;
	base_ptr: number;
	stack: BoxImpl[];
	instructions: InstructionTypeImpl[];
	instruction_pointer: number;
	running: boolean;
	flags: any;
	frame_size: any;
	instruction_map_obj: {
		[U in keyof typeof instruction_class_map]: InstanceType<typeof instruction_class_map[U]>;
	};
	constructor(instructions: InstructionTypeImpl[]) {
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.running=false;
		this.stack=[];
		this.return_value=new VoidBoxImpl();
		this.jump_instruction_pointer=null;
		this.base_ptr=0;
		this.frame_size=2;
		this.flags=new StackVMFlags;
		this.instruction_map_obj=this.create_instruction_map(instruction_class_map);
	}
	create_instruction_map(instruction_desc_arr: typeof instruction_class_map) {
		let obj: {
			[U in keyof typeof instruction_class_map]?: InstanceType<typeof instruction_class_map[keyof typeof instruction_class_map]>;
		}={};
		for(let i of InstructionNames) {
			obj[i]=new instruction_desc_arr[i];
		}
		return obj as {
			[U in keyof typeof instruction_class_map]: InstanceType<typeof instruction_class_map[U]>;
		};
	}
	push(value: BoxImpl) {
		this.stack.push(value);
	}
	pop() {
		let value=this.stack.pop();
		if(!value) throw new Error("Stack underflow");
		return value;
	}
	peek_at(distance: number) {
		return this.stack.at(-1-distance);
	}
	pop_arg_count(operand_number_of_arguments: number) {
		let arguments_arr: BoxImpl[]=[];
		let arg_count=operand_number_of_arguments;
		for(let i=0;i<arg_count;i++) {
			if(this.stack.length<=0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			let top=this.stack.pop();
			if(!top) throw new Error('stack underflow in pop_arg_count');
			arguments_arr.unshift(top);
		}
		return arguments_arr;
	}
	reset() {
		this.running=false;
		this.instruction_pointer=0;
		this.jump_instruction_pointer=null;
		this.base_ptr=0;
		this.return_value=new VoidBoxImpl();
		this.stack.length=0;
	}
	is_in_instructions(value: number) {
		return value>=0&&value<this.instructions.length;
	}
	halt() {
		this.running=false;
	}
	execute_instruction(instruction: InstructionTypeImpl) {
		switch(instruction[0]) {
			case "append": this.instruction_map_obj[instruction[0]].run(this,instruction); return;
			case "breakpoint": this.instruction_map_obj[instruction[0]].run(this,instruction); return;
			case "call": this.instruction_map_obj[instruction[0]].run(this,instruction); return;
		}
		switch(instruction[0]) {case "cast": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "construct": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "dom_create_element": throw 1;}
		switch(instruction[0]) {case "dom_create_element_with_props": throw 1;}
		switch(instruction[0]) {case "dom_exec": throw 1;}
		switch(instruction[0]) {case "dom_get": throw 1;}
		switch(instruction[0]) {case "dom_new": throw 1;}
		switch(instruction[0]) {case "dom_peek": throw 1;}
		switch(instruction[0]) {case "drop": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "dup": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "get": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "halt": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "je": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "jmp": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "modify_operand": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "nop": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "peek": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "push": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "push_window_object": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "return": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "vm_block_trace": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "vm_call": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "vm_push_args": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "vm_push_ip": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "vm_push_self": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
		switch(instruction[0]) {case "vm_return": this.instruction_map_obj[instruction[0]].run(this,instruction); return;}
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
			console.log("stack",this.stack);
			console.assert(false,"stack length is not zero, unhandled data on stack");
		}
		return this.return_value;
	}
}
class EventHandlerVMDispatch extends StackVMImpl {
	target_obj: any;
	args_arr: BoxImpl[]|null;
	constructor(instructions: InstructionTypeImpl[],target_obj: any) {
		super(instructions);
		this.target_obj=target_obj;
		this.args_arr=null;
	}
	override run(...args_arr: BoxImpl[]) {
		this.args_arr=args_arr;
		return super.run();
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
		if(typeof cur_item=="string") {
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
			case "o":
				return format_list.shift();
			default:
				console.assert(false,"Assertion failed: %s",'unsupported format spec %'+format_type);
		}
	}
	static parse_current_instruction(cur: any[],format_list: any[]) {
		let arg_loc=1;
		let arg=cur[arg_loc];
		while(arg) {
			if(arg.slice(0,3)==="int") this.parse_int_arg(cur,arg_loc);
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
		const parser_max_match_iter=300;
		let parts: string[]|null;
		let arr: string[][]=[];
		let i=0;
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
	static verify_instruction(instruction: string[]): InstructionTypeImpl {
		let num_to_parse=instruction.length;
		let ret: InstructionTypeImpl|null=null;
		switch(instruction[0]) {
			case "push": {
				num_to_parse=0;
				const [,...push_operands]=instruction;
				ret=[instruction[0],...push_operands.map(e => new StringBoxImpl(e))];
			} break;
			case "call"/*1 argument*/: {
				if(typeof instruction[1]==="number"&&Number.isFinite(instruction[1])) {
					num_to_parse-=2;
					ret=[instruction[0],instruction[1]];
				} else {
					console.info("Operand is",instruction[1]);
					throw new Error("Invalid operand");
				}
			} break;
			case "cast": {
				let m_arg=instruction[1];
				switch(m_arg) {
					case "object_index":
					case "vm_function":
						num_to_parse-=2;
						ret=[instruction[0],m_arg];
				}
				if(num_to_parse===0) break;
				throw new Error("Assertion failed: cast operand `"+m_arg+"` is invalid");
			}
			case "drop":
			case "dup":
			case "get":
			case "return":
			case "halt":
			case "vm_push_args":
			case "vm_push_self":
			case "push_window_object":
			case "breakpoint":
			case "vm_return": {
				num_to_parse--;
				let v_2=instruction[0];
				let v_1: InstructionTypeImpl[0]=v_2;
				let val: InstructionTypeImpl=[v_1];
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
	static verify_raw_instructions(raw_instructions: string[][]): InstructionTypeImpl[] {
		const instructions: InstructionTypeImpl[]=[];
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
				let vv: Document["write"]=any_var;
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
		throw new Error("TODO");
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
			let state_item=this.state_map.get(name)+1;
			this.state_map.set(name,state_item);
			return state_item;
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
	compress_result_state_dual(arg0: CompressDual): DualR_1 {
		return this.compress_result_dual(arg0.arr,arg0.ret);
	}
	compress_result_dual(src: AltPair<string,number>[],dst: AnyOrRepeat2_1<string,number>[]): DualR_1 {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst */
	did_compress<T,U>(src: T[],dst: U[]) {
		return dst.length<src.length;
	}
	/** @template T @arg {T[]} src @arg {T[]} dst */
	did_decompress<T>(src: T[],dst: T[]) {
		return dst.length>src.length;
	}
	compress_result_state<T,U>(state: CompressStateBase<T,U>) {
		return this.compress_result(state.arr,state.ret);
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst @returns {[true, U[]] | [false, T[]]} */
	compress_result<T,U>(src: T[],dst: U[]): [true,U[]]|[false,T[]] {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[res: boolean,dst: string[]]} */
	decompress_result(src: string[],dst: string[]): [res: boolean,dst: string[]] {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst];
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
		let ret: string[]=[];
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
		let ret: string[]=[];
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

declare global {
	interface Window {
		MulCompression: typeof MulCompression;
	}
}

window.MulCompression=MulCompression;
abstract class AbstractFire {
	abstract fire(): void;
};
class TimeoutTarget<T> implements AbstractFire {
	m_once: boolean;
	m_obj: T;
	m_callback: (this: T) => void;
	constructor(obj: T,callback: TimeoutTarget<T>["m_callback"]) {
		this.m_once=true;
		this.m_obj=obj;
		this.m_callback=callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
class IntervalTarget<T> implements AbstractFire {
	m_once: boolean;
	m_obj: T;
	m_callback: (this: T) => void;
	constructor(obj: T,callback: IntervalTarget<T>["m_callback"]) {
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
	override wait() {
		return super.wait();
	}
}
class BaseNode {
	m_children: BaseNode[];
	m_parent: BaseNode|null;
	constructor() {
		this.m_children=[];
		this.m_parent=null;
	}
	run() {}
	set_parent(parent: BaseNode|null) {
		this.m_parent=parent;
	}
	append_child(record: BaseNode) {
		record.set_parent(this);
		this.m_children.push(record);
	}
	remove_child(record: BaseNode) {
		let index=this.m_children.indexOf(record);
		if(index>-1) {
			this.m_children.splice(index,1);
			record.set_parent(null);
		}
	}
	destroy() {
		if(this.m_parent) this.m_parent.remove_child(this);
		let item=this.m_children.at(-1);
		if(!item) return;
		do {
			console.info('timer destroy',item);
			item.destroy();
			item=this.m_children.at(-1);
		} while(item);
	}
}
class TimeoutIdNode extends BaseNode {
	m_id: ReturnType<typeof setTimeout>;
	constructor(id: ReturnType<typeof setTimeout>) {
		super();
		this.m_id=id;
	}
	override destroy() {
		super.destroy();
		if(this.m_id!==null) clearTimeout(this.m_id);
	}
}
class IntervalIdNode extends BaseNode {
	m_id: ReturnType<typeof setTimeout>;
	constructor(id: ReturnType<typeof setTimeout>) {
		super();
		this.m_id=id;
	}
	override destroy() {
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
class TimeoutNode extends BaseNode {
	m_timeout: number;
	m_id: ReturnType<typeof setTimeout>|null;
	m_target: AbstractFire|null;
	constructor(timeout=0) {
		super();
		this.m_timeout=timeout;
		this.m_id=null;
		this.m_target=null;
	}
	timeout() {
		return this.m_timeout;
	}
	set() {
		this.m_id=setTimeout(this.run.bind(this),this.m_timeout);
	}
	start(target: AbstractFire|null) {
		if(!target) throw new Error("No target");
		this.m_target=target;
		this.set();
	}
	override run() {
		if(this.m_target) this.m_target.fire();
		this.m_id=null;
		this.destroy();
	}
	override destroy() {
		if(this.m_id!==null) clearTimeout(this.m_id);
		super.destroy();
	}
}
class IntervalNode extends BaseNode {
	m_target_fn: CallableFunction;
	m_timeout: number;
	m_id: ReturnType<typeof setTimeout>|null;
	m_target: AbstractFire|null;
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
	start(target: AbstractFire|null=null) {
		if(target) {
			this.m_target=target;
		} else {
			this.m_target=new IntervalTargetFn(this.m_target_fn,this.m_timeout);
		}
		this.set();
	}
	override destroy() {
		if(this.m_id!==null) clearInterval(this.m_id);
		super.destroy();
	}
}

interface AsyncFire {
	wait(): Promise<any>;
	fire(): void;
	destroy(): void;
}

class AsyncTimeoutNode extends BaseNode {
	m_timeout: number;
	m_id: ReturnType<typeof setTimeout>|null;
	m_target: AsyncFire|null;
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
	start(target: AsyncFire|null) {
		if(!target) throw new Error("No target");
		this.m_target=target;
		this.set();
	}
	async start_async(target: AsyncFire) {
		if(!target) throw new Error("unable to start_async without anything to wait for");
		log_if(LOG_LEVEL_INFO,"start_async");
		this.m_target=target;
		this.set();
		let promise=this.m_target.wait();
		log_if(LOG_LEVEL_INFO,"p",promise);
		await promise;
	}
	set() {
		log_if(LOG_LEVEL_INFO,"set",this);
		this.m_id=setTimeout(this.run.bind(this),this.m_timeout);
	}
	override run() {
		log_if(LOG_LEVEL_INFO,"run",this);
		if(this.m_target) this.m_target.fire();
		this.m_id=null;
		this.destroy();
	}
	override destroy() {
		if(this.m_id!==null) clearTimeout(this.m_id);
		if(this.m_target) this.m_target.destroy();
		super.destroy();
	}
}
class IntervalIdNodeRef extends IntervalIdNode {
	destroy_callback: () => void;
	constructor(interval_id: ReturnType<typeof setTimeout>,destroy_cb: () => void) {
		super(interval_id);
		this.destroy_callback=destroy_cb;
	}
	override destroy() {
		this.destroy_callback();
		super.destroy();
	}
}
class AsyncNodeRoot extends BaseNode {
	constructor() {
		super();
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

// AutoBuyState
declare global {
	interface Window {
		atomepersecond: number;
		prestige: number;
	}
}

interface SpecType {
	name: string;
	desc: string;
	done: boolean;
	cost: number;
}

declare global {
	interface Window {
		timeplayed: number;
		secondinterval?: ReturnType<typeof window.setInterval>|undefined;
		doc: Document;
		rounding(v: number,x: any,y: any): string;
		totalAtome: number;
		atomsaccu: number;
		calcPres(): number;
		lightreset(): void;
		specialclick(that: any): void;
		__testing__: false;
		bonusAll(): void;
		allspec: SpecType[];
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
		let ratio_types=["10sec","1min","5min","30min","3hour"];
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
			if(ratio_types[i]==="1min") obj.set_history_size(7200);
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
		return this.avg.get_average("30min");
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
		const near_avg="30min";
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
		if(!not_ready) if(typeof window.prestige=="undefined") not_ready=true;
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
		let prev_hist=sessionStorage["history"];
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
		sessionStorage["history"]=`${json_tag}@${data_arr.join("|")}`;
		let time_played_data=sessionStorage["time_played_hist"];
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
		sessionStorage["time_played_hist"]=JSON.stringify(time_played_arr);
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

function int_parser(value: string): number {
	return parseInt(value,10);
}

class DataLoader {
	store: Storage;
	constructor(storage: Storage) {
		this.store=storage;
	}
	load_str_arr(key: string,def_value: string[]) {
		if(!this.store)
			return def_value;
		let data=this.store.getItem(key);
		if(data===null)
			return def_value;
		return data.split(",");
	}
	load_int_arr(key: string,def_value: number[],storage_data=this.store?.getItem(key)) {
		if(!storage_data)
			return def_value;
		return this.parse_int_arr(storage_data);
	}
	load_int_arr_cb(key: string,def_factory: () => number[],storage_data=this.store?.getItem(key)) {
		if(!storage_data)
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
		if(!no_wait) await this.next_timeout_async(this.parent.timeout_ms,"A");
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
	async next_timeout_async(timeout: number,char: string,silent=false) {
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

declare global {
	interface Window {
		mute(): void;
	}
}

function call_mute_fn() {
	window.mute();
}

declare global {
	interface HTMLDivElement {
		style: CSSStyleDeclaration;
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
		this.local_data_loader=new DataLoader(globalThis.localStorage);
		this.state=new AutoBuyState(this.root_node);
		this.debug=this.state.debug;
		this.compressor=new MulCompression;
		this.state_history_arr=this.local_data_loader.load_str_arr("auto_buy_history_str",["S"]);
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
		this.timeout_arr=this.local_data_loader.load_int_arr_cb("auto_buy_timeout_str",() => {
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
		if(!this.background_audio) throw new Error("Missing data");
		if(!(this.background_audio instanceof HTMLAudioElement)) throw new Error("Missing data");
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
					window.removeEventListener("click",this);
				},
				async run() {
					if(!t.background_audio) throw new Error("Bad");
					await t.background_audio.play();
				}
			};
			if(!this.use_event_vm) {
				window.addEventListener("click",event_handler);
			} else {
				let handler=new EventHandlerVMDispatch(instructions,this);
				window.addEventListener("click",handler);
			}
		} catch(e) {
			console.log('error when setting up EventHandlerVMDispatch',e);
		}
	}
	save_state_history_arr() {
		if(this.skip_save) return;
		localStorage["auto_buy_history_str"]=this.state_history_arr.join(",");
	}
	get_timeout_arr_data(forced_action: string) {
		if(forced_action=="RESET") return this.timeout_arr.map((e: number) => ~~(e/4)).join(",");
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
		let displaySheet=new CSSStyleSheet;
		displaySheet.replaceSync(css_display_style);
		document.adoptedStyleSheets=[...document.adoptedStyleSheets,displaySheet];
		let state_log=document.createElement("state_log");
		document.body.append(state_log);
		let history=document.createElement("div");
		history.textContent="?3";
		state_log.append(history);
		this.dom_map.set("history",history);
		let timeout_element=document.createElement("div");
		timeout_element.textContent="0";
		state_log.append(timeout_element);
		this.dom_map.set("timeout_element",timeout_element);
		let hours_played=document.createElement("div");
		hours_played.textContent="0.000 hours";
		state_log.append(hours_played);
		this.dom_map.set("hours_played",hours_played);
		let ratio=document.createElement("div");
		ratio.textContent="0.00%";
		state_log.append(ratio);
		this.dom_map.set("ratio",ratio);
		let ratio_change=document.createElement("div");
		ratio_change.textContent='0.000e+0';
		state_log.append(ratio_change);
		this.dom_map.set("ratio_change",ratio_change);
	}
	init_dom() {
		const font_size_px=22;
		let t=this;
		this.state_history_arr_max_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);
		let history=this.dom_map.get("history");
		if(history&&typeof history=="object") history.addEventListener("click",new EventHandlerDispatch(this,"history_element_click_handler"));
		let ratio=this.dom_map.get("ratio");
		if(ratio&&typeof ratio=="object") {
			ratio.addEventListener("click",function() {
				t.state.reset();
			});
		}
		let state_log=this.dom_map.get("state_log");
		if(state_log instanceof HTMLElement) state_log.style.fontSize=font_size_px+"px";
		window.addEventListener("unload",function() {
			t.save_state_history_arr();
			t.save_timeout_arr();
		});
	}
	global_init() {
		if(window.g_auto_buy) {
			window.g_auto_buy.destroy();
		}
		window.g_auto_buy=this as unknown as (Window["g_auto_buy"]);
	}
	destroy() {
		this.root_node.destroy();
	}
	update_timeout_element() {
		if(this.timeout_ms) {
			let element=this.dom_map.get("timeout_element");
			if(element instanceof HTMLElement) {
				element.innerText=this.get_millis_as_pretty_str(this.round(this.timeout_ms),0);
			}
		}
	}
	do_zero_pad(value: string|number,pad_char: string,char_num: number) {
		let string;
		if(typeof value==="number") {
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
		time_arr[3]=this.do_zero_pad(float_milliseconds.toFixed(milli_acc),"0",milli_len);
		timeout_milli-=float_milliseconds;
		timeout_milli/=1000;
		let int_seconds=timeout_milli%60;
		time_arr[2]=this.do_zero_pad(int_seconds,"0",2);
		timeout_milli-=int_seconds;
		timeout_milli/=60;
		let int_minutes=timeout_milli%60;
		time_arr[1]=this.do_zero_pad(int_minutes,"0",2);
		timeout_milli-=int_minutes;
		timeout_milli/=60;
		let int_hours=timeout_milli;
		time_arr[0]=this.do_zero_pad(int_hours,"0",2);
		int_hours===0&&(time_arr.shift(),int_minutes===0&&(time_arr.shift(),int_seconds===0&&time_arr.shift()));
		switch(time_arr.length) {
			case 1:
				return time_arr[0]+"ms";
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
		time_arr[0]=this.do_zero_pad(int_hours,"0",2);
		let float_minutes=(hours_num-int_hours)*60;
		let int_minutes=~~float_minutes;
		time_arr[1]=this.do_zero_pad(int_minutes,"0",2);
		let float_seconds=(float_minutes-int_minutes)*60;
		let int_seconds=~~float_seconds;
		time_arr[2]=this.do_zero_pad(int_seconds,"0",2);
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
					time_arr[0]=this.do_zero_pad(int_hours,"0",2);
					console.log('sec+ min+ hour+');
				} else {
					console.log('sec+ min+');
				}
				time_arr[1]=this.do_zero_pad(int_minutes,"0",2);
			} else {
				console.log('sec+');
			}
			time_arr[2]=this.do_zero_pad(int_seconds,"0",2);
		}
		time_arr[3]=this.do_zero_pad(int_milliseconds,"0",3);
		int_hours===0&&(time_arr.shift(),int_minutes===0&&(time_arr.shift(),int_seconds===0&&time_arr.shift()));
		switch(time_arr.length) {
			case 1:
				return time_arr[0]+"ms";
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
		const hours_played_e=this.dom_map.get("hours_played");
		if(hours_played_e instanceof HTMLElement) hours_played_e.innerText=time_played_str;
		this.dom_map.set("time_played_str",time_played_str);
	}
	update_ratio_element() {
		const ratio=this.dom_map.get("ratio");
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
		const ratio_change=this.dom_map.get("ratio_change");
		if(ratio_change&&ratio_change instanceof HTMLElement) ratio_change.innerText=char_value+ratio_diff.toExponential(3);
	}
	update_history_element() {
		let history=this.dom_map.get("history");
		if(history&&history instanceof HTMLElement) {
			let sample_len=this.state_history_arr_max_len;
			if(!sample_len) return;
			let end_sample=array_sample_end(this.state_history_arr,sample_len).join(" ");
			history.innerText=end_sample;
		}
	}
	next_update() {
		if(this.flags.has("do_reset_dom")) {
			this.flags.delete("do_reset_dom");
			return;
		}
		this.set_update_timeout();
	}
	set_update_timeout() {
		this.next_timeout(this.update,125,"update",true);
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
		this.next_timeout(this.init_impl,200,"init",true);
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
			let atomsaccu_e=doc.getElementById("atomsaccu");
			if(atomsaccu_e) atomsaccu_e.innerHTML=rounding(window.atomsaccu,false,0);
			let timeplayed_e=doc.getElementById("timeplayed");
			if(timeplayed_e) timeplayed_e.innerHTML=(Math.round(timeplayed/30)/60).toFixed(2)+" hours";
			let presnbr_e=doc.getElementById("presnbr");
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
		this.original_map.set("lightreset",window.lightreset);
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
			console.log("err",e);
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
		log_if(LOG_LEVEL_INFO,"inc",this.timeout_ms,value-this.timeout_ms);
		this.timeout_arr.push(value);
	}
	update_timeout_dec(change: number) {
		if(window.__testing__) {
			return;
		}
		if(!this.timeout_ms) throw new Error("Invalid");
		let value=this.round(this.timeout_ms-change);
		if(value<25) value=25;
		log_if(LOG_LEVEL_INFO,"dec",this.timeout_ms,this.timeout_ms-value);
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
		let stack_trace: {stack: string;}={stack: "Error\n    at <anonymous>"};
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
	[labeled_sym("next_timeout_async")](timeout: number,char: string) {
		console.log("next_timeout_async",char,timeout);
		let err=new Error;
		this.next_timeout_async_err_log('next_timeout_async stk',err);
	}
	timeout_ms=50;
	next_timeout(trg_fn: () => void,timeout: number,char: string,silent=false) {
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
		this.next_timeout(this.game_reset_step_1,this.round(this.timeout_ms/3),"1R");
		this.on_repeat_r();
	}
	do_audio_mute_toggle() {
		if(!AudioMuted) {
			if(this.background_audio) {
				this.background_audio.muted=!this.background_audio.muted;
			}
			call_mute_fn();
		}
	}
	game_reset_step_1() {
		this.do_audio_mute_toggle();
		// 60*5*1000
		this.next_timeout(this.game_reset_step_2,15*1000,"2R");
	}
	game_reset_step_2() {
		this.do_audio_mute_toggle();
		// 60*5*1000
		this.next_timeout(this.game_reset_finish,15*1000,"3R");
	}
	game_reset_finish() {
		this.update_hours_played();
		let str=this.dom_map.get("time_played_str");
		if(typeof str=="string") {
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
		this.next_timeout(this.on_repeat_r,1*1000,"r");
	}
}
declare global {
	interface Window {
		arUnit: any[];
		Get_Unit_Type(v: any): any;
		getUnitPromoCost(v: any): number;
		Find_ToNext(v: number): number;
		_targets_achi: any[];
		totalAchi(): number;
		_targets: any[];
		mainCalc(v: any): void;
		tonext(v: number): void;
	}
}
function do_auto_unit_promote() {
	var out=[],maxed=[];
	for(var k=0;k<window.arUnit.length;k++) {
		var afford=false;
		if(window.arUnit[k][16]==true||k==0) {
			var type=window.Get_Unit_Type(k);
			var tmp=window.getUnitPromoCost(k);
			var cost=tmp;
			var next=window.Find_ToNext(k);
			if(next<0) {maxed[k]=true;}
			for(var i=1;i<=100;i++) {
				if(window.totalAtome>=cost) {
					tmp=tmp+(tmp*window.arUnit[k][3])/100;
					var tar=(window.arUnit[k][4]*1)+i;
					var a=window._targets.indexOf(tar);
					var reduction=1;
					if(a>-1&&tar<=1000) {
						var b=true;
						for(var k2 in type[2]) {
							var v2=type[2][k2];
							if(v2!=k&&window.arUnit[v2][4]<tar) {
								b=false;
							}
						}
						if(b) {
							var c=window._targets_achi.indexOf(window.totalAchi()+1);
							if(c>-1) {
								reduction*=(1-((c+1)*0.01));
							}
							reduction*=1-((a+1)*0.01);
						}
					}
					tmp*=reduction;
					cost+=tmp;
				} else {
					break;
				}
				if(i==next||(maxed[k]&&i==100)) {
					afford=true;
				}
			}
			if(afford) {
				out[k]=true;
			} else {
				out[k]=false;
			}
		}
	}
	let res=out.lastIndexOf(true);
	if(res<0)
		return;
	if(maxed[res]) {
		for(var y=0;y<100;y++) {
			window.mainCalc(res);
		}
	} else {
		window.tonext(res);
	}
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
	window.addEventListener("unload",function() {
		window.g_auto_buy.skip_save=false;
		localStorage["auto_buy_timeout_str"]="300,300,300,300";
		localStorage["long_wait"]=12000;
	});
	let original=window.g_auto_buy.original_map.get("lightreset");
	if(!original) {
		alert('unable to light reset game');
		throw new Error("Missing original lightreset");
	}
	original();
}
declare global {
	interface Window {
		specialsbought: number;
		atomsinvest: number;
		calcDiff(v: number): number;
		noti: boolean;
		gritter: any;
		toTitleCase(v: string): string;
		plurials(v: string): string;
		arrayNames: string[];
		updateprogress(v: any): void;
		seeUnit(v: number): any;
		checkspec(): void;
		achiSpec(): void;
	}
}
function specialclick_inject(that: number) {
	if(window.allspec[that].done==undefined)
		window.allspec[that].done=false;
	if(window.allspec[that].cost<=window.totalAtome&&window.allspec[that].done==false) {
		let specialsbought_e=window.doc.getElementById("specialsbought");
		let atomsinvest_e=window.doc.getElementById("atomsinvest");
		if(!specialsbought_e||!atomsinvest_e)
			throw new Error("Invalid");
		specialsbought_e.innerText=window.rounding(++window.specialsbought,false,0);
		window.atomsinvest+=window.allspec[that].cost;
		atomsinvest_e.innerText=window.rounding(window.atomsinvest,false,0);
		window.allspec[that].done=true;
		window.totalAtome-=window.allspec[that].cost;
		var diff1=window.calcDiff(that);
		for(var a in window.arUnit[that][17])
			window.arUnit[that][17][a]*=100;
		window.arUnit[that][5]*=100;
		var spec_aps=0;
		if(window.arUnit[that][4]>0) {
			spec_aps=(window.calcDiff(that)-diff1);
			window.atomepersecond+=spec_aps;
		}
		if(window.noti)
			window.gritter('Power-up !',window.toTitleCase(window.plurials(window.arrayNames[that]))+" X100 APS",null,"+"+window.rounding(spec_aps,false,0)+" APS","");
		window.updateprogress(that);
		// @ts-ignore
		$('#spec'+that).remove();
		if(that<74) window.seeUnit(that+1);
		else window.seeUnit(that-1);
		window.seeUnit(that);
		window.checkspec();
		window.achiSpec();
	}
}
// @ts-ignore
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
	// @ts-ignore
	let jq: typeof $|undefined=window.$;
	if(!jq) return;
	if(typeof jq!="function") return;
	let res=jq("head");
	let r_proto=Object.getPrototypeOf(res);
	r_proto.lazyload=function(..._a: any[]) {};
	return jq;
}
function proxy_jquery() {
	let val=use_jquery();
	set_jq_proxy(val);
}
// @ts-ignore
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
} let seen_elements=new WeakSet;
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
function remove_bad_dom_script_element() {
	Array.prototype.forEach.call(document.querySelectorAll("script"),remove_html_nodes);
}

// on_game_data_set
declare global {
	interface Window {
		constelOff(): void;
	}
}

function on_game_data_set() {
	log_if(LOG_LEVEL_INFO,'game data init');
	remove_bad_dom_script_element();
	auto_buy_obj.pre_init();
	setTimeout(auto_buy_obj.init.bind(auto_buy_obj),300);
	window.constelOff();
}
declare global {
	interface Window {
		_SM_Data: unknown;
	}
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
	remove_bad_dom_script_element();
}
function dom_add_elm_filter(elm: HTMLScriptElement) {
	if(elm&&elm.nodeName==="SCRIPT") {
		if(!elm.src) {
			console.log(elm);
			return true;
		}
		if(elm.src&&new URL(elm.src).origin===location.origin) {
			remove_bad_dom_script_element();
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
	console.log("popstate",e.state,location.href);
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
declare global {
	interface Window {
		g_mut_observers: any[];
	}
}
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
interface IPageContent {
	request_content: string;
	cur: string;
}
declare global {
	interface Window {
		g_current_script_list?: any[];
		g_page_content: IPageContent;
	}
}
let real_st: typeof setTimeout;
let real_si: typeof setInterval;
let orig_aev: EventTarget["addEventListener"];
function make_load_promise(a: (reason?: any) => void) {
	window.addEventListener("load",function lis() {
		setTimeout(a);
		window.removeEventListener("load",lis);
	});
}
declare global {
	interface Window {
		g_do_load: ((promise_accept: (value: any) => void) => void)|undefined;
	}
}
function create_load_with_fetch_page() {
	return new Promise(function(a) {
		if(localStorage["justReset"]==="true") {
			return a(null);
		}
		window.g_do_load=do_load_fire_promise.bind(null,a);
		document.writeln(`<head></head><body><a href onclick="g_do_load()">load with fetch</a></body>`);
		reset_global_event_handlers();
		document.close();
	});
}
function pop_mut_observer() {
	let la=mut_observers.pop();
	if(!la) throw new Error("mut_observers underflow");
	la.disconnect();
}

let loaded_scripts_count: number;
let script_num: number;
function mutation_observe(mut_vec: string|any[],mut_observer: {disconnect: () => void;}) {
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
	if(document.body) log_data_vec.push("b",document.body.children.length);
	else log_data_vec.push("h",document.head.children.length);
	log_data_vec.push(document.querySelectorAll("script").length);
	loaded_scripts_count+=added_scripts.length;
	if(loaded_scripts_count>=script_num) {
		log_if(LOG_LEVEL_INFO,'observer script count',loaded_scripts_count,script_num);
		console.info('load observer ',...log_data_vec);
		reset_global_event_handlers();
		mut_observer.disconnect();
	}
}

interface GoogleAdList {
	op: any;
	push(v: number): void;
}

// do_fetch_load
declare global {
	interface Window {
		adsbygoogle: GoogleAdList;
		cint_arr: number[][];
		on_on_timers_moved_first: boolean;
	}
}

async function do_fetch_load() {
	reset_global_event_handlers();
	window.setTimeout=real_st;
	window.setInterval=real_si;
	EventTarget.prototype.addEventListener=orig_aev;
	await new Promise(make_load_promise);
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
	let do_create_fetch_page=false;
	if(do_create_fetch_page)
		await create_load_with_fetch_page();
	reset_global_event_handlers();
	history.pushState(hist_state,'',orig_url);
	const rb_html=await (await fetch(loc_url)).text();
	pop_mut_observer();
	set_jq_proxy(window.$);
	let arr: any[]=[];
	let any_cur: any=arr;
	window.adsbygoogle=any_cur;
	window.adsbygoogle.op=window.adsbygoogle.push;
	window.adsbygoogle.push=function(e) {
		let current_script_element=document.currentScript;
		let next_prev_sibling: Element|null=null;
		let next_sibling: Element|null=null;
		if(!current_script_element) return;
		window.g_current_script_list??=[];
		window.g_current_script_list.push(current_script_element);
		let prev_sibling=current_script_element.previousElementSibling;
		if(prev_sibling&&prev_sibling instanceof HTMLElement&&prev_sibling.dataset["adSlot"]) {
			let ad_slot_sibling=current_script_element.previousElementSibling;
			if(prev_sibling.previousElementSibling) next_prev_sibling=prev_sibling.previousElementSibling;
			if(current_script_element.nextElementSibling) next_sibling=current_script_element.nextElementSibling;
			console.log('cs nextElementSibling',next_sibling);
			if(ad_slot_sibling) ad_slot_sibling.remove();
			current_script_element.remove();
			while(next_prev_sibling&&next_prev_sibling instanceof HTMLScriptElement&&next_prev_sibling.src&&next_prev_sibling.src.includes("adsbygoogle")) {
				let ls_tmp=next_prev_sibling.previousElementSibling;
				next_prev_sibling.remove();
				next_prev_sibling=ls_tmp;
			}
		}
		window.adsbygoogle.op(e);
		remove_bad_dom_script_element();
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
	let json_rep_1=`"\x3Cscript>\\n  (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){\\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\\n  })(window,document,"script",'//www.google-analytics.com/analytics.js',"ga");\\n\\n  ga("create", 'UA-63134422-1', "auto");\\n  ga("send", "pageview");\\n\\n\x3C/script>"`;
	let rem_str_1=JSON.parse(json_rep_1);
	while(did_rep) {
		did_rep=false;
		//spell:disable-next-line
		rb_html_tmp=rb_html_tmp.replace("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",on_html_replace);
		if(did_rep) continue;
		rb_html_tmp=rb_html_tmp.replace(rem_str_1,on_html_replace);
	}
	script_num=[...rb_html_tmp.matchAll(/<\s*script.*?>/g)].length;
	loaded_scripts_count=0;
	console.log(rc);
	mut_observers.push(new LoadMutationObserver(document,mutation_observe));
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
		console.info("unload");
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
	document.addEventListener("DOMContentLoaded",function() {
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

function nop_timeout(_handler: TimerHandler,_timeout?: number|undefined,..._args: any[]): number {
	console.log('nop timeout');
	return -1;
}

function nop_timer(_handler: TimerHandler,_timeout?: number|undefined,..._args: any[]): number {
	console.log('nop timeout');
	return -1;
}

function no_aev(...v: any[]) {
	console.log("aev",v);
}
declare global {
	interface Window {
		document_write_list: DocumentWriteList;
	}
}
function create_document_write_list() {
	let document_write_list=new DocumentWriteList;
	document_write_list.attach_proxy(document);
	document_write_list.document_write_proxy;
	window.document_write_list=document_write_list;
	return document_write_list;
}

// rebuild_the_universe main
declare global {
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[];
		stop(): void;
	}
}

function main() {
	if(!globalThis.location) return;
	if(globalThis.location.pathname.match("test")) {
		return;
	}
	reset_global_event_handlers();
	enable_jquery_proxy_if_needed();
	document.addEventListener("onContentLoaded",remove_bad_dom_script_element);
	Node.prototype.insertBefore=new Proxy(Node.prototype.insertBefore,{
		apply(target,thisValue,parameters: [Node,Node]) {
			if(insert_before_enabled(...parameters)) {
				return Reflect.apply(target,thisValue,parameters);
			}
			return target;
		}
	});
	document.stop=function() {};
	real_st=setTimeout;
	real_si=setInterval;
	window.setTimeout=nop_timeout;
	window.setInterval=nop_timer;
	orig_aev=EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener=no_aev;
	let page_url=location.href;
	let non_proto_url=page_url_no_protocol();
	let document_write_list=create_document_write_list();
	fire_url_handler({
		page_url,
		non_proto_url,
		document_write_list,
	});
}

declare global {
	interface Window {
		g_log_if: typeof log_if;
	}
}

function init() {
	update_logger_vars();
	auto_buy_obj.global_init();
	window.g_log_if=log_if;
}

class URLHandlerState {
	non_proto_url: string="";
	page_url: string="";
	document_write_list=new DocumentWriteList;
}

function fire_url_handler(state: URLHandlerState) {
	if(state.non_proto_url=="//rebuildtheuniverse.com/mjz_version") {
		do_page_replace();
	} else if(state.non_proto_url=="//rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(state.page_url=="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(state.non_proto_url=="//rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(state.page_url==="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(state.page_url==="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=inject") {
		document.stop=function() {};
		on_dom_load();
		state.document_write_list.destroy();
	} else if(state.non_proto_url=="//rebuildtheuniverse.com/") {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		state.document_write_list.destroy();
	} else if(state.page_url==="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/") {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		state.document_write_list.destroy();
	} else {
		console.log('handle location pathname',location.pathname);
	}
}

init();
log_if(LOG_LEVEL_TRACE,'userscript main');
main();

export {
	main as rebuild_the_universe_main
};

