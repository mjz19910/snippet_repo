type RequiredType<V>=Partial<Omit<PartialWithType<V>,"a">>&Pick<PartialWithType<V>,"a">;
type IndexedDBService=InstanceType<PluginStore["mod$IndexedDBService"]["IndexedDBService"]>;
type VolumeRange=InstanceType<PluginStore["mod$YoutubePluginBase"]["VolumeRange"]>;
type ServiceResolverBox<T>={
	value: T|null;
	listeners: ((x: T) => void)[];
};
type DefaultServiceResolver=ServiceResolverBox<ServiceResolverValue>;
type ServiceResolverValue=ServiceResolver<ServiceLoader,ServiceOptions>;
type MakeImportPath<T>=T extends `./${infer BaseName}`? T|`../zc_child_modules/${BaseName}`:T;
type Ret_ParserService_GetUrlType=ReturnType<ParserService["get_url_type"]>;
type AsyncPluginEventDetail={
	handle_types: HandleTypes;
	elements: {
		on_yt_playlist_manager(element: HTMLElement): void;
	};
};
type ServiceMethods=InstanceType<PluginStore["mod$ServiceMethods"]["ServiceMethods"]>;
type ParserService=InstanceType<PluginStore["mod$ParserService"]["ParserService"]>;
type BoxSym=PluginStore["mod$YoutubePluginBase"]["box_sym_r"];
type HandleTypes=InstanceType<PluginStore["mod$HandleTypes"]["HandleTypes"]>;
