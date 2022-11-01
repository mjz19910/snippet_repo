import {Box} from "../../../box/Box.ts"
import {PushOpcode} from "../opcodes/PushOpcode.ts"

export type Push=[PushOpcode,...Box[]]
