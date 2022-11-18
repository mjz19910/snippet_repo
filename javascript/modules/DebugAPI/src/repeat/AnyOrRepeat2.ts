import {AnyOrRepeat} from "./AnyOrRepeat";

export type AnyRepeat2TS<T,U>=["T",AnyOrRepeat<T>]|["U",AnyOrRepeat<U>];
