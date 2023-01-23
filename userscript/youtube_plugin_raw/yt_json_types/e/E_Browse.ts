type E_Browse_1={
	browseEndpoint: D_Browse_Id<ValidBrowseId>|{
		browseId: `UC${string}`;
		canonicalBaseUrl: `/@${string}`;
	};
};

type ME_Browse={
	webCommandMetadata: GM_VE3854|GM_VE3611;
};

type E_Browse=(T_Endpoint<ME_Browse>&E_Browse_1)|Extract<E_Button_navigation,{browseEndpoint:any}>;
type ValidBrowseId=[
	"FEwhat_to_watch"
][number];