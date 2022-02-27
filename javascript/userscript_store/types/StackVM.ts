import {IBox} from "./vm/box/IBox";

/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface StackVM {
	push(value: IBox): void;
	pop(): IBox | undefined;
	pop_arg_count(q: number): IBox[];
	stack: IBox[];
}
