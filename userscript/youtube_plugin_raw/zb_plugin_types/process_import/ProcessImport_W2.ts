import {T_Split} from "../../yt_json_types/stu/group_T.js";
import {MatchType_Import4} from "./MatchType_Import4.js";
import {S_AllImportPaths} from "./S_AllImportPaths.js";

export type ProcessImport_W2<T extends S_AllImportPaths>=T_Split<T,"/"> extends MatchType_Import4? T:never;
