import {HandleTypesEval_} from "./handle_types_eval.js";
declare global {
	interface Window {Polymer: {Class?: <T>(x: {}) => T;};}
}
type Base$ImpType=typeof import("./zc_child_modules/YtPlugin_Base.user.js");
declare global {
	interface URLSearchParams {
		[Symbol.iterator](): IterableIterator<[string,string]>;
		append(name: string,value: string): void;
		delete(name: string): void;
		entries(): IterableIterator<[string,string]>;
	}
	class HandleTypesEval extends HandleTypesEval_ {}
	interface Window {__plugin_modules__?: Partial<PluginStore>;}
	var Type_Ex_NS: typeof EX;
	var __youtube_plugin_base_loaded__: typeof EX.__youtube_plugin_base_loaded__;
	var required: Base$ImpType["required"];
	type PluginStore=import("./zb_plugin_types/PluginStore.js").PluginStore;
	var __yt_plugin_log_imports__: boolean;
	type LoadAllServices=import("./zc_child_modules/YTPlugin_LoadAllServices.user.js").LoadAllServices;
}
namespace EX {
	export type ServiceMethods=Base$ImpType["ServiceMethods"];
	export type split_string_once=Base$ImpType["split_string_once"];
	export type as_=typeof import("./zc_child_modules/YtPlugin_Base.user.js").as_;
	export type AudioGainController=Base$ImpType["AudioGainController"];
	export type base64_dec=Base$ImpType["base64_dec"];
	export type split_string_once_last=Base$ImpType["split_string_once_last"];
	export type VolumeRange=Base$ImpType["VolumeRange"];
	export type yt_plugin_base_main=Base$ImpType["yt_plugin_base_main"];
	export type make_iterator=Base$ImpType["make_iterator"];
	export type LoadAllServices=typeof import("./zc_child_modules/YTPlugin_LoadAllServices.user.js").LoadAllServices;
	export type BaseServicePrivate=Base$ImpType["BaseServicePrivate"];
	export type BaseService=Base$ImpType["BaseService"];
	export var ServiceMethods: EX.ServiceMethods;
	export var split_string_once: EX.split_string_once;
	export var AudioGainController: EX.AudioGainController;
	export var base64_dec: EX.base64_dec;
	export var base64_url_dec: typeof base64_dec;
	export var split_string_once_last: EX.split_string_once_last;
	export var VolumeRange: EX.VolumeRange;
	export var yt_plugin_base_main: EX.yt_plugin_base_main;
	export var make_iterator: EX.make_iterator;
	export var LoadAllServices: EX.LoadAllServices;
	export var BaseServicePrivate: EX.BaseServicePrivate;
	export var BaseService: EX.BaseService;
	// youtube_plugin_base
	export var CsiService: Base$ImpType["CsiService"];
	export var ECatcherService:  typeof import("./zc_child_modules/YTPlugin_ECatcherService.user.js").ECatcherService;
	export var GFeedbackService: Base$ImpType["GFeedbackService"];
	export var GuidedHelpService: Base$ImpType["GuidedHelpService"];
	export var TrackingServices: Base$ImpType["TrackingServices"];
	export var ParserService: typeof import("./zc_child_modules/YTPlugin_Parser.user.js").ParserService;
	export var YtHandlers: Base$ImpType["YtHandlers"];
	export var HandleTypes: typeof import("./zc_child_modules/YTPlugin_HandleTypes.user.js").HandleTypes;
	export var CodegenService: typeof import("./zc_child_modules/YTPlugin_Codegen.user.js").CodegenService;
	export var IndexedDBService: typeof import("./zc_child_modules/YTPlugin_IndexedDB.user.js").IndexedDBService;
	export var YtPlugin: Base$ImpType["YtPlugin"];
	export var ModifyEnv: Base$ImpType["ModifyEnv"];
	// youtube_plugin_HandleTypes
	export var __youtube_plugin_base_loaded__: Base$ImpType["__youtube_plugin_base_loaded__"];
}