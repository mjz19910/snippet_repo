import {MatchType_Import2} from "./MatchType_Import2.ts";
import {MatchType_Import4} from "./MatchType_Import4.ts";

export type ProcessImport6<T extends MatchType_Import2>=T extends `../zc_child_modules/${infer P1 extends MatchType_Import4[2]}`? `./${P1}`:T;
