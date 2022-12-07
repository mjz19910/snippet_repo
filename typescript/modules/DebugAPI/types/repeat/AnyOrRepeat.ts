import {Repeat_1} from "./Repeat_1.js";

declare global {
	type AnyOrRepeat<T> = T|Repeat_1<T>;
}
