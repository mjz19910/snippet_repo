import {InstructionImplMap} from "./InstructionImplMap"
import {InstructionMap} from "./InstructionMap"

export type InstructionMapGet<T extends keyof InstructionImplMap&keyof InstructionMap>=[T,InstructionImplMap[T],InstructionMap[T]]
