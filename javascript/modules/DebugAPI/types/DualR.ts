import {TypeAOrTypeB} from "./repeat/TypeAOrTypeB";
import {AnyOrRepeat2} from "./repeat/AnyOrRepeat2";

export type DualR=[true,AnyOrRepeat2<string,number>[]]|[false,TypeAOrTypeB<string,number>[]];
