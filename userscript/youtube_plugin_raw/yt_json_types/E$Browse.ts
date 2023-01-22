type E$Browse=T$Endpoint<{browseEndpoint: D__Browse$Id<ValidBrowseId>;},{
	webCommandMetadata: M$VE3854$Metadata;
}>|Extract<E$Button_navigationEndpoint,{browseEndpoint:any}>;
type ValidBrowseId=[
	"FEwhat_to_watch"
][number];