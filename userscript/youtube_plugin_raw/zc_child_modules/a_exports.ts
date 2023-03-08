type AsyncPluginEventDetail={
	handle_types: typeof import("./YtPlugin_ServiceLoader_Plugin.user.js").ServiceLoader["prototype"]["handle_types"];
	elements: {
		on_yt_playlist_manager(element: HTMLElement): void;
	};
};
type HandleTypes=import("./YTPlugin_HandleTypes.user.js").HandleTypes;
type IndexedDBService=InstanceType<PluginStore["mod$IndexedDBService"]["IndexedDBService"]>;
type ServiceResolver<T,U>=import("./YtPlugin_Base.user.js").ServiceResolver<T,U>;
type ServiceResolverBox<T>={
	value: T|null;
	listeners: ((x: T) => void)[];
};
type ServiceLoader=import("./YtPlugin_ServiceLoader_Plugin.user.js").ServiceLoader;
type ServiceMethods=import("./YTPlugin_ServiceMethods.user.js").ServiceMethods;
type Ret_ParserService_GetUrlType=ReturnType<import("./YTPlugin_Parser_Service.user.js").ParserService["get_url_type"]>;
type VolumeRange=import("./YtPlugin_Base.user.js").VolumeRange;
type DefaultServiceResolverBox=ServiceResolverBox<ServiceResolver<ServiceLoader,ServiceOptions>>;
type DefaultServiceResolver=ServiceResolverBox<ServiceResolver<ServiceLoader,ServiceOptions>>;
type DefaultServiceResolver_2=ServiceResolver<ServiceLoader,ServiceOptions>;
type MakeImportPath<T>=T extends `./${infer BaseName}`? T|`../zc_child_modules/${BaseName}`:T;