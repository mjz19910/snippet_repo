import {StackVM} from "../vm/StackVM.js"


export interface InstructionImplObj<T,C_Ty,I_Type> {
	type: T
	get_class_type?: () => C_Ty|null
	run(vm: StackVM,_i: I_Type): void
}
