import {AnyOrRepeatTS} from "./AnyOrRepeat";

export type AnyRepeat2TS<T,U>=["T",AnyOrRepeatTS<T>]|["U",AnyOrRepeatTS<U>];
