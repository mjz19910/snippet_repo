import {MatchType_Import_Sys} from "./MatchType_Import_Sys.ts";
import {ProcessGlobalImport} from "./ProcessGlobalImport.ts";

export type ProcessImportSys<T extends MatchType_Import_Sys>=ProcessGlobalImport<T[1]>;
