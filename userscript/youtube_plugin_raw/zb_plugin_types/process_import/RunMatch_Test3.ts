import {RunMatch_Test2} from "./RunMatch_Test2.js";
import {ThePathMap} from "./ThePathMap.js";
export type RunMatch_Test3=Exclude<RunMatch_Test2,keyof ThePathMap>;
