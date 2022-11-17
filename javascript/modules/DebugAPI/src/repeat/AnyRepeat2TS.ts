import {AnyOrRepeatTS} from "./AnyOrRepeatTS";

export type AnyRepeat2TS<T,U>=["T",AnyOrRepeatTS<T>]|["U",AnyOrRepeatTS<U>];
