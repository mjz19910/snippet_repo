import {KT3} from "./KT3";
import {MapAllKeys} from "./MapAllKeys";

type KT4<T> = T extends keyof MapAllKeys ? T extends KT3<keyof MapAllKeys> ? T : ['t', T] : ['a', T];
