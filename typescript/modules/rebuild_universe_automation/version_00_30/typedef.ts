import {InstructionType} from "../../../vm/instruction/InstructionType"
import {CreateDesc} from "../version_00_20/CreateDesc"
import {NewDesc} from "../version_00_20/NewDesc"

export type DomInstructionStack=((InstructionType|['vm_call_at', InstructionType])[]|null)[]
export type DomExecDescription=[number, ...InstructionType]|CreateDesc | NewDesc
