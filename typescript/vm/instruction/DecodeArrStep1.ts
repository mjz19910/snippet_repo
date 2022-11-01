import {InstructionImplMap} from "./InstructionImplMap.js"
import {Decode} from "./Decode.js"


export type DecodeArrStep1<T extends (keyof InstructionImplMap)[]>=Decode<T[0]>
