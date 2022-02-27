import {ReverseStr} from "./ReverseStr";
import {ReverseArr} from "./ReverseArr";

type Reverse<T> = T extends any[] ? ReverseArr<T> : T extends string ? ReverseStr<T> : never;
