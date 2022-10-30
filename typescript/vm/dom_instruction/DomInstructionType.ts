import {DomInstructionFilter} from "./DomInstructionFilter"
import {DomInstructionNullMarker} from "./DomInstructionNullMarker"
import {DomInstructionVMCallAt} from "./DomInstructionVMCallAt"
import {DomInstructionVMBlockTrace} from "./DomInstructionVMBlockTrace"
import {DomInstructionVMReturn} from "./DomInstructionVMReturn"
import {DomInstructionVMPushSelf} from "./DomInstructionVMPushSelf"
import {DomInstructionVMPushIP} from "./DomInstructionVMPushIP"
import {DomInstructionVMPushArgs} from "./DomInstructionVMPushArgs"
import {DomInstructionVMCall} from "./DomInstructionVMCall"
import {DomInstructionPush} from "./DomInstructionPush"
import {DomInstructionPeek} from "./DomInstructionPeek"
import {DomInstructionModOp} from "./DomInstructionModOp"
import {DomInstructionJmp} from "./DomInstructionJmp"
import {DomInstructionJe} from "./DomInstructionJe"
import {DomInstructionReturn} from "./DomInstructionReturn"
import {DomInstructionHalt} from "./DomInstructionHalt"
import {DomInstructionGet} from "./DomInstructionGet"
import {DomInstructionNop} from "./DomInstructionNop"
import {DomInstructionPushGlobalObject} from "./DomInstructionPushGlobalObject"
import {DomInstructionDup} from "./DomInstructionDup"
import {DomInstructionDrop} from "./DomInstructionDrop"
import {DomInstructionCons} from "./DomInstructionCons"
import {DomInstructionCast} from "./DomInstructionCast"
import {DomInstructionCall} from "./DomInstructionCall"
import {DomInstructionBP} from "./DomInstructionBP"
import {DomInstructionAppend} from "./DomInstructionAppend"

export type DomInstructionType=
	DomInstructionAppend|
	DomInstructionBP|
	DomInstructionVMBlockTrace|
	DomInstructionVMCallAt|
	DomInstructionNullMarker|
	DomInstructionFilter|
	DomInstructionCall|
	DomInstructionCast|
	DomInstructionCons|
	DomInstructionJe|
	DomInstructionJmp|
	DomInstructionModOp|
	DomInstructionPeek|
	DomInstructionPush|
	DomInstructionVMCall|
	DomInstructionDup|
	DomInstructionDrop|
	DomInstructionPushGlobalObject|
	DomInstructionNop|
	DomInstructionGet|
	DomInstructionHalt|
	DomInstructionReturn|
	DomInstructionVMPushArgs|
	DomInstructionVMPushIP|
	DomInstructionVMPushSelf|
	DomInstructionVMReturn
