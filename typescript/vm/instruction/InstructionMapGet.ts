import {InstructionImplMap} from "./InstructionImplMap.ts"
import {InstructionMap} from "./InstructionMap.ts"

export type InstructionMapGet<T extends keyof InstructionImplMap&keyof InstructionMap>=[T,InstructionImplMap[T],InstructionMap[T]]
