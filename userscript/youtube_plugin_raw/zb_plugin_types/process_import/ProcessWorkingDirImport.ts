// deno-lint-ignore-file
import {ProcessImport} from "../../../base_require_raw/ProcessImport.ts";
import {MatchType_WorkingDir} from "./MatchType_WorkingDir.ts";
import {ProcessImport1} from "./ProcessImport1.ts";
import {ProcessWorkingDirImport_Impl} from "./ProcessWorkingDirImport_Impl.ts";

export type ProcessWorkingDirImport<T extends MatchType_WorkingDir>=ProcessImport1<ProcessWorkingDirImport_Impl<T>&string>;

export async function test_ProcessWorkingDirImport() {
	type T1Test<T>=T extends ProcessImport1<any>? T:never;
	const T2_const: ProcessImport1<"./base_require_raw/BaseRequire.user">=await import("../../../base_require_raw/BaseRequire.user.js");
	T2_const;
	const T3_const: [typeof import("../../../base_require_raw/BaseRequire.user.js")]=[T2_const];
	T3_const;
	const T4_const: T1Test<"../base_require_raw/BaseRequire.user">="../base_require_raw/BaseRequire.user";
	T4_const;
	const T5_const: ProcessWorkingDirImport_Impl<"./YTPlugin_HandleTypes.user">="./youtube_plugin_raw/zc_child_modules/YTPlugin_HandleTypes.user";
	T5_const;
	type T2_Type=ProcessImport<"./YTPlugin_HandleTypes.user">;
	const t2: T2_Type=await import("../../zc_child_modules/YTPlugin_HandleTypes.user.js"); t2;
}
