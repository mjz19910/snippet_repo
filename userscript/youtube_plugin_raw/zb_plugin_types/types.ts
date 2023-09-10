import {RequireModuleCache} from "../../_module_cache/RequireModuleCache.js";
import {ServiceResolver} from "../zc_child_modules/YTPlugin_Base.user.js";
import {ServiceLoader} from "../zc_child_modules/YTPlugin_ServiceLoader_Plugin.user.js";
import {PathMapType} from "./ambient_exports.js";

export type IndexedDBService=InstanceType<RequireModuleCache["mod$IndexedDBService"]["IndexedDBService"]>;
export type VolumeRange=InstanceType<RequireModuleCache["mod$YoutubePluginBase"]["VolumeRange"]>;
export type ServiceResolverBox<T>={
	value: T|null;
	listeners: (() => void)[];
};
export type ServiceResolverValue=ServiceResolver<ServiceLoader,ServiceOptions>;
export type MakeImportPath1<T>=
	T extends `./DebugApi_raw/${infer BaseName1}`
	? `../DebugApi_raw/${BaseName1}`
	:never;
type MakeImportPathForTemplateDir<T>=
	T extends `./youtube_plugin_raw/zc_child_modules/${infer BaseName1}`
	? `../zc_child_modules/${BaseName1}`|`./${BaseName1}`
	:never;
export type ImpPathTest1=MakeImportPathForTemplateDir<keyof PathMapType>;
export type ImpPathTest3=MakeImportPathForTemplateDir<"../base_require_raw/BaseRequire.user">;
export type Ret_ParserService_GetUrlType=ReturnType<ParserService["get_url_type"]>;
export type AsyncPluginEventDetail={
	handle_types: HandleTypes;
	elements: {
		on_yt_playlist_manager(element: HTMLElement): void;
	};
};
export type ServiceMethods=InstanceType<RequireModuleCache["mod$ServiceMethods"]["ServiceMethods"]>;
type ParserService=InstanceType<RequireModuleCache["mod$ParserService"]["ParserService"]>;
type HandleTypes=InstanceType<RequireModuleCache["mod$HandleTypes"]["HandleTypes"]>;

export type Y_PutBoxedArgs=[store_type: string,store_args: [string,make_item_group<any>]|[null,number]];

export class CustomEventType {
	type="event_type"
	detail={}
	port=new MessagePort
}
