import {Box} from "../box/Box"

export interface StackVM {
	pop_arg_count(q: number): Box[]
	stack: Box[]
}
