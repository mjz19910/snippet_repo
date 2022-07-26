import {InstructionImplMap} from "./InstructionImplMap"


export type Decode<T extends keyof InstructionImplMap>=[T,InstructionImplMap[T]]
