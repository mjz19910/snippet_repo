import {MatchType_Import2} from "./MatchType_Import2.js";
import {MatchType_Import4} from "./MatchType_Import4.js";

export type ProcessImport6<T extends MatchType_Import2>=T extends `../zc_child_modules/${infer P1 extends MatchType_Import4[2]}`? `./${P1}`:T;
