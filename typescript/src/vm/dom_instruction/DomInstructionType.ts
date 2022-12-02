import {DomInstructionFilter} from "./DomInstructionFilter.js";
import {DomInstructionNullMarker} from "./DomInstructionNullMarker.js";
import {DomInstructionVMCallAt} from "./DomInstructionVMCallAt.js";
import {DomInstructionVMBlockTrace} from "./DomInstructionVMBlockTrace.js";
import {DomInstructionVMReturn} from "./DomInstructionVMReturn.js";
import {DomInstructionVMPushSelf} from "./DomInstructionVMPushSelf.js";
import {DomInstructionVMPushIP} from "./DomInstructionVMPushIP.js";
import {DomInstructionVMPushArgs} from "./DomInstructionVMPushArgs.js";
import {DomInstructionVMCall} from "./DomInstructionVMCall.js";
import {DomInstructionPush} from "./DomInstructionPush.js";
import {DomInstructionPeek} from "./DomInstructionPeek.js";
import {DomInstructionModOp} from "./DomInstructionModOp.js";
import {DomInstructionJmp} from "./DomInstructionJmp.js";
import {DomInstructionJe} from "./DomInstructionJe.js";
import {DomInstructionReturn} from "./DomInstructionReturn.js";
import {DomInstructionHalt} from "./DomInstructionHalt.js";
import {DomInstructionGet} from "./DomInstructionGet.js";
import {DomInstructionNop} from "./DomInstructionNop.js";
import {DomInstructionPushWindowObject} from "./DomInstructionPushGlobalObject.js";
import {DomInstructionDup} from "./DomInstructionDup.js";
import {DomInstructionDrop} from "./DomInstructionDrop.js";
import {DomInstructionConstruct} from "./DomInstructionConstruct.js";
import {DomInstructionCast} from "./DomInstructionCast.js";
import {DomInstructionCall} from "./DomInstructionCall.js";
import {DomInstructionBP} from "./DomInstructionBP.js";
import {DomInstructionAppend} from "./DomInstructionAppend.js";
import {DomInstructionCreateDivWithId} from "./DomInstructionCreateDivWithId.js";
import {DomInstructionCreateDiv} from "./DomInstructionCreateDiv.js";

export type DomInstructionType=
	DomInstructionAppend|
	DomInstructionBP|
	DomInstructionVMBlockTrace|
	DomInstructionVMCallAt|
	DomInstructionNullMarker|
	DomInstructionFilter|
	DomInstructionCall|
	DomInstructionCast|
	DomInstructionConstruct|
	DomInstructionJe|
	DomInstructionJmp|
	DomInstructionModOp|
	DomInstructionPeek|
	DomInstructionPush|
	DomInstructionVMCall|
	DomInstructionDup|
	DomInstructionDrop|
	DomInstructionPushWindowObject|
	DomInstructionNop|
	DomInstructionGet|
	DomInstructionHalt|
	DomInstructionReturn|
	DomInstructionVMPushArgs|
	DomInstructionVMPushIP|
	DomInstructionVMPushSelf|
	DomInstructionVMReturn|
	// DOM
	DomInstructionCreateDivWithId|
	DomInstructionCreateDiv;
