/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/

import {Box} from "../box/Box";

/* --- VM Value supporting interfaces ---
StackVM
*/
export interface StackVM {
	pop_arg_count(q: number): Box[];
	stack: Box[];
}
