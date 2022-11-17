import {TU} from "./TU";
import {TX} from "./TX";


export type DualR=[false,TU<string,number>[]]|[true,TX<string,number>[]];
