import {HandleTypesEval_} from "./handle_types_eval.js";
declare global {
	interface Window {
		Polymer: {
			Class?: <T>(x: {}) => T;
		};
	}
}
type Base$ImpType=typeof import("./zb_child_modules/YtPlugin_Base_Plugin.user.js");
declare global {
	interface URLSearchParams {
		[Symbol.iterator](): IterableIterator<[string,string]>;
		append(name: string,value: string): void;
		delete(name: string): void;
		entries(): IterableIterator<[string,string]>;
	}
	class HandleTypesEval<T,U> extends HandleTypesEval_<T,U> {}
	interface Window {
		__plugin_modules__?: Partial<PluginStore>;
	}
	var Type_Ex_NS: typeof EX;
	var __youtube_plugin_base_loaded__: typeof EX.__youtube_plugin_base_loaded__;
	var required: Base$ImpType["required"];
	type PluginStore=import("./zb_child_modules/PluginStore.js").PluginStore
}
namespace EX {
	export type ServiceMethods=Base$ImpType["ServiceMethods"];
	export type split_string_once=Base$ImpType["split_string_once"];
	export type as_=typeof import("./zb_child_modules/YtPlugin_Base_Plugin.user.js").as_;
	export type AudioGainController=Base$ImpType["AudioGainController"];
	export type base64_dec=Base$ImpType["base64_dec"];
	export type split_string_once_last=Base$ImpType["split_string_once_last"];
	export type VolumeRange=Base$ImpType["VolumeRange"];
	export type yt_plugin_base_main=Base$ImpType["yt_plugin_base_main"];
	export type make_iterator=Base$ImpType["make_iterator"];
	export type Services=typeof import("./zb_child_modules/YtPlugin_LoadServices.user.js").Services;
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
	export var Services: EX.Services;
	export var BaseServicePrivate: EX.BaseServicePrivate;
	export var BaseService: EX.BaseService;
	// youtube_plugin_base
	export var CsiService: Base$ImpType["CsiService"];
	export var ECatcherService:  typeof import("./zb_child_modules/ECatcherService.user.js").ECatcherService;
	export var GFeedbackService: Base$ImpType["GFeedbackService"];
	export var GuidedHelpService: Base$ImpType["GuidedHelpService"];
	export var TrackingServices: Base$ImpType["TrackingServices"];
	export var ParserService: typeof import("./zb_child_modules/YTPlugin_ParserService.js").ParserService;
	export var YtHandlers: Base$ImpType["YtHandlers"];
	export var HandleTypes: typeof import("./youtube_plugin_HandleTypes.user.js").HandleTypes;
	export var CodegenService: typeof import("./zb_child_modules/youtube_plugin_Codegen.user.js").CodegenService;
	export var IndexedDbAccessor: Base$ImpType["IndexedDbAccessor"];
	export var YtPlugin: Base$ImpType["YtPlugin"];
	export var ModifyEnv: Base$ImpType["ModifyEnv"];
	// youtube_plugin_HandleTypes
	export var __youtube_plugin_base_loaded__: Base$ImpType["__youtube_plugin_base_loaded__"];
	export type HandleTypes<T,U>=import("./youtube_plugin_HandleTypes.user.js").HandleTypes<T,U>;
}