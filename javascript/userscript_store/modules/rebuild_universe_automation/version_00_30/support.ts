import {Decode} from "types/vm/instruction/mod";
type AnyTypeOfResult = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
type __v_test_value = | 0;

type InstructionOpcodeList = [
	'append',
	'breakpoint',
	'call',
	'cast',
	'construct',
	'drop',
	'dup',
	'get',
	'halt',
	'je',
	'jmp',
	'modify_op',
	'nop',
	'peek',
	'push',
	'push_args',
	'push_global',
	'push_ip',
	'push_this',
	'return',
	'vm_call',
	'vm_return',
	'vm_block_trace',
];
type InstructionList = Decode<InstructionOpcodeList[number]>[];
export {} from "types/vm/instruction/mod";
export {Primitives} from "types/vm/Primitives";
export {
	PromiseBox,
	WindowBox,
	TemporaryBox,
	CSSStyleSheetBox,
} from "types/vm/box/mod.js";
export {
	InstructionList,
	AnyTypeOfResult,
	__v_test_value
};