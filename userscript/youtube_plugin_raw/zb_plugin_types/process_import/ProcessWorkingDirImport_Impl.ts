import {MatchType_WorkingDir} from "./MatchType_WorkingDir.js";
import {ProcessImport1} from "./ProcessImport1.js";
import {ProcessImport9} from "./ProcessImport9.js";

export type ProcessWorkingDirImport_Impl<T extends MatchType_WorkingDir>=T extends ProcessImport1<any>? T:ProcessImport9<T>; // ? ProcessImport1<T>:ProcessImport1<ProcessImport9<T>>;

