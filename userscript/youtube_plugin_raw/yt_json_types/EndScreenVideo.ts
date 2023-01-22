type D__EndScreenVideo={
	videoId: string;
	thumbnail: D__Thumbnail;
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