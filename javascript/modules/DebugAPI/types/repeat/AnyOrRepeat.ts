import {Repeat} from "./Repeat.js";

export type AnyOrRepeatL<T>=T|Repeat<T>;

declare global {
	type AnyOrRepeat<T> = AnyOrRepeatL<T>;
}
