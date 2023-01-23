type D_CompactRadio={
	playlistId: `RD${string}`|`RDGM${string}`;
	thumbnail: D_Thumbnail&R_SampledThumbnailColor;
	title: R_SimpleText;
	navigationEndpoint: E_Watch;
	videoCountText: R_TextWithRuns;
	secondaryNavigationEndpoint: E_Watch;
	longBylineText: R_SimpleText;
	trackingParams: string;
	thumbnailText: R_TextWithRuns;
	videoCountShortText: R_TextWithRuns;
	shareUrl: string;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};