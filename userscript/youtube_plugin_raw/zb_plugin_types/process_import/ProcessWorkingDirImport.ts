import {MatchType_WorkingDir} from "./MatchType_WorkingDir.js";
import {ProcessImport1} from "./ProcessImport1.js";
import {ProcessWorkingDirImport_Impl} from "./ProcessWorkingDirImport_Impl.js";
import * as mod_BaseRequire from "../../../base_require_raw/BaseRequire.user.js";

export type ProcessWorkingDirImport<T extends MatchType_WorkingDir>=ProcessImport1<ProcessWorkingDirImport_Impl<T>&string>;
type T1Test<T>=T extends ProcessImport1<any>? T:never;
const T2_const: ProcessImport1<"./base_require_raw/BaseRequire.user">=mod_BaseRequire;
T2_const;
const T3_const: [typeof mod_BaseRequire]=[T2_const];
T3_const;
const T4_const: T1Test<"../base_require_raw/BaseRequire.user">="../base_require_raw/BaseRequire.user";
T4_const;
