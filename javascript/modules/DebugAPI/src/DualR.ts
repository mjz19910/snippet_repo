import {TU} from "./repeat/TU";
import {TX} from "./repeat/TX";


export type DualR=[false,TU<string,number>[]]|[true,TX<string,number>[]];
