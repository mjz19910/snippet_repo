import {IBox} from "./box/IBox";

/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface IStackVM {
	push(value: IBox): void;
	pop(): IBox | undefined;
	pop_arg_count(q: number): IBox[];
	stack: IBox[];
}
