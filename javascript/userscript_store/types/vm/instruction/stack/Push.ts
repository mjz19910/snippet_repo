import {Box} from "types/box/Box";
import {PushOpcode} from "../opcodes/PushOpcode";

export type Push = [PushOpcode, ...Box[]];
