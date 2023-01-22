type D_CompactRadio={
	playlistId: `RD__{"GM"}${string}`;
	thumbnail: D_Thumbnail&SampledThumbnailColor;
	title: R_SimpleText;
	navigationEndpoint: E_WatchEndpoint;
	videoCountText: R_TextWithRuns;
	secondaryNavigationEndpoint: E_WatchEndpoint;
	longBylineText: R_SimpleText;
	trackingParams: string;
	thumbnailText: R_TextWithRuns;
	videoCountShortText: R_TextWithRuns;
	shareUrl: string;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};