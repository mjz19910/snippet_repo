import {AnyOrRepeat} from "./AnyOrRepeat";

export type AnyRepeat2<T,U>=["T",AnyOrRepeat<T>]|["U",AnyOrRepeat<U>];
