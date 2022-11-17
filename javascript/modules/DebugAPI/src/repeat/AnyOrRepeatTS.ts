import {RepeatTS} from "./RepeatTS.js";

type G<T>=RepeatTS<T>;
export type AnyOrRepeatTS<T>=T|G<T>;
