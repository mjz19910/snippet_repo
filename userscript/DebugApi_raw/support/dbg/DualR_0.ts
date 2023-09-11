import {AltPair} from "./AltPair";
import {Repeat_0} from "./Repeat_0.js";

export type DualR_0=[true,AnyOrRepeat2_0<string,number>[]]|[false,AltPair<string,number>[]];
export type AnyOrRepeat2_0<T,U>=["T",AnyOrRepeat_0<T>]|["U",AnyOrRepeat_0<U>];
export type AnyOrRepeat_0<T>=T|Repeat_0<T>;
