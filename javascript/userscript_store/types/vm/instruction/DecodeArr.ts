import {InstructionImplMap} from "./InstructionImplMap"
import {DecodeArrStep1} from "./DecodeArrStep1"


export type DecodeArr<T>=T extends []? []:T extends (keyof InstructionImplMap)[]? T extends [infer X,...infer U]? X extends keyof InstructionImplMap? [DecodeArrStep1<[X]>,...DecodeArr<U>]:[]:[]:[]
