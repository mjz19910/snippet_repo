type E_Browse=T_Endpoint<{browseEndpoint: D_Browse_Id<ValidBrowseId>|{
	browseId:ValidBrowseId;
	canonicalBaseUrl: `/@${string}`;
};},{
	webCommandMetadata: M_VE3854_Metadata;
}>|Extract<E_Button_navigation,{browseEndpoint:any}>;
type ValidBrowseId=[
	"FEwhat_to_watch"
][number];