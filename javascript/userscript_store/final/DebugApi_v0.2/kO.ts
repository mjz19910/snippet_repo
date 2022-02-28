import {MapAllKeys} from "./MapAllKeys";

type kO<T> = T extends number ? keyof MapAllKeys extends T ? T : ['n1', T] : ['never', T];
