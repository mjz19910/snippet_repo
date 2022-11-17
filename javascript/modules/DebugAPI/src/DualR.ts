import {TU} from "./repeat/TU";
import {AnyRepeat2} from "./repeat/AnyRepeat2";

export type DualR=[true,AnyRepeat2<string,number>[]]|[false,TU<string,number>[]];
