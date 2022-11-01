import {InstructionImplMap} from "./InstructionImplMap.js"
import {InstructionMap} from "./InstructionMap.js"

export type InstructionMapGet<T extends keyof InstructionImplMap&keyof InstructionMap>=[T,InstructionImplMap[T],InstructionMap[T]]
