import {MatchType_Import2} from "./MatchType_Import2.js";
import {MatchType_Import4} from "./MatchType_Import4.js";
import {ProcessImport8} from "./ProcessImport8.js";
import {ProcessImport_W2} from "./ProcessImport_W2.js";
import {S_AllImportPaths} from "./S_AllImportPaths.js";

export type ProcessImport9<T extends MatchType_Import2>=ProcessImport_W2<T> extends ProcessImport8<infer J>? ProcessImport8<J>:never;
export type SplitRes=Exclude<T_Split<S_AllImportPaths,"/">,MatchType_Import4>;
