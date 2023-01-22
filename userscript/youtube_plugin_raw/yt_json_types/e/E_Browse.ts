type E_Browse=T_Endpoint<{browseEndpoint: D_Browse_Id<ValidBrowseId>;},{
	webCommandMetadata: M_VE3854_Metadata;
}>|Extract<E_Button_navigationEndpoint,{browseEndpoint:any}>;
type ValidBrowseId=[
	"FEwhat_to_watch"
][number];