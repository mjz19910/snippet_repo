import {InstructionImplMap} from "./InstructionImplMap"
import {Decode} from "./Decode"


export type DecodeArrStep1<T extends (keyof InstructionImplMap)[]>=Decode<T[0]>
