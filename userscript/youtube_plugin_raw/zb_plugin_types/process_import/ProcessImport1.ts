import {ProcessImport3} from "./ProcessImport3.js";

// ../DebugApi_raw/DebugApi.user.js
export type ProcessImport1<T extends string>=T extends keyof ThePathMap? ProcessImport3<ThePathMap[T]>:["bad_import",T];
