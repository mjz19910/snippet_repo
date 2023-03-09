import {S_AllImportPaths} from "./S_AllImportPaths.js";
import {ProcessGlobalImport} from "./ProcessGlobalImport.js";
import {ProcessWorkingDirImport} from "./ProcessWorkingDirImport.js";

export type ProcessImport<T extends S_AllImportPaths>=T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>;
