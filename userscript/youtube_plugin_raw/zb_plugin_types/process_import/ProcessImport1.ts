import {ProcessImport3} from "./ProcessImport3.ts";
import {ThePathMap} from "./ThePathMap.ts";

export type ProcessImport1<T extends string>=T extends keyof ThePathMap? ProcessImport3<ThePathMap[T]>:["bad_import",T];
