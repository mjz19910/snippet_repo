type D_EndScreenVideo={
	videoId: string;
	thumbnail: R_Thumbnail;
	title: G_Text;
	shortBylineText: G_Text;
	lengthText?: G_Text;
	lengthInSeconds?: number;
	navigationEndpoint: E_Watch|E_ReelWatch;
	trackingParams: string;
	shortViewCountText: G_Text;
	publishedTimeText: G_Text;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};