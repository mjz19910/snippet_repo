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
	var __youtube_plugin_base_loaded__: typeof import("./youtube_plugin_base.user.js").__youtube_plugin_base_loaded__;
}
namespace EX {
	export type ServiceMethods=typeof import("./youtube_plugin_base.user.js").ServiceMethods;
	export type split_string_once=typeof import("./youtube_plugin_base.user.js").split_string_once;
	export type as_=typeof import("./youtube_plugin_base.user.js").as;
	export type AudioGainController=typeof import("./youtube_plugin_base.user.js").AudioGainController;
	export type base64_dec=typeof import("./youtube_plugin_base.user.js").base64_dec;
	export type split_string_once_last=typeof import("./youtube_plugin_base.user.js").split_string_once_last;
	export type VolumeRange=typeof import("./youtube_plugin_base.user.js").VolumeRange;
	export type yt_plugin_base_main=typeof import("./youtube_plugin_base.user.js").yt_plugin_base_main;
	export type make_iterator=typeof import("./youtube_plugin_base.user.js").make_iterator;
	export type Services=typeof import("./youtube_plugin_base.user.js").Services;
	export type BaseServicePrivate=typeof import("./youtube_plugin_base.user.js").BaseServicePrivate;
	export type BaseService=typeof import("./youtube_plugin_base.user.js").BaseService;
}