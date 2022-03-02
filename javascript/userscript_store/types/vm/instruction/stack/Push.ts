import {Box} from "types/vm/box/Box";

export type PushOpcode='push';
export type Push = [PushOpcode, ...Box[]];
