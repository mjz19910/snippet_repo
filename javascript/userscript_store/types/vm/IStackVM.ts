import {VMValue} from "./VMValue";

/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface IStackVM {
	push(value: VMValue): void;
	pop(): VMValue | undefined;
	pop_arg_count(q: number): VMValue[];
	stack: VMValue[];
}
