import {Box} from "typescript/box/Box"
import {PushOpcode} from "../opcodes/PushOpcode"

export type Push=[PushOpcode,...Box[]]
