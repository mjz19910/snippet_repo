import {ApiBase,__path_map__} from "../zc_child_modules/YtPlugin_Base.user.js";

export class ApiBaseExported extends ApiBase {
	override parse_url_search_params<T extends string>(x: T) {return super.parse_url_search_params(x);}
	get_url_params<T extends string,U extends keyof TP_ParseUrlSearchParams<T>>(t: T,u: U) {
		let rq=this.parse_url_search_params(t);
		if(u in rq) return rq[u];
		if(typeof u==='string') return new URLSearchParams(t).get(u) as TP_ParseUrlSearchParams<T>[U]|null;
		return null;
	}
}
declare global {interface Window {yt_plugin?: import("../zc_child_modules/YtPlugin_Base.user").YtPlugin;}}
export type RunMatch_Import=ProcessImport<"../DebugApi_raw/DebugApi.user.js">;
type MatchType_Import3=typeof __path_map__[MatchType_Import6];
type RunMatch_Test2=Extract<MatchType_Import_,`../${string}`>;
export type RunMatch_Test3=Exclude<RunMatch_Test2,keyof typeof __path_map__>;
export type RunMatch_Test4=ProcessImport6<RunMatch_Test2>;
type RunMatch_Test5=Exclude<MatchType_Import_,MatchType_Import1|RunMatch_Test4>|"../DebugApi_raw/DebugApi.user.js";
export type RM_1=ProcessImport7<RunMatch_Test5>;
export type RM_2=ProcessImport9<RunMatch_Test5>;
export type RM_3=ProcessImportImpl_1<MatchType_Import_>;
export type RM_4=Exclude<ProcessImport7<MatchType_Import_>,["..","zc_child_modules",MatchType_Import4]|["..","DebugApi_raw","DebugApi.user.js"]>;
type MatchType_Import2=Extract<MatchType_Import_,`./${string}`|`../${string}`>;
type MatchType_Import6=Extract<MatchType_Import2,keyof typeof __path_map__>;
type ProcessImport5<T extends ["raw",string]>=T[1] extends keyof PluginStore? PluginStore[T[1]]:T;
type ProcessImport4<T extends Extract<MatchType_Import3,["mod",any]>>=PluginStore[`${T[0]}$${T[1]}`];
type ProcessImport3<T extends MatchType_Import3>=T extends ["mod",any]? ProcessImport4<T>:T extends ["raw",string]? ProcessImport5<T>:T;
type ProcessImport2<T extends MatchType_Import6>=ProcessImport3<typeof __path_map__[T]>;
type ProcessImport6<T extends MatchType_Import2>=T extends `../${"zc_child_modules"}/${infer P1 extends MatchType_Import4}`? `./${P1}`:T;
type ProcessImport7<T extends MatchType_Import_>=T extends `../${infer P1}/${infer P2}`? ["..",P1,P2]:T;
type ProcessImport8<T extends ["..","zc_child_modules",MatchType_Import4]|["..","DebugApi_raw","DebugApi.user.js"]|string>=T extends ["..","zc_child_modules",infer P1 extends string]? `./${P1}`:T extends ["..",infer P1 extends string,infer P2 extends string]? `../${P1}/${P2}`:T;
type ProcessImport9<T extends MatchType_Import2>=ProcessImport8<ProcessImport7<T>>;
type MatchType_Import4=MatchType_Import1 extends infer I? I extends `./${infer I}`? I:never:never;
export type MatchType_Import5=MatchType_Import1 extends infer I? I extends `../${string}/${string}`? I:never:never;
type MatchType_Import1=keyof typeof __path_map__;
type MatchType_Import_=MatchType_Import1|MakeImportPath<MatchType_Import1>;
type ProcessImportImpl_1<T extends MatchType_Import_>=T extends `../${string}`? ProcessImport9<T> extends infer J? J extends MatchType_Import6? ProcessImport2<J>:J:T:ProcessImport<T>;
export type ProcessImport<T extends MatchType_Import_>=T extends `../${string}`? ProcessImport9<T> extends infer J? J extends MatchType_Import6? ProcessImport2<J>:J:T:T extends `./${string}`? ProcessImport2<T>:T extends keyof typeof globalThis? typeof globalThis[T]:never;
