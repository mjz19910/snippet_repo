import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode";
import {CastOperand1} from "../operands/CastOperand1";

export type test_type_1=['vm_block_trace', 'begin', null];
type DomInstructionAppend=[number, "append"];
type DomInstructionBP = [number, "breakpoint"];
type DomInstruction1=[number, "call", number];
type DomInstruction2=[number, "cast", CastOperand1];
type DomInstruction3=[number, "construct", number];
type DomInstruction1Arg=[number, "drop"|"push_global_object"|"nop"|"append"|"breakpoint"|"dup"|"get"|"halt"|"return"];
type DomInstruction4=[number, "je", number]
type DomInstruction5=[number, "jmp", number]
type DomInstruction6=[number, "modify_operand", number, number]
type DomInstruction7=[number, "peek", number]
type DomInstruction8=[number, "push", ...Box[]];
type DomInstruction9=[number, "vm_call", number] | [number, "vm_push_args"] | [number, "vm_push_ip"] | [number, "vm_push_self"] | [number, "vm_return"];
type DomInstructionBlockTrace=[number, "vm_block_trace", "call" | "begin", DomInstructionTypePack | null];
type DomInstructionVMCallAt=[number, "vm_call_at", DomInstructionTaggedTypePack];
type DomInstructionNullMarker=[number, "marker", null];

export type DomInstructionType=DomInstructionAppend|
DomInstructionBP|
DomInstructionBlockTrace|
DomInstructionVMCallAt|
DomInstructionNullMarker|
DomInstruction1|
DomInstruction2|
DomInstruction3|
DomInstruction4|
DomInstruction5|
DomInstruction6|
DomInstruction7|
DomInstruction8|
DomInstruction9|
DomInstruction1Arg;

export type DomInstructionTypePack = [DomInstructionType];

export type DomInstructionTaggedTypePack=['dom', DomInstructionType] | ['vm', InstructionType];

// vm_block_trace
export type BlockTrace=[VMBlockTraceOpcode, 'begin' | 'call', null | DomInstructionTypePack]
|['vm_block_trace', 'block', number, number]|
['vm_block_trace', 'tagged', DomInstructionTaggedTypePack];
