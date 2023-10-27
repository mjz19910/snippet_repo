// deno-lint-ignore-file
import {ProcessGlobalImport} from "../youtube_plugin_raw/zb_plugin_types/process_import/ProcessGlobalImport.ts";
import {ProcessWorkingDirImport} from "../youtube_plugin_raw/zb_plugin_types/process_import/ProcessWorkingDirImport.ts";
import {S_AllImportPaths} from "../youtube_plugin_raw/zb_plugin_types/process_import/S_AllImportPaths.ts";

export type ProcessImport<T extends S_AllImportPaths>=[T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>] extends [never]? {}:T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>;

export async function test_ProcessImport() {
	type ProcessImport_Test1=ProcessImport<"../base_require_raw/BaseRequire.user.js">;
	type ProcessImport_Test2=ProcessWorkingDirImport<"../base_require_raw/BaseRequire.user.js">;
	const t1: ProcessImport_Test1=await import("../base_require_raw/BaseRequire.user.js");
	const t2: ProcessImport_Test2=t1;
	t2;
	const t3: typeof import("./ProcessImportTest.ts")={Test2: {run_test: async () => {}}};
	t3;
}
