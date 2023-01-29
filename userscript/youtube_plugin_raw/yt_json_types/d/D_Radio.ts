type D_Radio={
	playlistId: `RD${string}`;
	title: G_Text;
	thumbnail: R_Thumbnail;
	videoCountText: G_Text;
	navigationEndpoint: E_Watch;
	trackingParams: string;
	videos: R_ChildVideo[];
	thumbnailText: G_Text;
	longBylineText: G_Text;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	videoCountShortText: G_Text;
};