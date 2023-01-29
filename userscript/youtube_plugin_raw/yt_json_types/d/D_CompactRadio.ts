type D_CompactRadio={
	playlistId: `RD${string}`|`RDGM${string}`;
	thumbnail: R_Thumbnail&R_SampledThumbnailColor;
	title: R_TextRuns;
	navigationEndpoint: E_Watch;
	videoCountText: R_TextRuns;
	secondaryNavigationEndpoint: E_Watch;
	longBylineText: R_TextRuns;
	trackingParams: string;
	thumbnailText: R_TextRuns;
	videoCountShortText: G_Text;
	shareUrl:
	|
	`https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`
	|
	"https://www.youtube.com/playlist?list=PL2q9pua8FpiUiCv6KmWWhR5Bh8GfElo98"
	|
	never
	;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};