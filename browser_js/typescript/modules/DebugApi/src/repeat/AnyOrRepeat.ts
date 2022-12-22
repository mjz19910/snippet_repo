import {Repeat_0} from "./Repeat_0.js";
import {Repeat_1} from "../../types/repeat/Repeat_1.js";

declare global {
	type AnyOrRepeat_0<T> = T|Repeat_0<T>;
	type AnyOrRepeat_1<T> = T|Repeat_1<T>;
}
