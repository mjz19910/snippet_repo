import {DomInstructionType} from "../../../vm/dom_instruction/DomInstructionType"
import {CreateDesc} from "../version_00_20/CreateDesc"
import {NewDesc} from "../version_00_20/NewDesc"

export type DomInstructionStack=(DomInstructionType[]|null)[]
export type DomExecDescription=DomInstructionType|CreateDesc|NewDesc
