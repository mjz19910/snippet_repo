import {MatchType_WorkingDir} from "./MatchType_WorkingDir.js";
import {ProcessImport1} from "./ProcessImport1.js";
import {ProcessWorkingDirImport_Impl} from "./ProcessWorkingDirImport_Impl.js";

export type ProcessWorkingDirImport<T extends MatchType_WorkingDir>=ProcessImport1<ProcessWorkingDirImport_Impl<T>>;
const T1_const: ProcessWorkingDirImport_Impl<"../DebugApi_raw/DebugApi.user.js">="../DebugApi_raw/DebugApi.user.js";
T1_const;