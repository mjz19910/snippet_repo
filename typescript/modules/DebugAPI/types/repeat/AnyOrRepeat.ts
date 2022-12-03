import {Repeat} from "./Repeat.js";

declare global {
	type AnyOrRepeat<T> = T|Repeat<T>;
}
