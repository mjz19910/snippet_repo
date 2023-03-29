type IndexedDBService=InstanceType<RequireModuleCache["mod$IndexedDBService"]["IndexedDBService"]>;
type VolumeRange=InstanceType<RequireModuleCache["mod$YoutubePluginBase"]["VolumeRange"]>;
type ServiceResolverBox<T>={
	value: T|null;
	listeners: (() => void)[];
};
type ServiceResolverValue=ServiceResolver<ServiceLoader,ServiceOptions>;
type MakeImportPath1<T>=
	T extends `./DebugApi_raw/${infer BaseName1}`
	? `../DebugApi_raw/${BaseName1}`
	:never;
type MakeImportPathForTemplateDir<T>=
	T extends `./youtube_plugin_raw/zc_child_modules/${infer BaseName1}`
	? `../zc_child_modules/${BaseName1}`|`./${BaseName1}`
	:never;
type ImpPathTest1=MakeImportPathForTemplateDir<keyof PathMapType>;
type ImpPathTest3=MakeImportPathForTemplateDir<"../base_require_raw/BaseRequire.user">;
type Ret_ParserService_GetUrlType=ReturnType<ParserService["get_url_type"]>;
type AsyncPluginEventDetail={
	handle_types: HandleTypes;
	elements: {
		on_yt_playlist_manager(element: HTMLElement): void;
	};
};
type ServiceMethods=InstanceType<RequireModuleCache["mod$ServiceMethods"]["ServiceMethods"]>;
type ParserService=InstanceType<RequireModuleCache["mod$ParserService"]["ParserService"]>;
type HandleTypes=InstanceType<RequireModuleCache["mod$HandleTypes"]["HandleTypes"]>;

type Y_PutBoxedArgs=[store_type: string,store_args: [string,make_item_group<any>]|[null,number]];
