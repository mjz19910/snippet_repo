type E_Browse=T_Endpoint<{browseEndpoint: D_Browse_Id<ValidBrowseId>|{
	browseId: `UC${string}`;
	canonicalBaseUrl: `/@${string}`;
};},{
	webCommandMetadata: M_VE3854_Metadata|{
		url: `/@${string}`;
		webPageType: "WEB_PAGE_TYPE_CHANNEL";
		rootVe: 3611;
		apiUrl: "/youtubei/v1/browse";
	};
}>|Extract<E_Button_navigation,{browseEndpoint:any}>;
type ValidBrowseId=[
	"FEwhat_to_watch"
][number];