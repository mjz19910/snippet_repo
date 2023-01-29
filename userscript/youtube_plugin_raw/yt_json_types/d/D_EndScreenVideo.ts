type D_EndScreenVideo={
	videoId: string;
	thumbnail: R_Thumbnail;
	title: D_Text;
	shortBylineText: D_Text;
	lengthText?: D_Text;
	lengthInSeconds?: number;
	navigationEndpoint: E_Watch|E_ReelWatch;
	trackingParams: string;
	shortViewCountText: D_Text;
	publishedTimeText: D_Text;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};