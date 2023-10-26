import {T_Split} from "../../yt_json_types/stu/group_T.ts";
import {MatchType_Import4} from "./MatchType_Import4.ts";
import {S_AllImportPaths} from "./S_AllImportPaths.ts";

export type ProcessImport_W2<T extends S_AllImportPaths>=T_Split<T,"/"> extends MatchType_Import4? T:never;
