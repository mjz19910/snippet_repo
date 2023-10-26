import {MatchType_Import_Raw} from "../MatchType_Import_Raw.ts";
import {MatchType_Import_Mod} from "./MatchType_Import_Mod.ts";
import {MatchType_Import_Sys} from "./MatchType_Import_Sys.ts";
import {ProcessImport4} from "./ProcessImport4.ts";
import {ProcessImport5} from "./ProcessImport5.ts";
import {ProcessImportSys} from "./ProcessImportSys.ts";
import {Values_PathMap} from "./Values_PathMap.ts";

export type ProcessImport3<T extends Values_PathMap>=T extends MatchType_Import_Mod? ProcessImport4<T>:T extends MatchType_Import_Raw? ProcessImport5<T>:T extends MatchType_Import_Sys? ProcessImportSys<T>:["failed",T];
