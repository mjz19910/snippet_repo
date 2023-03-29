import {ProcessGlobalImport} from "../youtube_plugin_raw/zb_plugin_types/process_import/ProcessGlobalImport.js";
import {ProcessWorkingDirImport} from "../youtube_plugin_raw/zb_plugin_types/process_import/ProcessWorkingDirImport.js";
import {S_AllImportPaths} from "../youtube_plugin_raw/zb_plugin_types/process_import/S_AllImportPaths.js";

export type ProcessImport<T extends S_AllImportPaths>=[T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>] extends [never]? {}:T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>;
