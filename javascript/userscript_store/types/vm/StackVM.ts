/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/

import {Box} from "./vm/box/Box";

/* --- VM Value supporting interfaces ---
StackVM
*/
export interface StackVM {
	push(value: Box): void;
	pop(): Box | undefined;
	pop_arg_count(q: number): Box[];
	stack: Box[];
}
