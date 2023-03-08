import {S_AllImportPaths} from "./S_AllImportPaths.js";
import {ProcessGlobalImport} from "./ProcessGlobalImport.js";
import {ProcessWorkingDirImport} from "./ProcessWorkingDirImport.js";

export type ProcessImport<T extends S_AllImportPaths>=T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>;
const T2_const: ProcessImport<"../DebugApi_raw/DebugApi.user.js">=await import("../../../DebugApi_raw/DebugApi.user.js");
T2_const;
