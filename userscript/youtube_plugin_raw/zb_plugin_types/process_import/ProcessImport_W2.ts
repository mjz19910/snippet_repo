import {T_Split} from "../../support_0_mod/T_Split.mod.js";
import {MatchType_Import4} from "./MatchType_Import4.js";
import {S_AllImportPaths} from "./S_AllImportPaths.js";

export type ProcessImport_W2<T extends S_AllImportPaths>=T_Split<T,"/"> extends MatchType_Import4? T:never;
