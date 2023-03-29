import {MatchType_WorkingDir} from "./MatchType_WorkingDir.js";
import {ProcessImport9} from "./ProcessImport9.js";

export type ProcessWorkingDirImport_Impl<T extends MatchType_WorkingDir>=
	T extends `../../${infer P1 extends string}/${infer P2 extends string}`
	? `./${P1}/${P2}`
	:
	T extends `../${infer P1 extends string}/${infer P2 extends string}`
	? `./${P1}/${P2}`
	:T
	;
;
const T1_const: ProcessWorkingDirImport_Impl<"../base_require_raw/BaseRequire.user">="./base_require_raw/BaseRequire.user";
T1_const;

const T2_const: ProcessImport9<"../base_require_raw/BaseRequire.user">="../base_require_raw/BaseRequire.user";
T2_const;
