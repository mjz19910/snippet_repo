//#region Renderer
type R_NotificationMultiAction={notificationMultiActionRenderer: {};};
//#endregion
type RS_VE5754_PlaylistPage={
	page: "playlist";
	endpoint: GE_Browse;
	response: RS_Playlist;
	url: string;
	rootVe: 5754;
};
type RS_VE3832_Page_Watch={
	rootVe: 3832;
	url: D_WatchPageUrl;
	endpoint: E_Watch;
	page: "watch";
	preconnect?: [D_VE3832_PreconnectUrl];
	playerResponse: RS_Player;
	response: RS_Watch;
};
type RS_Page_Watch={
	page: "watch";
	endpoint: E_Watch;
	response: RS_Watch;
	playerResponse: RS_Player;
	url: D_WatchPageUrl;
	previousCsn?: string;
};