type D_Radio={
	playlistId: `RD__{string}`;
	title: R_SimpleText;
	thumbnail: D_Thumbnail;
	videoCountText: R_TextWithRuns;
	navigationEndpoint: E_Watch;
	trackingParams: string;
	videos: R_ChildVideo[];
	thumbnailText: R_TextWithRuns;
	longBylineText: R_SimpleText;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	videoCountShortText: R_TextWithRuns;
};