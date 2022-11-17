import {TU} from "./repeat/TU";
import {TX} from "./repeat/TX";

export type DualR=[true,TX<string,number>[]]|[false,TU<string,number>[]];
