import {Boxed} from "./Boxed";

/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface IStackVM {
	push(value: Boxed): void;
	pop(): Boxed | undefined;
	pop_arg_count(q: number): Boxed[];
	stack: Boxed[];
}
