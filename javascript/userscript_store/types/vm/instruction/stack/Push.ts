import {Box} from "types/vm/box/Box";
import {PushOpcode} from "../opcodes/PushOpcode";

export type Push = [PushOpcode, ...Box[]];
