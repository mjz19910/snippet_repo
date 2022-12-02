import {DomTaggedPack} from "./DomTaggedPack.js";
import {VMBlockTraceOperand} from "./VMBlockTraceOperand.js";
import {Box} from "../../box/Box.js";
import {CastOperandTarget} from "./CastOperandTarget.js";

export type DomInstructionMapImpl={
	append: [number,"append"];
	breakpoint: [number,"breakpoint"];
	call: [number,"call",number];
	cast: [number,"cast",CastOperandTarget];
	construct: [number,"construct",number];
	create_id: [number,"create_id","div",string];
	create: [number,"create","div",string,string];
	dom_filter: [number,"dom_filter",[4,any,any,any,any]];
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
	push: [number,"push",...Box[]];
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
