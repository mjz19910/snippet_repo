import { InstructionType } from "../vm/instruction/mod";
import { is_instruction_vm_block_trace } from "./is_instruction_vm_block_trace";

export function is_instruction_type(value: InstructionType): value is InstructionType {
	switch (value[0]) { case 'append': return value.length === 1; }
	switch (value[0]) { case 'breakpoint': return value.length === 1; }
	switch (value[0]) { case 'call': return value.length === 2; }
	switch (value[0]) { case 'cast': return value.length === 2; }
	switch (value[0]) { case 'construct': return value.length === 2; }
	switch (value[0]) { case 'drop': return value.length === 1; }
	switch (value[0]) { case 'dup': return value.length === 1; }
	switch (value[0]) { case 'get': return value.length === 1; }
	switch (value[0]) { case 'halt': return value.length === 1; }
	switch (value[0]) { case 'je': return value.length === 2; }
	switch (value[0]) { case 'jmp': return value.length === 2; }
	switch (value[0]) { case 'modify_operand': return value.length === 3; }
	switch (value[0]) { case 'nop': return value.length === 1; }
	switch (value[0]) { case 'peek': return value.length === 2; }
	switch (value[0]) { case 'push': return true; }
	switch (value[0]) { case 'push_window_object': return value.length === 1; }
	switch (value[0]) { case 'return': return value.length === 1; }
	switch (value[0]) { case 'vm_block_trace': return is_instruction_vm_block_trace(value); }
	switch (value[0]) { case 'vm_call': return true; }
	switch (value[0]) { case 'vm_push_args': return value.length === 1; }
	switch (value[0]) { case 'vm_push_ip': return value.length === 1; }
	switch (value[0]) { case 'vm_push_self': return value.length === 1; }
	switch (value[0]) { case 'vm_return': return value.length === 1; default: return false; }
}
