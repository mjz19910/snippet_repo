export type AnyOrRepeat2<T,U>=["T",AnyOrRepeat<T>]|["U",AnyOrRepeat<U>];
