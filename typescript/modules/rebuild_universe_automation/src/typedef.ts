import {DomInstructionType} from "vm/dom_instruction/DomInstructionType.js";
import {NewDesc} from "./NewDesc.js"

export type DomInstructionStack=(DomInstructionType[]|null)[]
export type DomExecDescription=DomInstructionType|NewDesc
