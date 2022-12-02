import {TypeAOrTypeB} from "./repeat/TypeAOrTypeB";
import {AnyOrRepeat2} from "./repeat/AnyOrRepeat2";

declare global {
	export type DualR=[true,AnyOrRepeat2<string,number>[]]|[false,TypeAOrTypeB<string,number>[]];
}
