import {ProcessGlobalImport} from "../youtube_plugin_raw/zb_plugin_types/process_import/ProcessGlobalImport.js";
import {ProcessWorkingDirImport} from "../youtube_plugin_raw/zb_plugin_types/process_import/ProcessWorkingDirImport.js";

export type ProcessImport<T extends S_AllImportPaths>=[T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>] extends [never]? {}:T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>;

export type ProcessImport_Test1=ProcessImport<"../base_require_raw/BaseRequire.user">;
export type ProcessImport_Test2=ProcessWorkingDirImport<"../base_require_raw/BaseRequire.user">;
