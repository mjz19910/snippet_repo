//#region {pageType:string}
type R_PageTypeWatch={
	pageType: "watch";
	endpoint: E_Watch;
	response: G_RS_WatchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypeBrowse={
	pageType: "browse";
	endpoint: GE_Browse;
	response: RS_Page_Browse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypeChannel={
	pageType: "channel";
	endpoint: {};
	response: RS_Page_Channel;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypePlaylist={
	pageType: "playlist";
	endpoint: {};
	response: G_RS_Page_Playlist;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypeSearch={
	pageType: "search";
	endpoint: E_Search;
	response: RS_Page_Search;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypeSettings={
	pageType: "settings";
	endpoint: E_Settings;
	response: G_RS_Page_Settings;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypeShorts={
	pageType: "shorts";
	endpoint: E_ReelWatch;
	response: G_RS_Page_Shorts;
	fromHistory: boolean;
	navigationDoneMs: number;
};
//#endregion
