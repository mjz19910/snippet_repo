import {TypeAOrTypeB} from "./repeat/TypeAOrTypeB";
import {AnyRepeat2} from "./repeat/AnyOrRepeat2";

export type DualR=[true,AnyRepeat2<string,number>[]]|[false,TypeAOrTypeB<string,number>[]];
