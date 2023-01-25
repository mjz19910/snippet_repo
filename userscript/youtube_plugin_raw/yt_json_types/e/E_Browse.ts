type E_Browse_1={
	browseEndpoint: D_Browse_Id<ValidBrowseId>|{
		browseId: `UC${string}`;
		canonicalBaseUrl: `/@${string}`;
	};
};

type ME_Browse={
	webCommandMetadata: GM_VE3854|GM_VE3611;
};

type E_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE23462;
	browseEndpoint: {
		browseId: "SPaccount_notifications";
	};
}|{
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: GM_VE3611;
	};
	browseEndpoint: {
		browseId: `UC${string}`;
		canonicalBaseUrl: `/@${string}`;
	};
};
type ValidBrowseId=[
	"FEwhat_to_watch"
][number];