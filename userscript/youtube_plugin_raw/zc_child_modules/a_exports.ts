type AsyncPluginEventDetail={handle_types: typeof import("./YtPlugin_ServiceLoader_Plugin.user.js").ServiceLoader["prototype"]["handle_types"];};
type HandleTypes=import("./YTPlugin_HandleTypes.user.js").HandleTypes;
type IndexedDBService=InstanceType<PluginStore["mod$IndexedDBService"]["IndexedDBService"]>;
type ServiceResolverBox<T,U>={value: import("./YtPlugin_Base.user.js").ServiceResolver<T,U>|null;};
type ServiceLoader=import("./YtPlugin_ServiceLoader_Plugin.user.js").ServiceLoader;
type ServiceMethods=import("./YTPlugin_ServiceMethods.user.js").ServiceMethods;
type UrlTypes=NonNullable<ReturnType<import("./YTPlugin_Parser_Service.user.js").ParserService["get_url_type"]>>;
type VolumeRange=import("./YtPlugin_Base.user.js").VolumeRange;
