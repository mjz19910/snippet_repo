import {CanUnpack} from "./CanUnpack";
export type TGetOr<T> = T extends CanUnpack<T, infer V> ? T[V] : never;
