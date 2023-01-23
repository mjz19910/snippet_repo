type D_EndScreenVideo={
	videoId: string;
	thumbnail: D_Thumbnail;
	title: R_SimpleText;
	shortBylineText: R_TextWithRuns;
	lengthText?: R_SimpleText;
	lengthInSeconds?: number;
	navigationEndpoint: E_Watch|E_ReelWatch;
	trackingParams: string;
	shortViewCountText: G_Text;
	publishedTimeText: R_SimpleText;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};