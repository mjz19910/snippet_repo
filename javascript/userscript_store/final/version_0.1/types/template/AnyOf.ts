import {AnyOfStr} from "./AnyOfStr";
import {AnyOfArr} from "./AnyOfArr";

export type AnyOf<T> = T extends any[] ? AnyOfArr<T> : T extends string ? AnyOfStr<T> : never;
