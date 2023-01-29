import {HandleTypesEval_} from "./handle_types_eval.js";
declare global {
	interface Window {
		Polymer: {
			Class?: <T>(x: {}) => T;
		};
	}
}
declare global {
	interface URLSearchParams {
		[Symbol.iterator](): IterableIterator<[string,string]>;
		append(name: string,value: string): void;
		delete(name: string): void;
		entries(): IterableIterator<[string,string]>;
	}
	class HandleTypesEval<T,U> extends HandleTypesEval_<T,U> {}
	var as: EX.as_;
	var ServiceMethods: EX.ServiceMethods;
	var split_string_once: EX.split_string_once;
	var AudioGainController: EX.AudioGainController;
	type AudioGainController=InstanceType<EX.AudioGainController>;
	var base64_dec: EX.base64_dec;
	var base64_url_dec: typeof base64_dec;
	var split_string_once_last: EX.split_string_once_last;
	var VolumeRange: EX.VolumeRange;
	var yt_plugin_base_main: EX.yt_plugin_base_main;
	var make_iterator: EX.make_iterator;
	var Services: EX.Services;
	var BaseServicePrivate: EX.BaseServicePrivate;
	var BaseService: EX.BaseService;
	// youtube_plugin_base
	var CsiService: typeof import("./zb_child_modules/youtube_plugin_base.user.js").CsiService;
	var ECatcherService:  typeof import("./zb_child_modules/youtube_plugin_base.user.js").ECatcherService;
	var GFeedbackService: typeof import("./zb_child_modules/youtube_plugin_base.user.js").GFeedbackService;
	var GuidedHelpService: typeof import("./zb_child_modules/youtube_plugin_base.user.js").GuidedHelpService;
	var TrackingServices: typeof import("./zb_child_modules/youtube_plugin_base.user.js").TrackingServices;
	var ParserService: typeof import("./zb_child_modules/youtube_plugin_Parser.js").ParserService;
	var YtHandlers: typeof import("./zb_child_modules/youtube_plugin_base.user.js").YtHandlers;
	var HandleTypes: typeof import("./youtube_plugin_HandleTypes.user.js").HandleTypes;
	var CodegenService: typeof import("./zb_child_modules/youtube_plugin_Codegen.user.js").CodegenService;
	var IndexedDbAccessor: typeof import("./zb_child_modules/youtube_plugin_base.user.js").IndexedDbAccessor;
	var YtPlugin: typeof import("./zb_child_modules/youtube_plugin_base.user.js").YtPlugin;
	var ModifyEnv: typeof import("./zb_child_modules/youtube_plugin_base.user.js").ModifyEnv;
	// youtube_plugin_HandleTypes
	var __youtube_plugin_base_loaded__: typeof import("./zb_child_modules/youtube_plugin_base.user.js").__youtube_plugin_base_loaded__;
	var HandleTypes: typeof import("./youtube_plugin_HandleTypes.user.js").HandleTypes;
	type HandleTypes<T,U>=import("./youtube_plugin_HandleTypes.user.js").HandleTypes<T,U>;
}
namespace EX {
	export type ServiceMethods=typeof import("./zb_child_modules/youtube_plugin_base.user.js").ServiceMethods;
	export type split_string_once=typeof import("./zb_child_modules/youtube_plugin_base.user.js").split_string_once;
	export type as_=typeof import("./zb_child_modules/youtube_plugin_base.user.js").as;
	export type AudioGainController=typeof import("./zb_child_modules/youtube_plugin_base.user.js").AudioGainController;
	export type base64_dec=typeof import("./zb_child_modules/youtube_plugin_base.user.js").base64_dec;
	export type split_string_once_last=typeof import("./zb_child_modules/youtube_plugin_base.user.js").split_string_once_last;
	export type VolumeRange=typeof import("./zb_child_modules/youtube_plugin_base.user.js").VolumeRange;
	export type yt_plugin_base_main=typeof import("./zb_child_modules/youtube_plugin_base.user.js").yt_plugin_base_main;
	export type make_iterator=typeof import("./zb_child_modules/youtube_plugin_base.user.js").make_iterator;
	export type Services=typeof import("./zb_child_modules/youtube_plugin_Services.user.js").Services;
	export type BaseServicePrivate=typeof import("./zb_child_modules/youtube_plugin_base.user.js").BaseServicePrivate;
	export type BaseService=typeof import("./zb_child_modules/youtube_plugin_base.user.js").BaseService;
}