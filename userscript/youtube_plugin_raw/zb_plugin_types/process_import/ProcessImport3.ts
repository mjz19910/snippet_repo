import {Values_PathMap} from "./Values_PathMap.js";
import {MatchType_Import_Mod} from "./MatchType_Import_Mod.js";
import {MatchType_Import_Raw} from "./MatchType_Import_Raw.js";
import {MatchType_Import_Sys} from "./MatchType_Import_Sys.1.js";
import {ProcessImport4} from "./ProcessImport4.js";
import {ProcessImport5} from "./ProcessImport5.js";
import {ProcessImportSys} from "./ProcessImportSys.js";

export type ProcessImport3<T extends Values_PathMap>=T extends MatchType_Import_Mod? ProcessImport4<T>:T extends MatchType_Import_Raw? ProcessImport5<T>:T extends MatchType_Import_Sys? ProcessImportSys<T>:["failed",T];
