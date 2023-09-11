import {T_Split} from "../../yt_json_types/stu/group_T.js";
import {Keyof_PathMap} from "./Keyof_PathMap.js";
import {MatchType_Import2} from "./MatchType_Import2.js";
import {ProcessImport8} from "./ProcessImport8.js";
import {ProcessImport_W2} from "./ProcessImport_W2.js";
import {S_AllImportPaths} from "./S_AllImportPaths.js";

export type ProcessImport9<T extends MatchType_Import2>=ProcessImport_W2<T> extends ProcessImport8<infer J>? ProcessImport8<J>:never;
export type ProcessImport9_SplitPath1=Exclude<T_Split<S_AllImportPaths,"/">,T_Split<Keyof_PathMap,"/">>;
export type ProcessImport9_SplitPath2=Exclude<ProcessImport9_SplitPath1,["..","zc_child_modules",string]|["..",string,string]|[".",string]>;
