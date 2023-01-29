type D_CompactRadio={
	playlistId: `RD${string}`|`RDGM${string}`;
	thumbnail: R_Thumbnail&R_SampledThumbnailColor;
	title: G_Text;
	navigationEndpoint: E_Watch;
	videoCountText: G_Text;
	secondaryNavigationEndpoint: E_Watch;
	longBylineText: G_Text;
	trackingParams: string;
	thumbnailText: G_Text;
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