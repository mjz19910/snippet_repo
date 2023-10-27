import {MatchType_WorkingDir} from "./MatchType_WorkingDir.ts";
import {ProcessImport9} from "./ProcessImport9.ts";

export type ProcessWorkingDirImport_Impl<T extends MatchType_WorkingDir>=
	T extends `../../${infer P1 extends string}/${infer P2 extends string}`
	? `./${P1}/${P2}`
	:T extends `../${infer P1 extends string}/${infer P2 extends string}`
	? `./${P1}/${P2}`
	:T extends `./${infer P1 extends string}`
	? P1 extends `YTPlugin_${string}`
	? `./youtube_plugin_raw/zc_child_modules/${P1}`
	:`./unk_module/${P1}`
	:T;
const T1_const: ProcessWorkingDirImport_Impl<"../base_require_raw/BaseRequire.user.js">="./base_require_raw/BaseRequire.user.js";
T1_const;

const T2_const: ProcessImport9<"../base_require_raw/BaseRequire.user.js">="../base_require_raw/BaseRequire.user.js";
T2_const;
