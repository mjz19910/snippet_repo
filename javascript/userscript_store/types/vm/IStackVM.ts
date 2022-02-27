import {Box} from "./box/Box";

/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface IStackVM {
	push(value: Box): void;
	pop(): Box | undefined;
	pop_arg_count(q: number): Box[];
	stack: Box[];
}
