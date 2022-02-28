import {KT2} from "./KT2";
import {MapAllKeys} from "./MapAllKeys";

export type KT3<T> = T extends KT2<keyof MapAllKeys>[0] ? T extends keyof MapAllKeys ? MapAllKeys[T] : never : never;
