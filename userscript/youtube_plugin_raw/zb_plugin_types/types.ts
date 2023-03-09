type IndexedDBService=InstanceType<PluginStore["mod$IndexedDBService"]["IndexedDBService"]>;
type VolumeRange=InstanceType<PluginStore["mod$YoutubePluginBase"]["VolumeRange"]>;
type ServiceResolverBox<T>={
	value: T|null;
	listeners: ((x: T) => void)[];
};
namespace TestData {

	export const path_map={
		/** @type {["mod","YoutubePluginBase"]} */
		["./youtube_plugin_raw/zc_child_modules/YtPlugin_Base.user"]: ["mod","YoutubePluginBase"],
		/** @type {["mod","SupportService"]} */
		["./youtube_plugin_raw/zc_child_modules/YTPlugin_Support_Service.user"]: ["mod","SupportService"],
		/** @type {["mod","ECatcherService"]} */
		["./youtube_plugin_raw/zc_child_modules/YTPlugin_ECatcherService_Plugin.user"]: ["mod","ECatcherService"],
		/** @type {["mod","ServiceMethods"]} */
		["./youtube_plugin_raw/zc_child_modules/YTPlugin_ServiceMethods.user"]: ["mod","ServiceMethods"],
		/** @type {["raw","DebugApi"]} */
		["./DebugApi_raw/DebugApi.user.js"]: ["raw","DebugApi"],
		/** @type {["mod","ServiceLoaderPlugin"]} */
		["./youtube_plugin_raw/zc_child_modules/YtPlugin_ServiceLoader_Plugin.user"]: ["mod","ServiceLoaderPlugin"],
		/** @type {["mod","CodegenService"]} */
		["./youtube_plugin_raw/zc_child_modules/YTPlugin_Codegen.user"]: ["mod","CodegenService"],
		/** @type {["mod","HandleTypes"]} */
		["./youtube_plugin_raw/zc_child_modules/YTPlugin_HandleTypes.user"]: ["mod","HandleTypes"],
		/** @type {["mod","IndexedDBService"]} */
		["./youtube_plugin_raw/zc_child_modules/YTPlugin_IndexedDB.user"]: ["mod","IndexedDBService"],
		/** @type {["mod","ParserService"]} */
		["./youtube_plugin_raw/zc_child_modules/YTPlugin_Parser_Service.user"]: ["mod","ParserService"],
		/** @type {["sys","moment"]} */
		["moment"]: ["sys","moment"],
	};
}
type DefaultServiceResolver=ServiceResolverBox<ServiceResolverValue>;
type ServiceResolverValue=ServiceResolver<ServiceLoader,ServiceOptions>;
type MakeImportPath1<T>=T extends `./DebugApi_raw/${infer BaseName1}`? `../DebugApi_raw/${BaseName1}`:never;
type MakeImportPath<T>=T extends `./DebugApi_raw/${infer BaseName1}`? `../DebugApi_raw/${BaseName1}`:T extends `./youtube_plugin_raw/zc_child_modules/${infer BaseName1}`? `./${BaseName1}`:T extends `./${infer BaseName}`? `./${BaseName}`:T;
type ImpPathTest1=MakeImportPath1<keyof typeof TestData.path_map>;
type Ret_ParserService_GetUrlType=ReturnType<ParserService["get_url_type"]>;
type AsyncPluginEventDetail={
	handle_types: HandleTypes;
	elements: {
		on_yt_playlist_manager(element: HTMLElement): void;
	};
};
type ServiceMethods=InstanceType<PluginStore["mod$ServiceMethods"]["ServiceMethods"]>;
type ParserService=InstanceType<PluginStore["mod$ParserService"]["ParserService"]>;
type HandleTypes=InstanceType<PluginStore["mod$HandleTypes"]["HandleTypes"]>;
