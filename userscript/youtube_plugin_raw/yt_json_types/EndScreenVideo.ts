type D_EndScreenVideo={
	videoId: string;
	thumbnail: D_Thumbnail;
	title: R_SimpleText;
	shortBylineText: R_TextWithRuns;
	lengthText?: R_SimpleText;
	lengthInSeconds?: number;
	navigationEndpoint: E_WatchEndpoint|E_ReelWatchEndpoint;
	trackingParams: string;
	shortViewCountText: G_Text;
	publishedTimeText: R_SimpleText;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};