import {InstructionImplMap} from "./InstructionImplMap.js"


export type Decode<T extends keyof InstructionImplMap>=[T,InstructionImplMap[T]]
