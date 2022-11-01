import {DomInstructionType} from "../../../vm/dom_instruction/DomInstructionType.js"
import {CreateDesc} from "../version_00_20/CreateDesc.js"
import {NewDesc} from "../version_00_20/NewDesc.js"

export type DomInstructionStack=(DomInstructionType[]|null)[]
export type DomExecDescription=DomInstructionType|CreateDesc|NewDesc
