type D_CompactRadio={
	playlistId: `RD${string}`|`RDGM${string}`;
	thumbnail: D_Thumbnail&R_SampledThumbnailColor;
	title: R_SimpleText;
	navigationEndpoint: E_Watch;
	videoCountText: R_TextRuns;
	secondaryNavigationEndpoint: E_Watch;
	longBylineText: R_SimpleText;
	trackingParams: string;
	thumbnailText: R_TextRuns;
	videoCountShortText: R_TextRuns;
	shareUrl: `https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};