import {Repeat_1} from "./Repeat_1.js";

declare global {
	type AnyOrRepeat_0<T> = T|Repeat_0<T>;
	type AnyOrRepeat_1<T> = T|Repeat_1<T>;
}
