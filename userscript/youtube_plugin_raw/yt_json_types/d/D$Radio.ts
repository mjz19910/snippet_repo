type D__Radio={
	playlistId: `RD__{string}`;
	title: R_SimpleText;
	thumbnail: D__Thumbnail;
	videoCountText: R_TextWithRuns;
	navigationEndpoint: E_WatchEndpoint;
	trackingParams: string;
	videos: R_ChildVideo[];
	thumbnailText: R_TextWithRuns;
	longBylineText: R_SimpleText;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	videoCountShortText: R_TextWithRuns;
};