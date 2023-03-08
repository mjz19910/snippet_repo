import {__path_map__} from "../zc_child_modules/YtPlugin_Base.user.js";
import {MatchType_Import_Raw} from "./MatchType_Import_Raw.js";
import {MatchType_Import2} from "./process_import/MatchType_Import2.js";
import {MatchType_Import3} from "./process_import/MatchType_Import3.js";
import {MatchType_Import6} from "./process_import/MatchType_Import6.js";

declare global {interface Window {yt_plugin?: import("../zc_child_modules/YtPlugin_Base.user").YtPlugin;}}
type MatchType_Import_Sys=Extract<MatchType_Import3,["sys",any]>;
type MatchType_Import_Mod=Extract<MatchType_Import3,["mod",any]>;
type ProcessImport5<T extends MatchType_Import_Raw>=T[1] extends keyof PluginStore? PluginStore[T[1]]:T;
type ProcessImport4<T extends MatchType_Import_Mod>=PluginStore[`${T[0]}$${T[1]}`];
type ProcessImportSys<T extends MatchType_Import_Sys>=ProcessGlobalImport<T[1]>;
type ProcessImport3<T extends MatchType_Import3>=T extends MatchType_Import_Mod? ProcessImport4<T>:T extends MatchType_Import_Raw? ProcessImport5<T>:T extends MatchType_Import_Sys? ProcessImportSys<T>:["failed",T];
// ../DebugApi_raw/DebugApi.user.js
type ProcessImport1<T extends keyof typeof __path_map__>=ProcessImport3<typeof __path_map__[T]>;
type ProcessWorkingDirImport<T extends MatchType_Import6|MatchType_Import2>=T extends keyof typeof __path_map__? ProcessImport1<T>:ProcessImport1<ProcessImport9<T>>;
export type ProcessImport6<T extends MatchType_Import2>=T extends `../${"zc_child_modules"}/${infer P1 extends MatchType_Import4}`? `./${P1}`:T;
export type ProcessImport7<T extends MatchType_Import_>=T extends `../${infer P1}/${infer P2}`? ["..",P1,P2]:T;
type ProcessImport8<T extends ["..","zc_child_modules",MatchType_Import4]|["..","DebugApi_raw","DebugApi.user.js"]|string>=T extends ["..","zc_child_modules",infer P1 extends string]? `./${P1}`:T extends ["..",infer P1 extends string,infer P2 extends string]? `../${P1}/${P2}`:T;
export type ProcessImport9<T extends MatchType_Import2>=ProcessImport8<ProcessImport7<T>>;
export type MatchType_Import4=MatchType_Import1 extends infer I? I extends `./${infer V}`? V:never:never;
export type MatchType_Import5=Extract<MatchType_Import1,`../${string}/${string}`>;
export type MatchType_Import1=keyof typeof __path_map__;
export type MatchType_Import_=MatchType_Import1|MakeImportPath<MatchType_Import1>;
type ProcessGlobalImport<T>=T extends keyof typeof globalThis? typeof globalThis[T]:T;
export type ProcessImport<T extends MatchType_Import_>=T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>;
